import Image from "next/image";
import {useRouter} from "next/router";
import {FC} from "react";
import {ICharacter} from "../../interfaces";

interface Props {
  character: ICharacter;
  publisher: string;
}

export const CharacterCard: FC<Props> = ({character, publisher}) => {
  const router = useRouter();

  return (
    <div>
      <div className="relative fadeIn">
        <Image
          src={
            character.image ||
            "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"
          }
          alt={character.name}
          layout="responsive"
          width={300}
          height={450}
          objectFit="cover"
          priority={true}
          quality={50}
          className="fadeIn"
        />
        <div
          className="absolute inset-0 z-10 flex flex-col justify-end w-full transition-opacity duration-300 cursor-pointer xs:opacity-0 xs:bg-primary/60 xs:hover:opacity-100 xs:justify-between"
          onClick={() => router.push(`/${publisher}/${character.slug}`)}
        >
          <div className="items-center justify-center hidden w-full h-full px-6 xs:flex">
            <span className="text-xl font-medium uppercase">
              {character.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
