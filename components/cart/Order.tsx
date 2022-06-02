import Link from "next/link";
import {useRouter} from "next/router";
import {useContext, useState} from "react";
import {CartContext} from "../../context";
import {currency} from "../../utils";

export const Order = () => {
  const router = useRouter();
  const [isPosting, setIsPosting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {numbersOfItems, subTotal, tax, total, shippingAddress, createOrder} =
    useContext(CartContext);

  if (!shippingAddress) {
    return <></>;
  }

  const onCreateOrder = async () => {
    setIsPosting(true);
    const {hasError, message} = await createOrder();

    if (hasError) {
      setIsPosting(false);
      setErrorMessage(message);
      return;
    }

    router.replace(`/orders/${message}`);
  };

  return (
    <div className="p-3 uppercase divide-y-2 divide-tertiary md:flex-auto md:p-4 ">
      <span className="text-base font-semibold md:text-lg lg:text-xl">
        Resumen ( {numbersOfItems}
        {numbersOfItems > 1 ? " cómics" : " cómic"} )
      </span>
      <div className="mt-2 mb-2 text-sm xs:text-base">
        <div className="flex justify-between mt-2">
          <span className="font-bold">Dirección de entrega</span>
          <Link href="/checkout/address" passHref>
            <a className="font-semibold text-secondary">Editar</a>
          </Link>
        </div>
        <div className="flex justify-between">
          <span>
            {shippingAddress?.firstName + " " + shippingAddress?.lastName}
          </span>
        </div>
        <div className="flex justify-between">
          <span>
            {shippingAddress.address}{" "}
            {shippingAddress.address2 ? `, ${shippingAddress.address2}` : ""}
          </span>
        </div>
        <div className="flex justify-between">
          <span>
            {shippingAddress.city} {shippingAddress.zip}
          </span>
        </div>
        <div className="flex justify-between">
          <span>{shippingAddress.country}</span>
        </div>
        <div className="flex justify-between">
          <span>{shippingAddress.phone}</span>
        </div>
      </div>
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
          {isPosting ? (
            <span className="relative inline-flex items-center justify-start px-4 py-2 overflow-hidden font-medium border-2 cursor-not-allowed bg-primary group">
              <span className="relative w-full text-sm text-left uppercase ease-in-out text-tertiary md:text-base">
                procesando...
              </span>
            </span>
          ) : (
            <button
              className="relative inline-flex items-center justify-start px-4 py-2 overflow-hidden font-medium transition-all bg-transparent border-2 group"
              onClick={() => onCreateOrder()}
            >
              <span className="w-48 h-48 rounded rotate-[-40deg] bg-primary group-hover:bg-tertiary absolute -bottom-2 -left-2 -translate-x-full ease-out duration-700 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span className="relative w-full text-sm text-left uppercase transition-all duration-700 ease-in-out group-hover:text-primary text-tertiary md:text-base">
                Confirmar pedido
              </span>
            </button>
          )}

          {errorMessage && (
            <label className="block mt-1 text-xs text-red-600 fadeIn dark:text-red-500">
              {errorMessage}
            </label>
          )}
        </div>
      </div>
    </div>
  );
};
