import Head from 'next/head';
import { MuiThemeProvider } from '@material-ui/core';

import Header from '../components/Header/Header';
import { theme } from '../theme';

import '../styles/globals.scss';
import 'macro-css';
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {
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
      <MuiThemeProvider theme={theme}>
        <Header />
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
