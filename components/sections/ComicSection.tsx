import Image from "next/image";
import {FC} from "react";
import {IComic} from "../../interfaces";
import {ImageSelector} from "../ui";

interface Props {
  comic: IComic;
}

export const ComicSection: FC<Props> = ({comic}) => {
  const bgImage = `url('/comics/${comic.images[0]}.jpg')`;

  return (
    <section style={{backgroundImage: bgImage}} className="relative bg-center">
      <div className="absolute w-full h-full bg-primary/80 backdrop-blur"></div>
      <div className="flex flex-col gap-4 px-5 py-10 xs:gap-0 xs:flex-row md:px-10 lg:px-14">
        <div className=" xs:w-[30%]">
          <ImageSelector images={comic.images} />
        </div>
        <article className="z-20 xs:w-[70%] xs:pl-12 uppercase">
          <h1 className="text-3xl">{comic.title}</h1>
          <div className="grid gap-5 mt-12 md:gap-0 md:grid-cols-5">
            <div className="flex flex-col gap-2 pr-5 text-xs md:text-sm md:col-span-2">
              <p>
                <span className="text-[#B3B3B3] pr-2">Art By:</span>
                <span>{comic.art_by}</span>
              </p>
              <p>
                <span className="text-[#B3B3B3] pr-2">Written By: </span>
                <span>{comic.written_by}</span>
              </p>
              <p>
                <span className="text-[#B3B3B3] pr-2">Series: </span>
                <span>{comic.series}</span>
              </p>
              <p>
                <span className="text-[#B3B3B3] pr-2">On Sale Date: </span>
                <span>{comic.on_sale_date}</span>
              </p>
              <p>
                <span className="text-[#B3B3B3] pr-2">Page Count: </span>
                <span>{comic.page_count}</span>
              </p>
              <p>
                <span className="text-[#B3B3B3] pr-2">Type: </span>
                <span>{comic.type}</span>
              </p>
              <p>
                <span className="text-[#B3B3B3] pr-2">Price: </span>
                <span>{comic.price}</span>
              </p>
              <p>
                <span className="text-[#B3B3B3] pr-2">Avaible: </span>
                <span>{comic.avaible ? "true" : "false"}</span>
              </p>
            </div>
            <div className="flex flex-col row-start-1 gap-2 md:row-start-auto md:col-span-3">
              <h2>Description</h2>
              {comic.description.map((item, index) => (
                <p className="text-[#B3B3B3] text-xs md:text-sm" key={index}>
                  {item}
                </p>
              ))}
              {/* <p className="text-[#B3B3B3] text-sm">{comic.description}</p> */}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};
