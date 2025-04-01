import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Genre } from "../models/Genre";
import { genreService } from "../services/genreService";

interface GenreState {
  genres: Genre[];
  filteredGenres: Genre[];
  loading: boolean;
  error: string | null;
  fetchGenres: () => Promise<void>;
  searchGenres: (term: string) => void;
  resetGenres: () => void;
}

export const useGenreStore = create<GenreState>()(
  immer((set) => ({
    genres: [],
    filteredGenres: [],
    loading: false,
    error: null,

    fetchGenres: async () => {
      set({ loading: true, error: null });
      try {
        const genres = await genreService.fetchGenres();
        set((state) => {
          state.genres = genres;
          state.filteredGenres = genres;
          state.loading = false;
        });
      } catch (error) {
        set((state) => {
          state.error =
            error instanceof Error ? error.message : "Erro ao carregar gêneros";
          state.loading = false;
        });
      }
    },

    searchGenres: (term: string) => {
      set((state) => {
        if (!term.trim()) {
          state.filteredGenres = state.genres;
          return;
        }

        const lowerTerm = term.toLowerCase();
        state.filteredGenres = state.genres.filter(
          (genre) =>
            genre.name.toLowerCase().includes(lowerTerm) ||
            (genre.description &&
              genre.description.toLowerCase().includes(lowerTerm)),
        );
      });
    },

    resetGenres: () => {
      set((state) => {
        state.filteredGenres = state.genres;
      });
    },
  })),
);
