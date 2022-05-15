import {AnimatePresence, motion} from "framer-motion";
import {useState} from "react";

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
      duration: 0.1,
      ease: "easeInOut",
    },
  },
};

const publishers = ["DC Comics", "Marvel Comics", "Image Comics"];

const characters = [
  "Batman",
  "Catwoman",
  "Flash",
  "Hulk",
  "Ironman",
  "Spiderman",
  "Superman",
  "Wolverine",
];

export const FiltersSide = () => {
  const [isPublisherOpen, setIsPublisherOpen] = useState(false);
  const [isCharacterOpen, setIsCharacterOpen] = useState(false);

  const [characterSelected, setCharacterSelected] = useState("");
  const [publisherSelected, setPublisherSelected] = useState("");

  const handleCharacterSelect = (value: string) => {
    if (value === characterSelected) {
      return setCharacterSelected("");
    }
    setCharacterSelected(value);
  };

  const handlePublisherSelect = (value: string) => {
    if (value === publisherSelected) {
      return setPublisherSelected("");
    }
    setPublisherSelected(value);
  };

  return (
    <aside className="flex flex-col gap-2 pt-4 pr-5 uppercase">
      <span className="mb-4">Filters</span>
      <div>
        <div className="flex items-baseline justify-between mb-4">
          <span>Publisher</span>
          <button
            className="text-2xl"
            onClick={() => setIsPublisherOpen(!isPublisherOpen)}
          >
            {isPublisherOpen ? "-" : "+"}
          </button>
        </div>
        <AnimatePresence>
          {isPublisherOpen && (
            <motion.div
              className="flex flex-col gap-2 mb-2 text-xs text-tertiary/70"
              variants={modalVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {publishers.map((publisher) => (
                <label
                  key={publisher}
                  className="flex items-center justify-between"
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div>
        <div className="flex items-baseline justify-between mb-4">
          <span>Characters</span>
          <button
            className="text-2xl"
            onClick={() => setIsCharacterOpen(!isCharacterOpen)}
          >
            {isCharacterOpen ? "-" : "+"}
          </button>
        </div>
        <AnimatePresence>
          {isCharacterOpen && (
            <motion.div
              className="flex flex-col gap-2 text-xs text-tertiary/70"
              variants={modalVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {characters.map((character) => (
                <label
                  key={character}
                  className="flex items-center justify-between"
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
};
