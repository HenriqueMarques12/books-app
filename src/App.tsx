import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useGenreStore } from "./store/genreStore";
import Navbar from "./components/layout/Navbar";
import GenreListPage from "./pages/GenreListPage";
import BookListPage from "./pages/BookListPage";
import FavoritesPage from "./pages/FavoritesPage";
import NotFoundPage from "./pages/NotFoundPage";

const AnimatedRoutes = () => {
  const location = useLocation();
  const { fetchGenres } = useGenreStore();

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<GenreListPage />} />
        <Route path="/genero/:genre" element={<BookListPage />} />
        <Route path="/favoritos" element={<FavoritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar />

        <main
          id="main-content"
          className="container mx-auto px-4 py-8 flex-grow"
          tabIndex={-1}
        >
          <AnimatedRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
