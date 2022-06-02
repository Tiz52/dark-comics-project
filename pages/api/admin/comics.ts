import type {NextApiRequest, NextApiResponse} from "next";
import {db} from "../../../database";
import {Character, Comic} from "../../../models";
import {isValidObjectId} from "mongoose";

import {v2 as cloudinary} from "cloudinary";
import {IComic} from "../../../interfaces";
import {SeedCharacter} from "../../../database/seed-data";
import {uiReducer} from "../../../context/ui/uiReducer";

cloudinary.config(process.env.CLOUDINARY_URL || "");

type Data = {message: string} | IComic[] | IComic;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  switch (req.method) {
    case "GET":
      return getComics(req, res);
    case "PUT":
      return updateComics(req, res);
    case "POST":
      return createComic(req, res);

    default:
      return res.status(400).json({message: "Bad Request"});
  }
}

const getComics = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();

  const comics = await Comic.find().sort({title: "asc"}).lean();

  await db.disconnect();

  const updatedComics = comics.map((comic) => {
    comic.images = comic.images.map((image) => {
      return image.includes("http") ? image : `/comics/${image}`;
    });

    return comic;
  });

  res.status(200).json(updatedComics);
};

const updateComics = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) => {
  const {_id = "", images = []} = req.body as IComic;

  if (!isValidObjectId(_id)) {
    return res.status(400).json({message: "El id del cómic no es válido"});
  }

  if (images.length < 2) {
    return res.status(400).json({message: "Es necesario al menos 2 imágenes"});
  }

  try {
    await db.connect();
    const comic = await Comic.findById(_id);

    if (!comic) {
      await db.disconnect();
      return res
        .status(400)
        .json({message: "No existe un producto con ese ID"});
    }

    comic.images.forEach(async (image) => {
      if (!images.includes(image)) {
        const [fileId, extension] = image
          .substring(image.lastIndexOf("/") + 1)
          .split(".");
        console.log({image, fileId, extension});
        await cloudinary.uploader.destroy(fileId);
      }
    });

    console.log(req.body.character);

    if (req.body.character !== comic.character) {
      console.log("entra");

      //old character
      let oldCharacter: SeedCharacter | null = await Character.findOne({
        name: comic.character,
      });
      let oldComics = oldCharacter?.comics;
      const newComics = oldComics?.filter(
        (_id) => _id.toString() !== comic._id.toString(),
      );

      //new character
      const newCharacter: SeedCharacter | null = await Character.findOne({
        name: req.body.character,
      });
      newCharacter?.comics!.push(comic._id);

      const updateNewCharacter = await Character.findOne({
        name: req.body.character,
      });
      await updateNewCharacter?.update({comics: newCharacter?.comics});

      oldCharacter!.comics = newComics;

      const updateOldCharacter = await Character.findOne({
        name: comic.character,
      });

      await updateOldCharacter?.update({comics: oldCharacter?.comics});
    }
    await comic.update(req.body);
    await db.disconnect();

    return res.status(200).json(comic);
  } catch (error) {
    console.log(error);
    await db.disconnect();

    return res.status(400).json({message: "Revisar la consola del servidor"});
  }
};

const createComic = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {images = []} = req.body as IComic;

  if (images.length < 2) {
    return res
      .status(400)
      .json({message: "El producto necesita al menos 2 imágenes"});
  }

  try {
    await db.connect();

    const comicInDB = await Comic.findOne({slug: req.body.slug});

    if (comicInDB) {
      await db.disconnect();
      return res
        .status(400)
        .json({message: "Ya existe un producto con ese slug"});
    }

    const comic = new Comic(req.body);
    await comic.save();

    //character update
    const comicToInsert = await Comic.findOne({slug: req.body.slug});
    const character: SeedCharacter | null = await Character.findOne({
      name: req.body.character,
    });

    if (!character) {
      await db.disconnect();
      return res.status(400).json({message: "El personaje no existe"});
    }

    character.comics!.push(comicToInsert!._id);
    const updateCharacter = await Character.findOne({
      name: req.body.character,
    });

    await updateCharacter?.update({comics: character?.comics});

    await db.disconnect();

    res.status(201).json(comic);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({message: "Revisar logs del servidor"});
  }
};
