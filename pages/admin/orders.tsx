import {DataGrid, GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import Link from "next/link";
import useSWR from "swr";
import {TransitionBox} from "../../components/commons";
import {AdminLayout} from "../../components/layouts";
import {IOrder, IUser} from "../../interfaces";

const columns: GridColDef[] = [
  {field: "id", headerName: "Order ID", width: 250},
  {field: "email", headerName: "Correo", width: 250},
  {field: "name", headerName: "Nombre Completo", width: 300},
  {field: "total", headerName: "Monto total", width: 150},
  {
    field: "isPaid",
    headerName: "Pagada",
    width: 150,
    renderCell: ({row}: GridValueGetterParams) => {
      return row.isPaid ? (
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
    field: "noProducts",
    headerName: "No.Productos",
    align: "center",
    width: 150,
  },
  {
    field: "check",
    headerName: "Ver orden",
    renderCell: ({row}: GridValueGetterParams) => {
      return (
        <Link href={`/admin/orders/${row.id}`} passHref>
          <a target="_blank" className="font-semibold underline text-primary">
            Ver Orden
          </a>
        </Link>
      );
    },
  },
  {field: "createdAt", headerName: "Creada en", width: 300},
];

const OrdersPage = () => {
  const {data, error} = useSWR<IOrder[]>("/api/admin/orders");

  if (!data && !error) return <></>;

  const rows = data!.map((order) => ({
    id: order._id,
    email: (order.user as IUser).email,
    name: (order.user as IUser).name,
    total: order.total,
    isPaid: order.isPaid,
    noProducts: order.numberOfItems,
    createdAt: order.createdAt,
  }));

  return (
    <AdminLayout title={"Admin - Ordenes"}>
      <div className="flex flex-col items-center gap-4 px-5 py-6 uppercase md:px-10 lg:px-14 min-h-main">
        <TransitionBox />
        <h1 className="text-2xl font-headline md:text-4xl">órdenes</h1>
        <h2>Mantenimiento de ordenes</h2>
        <div className="flex justify-end w-full">
          <button
            className="relative inline-flex items-center justify-start px-4 py-2 overflow-hidden font-medium transition-all bg-transparent border-2 group "
            type="submit"
          >
            <span className="w-48 h-48 rounded rotate-[-40deg] bg-primary group-hover:bg-tertiary absolute -bottom-2 -left-2 -translate-x-full ease-out duration-700 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
            <span className="relative w-full text-sm text-left uppercase transition-all duration-700 ease-in-out group-hover:text-primary text-tertiary md:text-base">
              Agregar
            </span>
          </button>
        </div>
        <div className="w-full gap-4 mt-6 h-60 fadeIn">
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
                overflow: "visible",
                color: "white",
                fontSize: 16,
              },
              "& .MuiSvgIcon-root": {
                color: "white",
                overflow: "visible",
              },
              "& .MuiDataGrid-cell": {
                overflow: "visible",
              },
            }}
          />
        </div>
      </div>
    </AdminLayout>
  );
};
export default OrdersPage;
