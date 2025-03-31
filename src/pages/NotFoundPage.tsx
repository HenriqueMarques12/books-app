import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage: React.FC = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-7xl text-yellow-500 mb-8"
      >
        <FaExclamationTriangle />
      </motion.div>

      <h1 className="text-4xl font-bold text-center mb-4">
        Página não encontrada
      </h1>
      <p className="text-gray-600 text-center mb-8 max-w-md">
        A página que você está procurando não existe ou foi movida.
      </p>

      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Voltar para a página inicial
      </Link>
    </motion.div>
  );
};

export default NotFoundPage;
