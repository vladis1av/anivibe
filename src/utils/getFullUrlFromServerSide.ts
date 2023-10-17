import getProcessEnv from './config/getProcessEnv';

const getFullUrlFromServerSide = (resolvedUrl: string): string => {
  const { HOST } = getProcessEnv();

  const { origin, pathname } = new URL(resolvedUrl, HOST);

  return encodeURI(`${origin}${pathname}`);
};

export default getFullUrlFromServerSide;
