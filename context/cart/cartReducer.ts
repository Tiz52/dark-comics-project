import {ICartComic, ShippingAddress} from "../../interfaces";
import {CartState} from "./";

type CartActionType =
  | {
      type: "[Cart] - LoadCart from cookies | storage";
      payload: ICartComic[];
    }
  | {
      type: "[Cart] - Update comics in cart";
      payload: ICartComic[];
    }
  | {
      type: "[Cart] - Change cart item quantity";
      payload: ICartComic;
    }
  | {
      type: "[Cart] - Remove comic in cart";
      payload: ICartComic;
    }
  | {
      type: "[Cart] - Update order summary";
      payload: {
        numbersOfItems: number;
        subTotal: number;
        tax: number;
        total: number;
      };
    }
  | {type: "[Cart] - Update ShippingAddress"; payload: ShippingAddress}
  | {type: "[Cart] - LoadAddress from Cookies"; payload: ShippingAddress}
  | {type: "[Cart] - Order Complete"};
export const cartReducer = (
  state: CartState,
  action: CartActionType,
): CartState => {
  switch (action.type) {
    case "[Cart] - LoadCart from cookies | storage":
      return {
        ...state,
        isLoaded: true,
        cart: [...action.payload],
      };
    case "[Cart] - Update comics in cart":
      return {
        ...state,
        cart: [...action.payload],
      };
    case "[Cart] - Change cart item quantity":
      return {
        ...state,
        cart: state.cart.map((cartItem) => {
          if (cartItem._id === action.payload._id) return action.payload;
          return cartItem;
        }),
      };
    case "[Cart] - Remove comic in cart":
      return {
        ...state,
        cart: state.cart.filter(
          (cartItem) => cartItem._id !== action.payload._id,
        ),
      };
    case "[Cart] - Update order summary":
      return {
        ...state,
        ...action.payload,
      };
    case "[Cart] - Update ShippingAddress":
    case "[Cart] - LoadAddress from Cookies":
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case "[Cart] - Order Complete":
      return {
        ...state,
        cart: [],
        numbersOfItems: 0,
        subTotal: 0,
        tax: 0,
        total: 0,
      };

    default:
      return state;
  }
};
