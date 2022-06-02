import type {NextApiRequest, NextApiResponse} from "next";
import {db} from "../../../database";
import {Character, Publisher} from "../../../models";
import {isValidObjectId} from "mongoose";

import {v2 as cloudinary} from "cloudinary";
import {ICharacter} from "../../../interfaces";
import {SeedPublisher} from "../../../database/seed-data";

cloudinary.config(process.env.CLOUDINARY_URL || "");

type Data = {message: string} | ICharacter[] | ICharacter;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  switch (req.method) {
    case "GET":
      return getCharacters(req, res);
    case "PUT":
      return updateCharacter(req, res);
    case "POST":
      return createCharacter(req, res);

    default:
      return res.status(400).json({message: "Bad Request"});
  }
}

const getCharacters = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) => {
  await db.connect();

  const characters = await Character.find().sort({title: "asc"}).lean();

  await db.disconnect();

  res.status(200).json(characters);
};

const updateCharacter = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) => {
  const {_id = "", image = ""} = req.body as ICharacter;

  if (!isValidObjectId(_id)) {
    return res.status(400).json({message: "El id del personaje no es válido"});
  }

  if (!image) {
    return res.status(400).json({message: "Es necesario al menos 1"});
  }

  try {
    await db.connect();
    const character = await Character.findById(_id);

    if (!character) {
      await db.disconnect();
      return res
        .status(400)
        .json({message: "No existe un producto con ese ID"});
    }

    if (req.body.publisher !== character.publisher) {
      //new publisher
      const newPublisher: SeedPublisher | null = await Publisher.findOne({
        name: req.body.publisher,
      });
      newPublisher?.characters!.push(character._id);
      console.log(newPublisher);

      const updateNewPublisher = await Publisher.findOne({
        name: req.body.publisher,
      });
      await updateNewPublisher?.update({characters: newPublisher?.characters});

      //old publisher
      let oldPublisher: SeedPublisher | null = await Publisher.findOne({
        name: character.publisher,
      });
      let oldCharacters = oldPublisher?.characters;
      const newCharacters = oldCharacters?.filter(
        (_id) => _id.toString() !== character._id.toString(),
      );

      oldPublisher!.characters = newCharacters;

      const updateOldCharacter = await Publisher.findOne({
        name: character.publisher,
      });

      await updateOldCharacter?.update({characters: oldPublisher?.characters});
    }

    if (!(character.image === image)) {
      const [fileId, extension] = image
        .substring(image.lastIndexOf("/") + 1)
        .split(".");
      console.log({image, fileId, extension});
      await cloudinary.uploader.destroy(fileId);
    }

    await character.update(req.body);
    await db.disconnect();

    return res.status(200).json(character);
  } catch (error) {
    console.log(error);
    await db.disconnect();

    return res.status(400).json({message: "Revisar la consola del servidor"});
  }
};

const createCharacter = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) => {
  const {image = ""} = req.body as ICharacter;

  if (!image) {
    return res.status(400).json({message: "Es necesario al menos 1"});
  }

  try {
    await db.connect();

    const characterInDB = await Character.findOne({slug: req.body.slug});

    if (characterInDB) {
      await db.disconnect();
      return res
        .status(400)
        .json({message: "Ya existe un personaje con ese slug"});
    }

    const character = new Character(req.body);
    await character.save();

    //publisher update
    const characterToInsert = await Character.findOne({slug: req.body.slug});
    const publisher: SeedPublisher | null = await Publisher.findOne({
      name: req.body.publisher,
    });

    console.log(characterToInsert);

    if (!publisher) {
      await db.disconnect();
      return res.status(400).json({message: "El personaje no existe"});
    }

    publisher.characters!.push(characterToInsert!._id);
    const updatePublisher = await Publisher.findOne({
      name: req.body.publisher,
    });

    await updatePublisher?.update({characters: publisher?.characters});

    await db.disconnect();

    res.status(201).json(character);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({message: "Revisar logs del servidor"});
  }
};
