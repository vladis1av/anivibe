import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ENotificationValueType, ENotificationKeyValueType } from '@interfaces/common';

import { AppState } from '@redux/store';

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
      state.notifications[notificationKey].push(notification);
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
      const currentNotifications = state.notifications[notificationKey];

      state.notifications[notificationKey] = currentNotifications.filter(({ type }) => type !== notificationType);
    },
  },
});

export const { setNotification, removeNotification } = notificationsSlice.actions;

export const getNotifications = ({ notifications: { notifications } }: AppState) => notifications;

export const notificationsReducer = notificationsSlice.reducer;
