import Input from 'antd/es/input/Input';
import { Popover } from 'antd';
import { ChevronLeft, MicIcon, SearchIcon, UserRound } from 'lucide-react';
import useUserStore from '@/store/useUserStore';
import { useState, useEffect } from 'react';
import QrModal from '@/components/user/QrModal';
import Search, { type SearchSuggestionItem } from '@/api/Search';
import SearchApi from '@/api/Search';
import { useSearchStore } from '@/store/useSearchStore';
const SEARCH_WIDTH = 258;

// type SearchResponse = {
//   result: unknown;
// };

const SEARCH_HISTORY_KEY = 'search_history';

type MusicItem = {
  searchWord: string;
  [key: string]: unknown;
};

const Header = () => {
  const { isLogin } = useUserStore();
  const [isShow, setIsShow] = useState(false);
  const [musicList, setMusicList] = useState<MusicItem[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchSuggestion, setSearchSuggestion] = useState<
    SearchSuggestionItem[]
  >([]);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { searchValueStore, setSearchValueStore } = useSearchStore();
  // 从 localStorage 读取搜索历史
  useEffect(() => {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (history) {
      try {
        setSearchHistory(JSON.parse(history));
      } catch (e) {
        console.error('Failed to parse search history:', e);
      }
    }
  }, []);
  useEffect(() => {
    if (!searchValue) return;
    SearchApi.searchSuccess(searchValue).then((res) => {
      setSearchSuggestion(res.result.allMatch as SearchSuggestionItem[]);
    });
  }, [searchValue]);

  // 保存搜索关键词到 localStorage
  const saveSearchKeyword = (keyword: string) => {
    if (!keyword.trim()) return;

    const updatedHistory = [
      keyword,
      ...searchHistory.filter((item) => item !== keyword),
    ].slice(0, 20); // 最多保存20条

    setSearchHistory(updatedHistory);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
  };

  // 处理搜索
  const handleSearch = (keyword: string) => {
    // saveSearchKeyword(keyword);
    // setSearchValue('');
    // TODO: 执行搜索逻辑
    console.log('搜索关键词:', keyword);
    setSearchValue(keyword);
    setSearchValueStore(keyword);
    setPopoverOpen(false);

    // setSearchValueStore(keyword);
  };

  // 处理输入框回车
  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.value.trim()) {
      handleSearch(target.value.trim());
    }
  };

  // 高亮匹配的文本
  const highlightText = (text: string, keyword: string) => {
    if (!keyword.trim()) return text;
    const regex = new RegExp(
      `(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
      'gi'
    );
    const parts = text.split(regex);
    return parts.map((part, index) => {
      const isMatch = part.toLowerCase() === keyword.toLowerCase();
      return isMatch ? (
        <span key={index} className='text-[#1d4ed8]'>
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      );
    });
  };

  const content = (
    <div>
      <h4 className='font-semibold text-gray-600 text-[20px] px-[20px] mt-[16px]'>
        历史记录
      </h4>
      {/* 搜索历史标签区域 */}
      {searchHistory.length > 0 && (
        <div className='px-[20px] pt-[5px] pb-[16px]'>
          <div className='flex flex-wrap gap-2'>
            {searchHistory.map((keyword, index) => (
              <span
                key={index}
                onClick={() => handleSearch(keyword)}
                className='px-3 py-1.5 bg-gray-100 text-black text-sm rounded-full cursor-pointer hover:bg-gray-200 transition-colors'
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}
      <h4 className='font-semibold text-gray-600 text-[20px] px-[20px] mb-1 mt-[16px]'>
        热歌榜
      </h4>
      {musicList?.map((item, index) => (
        <p
          className='h-[60px] hover:bg-gray-200 cursor-pointer flex items-center px-[20px]'
          key={index}
          onClick={() => handleSearch(item.searchWord)}
        >
          {index + 1 <= 3 ? (
            <span className='font-semibold mr-4 text-[#f43f5e] cursor-pointer'>
              {index + 1}
            </span>
          ) : (
            <span className='font-semibold mr-4 text-gray-400 cursor-pointer'>
              {index + 1}
            </span>
          )}
          <span>{highlightText(item.searchWord, searchValue)}</span>
        </p>
      ))}
    </div>
  );
  const contentSuccess = (
    <div>
      <h4 className='font-semibold text-gray-600 text-[20px] px-[20px] mt-[16px]'>
        猜你想搜
      </h4>
      <div className='body'>
        {searchSuggestion?.map((item, index) => (
          <div
            className='hover:bg-gray-200 cursor-pointer h-[33px] flex items-center'
            key={index}
            onClick={() => handleSearch(item.keyword)}
          >
            <span className='ml-[35px]'>
              {highlightText(item.keyword, searchValue)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
  useEffect(() => {
    Search.hotMusic().then((res) => {
      setMusicList((res as { data: MusicItem[] }).data);
    });
  }, []);
  return (
    <div className='text-black flex items-center gap-2'>
      <div className='left-side flex items-center gap-2'>
        <div className='cursor-pointer hover:text-blue-500 border border-gray-300 h-[35px] w-[35px] flex items-center justify-center rounded-md p-1'>
          <ChevronLeft
            size={25}
            className='text-gray-500 hover:text-blue-500'
          />
        </div>
        <Popover
          content={searchValue ? contentSuccess : content}
          overlayStyle={{ width: 344 }}
          overlayInnerStyle={{ maxHeight: 620, overflowY: 'auto', padding: 0 }}
          arrow={false}
          trigger={'click'}
          open={popoverOpen}
          onOpenChange={setPopoverOpen}
        >
          <Input
            prefix={<SearchIcon size={20} className='text-gray-500' />}
            allowClear={true}
            style={{ width: SEARCH_WIDTH, height: 35 }}
            placeholder='请输入内容'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onPressEnter={handlePressEnter}
            onClear={() => setSearchValue('')}
          />
        </Popover>

        <div className='cursor-pointer hover:text-blue-500 border border-gray-300 h-[35px] w-[35px] flex items-center justify-center rounded-md p-1'>
          <MicIcon size={30} className='text-gray-500 hover:text-blue-500' />
        </div>
      </div>
      <div className='ml-auto flex items-center gap-3 cursor-pointer'>
        {isLogin ? (
          <img
            src='https://i.pravatar.cc/48?img=5'
            alt='用户头像'
            className='w-10 h-10 rounded-full object-cover border border-gray-200 cursor-pointer'
          />
        ) : (
          <UserRound size={20} className='text-gray-500' />
        )}

        <span className='text-sm font-medium text-gray-800'>
          {isLogin ? (
            '月寻一寻月'
          ) : (
            <span onClick={() => setIsShow(true)}>请登录</span>
          )}
        </span>
        <QrModal isShow={isShow} setIsShow={setIsShow} />
      </div>
    </div>
  );
};

export default Header;
