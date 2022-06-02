import {SWRConfiguration} from "swr";
import {IComic} from "../interfaces";
import useSWRInfinite from "swr/infinite";

export const useComics = (
  url: string,
  sortBy?: string,
  config: SWRConfiguration = {},
) => {
  const {data, error, setSize, size} = useSWRInfinite<IComic[]>(
    (index: number) => `/api/${url}&page=${index + 1}`,
    config,
  );
  const comics = data?.flat();

  if (sortBy === "Title") {
    comics?.sort((a, b) => a.title.localeCompare(b.title));
  }
  if (sortBy === "Price") {
    comics?.sort((a, b) => a.price - b.price);
  }

  return {
    comics,
    isLoading: !error && !data,
    isError: error,
    size,
    setSize,
  };
};
