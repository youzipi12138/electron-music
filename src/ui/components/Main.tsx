import Header from './header';
import { SearchBar } from '@/components/SearchBar';
import SingleMusic from '@/components/SingleMusic';
import { MusicList } from './MusicList';
import { SingleList } from './SingleList';
import { UserList } from './UserList';
import { AlumbList } from '@/components/AlumbList';
export default function Main() {
  return (
    <div className='flex-1 overflow-auto bg-gray-50'>
      <div className='p-6'>
        <Header />
        <section>
          <SearchBar />
          <SingleMusic />
          <MusicList />
          <SingleList />
          <AlumbList />
          <UserList />
        </section>
      </div>
    </div>
  );
}
