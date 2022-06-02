import {FC, useState} from "react";
import {useRouter} from "next/router";
import {PayPalButtons} from "@paypal/react-paypal-js";

import {IOrder} from "../../interfaces";
import {currency} from "../../utils";
import {darkComicsApi} from "../../api";

type OrderResponseBody = {
  id: string;
  status:
    | "COMPLETED"
    | "SAVED"
    | "APPROVED"
    | "VOIDED"
    | "PAYER_ACTION_REQUIRED";
};

interface Props {
  order: IOrder;
}

export const OrderPayment: FC<Props> = ({order}) => {
  const [isPaying, setIsPaying] = useState(false);
  const router = useRouter();
  const {address, country, address2, city, lastName, firstName, phone, zip} =
    order.shippingAddress;

  const onOrderCompleted = async (details: OrderResponseBody) => {
    if (details.status !== "COMPLETED") {
      return alert("No hay pago en paypal");
    }

    setIsPaying(true);

    try {
      const {data} = await darkComicsApi.post("/orders/pay", {
        transactionId: details.id,
        orderId: order._id,
      });

      router.reload();
    } catch (error) {
      setIsPaying(false);
      console.log(error);
      alert("Error");
    }
  };

  return (
    <div className="p-3 divide-y-2 rounded-lg shadow-md divide-tertiary md:flex-auto md:p-4">
      <span className="text-base font-semibold md:text-lg lg:text-xl">
        Resumen ({order.numberOfItems}{" "}
        {order.numberOfItems === 1 ? "item" : "items"})
      </span>
      <div className="mt-2 mb-2">
        <div className="flex justify-between mt-2">
          <span>Estado</span>
          <span className="text-secondary">
            {order.isPaid ? "Pagado" : "No Pagado"}
          </span>
        </div>
      </div>
      <div className="mt-2 mb-2 text-sm xs:text-base">
        <div className="flex justify-between mt-2">
          <span className="font-bold">Dirección de entrega</span>
        </div>
        <div className="flex justify-between">
          <span>
            {firstName} {lastName}
          </span>
        </div>
        <div className="flex justify-between">
          <span>
            {address} {address2 ? address2 : ""}
          </span>
        </div>
        <div className="flex justify-between">
          <span>
            {city}, {zip}
          </span>
        </div>
        <div className="flex justify-between">
          <span>{country}</span>
        </div>
        <div className="flex justify-between">
          <span>{phone}</span>
        </div>
      </div>
      <div className="mt-2 mb-2 text-sm xs:text-base">
        <div className="flex justify-between mt-2">
          <span>No. Productos</span>
          <span className="text-white">
            {order.numberOfItems} {order.numberOfItems === 1 ? "item" : "items"}{" "}
          </span>
        </div>
        <div className="flex justify-between">
          <span>SubTotal</span>
          <span className="text-white">{currency.format(order.subTotal)}</span>
        </div>
        <div className="flex justify-between">
          Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)
          <span className="text-white">{currency.format(order.tax)}</span>
        </div>
        <div className="flex justify-between mt-2 font-bold md:text-base lg:text-xl">
          <span>Total</span>
          <span className="text-white">{currency.format(order.total)}</span>
        </div>

        {!isPaying && (
          <div className="flex justify-center mt-4 bg-primary ">
            {order.isPaid ? (
              <span className="relative inline-flex items-center justify-start px-4 py-2 overflow-hidden font-medium border-2 bg-primary group">
                <span className="relative w-full text-sm text-left uppercase ease-in-out text-tertiary md:text-base">
                  Pagado
                </span>
              </span>
            ) : (
              <>
                <PayPalButtons
                  className="w-full"
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: `${order.total}`,
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order!.capture().then((details) => {
                      onOrderCompleted(details);
                    });
                  }}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
