import {useState, useEffect} from "react";
import {ComicCard} from "../comics";
import {Filters, SortSelect} from "../commons";
import {FiltersSide} from "../layouts";
import {useComics} from "../../hooks";
import {Loading} from "../ui";
import {darkComicsApi} from "../../api";

export const LibrarySection = () => {
  const [characterFilter, setCharacterFilter] = useState("all");
  const [publisherFilter, setPublisherFilter] = useState("all");
  const [sortBy, setSortBy] = useState("none");
  const {comics, size, setSize, isLoading} = useComics(
    `/comics?character=${characterFilter}&publisher=${publisherFilter}`,

    sortBy,
  );

  const [characters, setCharacters] = useState([]);
  const [publishers, setPublishers] = useState([]);

  useEffect(() => {
    darkComicsApi("/characters").then(({data}) => {
      setCharacters(data);
    });
  }, []);

  useEffect(() => {
    darkComicsApi("/publishers").then(({data}) => {
      setPublishers(data);
    });
  }, []);

  const handleMoreComics = () => {
    setSize(size + 1);
  };

  const handleSortBy = (value: string) => {
    setSortBy(value);
  };
  return (
    <div className="flex flex-auto w-full sm:gap-10 md:gap-16 lg:gap-32">
      <div className="sticky self-start hidden w-1/4 top-14 lg:w-1/5 sm:block">
        <FiltersSide
          characters={characters}
          publishers={publishers}
          setCharacterFilter={setCharacterFilter}
          setPublisherFilter={setPublisherFilter}
        />
      </div>
      <div className="flex flex-col flex-auto">
        <div className="sticky z-20 flex justify-between h-12 top-14 bg-primary">
          <div className="flex justify-between w-full sm:justify-end">
            <div className="flex sm:hidden">
              <Filters
                characters={characters}
                publishers={publishers}
                setCharacterFilter={setCharacterFilter}
                setPublisherFilter={setPublisherFilter}
              />
            </div>
            <SortSelect
              options={["Title", "Price", "Release"]}
              setOption={handleSortBy}
            />
          </div>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid mt-5 gap-x-12 lg:gap-x-24 gap-y-10 lg:gap-y-16 md:grid-cols-list">
            {comics!.map((comic) => {
              return <ComicCard key={comic.title} comic={comic} />;
            })}
          </div>
        )}
        <div className="flex justify-center mt-10">
          {comics && comics.length % 9 === 0 && (
            <button
              className="relative inline-flex items-center justify-start px-4 py-2 overflow-hidden font-medium transition-all bg-transparent border-2 group"
              onClick={handleMoreComics}
            >
              <span className="w-48 h-48 rounded rotate-[-40deg] bg-primary group-hover:bg-tertiary absolute -bottom-2 -left-2 -translate-x-full ease-out duration-700 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span className="relative w-full text-sm text-left uppercase transition-all duration-700 ease-in-out group-hover:text-primary text-tertiary md:text-base">
                Ver más
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
