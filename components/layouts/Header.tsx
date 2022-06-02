import {useContext} from "react";
import {UiContext} from "../../context";
import {MenuWrapper, Navbar} from "../ui";

export const Header = () => {
  const {isMenuOpen, closeMenu} = useContext(UiContext);

  return (
    <header className="fixed top-0 z-50 w-full bg-primary">
      <div className="px-6 py-4 md:px-10 lg:px-14">
        <Navbar />
        <MenuWrapper isOpen={isMenuOpen} closeMenu={closeMenu} />
      </div>
    </header>
  );
};
