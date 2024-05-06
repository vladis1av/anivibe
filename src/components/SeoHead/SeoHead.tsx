import { FC } from 'react';

import Head from 'next/head';

type Tags = Array<string> ;

type SeoHeadProps = {
  tabTitle: string;
  title: string;
  canonical?: string;
  ogUrl?: string
  description: string;
  keywords?: string;
  imageSource?: string;
  videoTags?: Tags;
  bookTags?: Tags;
  googleBotNoIndex?: boolean;
};

const getTags = (tagName: 'video' | 'book', tags?: Tags) => tags && tags.length && tags.map((tag, i) => <meta
  key={`${tag}-${i}`}
  content={tag}
  property={`${tagName}:tag`}
/>);

const SeoHead: FC<SeoHeadProps> = ({
  tabTitle,
  title,
  canonical,
  ogUrl,
  description,
  keywords,
  imageSource,
  videoTags,
  bookTags,
  googleBotNoIndex,
}) => (<Head>
  <title>{tabTitle}</title>
  <meta content={title} property="og:title" />
  <meta content={title} property="twitter:title" />
  <meta content={description} name="og:description" />
  <meta content={description} name="twitter:description" />
  <meta content={description} name="description" />
  {canonical && <link rel="canonical" href={canonical} />}
  {ogUrl && <meta content={ogUrl} property="og:url" />}
  {getTags('video', videoTags)}
  {getTags('book', bookTags)}
  {imageSource && <meta content={imageSource} property="og:image"/>}
  {imageSource && <meta content={imageSource} property="twitter:image"/>}
  {keywords && <meta content={keywords} name="Keywords" />}
  {googleBotNoIndex && <meta name="googlebot" content="noindex"></meta>}
</Head>);

export default SeoHead;
