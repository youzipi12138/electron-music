import {
  ListChevronsDownUp,
  MessageCircleMore,
  SquareArrowOutUpRight,
  Download,
  Heart,
  SkipBack,
  Pause,
  Play,
  SkipForward,
  Repeat,
  Repeat1,
  ListMusic,
  Volume2,
} from 'lucide-react';
import { useCallback, type MouseEvent } from 'react';
import usePlayStore from '@/store/usePlayStore';
import { formatSecondsToMMSS } from '@/ustils/Formdata';
import SearchApi from '@/api/Search';

export default function DrawerPlayerBar() {
  const {
    isStart,
    setIsStart,
    historyList,
    currentMusicId,
    currentTime,
    duration,
    isLoop,
    setIsLoop,
    setCurrentMusicId,
    setMusicName,
    setArtistName,
    setCoverUrl,
    setUrl,
    setLoading,
    setCurrentTime,
    addHistoryItem,
  } = usePlayStore();

  // 计算进度条百分比
  const progress =
    duration > 0 && isFinite(duration) ? (currentTime / duration) * 100 : 0;

  // 处理播放按钮点击
  const handlePlay = () => {
    setIsStart(!isStart);
  };

  const playHistoryItem = useCallback(
    async (
      item:
        | {
            musicId: number;
            musicName: string;
            artistName: string;
            coverUrl: string;
          }
        | undefined
    ) => {
      if (!item) return;
      setLoading(true);
      setCurrentMusicId(item.musicId);
      setMusicName(item.musicName);
      setArtistName(item.artistName);
      setCoverUrl(item.coverUrl);
      addHistoryItem(item);
      try {
        const res = await SearchApi.getSongUrl(item.musicId);
        const songUrl = res.data?.[0]?.url;
        if (songUrl) {
          setUrl(songUrl);
          setIsStart(true);
        } else {
          console.error('未获取到歌曲URL');
        }
      } catch (error) {
        console.error('加载歌曲URL失败:', error);
      } finally {
        setLoading(false);
      }
    },
    [
      addHistoryItem,
      setArtistName,
      setCoverUrl,
      setCurrentMusicId,
      setIsStart,
      setLoading,
      setMusicName,
      setUrl,
    ]
  );

  const handleSkip = useCallback(
    async (direction: 'prev' | 'next') => {
      if (historyList.length === 0) return;

      const currentIndex = historyList.findIndex(
        (item) => item.musicId === currentMusicId
      );

      // 如果当前歌曲不在历史中，则默认根据方向选择队列的首尾
      if (currentIndex === -1) {
        if (direction === 'next') {
          await playHistoryItem(historyList[0]);
        } else {
          await playHistoryItem(historyList[historyList.length - 1]);
        }
        return;
      }

      if (direction === 'prev') {
        if (currentIndex <= 0) return;
        await playHistoryItem(historyList[currentIndex - 1]);
      } else {
        if (currentIndex >= historyList.length - 1) return;
        await playHistoryItem(historyList[currentIndex + 1]);
      }
    },
    [currentMusicId, historyList, playHistoryItem]
  );

  const handleProgressClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    // 通过查找 audio 元素来访问
    const audio = document.querySelector('audio') as HTMLAudioElement;
    if (!audio || !duration || !isFinite(duration)) return;

    const rect = event.currentTarget.getBoundingClientRect();
    if (rect.width === 0) return;

    const clickOffset = event.clientX - rect.left;
    const ratio = Math.min(Math.max(clickOffset / rect.width, 0), 1);
    const newTime = ratio * duration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className='relative bg-[#12131a] text-white'>
      <div
        className='absolute top-0 left-0 right-0 h-[4px] bg-[#1e564d] cursor-pointer'
        onClick={handleProgressClick}
      >
        <div
          className='h-full bg-[#31c7a6] transition-all'
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className='h-[72px] px-6 flex items-center justify-between'>
        <div className='flex items-center gap-5 text-gray-300 w-[250px]'>
          <ListChevronsDownUp size={20} />
          <MessageCircleMore size={20} />
          <SquareArrowOutUpRight size={20} />
          <Download size={20} />
          <div className='text-xs text-gray-400 ml-2'>
            {formatSecondsToMMSS(isFinite(currentTime) ? currentTime : 0)} /{' '}
            {formatSecondsToMMSS(isFinite(duration) ? duration : 0)}
          </div>
        </div>

        <div className='flex items-center gap-6 w-[250px]'>
          <Heart size={24} className='cursor-pointer' />
          <div className='cursor-pointer' onClick={() => handleSkip('prev')}>
            <SkipBack size={24} className='text-gray-300' />
          </div>
          <div
            className='w-10 h-10 rounded-full bg-[#f43f5e] flex items-center justify-center shrink-0 cursor-pointer'
            onClick={handlePlay}
          >
            {isStart ? (
              <Pause
                size={24}
                fill='currentColor'
                strokeWidth={0}
                className='text-white'
              />
            ) : (
              <Play
                size={24}
                fill='currentColor'
                strokeWidth={0}
                className='text-white'
              />
            )}
          </div>
          <div className='cursor-pointer' onClick={() => handleSkip('next')}>
            <SkipForward size={24} className='text-gray-300' />
          </div>
          <div className='cursor-pointer' onClick={() => setIsLoop(!isLoop)}>
            {isLoop ? (
              <Repeat1 size={24} className='text-gray-300' />
            ) : (
              <Repeat size={24} className='text-gray-300' />
            )}
          </div>
        </div>

        <div className='flex items-center gap-4 text-gray-300 w-[250px]'>
          <ListMusic size={24} />
          <div className='flex items-center gap-2 w-28'>
            <Volume2 size={24} />
            <div className='flex-1 h-1 rounded-full bg-[#2f313b] relative'>
              <div className='absolute left-0 top-0 bottom-0 w-3/5 bg-white rounded-full' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
