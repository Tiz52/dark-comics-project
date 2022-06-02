import {TransitionBox} from "../components/commons";
import {PageLayout} from "../components/layouts";
import {LibrarySection} from "../components/sections";

const HomePage = () => {
  return (
    <PageLayout
      title="Dark Cómics."
      pageDescription="Encuentra los mejores cómics aquí"
    >
      <div className="flex flex-col items-center gap-4 px-5 py-6 md:px-10 lg:px-14 min-h-main">
        <TransitionBox />
        <h1 className="text-2xl font-headline md:text-4xl">Cómics</h1>
        <LibrarySection />
      </div>
    </PageLayout>
  );
};
export default HomePage;
