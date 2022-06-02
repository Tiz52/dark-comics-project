import {FC} from "react";
import {IOrderItem} from "../../interfaces";

import {CartItem} from "./CartItem";

interface Props {
  editable: boolean;
  items: IOrderItem[];
}

export const CartList: FC<Props> = ({editable, items}) => {
  return (
    <div className="grid gap-4 md:w-3/5">
      {items.map((cartItem) => (
        <CartItem key={cartItem._id} cartItem={cartItem} editable={editable} />
      ))}
    </div>
  );
};
