import Link from "next/link";
import {useRouter} from "next/router";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@mui/icons-material";
import {useContext, useState} from "react";
import {CartContext, UiContext} from "../../context";
import {AnimatePresence, motion} from "framer-motion";

export const Navbar = () => {
  const router = useRouter();
  const {openMenu, closeMenu} = useContext(UiContext);
  const {numbersOfItems} = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const navigateTo = (path: string) => {
    setSearchTerm("");
    closeMenu();
    router.push(path);
  };

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;

    navigateTo(`/search/${searchTerm.toLocaleLowerCase()}`);
    setIsSearchVisible(false);
    closeMenu();
  };

  return (
    <nav className="relative font-headline">
      <div className="flex items-center justify-between uppercase">
        <div>
          <Link href="/" passHref>
            <a className="hover:text-white">Dark Cómics.</a>
          </Link>
        </div>
        <div className="hidden gap-10 md:flex ">
          <Link href="/dc-comics" passHref prefetch={false}>
            <a
              className={
                router.asPath === "/dc-comics"
                  ? "text-secondary"
                  : "text-tertiary hover:text-white"
              }
            >
              DC
            </a>
          </Link>
          <Link href="/marvel-comics" passHref prefetch={false}>
            <a
              className={
                router.asPath === "/marvel-comics"
                  ? "text-secondary"
                  : "text-tertiary hover:text-white"
              }
            >
              Marvel
            </a>
          </Link>
        </div>
        <div className="flex h-6 gap-5">
          {isSearchVisible ? (
            <AnimatePresence>
              <motion.div
                className="relative z-[1] text-tertiary flex h-6 mb-[2px] items-end overflow-hidden"
                initial={{opacity: 0, x: "100%"}}
                animate={{opacity: 1, x: 0}}
                exit={{opacity: 0, x: "100%"}}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
              >
                <input
                  autoFocus
                  className="w-full px-2 transition duration-300 ease-in-out bg-transparent border-b-[1px] appearance-none text-tertiary border-primary focus:border-tertiary focus:outline-none placeholder:text-secondary"
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onKeyPress={(e) => e.key === "Enter" && onSearchTerm()}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <CloseOutlined
                  onClick={() => setIsSearchVisible(false)}
                  className="absolute flex h-6 cursor-pointer right-3"
                />
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.button
              onClick={() => setIsSearchVisible(true)}
              className="hidden lg:block"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
            >
              <SearchOutlined className="w-6 h-6 transition duration-100 ease-in-out hover:text-white" />
            </motion.button>
          )}
          <button onClick={openMenu} className="block lg:hidden">
            <SearchOutlined className="w-6 h-6 transition duration-100 ease-in-out hover:text-white" />
          </button>
          <Link href="/cart" passHref>
            <span className="relative inline-block group icon">
              <ShoppingCartOutlined className="w-6 h-6 hover:text-white text-tertiary" />
              <span className="absolute px-[6px] py-1 text-xs leading-none transform rounded-full -top-[10px] -right-[12px] text-secondary bg-transparent">
                {numbersOfItems > 9
                  ? "+9"
                  : numbersOfItems === 0
                  ? ""
                  : numbersOfItems}
              </span>
            </span>
          </Link>
          <button className="icon" onClick={openMenu}>
            <MenuOutlined className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};
