import React, { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useSearchStore } from "../../store/searchStore";
import { useGenreStore } from "../../store/genreStore";

interface SearchBarProps {
  placeholder?: string;
  "aria-label"?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Pesquisar...",
  "aria-label": ariaLabel,
}) => {
  const { searchTerm, setSearchTerm, clearSearch } = useSearchStore();
  const { searchGenres } = useGenreStore();
  const [localTerm, setLocalTerm] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(localTerm);
      searchGenres(localTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [localTerm, setSearchTerm, searchGenres]);

  const handleClear = () => {
    setLocalTerm("");
    clearSearch();
    searchGenres("");
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={localTerm}
        onChange={(e) => setLocalTerm(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel || placeholder}
        className="w-full p-2 pl-10 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <FaSearch
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        aria-hidden="true"
      />
      {localTerm && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label="Limpar busca"
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
