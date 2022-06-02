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
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export const Select: FC<Props> = ({onChange, options, value}) => {
  const [isOpen, setIsOpen] = useState(false);
  const controls = useAnimation();

  const handleSelect = () => {
    setIsOpen(!isOpen);
    if (isOpen) controls.start("rotateDown");
    else controls.start("rotateUp");
  };

  const handleOptionClick = (value: string) => {
    onChange(value);
    setIsOpen(false);
    controls.start("rotateDown");
  };

  return (
    <div className="relative w-full py-2">
      <button
        className="flex items-center justify-between w-full gap-2 hover:text-white"
        onClick={handleSelect}
      >
        <span className="uppercase">{value}</span>
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
        {isOpen && (
          <div>
            <motion.div
              className="absolute right-0 z-20 flex flex-col items-start w-full border-2 divide-y-2 divide-quaternary/10 border-quaternary/10 bg-tertiary top-12"
              variants={modalVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {options.map((option) => (
                <button
                  key={option}
                  className="w-full py-[14px] px-5 text-xs text-left uppercase transition hover:text-white  duration-300 ease-in-out hover:bg-shadow"
                  onClick={() => handleOptionClick(option)}
                >
                  <span className="h-7">{option}</span>
                </button>
              ))}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
