import {FC, useEffect, useReducer, useRef} from "react";
import Cookie from "js-cookie";
import {ICartComic, IOrder, ShippingAddress} from "../../interfaces";
import {CartContext, cartReducer} from "./";
import {darkComicsApi} from "../../api";
import axios from "axios";

export interface CartState {
  isLoaded: boolean;
  cart: ICartComic[];
  numbersOfItems: number;
  subTotal: number;
  tax: number;
  total: number;

  shippingAddress?: ShippingAddress;
}

const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: [],
  numbersOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
  shippingAddress: undefined,
};

interface Props {
  children: React.ReactNode;
}

export const CartProvider: FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
  const firstRenderRef = useRef(true);

  useEffect(() => {
    const cookieProducts = Cookie.get("cart")
      ? JSON.parse(Cookie.get("cart")!)
      : [];

    dispatch({
      type: "[Cart] - LoadCart from cookies | storage",
      payload: cookieProducts,
    });
  }, []);

  useEffect(() => {
    if (Cookie.get("firstName") !== undefined) {
      const cookieAddress = {
        firstName: Cookie.get("firstName") || "",
        lastName: Cookie.get("lastName") || "",
        address: Cookie.get("address") || "",
        address2: Cookie.get("address2") || "",
        zip: Cookie.get("zip") || "",
        city: Cookie.get("city") || "",
        country: Cookie.get("country") || "",
        phone: Cookie.get("phone") || "",
      };

      dispatch({
        type: "[Cart] - LoadAddress from Cookies",
        payload: cookieAddress,
      });
    }
  }, []);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    Cookie.set("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    const numbersOfItems = state.cart.reduce(
      (prev, current) => current.quantity + prev,
      0,
    );
    const subTotal = state.cart.reduce(
      (prev, current) => current.price * current.quantity + prev,
      0,
    );
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const orderSummary = {
      numbersOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (1 + taxRate),
    };

    dispatch({
      type: "[Cart] - Update order summary",
      payload: orderSummary,
    });
  }, [state.cart]);

  const addComicToCart = (comic: ICartComic) => {
    const comicInCart = state.cart.find(
      (cartComic) => cartComic._id === comic._id,
    );

    let newCart: ICartComic[] = [...state.cart];

    if (comicInCart) {
      newCart = newCart.map((c) => {
        if (c._id === comic._id) {
          c.quantity = c.quantity + comic.quantity;
        }
        return c;
      });
    } else {
      newCart.push(comic);
    }

    dispatch({
      type: "[Cart] - Update comics in cart",
      payload: newCart,
    });
  };

  const updateCartQuantity = (comic: ICartComic) => {
    dispatch({
      type: "[Cart] - Change cart item quantity",
      payload: comic,
    });
  };

  const removeCartComic = (comic: ICartComic) => {
    dispatch({
      type: "[Cart] - Remove comic in cart",
      payload: comic,
    });
  };

  const updateAddress = (address: ShippingAddress) => {
    Cookie.set("firstName", address.firstName);
    Cookie.set("lastName", address.lastName);
    Cookie.set("address", address.address);
    Cookie.set("address2", address.address2 || "");
    Cookie.set("zip", address.zip);
    Cookie.set("city", address.city);
    Cookie.set("country", address.country);
    Cookie.set("phone", address.phone);

    dispatch({type: "[Cart] - Update ShippingAddress", payload: address});
  };

  const createOrder = async (): Promise<{
    hasError: boolean;
    message: string;
  }> => {
    if (!state.shippingAddress) {
      throw new Error("No hay dirección de entrega");
    }

    const body: IOrder = {
      orderItems: state.cart,
      shippingAddress: state.shippingAddress,
      numberOfItems: state.numbersOfItems,
      subTotal: state.subTotal,
      tax: state.tax,
      total: state.total,
      isPaid: false,
    };

    try {
      const {data} = await darkComicsApi.post("/orders", body);

      dispatch({type: "[Cart] - Order Complete"});

      return {
        hasError: false,
        message: data._id!,
      };
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const response = error.response as any;
        return {
          hasError: true,
          message: response.data.message
            ? response.data.message
            : "Error al crear la orden",
        };
      }

      return {
        hasError: true,
        message: "Error no controlado, hable con el admninistrador",
      };
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...state,

        //methods
        addComicToCart,
        updateCartQuantity,
        removeCartComic,
        updateAddress,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
