import Image from "next/image";
import {FC, useState, useEffect} from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

interface Props {
  images: string[];
}

export const ImageSelector: FC<Props> = ({images}) => {
  const [img, setImg] = useState("");

  useEffect(() => {
    setImg(images[0]);
  }, [images]);

  return (
    <div>
      <Zoom overlayBgColorEnd="rgba(0, 0, 0, 0.50)" zoomMargin={30}>
        <Image
          src={`/comics/${img}.jpg` || ""}
          alt={img}
          layout="fixed"
          width={300}
          height={450}
          objectFit="cover"
        />
      </Zoom>
      <div className="grid grid-flow-col gap-4 mt-10">
        {images.map((imgFromComic, index) => (
          <button key={index} onClick={() => setImg(imgFromComic)}>
            <Image
              src={`/comics/${imgFromComic}.jpg` || ""}
              alt={imgFromComic}
              layout="responsive"
              width={300}
              height={450}
              objectFit="contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
