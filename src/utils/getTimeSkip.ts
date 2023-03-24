import { TimeSkipsType } from '@interfaces/anime';

const getTimeSkip = (
  timeSkip: TimeSkipsType | undefined,
): [number, number] => (timeSkip && timeSkip.length ? timeSkip : [0, 0]);

export default getTimeSkip;
