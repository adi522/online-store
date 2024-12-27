import { motion } from "framer-motion";

function Loading() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <h1 className="text-6xl font-semibold">
        Loading
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          ....
        </motion.span>
      </h1>
    </div>
  );
}

export default Loading;
