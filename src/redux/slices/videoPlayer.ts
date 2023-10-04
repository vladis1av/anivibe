import { FocusEvent } from 'react';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EVideoPlayerMenuType, EVideoPlayerStatusType } from '@interfaces/common';
import { EHlsQualityType, HlsQuality } from '@interfaces/hls';

import { EHlsQualityKey, EVideoPlayerMenu, EVideoPlayerStatus } from '@enums/enums';

import { AppState } from '@redux/store';

import entries from '@utils/entries';
import numberAfterDecimal from '@utils/numberAfterDecimal';

export type SetSourceActionProps = {
  currentEpisode: number;
  play?: boolean;
};

export type VideoPlayerState = {
  status: EVideoPlayerStatusType,
  sourceIndex: number;
  cinematicIsActive: boolean;
  isFullScreen: boolean;
  currentQuality: EHlsQualityType;
  settingsMenu: EVideoPlayerMenuType | null;
  controlsIsActive: boolean;
  playerIsFocused: boolean;
  playbackRate: number;
  duration: number;
  loaded: number;
  loadedSeconds: number;
  played: number;
  playedSeconds: number;
  prevPlayedSeconds: number;
  volume: number;
  prevVolume: number;
};

const initialState: VideoPlayerState = {
  status: EVideoPlayerStatus.idle,
  sourceIndex: 0,
  cinematicIsActive: true,
  isFullScreen: false,
  currentQuality: EHlsQualityKey.fhd,
  settingsMenu: null,
  controlsIsActive: true,
  playerIsFocused: false,
  playbackRate: 1.0,
  duration: 0,
  loaded: 0,
  loadedSeconds: 0,
  played: 0,
  playedSeconds: 0,
  prevPlayedSeconds: 0,
  volume: 1.0,
  prevVolume: 1,
};

export const videoPlayerSlice = createSlice({
  name: 'videoPlayer',
  initialState,
  reducers: {
    setVideoPlayerState: (state, { payload }: PayloadAction<Partial<VideoPlayerState>>) => ({ ...state, ...payload }),
    setPlaybackRate: (state, { payload }: PayloadAction<string>) => {
      state.playbackRate = parseFloat(payload);
      state.settingsMenu = null;
    },
    toggleAmbientMode: (state) => {
      if (state.cinematicIsActive) {
        return { ...state, cinematicIsActive: false };
      }
      return { ...state, cinematicIsActive: true };
    },
    setFocus: (state, { payload }: PayloadAction<FocusEvent<HTMLDivElement, Element>>) => {
      if (payload.currentTarget === payload.target) {
        state.playerIsFocused = true;
      }
      state.controlsIsActive = false;
    },
    setSource: (state, { payload }: PayloadAction<SetSourceActionProps>) => {
      const { currentEpisode, play = false } = payload;
      state.played = 0;
      state.duration = 0;
      state.playedSeconds = 0;
      state.prevPlayedSeconds = 0;
      state.loadedSeconds = 0;
      state.loaded = 0;
      state.sourceIndex = currentEpisode;

      if (play) {
        state.status = EVideoPlayerStatus.playing;
        return;
      }

      state.status = EVideoPlayerStatus.idle;
    },
    toggleSettingsMenu: (state) => {
      const settingsMenuIsOpen = state.settingsMenu;

      if (!settingsMenuIsOpen) {
        state.settingsMenu = EVideoPlayerMenu.default;
        return;
      }

      state.settingsMenu = null;
    },
    togglePlay: (state) => {
      switch (state.status) {
        case EVideoPlayerStatus.error:
          return;
        case EVideoPlayerStatus.playing:
          state.status = EVideoPlayerStatus.pause;
          return;
        case EVideoPlayerStatus.idle:
        case EVideoPlayerStatus.pause:
          state.status = EVideoPlayerStatus.playing;
          return;
        case EVideoPlayerStatus.loading:
          state.status = EVideoPlayerStatus.pause;
          return;
        default:
          state.status = EVideoPlayerStatus.idle;
      }
    },
    setAutoQuality: (state, { payload }: PayloadAction<HlsQuality>) => {
      const qualityList = entries(payload);
      const qualityListLength = qualityList.length;

      if (!qualityListLength) {
        state.status = EVideoPlayerStatus.error;
        return;
      }

      for (let i = 0; i < qualityListLength; i++) {
        const [key, value] = qualityList[i];

        if (!value && i + 1 === qualityListLength) {
          state.status = EVideoPlayerStatus.error;
          break;
        }

        if (value) {
          state.currentQuality = key;
          break;
        }
      }
    },
    volumeToggle: (state) => {
      const currentVolume = state.volume;
      if (currentVolume || numberAfterDecimal(currentVolume)) {
        state.prevVolume = currentVolume;
        state.volume = 0;
        return;
      }
      state.volume = state.prevVolume;
    },
    setVolumeByStep: (state, { payload }: PayloadAction<boolean>) => {
      const currentVolume = state.volume;
      const volumeRes = payload ? currentVolume + 0.1 : currentVolume - 0.1;

      if (payload) {
        if (currentVolume === 1) return; // range 0.0-1.0, step 0.1

        state.volume = Number(volumeRes.toFixed(2));
        state.prevVolume = currentVolume;
        return;
      }
      // if volume === 0
      if (!currentVolume) return;
      state.volume = Number(volumeRes.toFixed(2));
    },
  },
});

export const {
  setVideoPlayerState,
  setPlaybackRate,
  toggleAmbientMode,
  setFocus,
  setSource,
  toggleSettingsMenu,
  togglePlay,
  setAutoQuality,
  volumeToggle,
  setVolumeByStep,
} = videoPlayerSlice.actions;

export const selectVideoPlayer = ({ videoPlayer }: AppState) => videoPlayer;

export const videoPlayerReducer = videoPlayerSlice.reducer;
