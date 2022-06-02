import {useState, useContext} from "react";
import Link from "next/link";
import {signIn, getSession} from "next-auth/react";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import {motion} from "framer-motion";

import {AuthLayout} from "../../components/layouts";
import {validations} from "../../utils";
import {AuthContext} from "../../context";
import {GetServerSideProps} from "next";

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
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);
  const {registerUser} = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const onRegisterUser = async ({name, email, password}: FormData) => {
    setShowError(false);
    const {hasError, message} = await registerUser(name, email, password);

    if (hasError) {
      setShowError(true);
      setErrorMessage(message || "Something went wrong");
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }
    // const destination = router.query.p?.toString() || "/";
    // router.replace(destination);
    await signIn("credentials", {email, password});
  };

  return (
    <AuthLayout title="Registrar" pageDescription="Página de registro">
      <div className="flex items-center justify-center w-full min-h-screen uppercase ">
        <div className="relative flex flex-col gap-6 overflow-hidden border-2 bg-primary">
          <motion.div
            className="absolute z-[999] left-0 top-0 w-full bg-tertiary"
            initial="hidden"
            animate="show"
            variants={variants}
            exit="exit"
          />
          <div className="px-6 pt-20 pb-12 mb-6">
            <h1 className="text-3xl font-bold md:text-4xl font-headline">
              BIENVENIDO
            </h1>
            <h1 className="text-3xl font-bold text-white md:text-4xl font-headline">
              A Dark Cómics.
            </h1>
            <p className="mt-4 text-sm md:text-base">
              Registrate para continuar!
            </p>
            {showError && (
              <label className="block text-xs text-red-600 fadeIn dark:text-red-500">
                {errorMessage}
              </label>
            )}
          </div>

          <form
            className="flex flex-col gap-4 px-6 md:w-[420px]"
            onSubmit={handleSubmit(onRegisterUser)}
            noValidate
          >
            <div className="relative z-0 flex items-end w-full h-12 border-b-2 group border-tertiary">
              <input
                type="name"
                className="z-[100] block w-full h-full px-2 pt-2 text-sm bg-transparent appearance-none peer:bg-red-600 focus:outline-none peer"
                placeholder=" "
                {...register("name", {
                  required: "El nombre es requerido",
                  minLength: {value: 2, message: "Mínimo 2 caracteres"},
                })}
              />
              <label
                htmlFor="name"
                className="z-[99] left-2 peer-focus:font-medium transition duration-300 ease-in-out peer-focus:text-white absolute text-sm text-tertiary  
            top-4 origin-[0] peer-focus:left-2 "
              >
                Nombre Completo
              </label>
            </div>
            {errors.name && (
              <label className="block text-xs text-red-600 dark:text-red-500">
                {errors.name.message}
              </label>
            )}
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
                className="z-[99] left-2 peer-focus:font-medium transition duration-300 ease-in-out peer-focus:text-white absolute text-sm text-tertiary  
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
                  Registrar
                </span>
              </button>
            </div>
          </form>
          <div className="flex flex-col items-center mb-5">
            <p className="text-sm text-center text-tertiary">
              ¿Ya tienes una cuenta?
            </p>
            <Link
              href={
                router.query.p
                  ? `/auth/login?p=${router.query.p}`
                  : "auth/login"
              }
              passHref
            >
              <a className="text-secondary">Loguéate</a>
            </Link>
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

export default RegisterPage;
