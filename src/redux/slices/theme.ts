import { Theme } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setCookie } from 'cookies-next';

import { EThemeType } from '@interfaces/theme';

import { ETheme } from '@enums/enums';

import { THEME_FROM_STORAGE } from '@constants/common';

import { AppState } from '@redux/store';

import getAppHydrate from '@utils/store/getAppHydrate';

import { themes } from '@styles/Theme';

// не храню тему внутри стейта потому что вылезает какая то ебнутая ошибка mui.nested
export type ThemeState = {
  theme: EThemeType;
};

export type SetThemeActionType = {
  themeIsLight: boolean;
  updateCookie?: boolean;
  updateLocalStorage?: boolean;
};

const initialState: ThemeState = {
  theme: ETheme.light,
};
const HYDRATE = getAppHydrate();

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (
      state,
      { payload }: PayloadAction<EThemeType>,
    ) => {
      state.theme = payload;
    },
    toggleTheme: (
      state,
      { payload: { themeIsLight, updateCookie, updateLocalStorage } }: PayloadAction<SetThemeActionType>,
    ) => {
      const currentTheme = themeIsLight ? ETheme.dark : ETheme.light;

      state.theme = currentTheme;

      if (updateCookie) {
        setCookie(THEME_FROM_STORAGE, currentTheme, { maxAge: 31536000 });
      }

      if (updateLocalStorage) {
        window.localStorage.setItem(THEME_FROM_STORAGE, currentTheme);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action) => ({
        ...state,
        ...action.payload.theme,
      }));
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export const getThemeState = ({ theme: { theme } }: AppState) => theme;

export const getThemeIsLight = ({ theme: { theme } }: AppState): boolean => theme === ETheme.light;

export const getCurrentThemeStyle = ({ theme: { theme } }: AppState): Theme => themes[theme];

export const themeReducer = themeSlice.reducer;
