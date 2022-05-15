import Image from "next/image";
import {useRouter} from "next/router";
import {FC} from "react";
import {IComic} from "../../interfaces";

interface Props {
  comic: IComic;
}

export const ComicCard: FC<Props> = ({comic}) => {
  const router = useRouter();

  return (
    <div>
      <div className="relative">
        <Image
          src={`/comics/${comic.images[0]}.jpg` || ""}
          alt={comic.title}
          layout="responsive"
          width={300}
          height={450}
          objectFit="cover"
        />
        <div
          className="absolute inset-0 z-10 flex flex-col justify-end w-full transition-opacity duration-300 cursor-pointer xs:opacity-0 xs:bg-primary/60 xs:hover:opacity-100 xs:justify-between"
          onClick={() => router.push(`/comic/${comic.slug}`)}
        >
          <div className="z-10 flex justify-between">
            <span className="px-1 bg-tertiary text-primary">PREORDER</span>
            <span className="px-1 bg-tertiary text-primary">$2.50</span>
          </div>
          <div className="justify-center hidden px-6 text-center xs:flex">
            <span>{comic.title}</span>
          </div>
          <button className="hidden px-10 py-1 mx-auto mb-2 transition duration-300 bg-transparent border-2 xs:block hover:bg-primary">
            BUY
          </button>
        </div>
      </div>
      <div className="block mt-2 xs:hidden">
        <span>{comic.title}</span>
      </div>
      <button className="block px-10 py-1 mx-auto mt-6 mb-2 border-2 xs:hidden bg-primary">
        BUY
      </button>
    </div>
  );
};
