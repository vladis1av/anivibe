const getTimesFromDuration = (
  startTime: number,
  plusTime: number,
  playedSeconds: number,
): [boolean, boolean, boolean] => {
  const maxStartTime = startTime ? startTime + plusTime : 0;
  const timeStartPlaying = playedSeconds >= startTime;
  const timeEndPlaying = timeStartPlaying && playedSeconds <= maxStartTime;
  const isPlaying = timeStartPlaying && timeEndPlaying;

  return [isPlaying, timeStartPlaying, timeEndPlaying];
};

export default getTimesFromDuration;
