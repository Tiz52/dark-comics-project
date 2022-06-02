import Head from "next/head";
import {FC} from "react";
import {AdminHeader, Footer} from ".";

interface Props {
  children: React.ReactNode;
  title: string;
  imgUrl?: string;
}

export const AdminLayout: FC<Props> = ({children, title}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="og:title" content={title} />
      </Head>
      <AdminHeader />
      <main className="mx-auto pt-[56px] max-w-7xl">{children}</main>
    </>
  );
};
