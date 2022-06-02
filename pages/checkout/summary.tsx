import {useEffect, useContext} from "react";
import {useRouter} from "next/router";
import Cookies from "js-cookie";

import {CartList, Order} from "../../components/cart";
import {TransitionBox} from "../../components/commons";
import {PageLayout} from "../../components/layouts";
import {CartContext} from "../../context";

const OrderSummaryPage = () => {
  const router = useRouter();
  const {cart} = useContext(CartContext);

  useEffect(() => {
    if (!Cookies.get("firstName")) {
      router.push("/checkout/address");
    }
  }, [router]);

  return (
    <PageLayout title="Resumen" pageDescription="Resumen de la orden">
      <section className="px-[24px] lg:px-12 min-h-main">
        <TransitionBox />
        <div className="flex justify-center py-6">
          <h1 className="text-2xl font-headline md:text-4xl">ORDEN</h1>
        </div>
        <div className="flex flex-col-reverse gap-4 md:flex-row md:items-start">
          <CartList items={cart} editable={false} />
          <Order />
        </div>
      </section>
    </PageLayout>
  );
};
export default OrderSummaryPage;
