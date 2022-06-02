import {GetStaticPaths, GetStaticProps} from "next";
import {FC} from "react";
import {TransitionBox} from "../../../components/commons";
import {PageLayout} from "../../../components/layouts";
import {CarouselSection, ComicSection} from "../../../components/sections";
import {Loading} from "../../../components/ui";
import {dbComics} from "../../../database";
import {useComics} from "../../../hooks";
import {IComic} from "../../../interfaces";
import {characterNameToQuery, query} from "../../../utils/index";

interface Props {
  comic: IComic;
}

const ComicPage: FC<Props> = ({comic}) => {
  const {comics, isLoading} = useComics(
    `/comics?character=${characterNameToQuery(comic.character)}`,
  );
  const similarComics = isLoading
    ? []
    : comics!.filter((c) => c.slug !== comic.slug);

  if (!comic) return <Loading />;

  return (
    <PageLayout title={comic.title} pageDescription={comic.description[0]}>
      <TransitionBox />
      <div className="flex flex-col gap-12 pb-6 min-h-main">
        <ComicSection comic={comic} />
        <div className="px-6 md:px-10 lg:px-14">
          {isLoading ? (
            <div className="flex h-[400px]">
              <Loading />
            </div>
          ) : (
            <CarouselSection
              comics={similarComics}
              section={"más cómics similares"}
            />
          )}
        </div>
      </div>
    </PageLayout>
  );
};
export default ComicPage;

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const comicsFromDB = await dbComics.getAllComicsSlugs();
  return {
    paths: comicsFromDB.map(({slug, character, publisher}) => ({
      params: {
        slug,
        publisher: query.publisher(publisher),
        character: query.character(character),
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({params}) => {
  const {slug = ""} = params as {slug: string};

  const comic = await dbComics.getComicsBySlug(slug);

  if (!comic) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      comic,
    },
    // revalidate: 86400,
    revalidate: 600,
  };
};
