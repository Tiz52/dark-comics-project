import {GetServerSideProps, NextPage} from "next";
import {getSession} from "next-auth/react";
import {CartList, OrderPayment} from "../../components/cart";
import {TransitionBox} from "../../components/commons";
import {PageLayout} from "../../components/layouts";
import {dbOrders} from "../../database";
import {IOrder} from "../../interfaces";

interface Props {
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({order}) => {
  return (
    <PageLayout
      title={`Orden: ${order._id}`}
      pageDescription="Resumen de la orden"
    >
      <section className="px-[24px] uppercase lg:px-12 min-h-main">
        <TransitionBox />
        <div className="flex justify-center py-6">
          <h1 className="text-2xl text-center text-tertiary font-headline md:text-4xl">
            ORDEN {order._id}
          </h1>
        </div>
        <div className="flex flex-col-reverse gap-4 md:flex-row md:items-start">
          <CartList items={order.orderItems} editable={false} />
          <OrderPayment order={order} />
        </div>
      </section>
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
  const {id = ""} = query;
  const session: any = await getSession({req});

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false,
      },
    };
  }

  //Se puede hacer una petición http
  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: "/orders/history",
        permanent: false,
      },
    };
  }

  if (order.user !== session.user._id) {
    return {
      redirect: {
        destination: "/orders/history",
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};

export default OrderPage;
