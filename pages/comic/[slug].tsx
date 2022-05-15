import {GetStaticPaths, GetStaticProps} from "next";
import {FC} from "react";
import {PageLayout} from "../../components/layouts";
import {CarouselSection, ComicSection} from "../../components/sections";
import {seedDatabase} from "../../database";
import {IComic} from "../../interfaces";

interface Props {
  comic: IComic;
}

const ComicPage: FC<Props> = ({comic}) => {
  return (
    <PageLayout>
      <div className="flex flex-col gap-12">
        <ComicSection comic={comic} />
        <div className="px-6 md:px-10 lg:px-14">
          <CarouselSection section="More similar comics" />
        </div>
      </div>
    </PageLayout>
  );
};
export default ComicPage;

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const comics = seedDatabase.initialData.comics;

  return {
    paths: comics.map(({slug}) => ({
      params: {
        slug,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({params}) => {
  const {slug = ""} = params as {slug: string};

  const comic = seedDatabase.initialData.comics.find(
    (comic) => comic.slug === slug,
  );

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
    revalidate: 86400,
  };
};
