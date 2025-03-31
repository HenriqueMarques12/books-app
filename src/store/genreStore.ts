import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import booksApi from "../api/booksApi";
import { Genre } from "../models/Genre";

interface GenreState {
  genres: Genre[];
  loading: boolean;
  error: string | null;

  fetchGenres: () => Promise<void>;
  searchGenres: (term: string) => Genre[];
}

export const useGenreStore = create<GenreState>()(
  immer((set, get) => ({
    genres: [],
    loading: false,
    error: null,

    fetchGenres: async () => {
      try {
        set({ loading: true, error: null });
        const genres = await booksApi.fetchGenres();
        set((state) => {
          state.genres = genres;
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

    searchGenres: (term: string) => {
      const { genres } = get();
      if (!term.trim()) return genres;

      return genres.filter((genre) =>
        genre.displayName.toLowerCase().includes(term.toLowerCase()),
      );
    },
  })),
);
