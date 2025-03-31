import React, { useState } from "react";
import { motion } from "framer-motion";
import { useFavoriteStore } from "../store/favoriteStore";
import { useSearchStore } from "../store/searchStore";
import { useAnimations } from "../hooks/useAnimations";
import { usePagination } from "../hooks/usePagination";
import ToggleView from "../components/common/ToggleView";
import BookListItem from "../components/features/BookListItem";
import BookCard from "../components/features/BookCard";
import Pagination from "../components/common/Pagination";

const FavoritesPage: React.FC = () => {
  const { favorites } = useFavoriteStore();
  const { searchTerm } = useSearchStore();
  const [viewMode, setViewMode] = useState<"list" | "card">("list");
  const { pageTransition, containerVariants } = useAnimations();

  const filteredFavorites = React.useMemo(() => {
    if (!searchTerm.trim()) return favorites;

    return favorites.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (book.description &&
          book.description.toLowerCase().includes(searchTerm.toLowerCase())),
    );
  }, [favorites, searchTerm]);

  const { currentItems, currentPage, totalPages, goToPage } = usePagination(
    filteredFavorites,
    { itemsPerPage: 5 },
  );

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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Meus Favoritos
        </h1>
        <p className="text-gray-600">
          {favorites.length === 0
            ? "Você ainda não tem livros favoritos"
            : `${favorites.length} ${favorites.length === 1 ? "livro salvo" : "livros salvos"}`}
        </p>
      </header>

      {favorites.length > 0 && (
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <ToggleView
            view={viewMode}
            setView={setViewMode}
            aria-label="Alternar visualização"
          />
        </div>
      )}

      {favorites.length === 0 ? (
        <motion.div
          className="bg-blue-50 border border-blue-200 p-6 rounded-md text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-blue-700 mb-2">
            Você ainda não adicionou nenhum livro aos favoritos.
          </p>
          <p className="text-blue-600">
            Explore os livros disponíveis e clique no ícone de coração para
            adicionar aos favoritos!
          </p>
        </motion.div>
      ) : filteredFavorites.length === 0 ? (
        <motion.div
          className="bg-yellow-50 border border-yellow-200 p-4 rounded-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-yellow-700">
            Nenhum livro favorito encontrado com o termo "{searchTerm}".
          </p>
        </motion.div>
      ) : (
        <>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={
              viewMode === "card"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
            />
          )}
        </>
      )}
    </motion.div>
  );
};

export default FavoritesPage;
