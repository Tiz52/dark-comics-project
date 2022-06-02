import type {NextApiRequest, NextApiResponse} from "next";
import {db, seedDatabase} from "../../database";
import {Character, Comic, Publisher, User} from "../../models";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({message: "No tiene acceso a este API"});
  }

  await db.connect();
  await Comic.deleteMany();

  //comics
  await Comic.insertMany(seedDatabase.initialData.comics);

  //characters
  await Character.deleteMany();
  const comicsFromDB = await Comic.find().select("_id character");
  const comicsId: [{_id: string; character: string}] = JSON.parse(
    JSON.stringify(comicsFromDB),
  );

  const characters = seedDatabase.initialData.characters.map((character) => {
    return {
      ...character,
      comics: comicsId
        .filter((c) => c.character === character.name)
        .map((character) => character._id),
    };
  });

  await Publisher.deleteMany();
  await Character.insertMany(characters);

  //publishers
  const charactersFromDB = await Character.find().select("_id name");
  const charactersId: [{_id: string; name: string}] = JSON.parse(
    JSON.stringify(charactersFromDB),
  );

  const publishers = seedDatabase.initialData.publishers.map((publisher) => {
    return {
      ...publisher,
      characters: charactersId
        .filter((c) => publisher.characters!.includes(c.name as never))
        .map((character) => character._id),
    };
  });

  await Publisher.insertMany(publishers);

  //clients
  await User.deleteMany();
  await User.insertMany(seedDatabase.initialData.users);

  await db.disconnect();

  res.status(200).json({message: "Proceso realizado correctamente"});
}
