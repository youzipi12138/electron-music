function formatSecondsToMMSS(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  // 补零并拼接格式
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// 格式化数字粉丝数量
function formatFansNumber(number: string) {
  if (Number(number) >= 10000) {
    return `${(Number(number) / 10000).toFixed(1)}万`;
  }
  return number;
}

const formatPlayCount = (count: number) => {
  if (count >= 100000000) {
    return `${(count / 100000000).toFixed(1).replace(/\.0$/, '')}亿`;
  }
  if (count >= 10000) {
    return `${(count / 10000).toFixed(1).replace(/\.0$/, '')}万`;
  }
  return `${count}`;
};
export { formatSecondsToMMSS, formatFansNumber, formatPlayCount };
