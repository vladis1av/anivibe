import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ENotificationValueType, ENotificationKeyValueType } from '@interfaces/common';

import { AppState } from '@redux/store';

import getAppHydrate from '@utils/store/getAppHydrate';

type Notification = {
  type: ENotificationValueType;
  message: string;
  autoHideMs?: number;
};

type Notifications = Array<Notification>;

// type network | adblock
// isOpen
export type NotificationsState = {
  notifications: {
    [key in ENotificationKeyValueType]: Notifications;
  };
};

const initialState: NotificationsState = {
  notifications: {
    app: [],
  },
};

const HYDRATE = getAppHydrate();

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification: (
      state,
      {
        payload: {
          notificationKey,
          notification,
        },
      }: PayloadAction<{ notificationKey: ENotificationKeyValueType, notification: Notification }>,
    ) => {
      if (state.notifications[notificationKey].some((item) => item.type === notification.type)) {
        return;
      }
      state.notifications[notificationKey] = [...state.notifications[notificationKey], notification];
    },
    removeNotification: (
      state,
      {
        payload: {
          notificationKey,
          notificationType,
        },
      }: PayloadAction<{ notificationKey: ENotificationKeyValueType, notificationType: ENotificationValueType }>,
    ) => {
      state.notifications[notificationKey] = state.notifications[notificationKey]
        .filter(({ type }) => type !== notificationType);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action) => ({
        ...state,
        ...action.payload.notifications,
      }));
  },
});

export const { setNotification, removeNotification } = notificationsSlice.actions;

export const getNotifications = ({ notifications: { notifications } }: AppState) => notifications;

export const notificationsReducer = notificationsSlice.reducer;
