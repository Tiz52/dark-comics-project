import {useRouter} from "next/router";
import {useContext, useEffect} from "react";

import {CartList, OrderSummary} from "../../components/cart";
import {TransitionBox} from "../../components/commons";
import {PageLayout} from "../../components/layouts";
import {CartContext} from "../../context";

const CartPage = () => {
  const {isLoaded, cart, numbersOfItems} = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.replace("/cart/empty");
    }
  }, [isLoaded, cart, router]);

  if (!isLoaded || cart.length === 0) {
    return <></>;
  }
  return (
    <PageLayout
      title={`Carrito - ${numbersOfItems}`}
      pageDescription="Carrito de compras"
    >
      <section className="px-[24px] lg:px-12 min-h-main">
        <TransitionBox />
        <div className="py-6">
          <h1 className="text-2xl text-center text-tertiary font-headline md:text-4xl">
            CARRITO
          </h1>
        </div>
        <div className="flex flex-col-reverse gap-4 md:flex-row md:items-start">
          <CartList items={cart} editable />
          <OrderSummary />
        </div>
      </section>
    </PageLayout>
  );
};
export default CartPage;
