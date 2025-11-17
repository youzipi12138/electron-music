import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface HistoryItem {
  musicId: number;
  coverUrl: string;
  musicName: string;
  artistName: string;
}

interface musicPlay {
  currentMusicId: number;
  coverUrl: string;
  musicName: string;
  artistName: string;
  url: string;
  isStart: boolean;
  loading: boolean;
  timer: number;
  historyList: HistoryItem[];
  setUrl: (url: string) => void;
  setIsStart: (isStart: boolean) => void;
  setLoading: (loading: boolean) => void;
  setTimer: (timer: number) => void;
  setCurrentMusicId: (currentMusicId: number) => void;
  setMusicName: (musicName: string) => void;
  setArtistName: (artistName: string) => void;
  setCoverUrl: (coverUrl: string) => void;
  setHistoryList: (historyList: HistoryItem[]) => void;
  addHistoryItem: (item: HistoryItem) => void;
}
// 正在播放的音乐信息
const usePlayStore = create<musicPlay>()(
  persist(
    (set, get) => ({
      currentMusicId: 0,
      coverUrl: 'https://i.pravatar.cc/80?img=15',
      musicName: '',
      artistName: '',
      url: 'https://m7.music.126.net/20251112163830/6ca0a2b62c5b6fe9d3e4f4d8f78fb157/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3?vuutv=Xhg4pAhq8YojwqC6f871oo2Jel8QxKaybad5RoRJRpEYhz84JgfFFHfqifTyQFtGHZRqHQ+sBdPBNQq7DeX0HqOr1ABeZ5OFWaLsxqy5gZ8=',
      isStart: true,
      loading: false,
      timer: 0,
      historyList: [],
      setCurrentMusicId: (currentMusicId: number) => set({ currentMusicId }),
      setCoverUrl: (coverUrl: string) => set({ coverUrl }),
      setMusicName: (musicName: string) => set({ musicName }),
      setArtistName: (artistName: string) => set({ artistName }),
      setUrl: (url: string) => set({ url }),
      setIsStart: (isStart: boolean) => set({ isStart }),
      setLoading: (loading: boolean) => set({ loading }),
      setTimer: (timer: number) => set({ timer }),
      setHistoryList: (historyList: HistoryItem[]) => set({ historyList }),
      addHistoryItem: (item: HistoryItem) =>
        set(() => {
          const prevList = get().historyList;
          const exists = prevList.some(
            (historyItem) => historyItem.musicId === item.musicId
          );
          if (exists) {
            return { historyList: prevList };
          }
          return { historyList: [...prevList, item] };
        }),
    }),
    {
      name: 'play-history-storage',
      partialize: (state) => ({ historyList: state.historyList }),
    }
  )
);

export default usePlayStore;
