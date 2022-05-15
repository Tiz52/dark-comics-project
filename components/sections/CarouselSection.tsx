import Link from "next/link";
import {FC} from "react";
import {seedDatabase} from "../../database";
import {Carousel} from "../ui";

interface Props {
  section: string;
}

export const CarouselSection: FC<Props> = ({section}) => {
  const comics = seedDatabase.initialData.comics;

  return (
    <section className="flex flex-col items-center gap-2 uppercase">
      <h1 className="text-3xl">{section}</h1>
      <Carousel comics={comics} />
      <Link href={`/${section}`} passHref>
        <a className="hidden px-10 py-3 border-2 xs:block">More</a>
      </Link>
    </section>
  );
};
