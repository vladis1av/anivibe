import { FocusEvent, RefObject } from 'react';

import screenfull from 'screenfull';

import {
  EVideoPlayerMenuType, EVideoPlayerStatusType, VideoPlayerProgressType, VideoPlayerRef,
} from '@interfaces/common';
import { EHlsQualityType, HlsQuality } from '@interfaces/hls';

import { EVideoPlayerMenu, EVideoPlayerStatus } from '@enums/enums';

import {
  selectVideoPlayer,
  setAutoQuality,
  setPlaybackRate,
  setSource,
  SetSourceActionProps,
  setTogglePlay,
  setToggleSettingsMenu,
  setVideoPlayerState,
  setVolumeByStep,
  setVolumeToggle,
} from '@redux/slices/videoPlayer';

import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

const useVideoPlayer = (
  videoPlayerRef?: RefObject<VideoPlayerRef>,
  videoPlayerWrapperRef?: RefObject<HTMLDivElement>,
) => {
  const state = useAppSelector(selectVideoPlayer);
  const dispatch = useAppDispatch();
  const {
    status,
    playedSeconds,
    prevPlayedSeconds,
    duration,
    playerIsFocused,
    settingsMenu,
    controlsIsActive,
  } = state;
  // с status === EVideoPlayerStatus.loading лучше работает буферизация, хз почему
  const isPlaying = status === EVideoPlayerStatus.playing || status === EVideoPlayerStatus.loading;

  const onChangeStatus = (
    loadingStatus: EVideoPlayerStatusType,
  ) => dispatch(setVideoPlayerState({ status: loadingStatus }));

  const onChangeSettingsMenu = (
    menuKey: EVideoPlayerMenuType,
  ) => dispatch(setVideoPlayerState({ settingsMenu: menuKey }));

  const onVolumeMuteToggle = () => dispatch(setVolumeToggle());

  const onToggleSettingsMenu = () => dispatch(setToggleSettingsMenu());

  const onPlaybackRateChange = (speed: string) => dispatch(setPlaybackRate(speed));

  const onChangeSource = (source: SetSourceActionProps) => dispatch(setSource(source));

  const onAutoQuality = (qualityList: HlsQuality) => dispatch(setAutoQuality(qualityList));

  const onError = () => dispatch(setVideoPlayerState({ status: EVideoPlayerStatus.error }));

  const onChangeVolumeByStep = (volumeIsUp: boolean) => dispatch(setVolumeByStep(volumeIsUp));

  const onChangeVolume = (currentVolume: number) => dispatch(setVideoPlayerState({ volume: currentVolume }));

  const onSetDefaultSettingsMenu = () => dispatch(setVideoPlayerState({ settingsMenu: EVideoPlayerMenu.default }));

  const onChangeProgress = (progressState: VideoPlayerProgressType) => dispatch(setVideoPlayerState(progressState));

  const onChangeDuration = (currentDuration: number) => dispatch(setVideoPlayerState({ duration: currentDuration }));

  const onActive = () => {
    if (!controlsIsActive) {
      dispatch(setVideoPlayerState({ controlsIsActive: true }));
    }
  };

  const onInactive = () => {
    if (controlsIsActive) {
      dispatch(setVideoPlayerState({ controlsIsActive: false, settingsMenu: null }));
    }
  };

  const onTogglePlay = async () => {
    if (videoPlayerWrapperRef && videoPlayerWrapperRef.current && !state.playerIsFocused) {
      videoPlayerWrapperRef.current.focus();
    }
    await dispatch(setTogglePlay());
  };

  const onCloseSettings = () => {
    if (settingsMenu) {
      dispatch(setVideoPlayerState({ settingsMenu: null }));
    }
  };

  const onToggleFullScreen = () => {
    if (videoPlayerWrapperRef && videoPlayerWrapperRef.current && screenfull.isEnabled) {
      if (screenfull.isFullscreen) {
        screenfull.exit();
      } else {
        screenfull.request(videoPlayerWrapperRef.current);
      }
    }
  };

  const onChangeFullScreen = () => {
    dispatch(setVideoPlayerState({ isFullScreen: screenfull.isFullscreen }));

    if (videoPlayerWrapperRef && videoPlayerWrapperRef.current) {
      videoPlayerWrapperRef.current.scrollIntoView({ block: 'center' });
    }
  };

  const onChangeProgressSeconds = (progressSeconds: number) => {
    if (videoPlayerRef && videoPlayerRef.current) {
      videoPlayerRef.current.seekTo(progressSeconds);
    }
  };

  const onReady = () => {
    if (status !== 'idle' && prevPlayedSeconds) {
      dispatch(setVideoPlayerState({ playedSeconds: prevPlayedSeconds }));
      onChangeProgressSeconds(prevPlayedSeconds);
    }
  };

  const onChangeQuality = (qualityKey: EHlsQualityType) => dispatch(setVideoPlayerState({
    prevPlayedSeconds: playedSeconds,
    currentQuality: qualityKey,
    status: EVideoPlayerStatus.playing,
    settingsMenu: null,
  }));

  const onSetBuffer = (buffer?: { type: 'waiting' | 'playing'; isTrusted: boolean; }) => {
    if (buffer && buffer.isTrusted) {
      if (buffer.type === 'waiting') {
        onChangeStatus(EVideoPlayerStatus.loading);
      } else {
        onChangeStatus(EVideoPlayerStatus.playing);
      }
    }
  };

  const onSetVideoPlayerFocus = (evt: FocusEvent<HTMLDivElement, Element>, focusOut?: boolean) => {
    if (evt.currentTarget === evt.target) {
      if (focusOut) {
        dispatch(setVideoPlayerState({ playerIsFocused: false }));
        return;
      }
      if (playerIsFocused) return;
      dispatch(setVideoPlayerState({ playerIsFocused: true }));
    }
  };

  const onVideoPlayerBlure = (evt: FocusEvent<HTMLDivElement, Element>) => onSetVideoPlayerFocus(evt, true);
  const onVideoPlayerFocus = (evt: FocusEvent<HTMLDivElement, Element>) => onSetVideoPlayerFocus(evt);

  const onVideoPlayerKeydown = (evt: KeyboardEvent) => {
    if (playerIsFocused) {
      evt.preventDefault();
      switch (evt.key) {
        case 'ArrowUp':
          onChangeVolumeByStep(true);
          return;
        case 'ArrowDown':
          onChangeVolumeByStep(false);
          return;
        case 'ArrowLeft': {
          const reducedSeconds = playedSeconds - 10;

          if (!playedSeconds || reducedSeconds < 0) {
            onChangeProgressSeconds(0);
            return;
          }

          onChangeProgressSeconds(reducedSeconds);
          return;
        }
        case 'ArrowRight': {
          const extendedSeconds = Number(playedSeconds.toFixed(2)) + 10;

          if (extendedSeconds > duration) {
            onChangeProgressSeconds(duration);
            return;
          }

          onChangeProgressSeconds(extendedSeconds);
        }
          return;
        case 'Spacebar':
        case ' ':
          onTogglePlay();
          // no default
      }
    }
  };

  return ({
    state: { ...state, isPlaying, screenfull },
    actions: {
      onChangeStatus,
      onVolumeMuteToggle,
      onChangeSettingsMenu,
      onToggleSettingsMenu,
      onPlaybackRateChange,
      onCloseSettings,
      onChangeSource,
      onAutoQuality,
      onError,
      onSetBuffer,
      onChangeVolumeByStep,
      onChangeProgress,
      onChangeVolume,
      onSetDefaultSettingsMenu,
      onChangeDuration,
      onReady,
      onActive,
      onInactive,
      onTogglePlay,
      onToggleFullScreen,
      onChangeFullScreen,
      onChangeProgressSeconds,
      onChangeQuality,
      onVideoPlayerFocus,
      onVideoPlayerBlure,
      onVideoPlayerKeydown,
    },
  });
};

export default useVideoPlayer;
