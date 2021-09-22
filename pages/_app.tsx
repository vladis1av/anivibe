import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';

import Header from '../components/Header/Header';
import { dark, light } from '../theme';

import '../styles/globals.scss';
import 'macro-css';

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState('dark');

  const onChangeTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      window.localStorage.setItem('anime-APP-theme', 'light');
    } else {
      setTheme('dark');
      window.localStorage.setItem('anime-APP-theme', 'dark');
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('anime-APP-theme');
    localTheme ? setTheme(localTheme) : setTheme('dark');

    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Anime APP</title>
        <meta property="og:site_name" content="Anime APP" />
        <meta
          name="description"
          content="На сайте вы можете посмотреть онлайн или скачать через торрент аниме."
        />
        <meta
          content="Anime APP,Anime app,anime app,анимe эпп,аниме апп,аниме приложение, смотреть аниme, скачать аниме, аниме бесплатно,  Скачать аниме, аниме торрент, аниме на русском"
          name="Keywords"
        />
        <meta content="Anime APP" property="og:title" />
      </Head>
      <MuiThemeProvider theme={theme !== 'dark' ? { ...light } : { ...dark }}>
        <Header onChangeTheme={onChangeTheme} />
        <CssBaseline />
        <NextNProgress
          color="#FFF"
          startPosition={0.3}
          height={3}
          options={{ showSpinner: false }}
        />
        <Component {...pageProps} />
      </MuiThemeProvider>
    </>
  );
}

export default MyApp;
