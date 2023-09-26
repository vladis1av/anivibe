import {
  FC, useRef, useEffect, useMemo,
} from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import clsx from 'clsx';

import { Player } from '@interfaces/anime';
import { VideoPlayerRef } from '@interfaces/common';
import { QueryType, VideoPlayerEpisodeQuery } from '@interfaces/query';

import { USER_ACTIVITY_EVENTS } from '@constants/common';

import useCheckUserActivity from '@hooks/useCheckUserActivity';
import useInterval from '@hooks/useInterval';
import useVideoPlayer from '@hooks/useVideoPlayer';

import useCommonStyles from '@styles/Common.styles';

import Playlist from './ui/Playlist';
import Screen from './ui/Screen';
import VideoPlayerStatus from './ui/VideoPlayerStatus';
import useVideoPlayerStyles from './VideoPlayer.styles';

const Controls = dynamic(() => import('./components/Controls'), { ssr: false });
const ReactPlayer = dynamic(() => import('./ReactPlayerWrapper'), { ssr: false });

type VideoPlayerProps = {
  player: Player;
};

const VideoPlayer: FC<VideoPlayerProps> = ({ player }) => {
  const { host, playlist } = player;
  const route = useRouter();
  const { query: { episode = '1' } } = route as unknown as QueryType<VideoPlayerEpisodeQuery>;
  const classes = useVideoPlayerStyles();
  const commonClasses = useCommonStyles();
  const videoPlayerRef = useRef<VideoPlayerRef | null>(null);
  const videoPlayerWrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctx = canvasRef.current?.getContext('2d');
  const internalPlayer = useMemo(() => videoPlayerRef.current?.getInternalPlayer(), [videoPlayerRef.current]);

  const onDrawAmbientImage = () => {
    if (!internalPlayer || !canvasRef.current) {
      return;
    }
    if (ctx) {
      ctx.drawImage(
        internalPlayer as CanvasImageSource,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height,
      );
    }
  };

  const {
    state: {
      status,
      volume,
      played,
      isError,
      isPaused,
      duration,
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
      ambientModeIsActive,
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

  const { hls, skips: { opening, ending } } = playlist[sourceIndex]
  ?? { hls: {}, skips: { opening: [], ending: [] }, serie: 0 };
  const playlistLength = playlist ? playlist.length : 0;
  const URL = hls[currentQuality] ? `https://${host}${hls[currentQuality]}` : undefined;

  useEffect(() => {
    onAutoQuality(hls);
  }, [hls, sourceIndex, playlist]);

  useEffect(() => {
    const currentEpisode = Number(episode);
    if (currentEpisode && currentEpisode >= 1) {
      // currentEpisode start from 0, query start form 1
      onChangeSource({ currentEpisode: currentEpisode - 1 });
    } else {
      onChangeSource({ currentEpisode });
    }
  }, [playlist, episode]);

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

  useEffect(() => {
    const internalPlayerIsReady = videoPlayerRef.current && internalPlayer;

    if (internalPlayerIsReady) {
      onDrawAmbientImage();
      internalPlayerIsReady.addEventListener('loadeddata', onDrawAmbientImage);
    }

    return () => {
      if (internalPlayerIsReady) {
        internalPlayerIsReady.removeEventListener('loadeddata', onDrawAmbientImage);
      }
    };
  }, [videoPlayerRef.current, ctx, internalPlayer, ambientModeIsActive]);

  useInterval(
    onDrawAmbientImage,
    ambientModeIsActive && isPlaying && !isFullScreen
      ? 1000 / 15
      : null, // runs at 15fps when video is playing, and stops when video is paused
  );

  return (
    <div
      tabIndex={0}
      ref={videoPlayerWrapperRef}
      onFocus={onVideoPlayerFocus}
      onBlur={onVideoPlayerBlure}
      className={
        clsx(classes.videoPlayerWrapper, {
          [classes.showVideoPlayerControls]: isError || Boolean(settingsMenu) || isPaused,
          [classes.showVideoPlayerControlsOnHover]: played,
          [classes.hideVideoPlayerControls]: isFullScreen && !controlsIsActive,
          [classes.videoPlayerFullScreen]: isFullScreen,
        })}
    >
      {
        <div className={
          clsx(
            classes.ambientWrapper,
            commonClasses.displayHide,
            { [commonClasses.displayShow]: ambientModeIsActive },
          )
        }>
          <canvas
            id="canvas"
            ref={canvasRef}
            className={classes.ambientCanvas}
          />
        </div>
      }

      <ReactPlayer
        width="100%"
        height="auto"
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
        onError={(_, data) => {
          if (data?.fatal) {
            onError();
          }
        }}
        style={{
          top: 0,
          left: 0,
          borderRadius: 8,
          display: 'flex',
          zIndex: 2,
          overflow: 'hidden',
          position: 'absolute', // не хочет во время смены темы сохранять стили, пускай пока что так тогда
        }}
        config={{
          file: {
            forceHLS: true,
          },
        }}
      />

      <VideoPlayerStatus status={status} onPlay={onTogglePlay} playedSeconds={playedSeconds} />

      <Playlist
        playlist={playlist}
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
