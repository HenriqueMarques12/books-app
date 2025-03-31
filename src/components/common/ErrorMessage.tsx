import React from "react";
import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-0.5">
          <FaExclamationTriangle className="text-red-500 text-lg" />
        </div>
        <div className="ml-3">
          <h3 className="text-red-800 font-medium">Ocorreu um erro</h3>
          <div className="text-red-700 mt-2">
            <p>{message}</p>
          </div>
          {onRetry && (
            <div className="mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onRetry}
                className="bg-red-100 px-4 py-2 rounded-md text-red-800 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Tentar novamente
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ErrorMessage;
