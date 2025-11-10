import { Menu } from 'antd';
import {
  TrendingUp,
  Sparkles,
  Radio,
  Compass,
  Activity,
  Heart,
  Clock,
  Mic,
  ChevronDown,
  Download,
  Cloud,
} from 'lucide-react';
import type { MenuProps } from 'antd';
import { useMemo, useState } from 'react';

type MenuItem = Required<MenuProps>['items'][number];

const LEFT_PAD_STYLE = { paddingLeft: 10 };

export default function Side() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBottomExpanded, setIsBottomExpanded] = useState(true);
  const [isCollectionExpanded, setIsCollectionExpanded] = useState(true);

  const items = useMemo<MenuItem[]>(() => {
    const myGroupChildren: MenuItem[] = [
      {
        key: '7',
        icon: <Clock size={16} />,
        label: '最近播放',
        style: LEFT_PAD_STYLE,
      },
      {
        key: '8',
        icon: <Mic size={16} />,
        label: '我的播客',
        style: LEFT_PAD_STYLE,
      },
    ];

    if (isExpanded) {
      myGroupChildren.push(
        {
          key: 'extra1',
          icon: <Heart size={16} />,
          label: '我的收藏',
          style: LEFT_PAD_STYLE,
        },
        {
          key: 'extra2',
          icon: <Download size={16} />,
          label: '下载管理',
          style: LEFT_PAD_STYLE,
        },
        {
          key: 'extra3',
          icon: <Cloud size={16} />,
          label: '我的音乐网盘',
          style: LEFT_PAD_STYLE,
        }
      );
    }

    myGroupChildren.push(
      {
        key: '9',
        label: (
          <div
            className='text-xs font-medium text-gray-500 flex items-center cursor-pointer hover:text-blue-500'
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span
              className={`transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            >
              <ChevronDown size={16} />
            </span>
            <span className='ml-1'>{isExpanded ? '收起' : '更多'}</span>
          </div>
        ),
        className: 'no-active-state',
        style: LEFT_PAD_STYLE,
      },
      {
        type: 'divider',
      }
    );

    return [
      {
        key: '1',
        icon: <TrendingUp size={16} />,
        label: '推荐',
        style: LEFT_PAD_STYLE,
      },
      {
        key: '2',
        icon: <Sparkles size={16} />,
        label: '精选',
        style: LEFT_PAD_STYLE,
      },
      {
        key: '3',
        icon: <Radio size={16} />,
        label: '播客',
        style: LEFT_PAD_STYLE,
      },
      {
        key: '4',
        icon: <Compass size={16} />,
        label: '漫游',
        style: LEFT_PAD_STYLE,
      },
      {
        key: '5',
        icon: <Activity size={16} />,
        label: '动态',
        style: LEFT_PAD_STYLE,
      },
      {
        type: 'divider',
      },
      {
        type: 'group',
        label: (
          <div className='text-xs font-medium text-gray-500 mt-2'>我的</div>
        ),
        children: myGroupChildren,
      },
    ];
  }, [isExpanded]);

  const bottomItems = useMemo<MenuItem[]>(() => {
    const bottomChildren: MenuItem[] = isBottomExpanded
      ? [
          {
            key: 'b1',
            icon: <Heart size={16} />,
            label: '我喜欢的音乐',
            style: LEFT_PAD_STYLE,
          },
          {
            key: 'b2',
            icon: <Download size={16} />,
            label: '本地与下载',
            style: LEFT_PAD_STYLE,
          },
          {
            key: 'b3',
            icon: <Cloud size={16} />,
            label: '音乐网盘',
            style: LEFT_PAD_STYLE,
          },
        ]
      : [];

    return [
      {
        type: 'group',
        label: (
          <div className='text-xs font-medium text-gray-500 mt-2 flex items-center cursor-pointer '>
            {/* <span className='ml-1'>创建的歌单</span>
            <ChevronDown size={16} /> */}
            <div
              className='text-xs font-medium text-gray-500 mt-2 flex items-cente hover:text-blue-500'
              onClick={() => setIsBottomExpanded(!isBottomExpanded)}
            >
              <span className='mr-1'>创建的歌单</span>
              <span
                className={`transition-transform duration-200 ${
                  isBottomExpanded ? 'rotate-180' : ''
                }`}
              >
                <ChevronDown size={16} />
              </span>
            </div>
          </div>
        ),
        children: bottomChildren,
      },
      {
        type: 'divider',
        style: {
          margin: '0 20px 0 0',
        },
      },
    ];
  }, [isBottomExpanded]);

  const collectionItems = useMemo<MenuItem[]>(() => {
    const collectionChildren: MenuItem[] = isCollectionExpanded
      ? [
          {
            key: 'c1',
            icon: <Heart size={16} />,
            label: '我收藏的歌单 1',
            style: LEFT_PAD_STYLE,
          },
          {
            key: 'c2',
            icon: <Heart size={16} />,
            label: '我收藏的歌单 2',
            style: LEFT_PAD_STYLE,
          },
        ]
      : [];

    return [
      {
        type: 'group',
        label: (
          <div className='text-xs font-medium text-gray-500 mt-2 flex items-center cursor-pointer '>
            <div
              className='text-xs font-medium text-gray-500 mt-2 flex items-cente hover:text-blue-500'
              onClick={() => setIsCollectionExpanded(!isCollectionExpanded)}
            >
              <span className='mr-1'>收藏的歌单</span>
              <span
                className={`transition-transform duration-200 ${
                  isCollectionExpanded ? 'rotate-180' : ''
                }`}
              >
                <ChevronDown size={16} />
              </span>
            </div>
          </div>
        ),
        children: collectionChildren,
      },
      {
        type: 'divider',
        style: {
          margin: '0 20px 0 0',
        },
      },
    ];
  }, [isCollectionExpanded]);

  return (
    <div
      className='w-[200px] h-full bg-white border-r border-gray-200 select-none flex flex-col items-center'
      style={{
        boxShadow: '2px 0 8px 0 rgba(29,35,41,.05)',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
      onContextMenu={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
    >
      <div className='w-full px-4 pt-6 pb-4 border-b border-gray-200 text-center'>
        <h2 className='text-lg font-semibold text-gray-800'>网易云音乐</h2>
      </div>
      <div
        className='w-full flex flex-col items-center flex-1 overflow-y-auto side-scroll-container'
        style={{
          paddingRight: 4,
          scrollbarWidth: 'thin',
          scrollbarColor: '#888 #f1f1f1',
        }}
      >
        <style>{`
          .side-scroll-container::-webkit-scrollbar {
            width: 6px;
          }
          .side-scroll-container::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 3px;
          }
          .side-scroll-container::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 3px;
          }
          .side-scroll-container::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
          .ant-menu-item.no-active-state {
            background-color: transparent !important;
          }
          .ant-menu-item.no-active-state:hover {
            background-color: transparent !important;
          }
          .ant-menu-item.no-active-state.ant-menu-item-active,
          .ant-menu-item.no-active-state.ant-menu-item-selected {
            background-color: transparent !important;
            color: #595959 !important;
          }
        `}</style>
        <Menu
          mode='inline'
          defaultSelectedKeys={['1']}
          items={items}
          className='select-none'
          style={{
            userSelect: 'none',
            width: '156px',
            border: 'none',
            borderRight: 'none',
          }}
        />
        <Menu
          mode='inline'
          items={bottomItems}
          className='select-none mt-2'
          style={{
            userSelect: 'none',
            width: '156px',
            border: 'none',
            borderRight: 'none',
          }}
        />
        <Menu
          mode='inline'
          items={collectionItems}
          className='select-none mt-2'
          style={{
            userSelect: 'none',
            width: '156px',
            border: 'none',
            borderRight: 'none',
          }}
        />
      </div>
    </div>
  );
}
