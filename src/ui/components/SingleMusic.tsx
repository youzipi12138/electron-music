import { ChevronRight, Download, Heart, MoreHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import SearchApi, { SearchType, type Song } from '@/api/Search';
import { useSearchStore } from '@/store/useSearchStore';
const SingleMusic = () => {
  const [singleMusic, setSingleMusic] = useState<Song[]>([]);
  const { searchValueStore } = useSearchStore();
  useEffect(() => {
    SearchApi.search(searchValueStore, SearchType.SONG).then((res) => {
      setSingleMusic(res.result.songs.slice(0, 6));
      console.log(res.result.songs);
    });
  }, [searchValueStore]);

  return (
    <div className='w-full cursor-pointer'>
      <div className='text-[20px] font-bold text-gray-700 flex items-center '>
        <span className='pl-[8px]'>单曲</span>
        <ChevronRight size={22} className='relative top-px' />
      </div>
      <div className='body mt-4'>
        <div className='grid grid-cols-2 gap-4'>
          {singleMusic.map((item, index) => (
            <div
              className='left h-[80px] hover:bg-gray-200 rounded-lg p-2  w-full flex items-center'
              key={index}
            >
              <div className='w-[60px] h-[60px] rounded-lg overflow-hidden mr-2'>
                <img
                  src={item.album.artist.img1v1Url}
                  alt='专辑封面'
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-sm font-bold text-gray-700'>
                  {item.name}
                </span>
                <span className='text-sm text-gray-500'>
                  {item.artists[0].name}
                </span>
              </div>
              <div className='flex items-center gap-4 ml-auto mr-2 text-gray-400'>
                <Download size={20} />
                <Heart size={20} />
                <MoreHorizontal size={20} />
              </div>
            </div>
          ))}
          {/* <div className='left h-[80px] hover:bg-gray-200 rounded-lg p-2  flex-1 flex items-center'>
            <div className='w-[60px] h-[60px] rounded-lg overflow-hidden mr-2'>
              <img
                src='https://i.pravatar.cc/100?img=15'
                alt='专辑封面'
                className='w-full h-full object-cover'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <span className='text-sm font-bold text-gray-700'>1231</span>
              <span className='text-sm text-gray-500'>fsdfasdfas</span>
            </div>
            <div className='flex items-center gap-4 ml-auto mr-2 text-gray-400'>
              <Download size={20} />
              <Heart size={20} />
              <MoreHorizontal size={20} />
            </div>
          </div> */}
          {/* <div className='right h-[80px] hover:bg-gray-200 rounded-lg p-2  flex-1 flex items-center'>
            <div className='w-[60px] h-[60px] rounded-lg overflow-hidden mr-2'>
              <img
                src='https://i.pravatar.cc/100?img=15'
                alt='专辑封面'
                className='w-full h-full object-cover'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <span className='text-sm font-bold text-gray-700'>1231</span>
              <span className='text-sm text-gray-500'>fsdfasdfas</span>
            </div>
            <div className='flex items-center gap-4 ml-auto mr-2 text-gray-400'>
              <Download size={20} />
              <Heart size={20} />
              <MoreHorizontal size={20} />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SingleMusic;
