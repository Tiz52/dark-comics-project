import {createContext} from "react";
import {ICartComic, ShippingAddress} from "../../interfaces";

interface ContextProps {
  isLoaded: boolean;
  cart: ICartComic[];
  numbersOfItems: number;
  subTotal: number;
  tax: number;
  total: number;

  shippingAddress?: ShippingAddress;

  //Methods
  addComicToCart: (comic: ICartComic) => void;
  updateCartQuantity: (comic: ICartComic) => void;
  removeCartComic: (comic: ICartComic) => void;
  updateAddress: (address: ShippingAddress) => void;

  //Orders
  createOrder: () => Promise<{hasError: boolean; message: string}>;
}

export const CartContext = createContext({} as ContextProps);
