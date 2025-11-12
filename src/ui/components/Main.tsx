import Header from './Header';
import { SearchBar } from '@/components/SearchBar';
export default function Main() {
  return (
    <div className='flex-1 flex flex-col bg-gray-50 overflow-hidden'>
      <div className='shrink-0 bg-gray-50 sticky top-0 z-10'>
        <div className='p-6 pb-0'>
          <Header />
        </div>
        <div className='px-6 bg-gray-50'>
          <SearchBar />
        </div>
      </div>
    </div>
  );
}
