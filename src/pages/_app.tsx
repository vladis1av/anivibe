import { useEffect } from 'react';

import { AppProps } from 'next/app';
import Head from 'next/head';

import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { EThemeType } from '@interfaces/theme';

import { EColor, ETheme } from '@enums/enums';

import { THEME_FROM_LOCAL_STORAGE } from '@constants/common';
import {
  APP_NAME_UPPER_CASE,
} from '@constants/seo';

import { getCurrentThemeStyle, getThemeIsLight, setTheme } from '@redux/slices/theme';
import { nextReduxWrapper } from '@redux/store';

import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';

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

  useEffect(() => {
    const ads = document.getElementsByClassName('mrg-tag').length;
    for (let i = 0; i < ads; i++) {
      try {
        // eslint-disable-next-line no-undef
        (MRGtag = window.MRGtag || []).push({});
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

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
