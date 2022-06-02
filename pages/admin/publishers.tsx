import {DataGrid, GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import useSWR from "swr";
import {TransitionBox} from "../../components/commons";
import {AdminLayout} from "../../components/layouts";
import {IPublisher} from "../../interfaces";
import {query} from "../../utils";

const columns: GridColDef[] = [
  {
    field: "banner",
    headerName: "Foto",
    renderCell: ({row}: GridValueGetterParams) => {
      return (
        <a
          className="relative"
          href={`/${row.slug}`}
          target="_blank"
          rel="noreferrer"
        >
          <Image
            width={150}
            height={200}
            alt={row.name}
            className="fadeIn"
            src={row.banner}
            objectFit="cover"
          />
        </a>
      );
    },
  },
  {
    field: "name",
    headerName: "Nombre",
    width: 250,
    renderCell: ({row}: GridValueGetterParams) => {
      return (
        <Link href={`/admin/publishers/${row.slug}`} passHref>
          <a className="truncate">{row.name}</a>
        </Link>
      );
    },
  },
  {field: "slug", headerName: "slug", width: 200},
  {field: "description", headerName: "descripción", width: 200},
];

const PublishesPage = () => {
  const {data, error} = useSWR<IPublisher[]>("/api/admin/publishers");
  const router = useRouter();
  if (!data && !error) return <></>;

  const rows = data!.map((publisher) => ({
    id: publisher._id,
    banner: publisher.banner,
    name: publisher.name,
    slug: publisher.slug,
    description: publisher.description,
  }));

  return (
    <AdminLayout title={"Admin - Editoriales"}>
      <div className="flex flex-col items-center gap-4 px-5 py-6 uppercase md:px-10 lg:px-14 min-h-main">
        <TransitionBox />
        <h1 className="text-2xl font-headline md:text-4xl">Editoriales</h1>
        <h2>Mantenimiento de Editoriales</h2>
        <div className="flex justify-end w-full">
          <button
            className="relative inline-flex items-center justify-start px-4 py-2 overflow-hidden font-medium transition-all bg-transparent border-2 group "
            type="submit"
            onClick={() => router.push("/admin/publishers/new")}
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
            pageSize={9}
            rowsPerPageOptions={[9]}
            autoHeight
            rowHeight={100}
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
            }}
          />
        </div>
      </div>
    </AdminLayout>
  );
};
export default PublishesPage;
