import React from "react";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart, FaExternalLinkAlt } from "react-icons/fa";
import { Book } from "../../models/Book";
import { useFavoriteStore } from "../../store/favoriteStore";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { toggleFavorite, isFavorite } = useFavoriteStore();
  const favorite = isFavorite(book.id);

  const coverImage = `https://picsum.photos/seed/${book.id}/300/450`;

  const price = parseFloat(book.price?.replace("$", "") || "25.99") * 20;

  return (
    <motion.div
      whileHover={{
        y: -8,
        transition: { type: "spring", stiffness: 300 },
      }}
      className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
    >
      <div className="relative">
        <img
          src={book.book_image || coverImage}
          alt={`Capa do livro ${book.title}`}
          className="w-full h-64 object-cover"
        />

        <FavoriteButton
          book={book}
          isFavorite={favorite}
          toggleFavorite={toggleFavorite}
        />
      </div>

      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 mb-1 uppercase line-clamp-1">
          {book.title}
        </h3>
        <p className="text-sm text-[#5062F0] mb-3">por {book.author}</p>

        <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
          {book.description ||
            "Uma história envolvente que cativará os leitores do início ao fim."}
        </p>

        <BookMetadata book={book} />

        <div className="mt-auto">
          <BuyButton book={book} price={price} />
        </div>
      </div>
    </motion.div>
  );
};

const FavoriteButton: React.FC<{
  book: Book;
  isFavorite: boolean;
  toggleFavorite: (book: Book) => void;
}> = ({ book, isFavorite, toggleFavorite }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      toggleFavorite(book);
    }}
    className={`absolute top-3 right-3 p-2 rounded-full ${
      isFavorite
        ? "bg-red-50 text-red-500"
        : "bg-white/80 text-gray-400 hover:text-[#5062F0]"
    } backdrop-blur-sm shadow-md transition-colors`}
    aria-label={
      isFavorite
        ? `Remover ${book.title} dos favoritos`
        : `Adicionar ${book.title} aos favoritos`
    }
  >
    {isFavorite ? <FaHeart /> : <FaRegHeart />}
  </button>
);

const BookMetadata: React.FC<{ book?: Book }> = ({ book }) => (
  <div className="grid grid-cols-2 gap-x-2 gap-y-1 mb-4 text-sm">
    <p className="text-gray-600">
      <span className="font-medium">Editora:</span> {book?.publisher}
    </p>
    <p className="text-gray-600">
      <span className="font-medium">Rank:</span> #{book?.rank || "N/A"}
    </p>
  </div>
);

const BuyButton: React.FC<{ book: Book; price: number }> = ({
  book,
  price,
}) => (
  <a
    href={book.buyLinks?.[0]?.url || "#"}
    target="_blank"
    rel="noopener noreferrer"
    className="w-full bg-[#5062F0] text-white text-sm py-2 px-4 rounded-md hover:bg-[#3a4cd9] transition-colors flex items-center justify-center"
  >
    Compre por R$ {price.toFixed(2).replace(".", ",")}
    <FaExternalLinkAlt size={12} className="ml-2" />
  </a>
);

export default BookCard;
