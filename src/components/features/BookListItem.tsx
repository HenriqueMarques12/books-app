import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart, FaExternalLinkAlt } from "react-icons/fa";
import { useFavoriteStore } from "../../store/favoriteStore";
import { Book } from "../../models/Book";
import { useAnimations } from "../../hooks/useAnimations";

interface BookListItemProps {
  book: Book;
}

const BookListItem: React.FC<BookListItemProps> = ({ book }) => {
  const { toggleFavorite, isFavorite } = useFavoriteStore();
  const [favorite, setFavorite] = useState(false);
  const { itemVariants } = useAnimations();

  useEffect(() => {
    setFavorite(isFavorite(book.id));
  }, [book, isFavorite]);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(book);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFavorite(book);
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-lg mb-5 shadow-sm p-4 border border-gray-200 hover:shadow-md"
      tabIndex={0}
      role="article"
      aria-label={`Livro: ${book.title} por ${book.author}`}
    >
      <div className="flex justify-between">
        <div className="flex-grow">
          <h2 className="text-xl font-semibold text-gray-800">{book.title}</h2>
          <p className="text-sm text-gray-600 mb-2">por {book.author}</p>

          <p className="text-gray-700 line-clamp-2 mb-2">{book.description}</p>

          <div className="flex flex-wrap gap-x-4 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Editora:</span> {book.publisher}
            </p>
            <p>
              <span className="font-semibold">Rank:</span> {book.rank || "N/A"}
            </p>
            <p>
              <span className="font-semibold">ISBN:</span> {book.isbn10}
            </p>
          </div>

          {book.buyLinks && book.buyLinks.length > 0 && (
            <div className="mt-2">
              <motion.a
                href={book.buyLinks[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 focus:outline-none focus:underline"
                whileHover={{ scale: 1.05 }}
                aria-label={`Comprar ${book.title} em ${book.buyLinks[0].name}`}
              >
                Comprar <FaExternalLinkAlt className="ml-1" size={12} />
              </motion.a>
            </div>
          )}
        </div>

        <button
          onClick={handleToggleFavorite}
          onKeyDown={handleKeyDown}
          className={`p-2 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            favorite ? "text-red-500" : "text-gray-400"
          }`}
          aria-label={
            favorite
              ? `Remover ${book.title} dos favoritos`
              : `Adicionar ${book.title} aos favoritos`
          }
          aria-pressed={favorite}
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: favorite ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            {favorite ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
          </motion.div>
        </button>
      </div>
    </motion.div>
  );
};

export default BookListItem;
