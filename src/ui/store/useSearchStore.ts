import { create } from 'zustand';

interface SearchStore {
  searchValueStore: string;
  setSearchValueStore: (value: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchValueStore: '',
  setSearchValueStore: (value: string) => set({ searchValueStore: value }),
}));
