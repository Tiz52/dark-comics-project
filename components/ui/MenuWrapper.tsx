import {FC, useState, useContext} from "react";
import {useRouter} from "next/router";

import {
  SearchOutlined,
  AccountCircleOutlined,
  LibraryBooksOutlined,
  Logout,
  CategoryOutlined,
  DashboardOutlined,
  ConfirmationNumberOutlined,
  AdminPanelSettings,
  CloseOutlined,
  MenuBookOutlined,
  VpnKeyOutlined,
  GroupOutlined,
} from "@mui/icons-material";
import {AnimatePresence, motion} from "framer-motion";

import {useOuterClick} from "../../hooks";
import Link from "next/link";
import {AuthContext} from "../../context";

const backdropVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    width: 0,
  },
  show: {
    opacity: 1,
    width: "",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    width: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

interface Props {
  isOpen: boolean;
  closeMenu: () => void;
}

export const MenuWrapper: FC<Props> = ({isOpen, closeMenu}) => {
  const ref = useOuterClick();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const {user, isLoggedIn, logout} = useContext(AuthContext);

  const navigateTo = (path: string) => {
    setSearchTerm("");
    closeMenu();
    router.push(path);
  };

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    navigateTo(`/search/${searchTerm.toLocaleLowerCase()}`);
    closeMenu();
  };

  const onLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          className="absolute inset-0 z-30 w-full h-screen uppercase bg-primary/75"
        >
          <motion.div
            className="absolute z-[40] w-full xs:w-[375px] right-0 flex gap-5 flex-col justify-center py-6  top-0 bg-quaternary"
            variants={modalVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            ref={ref}
          >
            <div className="flex items-center justify-end gap-5 px-6 md:px-10 lg:px-14">
              <button onClick={closeMenu} className="text-xl icon">
                <CloseOutlined />
              </button>
            </div>

            <div className="relative z-[1] w-full flex px-6 md:px-10 lg:px-14 items-end overflow-hidden rounded-lg border-primary">
              <input
                autoFocus
                className="w-full h-10 text-sm text-white transition duration-300 ease-in-out border-b-2 appearance-none border-tertiary xl:text-sm bg-quaternary focus:border-white focus:outline-none placeholder:text-tertiary"
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onKeyPress={(e) => e.key === "Enter" && onSearchTerm()}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchOutlined
                onClick={() => onSearchTerm()}
                className="absolute z-50 h-5 cursor-pointer right-6 md:right-10 bottom-3 lg:right-14"
              />
            </div>

            <motion.div className="flex flex-col mt-4 " layout>
              <div className="flex flex-col mb-2">
                <span className="px-6 mt-4 mb-4 text-sm font-semibold whitespace-nowrap md:px-10 lg:px-14">
                  Dark Cómics
                </span>
                {isLoggedIn && (
                  <div>
                    <a className="flex items-center w-full gap-4 px-6 py-2 text-sm uppercase transition duration-300 ease-in-out md:px-10 lg:px-14 hover:bg-shadow">
                      <AccountCircleOutlined className="w-6 h-6" />
                      <span className=" whitespace-nowrap">Usuario</span>
                    </a>
                  </div>
                )}
                <button
                  className="flex items-center w-full gap-4 px-6 py-2 text-sm uppercase transition duration-300 ease-in-out md:px-10 lg:px-14 hover:bg-shadow md:hidden"
                  onClick={() => navigateTo("/dc-comics")}
                >
                  <LibraryBooksOutlined className="w-6 h-6" />
                  <span className=" whitespace-nowrap">DC</span>
                </button>

                <button
                  className="flex items-center w-full gap-4 px-6 py-2 text-sm uppercase transition duration-300 ease-in-out md:px-10 lg:px-14 hover:bg-shadow md:hidden"
                  onClick={() => navigateTo("/marvel-comics")}
                >
                  <LibraryBooksOutlined className="w-6 h-6" />
                  <span className=" whitespace-nowrap">Marvel</span>
                </button>

                {isLoggedIn && (
                  <button
                    className="flex items-center w-full gap-4 px-6 py-2 text-sm uppercase transition duration-300 ease-in-out md:px-10 lg:px-14 hover:bg-shadow"
                    onClick={() => navigateTo("/orders/history")}
                  >
                    <ConfirmationNumberOutlined className="w-6 h-6" />
                    <span className=" whitespace-nowrap">Mis Órdenes</span>
                  </button>
                )}

                {isLoggedIn ? (
                  <button
                    className="flex items-center w-full gap-4 px-6 py-2 overflow-hidden text-sm uppercase transition duration-300 ease-in-out md:px-10 lg:px-14 hover:bg-shadow"
                    onClick={() => onLogout()}
                  >
                    <Logout className="w-6 h-6" />
                    <span className=" whitespace-nowrap">Cerrar Sesión</span>
                  </button>
                ) : (
                  <button
                    className="flex items-center w-full gap-4 px-6 py-2 overflow-hidden text-sm uppercase transition duration-300 ease-in-out md:px-10 lg:px-14 hover:bg-shadow"
                    onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}
                  >
                    <VpnKeyOutlined className="w-6 h-6" />
                    <span className=" whitespace-nowrap">Ingresar</span>
                  </button>
                )}
              </div>
              {user?.role === "admin" && (
                <div className="flex flex-col">
                  <span className="px-6 mt-4 mb-4 text-sm font-semibold md:px-10 lg:px-14 whitespace-nowrap">
                    Admin Panel
                  </span>
                  <button
                    className="flex items-center w-full gap-4 px-6 py-2 text-sm uppercase transition duration-300 ease-in-out md:px-10 lg:px-14 hover:bg-shadow"
                    onClick={() => navigateTo("/admin/")}
                  >
                    <DashboardOutlined className="w-6 h-6" />
                    <span className=" whitespace-nowrap">Dashboard</span>
                  </button>

                  <button
                    className="flex items-center w-full gap-4 px-6 py-2 text-sm uppercase transition duration-300 ease-in-out md:px-10 lg:px-14 hover:bg-shadow"
                    onClick={() => navigateTo("/admin/publishers")}
                  >
                    <MenuBookOutlined className="w-6 h-6" />
                    <span className="whitespace-nowrap">Editoriales</span>
                  </button>

                  <button
                    className="flex items-center w-full gap-4 px-6 py-2 text-sm uppercase transition duration-300 ease-in-out md:px-10 lg:px-14 hover:bg-shadow"
                    onClick={() => navigateTo("/admin/characters")}
                  >
                    <GroupOutlined className="w-6 h-6" />
                    <span className="whitespace-nowrap">Personajes</span>
                  </button>

                  <button
                    className="flex items-center w-full gap-4 px-6 py-2 text-sm uppercase transition duration-300 ease-in-out md:px-10 lg:px-14 hover:bg-shadow"
                    onClick={() => navigateTo("/admin/comics")}
                  >
                    <CategoryOutlined className="w-6 h-6" />
                    <span className="whitespace-nowrap">Cómics</span>
                  </button>
                  <button
                    className="flex items-center w-full gap-4 px-6 py-2 text-sm uppercase transition duration-300 ease-in-out md:px-10 lg:px-14 hover:bg-shadow"
                    onClick={() => navigateTo("/admin/orders")}
                  >
                    <ConfirmationNumberOutlined className="w-6 h-6" />
                    <span className=" whitespace-nowrap">Órdenes</span>
                  </button>

                  <button
                    className="flex items-center w-full gap-4 px-6 py-2 text-sm uppercase transition duration-300 ease-in-out md:px-10 lg:px-14 hover:bg-shadow"
                    onClick={() => navigateTo("/admin/users")}
                  >
                    <AdminPanelSettings className="w-6 h-6" />
                    <span className=" whitespace-nowrap">Usuarios</span>
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
