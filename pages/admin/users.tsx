import {useEffect, useState} from "react";
import {DataGrid, GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import useSWR from "swr";

import {TransitionBox, Select} from "../../components/commons";
import {AdminLayout} from "../../components/layouts";
import {IUser} from "../../interfaces";
import {darkComicsApi} from "../../api";

const UsersPage = () => {
  const {data, error} = useSWR<IUser[]>("/api/admin/users");
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  if (!data && !error) return <></>;

  const onRoleUpdated = async (userId: string, newRole: string) => {
    const previousUsers = users.map((user) => ({...user}));
    const updatedUsers = users.map((user) => ({
      ...user,
      role: userId === user._id ? newRole : user.role,
    }));

    setUsers(updatedUsers);

    try {
      await darkComicsApi.put("/admin/users", {userId, role: newRole});
    } catch (error) {
      setUsers(previousUsers);
      console.log(error);
      alert("No se pudo actualizar el rol del usuario");
    }
  };

  const columns: GridColDef[] = [
    {field: "email", headerName: "Correo", width: 250},
    {field: "name", headerName: "Nombre completo", width: 300},
    {
      field: "role",
      headerName: "Rol",
      width: 300,
      renderCell: ({row}: GridValueGetterParams) => {
        return (
          <Select
            value={row.role}
            onChange={(value) => onRoleUpdated(row.id, value)}
            options={["admin", "client", "super-user", "SEO"]}
          />
        );
      },
    },
  ];

  const rows = users.map((user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }));

  return (
    <AdminLayout title={"Admin - Usuarios"}>
      <div className="flex flex-col items-center gap-4 px-5 py-6 uppercase md:px-10 lg:px-14 min-h-main">
        <TransitionBox />
        <h1 className="text-2xl font-headline md:text-4xl">Usuarios</h1>
        <h2>Mantenimiento de usuarios</h2>
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
              "& .MuiDataGrid-main": {
                overflow: "visible",
              },
              "& .MuiDataGrid-virtualScroller": {
                overflowX: "visible !important",
                overflowY: "visible",
              },
            }}
          />
        </div>
      </div>
    </AdminLayout>
  );
};
export default UsersPage;
