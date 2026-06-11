import { create } from 'zustand';

type PokemonSearchState = {
  isOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
};

export const usePokemonSearchStore = create<PokemonSearchState>((set) => ({
  isOpen: false,

  openSearch: () => {
    set({ isOpen: true });
  },

  closeSearch: () => {
    set({ isOpen: false });
  },
}));