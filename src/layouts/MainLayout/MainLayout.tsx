import {
  ReactNode, FC, useRef,
} from 'react';

import Script from 'next/script';

import clsx from 'clsx';
import NextNProgress from 'nextjs-progressbar';

import { ENotification, ENotificationKey } from '@enums/enums';

import { ADBLOCK_NOTIFICATION_MESSAGE } from '@constants/common';
import {
  NEXT_N_PROGGRESS_COLOR,
  NEXT_N_PROGGRESS_START_POSITION,
  NEXT_N_PROGGRESS_STOP_DELAY_MS,
  NEXT_N_PROGGRESS_HEIGHT,
} from '@constants/nextNproggress';

import { setNotification } from '@redux/slices/notifications';
import { getOverlay } from '@redux/slices/overlay';

import Overlay from '@ui/Overlay';

import Header from '@components/Header';
import HeaderContextProvider from '@components/Header/HeaderContext';

import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';

import useMainLayoutStyles from './MainLayout.styles';

type MainLayoutProps = {
  children: ReactNode;
  className?: string;
  full?: boolean;
  fullHeight?: boolean;
  paddings?: boolean;
  clearPaddingTop?: boolean;
};

const MainLayout: FC<MainLayoutProps> = ({
  children,
  className,
  full,
  fullHeight,
  paddings,
  clearPaddingTop,
}) => {
  const classes = useMainLayoutStyles();
  const overlayIsOpen = useAppSelector(getOverlay);
  const dispatch = useAppDispatch();
  const headerRef = useRef<HTMLElement>(null);

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
        src="https://ad.mail.ru/static/ads-async.js"
        strategy="afterInteractive"
        onError={(e) => {
          console.error('load ads-async.js error:', e);

          dispatch(setNotification({
            notification: { message: ADBLOCK_NOTIFICATION_MESSAGE, type: ENotification.adblock },
            notificationKey: ENotificationKey.app,
          }));
        }}
        onLoad={() => {
          console.log('ads-async.js loaded');
        }}
      />

      <div>
        <Header headerRef={headerRef} />

        <main
          className={clsx(classes.wrapper, className, {
            [classes.full]: full,
            [classes.fullHeight]: fullHeight,
            [classes.paddings]: paddings,
            [classes.clearPaddingTop]: clearPaddingTop,
          })}
        >
          {
            /*
              My header has dynamic height
              Getting header height for absolute, fixed or sticky position elements and calculate their position
            */
          }
          <HeaderContextProvider headerRef={headerRef}>
            {children}
          </HeaderContextProvider>
        </main>
      </div>
    </>
  );
};

export default MainLayout;
