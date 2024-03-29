import { useEffect } from 'react';

import { NextPageContext } from 'next';

import { AppProps } from 'next/app';
import Head from 'next/head';

import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { parseCookies } from 'nookies';

import { EThemeType } from '@interfaces/theme';

import {
  EColor,
  ENotification,
  ENotificationKey,
} from '@enums/enums';

import {
  COOKIE_MESSAGE_NOTIFICATION,
  NETWORK_OFFLINE_MESSAGE,
  NETWORK_ONLINE_MESSAGE,
  STORAGE_MESSAGE_NOTIFICATION,
  THEME_FROM_STORAGE,
} from '@constants/common';
import { APP_NAME } from '@constants/seo';

import { removeNotification, setNotification } from '@redux/slices/notifications';
import {
  getCurrentThemeStyle,
  getThemeIsLight,
  setTheme,
  toggleTheme,
} from '@redux/slices/theme';
import { nextReduxWrapper } from '@redux/store';

import RootLayout from '@layouts/RootLayout';

import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import useNetworkStatus from '@hooks/useNetworkStatus';

import createEmotionCache from '@utils/createEmotionCache';
import cookieIsAvailable from '@utils/window/cookieIsAvailable';
import localStorageIsAvailable from '@utils/window/localStorageIsAvailable';

type ThemeCookieType = EThemeType | undefined;

type InitialProps = {
  cookieTheme: ThemeCookieType
};

type MyAppProps = AppProps & InitialProps & {
  emotionCache?: EmotionCache;
};

type MyPageContext = NextPageContext & {
  ctx: any; // I don't know what type it is.
};

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
  cookieTheme,
}: MyAppProps) {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(getCurrentThemeStyle);
  const themeIsLight = useAppSelector(getThemeIsLight);
  const themeForMeta = themeIsLight ? EColor.white : EColor.black;

  const onOnline = () => {
    dispatch(removeNotification({
      notificationKey: ENotificationKey.app,
      notificationType: ENotification.networkOffline,
    }));
    dispatch(setNotification({
      notificationKey: ENotificationKey.app,
      notification: { message: NETWORK_ONLINE_MESSAGE, type: ENotification.networkOnline, autoHideMs: 3000 },
    }));
  };

  const onOffline = () => {
    dispatch(removeNotification({
      notificationKey: ENotificationKey.app,
      notificationType: ENotification.networkOnline,
    }));
    dispatch(setNotification({
      notificationKey: ENotificationKey.app,
      notification: { message: NETWORK_OFFLINE_MESSAGE, type: ENotification.networkOffline },
    }));
  };

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }

    if (!cookieTheme) {
      const cookieAvailable = cookieIsAvailable();
      const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
      const { storageIsAvailable } = localStorageIsAvailable();

      if (!cookieAvailable) {
        dispatch(setNotification({
          notificationKey: ENotificationKey.app,
          notification: { message: COOKIE_MESSAGE_NOTIFICATION, type: ENotification.cookie },
        }));
      }

      if (cookieAvailable) {
        dispatch(toggleTheme({ themeIsLight: darkThemeMq.matches, updateCookie: true }));
        return;
      }

      if (!storageIsAvailable) {
        dispatch(setNotification({
          notificationKey: ENotificationKey.app,
          notification: { message: STORAGE_MESSAGE_NOTIFICATION, type: ENotification.storage },
        }));
      }

      if (!cookieAvailable && storageIsAvailable) {
        dispatch(toggleTheme({ themeIsLight: darkThemeMq.matches, updateLocalStorage: true }));
      }
    }
  }, []);

  useNetworkStatus(onOnline, onOffline);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta charSet="UTF-8" />
        <meta content="website" property="og:type" />
        <meta name="theme-color" content={themeForMeta} />
        <meta content={APP_NAME} name="twitter:site" />
        <meta content={APP_NAME} property="og:site_name" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider theme={currentTheme}>
        <CssBaseline />

        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.getInitialProps = nextReduxWrapper.getInitialPageProps(
  (store) => async ({ ctx }: MyPageContext): Promise<InitialProps> => {
    const parsedCookie = parseCookies(ctx);
    const cookieTheme = parsedCookie[THEME_FROM_STORAGE] as ThemeCookieType;

    if (cookieTheme) {
      store.dispatch(setTheme(cookieTheme));
    }

    return ({ cookieTheme });
  },
);

export default nextReduxWrapper.withRedux(MyApp);
