import React from 'react';
import { Play } from 'lucide-react';
import { formatFansNumber } from '@/ustils/Formdata';
interface SearchCardProps {
  category?: string;
  name: string;
  avatar?: string;
  stats?: {
    songs?: number;
    fans?: string;
  };
}

export const SearchCard: React.FC<SearchCardProps> = ({
  category = '歌手',
  name,
  avatar = 'https://i.pravatar.cc/100?img=15',
  stats,
}) => {
  return (
    <div className='w-[385px] h-[140px] rounded-lg flex items-center px-4 gap-4 hover:bg-gray-200 cursor-pointer group'>
      <div className='img w-[110px] h-[110px] rounded-full overflow-hidden relative'>
        <img src={avatar} alt={name} className='w-full h-full object-cover' />
        {/* 播放图标 - hover 时显示 */}
        <div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
          <Play size={28} className='text-white ml-1' fill='white' />
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        <div className='text-[16px] text-gray-500'>{category}</div>
        <div className='text-[20px] font-bold'>{name}</div>
        <div className='text-[16px] text-gray-500'>
          <span className='mr-1'>单曲:{stats?.songs}</span>
          <span className=''>
            粉丝:{formatFansNumber(stats?.fans as string)}
          </span>
        </div>
      </div>
    </div>
  );
};
