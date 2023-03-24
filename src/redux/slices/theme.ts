import { Theme } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EThemeType } from '@interfaces/theme';

import { ETheme } from '@enums/enums';

import { THEME_FROM_LOCAL_STORAGE } from '@constants/common';

import { AppState } from '@redux/store';

import { themes } from '@styles/Theme';

// не храню тему внутри стейта потому что вылезает какая то ебнутая ошибка mui.nested
export type ThemeState = {
  theme: EThemeType;
};

export type SetThemeActionType = {
  themeIsLight: boolean;
  wantUpdateLocalStorage?: boolean;
};

const initialState: ThemeState = {
  theme: ETheme.light,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (
      state,
      { payload: { themeIsLight, wantUpdateLocalStorage } }: PayloadAction<SetThemeActionType>,
    ) => {
      if (themeIsLight) {
        state.theme = ETheme.dark;
      } else {
        state.theme = ETheme.light;
      }

      if (wantUpdateLocalStorage) {
        window.localStorage.setItem(THEME_FROM_LOCAL_STORAGE, state.theme);
      }
    },
  },
});

export const { setTheme } = themeSlice.actions;

export const getThemeState = ({ theme: { theme } }: AppState) => theme;

export const getThemeIsLight = ({ theme: { theme } }: AppState): boolean => theme === ETheme.light;

export const getCurrentThemeStyle = ({ theme: { theme } }: AppState): Theme => themes[theme];

export const themeReducer = themeSlice.reducer;
