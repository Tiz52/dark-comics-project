import {FC} from "react";
import {Header, Footer, Meta} from ".";

interface Props {
  children: React.ReactNode;
  title: string;
  pageDescription: string;
  imgUrl?: string;
}

export const PageLayout: FC<Props> = ({
  children,
  title,
  pageDescription,
  imgUrl,
}) => {
  return (
    <>
      <Meta title={title} pageDescription={pageDescription} imgUrl={imgUrl} />
      <Header />
      <main className="mx-auto pt-[56px] max-w-7xl">{children}</main>
      <Footer />
    </>
  );
};
