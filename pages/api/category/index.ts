import type {NextApiRequest, NextApiResponse} from "next";
import {db} from "../../../database";
import {IComic} from "../../../interfaces";
import {Comic} from "../../../models";

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
  const {q = "all"} = req.query;

  let condition = {};

  await db.connect();

  let comicsFromDB: IComic[] = [];

  if (q === "novelties") {
    condition = {updatedAt: {$gte: new Date(Date.now() - 1000 * 60 * 60 * 24)}};
  }
  if (q === "discounts") {
    condition = {price: {$lte: 5}};
  }

  if (q === "bestsellers") {
    condition = {inStock: {$lte: 10}};
  }

  comicsFromDB = await Comic.find(condition)
    .select("title slug images inStock publisher character price -_id")
    .limit(9)
    .lean();

  await db.disconnect();

  return res.status(200).json(comicsFromDB);
};
