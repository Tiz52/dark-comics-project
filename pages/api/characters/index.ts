import type {NextApiRequest, NextApiResponse} from "next";
import {db} from "../../../database";
import {Comic} from "../../../models";

interface CharacterName {
  name: string;
}

type Data =
  | {
      message: string;
    }
  | CharacterName[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  switch (req.method) {
    case "GET":
      return getCharactersNames(req, res);

    default:
      return res.status(400).json({message: "Bad request"});
  }
}
const getCharactersNames = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) => {
  await db.connect();
  const charactersFromDB = await Comic.distinct("character");
  await db.disconnect();

  return res.status(200).json(charactersFromDB);
};
