import {PageLayout} from "../../components/layouts";
import {LibrarySection} from "../../components/sections";

const LibraryPage = () => {
  return (
    <PageLayout>
      <div className="flex flex-col items-center gap-4 px-5 pt-10 md:px-10 lg:px-14">
        <h1 className="text-3xl uppercase ">Browse comics</h1>
        <LibrarySection />
      </div>
    </PageLayout>
  );
};
export default LibraryPage;
