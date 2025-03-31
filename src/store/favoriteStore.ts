import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Book } from "../models/Book";

interface Command {
  execute: () => void;
  undo: () => void;
}

interface FavoriteState {
  favorites: Book[];
  commandHistory: Command[];
  undoneCommands: Command[];

  addFavorite: (book: Book) => void;
  removeFavorite: (bookId: string) => void;
  toggleFavorite: (book: Book) => void;
  isFavorite: (bookId: string) => boolean;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    immer((set, get) => ({
      favorites: [],
      commandHistory: [],
      undoneCommands: [],

      addFavorite: (book: Book) => {
        if (get().isFavorite(book.id)) return;

        const command: Command = {
          execute: () =>
            set((state) => {
              state.favorites.push(book);
            }),
          undo: () =>
            set((state) => {
              state.favorites = state.favorites.filter((f) => f.id !== book.id);
            }),
        };

        command.execute();
        set((state) => {
          state.commandHistory.push(command);
          state.undoneCommands = [];
        });
      },

      removeFavorite: (bookId: string) => {
        const book = get().favorites.find((f) => f.id === bookId);
        if (!book) return;

        const command: Command = {
          execute: () =>
            set((state) => {
              state.favorites = state.favorites.filter((f) => f.id !== bookId);
            }),
          undo: () =>
            set((state) => {
              state.favorites.push(book);
            }),
        };

        command.execute();
        set((state) => {
          state.commandHistory.push(command);
          state.undoneCommands = [];
        });
      },

      toggleFavorite: (book: Book) => {
        const isFav = get().isFavorite(book.id);
        if (isFav) {
          get().removeFavorite(book.id);
        } else {
          get().addFavorite(book);
        }
      },

      isFavorite: (bookId: string) => {
        return get().favorites.some((book) => book.id === bookId);
      },

      undo: () => {
        const commandHistory = get().commandHistory;
        if (commandHistory.length === 0) return;

        const lastCommand = commandHistory[commandHistory.length - 1];

        lastCommand.undo();
        set((state) => {
          state.commandHistory.pop();
          state.undoneCommands.push(lastCommand);
        });
      },

      redo: () => {
        const undoneCommands = get().undoneCommands;
        if (undoneCommands.length === 0) return;

        const lastUndo = undoneCommands[undoneCommands.length - 1];

        lastUndo.execute();
        set((state) => {
          state.undoneCommands.pop();
          state.commandHistory.push(lastUndo);
        });
      },

      canUndo: () => get().commandHistory.length > 0,
      canRedo: () => get().undoneCommands.length > 0,
    })),
    {
      name: "book-favorites-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ favorites: state.favorites }),
    },
  ),
);
