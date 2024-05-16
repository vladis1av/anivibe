import { FC, ReactNode } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Script from 'next/script';

import { Button } from '@mui/material';

import {
  EColor,
  ELinkPath,
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

import { getApp, setIsAdultContent } from '@redux/slices/app';
import {
  setNotification,
} from '@redux/slices/notifications';
import { getOverlay } from '@redux/slices/overlay';

import Link from '@ui/Link';
import Modal from '@ui/Modal';

import HeaderContextProvider from '@components/Header/HeaderContext';

import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';

const Overlay = dynamic(() => import('@ui/Overlay'), { ssr: false });
const Footer = dynamic(() => import('@components/Footer'), { ssr: false });
const Notification = dynamic(() => import('@components/Notification'), { ssr: false });
const NextNProgress = dynamic(() => import('nextjs-progressbar'), { ssr: false });

type MainLayout = {
  children: ReactNode;
};

const RootLayout: FC<MainLayout> = ({ children }) => {
  const { isAdultContent, adultTitleName } = useAppSelector(getApp);
  const overlayIsOpen = useAppSelector(getOverlay);
  const dispatch = useAppDispatch();
  const route = useRouter();

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

  const onCloseModal = () => {
    route.push({ pathname: ELinkPath.home }, undefined, { shallow: true });
    dispatch(setIsAdultContent({ isAdultContent: false, adultTitleName: '' }));
  };

  const onAcceptModal = () => {
    window.localStorage.setItem('isAdultContent', 'false');
    dispatch(setIsAdultContent({ isAdultContent: false, adultTitleName: '' }));
  };

  return (
    <>
      <Overlay overlayIsOpen={overlayIsOpen} />

      <Modal
        isOpen={isAdultContent}
        onClose={onCloseModal}
        title="ВНИМАНИЕ НЕСОВЕРШЕННОЛЕТНИМ ЗРИТЕЛЯМ"
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <p style={{
            fontWeight: 500,
            marginTop: 20,
            fontSize: 18,
            textAlign: 'center',
            wordBreak: 'break-all',
          }}
          >
            {adultTitleName}
          </p>

          <p style={{
            fontWeight: 400,
            marginTop: 20,
            marginBottom: 20,
            textAlign: 'center',
          }}
          >
            Данный контент содержит сцены, не предназначенные для просмотра лицам не достигшим совершеннолетия.
            Контент представлен исключительно в художественных целях
            и не предназначен для пропаганды или навязывания каких-либо идей.
          </p>

          <span style={{
            fontWeight: 500,
            marginTop: 20,
            marginBottom: 25,
            fontSize: 18,
          }}
          >
            Вам исполнилось 18 лет?
          </span>

          <div>
            <Link
              path={ELinkPath.home}
              style={{ borderRadius: 12, color: EColor.black, marginRight: 50 }}
              onClick={onCloseModal}
            >
              Нет
            </Link>

            <Button
              variant="contained"
              style={{ backgroundColor: EColor.black, borderRadius: 12, color: EColor.white }}
              onClick={onAcceptModal}
            >
                Да, мне исполнилось 18
            </Button>
          </div>
        </div>
      </Modal>

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

        <Footer />
      </HeaderContextProvider>
    </>
  );
};

export default RootLayout;
