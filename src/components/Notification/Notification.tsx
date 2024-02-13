import { FC } from 'react';

import { ENotification, ENotificationKey, EPosition } from '@enums/enums';

import { getNotifications, removeNotification } from '@redux/slices/notifications';

import Snackbar from '@ui/Snackbar';
import SnackbarContainer from '@ui/SnackbarContainer';

import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import useHeaderContext from '@hooks/useHeaderContext';

import useNotificationStyles from './Notification.styles';

const Notification: FC = () => {
  const headerHeight = useHeaderContext();
  const classes = useNotificationStyles(headerHeight)();
  const { app } = useAppSelector(getNotifications);
  const dispatch = useAppDispatch();

  return (
    <SnackbarContainer contanerClassName={classes.snackbarNotification} position="topLeft">
      {
        app.length > 0
            && app.map(({
              type,
              message,
              autoHideMs,
            }) => (type !== ENotification.networkOnline
               && type !== ENotification.networkOffline
               && type !== ENotification.adblock ? (
                <Snackbar
                  key={type}
                  isStatic
                  showCloseButton
                  message={message}
                  position={EPosition.topLeft}
                  autoHideDurationMs={autoHideMs}
                  onClose={
                    () => dispatch(removeNotification({
                      notificationKey: ENotificationKey.app,
                      notificationType: type,
                    }))
                  }
                />
              ) : null))
      }
    </SnackbarContainer>
  );
};

export default Notification;
