import { HOUR, MINUTE } from '@constants/common';

import leadingZero from './leadingZero';
import filter from '../array/filter';

const formatDuration = (durationInSeconds: number): string => {
  const hours = Math.floor(durationInSeconds / HOUR);
  const minutes = Math.floor(durationInSeconds / MINUTE);
  const seconds = Math.floor(durationInSeconds % MINUTE);

  return filter([hours, leadingZero(minutes), leadingZero(seconds)], (value) => Boolean(value)).join(':');
};

export default formatDuration;
