import { useEffect, useState, useRef } from 'react';
import { Drawer } from 'antd';
import { Loader2 } from 'lucide-react';
import DrawerPlayerBar from './DrawerPlayerBar';
import usePlayStore from '@/store/usePlayStore';
import SearchApi from '@/api/Search';

type PlayerDrawerProps = {
  open: boolean;
  onClose: () => void;
};

interface LyricLine {
  time: number; // 时间戳（秒）
  text: string; // 歌词文本
}

export default function PlayerDrawer({ open, onClose }: PlayerDrawerProps) {
  const { coverUrl, isStart, currentMusicId, currentTime } = usePlayStore();
  const [lyricLines, setLyricLines] = useState<LyricLine[]>([]);
  const [loading, setLoading] = useState(false);
  const lyricsContainerRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);

  /**
   * 解析 LRC 格式歌词
   * LRC 格式示例：[00:18.330]不需要借口
   *
   * @param lyricsText - LRC 格式的歌词字符串，包含时间戳和歌词文本
   * @returns 解析后的歌词行数组，每行包含时间戳（秒）和文本内容
   */
  const parseLyrics = (lyricsText: string): LyricLine[] => {
    // 如果歌词文本为空，直接返回空数组
    if (!lyricsText) return [];

    // 存储解析后的歌词行
    const lines: LyricLine[] = [];

    // 按换行符分割歌词文本，将整个歌词字符串拆分成多行
    // 例如："[00:00.000] 编曲 : 张宝宇\n[00:01.000] 制作人 : 赵英俊\n"
    // 会被分割成：["[00:00.000] 编曲 : 张宝宇", "[00:01.000] 制作人 : 赵英俊", ""]
    const lyricArray = lyricsText.split('\n');

    // 遍历每一行歌词
    lyricArray.forEach((line) => {
      /**
       * 匹配 LRC 格式的时间戳
       * 正则表达式说明：
       * - \[ 匹配左方括号（需要转义，因为 [ 在正则中是特殊字符）
       * - (\d{2}) 匹配两位数字（分钟），使用捕获组 group 1
       * - : 匹配冒号
       * - (\d{2}) 匹配两位数字（秒），使用捕获组 group 2
       * - \. 匹配点号（需要转义，因为 . 在正则中表示任意字符）
       * - (\d{2,3}) 匹配2-3位数字（毫秒），使用捕获组 group 3
       * - \] 匹配右方括号（需要转义）
       * - g 全局匹配标志，匹配一行中所有的时间戳
       *
       * 示例匹配结果：
       * "[00:18.330]不需要借口" -> 匹配到 ["[00:18.330]"]
       * "[00:01.000] 制作人 : 赵英俊" -> 匹配到 ["[00:01.000]"]
       */
      const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/g;

      // 使用 matchAll 获取所有匹配项（返回迭代器，转换为数组）
      // 一行歌词可能包含多个时间戳，例如："[00:01.000][00:02.000]歌词"
      const matches = [...line.matchAll(timeRegex)];

      // 如果这一行包含时间戳，进行解析
      if (matches.length > 0) {
        /**
         * 提取纯文本内容
         * 使用 replace 方法去掉所有时间戳标记，只保留歌词文本
         *
         * 示例：
         * "[00:18.330]不需要借口" -> "不需要借口"
         * "[00:01.000] 制作人 : 赵英俊" -> " 制作人 : 赵英俊"
         * 使用 trim() 去掉首尾空格
         */
        const text = line.replace(timeRegex, '').trim();

        // 如果去掉时间戳后文本为空（可能是纯时间戳行），跳过这一行
        if (!text) {
          return;
        }

        /**
         * 为每个时间戳创建一行歌词
         * 一行歌词可能对应多个时间戳（例如重复的歌词会标注多个时间点）
         * 每个时间戳都会创建一条独立的歌词记录
         */
        matches.forEach((match) => {
          /**
           * 解析时间戳的各个部分
           * match[0] 是整个匹配的字符串，例如："[00:18.330]"
           * match[1] 是捕获组 1：分钟，例如："00"
           * match[2] 是捕获组 2：秒，例如："18"
           * match[3] 是捕获组 3：毫秒，例如："330"
           */
          const minutes = parseInt(match[1], 10); // 将字符串转换为数字，例如："00" -> 0
          const seconds = parseInt(match[2], 10); // 例如："18" -> 18
          const milliseconds = parseInt(match[3], 10); // 例如："330" -> 330

          /**
           * 计算总时间（秒）
           * 将所有时间单位统一转换为秒数
           * - minutes * 60: 将分钟转换为秒
           * - seconds: 直接使用秒数
           * - milliseconds / 1000: 将毫秒转换为秒（如果毫秒是2位，表示百分之一秒）
           *
           * 示例：
           * [00:18.330] -> 0 * 60 + 18 + 330 / 1000 = 18.33 秒
           * [01:25.50] -> 1 * 60 + 25 + 50 / 1000 = 85.05 秒
           */
          const time = minutes * 60 + seconds + milliseconds / 1000;

          // 将解析后的歌词行添加到数组中
          lines.push({
            time, // 时间戳（秒）
            text, // 歌词文本
          });
        });
      }
    });

    /**
     * 按时间戳排序歌词行
     * 由于歌词可能不是按照时间顺序排列的（例如元数据在前面），
     * 需要按照时间戳从小到大排序，确保播放时能按正确顺序显示
     *
     * sort 函数的比较逻辑：
     * - 如果 a.time < b.time，返回负数，a 排在 b 前面
     * - 如果 a.time > b.time，返回正数，a 排在 b 后面
     * - 如果 a.time === b.time，返回 0，保持原顺序
     */
    return lines.sort((a, b) => a.time - b.time);
  };

  useEffect(() => {
    if (currentMusicId) {
      setLoading(true);
      SearchApi.searchLyrics(currentMusicId)
        .then((res) => {
          const parsed = parseLyrics(res.lrc.lyric);
          setLyricLines(parsed);
        })
        .catch((error) => {
          console.error('获取歌词失败:', error);
          setLyricLines([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [currentMusicId]);

  // 自动滚动到当前播放的歌词行
  useEffect(() => {
    if (
      activeLineRef.current &&
      lyricsContainerRef.current &&
      lyricLines.length > 0
    ) {
      const container = lyricsContainerRef.current;
      const activeLine = activeLineRef.current;

      // 获取容器和活跃行的位置信息
      const containerRect = container.getBoundingClientRect();
      const activeLineRect = activeLine.getBoundingClientRect();

      // 计算活跃行相对于容器的位置
      const activeLineTop =
        activeLineRect.top - containerRect.top + container.scrollTop;
      const containerHeight = containerRect.height;
      const activeLineHeight = activeLineRect.height;

      // 计算目标滚动位置：让活跃行显示在容器中央
      const targetScrollTop =
        activeLineTop - containerHeight / 2 + activeLineHeight / 2;

      // 平滑滚动到目标位置
      container.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth',
      });
    }
  }, [currentTime, lyricLines]);
  return (
    <Drawer
      placement='bottom'
      height='100vh'
      open={open}
      onClose={onClose}
      styles={{
        header: { display: 'none' },
        body: { padding: 0, background: '#12131a' },
        content: { background: '#12131a', borderRadius: 0 },
      }}
    >
      <div
        className='h-full text-white relative flex flex-col'
        style={{
          background:
            'linear-gradient(to bottom, #0f172a 0%, #0a1628 50%, #0d1b2a 100%)',
        }}
      >
        <div className='flex items-center justify-end mb-4 px-6 pt-4'>
          <button
            className='px-3 py-1 rounded-md bg-[#2a2c38] text-sm hover:bg-[#323545]'
            onClick={onClose}
          >
            关闭
          </button>
        </div>

        <div className='flex-1 flex pb-[72px] overflow-hidden'>
          {/* 左侧：封面图片 - 占据屏幕的一半 */}
          <div className='w-1/2 flex items-center justify-center'>
            <div className='relative'>
              <span className='absolute inset-0 rounded-full bg-linear-to-br from-pink-400 via-purple-400 to-blue-400 blur-sm opacity-80' />
              <span
                className='relative flex h-[500px] w-[500px] items-center justify-center rounded-full bg-[#232532] animate-spin'
                style={{
                  animationDuration: '40s',
                  animationTimingFunction: 'linear',
                  animationPlayState: isStart ? 'running' : 'paused',
                }}
              >
                <img
                  src={coverUrl}
                  alt='专辑封面'
                  className='h-[400px] w-[400px] rounded-full object-cover'
                />
              </span>
            </div>
          </div>

          {/* 右侧：歌词内容 - 占据屏幕的一半 */}
          <div className='w-1/2 flex items-center justify-center px-8'>
            <div className='w-full max-w-2xl h-full flex items-center'>
              {loading ? (
                <div className='flex items-center justify-center w-full h-full'>
                  <Loader2 className='w-8 h-8 text-gray-400 animate-spin' />
                </div>
              ) : (
                <div
                  ref={lyricsContainerRef}
                  className='flex-1 overflow-y-auto max-h-full space-y-3 text-gray-300 text-base leading-relaxed py-20'
                >
                  {lyricLines.length > 0 ? (
                    lyricLines.map((line, index) => {
                      // 判断当前行是否应该高亮：当前时间 >= 该行时间，并且 < 下一行时间
                      const nextLineTime =
                        index < lyricLines.length - 1
                          ? lyricLines[index + 1].time
                          : Infinity;
                      const isActive =
                        currentTime >= line.time && currentTime < nextLineTime;

                      return (
                        <div
                          key={`${line.time}-${index}`}
                          ref={isActive ? activeLineRef : null}
                          className={`transition-all text-left ${
                            isActive
                              ? 'text-white font-medium text-lg'
                              : 'text-gray-400'
                          }`}
                        >
                          {line.text}
                        </div>
                      );
                    })
                  ) : (
                    <div className='text-gray-400 text-left'>暂无歌词</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='absolute bottom-0 left-0 right-0'>
        <DrawerPlayerBar />
      </div>
    </Drawer>
  );
}
