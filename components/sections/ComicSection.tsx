import {FC, useContext, useState} from "react";
import {ICartComic, IComic} from "../../interfaces";
import {ImageSelector} from "../ui";
import {AddOutlined, RemoveOutlined} from "@mui/icons-material";
import {CartContext} from "../../context";
import {useRouter} from "next/router";

interface Props {
  comic: IComic;
}

const MAX_QUANTITY = 5;

export const ComicSection: FC<Props> = ({comic}) => {
  const [tempCartComic, setTempCartComic] = useState<ICartComic>({
    _id: comic._id,
    title: comic.title,
    price: comic.price,
    image: comic.images[0],
    slug: comic.slug,
    quantity: 1,
    publisher: comic.publisher,
    character: comic.character,
  });

  const {addComicToCart} = useContext(CartContext);
  const router = useRouter();

  const updatedQuantity = (quantity: number) => {
    if (
      tempCartComic.quantity + quantity >
      Math.min(MAX_QUANTITY, comic.inStock)
    )
      return;
    if (tempCartComic.quantity + quantity < 1) return;
    setTempCartComic({
      ...tempCartComic,
      quantity: tempCartComic.quantity + quantity,
    });
  };

  const handleAddToCart = () => {
    addComicToCart(tempCartComic);
    router.push("/cart");
  };

  return (
    <section
      style={{backgroundImage: `url('${comic.images[0]}')`}}
      className="relative bg-center"
    >
      <div className="absolute w-full h-full bg-primary/80 backdrop-blur"></div>
      <div className="flex flex-col gap-4 px-5 py-10 xs:gap-0 xs:flex-row md:px-10 lg:px-14">
        <div className=" xs:w-[30%]">
          <ImageSelector images={comic.images} />
        </div>
        <article className="z-20 xs:w-[70%] xs:pl-12 uppercase">
          <h1 className="text-2xl font-headline">{comic.title}</h1>
          <div className="grid gap-5 mt-12 md:gap-0 md:grid-cols-5">
            <div className="flex flex-col gap-2 pr-5 text-xs md:text-sm md:col-span-2">
              <p>
                <span className="text-[#B3B3B3] pr-2">
                  {comic.art_by.includes(" y ")
                    ? "Ilustradores: "
                    : "Ilustrador: "}
                </span>
                <span>{comic.art_by}</span>
              </p>
              <p>
                <span className="text-[#B3B3B3] pr-2">
                  {comic.written_by.includes(" y ") ? "Autores: " : "Autor: "}
                </span>
                <span>{comic.written_by}</span>
              </p>
              <p>
                <span className="text-[#B3B3B3] pr-2">Serie: </span>
                <span>{comic.series}</span>
              </p>
              <p>
                <span className="text-[#B3B3B3] pr-2">Publicación: </span>
                <span>{comic.on_sale_date}</span>
              </p>
              <p>
                <span className="text-[#B3B3B3] pr-2">Páginas: </span>
                <span>{comic.page_count}</span>
              </p>
              <p>
                <span className="text-[#B3B3B3] pr-2">Tipo: </span>
                <span>{comic.type}</span>
              </p>
              <p>
                <span className="text-[#B3B3B3] pr-2">Precio: </span>
                <span>${comic.price}</span>
              </p>
              <p>
                <span className="text-[#B3B3B3] pr-2">Disponible: </span>
                <span>{comic.inStock > 0 ? "sí" : "no"}</span>
              </p>
            </div>
            <div className="flex flex-col row-start-1 gap-2 md:row-start-auto md:col-span-3">
              <h2>Descripción:</h2>
              <p className="text-[#B3B3B3] whitespace-pre-line text-xs md:text-sm">
                {comic.description}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-6 mt-10">
            <div className="flex flex-col gap-2">
              <span className="text-sm xl:text-base text-[#B3B3B3]">
                Cantidad:
              </span>
              <div className="flex items-center gap-2">
                <button
                  className="transition-all duration-300 ease-in-out bg-transparent border-2 border-transparent rounded-full hover:border-white hover:text-white hover:bg-primary"
                  onClick={() => updatedQuantity(+1)}
                >
                  <AddOutlined />
                </button>
                <span className="text-lg text-white">
                  {tempCartComic.quantity}
                </span>
                <button
                  className="transition-all duration-300 ease-in-out bg-transparent border-2 border-transparent rounded-full hover:border-white hover:text-white hover:bg-primary"
                  onClick={() => updatedQuantity(-1)}
                >
                  <RemoveOutlined />
                </button>
              </div>
            </div>
            {comic.inStock === 0 ? (
              <span className="relative inline-flex items-center justify-start px-4 py-2 overflow-hidden font-medium border-2 bg-primary group">
                <span className="relative w-full text-sm text-left uppercase ease-in-out text-tertiary md:text-base">
                  No disponible
                </span>
              </span>
            ) : (
              <button
                className="relative inline-flex items-center justify-start px-4 py-2 overflow-hidden font-medium transition-all bg-transparent border-2 group"
                onClick={() => handleAddToCart()}
              >
                <span className="w-48 h-48 rounded rotate-[-40deg] bg-primary absolute -bottom-2 -left-2 -translate-x-full ease-out duration-700 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                <span className="relative w-full text-sm text-left uppercase transition-all duration-700 ease-in-out group-hover:text-white text-tertiary md:text-base">
                  Comprar
                </span>
              </button>
            )}
          </div>
        </article>
      </div>
    </section>
  );
};
