import { FC } from 'react';

import getConfig from 'next/config';
import Head from 'next/head';

import { IS_SERVER } from '@constants/common';

const { publicRuntimeConfig } = getConfig();

const {
  CLIENT_API,
} = publicRuntimeConfig;

type Tags = Array<string> ;

type SeoHeadProps = {
  tabTitle: string;
  title: string;
  description: string;
  keywords?: string;
  imageSource?: string;
  videoTags?: Tags;
  bookTags?: Tags;
};

const getTags = (tagName: 'video' | 'book', tags?: Tags) => tags && tags.length && tags.map((tag, i) => <meta
  key={`${tag}-${i}`}
  content={tag}
  property={`${tagName}:tag`}
/>);

const SeoHead: FC<SeoHeadProps> = ({
  tabTitle,
  title,
  description,
  keywords,
  imageSource,
  videoTags,
  bookTags,
}) => (<Head>
  <title>{tabTitle}</title>
  <meta content={title} property="og:title" />
  <meta content={title} property="twitter:title" />
  <meta content={description} name="og:description" />
  <meta content={description} name="twitter:description" />
  <meta content={description} name="description" />
  <meta content={!IS_SERVER ? document.URL : CLIENT_API} property="og:url" />
  {getTags('video', videoTags)}
  {getTags('book', bookTags)}
  {imageSource && <meta content={imageSource} property="og:image"/>}
  {imageSource && <meta content={imageSource} property="twitter:image"/>}
  {keywords && <meta content={keywords} name="Keywords" />}
</Head>);

export default SeoHead;
