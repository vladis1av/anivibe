import {
  FC, RefObject,
} from 'react';

import clsx from 'clsx';

import { TimeSkipsType } from '@interfaces/anime';
import { VideoPlayerRef } from '@interfaces/common';
import { HlsQuality } from '@interfaces/hls';

import { EVideoPlayerStatus } from '@enums/enums';

import { VIDEO_PLAYER_SVG_SIZE } from '@constants/common';

import useVideoPlayer from '@hooks/useVideoPlayer';

import useCommonStyles from '@styles/Common.styles';

import useControlsStyles from './Controls.styles';
import ButtonPlay from '../../ui/ButtonPlay';
import Duration from '../../ui/Duration';
import FullScreenToggle from '../../ui/FullScreenToggle';
import Progress from '../../ui/Progress';
import SettingsMenu from '../../ui/SettingsMenu';
import Volume from '../../ui/Volume';
import WatchOrSkip from '../../ui/WatchOrSkip';

type ControlsProps = {
  qualityList: HlsQuality;
  playlistLength: number;
  opening: TimeSkipsType;
  ending: TimeSkipsType;
  videoPlayerRef: RefObject<VideoPlayerRef>;
  videoPlayerWrapperRef: RefObject<HTMLDivElement>;
  className?: string;
};

const Controls: FC<ControlsProps> = ({
  qualityList,
  playlistLength,
  opening,
  ending,
  videoPlayerRef,
  videoPlayerWrapperRef,
  className,
}) => {
  const classes = useControlsStyles();
  const commonClasses = useCommonStyles();

  const {
    state: {
      status,
      currentQuality,
      playbackRate,
      duration,
      playedSeconds,
      loadedSeconds,
      played,
      sourceIndex,
      volume,
      isFullScreen,
      settingsMenu: settingsMenuKey,
      isPlaying,
    },
    actions: {
      onPlaybackRateChange,
      onTogglePlay,
      onToggleFullScreen,
      onChangeSettingsMenu,
      onChangeSource,
      onChangeQuality,
      onChangeProgressSeconds,
      onChangeVolume,
      onVolumeMuteToggle,
      onSetDefaultSettingsMenu,
      onToggleSettingsMenu,
      onCloseSettings,
    },
  } = useVideoPlayer(videoPlayerRef, videoPlayerWrapperRef);
  const showNextEpisodeButtonTime = Number((duration - 60).toFixed(0));

  return (
    <div className={clsx(classes.videoPlayerControls, className)}>
      <Progress
        step={1}
        max={duration}
        value={playedSeconds}
        loadedValue={loadedSeconds}
        onChangeSeconds={onChangeProgressSeconds}
      />

      <WatchOrSkip
        playedSeconds={playedSeconds}
        opening={opening}
        ending={ending}
        currentEpisode={sourceIndex}
        episodesLength={playlistLength}
        onChangeEpisode={onChangeSource}
        onSkip={onChangeProgressSeconds}
        showNextEpisodeButtonTime={showNextEpisodeButtonTime}
        buttonsWrapperClasses={classes.videoPlayerWatchOrSkipButtons}
        startButtonsClasses={classes.videoPlayerWatchOrSkipButtonsStart}
        endButtonsClasses={classes.videoPlayerWatchOrSkipButtonsEnd}
      />

      <div className={classes.videoPlayerControlsList}>
        <div className={classes.videoPlayerControlsListItem}>
          <ButtonPlay
            onPlay={onTogglePlay}
            isPlaying={status === EVideoPlayerStatus.loading || isPlaying}
            playSvgProps={VIDEO_PLAYER_SVG_SIZE}
            pauseSvgProps={VIDEO_PLAYER_SVG_SIZE}
          />

          <Duration className={commonClasses.marginLeftTwelve} elapsed={played} duration={duration} />
        </div>

        <div className={classes.videoPlayerControlsListItem}>
          <Volume
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChangeVolume={onChangeVolume}
            onVolumeMute={onVolumeMuteToggle}
          />

          <SettingsMenu
            qualityList={qualityList}
            playbackRate={playbackRate}
            settingsMenu={settingsMenuKey}
            currentQuality={currentQuality}
            onBack={onSetDefaultSettingsMenu}
            onChangeQuality={onChangeQuality}
            onCloseSettings={onCloseSettings}
            onToggleSettingsMenu={onToggleSettingsMenu}
            onChangeSettingsMenu={onChangeSettingsMenu}
            onPlaybackRateChange={onPlaybackRateChange}
          />

          <FullScreenToggle
            isFullScreen={isFullScreen}
            onToggleFullScreen={onToggleFullScreen}
          />
        </div>
      </div>
    </div>
  );
};

export default Controls;
