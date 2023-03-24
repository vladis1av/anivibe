import { HOUR, MINUTE } from '@constants/common';

import filter from './filter';
import leadingZero from './leadingZero';

const formatDuration = (durationInSeconds: number): string => {
  const hours = Math.floor(durationInSeconds / HOUR);
  const minutes = Math.floor(durationInSeconds / MINUTE);
  const seconds = Math.floor(durationInSeconds % MINUTE);

  return filter([hours, leadingZero(minutes), leadingZero(seconds)], (value) => Boolean(value)).join(':');
};

export default formatDuration;
