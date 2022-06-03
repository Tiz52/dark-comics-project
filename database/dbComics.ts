import {db} from ".";
import {IComic} from "../interfaces";
import {Comic} from "../models";

export const getComicsBySlug = async (slug: string): Promise<IComic | null> => {
  await db.connect();

  const comic = await Comic.findOne({slug});
  if (!comic) return null;

  await db.disconnect();
  return JSON.parse(JSON.stringify(comic));
};

interface ComicSlug {
  slug: string;
  character: string;
  publisher: string;
}

export const getAllComicsSlugs = async (): Promise<ComicSlug[]> => {
  await db.connect();
  const slugs = await Comic.find()
    .select("slug publisher character -_id")
    .lean();
  await db.disconnect();

  return slugs;
};

export const getComicsByTerm = async (term: string): Promise<IComic[]> => {
  term = term.toString().toLocaleLowerCase();

  await db.connect();
  const comics = await Comic.find({
    $text: {$search: term},
  })
    .select("title publisher character images price inStock slug -_id")
    .lean();

  await db.disconnect();

  return comics;
};

export const getPublishersNames = async () => {
  await db.connect();
  const publisherFromDB = await Comic.distinct("publisher").lean();
  await db.disconnect();

  return publisherFromDB;
};

export const getCharactersNames = async () => {
  await db.connect();
  const charactersFromDB = await Comic.distinct("character");
  await db.disconnect();

  return charactersFromDB;
};

export const getSimilarComics = async (character: string, slug: string) => {
  await db.connect();
  const comics = await Comic.find({
    character,
    slug: {$ne: slug},
  })
    .select("title publisher character images price inStock slug -_id")
    .lean();
  await db.disconnect();

  return comics;
};
