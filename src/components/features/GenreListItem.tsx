import React from "react";
import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";
import { Genre } from "../../models/Genre";

interface GenreListItemProps {
  genre: Genre;
  onClick?: () => void;
}

const GenreListItem: React.FC<GenreListItemProps> = ({ genre, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ backgroundColor: "#f9fafb" }}
      whileTap={{ scale: 0.99 }}
      className="bg-white p-4 mb-5 rounded-lg shadow-sm border border-gray-200 cursor-pointer"
      role="button"
      tabIndex={0}
      aria-label={`Ver livros do gênero ${genre.displayName}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {genre.displayName}
          </h3>
          <p className="text-sm text-gray-600">
            Atualizado: {genre.updated.toLowerCase()}
          </p>
        </div>
        <FaChevronRight className="text-gray-400" />
      </div>
    </motion.div>
  );
};

export default GenreListItem;
