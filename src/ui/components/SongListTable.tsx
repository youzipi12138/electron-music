import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Heart, Download, Plus, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

interface SongItem {
  key: number;
  index: number;
  title: string;
  thumbnail: string;
  tags: string[];
  artists: string[];
  album: string;
  duration: string;
  isLiked: boolean;
}

const mockData: SongItem[] = [
  {
    key: 1,
    index: 1,
    title: "내가 제일 잘 나가 (我最红 (I'm The Best))",
    thumbnail: 'https://i.pravatar.cc/60?img=1',
    tags: ['超清母带', 'VIP', '试听', '原唱'],
    artists: ['2NE1'],
    album: '내가 제일 잘 나가 (我最红)',
    duration: '03:30',
    isLiked: false,
  },
  {
    key: 2,
    index: 2,
    title: "我最红(I'm The Best)",
    thumbnail: 'https://i.pravatar.cc/60?img=2',
    tags: ['热歌榜'],
    artists: ['2NE1'],
    album: '热歌榜',
    duration: '03:28',
    isLiked: false,
  },
  {
    key: 3,
    index: 3,
    title: 'Fire & 我最红(2024MBC歌谣大赏)',
    thumbnail: 'https://i.pravatar.cc/60?img=3',
    tags: ['沉浸声'],
    artists: ['李泳知', '安俞真(YUJIN)', 'MIMI', 'Lee EunJi'],
    album: '未知专辑',
    duration: '03:59',
    isLiked: false,
  },
  {
    key: 4,
    index: 4,
    title: 'WELCOME BACK',
    thumbnail: 'https://i.pravatar.cc/60?img=4',
    tags: ['超清母带', 'MV>'],
    artists: ['2NE1'],
    album: 'WELCOME BACK',
    duration: '04:14',
    isLiked: false,
  },
  {
    key: 5,
    index: 5,
    title: '내가 제일 잘 나가(我最红)',
    thumbnail: 'https://i.pravatar.cc/60?img=5',
    tags: ['超清母带', 'MV>'],
    artists: ['2NE1'],
    album: '2nd Mini Album',
    duration: '03:30',
    isLiked: false,
  },
  {
    key: 6,
    index: 6,
    title: 'ẞ那艺娜原声大碟',
    thumbnail: 'https://i.pravatar.cc/60?img=6',
    tags: ['练习室live'],
    artists: ['那艺娜'],
    album: 'ẞ那艺娜原声大碟',
    duration: '03:56',
    isLiked: false,
  },
  {
    key: 7,
    index: 7,
    title: '내가 제일 잘 나가(我最红)',
    thumbnail: 'https://i.pravatar.cc/60?img=7',
    tags: ['超清母带', 'MV>'],
    artists: ['2NE1'],
    album: 'NOLZA',
    duration: '00:53',
    isLiked: false,
  },
  {
    key: 8,
    index: 8,
    title: '2NE1 1st LIVE CONCERT [NOLZA!]',
    thumbnail: 'https://i.pravatar.cc/60?img=8',
    tags: ['Live'],
    artists: ['2NE1'],
    album: '2NE1 1st LIVE CONCERT [NOLZA!]',
    duration: '02:29',
    isLiked: false,
  },
  {
    key: 9,
    index: 9,
    title: 'I-LAND2: N/a',
    thumbnail: 'https://i.pravatar.cc/60?img=9',
    tags: ['VIP'],
    artists: ['Various Artists'],
    album: 'I-LAND2: N/a',
    duration: '03:30',
    isLiked: false,
  },
  {
    key: 10,
    index: 10,
    title: '내가 제일 잘 나가 (JP Ver.)',
    thumbnail: 'https://i.pravatar.cc/60?img=10',
    tags: ['JP Ver.'],
    artists: ['2NE1'],
    album: 'JP Album',
    duration: '03:28',
    isLiked: false,
  },
  {
    key: 11,
    index: 11,
    title: 'β最红那艺娜版',
    thumbnail: 'https://i.pravatar.cc/60?img=11',
    tags: ['β最红那艺娜版'],
    artists: ['那艺娜'],
    album: 'β最红那艺娜版',
    duration: '03:30',
    isLiked: false,
  },
];

export const SongListTable = () => {
  const [likedSongs, setLikedSongs] = useState<Set<number>>(new Set());

  const handleLike = (key: number) => {
    const newLiked = new Set(likedSongs);
    if (newLiked.has(key)) {
      newLiked.delete(key);
    } else {
      newLiked.add(key);
    }
    setLikedSongs(newLiked);
  };

  const columns: ColumnsType<SongItem> = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      width: 20,
      align: 'center',
      render: (index: number) => (
        <span className='text-gray-500 text-sm w-[20px]'>
          {String(index).padStart(2, '0')}
        </span>
      ),
    },
    {
      title: '标题',
      key: 'title',
      width: '40%',
      align: 'left',
      render: (_, record) => (
        <div className='flex items-center gap-3 py-2'>
          <img
            src={record.thumbnail}
            alt={record.title}
            className='w-[50px] h-[50px] rounded object-cover flex-shrink-0'
          />
          <div className='flex flex-col gap-1 flex-1 min-w-0'>
            <div className='flex items-center gap-2 flex-wrap'>
              <span className='text-sm font-medium text-gray-800'>
                {record.title}
              </span>
            </div>
            <div className='flex items-center gap-1.5 flex-wrap'>
              {record.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className='text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded'
                >
                  {tag}
                </span>
              ))}
              <span className='text-xs text-gray-500'>
                {record.artists.join(' / ')}
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '专辑',
      dataIndex: 'album',
      key: 'album',
      width: '25%',
      align: 'left',
      render: (album: string, record) => (
        <div className='flex items-center gap-2'>
          <span className='text-sm text-gray-600 truncate'>{album}</span>
          {record.index === 2 && (
            <div className='flex items-center gap-2 ml-auto'>
              <Download
                size={16}
                className='text-gray-400 cursor-pointer hover:text-gray-600'
              />
              <Plus
                size={16}
                className='text-gray-400 cursor-pointer hover:text-gray-600'
              />
              <MoreHorizontal
                size={16}
                className='text-gray-400 cursor-pointer hover:text-gray-600'
              />
            </div>
          )}
        </div>
      ),
    },
    {
      title: '喜欢',
      key: 'like',
      width: 80,
      align: 'center',
      render: (_, record) => (
        <div className='flex justify-center'>
          <Heart
            size={18}
            className={`cursor-pointer transition-colors ${
              likedSongs.has(record.key)
                ? 'text-red-500 fill-red-500'
                : 'text-gray-400 hover:text-red-500'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleLike(record.key);
            }}
          />
        </div>
      ),
    },
    {
      title: '时长',
      dataIndex: 'duration',
      key: 'duration',
      width: 80,
      align: 'right',
      render: (duration: string) => (
        <span className='text-sm text-gray-500'>{duration}</span>
      ),
    },
  ];

  return (
    <div className='w-full mt-4'>
      <Table
        columns={columns}
        dataSource={mockData}
        pagination={false}
        showHeader={true}
        rowClassName='hover:bg-gray-50 cursor-pointer'
        className='song-list-table [&_.ant-table-thead>tr>th]:bg-white [&_.ant-table-thead>tr>th]:border-b [&_.ant-table-thead>tr>th]:border-gray-200 [&_.ant-table-thead>tr>th]:font-medium [&_.ant-table-thead>tr>th]:text-gray-600 [&_.ant-table-tbody>tr>td]:border-b [&_.ant-table-tbody>tr>td]:border-gray-100 [&_.ant-table-tbody>tr:last-child>td]:border-b-0'
        size='middle'
        bordered={false}
      />
    </div>
  );
};
