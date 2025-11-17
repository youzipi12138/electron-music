import usePlayStore from '@/store/usePlayStore';
import { Trash2 } from 'lucide-react';
import { PlayButton } from '../common/PlayButton';
type SideDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function SideDrawer({ open, onClose }: SideDrawerProps) {
  const { historyList, setHistoryList } = usePlayStore();
  console.log('111', historyList);
  return (
    <div
      className='fixed inset-x-0 top-[80px] bottom-[90px] z-40 pointer-events-none'
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-transparent transition-opacity duration-300 ${
          open
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div
        className={`absolute right-0 top-0 h-full w-[360px] bg-[#1b1d26] text-white shadow-2xl rounded-l-2xl transition-transform duration-300 pointer-events-auto ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex items-center justify-between px-6 py-5 border-b border-white/10'>
          <div className=''>
            <p className='text-lg font-semibold flex items-center'>
              <span className='mr-2'>播放队列</span>
              <span className='font-semibold mr-[150px]'>
                {historyList.length}
              </span>
              <Trash2
                size={24}
                className='cursor-pointer '
                onClick={() => {
                  setHistoryList([]);
                }}
              />
              <span
                className='text-sm text-white/60 ml-2 cursor-pointer'
                onClick={() => {
                  setHistoryList([]);
                }}
              >
                清空
              </span>
            </p>
          </div>
        </div>
        <div className='flex-1 overflow-y-auto px-6 py-4 space-y-4 text-sm text-white/80'>
          {historyList.map((item) => (
            <div
              key={item.musicId}
              className='flex items-center hover:bg-white/10 rounded-lg p-2 group'
            >
              <div className='w-[48px] h-[48px] rounded-lg overflow-hidden relative'>
                <img
                  src={item.coverUrl}
                  alt={item.musicName}
                  className='w-full h-full object-cover'
                />
                <div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer'>
                  <PlayButton
                    musicId={item.musicId}
                    musicName={item.musicName}
                    artistName={item.artistName}
                    coverImgurl={item.coverUrl}
                  />
                </div>
              </div>
              <div className='flex flex-col gap-1 ml-2'>
                <p className='text-sm font-medium'>{item.musicName}</p>
                <p className='text-sm text-white/60'>{item.artistName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
