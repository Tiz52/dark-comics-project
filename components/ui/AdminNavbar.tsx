import Link from "next/link";
import {useContext} from "react";
import {SearchOutlined, MenuOutlined} from "@mui/icons-material";
import {UiContext} from "../../context";

export const AdminNavbar = () => {
  const {openMenu} = useContext(UiContext);

  return (
    <nav className="relative font-headline">
      <div className="flex items-center justify-between uppercase">
        <div>
          <Link href="/" passHref>
            <a className="hover:text-white">Dark Cómics.</a>
          </Link>
        </div>
        <div className="flex h-6 gap-5">
          <button onClick={openMenu} className="block lg:hidden">
            <SearchOutlined className="w-6 h-6 transition duration-100 ease-in-out hover:text-white" />
          </button>
          <button className="icon" onClick={openMenu}>
            <MenuOutlined className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};
