import {FC} from "react";

import {IComic} from "../../interfaces";
import {Carousel} from "../ui";

interface Props {
  section: string;
  comics: IComic[];
}

export const CarouselSection: FC<Props> = ({section, comics}) => {
  return (
    <section className="flex flex-col items-center gap-2 uppercase">
      <h1 className="text-2xl text-center font-headline md:text-4xl">
        {section}
      </h1>
      <Carousel comics={comics} />
    </section>
  );
};
