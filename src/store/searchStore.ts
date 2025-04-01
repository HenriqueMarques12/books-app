import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface SearchState {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchState>()(
  immer((set) => ({
    searchTerm: "",

    setSearchTerm: (term: string) => {
      set((state) => {
        state.searchTerm = term;
      });
    },

    clearSearch: () => {
      set((state) => {
        state.searchTerm = "";
      });
    },
  })),
);
