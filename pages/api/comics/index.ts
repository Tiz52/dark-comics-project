import type {NextApiRequest, NextApiResponse} from "next";
import {COMICS_CONSTANTS, db} from "../../../database";
import {IComic} from "../../../interfaces";
import {Character, Comic, Publisher} from "../../../models";
import {characterQueryToName, publisherQueryToName} from "../../../utils";

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

  let comicsFromDB: IComic[] = [];

  if (character !== "all") {
    const characterName = await Character.findOne({slug: character});
    condition = {...condition, character: characterName?.name};
  }

  if (publisher !== "all") {
    const publisherName = await Publisher.findOne({slug: publisher});
    condition = {...condition, publisher: publisherName?.name};
  }

  comicsFromDB = await Comic.find(condition)
    .select("title slug images inStock publisher character price -_id")
    .limit(9)
    .skip(9 * (Number(req.query.page) - 1))
    .lean();

  await db.disconnect();

  return res.status(200).json(comicsFromDB);
};
