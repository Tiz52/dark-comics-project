import {PageLayout} from "../../components/layouts";
import Link from "next/link";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import {getSession} from "next-auth/react";
import {GetServerSideProps, NextPage} from "next";
import {dbOrders} from "../../database";
import {IOrder} from "../../interfaces";
import {TransitionBox} from "../../components/commons/TransitionBox";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    minWidth: 50,
  },
  {
    field: "fullname",
    headerName: "Nombre Completo",
    flex: 1,
    minWidth: 300,
  },
  {
    field: "paid",
    headerName: "Pagado",
    minWidth: 200,
    renderCell: (params: GridValueGetterParams) => {
      return params.row.paid ? (
        <div className="flex items-center justify-center w-24 h-8 text-green-600 border-2 border-green-600 rounded-full">
          <span className="font-semibold">Pagado</span>
        </div>
      ) : (
        <div className="flex items-center justify-center w-24 h-8 text-red-600 border-2 border-red-600 rounded-full">
          <span className="font-semibold">No Pagado</span>
        </div>
      );
    },
  },
  {
    field: "order",
    headerName: "Orden",
    minWidth: 150,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <Link href={`/orders/${params.row.orderId}`} passHref>
          <a className="font-semibold underline text-primary">Ver Orden</a>
        </Link>
      );
    },
  },
];

interface Props {
  orders: IOrder[];
}

const HistoryPage: NextPage<Props> = ({orders}) => {
  const rows: GridRowsProp = orders.map((o, i) => ({
    id: i + 1,
    fullname: o.shippingAddress.firstName + " " + o.shippingAddress.lastName,
    paid: o.isPaid,
    orderId: o._id,
  }));

  return (
    <PageLayout
      title="Historial"
      pageDescription="Página del historial de compras"
    >
      <section className="px-[24px] min-h-main uppercase lg:px-12">
        <TransitionBox />
        <div className="py-6">
          <h1 className="text-2xl text-center text-tertiary font-headline md:text-4xl">
            Historial de Ordenes
          </h1>
        </div>
        <DataGrid
          className="bg-tertiary"
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          autoHeight
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "black",
              color: "white",
              fontSize: 16,
            },
            "& .MuiSvgIcon-root": {
              color: "white",
            },
          }}
        />
      </section>
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const session: any = await getSession({req});

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login?p=/orders/history",
        permanent: false,
      },
    };
  }

  const orders = await dbOrders.getOrdersByUser(session.user._id);

  return {
    props: {
      orders,
    },
  };
};

export default HistoryPage;
