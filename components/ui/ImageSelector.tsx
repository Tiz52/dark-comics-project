// import Image from "next/image";
import {FC, useState, useEffect} from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import {Image} from "./Image";

interface Props {
  images: string[];
}

export const ImageSelector: FC<Props> = ({images}) => {
  const [img, setImg] = useState("");

  useEffect(() => {
    setImg(images[0]);
  }, [images]);

  return (
    <div className="flex flex-col">
      <Zoom overlayBgColorEnd="rgba(0, 0, 0, 0.50)" zoomMargin={30}>
        <div className="w-full">
          <Image
            src={
              img ||
              "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"
            }
            alt={img}
            layout="responsive"
            width={600}
            height={950}
            objectFit="cover"
            quality={50}
            priority
            className="fadeIn"
            fallback="https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"
          />
        </div>
      </Zoom>
      <div className="grid grid-flow-col gap-4 mt-10">
        {images.map((imgFromComic) => (
          <button key={imgFromComic} onClick={() => setImg(imgFromComic)}>
            <Image
              src={
                imgFromComic ||
                "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"
              }
              alt={imgFromComic}
              layout="responsive"
              width={300}
              height={450}
              objectFit="contain"
              quality={50}
              priority
              className="fadeIn"
              fallback="https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
