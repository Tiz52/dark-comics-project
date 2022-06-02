import {FC, useState} from "react";
import {CloseOutlined, RemoveOutlined, AddOutlined} from "@mui/icons-material";
import {AnimatePresence, motion} from "framer-motion";

import {
  characterNameToQuery,
  publisherNameToQuery,
  query,
} from "../../utils/index";

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

interface Props {
  publishers: string[];
  characters: string[];
  setCharacterFilter: (characterFilter: string) => void;
  setPublisherFilter: (publisherFilter: string) => void;
}

export const FiltersSide: FC<Props> = ({
  publishers,
  characters,
  setCharacterFilter,
  setPublisherFilter,
}) => {
  const [isPublisherOpen, setIsPublisherOpen] = useState(false);
  const [isCharacterOpen, setIsCharacterOpen] = useState(false);

  const [characterSelected, setCharacterSelected] = useState("all");
  const [publisherSelected, setPublisherSelected] = useState("all");

  const handleCharacterSelect = (value: string) => {
    if (value === characterSelected) {
      setCharacterFilter("all");
      return setCharacterSelected("all");
    }

    setCharacterSelected(value);
    setCharacterFilter(query.character(value));
  };

  const handlePublisherSelect = (value: string) => {
    if (value === publisherSelected) {
      setPublisherFilter("all");
      return setPublisherSelected("");
    }
    setPublisherSelected(value);
    setPublisherFilter(query.publisher(value));
  };

  return (
    <aside className="flex flex-col gap-2 pt-4 pr-5 uppercase">
      <span className="mb-4">Filtros</span>
      <div>
        <div className="flex items-baseline justify-between mb-4">
          <span>Editoriales</span>
          <button
            className="text-2xl"
            onClick={() => setIsPublisherOpen(!isPublisherOpen)}
          >
            {isPublisherOpen ? (
              <RemoveOutlined className="w-4 h-4" />
            ) : (
              <AddOutlined className="w-4 h-4" />
            )}
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
          <span>Personajes</span>
          <button
            className="text-2xl"
            onClick={() => setIsCharacterOpen(!isCharacterOpen)}
          >
            {isCharacterOpen ? (
              <RemoveOutlined className="w-4 h-4" />
            ) : (
              <AddOutlined className="w-4 h-4" />
            )}
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
