import { FC } from 'react';

import clsx from 'clsx';

import { ENotification, ENotificationKey } from '@enums/enums';

import { getNotifications, removeNotification } from '@redux/slices/notifications';

import Snackbar from '@ui/Snackbar';

import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';

import useTopHeaderNotificationStyles from './TopHeaderNotification.styles';

const TopHeaderNotification: FC = () => {
  const classes = useTopHeaderNotificationStyles();
  const { app } = useAppSelector(getNotifications);
  const dispatch = useAppDispatch();

  const currentClasses = {
    [ENotification.adblock]: classes.adblock,
    [ENotification.networkOnline]: classes.networkOnline,
    [ENotification.networkOffline]: classes.networkOffline,
  };

  return (
    <>
      {
        app.length > 0 && app.map(({ type, autoHideMs, message }) => <Snackbar
          isOpen={Boolean(type)}
          onClose={
            () => dispatch(removeNotification({ notificationKey: ENotificationKey.app, notificationType: type }))
          }
          autoHideDurationMs={autoHideMs}
          message={message}
          className={clsx(
            classes.topHeaderNotification,
            currentClasses[type],
            { [classes.topHeaderNotificationStatic]: type },
          )}
        />)
      }
    </>
  );
};

export default TopHeaderNotification;
