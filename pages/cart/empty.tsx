import {PageLayout} from "../../components/layouts";
import {MdOutlineRemoveShoppingCart} from "react-icons/md";

const EmptyCartPage = () => {
  return (
    <PageLayout
      title="Carrito Vacío"
      pageDescription="Página del carrito vacío"
    >
      <div className="flex items-center justify-center h-main">
        <div className="flex flex-col items-center gap-2 md:flex-row text-tertiary">
          <MdOutlineRemoveShoppingCart className="inline-block w-20 h-20" />
          <h1 className="text-3xl font-bold text-tertiary font-monument md:text-5xl">
            Tu carrito está vacio
          </h1>
        </div>
      </div>
    </PageLayout>
  );
};
export default EmptyCartPage;
