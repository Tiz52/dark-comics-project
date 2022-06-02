import {GetServerSideProps} from "next";
import {FC} from "react";
import {ComicCard} from "../../../components/comics";
import {TransitionBox} from "../../../components/commons";
import {PageLayout} from "../../../components/layouts";
import {dbCharacter} from "../../../database";
import {ICharacter} from "../../../interfaces";

interface Props {
  character: ICharacter;
}

const CharacterPage: FC<Props> = ({character}) => {
  return (
    <PageLayout
      title={character.name}
      pageDescription={`Está es la página de ${character.name}`}
    >
      <section className="relative px-5 py-6 uppercase md:px-10 lg:px-14 min-h-main">
        <TransitionBox />
        <div className="relative bg-center">
          <div className="absolute w-full h-full bg-primary/60 backdrop-blur"></div>
          <div className="relative flex flex-col justify-center gap-4 py-6">
            <h1 className="text-2xl text-center font-headline md:text-4xl">
              {character.name}
            </h1>
          </div>
        </div>
        <div className="grid mt-5 gap-x-12 lg:gap-x-24 gap-y-10 lg:gap-y-16 xs:grid-cols-list">
          {character.comics.map((c) => (
            <ComicCard comic={c} key={c.slug} />
          ))}
        </div>
      </section>
    </PageLayout>
  );
};
export default CharacterPage;

// export const getStaticPaths: GetStaticPaths = async (ctx) => {
//   const comicsFromDB = await dbComics.getAllComicsSlugs();
//   return {
//     paths: comicsFromDB.map(({slug, character, publisher}) => ({
//       params: {
//         slug,
//         publisher: publisher
//           .replace(" ", "-")
//           .replace("ó", "o")
//           .toLocaleLowerCase(),
//     })),
//     fallback: "blocking",
//   };
// };

// export const getStaticProps: GetStaticProps = async ({params}) => {
//   const {slug = ""} = params as {slug: string};

//   const comic = await dbComics.getComicsBySlug(slug);

//   if (!comic) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {
//       comic,
//     },
//     revalidate: 86400,
//   };
// };

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const {publisher = "", character = ""} = params as {
    publisher: string;
    character: string;
  };

  const characterFromDB = await dbCharacter.getCharacter(character);

  if (!characterFromDB) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      character: characterFromDB,
    },
  };
};
