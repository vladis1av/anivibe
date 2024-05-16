import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from '@redux/store';

export type LocalAppState = {
  isAdultContent: boolean;
  adultTitleName: string;
};

const initialState: LocalAppState = {
  isAdultContent: false,
  adultTitleName: '',
};

export const AppSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsAdultContent: (
      state,
      { payload }: PayloadAction<{ isAdultContent: boolean, adultTitleName: string; }>,
    ) => {
      state.isAdultContent = payload.isAdultContent;
      state.adultTitleName = payload.adultTitleName;
    },
  },
});

export const { setIsAdultContent } = AppSlice.actions;

export const getApp = ({ app }: AppState) => app;

export const AppReducer = AppSlice.reducer;
