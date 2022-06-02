import {useContext} from "react";
import {UiContext} from "../../context";
import {AdminNavbar, MenuWrapper} from "../ui";

export const AdminHeader = () => {
  const {isMenuOpen, closeMenu} = useContext(UiContext);

  return (
    <header className="fixed top-0 z-50 w-full bg-primary">
      <div className="px-6 py-4 md:px-10 lg:px-14">
        <AdminNavbar />
        <MenuWrapper isOpen={isMenuOpen} closeMenu={closeMenu} />
      </div>
    </header>
  );
};
