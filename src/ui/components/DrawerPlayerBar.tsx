import {
  ListChevronsDownUp,
  MessageCircleMore,
  SquareArrowOutUpRight,
  Download,
  Heart,
  SkipBack,
  Pause,
  SkipForward,
  Repeat,
  Info,
  ListMusic,
  Volume2,
} from 'lucide-react';

export default function DrawerPlayerBar() {
  return (
    <div className='relative bg-[#12131a] text-white'>
      <div className='absolute top-0 left-0 right-0 h-[4px] bg-[#1e564d]'>
        <div className='h-full w-1/3 bg-[#31c7a6]' />
      </div>
      <div className='h-[72px] px-6 flex items-center justify-between'>
        <div className='flex items-center gap-5 text-gray-300 w-[250px]'>
          <ListChevronsDownUp size={20} />
          <MessageCircleMore size={20} />
          <SquareArrowOutUpRight size={20} />
          <Download size={20} />
          <div className='text-xs text-gray-400 ml-2'>01:22 / 04:24</div>
        </div>

        <div className='flex items-center gap-6 w-[250px]'>
          <Heart size={18} className='text-[#ff4d6d]' />
          <SkipBack size={18} className='text-gray-300' />
          <div className='w-10 h-10 rounded-full bg-white/10 flex items-center justify-center'>
            <Pause size={18} className='text-white' />
          </div>
          <SkipForward size={18} className='text-gray-300' />
          <Repeat size={18} className='text-gray-300' />
          <Info size={18} className='text-gray-400' />
        </div>

        <div className='flex items-center gap-4 text-gray-300 w-[250px]'>
          <ListMusic size={18} />
          <div className='flex items-center gap-2 w-28'>
            <Volume2 size={18} />
            <div className='flex-1 h-1 rounded-full bg-[#2f313b] relative'>
              <div className='absolute left-0 top-0 bottom-0 w-3/5 bg-white rounded-full' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
