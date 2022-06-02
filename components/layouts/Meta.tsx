import Head from "next/head";
import {FC} from "react";

interface Props {
  title: string;
  pageDescription: string;
  imgUrl?: string;
}

export const Meta: FC<Props> = ({title, pageDescription, imgUrl}) => {
  return (
    <Head>
      <title>{title}</title>

      <meta name="description" content={pageDescription} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={pageDescription} />

      {imgUrl && <meta name="og:image" content={imgUrl} />}
    </Head>
  );
};
