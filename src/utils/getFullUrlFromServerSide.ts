import getEnv from './getEnv';

const getFullUrlFromServerSide = (resolvedUrl: string): string => {
  const { publicRuntimeConfig: { HOST } } = getEnv();

  const { origin, pathname } = new URL(resolvedUrl, HOST);

  return encodeURI(`${origin}${pathname}`);
};

export default getFullUrlFromServerSide;
