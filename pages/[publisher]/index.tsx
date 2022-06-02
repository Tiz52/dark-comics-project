import {GetStaticPaths, GetStaticProps} from "next";
import {FC} from "react";
import {CharacterCard} from "../../components/characters";
import {PageLayout} from "../../components/layouts";
import {dbPublisher} from "../../database";
import {TransitionBox} from "../../components/commons";
import {IPublisher} from "../../interfaces";

interface Props {
  publisher: IPublisher;
}

const PublisherPage: FC<Props> = ({publisher}) => {
  return (
    <PageLayout
      title={publisher.name}
      pageDescription={`Está es la página de ${publisher}`}
    >
      <section className="relative px-5 py-6 uppercase md:px-10 lg:px-14 min-h-main">
        <TransitionBox />
        <div
          style={{backgroundImage: `url('${publisher.banner}')`}}
          className="relative bg-center"
        >
          <div className="absolute w-full h-full bg-primary/60 backdrop-blur"></div>
          <div className="relative flex flex-col justify-center gap-4 py-6">
            <h1 className="text-2xl text-center font-headline md:text-4xl">
              {publisher.name}
            </h1>
            <p className="text-center">{publisher.description}</p>
          </div>
        </div>
        <div className="grid mt-5 gap-x-12 lg:gap-x-24 gap-y-10 lg:gap-y-16 xs:grid-cols-list">
          {publisher.characters.map((c) => (
            <CharacterCard
              character={c}
              publisher={publisher.slug}
              key={c.slug}
            />
          ))}
        </div>
      </section>
    </PageLayout>
  );
};
export default PublisherPage;

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const publishers = await dbPublisher.getAllPublishersSlugs();

  return {
    paths: publishers.map(({slug}) => ({
      params: {
        publisher: slug,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({params}) => {
  const {publisher = ""} = params as {publisher: string};

  const publisherData = await dbPublisher.getPublisher(publisher);

  if (!publisherData) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return {
    props: {
      publisher: publisherData,
      revalidate: 600,
    },
  };
};
