import {
  Heart,
  ListMusic,
  MessageCircleMore,
  Play,
  Repeat,
  SkipBack,
  SkipForward,
  Volume2,
  ListChevronsDownUp,
  Download,
  SquareArrowOutUpRight,
} from 'lucide-react';
import { useState } from 'react';
import PlayerDrawer from './PlayerDrawer';

const coverUrl = 'https://i.pravatar.cc/80?img=15';

export default function Player() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div className='h-[80px] bg-[#1f2129] text-white px-6 flex  shadow-inner'>
      <div className='flex items-center w-[160px]'>
        <div className='left relative mr-4'>
          <span className='absolute inset-0 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 blur-sm opacity-80' />
          <span className='relative flex h-14 w-14 items-center justify-center rounded-full bg-[#232532]'>
            <img
              src={coverUrl}
              alt='专辑封面'
              className='h-10 w-10 rounded-full object-cover'
            />
          </span>
        </div>
        <div className='right flex flex-col gap-2 w-[210px] h-[60px]'>
          <div className=''>我是一个大西瓜</div>
          <div className='flex gap-6 text-gray-400'>
            <ListChevronsDownUp size={20} />
            <MessageCircleMore size={20} />
            <SquareArrowOutUpRight size={20} />
            <Download size={20}></Download>
          </div>
        </div>
      </div>
      <div
        className='flex-1 flex  flex-col items-center '
        onClick={() => setDrawerOpen(true)}
      >
        <div
          className='flex items-center h-[40px] gap-8 mb-2 mt-[12px]'
          onClick={(e) => e.stopPropagation()}
        >
          <Heart size={24} />
          <SkipBack size={24} />
          <div className='rounded-full bg-[#f43f5e] w-[40px] h-[40px] flex items-center justify-center'>
            <Play size={24} fill='currentColor' strokeWidth={0} />
          </div>
          <SkipForward size={24} />
          <Repeat size={24} />
        </div>
        <div
          className='flex items-center gap-3 w-[400px]'
          onClick={(e) => e.stopPropagation()}
        >
          <span className='text-xs text-gray-400'>00:02</span>
          <div className='h-1 flex-1 rounded-full bg-[#2f313b] overflow-hidden'>
            <div className='h-full w-1/5 rounded-full bg-[#f43f5e]' />
          </div>
          <span className='text-xs text-gray-400'>03:47</span>
        </div>
      </div>
      <div className='right h-full flex items-center w-[160px]'>
        <div className='mr-4'>
          <ListMusic size={24} />
        </div>
        <div className='mr-2'>
          <Volume2 size={24} />
        </div>
        <div className='flex items-center gap-2 w-18'>
          <div className='flex-1 h-1 rounded-full bg-[#2f313b] relative'>
            <div className='absolute left-0 top-0 bottom-0 w-2/5 bg-white rounded-full' />
          </div>
        </div>
      </div>
      <PlayerDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
