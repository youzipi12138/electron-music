import Side from '@/components/layout/Side';
import Main from '@/components/layout/Main';
import TitleBar from '@/components/layout/TitleBar';
import Player from '@/components/player/Player';

export default function Layout() {
  return (
    <div className='flex flex-col h-screen'>
      <TitleBar />
      <div className='flex flex-1 overflow-hidden'>
        <Side />
        <Main />
      </div>
      <Player />
    </div>
  );
}
