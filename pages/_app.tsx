import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import Header from '@components/Header/Header';
import { APP_NAME, SEO_DESCRIPTION, SEO_KEYWORDS_APP } from '@constants/seo';
import { nextNProgressHeight, nextNProgressStartPosition } from '@constants/nextNproggress';
import { themeFromLocalStorage } from '@constants/common';
import { Colors, Themes } from '@enums/enums';
import { ThemeType } from '@interfaces/interfaces';
import { dark, light } from '../theme';

import '@styles/globals.scss';
import 'macro-css';

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<ThemeType>(Themes.dark);

  const onChangeTheme = () => {
    if (theme === Themes.dark) {
      setTheme(Themes.light);
      window.localStorage.setItem(themeFromLocalStorage, Themes.light);
    } else {
      setTheme(Themes.dark);
      window.localStorage.setItem(themeFromLocalStorage, Themes.dark);
    }
  };

  useEffect(() => {
    const localTheme = (window.localStorage.getItem(themeFromLocalStorage)) as ThemeType | null;
    const jssStyles = document.querySelector('#jss-server-side');

    if (localTheme) {
      setTheme(localTheme);
    } else {
      setTheme(Themes.dark);
    }

    if (jssStyles) {
      jssStyles?.parentNode?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
        <meta
          content={APP_NAME}
          property="og:site_name"
        />
        <meta
          content={SEO_DESCRIPTION}
          name="description"
        />
        <meta
          content={SEO_KEYWORDS_APP}
          name="Keywords"
        />
        <meta
          content={APP_NAME}
          property="og:title"
        />
      </Head>

      <MuiThemeProvider theme={theme !== Themes.dark ? { ...light } : { ...dark }}>
        <Header onChangeTheme={onChangeTheme} />

        <CssBaseline />

        <NextNProgress
          color={Colors.white}
          startPosition={nextNProgressStartPosition}
          height={nextNProgressHeight}
          options={{ showSpinner: false }}
        />

        <Component {...pageProps} />
      </MuiThemeProvider>
    </>
  );
}

export default MyApp;
