import {ChangeEvent, FC, useEffect, useRef, useState} from "react";
import {GetServerSideProps} from "next";

import {CloseOutlined} from "@mui/icons-material";

import {useForm} from "react-hook-form";

import {AdminLayout} from "../../../components/layouts";
import {IPublisher, PublisherData} from "../../../interfaces";
import {dbPublisher} from "../../../database";
import {darkComicsApi} from "../../../api";
import {Publisher} from "../../../models";
import {useRouter} from "next/router";
import {TransitionBox} from "../../../components/commons";
import ReactTextareaAutosize from "react-textarea-autosize";
import Image from "next/image";
import Swal from "sweetalert2";

interface FormData {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  banner: string;
}

interface Props {
  publisher: IPublisher;
}

const PublisherAdminPage: FC<Props> = ({publisher}) => {
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors},
    getValues,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: publisher,
  });

  useEffect(() => {
    const suscription = watch((value, {name}) => {
      if (name === "name") {
        const newSlug =
          value.name
            ?.trim()
            .replaceAll(" ", "-")
            .replaceAll("'", "")
            .toLowerCase() || "";

        setValue("slug", newSlug);
      }
    });

    return () => suscription.unsubscribe();
  }, [watch, setValue]);

  const onSubmit = async (form: FormData) => {
    if (form.banner.length < 1) return alert("Se necesita un banner");
    setIsSaving(true);
    try {
      const {data} = await darkComicsApi({
        url: "/admin/publishers",
        method: form._id ? "PUT" : "POST",
        data: form,
      });
      console.log({data});
      if (!form._id) {
        router.replace(`/admin/publishers/${form.slug}`);
      } else {
        setIsSaving(false);
      }

      //sweet alert
      Swal.fire({
        title: "Editorial guardado",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        background: "#212121",
        color: "#fff",
      });
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
  };

  const onFilesSelected = async ({target}: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) {
      return;
    }

    if (getValues("banner")) {
      return alert("Usted ya tiene un banner");
    }

    try {
      for (const file of target.files) {
        const formData = new FormData();

        formData.append("file", file);
        const {data} = await darkComicsApi.post<{message: string}>(
          "/admin/upload",
          formData,
        );

        setValue("banner", data.message, {
          shouldValidate: true,
        });
      }
    } catch (error) {}
  };

  const onDeleteImage = () => {
    setValue("banner", "", {shouldValidate: true});
  };

  return (
    <AdminLayout title={"Editorial"}>
      <section className="px-[24px] lg:px-16 min-h-main uppercase">
        <TransitionBox />
        <div className="flex flex-col items-center py-6">
          <h1 className="text-2xl font-headline md:text-4xl">Editoriales</h1>
          <h2>Editando: {publisher.name}</h2>
        </div>

        <form
          className="flex flex-col w-full gap-4 md:gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex w-full gap-4 md:gap-8">
            <div className="flex flex-col w-1/2 gap-8">
              <div>
                <div className="relative z-0 flex items-end w-full h-12 border-b-2 group border-tertiary">
                  <input
                    type="text"
                    className="z-[100] block w-full h-full px-2 pt-2 text-sm bg-transparent appearance-none peer:bg-red-600 focus:outline-none peer"
                    placeholder=" "
                    {...register("name", {
                      required: "Este campo es requerido",
                    })}
                  />
                  <label
                    htmlFor="name"
                    className="z-[99] left-2 peer-focus:font-medium transition duration-300 ease-in-out peer-focus:text-white absolute text-sm text-tertiary  
              top-4 origin-[0] peer-focus:left-2 "
                  >
                    Nombre
                  </label>
                </div>
                {errors.name && (
                  <label className="block mt-1 text-xs text-red-600 fadeIn dark:text-red-500">
                    {errors.name.message}
                  </label>
                )}
              </div>

              <div>
                <div className="flex justify-start w-full px-2">
                  <label className="text-[0.65625rem] leading-[0.9375rem] mb-1">
                    Descripción
                  </label>
                </div>
                <ReactTextareaAutosize
                  className="z-[100] block w-full h-full px-2 pt-0 pb-2 text-sm bg-transparent border-b-2 appearance-none peer:bg-red-600 focus:outline-none peer"
                  {...register("description", {
                    required: "Este campo es requerido",
                  })}
                  minRows={3}
                />
                {errors.description && (
                  <label className="block mt-1 text-xs text-red-600 fadeIn dark:text-red-500">
                    {errors.description.message}
                  </label>
                )}
              </div>
            </div>

            <div className="flex flex-col w-1/2 gap-8">
              <div>
                <div className="relative z-0 flex items-end w-full h-12 border-b-2 group border-tertiary">
                  <input
                    type="text"
                    className="z-[100] block w-full h-full px-2 pt-2 text-sm bg-transparent appearance-none peer:bg-red-600 focus:outline-none peer"
                    placeholder=" "
                    {...register("slug", {
                      required: "Este campo es requerido",
                    })}
                  />
                  <label
                    htmlFor="slug"
                    className="z-[99] left-2 peer-focus:font-medium transition duration-300 ease-in-out peer-focus:text-white absolute text-sm text-tertiary  
                    top-4 origin-[0] peer-focus:left-2 "
                  >
                    Slug-URL
                  </label>
                </div>
                {errors.slug && (
                  <label className="block mt-1 text-xs text-red-600 fadeIn dark:text-red-500">
                    {errors.slug.message}
                  </label>
                )}
              </div>

              {/* Imágenes */}
              <div>
                <div className="flex justify-start w-full">
                  <label className="text-[0.65625rem] leading-[0.9375rem]  translate-x-0 mb-1">
                    Banner
                  </label>
                </div>
                <input
                  type="file"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={onFilesSelected}
                />
                <button
                  className="relative inline-flex items-center justify-start w-full px-4 py-2 overflow-hidden font-medium transition-all bg-transparent border-2 hover:border-white hover:text-white text-tertiary"
                  onClick={() => fileInputRef.current?.click()}
                  type="button"
                >
                  <span className="relative w-full text-xs text-center uppercase transition-all duration-700 ease-in-out">
                    Agregar Banner
                  </span>
                </button>
              </div>
              <div className="flex gap-4">
                {getValues("banner") && (
                  <div className="relative fadeIn">
                    <button
                      type="button"
                      onClick={() => onDeleteImage()}
                      className="absolute top-0 right-0 z-10 text-xl bg-primary icon hover:bg-primary"
                    >
                      <CloseOutlined />
                    </button>
                    <Image
                      src={getValues("banner")}
                      alt={getValues("banner")}
                      width={100}
                      height={150}
                      objectFit="cover"
                      quality={50}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-12 md:col-span-2">
            {isSaving ? (
              <span className="relative inline-flex items-center justify-start px-4 py-2 overflow-hidden font-medium border-2 cursor-not-allowed bg-primary group">
                <span className="relative w-full text-sm text-left uppercase ease-in-out text-tertiary md:text-base">
                  procesando...
                </span>
              </span>
            ) : (
              <button
                className="relative inline-flex items-center justify-start px-4 py-2 overflow-hidden font-medium transition-all bg-transparent border-2 group "
                type="submit"
              >
                <span className="w-48 h-48 rounded rotate-[-40deg] bg-primary group-hover:bg-tertiary absolute -bottom-2 -left-2 -translate-x-full ease-out duration-700 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                <span className="relative w-full text-sm text-left uppercase transition-all duration-700 ease-in-out group-hover:text-primary text-tertiary md:text-base">
                  Guardar
                </span>
              </button>
            )}
          </div>
        </form>
      </section>
    </AdminLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const {slug = ""} = query;

  let publisher: IPublisher | null;

  if (slug === "new") {
    const tempPublisher = JSON.parse(JSON.stringify(new Publisher()));
    delete tempPublisher._id;
    tempPublisher.banner =
      "https://res.cloudinary.com/tiz52/image/upload/v1654132785/z8aa7hx7r7atg3ojge9b.jpg";
    publisher = tempPublisher;
  } else {
    publisher = await dbPublisher.getPublisherBySlug(slug.toString());
  }

  if (!publisher) {
    return {
      redirect: {
        destination: "/admin/publishers",
        permanent: false,
      },
    };
  }

  return {
    props: {
      publisher,
    },
  };
};

export default PublisherAdminPage;
