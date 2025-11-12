import { Drawer } from 'antd';
import DrawerPlayerBar from './DrawerPlayerBar';
type PlayerDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function PlayerDrawer({ open, onClose }: PlayerDrawerProps) {
  return (
    <Drawer
      placement='bottom'
      height='100vh'
      open={open}
      onClose={onClose}
      styles={{
        header: { display: 'none' },
        body: { padding: 0, background: '#12131a' },
        content: { background: '#12131a', borderRadius: 0 },
      }}
    >
      <div className='h-full text-white relative'>
        <div className='flex items-center justify-between mb-4'>
          <div className='text-lg font-semibold'>正在播放</div>
          <button
            className='px-3 py-1 rounded-md bg-[#2a2c38] text-sm hover:bg-[#323545]'
            onClick={onClose}
          >
            关闭
          </button>
        </div>
        {/* 内容区域可在此扩展（歌词/评论/播放队列等） */}
      </div>
      <div className='absolute bottom-0 left-0 right-0'>
        <DrawerPlayerBar />
      </div>
    </Drawer>
  );
}
