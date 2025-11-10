import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
interface User {
  isLogin: boolean;
  // count: number;
  // increment: () => void;
  // decrement: () => void;
  // reset: () => void;
}

const useUserStore = create<User>((set) => ({
  isLogin: false,
  // increment: () => set((state) => ({ count: state.count + 1 })),
  // decrement: () => set((state) => ({ count: state.count - 1 })),
  // reset: () => set({ count: 0 }),
}));

export default useUserStore;
