import {useRouter} from "next/router";
import {useContext} from "react";
import {CartContext} from "../../context";
import {currency} from "../../utils";

export const OrderSummary = () => {
  const {numbersOfItems, subTotal, tax, total} = useContext(CartContext);
  const router = useRouter();

  const handleOrder = () => {
    router.push("/checkout/address");
  };

  return (
    <div className="p-3 uppercase divide-y-2 divide-tertiary md:flex-auto md:p-4 ">
      <span className="text-lg font-semibold md:text-xl lg:text-xl">Orden</span>
      <div className="mt-2 mb-2 text-sm xs:text-base">
        <div className="flex justify-between mt-2">
          <span>No. Productos</span>
          <span className="text-white">
            {numbersOfItems}
            {numbersOfItems > 1 ? " cómics" : " cómic"}
          </span>
        </div>
        <div className="flex justify-between">
          <span>SubTotal</span>
          <span className="text-white">{currency.format(subTotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>
            Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)
          </span>
          <span className="text-white">{currency.format(tax)}</span>
        </div>
        <div className="flex justify-between mt-2 font-bold md:text-base lg:text-xl">
          <span>Total</span>
          <span className="text-white">{currency.format(total)}</span>
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="relative inline-flex items-center justify-start px-4 py-2 overflow-hidden font-medium transition-all bg-transparent border-2 group"
            onClick={() => handleOrder()}
          >
            <span className="w-48 h-48 rounded rotate-[-40deg] bg-primary group-hover:bg-tertiary absolute -bottom-2 -left-2 -translate-x-full ease-out duration-700 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
            <span className="relative w-full text-sm text-left uppercase transition-all duration-700 ease-in-out group-hover:text-primary text-tertiary md:text-base">
              Confirmar
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
