import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { useBookStore } from "../store/bookStore";
import { useSearchStore } from "../store/searchStore";
import { useAnimations } from "../hooks/useAnimations";
import { usePagination } from "../hooks/usePagination";
import ToggleView from "../components/common/ToggleView";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import BookListItem from "../components/features/BookListItem";
import BookCard from "../components/features/BookCard";
import Pagination from "../components/common/Pagination";

const BookListPage: React.FC = () => {
  const { genre } = useParams<{ genre: string }>();
  const { books, loading, error, fetchBooksByGenre } = useBookStore();
  const { searchTerm } = useSearchStore();
  const [viewMode, setViewMode] = useState<"list" | "card">("list");
  const { pageTransition } = useAnimations();

  useEffect(() => {
    if (genre) {
      fetchBooksByGenre(genre);
    }
  }, [genre, fetchBooksByGenre]);

  const filteredBooks = React.useMemo(() => {
    if (!searchTerm.trim()) return books;

    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (book.description &&
          book.description.toLowerCase().includes(searchTerm.toLowerCase())),
    );
  }, [books, searchTerm]);

  const { currentItems, currentPage, totalPages, goToPage } = usePagination(
    filteredBooks,
    { itemsPerPage: 5 },
  );

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pb-16"
      tabIndex={-1}
    >
      <header className="mb-6">
        <div className="flex flex-col justify-between md:flex-row items-center mb-6 gap-4">
          <h1 className="text-3xl  font-bold text-gray-800 mb-2">{genre}</h1>
          <ToggleView
            view={viewMode}
            setView={setViewMode}
            aria-label="Alternar visualização"
          />
        </div>
      </header>

      {filteredBooks.length === 0 ? (
        <motion.div
          className="bg-yellow-50 border border-yellow-200 p-4 rounded-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-yellow-700">
            Nenhum livro encontrado com o termo "{searchTerm}".
          </p>
        </motion.div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={
              viewMode === "card"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
                : "space-y-4"
            }
          >
            {currentItems.map((book) =>
              viewMode === "card" ? (
                <BookCard key={book.id} book={book} />
              ) : (
                <BookListItem key={book.id} book={book} />
              ),
            )}
          </motion.div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        </>
      )}

      <div className="fixed bottom-6 left-6">
        <Link
          to="/"
          className="flex items-center justify-center bg-white p-3 rounded-full shadow-md text-[#5062F0] hover:bg-[#5062F0] hover:text-white transition-colors"
          aria-label="Voltar para a lista de gêneros"
        >
          <FaArrowLeft />
        </Link>
      </div>
    </motion.div>
  );
};

export default BookListPage;
