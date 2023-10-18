import getNextEnv from './config/getNextEnv';

const getFullUrlFromServerSide = (resolvedUrl: string): string => {
  const { publicRuntimeConfig: { HOST } } = getNextEnv();

  const { origin, pathname } = new URL(resolvedUrl, HOST);

  return encodeURI(`${origin}${pathname}`);
};

export default getFullUrlFromServerSide;
