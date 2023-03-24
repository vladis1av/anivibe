import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from '@redux/store';

export type OverlayState = {
  overlay: boolean;
};

const initialState: OverlayState = {
  overlay: false,
};

export const overlaySlice = createSlice({
  name: 'overlay',
  initialState,
  reducers: {
    setOverlayVisible: (
      state,
      { payload }: PayloadAction<boolean>,
    ) => {
      state.overlay = payload;
    },
  },
});

export const { setOverlayVisible } = overlaySlice.actions;

export const getOverlay = ({ overlay: { overlay } }: AppState) => overlay;

export const overlayReducer = overlaySlice.reducer;
