import Link from "next/link";
import {useRouter} from "next/router";
import {FiSearch, FiShoppingCart, FiMenu} from "react-icons/fi";

export const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="relative">
      <div className="flex items-center justify-between uppercase">
        <div>
          <Link href="/" passHref>
            <a>Dark Cómics</a>
          </Link>
        </div>
        <div className="hidden gap-10 md:flex">
          <Link href="/library" passHref>
            <a
              className={
                router.asPath === "/library"
                  ? "text-secondary"
                  : "text-tertiary"
              }
            >
              Library
            </a>
          </Link>
          <Link href="/about" passHref>
            <a
              className={
                router.asPath === "/about" ? "text-secondary" : "text-tertiary"
              }
            >
              About us
            </a>
          </Link>
          <Link href="/contacts" passHref>
            <a
              className={
                router.asPath === "/contacts"
                  ? "text-secondary"
                  : "text-tertiary"
              }
            >
              Contacts
            </a>
          </Link>
        </div>
        <div className="flex gap-5">
          <FiSearch className="w-6 h-6" />
          <FiShoppingCart className="w-6 h-6" />
          <FiMenu className="w-6 h-6" />
        </div>
      </div>
    </nav>
  );
};
