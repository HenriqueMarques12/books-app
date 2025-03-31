import React from "react";
import { motion } from "framer-motion";
import { FaThList, FaTh } from "react-icons/fa";

interface ToggleViewProps {
  view: "card" | "list";
  setView: (view: "card" | "list") => void;
  "aria-label"?: string;
}

const ToggleView: React.FC<ToggleViewProps> = ({
  view,
  setView,
  "aria-label": ariaLabel,
}) => {
  return (
    <div
      className="flex border border-gray-200 rounded-md overflow-hidden shadow-sm"
      role="radiogroup"
      aria-label={ariaLabel || "Alternar visualização"}
    >
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setView("card")}
        className={`p-2 px-4 flex items-center transition-colors duration-200 ${
          view === "card"
            ? "bg-[#5062F0] text-white font-medium"
            : "bg-white text-gray-700 hover:bg-gray-50"
        }`}
        aria-label="Visualização em cards"
        aria-checked={view === "card"}
        role="radio"
      >
        <FaTh className="mr-2" /> Cards
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setView("list")}
        className={`p-2 px-4 flex items-center transition-colors duration-200 ${
          view === "list"
            ? "bg-[#5062F0] text-white font-medium"
            : "bg-white text-gray-700 hover:bg-gray-50"
        }`}
        aria-label="Visualização em lista"
        aria-checked={view === "list"}
        role="radio"
      >
        <FaThList className="mr-2" /> Lista
      </motion.button>
    </div>
  );
};

export default ToggleView;
