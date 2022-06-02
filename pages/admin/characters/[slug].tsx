import {ChangeEvent, FC, useEffect, useRef, useState} from "react";
import {GetServerSideProps} from "next";

import {CloseOutlined} from "@mui/icons-material";

import {useForm} from "react-hook-form";

import {AdminLayout} from "../../../components/layouts";
import {ICharacter, PublisherData} from "../../../interfaces";
import {dbCharacter, dbPublisher} from "../../../database";
import {darkComicsApi} from "../../../api";
import {Character} from "../../../models";
import {useRouter} from "next/router";
import {EditSelect, TransitionBox} from "../../../components/commons";
import Image from "next/image";
import Swal from "sweetalert2";
interface FormData {
  _id?: string;
  name: string;
  slug: string;
  image: string;
  publisher: string;
}

interface Props {
  character: ICharacter;
  publishers: PublisherData[];
}

const CharacterAdminPage: FC<Props> = ({character, publishers}) => {
  const router = useRouter();

  const [publisherSelected, setPublisherSelected] = useState(
    character.publisher,
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState(false);

  const onNewPublisher = (value: string) => {
    setPublisherSelected(value);
    setValue("publisher", value);
  };

  const {
    register,
    handleSubmit,
    formState: {errors},
    getValues,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: character,
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
    if (form.image.length < 1) return alert("Se necesita una imagen");
    setIsSaving(true);
    try {
      const {data} = await darkComicsApi({
        url: "/admin/characters",
        method: form._id ? "PUT" : "POST",
        data: form,
      });
      if (!form._id) {
        router.replace(`/admin/characters/${form.slug}`);
      } else {
        setIsSaving(false);
      }
      //sweet alert
      Swal.fire({
        title: "Personaje guardado",
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

    if (getValues("image")) {
      return alert("Usted ya tiene una imagen");
    }

    try {
      for (const file of target.files) {
        const formData = new FormData();

        formData.append("file", file);
        const {data} = await darkComicsApi.post<{message: string}>(
          "/admin/upload",
          formData,
        );

        setValue("image", data.message, {
          shouldValidate: true,
        });
      }
    } catch (error) {}
  };

  const onDeleteImage = () => {
    setValue("image", "", {shouldValidate: true});
  };

  return (
    <AdminLayout title={"Personaje"}>
      <section className="px-[24px] lg:px-16 min-h-main uppercase">
        <TransitionBox />
        <div className="flex flex-col items-center py-6">
          <h1 className="text-2xl font-headline md:text-4xl">Personajes</h1>
          <h2>Editando: {character.name}</h2>
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
                <EditSelect
                  title="Publicadora"
                  options={publishers.map((p) => p.name)}
                  value={publisherSelected}
                  onChange={onNewPublisher}
                />
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
                    Agregar Imagen
                  </span>
                </button>
              </div>
              <div className="flex gap-4">
                {getValues("image") && (
                  <div className="relative fadeIn">
                    <button
                      type="button"
                      onClick={() => onDeleteImage()}
                      className="absolute top-0 right-0 z-10 text-xl bg-primary icon hover:bg-primary"
                    >
                      <CloseOutlined />
                    </button>
                    <Image
                      src={getValues("image")}
                      alt={getValues("image")}
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

  let character: ICharacter | null;

  if (slug === "new") {
    const tempCharacter = JSON.parse(JSON.stringify(new Character()));
    delete tempCharacter._id;
    (tempCharacter.image =
      "https://res.cloudinary.com/tiz52/image/upload/v1654132785/z8aa7hx7r7atg3ojge9b.jpg"),
      (character = tempCharacter);
  } else {
    character = await dbCharacter.getCharacterBySlug(slug.toString());
  }

  const publishers = await dbPublisher.getAllPublishersData();

  if (!character) {
    return {
      redirect: {
        destination: "/admin/characters",
        permanent: false,
      },
    };
  }

  return {
    props: {
      character,
      publishers,
    },
  };
};

export default CharacterAdminPage;
