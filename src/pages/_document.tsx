import { Children } from 'react';

import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';
import Script from 'next/script';

import createEmotionServer from '@emotion/server/create-instance';
import { ServerStyleSheets as JSSServerStyleSheets } from '@mui/styles';

import { IS_DEV } from '@constants/common';

import createEmotionCache from '@utils/createEmotionCache';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ru">
        <Head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="icon" type="image/png" href="/favicon.ico" />
          <meta name="yandex-verification" content="c348945bfd78b269" />
          <meta name="google-site-verification" content="lYMieH2JA-N7C-7OngdZvjJlgUfL8EonOJolad0Os74" />
          <meta name="google-adsense-account" content="ca-pub-9863048209509930" />
          {(this.props as any).emotionStyleTags}
          <Script
            async
            src="https://ad.mail.ru/static/ads-async.js"
            strategy="lazyOnload"
            crossOrigin="anonymous"
          />
        </Head>

        <body>
          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }
}

let prefixer: any;
let cleanCSS: any;

if (!IS_DEV) {
  const postcss = require('postcss');
  const autoprefixer = require('autoprefixer');
  const CleanCSS = require('clean-css');

  prefixer = postcss([autoprefixer]);
  cleanCSS = new CleanCSS();
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);
  const jssSheets = new JSSServerStyleSheets();

  ctx.renderPage = () => originalRenderPage({
    enhanceApp: (App: any) => function EnhanceApp(props) {
      return jssSheets.collect(<App emotionCache={cache} {...props} />);
    },
  });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  let css = jssSheets.toString();
  if (css && !IS_DEV) {
    const result1 = await prefixer.process(css, { from: undefined });
    css = result1.css;
    css = cleanCSS.minify(css).styles;
  }

  return {
    ...initialProps,
    styles: [
      ...emotionStyleTags,
      <style
        id="jss-server-side"
        key="jss-server-side"
        dangerouslySetInnerHTML={{ __html: css }}
      />,
      ...Children.toArray(initialProps.styles),
    ],
  };
};
