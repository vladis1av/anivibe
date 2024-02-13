import { FC } from 'react';

import clsx from 'clsx';

import { ENotification, ENotificationKey, EPosition } from '@enums/enums';

import { getNotifications, removeNotification } from '@redux/slices/notifications';

import Snackbar from '@ui/Snackbar';

import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';

import useTopHeaderNotificationStyles from './TopHeaderNotification.styles';

const TopHeaderNotification: FC = () => {
  const classes = useTopHeaderNotificationStyles();
  const { app } = useAppSelector(getNotifications);
  const dispatch = useAppDispatch();

  return (
    <>
      {
        app.length > 0
        && app.map(({
          type,
          autoHideMs,
          message,
        }) => (type === ENotification.adblock
          || type === ENotification.networkOffline
          || type === ENotification.networkOnline ? (
            <Snackbar
              isStatic
              key={type}
              message={message}
              position={EPosition.topCenter}
              autoHideDurationMs={autoHideMs}
              className={clsx(classes.topHeaderNotification, classes[type])}
              showCloseButton={type !== ENotification.networkOnline && type !== ENotification.networkOffline}
              onClose={
                () => dispatch(removeNotification({ notificationKey: ENotificationKey.app, notificationType: type }))
              }
            />
          ) : null))
      }
    </>
  );
};

export default TopHeaderNotification;
