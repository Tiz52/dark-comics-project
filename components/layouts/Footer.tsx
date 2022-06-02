import Link from "next/link";
import {BsTwitter, BsGithub, BsInstagram} from "react-icons/bs";

export const Footer = () => {
  return (
    <footer className="mx-auto max-w-7xl">
      <div className="flex justify-around gap-4 px-6 py-6 uppercase md:px-10 lg:px-14">
        <div className="flex flex-col justify-between gap-4 sm:gap-10 md:gap-20 sm:flex-row">
          <div className="flex flex-col gap-4">
            <Link href="/library" passHref prefetch={false}>
              <a className="text-xs md:text-sm">Librería</a>
            </Link>
            <Link href="/dc-comics" passHref prefetch={false}>
              <a className="text-xs md:text-sm">DC</a>
            </Link>
            <Link href="/marvel-comics" passHref prefetch={false}>
              <a className="text-xs md:text-sm">MARVEL</a>
            </Link>
          </div>
          <div className="flex flex-col gap-4 md:text-xs">
            <span className="text-xs md:text-sm">FAQ</span>
            <span className="text-xs md:text-sm">Politica de Privacidad</span>
            <span className="text-xs md:text-sm">Términos del servicio</span>
          </div>
        </div>
        <div className="flex flex-col-reverse justify-end gap-4 sm:gap-10 md:gap-20 xs:justify-between sm:flex-row">
          <div className="flex flex-col gap-4">
            <p className="text-xs md:text-sm">
              <span>Teléfono: </span>
              <span className="text-secondary">+51 999 999 999</span>
            </p>
            <p className="text-xs md:text-sm">
              <span>Correo: </span>
              <span className="text-secondary">carls.mrz@gmail.com</span>
            </p>
            <p className="text-xs md:text-sm">
              <span>Horario: </span>
              <span className="text-secondary">
                Todo los días, 09 am - 18 pm horas
              </span>
            </p>
          </div>
          <div className="flex flex-col gap-4 xs:gap-4">
            <Link href="https://twitter.com/25Crls" passHref>
              <a target="_blank">
                <BsTwitter className="h-4 md:w-5 md:h-5 hover:text-white" />
              </a>
            </Link>
            <Link href="https://github.com/Tiz52 " passHref>
              <a target="_blank">
                <BsGithub className="h-4 md:w-5 md:h-5 hover:text-white" />
              </a>
            </Link>
            <Link href="https://www.instagram.com/25carls" passHref>
              <a target="_blank">
                <BsInstagram className="h-4 md:w-5 md:h-5 hover:text-white" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
