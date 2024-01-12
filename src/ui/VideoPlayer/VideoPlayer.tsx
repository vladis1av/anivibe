import {
  FC, useRef, useEffect,
} from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import clsx from 'clsx';

import { Player } from '@interfaces/anime';
import { VideoPlayerRef } from '@interfaces/common';
import { QueryType, VideoPlayerEpisodeQuery } from '@interfaces/query';

import { EColor } from '@enums/enums';

import { USER_ACTIVITY_EVENTS } from '@constants/common';

import useCheckUserActivity from '@hooks/useCheckUserActivity';
import useVideoPlayer from '@hooks/useVideoPlayer';

import useCommonStyles from '@styles/Common.styles';

import Cinematic from './ui/Cinematic';
import Playlist from './ui/Playlist';
import Screen from './ui/Screen';
import VideoPlayerStatus from './ui/VideoPlayerStatus';
import useVideoPlayerStyles from './VideoPlayer.styles';

const Controls = dynamic(() => import('./components/Controls'), { ssr: false });
const ReactPlayer = dynamic(() => import('./ReactPlayerWrapper'), { ssr: false });
const ambientModeFPS = 10;

type VideoPlayerProps = {
  player: Player;
};

const VideoPlayer: FC<VideoPlayerProps> = ({ player }) => {
  const { host, list } = player;
  const route = useRouter();
  const { query: { episode = '1' } } = route as unknown as QueryType<VideoPlayerEpisodeQuery>;
  const classes = useVideoPlayerStyles();
  const commonClasses = useCommonStyles();
  const videoPlayerRef = useRef<VideoPlayerRef | null>(null);
  const videoPlayerWrapperRef = useRef<HTMLDivElement | null>(null);
  const {
    state: {
      status,
      volume,
      played,
      isError,
      isPaused,
      duration,
      isLoading,
      isPlaying,
      screenfull,
      sourceIndex,
      isFullScreen,
      playbackRate,
      settingsMenu,
      playedSeconds,
      currentQuality,
      playerIsFocused,
      controlsIsActive,
      cinematicIsActive,
    },
    actions: {
      onError,
      onReady,
      onActive,
      onInactive,
      onSetBuffer,
      onTogglePlay,
      onAutoQuality,
      onChangeSource,
      onChangeDuration,
      onChangeProgress,
      onToggleFullScreen,
      onChangeFullScreen,
      onVideoPlayerFocus,
      onVideoPlayerBlure,
      onPlaybackRateChange,
      onVideoPlayerKeydown,
    },
  } = useVideoPlayer(videoPlayerRef, videoPlayerWrapperRef);

  const { hls, skips: { opening, ending } } = list[sourceIndex]
  ?? { hls: {}, skips: { opening: [], ending: [] }, serie: 0 };
  const playlistLength = list ? list.length : 0;
  const URL = hls[currentQuality] ? `https://${host}${hls[currentQuality]}` : undefined;

  useEffect(() => {
    onAutoQuality(hls);
  }, [hls, sourceIndex, list]);

  useEffect(() => {
    const currentEpisode = Number(episode);
    if (currentEpisode && currentEpisode >= 1) {
      // currentEpisode start from 0, query start form 1
      onChangeSource({ currentEpisode: currentEpisode - 1 });
    } else {
      onChangeSource({ currentEpisode });
    }
  }, [list, episode]);

  useCheckUserActivity({
    onActive,
    onInactive,
    maxInactivitySeconds: 3,
    watchers: [controlsIsActive],
    conditionOnStart: isFullScreen,
    activityEvents: USER_ACTIVITY_EVENTS,
  });

  useEffect(() => {
    document.addEventListener('keydown', onVideoPlayerKeydown, true);
    screenfull.on('change', onChangeFullScreen);

    return () => {
      document.removeEventListener('keydown', onVideoPlayerKeydown, true);
      screenfull.off('change', onChangeFullScreen);
    };
  }, [screenfull, playerIsFocused, volume, duration, playedSeconds, status, videoPlayerRef.current]);

  return (
    <div
      tabIndex={0}
      ref={videoPlayerWrapperRef}
      onFocus={onVideoPlayerFocus}
      onBlur={onVideoPlayerBlure}
      className={
        clsx(classes.videoPlayerWrapper, {
          [classes.videoPlayerAspectRatio]: !isFullScreen,
          [classes.showVideoPlayerControls]: isError || Boolean(settingsMenu) || isPaused || isLoading,
          [classes.showVideoPlayerControlsOnHover]: played,
          [classes.hideVideoPlayerControls]: isFullScreen && !controlsIsActive,
          [classes.videoPlayerFullScreen]: isFullScreen,
        })}
    >
      <Cinematic
        fps={ambientModeFPS}
        isPlaying={isPlaying}
        isFullScreen={isFullScreen}
        isActive={cinematicIsActive}
        videoPlayerRef={videoPlayerRef}
      />

      <ReactPlayer
        width="100%"
        height="100%"
        volume={volume}
        controls={false}
        onReady={onReady}
        id="video-player"
        playing={isPlaying}
        onBuffer={onSetBuffer}
        key={URL}
        onBufferEnd={onSetBuffer}
        playerref={videoPlayerRef}
        playbackRate={playbackRate}
        onDuration={onChangeDuration}
        onProgress={onChangeProgress}
        onPlaybackRateChange={onPlaybackRateChange}
        url={URL}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          borderRadius: 8,
          display: 'flex',
          zIndex: 2,
          overflow: 'hidden',
          backgroundColor: EColor.defaultBlack,
        }}
        onError={(_, data) => {
          if (data && data.fatal) {
            onError();
          }
        }}
        config={{
          file: {
            forceHLS: true,
          },
        }}
      />

      <VideoPlayerStatus status={status} onPlay={onTogglePlay} playedSeconds={playedSeconds} />

      <Playlist
        playlist={list}
        sourceIndex={sourceIndex}
        onChangeSource={onChangeSource}
        className={clsx(classes.videoPlayerPlaylistWrapper, { [commonClasses.hide]: isPlaying })}
      />

      <Screen onToggleFullScreen={onToggleFullScreen} onTogglePlay={onTogglePlay} />

      <Controls
        className={classes.videoPlayerControls}
        videoPlayerRef={videoPlayerRef}
        opening={opening}
        playlistLength={playlistLength}
        ending={ending}
        videoPlayerWrapperRef={videoPlayerWrapperRef}
        qualityList={hls}
      />
    </div>
  );
};

export default VideoPlayer;
