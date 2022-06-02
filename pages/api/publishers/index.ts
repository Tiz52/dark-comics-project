import type {NextApiRequest, NextApiResponse} from "next";
import {db} from "../../../database";
import {Comic} from "../../../models";

interface PublisherName {
  name: string;
}

type Data =
  | {
      message: string;
    }
  | PublisherName[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  switch (req.method) {
    case "GET":
      return getPublishersNames(req, res);

    default:
      return res.status(400).json({message: "Bad request"});
  }
}
const getPublishersNames = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) => {
  await db.connect();
  const publisherFromDB = await Comic.distinct("publisher");
  await db.disconnect();

  return res.status(200).json(publisherFromDB);
};
