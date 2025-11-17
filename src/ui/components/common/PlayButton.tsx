import { Play, Pause } from 'lucide-react';
import usePlayStore from '@/store/usePlayStore';
import SearchApi from '@/api/Search';
interface PlayButtonProps {
  musicId: number;
  musicName: string;
  artistName: string;
  coverImgurl: string;
}

export const PlayButton = ({
  musicId,
  musicName,
  artistName,
  coverImgurl,
}: PlayButtonProps) => {
  const {
    isStart,
    setIsStart,
    currentMusicId,
    setCurrentMusicId,
    setUrl,
    setLoading,
    setMusicName,
    setArtistName,
    setCoverUrl,
    addHistoryItem,
  } = usePlayStore();

  const handlePlay = async () => {
    // 如果点击的是当前正在播放的歌曲，则切换播放/暂停
    if (currentMusicId === musicId) {
      setIsStart(!isStart);
    } else {
      // 如果点击的是不同的歌曲，先加载URL，然后开始播放
      setLoading(true);
      setCurrentMusicId(musicId); // 切换到新歌曲
      setMusicName(musicName);
      setArtistName(artistName);
      setCoverUrl(coverImgurl);
      addHistoryItem({
        musicId,
        musicName,
        artistName,
        coverUrl: coverImgurl,
      });
      try {
        const res = await SearchApi.getSongUrl(musicId);
        // 从响应中获取URL（data是一个数组，取第一个元素的url）
        const songUrl = res.data?.[0]?.url;
        if (songUrl) {
          setUrl(songUrl);
          setIsStart(true); // 开始播放新歌曲
        } else {
          console.error('未获取到歌曲URL');
        }
      } catch (error) {
        console.error('加载歌曲URL失败:', error);
      } finally {
        setLoading(false);
      }
    }
  };
  return currentMusicId === musicId && isStart ? (
    <div onClick={handlePlay}>
      <Pause size={28} className='text-white ml-1' fill='white' />
    </div>
  ) : (
    <div onClick={handlePlay}>
      <Play size={28} className='text-white ml-1' fill='white' />
    </div>
  );
};
//TODO: 添加loading状态
