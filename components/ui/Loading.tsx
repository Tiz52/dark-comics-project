import {motion, AnimatePresence} from "framer-motion";

const loaderVariants = {
  animationOne: {
    x: [-20, 20],
    y: [0, -30],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.5,
      },
      y: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.25,
        ease: "easeInOut",
      },
    },
  },
};

export const Loading = () => {
  return (
    <div className="flex items-center justify-center flex-auto">
      <div className="flex flex-col items-center gap-2">
        <AnimatePresence>
          <motion.div
            className="w-6 h-6 rounded-full bg-secondary"
            variants={loaderVariants}
            animate="animationOne"
          />
        </AnimatePresence>

        <h2 className="inline-block text-2xl font-semibold text-center">
          Cargando...
        </h2>
      </div>
    </div>
  );
};
