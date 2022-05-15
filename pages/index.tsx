import type {NextPage} from "next";
import {PageLayout} from "../components/layouts";
import {CarouselSection} from "../components/sections";

const HomePage: NextPage = () => {
  return (
    <PageLayout>
      <div className="flex flex-col gap-32 px-6 pt-10 md:px-10 lg:px-14">
        <CarouselSection section="novelties" />
        <CarouselSection section="bestsellers" />
        <CarouselSection section="discounts" />
      </div>
    </PageLayout>
  );
};

export default HomePage;
