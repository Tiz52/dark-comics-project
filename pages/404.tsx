import Image from "next/image";
import {PageLayout} from "../components/layouts";

const Custom404 = () => {
  return (
    <PageLayout
      title="Page not found"
      pageDescription="No hay nada que mostrar aquí"
    >
      <section className="flex flex-col items-center justify-center gap-12 min-h-[calc(100vh-360px)] xs:min-h-main">
        <img className="w-48 h-48 xs:w-96 xs:h-96" src="/404.gif" />
        <h1 className="text-4xl font-headline xs:text-8xl">404</h1>
      </section>
    </PageLayout>
  );
};
export default Custom404;
