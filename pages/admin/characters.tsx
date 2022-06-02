import {DataGrid, GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import useSWR from "swr";
import {TransitionBox} from "../../components/commons";
import {AdminLayout} from "../../components/layouts";
import {ICharacter} from "../../interfaces";
import {query} from "../../utils";

const columns: GridColDef[] = [
  {
    field: "img",
    headerName: "Foto",
    renderCell: ({row}: GridValueGetterParams) => {
      return (
        <a
          className="relative"
          href={`/${query.publisher(row.publisher)}/${query.character(
            row.slug,
          )}`}
          target="_blank"
          rel="noreferrer"
        >
          <Image
            width={150}
            height={200}
            alt={row.name}
            className="fadeIn"
            src={row.img}
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
        <Link href={`/admin/characters/${row.slug}`} passHref>
          <a className="truncate">{row.name}</a>
        </Link>
      );
    },
  },
  {field: "slug", headerName: "Slug", width: 200},
  {field: "publisher", headerName: "Editorial", width: 200},
];

const CharactersPage = () => {
  const {data, error} = useSWR<ICharacter[]>("/api/admin/characters");
  const router = useRouter();
  if (!data && !error) return <></>;

  const rows = data!.map((character) => ({
    id: character._id,
    publisher: character.publisher,
    img: character.image,
    name: character.name,
    slug: character.slug,
  }));

  return (
    <AdminLayout title={"Admin - Personajes"}>
      <div className="flex flex-col items-center gap-4 px-5 py-6 uppercase md:px-10 lg:px-14 min-h-main">
        <TransitionBox />
        <h1 className="text-2xl font-headline md:text-4xl">Personajes</h1>
        <h2>Mantenimiento de personajes</h2>
        <div className="flex justify-end w-full">
          <button
            className="relative inline-flex items-center justify-start px-4 py-2 overflow-hidden font-medium transition-all bg-transparent border-2 group "
            type="submit"
            onClick={() => router.push("/admin/characters/new")}
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
export default CharactersPage;
