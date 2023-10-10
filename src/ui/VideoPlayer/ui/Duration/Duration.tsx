import { FC, memo } from 'react';

import clsx from 'clsx';

import formatDuration from '@utils/number/formatDuration';

import useDurationStyles from './Duration.styles';

type DurationProps = {
  duration: number;
  elapsed: number;
  className?: string;
};

const Duration: FC<DurationProps> = ({ duration, elapsed, className }) => {
  const classes = useDurationStyles();
  const playedSeconds = formatDuration(duration * elapsed);
  const fullTime = formatDuration(duration);

  return (
    <div className={clsx(classes.videoPlayerDurationWrapper, className)}>
      <span className={classes.videoPlayerCurrentDuration}>{playedSeconds}</span>

      <span className={classes.videoPlayerDurationDivider}>/</span>

      <span className={classes.videoPlayerDuration}>{fullTime}</span>
    </div>
  );
};

export default memo(Duration, (prevProps, nextProps) => prevProps.duration === nextProps.duration
 && prevProps.elapsed === nextProps.elapsed);
