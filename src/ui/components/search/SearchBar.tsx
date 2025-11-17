import { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { SearchCard } from '@/components/search/SearchCard';
import { useSearchStore } from '@/store/useSearchStore';
import { SongListTable } from '@/components/player/SongListTable';
import SingleMusic from '@/components/player/SingleMusic';
import { MusicList } from '@/components/player/MusicList';
import { SingleList } from '@/components/player/SingleList';
import { AlumbList } from '@/components/media/AlumbList';
import { UserList } from '@/components/user/UserList';
import SearchApi from '@/api/Search';
export const SearchBar = () => {
  const [activeKey, setActiveKey] = useState<string>('综合');
  const { searchValueStore } = useSearchStore();
  const [songList, setSongList] = useState([]); //单曲信息
  const [singer, setSinger] = useState(); //歌手信息
  const [albumList, setAlbumList] = useState([]); //专辑信息
  const [mvList, setMvList] = useState([]); //MV信息
  const [userList, setUserList] = useState([]); //用户信息
  const [playlistList, setPlaylistList] = useState([]); //歌单
  const items: TabsProps['items'] = [
    {
      key: '综合',
      label: '综合',
      children: (
        <div>
          <SearchCard singer={singer} />
          <SingleMusic songList={songList} />
          <MusicList />
          <SingleList />
          <AlumbList />
          <UserList />
        </div>
      ),
    },
    {
      key: '单曲',
      label: '单曲',
      children: <SongListTable />,
    },
    {
      key: '歌单',
      label: '歌单',
    },
    {
      key: '歌手',
      label: '歌手',
    },
    {
      key: '声音',
      label: '声音',
    },
    {
      key: '播客',
      label: '播客',
    },
    {
      key: '歌词',
      label: '歌词',
    },
    {
      key: '专辑',
      label: '专辑',
    },
    {
      key: 'MV',
      label: 'MV',
    },
    {
      key: '用户',
      label: '用户',
    },
  ];
  useEffect(() => {
    SearchApi.searchDefault(searchValueStore).then((res) => {
      setSongList(res.result.song.songs);
      console.log('111', res.result);
      setSinger(res.result.artist.artists[0]);
      setPlaylistList(res.result.playlist.playlists);
    });
  }, [searchValueStore]);
  const onChange = (key: string) => {
    setActiveKey(key);
  };

  return (
    <div className='bg-gray-50'>
      <div className='flex items-baseline mt-4'>
        <div className='text-gray-800 font-semibold text-[30px] mr-1'>
          {searchValueStore}
        </div>
        <span className='text-gray-600'>的相关搜索如下</span>
      </div>
      <div className='bg-gray-50'>
        <Tabs
          activeKey={activeKey}
          items={items}
          onChange={onChange}
          className='search-tabs [&_.ant-tabs-content]:h-[calc(100vh-250px)] [&_.ant-tabs-content]:overflow-auto'
        />
      </div>
    </div>
  );
};
