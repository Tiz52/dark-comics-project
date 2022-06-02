import {useContext, useEffect} from "react";
import {useRouter} from "next/router";

import Cookies from "js-cookie";
import {PageLayout} from "../../components/layouts";
import {TransitionBox} from "../../components/commons";
import {useForm} from "react-hook-form";
import {CartContext} from "../../context";
import {countries} from "../../utils";

type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
};

const getAddressFromCookies = (): FormData => {
  return {
    firstName: Cookies.get("firstName") || "",
    lastName: Cookies.get("lastName") || "",
    address: Cookies.get("address") || "",
    address2: Cookies.get("address2") || "",
    zip: Cookies.get("zip") || "",
    city: Cookies.get("city") || "",
    country: Cookies.get("country") || "",
    phone: Cookies.get("phone") || "",
  };
};

const AddressPage = () => {
  const router = useRouter();
  const {updateAddress} = useContext(CartContext);

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      address2: "",
      zip: "",
      city: "",
      country: countries[0].code,
      phone: "",
    },
  });

  useEffect(() => {
    reset(getAddressFromCookies());
  }, [reset]);

  const onSubmitAddress = (data: FormData) => {
    updateAddress(data);
    router.push("/checkout/summary");
  };

  return (
    <PageLayout title="Dirección" pageDescription="Confirmar dirección">
      <section className="px-[24px] lg:px-16 min-h-main uppercase">
        <TransitionBox />
        <div className="flex justify-center py-6">
          <h1 className="text-2xl font-headline md:text-4xl">DIRECCIÓN</h1>
        </div>

        <form
          className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2 group"
          onSubmit={handleSubmit(onSubmitAddress)}
        >
          <div>
            <div className="relative z-0 flex items-end w-full h-12 border-b-2 group border-tertiary">
              <input
                type="firstname"
                className="z-[100] block w-full h-full px-2 pt-2 text-sm bg-transparent appearance-none peer:bg-red-600 focus:outline-none peer"
                placeholder=" "
                {...register("firstName", {
                  required: "Este campo es requerido",
                })}
              />
              <label
                htmlFor="firstname"
                className="z-[99] left-2 peer-focus:font-medium transition duration-300 ease-in-out peer-focus:text-white absolute text-sm text-tertiary  
            top-4 origin-[0] peer-focus:left-2 "
              >
                Nombre
              </label>
            </div>
            {errors.firstName && (
              <label className="block mt-1 text-xs text-red-600 fadeIn dark:text-red-500">
                {errors.firstName.message}
              </label>
            )}
          </div>
          <div>
            <div className="relative z-0 flex items-end w-full h-12 border-b-2 group border-tertiary">
              <input
                type="lastname"
                className="z-[100] block w-full h-full px-2 pt-2 text-sm bg-transparent appearance-none peer:bg-red-600 focus:outline-none peer"
                placeholder=" "
                {...register("lastName", {
                  required: "Este campo es requerido",
                })}
              />
              <label
                htmlFor="lastName"
                className="z-[99] left-2 peer-focus:font-medium transition duration-300 ease-in-out peer-focus:text-white absolute text-sm text-tertiary  
            top-4 origin-[0] peer-focus:left-2 "
              >
                Apellido
              </label>
            </div>
            {errors.lastName && (
              <label className="block mt-1 text-xs text-red-600 fadeIn dark:text-red-500">
                {errors.lastName.message}
              </label>
            )}
          </div>

          <div>
            <div className="relative z-0 flex items-end w-full h-12 border-b-2 group border-tertiary">
              <input
                type="address"
                className="z-[100] block w-full h-full px-2 pt-2 text-sm bg-transparent appearance-none peer:bg-red-600 focus:outline-none peer"
                placeholder=" "
                {...register("address", {
                  required: "Este campo es requerido",
                })}
              />
              <label
                htmlFor="address"
                className="z-[99] left-2 peer-focus:font-medium transition duration-300 ease-in-out peer-focus:text-white absolute text-sm text-tertiary  
            top-4 origin-[0] peer-focus:left-2 "
              >
                Dirección
              </label>
            </div>
            {errors.address && (
              <label className="block mt-1 text-xs text-red-600 fadeIn dark:text-red-500">
                {errors.address.message}
              </label>
            )}
          </div>

          <div className="relative z-0 flex items-end w-full h-12 border-b-2 group border-tertiary">
            <input
              type="address2"
              className="z-[100] block w-full h-full px-2 pt-2 text-sm bg-transparent appearance-none peer:bg-red-600 focus:outline-none peer"
              placeholder=" "
              {...register("address2")}
            />
            <label
              htmlFor="address2"
              className="z-[99] left-2 peer-focus:font-medium transition duration-300 ease-in-out peer-focus:text-white absolute text-sm text-tertiary  
            top-4 origin-[0] peer-focus:left-2 "
            >
              Dirección 2 (opcional)
            </label>
          </div>
          <div>
            <div className="relative z-0 flex items-end w-full h-12 border-b-2 group border-tertiary">
              <input
                type="zip"
                className="z-[100] block w-full h-full px-2 pt-2 text-sm bg-transparent appearance-none peer:bg-red-600 focus:outline-none peer"
                placeholder=" "
                {...register("zip", {
                  required: "Este campo es requerido",
                })}
              />
              <label
                htmlFor="zip"
                className="z-[99] left-2 peer-focus:font-medium transition duration-300 ease-in-out peer-focus:text-white absolute text-sm text-tertiary  
            top-4 origin-[0] peer-focus:left-2 "
              >
                Código Postal
              </label>
              {errors.zip && (
                <label className="block mt-1 text-xs text-red-600 fadeIn dark:text-red-500">
                  {errors.zip.message}
                </label>
              )}
            </div>
          </div>
          <div>
            <div className="relative z-0 flex items-end w-full h-12 border-b-2 group border-tertiary">
              <input
                type="country"
                className="z-[100] block w-full h-full px-2 pt-2 text-sm bg-transparent appearance-none peer:bg-red-600 focus:outline-none peer"
                placeholder=" "
                {...register("country", {
                  required: "Este campo es requerido",
                })}
              />
              <label
                htmlFor="country"
                className="z-[99] left-2 peer-focus:font-medium transition duration-300 ease-in-out peer-focus:text-white absolute text-sm text-tertiary  
            top-4 origin-[0] peer-focus:left-2 "
              >
                País
              </label>
            </div>
            {errors.country && (
              <label className="block mt-1 text-xs text-red-600 fadeIn dark:text-red-500">
                {errors.country.message}
              </label>
            )}
          </div>
          <div>
            <div className="relative z-0 flex items-end w-full h-12 border-b-2 group border-tertiary">
              <input
                type="city"
                className="z-[100] block w-full h-full px-2 pt-2 text-sm bg-transparent appearance-none peer:bg-red-600 focus:outline-none peer"
                placeholder=" "
                {...register("city", {
                  required: "Este campo es requerido",
                })}
              />
              <label
                htmlFor="city"
                className="z-[99] left-2 peer-focus:font-medium transition duration-300 ease-in-out peer-focus:text-white absolute text-sm text-tertiary  
            top-4 origin-[0] peer-focus:left-2 "
              >
                Ciudad
              </label>
            </div>
            {errors.city && (
              <label className="block mt-1 text-xs text-red-600 fadeIn dark:text-red-500">
                {errors.city.message}
              </label>
            )}
          </div>

          <div>
            <div className="relative z-0 flex items-end w-full h-12 border-b-2 group border-tertiary">
              <input
                type="phone"
                className="z-[100] block w-full h-full px-2 pt-2 text-sm bg-transparent appearance-none peer:bg-red-600 focus:outline-none peer"
                placeholder=" "
                {...register("phone", {
                  required: "Este campo es requerido",
                })}
              />
              <label
                htmlFor="phone"
                className="z-[99] left-2 peer-focus:font-medium transition duration-300 ease-in-out peer-focus:text-white absolute text-sm text-tertiary  
            top-4 origin-[0] peer-focus:left-2 "
              >
                Teléfono
              </label>
            </div>
            {errors.phone && (
              <label className="block mt-1 text-xs text-red-600 fadeIn dark:text-red-500">
                {errors.phone.message}
              </label>
            )}
          </div>

          <div className="flex justify-center mt-8 md:col-span-2">
            <button
              className="relative inline-flex items-center justify-start px-4 py-2 overflow-hidden font-medium transition-all bg-transparent border-2 group"
              type="submit"
            >
              <span className="w-48 h-48 rounded rotate-[-40deg] bg-primary group-hover:bg-tertiary absolute -bottom-2 -left-2 -translate-x-full ease-out duration-700 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span className="relative w-full text-sm text-left uppercase transition-all duration-700 ease-in-out group-hover:text-primary text-tertiary md:text-base">
                Revisar Pedido
              </span>
            </button>
          </div>
        </form>
      </section>
    </PageLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// export const getServerSideProps: GetServerSideProps = async ({ req }) => {

//     const { token = '' } = req.cookies;
//     let isValidToken = false;

//     try {
//         await jwt.isValidToken( token );
//         isValidToken = true;
//     } catch (error) {
//         isValidToken = false;
//     }

//     if ( !isValidToken ) {
//         return {
//             redirect: {
//                 destination: '/auth/login?p=/checkout/address',
//                 permanent: false,
//             }
//         }
//     }

//     return {
//         props: {

//         }
//     }
// }

export default AddressPage;
