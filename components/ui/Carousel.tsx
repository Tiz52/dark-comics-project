import {useState, useRef, useEffect, FC} from "react";
import Swipe from "react-easy-swipe";
import {IComic} from "../../interfaces";
import {ComicCard} from "../comics";

const GAP_WIDTH = 128;

interface Props {
  comics: IComic[];
}

export const Carousel: FC<Props> = ({comics}) => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  const movePrev = () => {
    if (currentIndex <= 0) {
      return;
    }
    setCurrentIndex((prevState) => prevState - 1);
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft =
        carousel.current.offsetWidth * currentIndex + GAP_WIDTH * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  return (
    <div className="w-full my-12">
      <div className="flex w-full gap-10">
        <button
          onClick={movePrev}
          className="hidden w-10 text-center transition-all duration-300 ease-in-out xs:block text-tertiary hover:text-white disabled:opacity-25"
          disabled={currentIndex <= 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-12 -ml-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="sr-only">Prev</span>
        </button>
        {/* <Swipe
          onSwipeLeft={moveNext}
          onSwipeRight={movePrev}
          className="z-10 flex-auto overflow-hidden"
        > */}
        <div
          ref={carousel}
          className="z-0 flex gap-32 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x"
        >
          {comics.map((comic, index) => (
            <div
              key={index}
              className="shrink-0 w-[calc(100vw-48px)] xs:w-[250px] snap-start "
            >
              <ComicCard comic={comic} />
            </div>
          ))}
        </div>
        {/* </Swipe> */}

        <button
          onClick={moveNext}
          className="hidden w-10 text-center transition-all duration-300 ease-in-out xs:block text-tertiary hover:text-white disabled:opacity-25 disabled:cursor-not-allowed"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-12 -ml-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="sr-only">Next</span>
        </button>
      </div>

      {/* Slide Mobile */}
      <div className="flex justify-center p-2 mt-5 xs:hidden">
        {comics.map((_, index) => {
          return (
            <div
              style={{width: `${100 / comics.length}%`}}
              className={
                index === currentIndex
                  ? "h-1 bg-white ease-in-out transition duration-300 mb-2 cursor-pointer"
                  : "h-1 bg-tertiary/10 ease-in-out transition duration-300 mb-2 cursor-pointer"
              }
              key={index}
              onClick={() => {
                setCurrentIndex(index);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
