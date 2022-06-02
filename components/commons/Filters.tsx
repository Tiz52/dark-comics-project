import {AnimatePresence, motion, useAnimation} from "framer-motion";
import {FC, useState} from "react";
import {characterNameToQuery, publisherNameToQuery} from "../../utils";

const modalVariants = {
  hidden: {
    height: 0,
    opacity: 0,
  },
  show: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const buttonVariants = {
  rotateUp: {
    rotate: [0, -180],
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  rotateDown: {
    rotate: [-180, 0],
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

interface Props {
  publishers: string[];
  characters: string[];
  setCharacterFilter: (characterFilter: string) => void;
  setPublisherFilter: (publisherFilter: string) => void;
}

export const Filters: FC<Props> = ({
  publishers,
  characters,
  setCharacterFilter,
  setPublisherFilter,
}) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isDesc, setIsDesc] = useState(true);
  const controls = useAnimation();

  const [isPublisherOpen, setIsPublisherOpen] = useState(false);
  const [isCharacterOpen, setIsCharacterOpen] = useState(false);

  const [characterSelected, setCharacterSelected] = useState("");
  const [publisherSelected, setPublisherSelected] = useState("");

  const handleCharacterSelect = (value: string) => {
    if (value === characterSelected) {
      setCharacterFilter("all");
      setIsFiltersOpen(!isFiltersOpen);
      return setCharacterSelected("all");
    }

    setCharacterSelected(value);
    setCharacterFilter(characterNameToQuery(value));
  };

  const handlePublisherSelect = (value: string) => {
    if (value === publisherSelected) {
      setPublisherFilter("all");
      return setPublisherSelected("");
    }
    setPublisherSelected(value);
    setPublisherFilter(publisherNameToQuery(value));
  };
  const handleFilters = () => {
    if (isDesc) controls.start("rotateUp");
    else controls.start("rotateDown");
    setIsDesc(!isDesc);
    setIsFiltersOpen(!isFiltersOpen);
    setIsPublisherOpen(false);
    setIsCharacterOpen(false);
  };

  return (
    <div className="relative py-3">
      <button
        className="flex items-center gap-2 hover:text-white"
        onClick={handleFilters}
      >
        <span className="uppercase">Filtros</span>
        <motion.div animate={controls} variants={buttonVariants}>
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="relative w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </motion.svg>
        </motion.div>
        <span className="sr-only">Prev</span>
      </button>
      <AnimatePresence>
        {isFiltersOpen && (
          <motion.div
            className="absolute left-0 z-20 flex flex-col items-start w-40 bg-quaternary top-12"
            variants={modalVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {/* Publisher filter */}
            <div className="w-full px-2 py-2">
              <div className="flex items-baseline justify-between text-xs uppercase">
                <span>Editoriales</span>
                <button
                  onClick={() => setIsPublisherOpen(!isPublisherOpen)}
                  className="text-xl cursor-pointer w-7 h-7 hover:text-white"
                >
                  {isPublisherOpen ? "-" : "+"}
                </button>
              </div>
              {isPublisherOpen && (
                <div className="flex flex-col gap-2 py-2 text-xs text-tertiary/70">
                  {publishers.map((publisher) => (
                    <label
                      key={publisher}
                      className="flex items-center justify-between pr-1"
                      htmlFor="characterRadio"
                    >
                      <span>{publisher}</span>
                      <button
                        className="flex items-center justify-center w-4 h-4 border-2 bg-primary"
                        onClick={() => handlePublisherSelect(publisher)}
                      >
                        <span
                          className={
                            (publisherSelected === publisher
                              ? "bg-white "
                              : "bg-primary ") + " w-2 h-2"
                          }
                        />
                      </button>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Character filter */}
            <div className="w-full px-2 py-2">
              <div className="flex items-baseline justify-between text-xs uppercase">
                <span>Personajes</span>
                <button
                  onClick={() => setIsCharacterOpen(!isCharacterOpen)}
                  className="text-xl cursor-pointer w-7 h-7 hover:text-white"
                >
                  {isCharacterOpen ? "-" : "+"}
                </button>
              </div>
              {isCharacterOpen && (
                <div className="flex flex-col gap-2 py-2 text-xs text-tertiary/70">
                  {characters.map((character) => (
                    <label
                      key={character}
                      className="flex items-center justify-between pr-1"
                      htmlFor="characterRadio"
                    >
                      <span>{character}</span>
                      <button
                        className="flex items-center justify-center w-4 h-4 border-2 bg-primary"
                        onClick={() => handleCharacterSelect(character)}
                      >
                        <span
                          className={
                            (characterSelected === character
                              ? "bg-white "
                              : "bg-primary ") + " w-2 h-2"
                          }
                        />
                      </button>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
