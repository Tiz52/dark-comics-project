import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {GetServerSideProps} from "next";
import Image from "next/image";
import {CloseOutlined} from "@mui/icons-material";
import ReactTextareaAutosize from "react-textarea-autosize";
import {useForm} from "react-hook-form";

import {AdminLayout} from "../../../components/layouts";
import {IComic, PublisherData} from "../../../interfaces";
import {dbComics, dbPublisher} from "../../../database";
import {darkComicsApi} from "../../../api";
import {Comic} from "../../../models";
import {useRouter} from "next/router";
import {EditSelect, TransitionBox} from "../../../components/commons";
import Swal from "sweetalert2";

interface FormData {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  images: string[];
  inStock: number;
  art_by: string;
  written_by: string;
  series: string;
  publisher: string;
  type: string;
  page_count: number;
  price: number;
  character: string;
  on_sale_date: string;
}

interface Props {
  comic: IComic;
  publishers: PublisherData[];
}

const findCharacters = (
  publisher: string,
  publishers: PublisherData[],
): string[] => {
  return publishers
    .filter((p) => p.name === publisher)
    .map((p) => p.characters)
    .flat()
    .map((c) => c.name)
    .sort();
};

const ComicAdminPage: FC<Props> = ({comic, publishers}) => {
  const router = useRouter();

  const [characterSelected, setCharacterSelected] = useState(comic.character);
  const [publisherSelected, setPublisherSelected] = useState(comic.publisher);

  const [charactersOptions, setCharactersOptions] = useState(() =>
    findCharacters(comic.publisher, publishers),
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState(false);

  const onNewPublisher = (value: string) => {
    setPublisherSelected(value);
    setValue("publisher", value);
  };

  const onNewCharacter = (value: string) => {
    setCharacterSelected(value);
    setValue("character", value);
  };

  const onNewCharacters = useMemo(() => {
    if (publisherSelected === comic.publisher)
      setCharacterSelected(comic.character);
    else {
      setCharacterSelected("");
    }
    return setCharactersOptions(findCharacters(publisherSelected, publishers));
  }, [publisherSelected, publishers, comic.publisher, comic.character]);

  const {
    register,
    handleSubmit,
    formState: {errors},
    getValues,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: comic,
  });

  useEffect(() => {
    onNewCharacters;
  }, [onNewCharacters]);

  useEffect(() => {
    const suscription = watch((value, {name}) => {
      if (name === "title") {
        const newSlug =
          value.title
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
    if (form.images.length < 2) return alert("Mínimo 2 imágenes");
    setIsSaving(true);

    try {
      const {data} = await darkComicsApi({
        url: "/admin/comics",
        method: form._id ? "PUT" : "POST",
        data: form,
      });

      if (!form._id) {
        router.replace(`/admin/comics/${form.slug}`);
      } else {
        setIsSaving(false);
      }
      //sweet alert
      Swal.fire({
        title: "Comic guardado",
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

    try {
      for (const file of target.files) {
        const formData = new FormData();

        formData.append("file", file);
        const {data} = await darkComicsApi.post<{message: string}>(
          "/admin/upload",
          formData,
        );
        setValue("images", [...getValues("images"), data.message], {
          shouldValidate: true,
        });
      }
    } catch (error) {}
  };

  const onDeleteImage = (image: string) => {
    setValue(
      "images",
      getValues("images").filter((img) => img !== image),
      {shouldValidate: true},
    );
  };

  return (
    <AdminLayout title={"Cómic"}>
      <section className="px-[24px] lg:px-16 min-h-main uppercase">
        <TransitionBox />
        <div className="flex flex-col items-center py-6">
          <h1 className="text-2xl font-headline md:text-4xl">Cómics</h1>
          <h2>Editando: {comic.title}</h2>
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
                    {...register("title", {
                      required: "Este campo es requerido",
                    })}
                  />
                  <label
                    htmlFor="title"
                    className="z-[99] left-2 peer-focus:font-medium transition duration-300 ease-in-out peer-focus:text-white absolute text-sm text-tertiary  
              top-4 origin-[0] peer-focus:left-2 "
                  >
                    Título
                  </label>
                </div>
                {errors.title && (
                  <label className="block mt-1 text-xs text-red-600 fadeIn dark:text-red-500">
                    {errors.title.message}
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

              <div>
                <div className="relative z-0 flex items-end w-full h-12 border-b-2 group border-tertiary">
                  <input
                    className="z-[100] block w-full h-full px-2 pt-2 text-sm bg-transparent appearance-none peer:bg-red-600 focus:outline-none peer"
                    placeholder=" "
                    {...register("inStock", {
                      required: "Este campo es requerido",
                      min: {value: 0, message: "Mínimo 0"},
                    })}
                  />
                  <label
                    htmlFor="inStock"
                    className="z-[99] left-2 peer-focus:font-medium transition duration-300 ease-in-out peer-focus:text-white absolute text-sm text-tertiary  
                 top-4 origin-[0] peer-focus:left-2 "
                  >
                    Inventario
                  </label>
                </div>
                {errors.inStock && (
                  <label className="block mt-1 text-xs text-red-600 fadeIn dark:text-red-500">
                    {errors.inStock.message}
                  </label>
                )}
              </div>

              <div>
                <div className="relative z-0 flex items-end w-full h-12 border-b-2 group border-tertiary">
                  <input
                    className="z-[100] block w-full h-full px-2 pt-2 text-sm bg-transparent appearance-none peer:bg-red-600 focus:outline-none peer"
                    placeholder=" "
                    {...register("price", {
                      required: "Este campo es requerido",
                      min: {value: 0, message: "Mínimo 0"},
                    })}
                  />
                  <label
                    htmlFor="price"
                    className="z-[99] left-2 peer-focus:font-medium transition duration-300 ease-in-out peer-focus:text-white absolute text-sm text-tertiary  
                 top-4 origin-[0] peer-focus:left-2 "
                  >
                    Precio
                  </label>
                </div>
                {errors.price && (
                  <label className="block mt-1 text-xs text-red-600 fadeIn dark:text-red-500">
                    {errors.price.message}
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
              <div>
                <EditSelect
                  title="Personaje"
                  options={charactersOptions}
                  value={characterSelected}
                  onChange={onNewCharacter}
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

              <div>
                <div className="relative z-0 flex items-end w-full h-12 border-b-2 group border-tertiary">
                  <input
                    type="text"
                    className="z-[100] block w-full h-full px-2 pt-2 text-sm bg-transparent appearance-none peer:bg-red-600 focus:outline-none peer"
                    placeholder=" "
                    {...register("art_by", {
                      required: "Este campo es requerido",
                    })}
                  />
                  <label
                    htmlFor="art_by"
                    className="z-[99] left-2 peer-focus:font-medium transition duration-300 ease-in-out peer-focus:text-white absolute text-sm text-tertiary  
              top-4 origin-[0] peer-focus:left-2 "
                  >
                    Ilustradores
                  </label>
                </div>
                {errors.art_by && (
                  <label className="block mt-1 text-xs text-red-600 fadeIn dark:text-red-500">
                    {errors.art_by.message}
                  </label>
                )}
              </div>

              <div>
                <div className="relative z-0 flex items-end w-full h-12 border-b-2 group border-tertiary">
                  <input
                    type="text"
                    className="z-[100] block w-full h-full px-2 pt-2 text-sm bg-transparent appearance-none peer:bg-red-600 focus:outline-none peer"
                    placeholder=" "
                    {...register("written_by", {
                      required: "Este campo es requerido",
                    })}
                  />
                  <label
                    htmlFor="written_by"
                    className="z-[99] left-2 peer-focus:font-medium transition duration-300 ease-in-out peer-focus:text-white absolute text-sm text-tertiary  
                top-4 origin-[0] peer-focus:left-2 "
                  >
                    Escritores
                  </label>
                </div>
                {errors.written_by && (
                  <label className="block mt-1 text-xs text-red-600 fadeIn dark:text-red-500">
                    {errors.written_by.message}
                  </label>
                )}
              </div>

              <div>
                <div className="relative z-0 flex items-end w-full h-12 border-b-2 group border-tertiary">
                  <input
                    type="text"
                    className="z-[100] block w-full h-full px-2 pt-2 text-sm bg-transparent appearance-none peer:bg-red-600 focus:outline-none peer"
                    placeholder=" "
                    {...register("series", {
                      required: "Este campo es requerido",
                    })}
                  />
                  <label
                    htmlFor="series"
                    className="z-[99] left-2 peer-focus:font-medium transition duration-300 ease-in-out peer-focus:text-white absolute text-sm text-tertiary  
                top-4 origin-[0] peer-focus:left-2 "
                  >
                    Series
                  </label>
                </div>
                {errors.series && (
                  <label className="block mt-1 text-xs text-red-600 fadeIn dark:text-red-500">
                    {errors.series.message}
                  </label>
                )}
              </div>

              <div>
                <div className="relative z-0 flex items-end w-full h-12 border-b-2 group border-tertiary">
                  <input
                    type="number"
                    className="z-[100] block w-full h-full px-2 pt-2 text-sm bg-transparent appearance-none peer:bg-red-600 focus:outline-none peer"
                    placeholder=" "
                    {...register("page_count", {
                      required: "Este campo es requerido",
                      min: {value: 1, message: "Mínimo 1"},
                    })}
                  />
                  <label
                    htmlFor="page_count"
                    className="z-[99] left-2 peer-focus:font-medium transition duration-300 ease-in-out peer-focus:text-white absolute text-sm text-tertiary  
                top-4 origin-[0] peer-focus:left-2 "
                  >
                    Páginas
                  </label>
                </div>
                {errors.page_count && (
                  <label className="block mt-1 text-xs text-red-600 fadeIn dark:text-red-500">
                    {errors.page_count.message}
                  </label>
                )}
              </div>

              <div>
                <div className="relative z-0 flex items-end w-full h-12 border-b-2 group border-tertiary">
                  <input
                    className="z-[100] block w-full h-full px-2 pt-2 text-sm bg-transparent appearance-none peer:bg-red-600 focus:outline-none peer"
                    {...register("type", {
                      required: "Este campo es requerido",
                    })}
                  />
                  <label
                    htmlFor="type"
                    className="z-[99] left-2 peer-focus:font-medium transition duration-300 ease-in-out peer-focus:text-white absolute text-sm text-tertiary  
                 top-4 origin-[0] peer-focus:left-2 "
                  >
                    Tipo
                  </label>
                </div>
                {errors.type && (
                  <label className="block mt-1 text-xs text-red-600 fadeIn dark:text-red-500">
                    {errors.type.message}
                  </label>
                )}
              </div>

              <div>
                <div className="relative z-0 flex items-end w-full h-12 border-b-2 group border-tertiary">
                  <input
                    className="z-[100] block w-full h-full px-2 pt-2 text-sm bg-transparent appearance-none peer:bg-red-600 focus:outline-none peer"
                    {...register("on_sale_date", {
                      required: "Este campo es requerido",
                    })}
                  />
                  <label
                    htmlFor="type"
                    className="z-[99] left-2 peer-focus:font-medium transition duration-300 ease-in-out peer-focus:text-white absolute text-sm text-tertiary  
                 top-4 origin-[0] peer-focus:left-2 "
                  >
                    Fecha de publicación (AAAA-MM-DD)
                  </label>
                </div>
                {errors.on_sale_date && (
                  <label className="block mt-1 text-xs text-red-600 fadeIn dark:text-red-500">
                    {errors.on_sale_date.message}
                  </label>
                )}
              </div>

              {/* Imágenes */}
              <div>
                <div className="flex justify-start w-full">
                  <label className="text-[0.65625rem] leading-[0.9375rem]  translate-x-0 mb-1">
                    Imágenes
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
                {getValues("images").map((img) => (
                  <div className="relative fadeIn" key={img}>
                    <button
                      type="button"
                      onClick={() => onDeleteImage(img)}
                      className="absolute top-0 right-0 z-10 text-xl bg-primary icon hover:bg-primary"
                    >
                      <CloseOutlined />
                    </button>
                    <Image
                      src={
                        img ||
                        "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"
                      }
                      alt={img}
                      width={100}
                      height={150}
                      objectFit="cover"
                      quality={50}
                    />
                  </div>
                ))}
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

  let comic: IComic | null;

  if (slug === "new") {
    const tempComic = JSON.parse(JSON.stringify(new Comic()));
    delete tempComic._id;
    tempComic.images = [
      "https://res.cloudinary.com/tiz52/image/upload/v1654132785/z8aa7hx7r7atg3ojge9b.jpg",
      "https://res.cloudinary.com/tiz52/image/upload/v1654133348/i8qag4wrvjsclsequybr.jpg",
    ];
    comic = tempComic;
  } else {
    comic = await dbComics.getComicsBySlug(slug.toString());
  }

  const publishers = await dbPublisher.getAllPublishersData();

  if (!comic) {
    return {
      redirect: {
        destination: "/admin/comics",
        permanent: false,
      },
    };
  }

  return {
    props: {
      comic,
      publishers,
    },
  };
};

export default ComicAdminPage;
