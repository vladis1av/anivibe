import { useEffect } from 'react';

import { AppProps } from 'next/app';
import Head from 'next/head';

import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { EThemeType } from '@interfaces/theme';

import {
  EColor, ENotification, ENotificationKey, ETheme,
} from '@enums/enums';

import { NETWORK_OFFLINE_MESSAGE, NETWORK_ONLINE_MESSAGE, THEME_FROM_LOCAL_STORAGE } from '@constants/common';
import {
  APP_NAME_UPPER_CASE,
} from '@constants/seo';

import { removeNotification, setNotification } from '@redux/slices/notifications';
import { getCurrentThemeStyle, getThemeIsLight, setTheme } from '@redux/slices/theme';
import { nextReduxWrapper } from '@redux/store';

import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import useNetworkStatus from '@hooks/useNetworkStatus';

import createEmotionCache from '@utils/createEmotionCache';

type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
};

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) {
  const dispatch = useAppDispatch();
  const themeIsLight = useAppSelector(getThemeIsLight);
  const selectedTheme = useAppSelector(getCurrentThemeStyle);
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
    const localTheme = (window.localStorage.getItem(THEME_FROM_LOCAL_STORAGE)) as EThemeType | null;
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }

    if (!localTheme) {
      const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');

      dispatch(setTheme({ themeIsLight: darkThemeMq.matches, wantUpdateLocalStorage: true }));
    } else {
      dispatch(setTheme({ themeIsLight: localTheme !== ETheme.light }));
    }
  }, []);

  useNetworkStatus(onOnline, onOffline);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta content="website" property="og:type" />
        <meta content={APP_NAME_UPPER_CASE} property="og:site_name" />
        <meta content={APP_NAME_UPPER_CASE} name="twitter:site" />
        <meta name="theme-color" content={themeForMeta} />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider theme={selectedTheme}>
        <CssBaseline />

        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default nextReduxWrapper.withRedux(MyApp);
