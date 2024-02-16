import { FC, ReactNode } from 'react';

import Script from 'next/script';

import NextNProgress from 'nextjs-progressbar';

import {
  ENotification,
  ENotificationKey,
} from '@enums/enums';

import { ADBLOCK_NOTIFICATION_MESSAGE } from '@constants/common';
import {
  NEXT_N_PROGGRESS_COLOR,
  NEXT_N_PROGGRESS_HEIGHT,
  NEXT_N_PROGGRESS_STOP_DELAY_MS,
  NEXT_N_PROGGRESS_START_POSITION,
} from '@constants/nextNproggress';

import {
  setNotification,
} from '@redux/slices/notifications';
import { getOverlay } from '@redux/slices/overlay';

import Overlay from '@ui/Overlay';

import HeaderContextProvider from '@components/Header/HeaderContext';
import Notification from '@components/Notification';

import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';

type MainLayout = {
  children: ReactNode;
};

const RootLayout: FC<MainLayout> = ({ children }) => {
  const overlayIsOpen = useAppSelector(getOverlay);
  const dispatch = useAppDispatch();

  const onError = (e: any) => {
    console.error('load ads-async.js error:', e);
    dispatch(setNotification({
      notification: { message: ADBLOCK_NOTIFICATION_MESSAGE, type: ENotification.adblock, autoHideMs: 30000 },
      notificationKey: ENotificationKey.app,
    }));
  };

  const onLoad = () => {
    console.info('ads-async.js loaded');
  };

  return (
    <>
      <Overlay overlayIsOpen={overlayIsOpen} />

      <NextNProgress
        color={NEXT_N_PROGGRESS_COLOR}
        startPosition={NEXT_N_PROGGRESS_START_POSITION}
        height={NEXT_N_PROGGRESS_HEIGHT}
        stopDelayMs={NEXT_N_PROGGRESS_STOP_DELAY_MS}
        options={{ showSpinner: false }}
      />

      <Script
        async
        src="https://yandex.ru/ads/system/context.js"
        strategy="afterInteractive"
        onError={onError}
        onLoad={onLoad}
      />
      {
        /*
          My header has dynamic height
          Getting header height for absolute, fixed or sticky position elements and calculate their position
        */
      }
      <HeaderContextProvider >
        <Notification />

        {children}
      </HeaderContextProvider>
    </>
  );
};

export default RootLayout;
