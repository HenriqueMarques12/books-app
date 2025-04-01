import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSearchStore } from "../store/searchStore";
import { useGenreStore } from "../store/genreStore";
import { useBookStore } from "../store/bookStore";

export const useHeaderSearch = () => {
  const location = useLocation();
  const { searchTerm, setSearchTerm, clearSearch } = useSearchStore();
  const { searchGenres } = useGenreStore();
  const { searchBooks } = useBookStore();

  const [inputValue, setInputValue] = useState(searchTerm);
  const [searchOpen, setSearchOpen] = useState(false);

  const getCurrentSearchContext = () => {
    if (location.pathname.includes("/genero/")) return "books";
    if (location.pathname.includes("/livros")) return "books";
    return "genres";
  };

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (inputValue.trim()) {
      setSearchTerm(inputValue);

      const searchContext = getCurrentSearchContext();

      if (searchContext === "genres") {
        searchGenres(inputValue);
      } else {
        searchBooks(inputValue);
      }

      if (window.innerWidth >= 768) {
        setSearchOpen(false);
      }
    }
  };

  const handleClearSearch = () => {
    setInputValue("");
    clearSearch();

    const searchContext = getCurrentSearchContext();
    if (searchContext === "genres") {
      searchGenres("");
    } else {
      searchBooks("");
    }
  };

  const getSearchPlaceholder = () => {
    const searchContext = getCurrentSearchContext();
    return searchContext === "books"
      ? "Pesquisar livros..."
      : "Pesquisar gêneros...";
  };

  return {
    inputValue,
    setInputValue,
    searchOpen,
    setSearchOpen,
    handleSearch,
    handleClearSearch,
    getSearchPlaceholder,
    getCurrentSearchContext,
  };
};
