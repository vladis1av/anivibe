import Head from 'next/head';
import { colors, CssBaseline, MuiThemeProvider } from '@material-ui/core';
import React, { useState } from 'react';

import Header from '../components/Header/Header';
import { dark, light } from '../theme';

import '../styles/globals.scss';
import 'macro-css';
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {
  const [themeDark, setThemeDark] = useState(true);

  const setTheme = () => {
    setThemeDark(!themeDark);
  };

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Anime APP</title>
        <link rel="canonical" href={`${process.env.CLIENT_API}`} />
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
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <MuiThemeProvider theme={!themeDark ? { ...light } : { ...dark }}>
        <Header theme={themeDark} onChangeTheme={setTheme} />
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
