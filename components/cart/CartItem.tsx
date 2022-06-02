import {FC, useContext} from "react";
import {useRouter} from "next/router";
import Image from "next/image";

import {CloseOutlined, RemoveOutlined, AddOutlined} from "@mui/icons-material";

import {CartContext} from "../../context";
import {ICartComic} from "../../interfaces";
import {currency, query} from "../../utils";

const MAX_QUANTITY = 10;

interface Props {
  cartItem: ICartComic;
  editable: boolean;
}

export const CartItem: FC<Props> = ({cartItem, editable}) => {
  const router = useRouter();
  const {updateCartQuantity, removeCartComic} = useContext(CartContext);
  const onNewCartQuantityValue = (quantity: number) => {
    if (cartItem.quantity + quantity > MAX_QUANTITY) return;
    if (cartItem.quantity + quantity < 1) return;
    updateCartQuantity({
      ...cartItem,
      quantity: cartItem.quantity + quantity,
    });
  };

  return (
    <div className="flex gap-4 p-3 uppercase md:p-4">
      <button
        className="w-3/12"
        onClick={() =>
          router.push(
            `/${query.publisher(cartItem.publisher)}/${query.character(
              cartItem.character,
            )}/${cartItem.slug}`,
          )
        }
      >
        <Image
          src={
            cartItem.image ||
            "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"
          }
          width={200}
          height={300}
          alt={cartItem.title}
          objectFit="fill"
          layout="intrinsic"
          quality={50}
          priority
        />
      </button>

      <div className="flex flex-col flex-auto gap-5">
        <div className="flex justify-between w-full gap-5">
          <h3 className="font-semibold xl:text-xl">{cartItem.title}</h3>
          {editable && (
            <button className="icon" onClick={() => removeCartComic(cartItem)}>
              <CloseOutlined />
            </button>
          )}
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col">
            <span className="text-sm xl:text-base">Cantidad: </span>
            <div className="flex items-center gap-2 h-[20px]">
              {editable && (
                <button
                  className="icon"
                  onClick={() => onNewCartQuantityValue(+1)}
                >
                  <AddOutlined className="w-4 h-4" />
                </button>
              )}
              <span className="w-4 h-4 text-sm text-center text-secondary xl:text-base">
                {cartItem.quantity}
              </span>
              {editable && (
                <button
                  className="icon"
                  onClick={() => onNewCartQuantityValue(-1)}
                >
                  <RemoveOutlined className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-[1px]">
            <span className="text-sm xl:text-base">Precio</span>
            <span className="text-sm xl:text-base text-secondary">
              {currency.format(cartItem.price)}
            </span>
          </div>
          <div className="flex flex-col gap-[1px]">
            <span className="text-sm xl:text-base">Total</span>
            <span className="text-sm xl:text-base text-secondary">
              {currency.format(cartItem.price * cartItem.quantity)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
