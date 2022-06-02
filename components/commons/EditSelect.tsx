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
  title: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export const EditSelect: FC<Props> = ({onChange, options, value, title}) => {
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
    <div className="relative w-full px-2 py-2">
      <div className="flex justify-start w-full">
        <label className="text-[0.65625rem] leading-[0.9375rem]  translate-x-0">
          {title}
        </label>
      </div>
      <button
        className="flex items-center justify-between w-full gap-2 hover:text-white"
        onClick={handleSelect}
        type="button"
      >
        <span className="">{value}</span>
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
              className="absolute right-0 z-20 flex flex-col items-start w-full bg-quaternary top-[50px]"
              variants={modalVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {options.map((option) => (
                <button
                  type="button"
                  key={option}
                  className="w-full py-[14px] px-5 text-xs text-left transition hover:text-white  duration-300 ease-in-out hover:bg-shadow"
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
