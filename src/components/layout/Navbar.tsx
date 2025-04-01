import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeart,
  FaBars,
  FaSearch,
  FaTimes,
  FaHome,
  FaUndoAlt,
} from "react-icons/fa";
import { useFavoriteStore } from "../../store/favoriteStore";
import { useHeaderSearch } from "../../hooks/useHeaderSearch";

const Navbar: React.FC = () => {
  const { favorites } = useFavoriteStore();
  const location = useLocation();
  const {
    inputValue,
    setInputValue,
    searchOpen,
    setSearchOpen,
    handleSearch,
    handleClearSearch,
    getSearchPlaceholder,
  } = useHeaderSearch();

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const isActive = (path: string) => location.pathname === path;

  React.useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname, setSearchOpen]);

  const navLinks = [
    { path: "/", label: "Início", icon: <FaHome /> },
    {
      path: "/favoritos",
      label: "Favoritos",
      icon: <FaHeart />,
      count: favorites.length,
    },
  ];

  const renderSearchInput = (isMobile: boolean) => (
    <form
      onSubmit={handleSearch}
      className={`relative ${isMobile ? "w-full" : ""}`}
    >
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={getSearchPlaceholder()}
        className="w-full pl-10 pr-8 py-1.5 text-gray-800 bg-white rounded-full focus:outline-none"
        autoFocus
      />
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      {inputValue && (
        <button
          type="button"
          onClick={handleClearSearch}
          className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          aria-label="Limpar pesquisa"
        >
          <FaUndoAlt />
        </button>
      )}
      <button
        type="button"
        onClick={() => setSearchOpen(false)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        aria-label="Fechar pesquisa"
      >
        <FaTimes />
      </button>
    </form>
  );

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-full z-30"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.nav className="bg-[#5062F0] text-white shadow-lg" layout>
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link
                to="/"
                className="text-xl font-bold flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-md px-2"
                aria-label="Bloom Books - Página Inicial"
              >
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Bloom Books
                </motion.span>
              </Link>

              <div className="hidden md:flex items-center space-x-4">
                <AnimatePresence mode="wait">
                  {searchOpen ? (
                    <motion.div
                      key="search-form"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 300, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      className="relative"
                    >
                      {renderSearchInput(false)}
                    </motion.div>
                  ) : (
                    <motion.button
                      key="search-button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSearchOpen(true)}
                      className="p-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                      aria-label="Abrir pesquisa"
                    >
                      <FaSearch />
                    </motion.button>
                  )}
                </AnimatePresence>

                <div className="flex items-center space-x-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`px-3 py-2 rounded-md flex items-center transition-colors ${
                        isActive(link.path)
                          ? "bg-blue-700 font-medium"
                          : "hover:bg-blue-700/70"
                      }`}
                      aria-current={isActive(link.path) ? "page" : undefined}
                    >
                      <motion.div whileHover={{ scale: 1.1 }} className="mr-2">
                        {link.icon}
                      </motion.div>
                      <span>{link.label}</span>
                      {link.count !== undefined && link.count > 0 && (
                        <motion.span
                          className="ml-1.5 bg-white text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 10,
                          }}
                        >
                          {link.count}
                        </motion.span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="md:hidden flex items-center space-x-3">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  aria-label={searchOpen ? "Fechar pesquisa" : "Abrir pesquisa"}
                >
                  {searchOpen ? <FaTimes /> : <FaSearch />}
                </button>

                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="md:hidden pb-3"
                >
                  {renderSearchInput(true)}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="md:hidden overflow-hidden pb-3"
                >
                  <div className="space-y-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`block py-2 px-3 rounded-md ${
                          isActive(link.path)
                            ? "bg-blue-700 font-medium"
                            : "hover:bg-blue-700/70"
                        } flex justify-between items-center`}
                        onClick={() => setMobileMenuOpen(false)}
                        aria-current={isActive(link.path) ? "page" : undefined}
                      >
                        <div className="flex items-center">
                          <span className="mr-3">{link.icon}</span>
                          <span>{link.label}</span>
                        </div>
                        {link.count !== undefined && link.count > 0 && (
                          <span className="bg-white text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                            {link.count}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      </motion.div>

      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
