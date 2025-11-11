import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
interface musicPlay {
  url: string;
  isStart: boolean;
  loading: boolean;
  timer: number;
  setUrl: (url: string) => void;
  setIsStart: (isStart: boolean) => void;
  setLoading: (loading: boolean) => void;
  setTimer: (timer: number) => void;
}

const usePlayStore = create<musicPlay>((set) => ({
  url: '"http://m8.music.126.net/20251111020939/2ba82714faa2672794b08412d0bd1735/ymusic/3991/01e2/8474/22d2d154e2116ff7993ad9353b5e97a9.mp3?vuutv=tNClFWO6TVOKsoSZvkBjFPuwLOYTeczNF6pnZICO1sylRshbrENktDJiEsnCIRUX5yTthw9ht927SQhzWzTzH5cHzR0q5P/Y3aRgvz9x7K0="',
  isStart: false,
  loading: false,
  timer: 0,
  setUrl: (url: string) => set({ url }),
  setIsStart: (isStart: boolean) => set({ isStart }),
  setLoading: (loading: boolean) => set({ loading }),
  setTimer: (timer: number) => set({ timer }),
}));

export default usePlayStore;
