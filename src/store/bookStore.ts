import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Book } from "../models/Book";
import { bookService } from "../services/BookService";

interface BookState {
  books: Book[];
  filteredBooks: Book[];
  loading: boolean;
  error: string | null;
  currentGenre: string | null;
  fetchBooksByGenre: (genreId: string) => Promise<void>;
  searchBooks: (term: string) => void;
  resetBooks: () => void;
}

export const useBookStore = create<BookState>()(
  immer((set) => ({
    books: [],
    filteredBooks: [],
    loading: false,
    error: null,
    currentGenre: null,

    fetchBooksByGenre: async (genreId: string) => {
      set((state) => {
        state.loading = true;
        state.error = null;
        state.currentGenre = genreId;
      });

      try {
        const books = await bookService.fetchBooksByGenre(genreId);

        set((state) => {
          state.books = books;
          state.filteredBooks = books;
          state.loading = false;
        });
      } catch (error) {
        set((state) => {
          state.error =
            error instanceof Error ? error.message : "Erro ao carregar livros";
          state.loading = false;
        });
      }
    },

    searchBooks: (term: string) => {
      set((state) => {
        if (!term.trim()) {
          state.filteredBooks = state.books;
          return;
        }

        const lowerTerm = term.toLowerCase();
        state.filteredBooks = state.books.filter(
          (book) =>
            book.title.toLowerCase().includes(lowerTerm) ||
            book.author.toLowerCase().includes(lowerTerm),
        );
      });
    },

    resetBooks: () => {
      set((state) => {
        state.filteredBooks = state.books;
      });
    },
  })),
);
