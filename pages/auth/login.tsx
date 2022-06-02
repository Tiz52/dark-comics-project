import Link from "next/link";
import {GetServerSideProps} from "next";
import {motion} from "framer-motion";
import {useForm} from "react-hook-form";
import {signIn, getSession, getProviders} from "next-auth/react";

import {AuthLayout} from "../../components/layouts";
import {validations} from "../../utils";
import {useState, useEffect} from "react";
// import {AuthContext} from "../../context";
import {useRouter} from "next/router";

const variants = {
  hidden: {
    opacity: 1,
    height: "100%",
  },
  show: {
    height: "1%",
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 1,
    height: "100%",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);
  const [providers, setProviders] = useState<any>({});
  // const {loginUser} = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    getProviders().then((providers) => setProviders(providers));
  }, []);

  const onLoginUser = async ({email, password}: FormData) => {
    setShowError(false);

    // const isValidLogin = await loginUser(email, password);

    // if (!isValidLogin) {
    //   setShowError(true);
    //   setTimeout(() => {
    //     setShowError(false);
    //   }, 3000);
    //   return;
    // }

    // const destination = router.query.p?.toString() || "/";

    // router.replace(destination);

    await signIn("credentials", {email, password});
  };

  return (
    <AuthLayout title="Ingresar" pageDescription="Página de login">
      <div className="flex items-center justify-center w-full min-h-screen uppercase">
        <div className="relative flex flex-col gap-6 overflow-hidden border-2 bg-primary">
          <motion.div
            className="absolute z-[999] left-0 top-0 w-full bg-tertiary"
            initial="hidden"
            animate="show"
            variants={variants}
            exit="exit"
          />
          <div className="px-6 pt-20 pb-12 mb-6">
            <h1 className="text-3xl font-bold md:text-4xl font-headline text-tertiary">
              BIENVENIDO
            </h1>
            <h1 className="text-3xl font-bold text-white md:text-4xl font-headline">
              a Dark Cómics.
            </h1>
            <p className="mt-4 text-sm md:text-base text-tertiary">
              Inicia sesión para continuar!
            </p>
            {showError && (
              <label className="block text-xs text-red-600 fadeIn dark:text-red-500">
                No reconocemos ese usuario / contraseña
              </label>
            )}
          </div>

          <form
            className="flex flex-col gap-4 px-6 md:w-[420px]"
            onSubmit={handleSubmit(onLoginUser)}
            noValidate
          >
            <div className="relative z-0 flex items-end w-full h-12 border-b-2 group border-tertiary">
              <input
                type="email"
                className="z-[100] block w-full h-full px-2 pt-2 text-sm bg-transparent appearance-none peer:bg-red-600 focus:outline-none peer"
                placeholder=" "
                {...register("email", {
                  required: "El email es requerido",
                  validate: validations.isEmail,
                })}
              />
              <label
                htmlFor="email"
                className="fadeIn z-[99] left-2 peer-focus:font-medium transition duration-300 ease-in-out peer-focus:text-white absolute text-sm text-tertiary  
            		top-4 origin-[0] peer-focus:left-2 "
              >
                Correo
              </label>
            </div>
            {errors.email && (
              <label className="block text-xs text-red-600 dark:text-red-500">
                {errors.email.message}
              </label>
            )}
            <div className="relative z-0 flex items-end w-full h-12 border-b-2 group border-tertiary">
              <input
                type="password"
                className="z-[100] block w-full h-full px-2 pt-2 text-sm bg-transparent appearance-none peer:bg-red-600 focus:outline-none peer"
                placeholder=" "
                {...register("password", {
                  required: "La contraseña es requerida",
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres",
                  },
                })}
              />
              <label
                htmlFor="password"
                className="z-[99] left-2 peer-focus:font-medium transition duration-300 ease-in-out peer-focus:text-white absolute text-sm text-tertiary  
            		top-4 origin-[0] peer-focus:left-2 "
              >
                Contraseña
              </label>
            </div>
            {errors.password && (
              <label className="block text-xs text-red-600 fadeIn dark:text-red-500">
                {errors.password.message}
              </label>
            )}
            <div className="mx-auto mt-8">
              <button
                className="relative inline-flex items-center justify-start px-4 py-2 overflow-hidden font-medium transition-all bg-transparent border-2 group"
                type="submit"
              >
                <span className="w-48 h-48 rounded rotate-[-40deg] bg-primary group-hover:bg-tertiary absolute -bottom-2 -left-2 -translate-x-full ease-out duration-700 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                <span className="relative w-full text-sm text-left uppercase transition-all duration-700 ease-in-out group-hover:text-primary text-tertiary md:text-base">
                  Iniciar Sesión
                </span>
              </button>
            </div>
          </form>
          <div className="flex flex-col items-center">
            <p className="text-sm text-center ">¿No tienes una cuenta?</p>
            <Link
              href={
                router.query.p
                  ? `/auth/register?p=${router.query.p}`
                  : "auth/register"
              }
              passHref
            >
              <a className="text-secondary">Registrate</a>
            </Link>
          </div>
          <div className="flex flex-col items-center mb-5">
            {Object.values(providers).map((provider: any) => {
              if (provider.name === "credentials")
                return <div key="credentials"></div>;

              return (
                <button
                  key={provider.name}
                  className="relative inline-flex items-center justify-start px-4 py-2 overflow-hidden font-medium transition-all bg-transparent border-2 group"
                  onClick={() => signIn(provider.id)}
                >
                  <span className="w-48 h-48 rounded rotate-[-40deg] bg-primary group-hover:bg-tertiary absolute -bottom-2 -left-2 -translate-x-full ease-out duration-700 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                  <span className="relative w-full text-sm text-left uppercase transition-all duration-700 ease-in-out group-hover:text-primary text-tertiary md:text-base">
                    {provider.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
  const session = await getSession({req});
  const {p = "/"} = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
