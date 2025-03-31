import React from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 6;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, startPage + 2);

      if (currentPage <= 3) {
        startPage = 2;
        endPage = 5;
      }

      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 4;
        endPage = totalPages - 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex justify-center mt-8" aria-label="Paginação">
      <ul className="flex items-center space-x-2">
        <li>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 disabled:opacity-50"
            aria-label="Página anterior"
          >
            <FaChevronLeft size={14} />
          </motion.button>
        </li>

        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onPageChange(pageNumber)}
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentPage === pageNumber
                  ? "bg-[#5062F0] text-white"
                  : "border border-gray-300 hover:bg-gray-100"
              }`}
              aria-label={`Página ${pageNumber}`}
              aria-current={currentPage === pageNumber ? "page" : undefined}
            >
              {pageNumber}
            </motion.button>
          </li>
        ))}

        <li>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 disabled:opacity-50"
            aria-label="Próxima página"
          >
            <FaChevronRight size={14} />
          </motion.button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
