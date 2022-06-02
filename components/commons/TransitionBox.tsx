import {motion} from "framer-motion";
import {FC} from "react";

const containerVariants = {
  hidden: {
    width: "100%",
  },
  show: {
    width: "0%",
    transition: {
      duration: 0.75,
      ease: "easeInOut",
    },
  },
  exit: {
    width: "100%",
    transition: {
      duration: 0.75,
      ease: "easeInOut",
    },
  },
};

interface Props {
  color?: string;
}

export const TransitionBox: FC<Props> = () => {
  return (
    <motion.div
      className={"absolute h-full inset-0 z-50 bg-primary "}
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    />
  );
};
