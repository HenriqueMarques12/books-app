import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Book } from "../models/Book";
import booksApi from "../api/booksApi";

interface BookState {
  books: Book[];
  currentGenre: string | null;
  genreName: string;
  loading: boolean;
  error: string | null;

  fetchBooksByGenre: (genreId: string) => Promise<void>;
  searchBooks: (term: string) => Book[];
}

export const useBookStore = create<BookState>()(
  immer((set, get) => ({
    books: [],
    currentGenre: null,
    genreName: "",
    loading: false,
    error: null,

    fetchBooksByGenre: async (genreId: string) => {
      if (get().loading && get().currentGenre === genreId) return;

      try {
        set((state) => {
          state.loading = true;
          state.error = null;
          state.currentGenre = genreId;
          state.genreName = genreId.replace(/-/g, " ");
        });

        const books = await booksApi.fetchBooksByGenre(genreId);

        set((state) => {
          state.books = books;
          state.loading = false;
        });
      } catch (error) {
        set((state) => {
          state.error =
            error instanceof Error ? error.message : "Erro desconhecido";
          state.loading = false;
        });
      }
    },

    searchBooks: (term: string) => {
      const { books } = get();
      if (!term.trim()) return books;

      const lowerTerm = term.toLowerCase();
      return books.filter(
        (book) =>
          book.title.toLowerCase().includes(lowerTerm) ||
          book.author.toLowerCase().includes(lowerTerm),
      );
    },
  })),
);
