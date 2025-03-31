import React from "react";
import { motion } from "framer-motion";
import { FaBook, FaCalendarAlt } from "react-icons/fa";
import { Genre } from "../../models/Genre";

interface GenreCardProps {
  genre: Genre;
  onClick?: () => void;
}

const GenreCard: React.FC<GenreCardProps> = ({ genre, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 cursor-pointer h-full"
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
      <div className="bg-[#5062F0] p-4 text-white">
        <h3 className="text-xl font-bold truncate">{genre.displayName}</h3>
      </div>

      <div className="p-4">
        <div className="flex items-center text-gray-600 mb-2">
          <FaCalendarAlt className="mr-2" />
          <span className="text-sm">
            Atualização: {genre.updated.toLowerCase()}
          </span>
        </div>

        <div className="flex items-center text-gray-600">
          <FaBook className="mr-2" />
          <span className="text-sm">
            Desde: {new Date(genre.oldestPublishedDate).toLocaleDateString()}
          </span>
        </div>

        <motion.div
          className="mt-4 text-center py-2 bg-blue-50 text-blue-700 rounded-md"
          whileHover={{ backgroundColor: "#dbeafe" }}
        >
          Ver livros
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GenreCard;
