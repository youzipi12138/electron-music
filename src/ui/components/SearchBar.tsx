import { useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { SearchCard } from '@/components/SearchCard';
export const SearchBar = () => {
  const [activeKey, setActiveKey] = useState<string>('综合');

  const items: TabsProps['items'] = [
    {
      key: '综合',
      label: '综合',
      children: (
        <SearchCard name='双笙 ' stats={{ songs: 10000, fans: '10000' }} />
      ),
    },
    {
      key: '单曲',
      label: '单曲',
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

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  return (
    <div>
      <div className='flex items-baseline mt-4'>
        <div className='text-gray-800 font-semibold text-[30px] mr-1'>
          双生1
        </div>
        <span className='text-gray-600'>的相关搜索如下</span>
      </div>
      <div>
        <Tabs
          activeKey={activeKey}
          items={items}
          onChange={onChange}
          className='search-tabs'
        />
      </div>
    </div>
  );
};
