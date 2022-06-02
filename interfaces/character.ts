import {IComic} from ".";

export interface ICharacter {
  _id: string;
  name: string;
  slug: string;
  image: string;
  publisher: string;
  comics: IComic[];
}
