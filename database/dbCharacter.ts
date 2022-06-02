import {db} from ".";
import {ICharacter} from "../interfaces";
import {Character} from "../models";

export const getCharacterBySlug = async (
  slug: string,
): Promise<ICharacter | null> => {
  await db.connect();

  const character = await Character.findOne({slug});
  if (!character) return null;

  await db.disconnect();
  return JSON.parse(JSON.stringify(character));
};

export const getCharacter = async (
  character: string,
): Promise<ICharacter | null> => {
  await db.connect();

  const characterFromDB = await Character.findOne({slug: character})
    .populate({
      path: "comics",
      select: "title slug images price inStock publisher character",
    })
    .lean();
  await db.disconnect();

  if (!characterFromDB) return null;

  return JSON.parse(JSON.stringify(characterFromDB));
};

interface CharacterName {
  name: string;
}

export const getAllCharactersNames = async (): Promise<CharacterName[]> => {
  await db.connect();
  const names = await Character.find().select("name -_id").lean();
  await db.disconnect();

  return names;
};
