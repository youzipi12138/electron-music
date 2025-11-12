import { ChevronRight, Play } from 'lucide-react';
import SearchApi, { type AlbumItem } from '@/api/Search';
import { formatDateYMD } from '@/ustils/Formdata';
import { useEffect, useState } from 'react';
import { useSearchStore } from '@/store/useSearchStore';
export const AlumbList = () => {
  const [musicList, setMusicList] = useState<AlbumItem[]>([]);
  const { searchValueStore } = useSearchStore();

  useEffect(() => {
    if (!searchValueStore) return;
    SearchApi.searchAlbum(searchValueStore, 6, 0).then((res) => {
      setMusicList(res.result.albums);
      console.log(res.result.albums);
    });
  }, [searchValueStore]);
  return (
    <div>
      <div className='text-[20px] font-bold text-gray-700 flex items-center mt-5 '>
        <span className='ml-[8px]'>专辑</span>
        <ChevronRight size={22} className='relative top-px' />
      </div>
      <div className='body mt-4 grid grid-rows-1 auto-rows-[0] grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 overflow-hidden'>
        {musicList.map((pl, idx) => (
          <div
            key={idx}
            className='rounded-lg overflow-hidden flex flex-col cursor-pointer group'
          >
            <div className='w-full aspect-square relative'>
              <img
                src={pl.blurPicUrl}
                alt={pl.name}
                className='w-full h-full object-cover rounded-lg'
              />
              <div className='absolute inset-0 bg-gray-900/15 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg'></div>
              {/* Albums do not have playCount; keep only hover play icon */}
              {/* <button
                aria-label='Play'
                className='absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white text-gray-900 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200'
              ></button> */}
              <div className='absolute bottom-2 right-2  flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                <Play size={28} className='text-white ml-1' fill='white' />
              </div>
            </div>
            <div className='p-2 text-gray-700 flex flex-col gap-1 h-[60px] group-hover:bg-white group-hover:shadow-2xl'>
              <span className='text-sm font-bold text-ellipsis overflow-hidden whitespace-nowrap'>
                {pl.name}
              </span>
              <div className='text-sm text-gray-500 text-ellipsis overflow-hidden whitespace-nowrap'>
                {pl.artist.name}
                <span className='ml-3'>{formatDateYMD(pl.publishTime)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
