import {AnimatePresence, motion, useAnimation} from "framer-motion";
import {FC, useState} from "react";

const modalVariants = {
  hidden: {
    height: 0,
    opacity: 0,
  },
  show: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
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
  // options: string[];
  // option?: string;
  // setOption: (value: string) => void;
}

const options = ["Title", "Price", "Release"];

export const Select: FC<Props> = ({}) => {
  const [isSortByOpen, SetIsSortByOpen] = useState(false);
  const [isDesc, setIsDesc] = useState(true);
  const controls = useAnimation();

  const handleSortBy = () => {
    // setOption(value);
    if (isDesc) controls.start("rotateUp");
    else controls.start("rotateDown");
    setIsDesc(!isDesc);
    SetIsSortByOpen(!isSortByOpen);
  };

  return (
    <div className="relative py-2">
      <button
        className="flex items-center gap-2 hover:text-white"
        onClick={handleSortBy}
      >
        <span className="uppercase">Sort By</span>
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
        {isSortByOpen && (
          <motion.div
            className="absolute right-0 z-20 flex flex-col items-start w-32 bg-quaternary top-12"
            variants={modalVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {options.map((option) => (
              <button
                key={option}
                className="w-full py-[14px] px-5 text-xs text-left uppercase transition duration-300 ease-in-out hover:bg-shadow"
                // onClick={() => handleOptionClick(option)}
              >
                <span className="h-7">{option}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
