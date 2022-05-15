import {seedDatabase} from "../../database";
import {ComicCard} from "../comics";
import {Filters, Select} from "../commons";
import {FiltersSide} from "../layouts";

export const LibrarySection = () => {
  return (
    <div className="flex w-full sm:gap-10 md:gap-16 lg:gap-32">
      <div className="sticky self-start hidden w-1/4 top-14 lg:w-1/5 sm:block">
        <FiltersSide />
      </div>
      <div className="flex-auto">
        <div className="sticky z-20 flex justify-between h-12 top-14 bg-primary">
          <div className="flex justify-between w-full sm:justify-end">
            <div className="flex sm:hidden">
              <Filters />
            </div>
            <Select />
          </div>
        </div>
        <div className="grid mt-5 gap-x-12 lg:gap-x-24 gap-y-10 lg:gap-y-16 md:grid-cols-list">
          {seedDatabase.initialData.comics.map((comic) => {
            return <ComicCard key={comic.title} comic={comic} />;
          })}
        </div>
      </div>
    </div>
  );
};
