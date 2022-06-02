import type {NextPage, GetServerSideProps} from "next";
import {ComicCard} from "../../components/comics";
import {TransitionBox} from "../../components/commons";
import {PageLayout} from "../../components/layouts";
import {dbComics} from "../../database";
import {IComic} from "../../interfaces";

interface Props {
  comics: IComic[];
  foundComics: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({comics, foundComics, query}) => {
  return (
    <PageLayout
      title={"DarkCómcs - Home"}
      pageDescription={"Encuentra los mejorse productos de Teslo aquí"}
    >
      <section className="relative px-5 py-6 uppercase md:px-10 lg:px-14 min-h-main">
        <TransitionBox />
        <div className="relative bg-center">
          <div className="absolute w-full h-full bg-primary/60 backdrop-blur"></div>
          <div className="relative flex flex-col justify-center gap-4 py-6">
            <h1 className="text-2xl text-center font-headline md:text-4xl">
              Buscar cómics
            </h1>
            {foundComics ? (
              <h2 className="text-center font-headline md:text-xl">
                {`${comics.length} resultados para "${query}"`}
              </h2>
            ) : (
              <>
                <h2 className="text-center font-headline md:text-xl">
                  {`No se encontraron resultados para "${query}"`}
                </h2>
                <h2 className="text-center font-headline md:text-xl">
                  quizás te interese alguno de estos
                </h2>
              </>
            )}
          </div>
        </div>
        <div className="grid mt-5 gap-x-12 lg:gap-x-24 gap-y-10 lg:gap-y-16 xs:grid-cols-list">
          {comics.map((c) => (
            <ComicCard comic={c} key={c.slug} />
          ))}
        </div>
      </section>
    </PageLayout>
  );
};
export default SearchPage;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const {query = ""} = params as {query: string};

  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  let comics = await dbComics.getComicsByTerm(query);

  const foundComics = comics.length > 0;

  if (!foundComics) {
    comics = await dbComics.getComicsByTerm("batman");
  }

  return {
    props: {
      comics,
      foundComics,
      query,
    },
  };
};
