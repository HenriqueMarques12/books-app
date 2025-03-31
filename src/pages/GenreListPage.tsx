import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useGenreStore } from "../store/genreStore";
import { useSearchStore } from "../store/searchStore";
import { useAnimations } from "../hooks/useAnimations";
import { usePagination } from "../hooks/usePagination";
import ToggleView from "../components/common/ToggleView";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import GenreListItem from "../components/features/GenreListItem";
import GenreCard from "../components/features/GenreCard";
import Pagination from "../components/common/Pagination";

const GenreListPage: React.FC = () => {
  const { loading, error, fetchGenres, genres } = useGenreStore();
  const { searchTerm } = useSearchStore();
  const [view, setView] = useState<"card" | "list">("card");
  const { pageTransition, containerVariants } = useAnimations();
  const navigate = useNavigate();

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  const filteredGenres = React.useMemo(() => {
    if (!genres) return [];
    if (!searchTerm || !searchTerm.trim()) return genres;

    return genres.filter((genre) => {
      if (!genre) return false;
      const name = genre.name || "";
      const description = genre.description || "";

      return (
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [genres, searchTerm]);

  const { currentItems, currentPage, totalPages, goToPage } = usePagination(
    filteredGenres,
    { itemsPerPage: 5 },
  );

  const handleGenreClick = (genreId: string) => {
    navigate(`/genero/${encodeURIComponent(genreId)}`);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="focus:outline-none"
      tabIndex={-1}
    >
      <header className="mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Gêneros</h1>

          <ToggleView
            view={view}
            setView={setView}
            aria-label="Alternar visualização"
          />
        </div>
      </header>

      {filteredGenres.length === 0 ? (
        <motion.div
          className="bg-yellow-50 border border-yellow-200 p-4 rounded-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-yellow-700">
            {searchTerm && searchTerm.trim()
              ? `Nenhum gênero encontrado com o termo "${searchTerm}".`
              : "Nenhum gênero disponível no momento."}
          </p>
        </motion.div>
      ) : (
        <>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={
              view === "card"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {currentItems.map((genre) => (
              <React.Fragment key={genre.id}>
                {view === "card" ? (
                  <GenreCard
                    genre={genre}
                    onClick={() => handleGenreClick(genre.id)}
                  />
                ) : (
                  <GenreListItem
                    genre={genre}
                    onClick={() => handleGenreClick(genre.id)}
                  />
                )}
              </React.Fragment>
            ))}
          </motion.div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        </>
      )}
    </motion.div>
  );
};

export default GenreListPage;
