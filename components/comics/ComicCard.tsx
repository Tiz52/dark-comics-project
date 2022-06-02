import {FC} from "react";
import {useRouter} from "next/router";

import {IComic} from "../../interfaces";
import {query} from "../../utils";
import {Image} from "../ui";

interface Props {
  comic: IComic;
}

export const ComicCard: FC<Props> = ({comic}) => {
  const router = useRouter();

  return (
    <div>
      <div className="relative uppercase">
        <Image
          src={
            comic.images[0] ||
            "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"
          }
          alt={comic.title}
          layout="responsive"
          width={600}
          height={900}
          objectFit="cover"
          quality={50}
          className="fadeIn"
          fallback="https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"
        />
        <div
          className="absolute inset-0 z-10 flex flex-col justify-end w-full uppercase transition-opacity duration-300 cursor-pointer xs:opacity-0 xs:bg-primary/60 xs:hover:opacity-100 xs:justify-between"
          onClick={() =>
            router.push(
              `/${query.publisher(comic.publisher)}/${query.character(
                comic.character,
              )}/${comic.slug}`,
            )
          }
        >
          <div className="z-10 flex justify-between w-full">
            <span className="px-1 bg-tertiary text-primary">PREORDENAR</span>
            <span className="px-1 bg-tertiary text-primary">
              ${comic.price}
            </span>
          </div>
          <div className="justify-center hidden px-6 text-center xs:flex">
            <span>{comic.title}</span>
          </div>
          {comic.inStock === 0 ? (
            <button className="hidden px-10 py-1 mx-auto mb-2 uppercase transition duration-300 border-2 bg-primary xs:block">
              No disponible
            </button>
          ) : (
            <button className="hidden px-10 py-1 mx-auto mb-2 uppercase transition duration-300 bg-transparent border-2 xs:block hover:bg-primary">
              Comprar
            </button>
          )}
        </div>
      </div>
      <div className="block mt-2 xs:hidden">
        <span>{comic.title}</span>
      </div>
      {comic.inStock === 0 ? (
        <button className="block px-10 py-1 mx-auto mt-6 mb-2 uppercase border-2 xs:hidden bg-primary">
          No disponible
        </button>
      ) : (
        <button className="block px-10 py-1 mx-auto mt-6 mb-2 uppercase border-2 xs:hidden bg-primary">
          Comprar
        </button>
      )}
    </div>
  );
};
