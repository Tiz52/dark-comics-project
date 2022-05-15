import {Navbar} from "../ui";

export const Header = () => {
  return (
    <header className="fixed top-0 z-50 w-full bg-primary">
      <div className="px-6 py-4 md:px-10 lg:px-14">
        <Navbar />
      </div>
    </header>
  );
};
