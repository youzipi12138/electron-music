import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
interface musicPlay {
  musicId: number;
  coverUrl: string;
  musicName: string;
  artistName: string;
  url: string;
  isStart: boolean;
  loading: boolean;
  timer: number;
  setUrl: (url: string) => void;
  setIsStart: (isStart: boolean) => void;
  setLoading: (loading: boolean) => void;
  setTimer: (timer: number) => void;
}
// 正在播放的音乐信息
const usePlayStore = create<musicPlay>((set) => ({
  musicId: 0,
  coverUrl: 'https://i.pravatar.cc/80?img=15',
  musicName: "我最红(I'm The Best)",
  artistName: '노래방 (NoRaWan)',

  url: 'https://m7.music.126.net/20251112163830/6ca0a2b62c5b6fe9d3e4f4d8f78fb157/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3?vuutv=Xhg4pAhq8YojwqC6f871oo2Jel8QxKaybad5RoRJRpEYhz84JgfFFHfqifTyQFtGHZRqHQ+sBdPBNQq7DeX0HqOr1ABeZ5OFWaLsxqy5gZ8=',
  isStart: false,
  loading: false,
  timer: 0,
  setMusicId: (musicId: number) => set({ musicId }),
  setCoverUrl: (coverUrl: string) => set({ coverUrl }),
  setMusicName: (musicName: string) => set({ musicName }),
  setArtistName: (artistName: string) => set({ artistName }),
  setUrl: (url: string) => set({ url }),
  setIsStart: (isStart: boolean) => set({ isStart }),
  setLoading: (loading: boolean) => set({ loading }),
  setTimer: (timer: number) => set({ timer }),
}));

export default usePlayStore;
