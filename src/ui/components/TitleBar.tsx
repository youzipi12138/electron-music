import { Minus, Square, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function TitleBar() {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    // 检查窗口是否最大化
    const checkMaximized = async () => {
      if (window.electronAPI) {
        const maximized = await window.electronAPI.isMaximized();
        setIsMaximized(maximized);
      }
    };

    checkMaximized();

    // 监听窗口最大化状态变化
    if (window.electronAPI) {
      window.electronAPI.onMaximize((maximized) => {
        setIsMaximized(maximized);
      });
    }
  }, []);

  const handleMinimize = () => {
    if (window.electronAPI) {
      window.electronAPI.minimizeWindow();
    }
  };

  const handleMaximize = () => {
    if (window.electronAPI) {
      window.electronAPI.maximizeWindow();
    }
  };

  const handleClose = () => {
    if (window.electronAPI) {
      window.electronAPI.closeWindow();
    }
  };

  // 只在 Electron 环境中显示标题栏
  if (!window.electronAPI) {
    return null;
  }

  // macOS 风格：控制按钮在左侧
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  return (
    <div className='h-8 bg-gray-50 dark:bg-gray-900 flex items-center justify-between px-2 drag-region select-none border-b border-gray-200 dark:border-gray-700'>
      {isMac ? (
        <>
          <div className='flex items-center gap-2 no-drag'>
            <button
              onClick={handleClose}
              className='w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group'
              aria-label='关闭'
            >
              <X
                size={8}
                className='text-red-500 opacity-0 group-hover:opacity-100 transition-opacity'
              />
            </button>
            <button
              onClick={handleMinimize}
              className='w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors flex items-center justify-center group'
              aria-label='最小化'
            >
              <Minus
                size={8}
                className='text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity'
              />
            </button>
            <button
              onClick={handleMaximize}
              className='w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center group'
              aria-label={isMaximized ? '还原' : '最大化'}
            >
              <Square
                size={6}
                className='text-green-500 opacity-0 group-hover:opacity-100 transition-opacity'
              />
            </button>
          </div>
          <div className='flex-1 flex items-center justify-center'>
            <span className='text-xs font-medium text-gray-600 dark:text-gray-400'>
              desktop
            </span>
          </div>
          <div className='w-16'></div>
        </>
      ) : (
        <>
          <div className='flex items-center px-2'>
            <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
              desktop
            </span>
          </div>
          <div className='flex items-center no-drag'>
            <button
              onClick={handleMinimize}
              className='w-8 h-8 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
              aria-label='最小化'
            >
              <Minus size={14} className='text-gray-600 dark:text-gray-400' />
            </button>
            <button
              onClick={handleMaximize}
              className='w-8 h-8 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
              aria-label={isMaximized ? '还原' : '最大化'}
            >
              <Square size={12} className='text-gray-600 dark:text-gray-400' />
            </button>
            <button
              onClick={handleClose}
              className='w-8 h-8 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors'
              aria-label='关闭'
            >
              <X size={14} className='text-gray-600 dark:text-gray-400' />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
