import React, { useEffect, useState } from 'react';
import { ChevronRight, Play } from 'lucide-react';
import SearchApi, { type Userprofile } from '@/api/Search';
import { defaultAvatar } from '../../assets';
import { useSearchStore } from '@/store/useSearchStore';
export const UserList = () => {
  const [userList, setUserList] = useState<Userprofile[]>([]);
  const { searchValueStore } = useSearchStore();
  useEffect(() => {
    if (!searchValueStore) return;
    SearchApi.searchUser(searchValueStore, 6, 0).then((res) => {
      setUserList(res.result.userprofiles);
      console.log(10000, res);
    });
  }, [searchValueStore]);
  return (
    <div>
      <div className='text-[20px] font-bold text-gray-700 flex items-center mt-5 '>
        <span className='ml-[8px]'>用户</span>
        <ChevronRight size={22} className='relative top-px' />
      </div>
      <div className='body mt-4 grid grid-rows-1 auto-rows-[0] grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 overflow-hidden cursor-pointer'>
        {userList?.map((user, index) => (
          <div
            className=' aspect-4/5 p-5 flex items-center flex-col hover:bg-white shadow-2xs rounded-2xl group'
            key={index}
          >
            <div className='w-full aspect-square rounded-full overflow-hidden relative'>
              <img
                className='w-full h-full object-cover'
                src={user.avatarUrl || defaultAvatar}
                alt={user.nickname}
              />
              <div className='absolute inset-0 z-10 flex items-center justify-center gap-1 text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity'>
                <Play size={30} className='text-white ml-1' fill='white' />
              </div>
              <div className='absolute inset-0 bg-gray-900/15 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg'></div>
            </div>
            <div className='text-nowrap text-ellipsis overflow-hidden text-gray-700 font-semibold mt-5 mb-1'>
              {user.nickname}
            </div>
            <div className='text-gray-500 text-[12px] text-ellipsis overflow-hidden whitespace-nowrap w-full text-center'>
              {user.signature || '这个人很懒，什么都没有留下'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
