import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { IS_DEV } from '@constants/common';

import { AppReducer } from './slices/app';
import { filterDataReducer } from './slices/filteredData';
import { filtersReducer } from './slices/filters';
import { notificationsReducer } from './slices/notifications';
import { overlayReducer } from './slices/overlay';
import { readerReducer } from './slices/reader';
import { searchByTypeReducer } from './slices/searchByType';
import { themeReducer } from './slices/theme';
import { videoPlayerReducer } from './slices/videoPlayer';

export function makeStore() {
  return configureStore({
    reducer: {
      app: AppReducer,
      theme: themeReducer,
      reader: readerReducer,
      overlay: overlayReducer,
      filters: filtersReducer,
      filteredData: filterDataReducer,
      videoPlayer: videoPlayerReducer,
      searchByType: searchByTypeReducer,
      notifications: notificationsReducer,
    },
    devTools: IS_DEV,
  });
}

export const store = makeStore();
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = typeof store.dispatch;
export type ReduxThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;

export const nextReduxWrapper = createWrapper<AppStore>(makeStore, { debug: IS_DEV });
