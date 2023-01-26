import React, { useEffect, useMemo } from 'react';

import { AppProps } from 'next/app';
import Head from 'next/head';

import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { EThemeType } from '@interfaces/theme';

import { EColor, ETheme } from '@enums/enums';

import { THEME_FROM_LOCAL_STORAGE } from '@constants/common';
import { APP_NAME, SEO_DESCRIPTION, SEO_KEYWORDS_APP } from '@constants/seo';

import { getCurrentThemeStyle, getThemeIsLight, setTheme } from '@redux/slices/theme';
import { nextReduxWrapper } from '@redux/store';

import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';

import createEmotionCache from '@utils/createEmotionCache';

import 'video.js/dist/video-js.min.css';
import '@ui/VideoPlayer/VideoPlayer.css';

type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
};

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) {
  const dispatch = useAppDispatch();
  const themeIsLight = useAppSelector(getThemeIsLight);
  const selectedTheme = useAppSelector(getCurrentThemeStyle);
  const themeForMeta = useMemo(() => (themeIsLight ? EColor.white : EColor.black), [themeIsLight]);

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

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta content={APP_NAME} property="og:site_name" />
        <meta content={SEO_DESCRIPTION} name="description" />
        <meta content={SEO_KEYWORDS_APP} name="Keywords" />
        <meta content={APP_NAME} property="og:title" />
        <meta name="theme-color" content={themeForMeta} />
      </Head>

      <ThemeProvider theme={selectedTheme}>
        <CssBaseline />

        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default nextReduxWrapper.withRedux(MyApp);
