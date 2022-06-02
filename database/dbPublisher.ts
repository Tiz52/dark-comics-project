import {db} from ".";
import {IPublisher} from "../interfaces";
import {Publisher} from "../models";

export const getPublisherBySlug = async (
  slug: string,
): Promise<IPublisher | null> => {
  await db.connect();

  const comic = await Publisher.findOne({slug});
  if (!comic) return null;

  await db.disconnect();
  return JSON.parse(JSON.stringify(comic));
};

export const getPublisher = async (
  publisher: string,
): Promise<IPublisher | null> => {
  await db.connect();

  const publisherFromDB = await Publisher.findOne({slug: publisher})
    .populate({
      path: "characters",
      select: "name slug image _id",
    })
    .lean();
  await db.disconnect();

  if (!publisherFromDB) return null;

  return JSON.parse(JSON.stringify(publisherFromDB));
};

interface PublisherSlug {
  slug: string;
}

export const getAllPublishersSlugs = async (): Promise<PublisherSlug[]> => {
  await db.connect();
  const slugs = await Publisher.find().select("slug publisher -_id").lean();
  await db.disconnect();

  return slugs;
};

interface CharacterData {
  name: string;
}

interface PublisherData {
  name: string;
  characters: CharacterData[];
}

export const getAllPublishersData = async (): Promise<
  PublisherData[] | null
> => {
  await db.connect();
  const publishers = await Publisher.find()
    .select("name -_id")
    .populate("characters", "name -_id")
    .lean();
  await db.disconnect();

  return publishers;
};
