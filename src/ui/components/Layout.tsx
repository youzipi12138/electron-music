import Side from '@/components/Side';
import Main from '@/components/Main';
import TitleBar from '@/components/TitleBar';

export default function Layout() {
  return (
    <div className='flex flex-col h-screen'>
      <TitleBar />
      <div className='flex flex-1 overflow-hidden'>
        <Side />
        <Main />
      </div>
    </div>
  );
}
