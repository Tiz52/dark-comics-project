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

  // const updatedProducts = products.map((product) => {
  //   product.images = product.images.map((image) => {
  //     return image.includes("http")
  //       ? image
  //       : `${process.env.HOST_NAME}products/${image}`;
  //   });

  //   return product;
  // });

  return comics;
};
