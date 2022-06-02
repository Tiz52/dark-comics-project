import {GetServerSideProps, NextPage} from "next";
import {
  AdminOrderSummary,
  CartList,
  OrderPayment,
} from "../../../components/cart";
import {TransitionBox} from "../../../components/commons";
import {AdminLayout} from "../../../components/layouts";
import {dbOrders} from "../../../database";
import {IOrder} from "../../../interfaces";

interface Props {
  order: IOrder;
}

const OrderAdminPage: NextPage<Props> = ({order}) => {
  return (
    <AdminLayout title={`Orden: ${order._id}`}>
      <section className="px-[24px] uppercase lg:px-12 min-h-main">
        <TransitionBox />
        <div className="flex justify-center py-6">
          <h1 className="text-2xl text-center text-tertiary font-headline md:text-4xl">
            ORDEN {order._id}
          </h1>
        </div>
        <div className="flex flex-col-reverse gap-4 md:flex-row md:items-start">
          <CartList items={order.orderItems} editable={false} />
          <AdminOrderSummary order={order} />
        </div>
      </section>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
  const {id = ""} = query;

  //Se puede hacer una petición http
  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: "/admin/orders",
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

export default OrderAdminPage;
