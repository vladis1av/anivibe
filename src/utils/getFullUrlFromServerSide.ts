import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const { HOST } = publicRuntimeConfig;

const getFullUrlFromServerSide = (resolvedUrl: string): string => {
  const { origin, pathname } = new URL(resolvedUrl, HOST);

  return encodeURI(`${origin}${pathname}`);
};

export default getFullUrlFromServerSide;
