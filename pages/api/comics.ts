import type {NextApiRequest, NextApiResponse} from "next";
import {db} from "../../database";
import {IComic} from "../../interfaces";
import {Character, Comic, Publisher} from "../../models";

type Data =
  | {
      message: string;
    }
  | IComic[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  switch (req.method) {
    case "GET":
      return getComics(req, res);

    default:
      return res.status(400).json({message: "Bad request"});
  }
}
const getComics = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {character = "all", page = "1", publisher = "all"} = req.query;

  let condition = {};

  await db.connect();

  if (character !== "all") {
    const characterName = await Character.findOne({slug: character});
    condition = {...condition, character: characterName?.name};
  }

  if (publisher !== "all") {
    const publisherName = await Publisher.findOne({slug: publisher});
    condition = {...condition, publisher: publisherName?.name};
  }

  const comicsFromDB = await Comic.find(condition)
    .select("title slug images inStock publisher character price -_id")
    .limit(9)
    .skip(9 * (Number(page) - 1))
    .lean();

  await db.disconnect();

  return res.status(200).json(comicsFromDB);
};
