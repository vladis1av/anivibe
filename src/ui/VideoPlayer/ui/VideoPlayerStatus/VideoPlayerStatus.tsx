import { FC } from 'react';

import { EVideoPlayerStatusType } from '@interfaces/common';

import { EVideoPlayerStatus } from '@enums/enums';

import Loader from '@ui/Loader';

import useVideoPlayerStatusStyles from './VideoPlayerStatus.styles';
import ButtonPlay from '../ButtonPlay';

type VideoPlayerStatusProps = {
  status: EVideoPlayerStatusType;
  playedSeconds: number;
  onPlay: () => void
};

const VideoPlayerStatus: FC<VideoPlayerStatusProps> = ({
  status,
  playedSeconds,
  onPlay,
}) => {
  const classes = useVideoPlayerStatusStyles();

  const getComponent = () => {
    switch (status) {
      case EVideoPlayerStatus.idle:
        return <ButtonPlay variant="big" onPlay={onPlay} isPlaying={Boolean(playedSeconds) || false} />;
      case EVideoPlayerStatus.loading:
        return <Loader className={classes.videoPlayerStatusLoader} isLoading={true} />;
      case EVideoPlayerStatus.error:
        return <div className={classes.videoPlayerStatusError}>{'Невозможно загрузить серию :('}</div>;
      default:
        return null;
    }
  };

  return (
    <>
      {
        getComponent()
      }
    </>
  );
};

export default VideoPlayerStatus;
