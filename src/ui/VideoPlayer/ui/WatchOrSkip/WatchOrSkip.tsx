import { FC, memo } from 'react';

import { useRouter } from 'next/router';

import clsx from 'clsx';

import { TimeSkipsType } from '@interfaces/anime';
import { QueryType, VideoPlayerEpisodeQuery } from '@interfaces/query';

import { NEXT_EPIDSODE_TITLE, SECONDS_FOR_SHOW_BUTTONS, SKIP_OST_TITLE } from '@constants/common';

import { SetSourceActionProps } from '@redux/slices/videoPlayer';

import getTimesFromDuration from '@utils/getTimesFromDuration';
import getTimeSkip from '@utils/getTimeSkip';

import useCommonStyles from '@styles/Common.styles';

import useWatchOrSkipStyles from './WatchOrSkip.styles';
import BaseButton from '../BaseButton';

type WatchOrSkipProps = {
  playedSeconds: number;
  currentEpisode: number;
  episodesLength: number;
  showNextEpisodeButtonTime?: number;
  opening?: TimeSkipsType;
  ending?: TimeSkipsType;
  onSkip: (currentTime: number) => void;
  onChangeEpisode: (source: SetSourceActionProps) => void;
  buttonsWrapperClasses?: string;
  startButtonsClasses?: string;
  endButtonsClasses?: string;
};

const WatchOrSkip: FC<WatchOrSkipProps> = ({
  playedSeconds,
  opening,
  currentEpisode,
  episodesLength,
  showNextEpisodeButtonTime = false,
  ending,
  onSkip,
  onChangeEpisode,
  buttonsWrapperClasses,
  startButtonsClasses,
  endButtonsClasses,
}) => {
  const classes = useWatchOrSkipStyles();
  const commonClasses = useCommonStyles();
  const route = useRouter();
  const { query } = route as unknown as QueryType<VideoPlayerEpisodeQuery>;

  if (!playedSeconds) return null;

  const [startOpPlayingTime, endOpPlayingTime] = getTimeSkip(opening);
  const [startEnPlayingTime, endEnPlayingTime] = getTimeSkip(ending);
  const [openingPlaying] = getTimesFromDuration(startOpPlayingTime, SECONDS_FOR_SHOW_BUTTONS, playedSeconds);
  const [endingPlaying] = getTimesFromDuration(startEnPlayingTime, SECONDS_FOR_SHOW_BUTTONS, playedSeconds);

  const isLastEpisode = currentEpisode === episodesLength;
  const showNextEpisodeButton = playedSeconds >= showNextEpisodeButtonTime;
  const lastButtonClasses = clsx(classes.videoPlayerWatchOrSkipButton, commonClasses.marginLeftTen);
  const startButtonClass = openingPlaying && startButtonsClasses;
  const endButtonClass = (endingPlaying || showNextEpisodeButton) && endButtonsClasses;
  const showButtonsWrapperClass = openingPlaying || endingPlaying || showNextEpisodeButton;

  const setEpisodeQuery = (episode: string) => {
    query.episode = episode;
    route.replace({ ...route }, undefined, { shallow: true, scroll: false });
  };

  const showButton = (show: boolean) => clsx(
    commonClasses.displayHide,
    { [commonClasses.displayShow]: show },
  );

  const onSkipMusic = (currentTime: number) => () => onSkip(currentTime);

  const onChangeCurrentEpisode = () => {
    const nextEpisode = currentEpisode + 1;
    onChangeEpisode({ currentEpisode: nextEpisode, play: true });
    setEpisodeQuery(`${nextEpisode + 1}`); // // серии начинаются с 0, прибавляю 1 чтоб правильно отображалось
  };

  return (
    <div
      className={clsx(
        classes.videoPlayerWatchOrSkipButtonsList,
        startButtonClass,
        endButtonClass,
        commonClasses.hide,
        {
          [commonClasses.show]: showButtonsWrapperClass,
        },
        buttonsWrapperClasses,
      )}
    >
      <div className={showButton(openingPlaying)}>
        <BaseButton
          className={classes.videoPlayerWatchOrSkipButton}
          onClick={onSkipMusic(endOpPlayingTime)}
        >
          {SKIP_OST_TITLE}
        </BaseButton>
      </div>

      <div className={showButton(endingPlaying)}>
        <BaseButton
          className={classes.videoPlayerWatchOrSkipButton}
          onClick={onSkipMusic(endEnPlayingTime)}
        >
          {SKIP_OST_TITLE}
        </BaseButton>

        {!isLastEpisode ? <BaseButton
          className={lastButtonClasses}
          onClick={onChangeCurrentEpisode}
        >
          {NEXT_EPIDSODE_TITLE}
        </BaseButton> : null}
      </div>

      <div className={showButton(!openingPlaying && !endingPlaying && !isLastEpisode && showNextEpisodeButton)}>
        <BaseButton
          className={classes.videoPlayerWatchOrSkipButton}
          onClick={onChangeCurrentEpisode}
        >
          {NEXT_EPIDSODE_TITLE}
        </BaseButton>
      </div>
    </div>
  );
};

export default memo(WatchOrSkip, (prevProps, nextProps) => {
  if (prevProps.ending !== nextProps.ending) return false;
  if (prevProps.opening !== nextProps.opening) return false;
  if (prevProps.playedSeconds !== nextProps.playedSeconds) return false;
  if (prevProps.currentEpisode !== nextProps.currentEpisode) return false;
  if (prevProps.episodesLength !== nextProps.episodesLength) return false;
  if (prevProps.endButtonsClasses !== nextProps.endButtonsClasses) return false;
  if (prevProps.startButtonsClasses !== nextProps.startButtonsClasses) return false;
  if (prevProps.buttonsWrapperClasses !== nextProps.buttonsWrapperClasses) return false;
  if (prevProps.showNextEpisodeButtonTime !== nextProps.showNextEpisodeButtonTime) return false;

  return true;
});
