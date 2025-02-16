const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes} : ${secs < 10 ? `0${secs}` : secs}`;
};

const convertToSeconds = (minutes: number, seconds: number): number => {
  return minutes * 60 + seconds;
};

export { formatTime, convertToSeconds };
