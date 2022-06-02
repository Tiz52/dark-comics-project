import type {NextApiRequest, NextApiResponse} from "next";
import {db} from "../../../database";
import {Comic, Publisher} from "../../../models";
import {isValidObjectId} from "mongoose";

import {v2 as cloudinary} from "cloudinary";
import {IPublisher} from "../../../interfaces";

cloudinary.config(process.env.CLOUDINARY_URL || "");

type Data = {message: string} | IPublisher[] | IPublisher;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  switch (req.method) {
    case "GET":
      return getPublishers(req, res);
    case "PUT":
      return updatePublisher(req, res);
    case "POST":
      return createPublisher(req, res);

    default:
      return res.status(400).json({message: "Bad Request"});
  }
}

const getPublishers = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) => {
  await db.connect();

  const publishers = await Publisher.find().sort({title: "asc"}).lean();

  await db.disconnect();

  res.status(200).json(publishers);
};

const updatePublisher = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) => {
  const {_id = "", banner = ""} = req.body as IPublisher;

  if (!isValidObjectId(_id)) {
    return res.status(400).json({message: "El id del producto no es válido"});
  }

  if (!banner) {
    return res.status(400).json({message: "Es necesario al menos 1 banner"});
  }

  try {
    await db.connect();
    const publisher = await Publisher.findById(_id);

    if (!publisher) {
      await db.disconnect();
      return res
        .status(400)
        .json({message: "No existe una editorial con ese ID"});
    }

    if (!(publisher.banner === banner)) {
      const [fileId, extension] = banner
        .substring(banner.lastIndexOf("/") + 1)
        .split(".");
      console.log({banner, fileId, extension});
      await cloudinary.uploader.destroy(fileId);
    }

    await publisher.update(req.body);
    await db.disconnect();

    return res.status(200).json(publisher);
  } catch (error) {
    console.log(error);
    await db.disconnect();

    return res.status(400).json({message: "Revisar la consola del servidor"});
  }
};

const createPublisher = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) => {
  const {banner = ""} = req.body as IPublisher;

  if (!banner) {
    return res.status(400).json({message: "Es necesario al menos 1 banner"});
  }

  try {
    await db.connect();

    const publisherInDB = await Publisher.findOne({slug: req.body.slug});

    if (publisherInDB) {
      await db.disconnect();
      return res
        .status(400)
        .json({message: "Ya existe una editorial con ese slug"});
    }

    const publisher = new Publisher(req.body);
    await publisher.save();
    await db.disconnect();

    res.status(201).json(publisher);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({message: "Revisar logs del servidor"});
  }
};
