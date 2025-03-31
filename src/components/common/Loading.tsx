import React from "react";
import { motion } from "framer-motion";

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
        }}
        className="flex flex-col items-center"
      >
        <div className="w-16 h-16 border-t-4 border-blue-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500">Carregando...</p>
      </motion.div>
    </div>
  );
};

export default Loading;
