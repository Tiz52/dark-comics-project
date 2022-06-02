import {TransitionBox} from "../../components/commons";
import {AdminLayout} from "../../components/layouts";
import {
  DashboardOutlined,
  CreditCardOffOutlined,
  AttachMoneyOutlined,
  CreditCardOutlined,
  GroupOutlined,
  CategoryOutlined,
  CancelPresentationOutlined,
  ProductionQuantityLimitsOutlined,
  AccessTimeOutlined,
} from "@mui/icons-material";
import {SummaryTile} from "../../components/admin";
import useSWR from "swr";
import {DashboardSummaryResponse} from "../../interfaces";
import {useEffect, useState} from "react";

const DashboardPage = () => {
  const {data, error} = useSWR<DashboardSummaryResponse>(
    "/api/admin/dashboard",
    {
      refreshInterval: 30 * 1000,
    },
  );

  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!error && !data) {
    return <></>;
  }

  if (error) {
    console.log(error);
    return <div>Error al cargar la información</div>;
  }

  const {
    numberOfOrders,
    paidOrders,
    notPaidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventary,
    lowInventary,
  } = data!;

  return (
    <AdminLayout title={"Dashboard"}>
      <div className="flex flex-col items-center gap-4 px-5 py-6 uppercase md:px-10 lg:px-14 min-h-main">
        <TransitionBox />
        <h1 className="text-2xl font-headline md:text-4xl">Dashboard</h1>
        <h2>Información general</h2>
        <div className="grid w-full gap-4 mt-6 grid-cols-dashboardCard">
          <SummaryTile
            title={numberOfOrders}
            subTitle="Ordenes totales"
            icon={<CreditCardOutlined color="secondary" sx={{fontSize: 40}} />}
          />

          <SummaryTile
            title={paidOrders}
            subTitle="Ordenes pagadas"
            icon={<AttachMoneyOutlined color="success" sx={{fontSize: 40}} />}
          />

          <SummaryTile
            title={notPaidOrders}
            subTitle="Ordenes pendientes"
            icon={<CreditCardOffOutlined color="error" sx={{fontSize: 40}} />}
          />

          <SummaryTile
            title={numberOfClients}
            subTitle="Clientes"
            icon={<GroupOutlined color="error" sx={{fontSize: 40}} />}
          />

          <SummaryTile
            title={numberOfProducts}
            subTitle="Productos"
            icon={<CategoryOutlined color="warning" sx={{fontSize: 40}} />}
          />

          <SummaryTile
            title={productsWithNoInventary}
            subTitle="Sin Existencias"
            icon={
              <CancelPresentationOutlined color="error" sx={{fontSize: 40}} />
            }
          />

          <SummaryTile
            title={lowInventary}
            subTitle="Bajo inventario"
            icon={
              <ProductionQuantityLimitsOutlined
                color="warning"
                sx={{fontSize: 40}}
              />
            }
          />

          <SummaryTile
            title={refreshIn}
            subTitle="Actualización en: "
            icon={<AccessTimeOutlined color="secondary" sx={{fontSize: 40}} />}
          />
        </div>
      </div>
    </AdminLayout>
  );
};
export default DashboardPage;
