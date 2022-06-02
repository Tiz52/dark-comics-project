import {ICharacter} from ".";

export interface IPublisher {
  _id: string;
  name: string;
  slug: string;
  description: string;
  banner: string;
  characters: ICharacter[];
}
