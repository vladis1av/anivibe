import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EPageSwitchingAreaValueType, EReadingModeValueType } from '@interfaces/common';
import { MangaWithPages } from '@interfaces/manga/manga';

import { EPageSwitchingArea, EReadingMode } from '@enums/enums';

import { READER_FROM_STORAGE } from '@constants/common';

import { AppState } from '@redux/store';

import getAppHydrate from '@utils/store/getAppHydrate';

export type ReaderSettingsType = {
  server: number;
  preLoadImages: boolean;
  pageSwitchingArea: EPageSwitchingAreaValueType;
  readingMode: EReadingModeValueType;
};

export type ReaderSettingsTypeKey = keyof ReaderSettingsType;
export type PartialReaderSettingsType = Partial<ReaderSettingsType>;
export type PartialReaderStateType = Partial<ReaderState>;

export type ReaderState = {
  page: number;
  manga: MangaWithPages | null;
  menuIsOpen: boolean;
  settingsIsOpen: boolean;
  imagesCacheStep: number;
  settings: ReaderSettingsType
};

const defaultReaderSettings: ReaderSettingsType = {
  server: 1,
  readingMode: EReadingMode.horizontal,
  preLoadImages: true,
  pageSwitchingArea: EPageSwitchingArea.image,
};

const initialState: ReaderState = {
  page: 1,
  manga: null,
  menuIsOpen: false,
  settingsIsOpen: false,
  imagesCacheStep: 1,
  settings: defaultReaderSettings,
};

const HYDRATE = getAppHydrate();

export const readerSlice = createSlice({
  name: 'reader',
  initialState,
  reducers: {
    setReaderState: (state, { payload }: PayloadAction<PartialReaderStateType>) => ({ ...state, ...payload }),
    setReaderSettings: (
      state,
      { payload }: PayloadAction<{ settings: PartialReaderSettingsType, updateCookie?: boolean }>,
    ) => {
      const { settings, updateCookie } = payload;
      const currentSettings = { ...state.settings, ...settings };

      if (updateCookie) {
        const objectString = JSON.stringify(currentSettings);
        document.cookie = `${READER_FROM_STORAGE}=${objectString}; path=/; max-age=31536000`;
      }

      return ({ ...state, settings: currentSettings });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action) => ({
        ...state,
        ...action.payload.reader,
      }));
  },
});

export const { setReaderState, setReaderSettings } = readerSlice.actions;

export const getReaderState = ({ reader }: AppState) => reader;

export const readerReducer = readerSlice.reducer;
