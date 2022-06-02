export interface IComic {
  _id: string;
  title: string;
  slug: string;
  description: string;
  images: string[];
  inStock: number;
  art_by: string;
  written_by: string;
  series: string;
  publisher: string;
  type: string;
  on_sale_date: string;
  page_count: number;
  price: number;
  character: string;
  created_at: string;
  updated_at: string;
}

export interface IPublisherFromComic {
  _id: string;
  name: IPublishers;
}

export interface ICharacterFromComic {
  _id: string;
  name: IDCCharacters | IMarvelCharacters | IDCBlackLabelCharacters;
}

type IPublishers = "DC Cómics" | "Marvel Cómics" | "DC Black Label";
type IDCCharacters =
  | "Batman"
  | "Superman"
  | "Flash"
  | "Catwoman"
  | "Watchmen"
  | "Doom Patrol";
export type IMarvelCharacters = "Spider-Man" | "X-Men";
export type IDCBlackLabelCharacters = "Swamp Thing" | "Preacher";
