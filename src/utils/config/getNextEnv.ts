import getConfig from 'next/config';

import { ConfigType } from '@interfaces/config';

const getEnvObj = (config: ConfigType): ConfigType => {
  const {
    API,
    HOST,
    JPG_URL,
    WEBP_URL,
    ANIME_API,
    ANILIST_API,
    TORRENT_URL,
    ANIME_DOMEN,
    ANILIST_API_KEY,
    MANGA_IMAGES_DOMAIN,
    MANGA_IMAGE_POSTER_DOMAIN,
  } = config;

  return {
    API,
    HOST,
    JPG_URL,
    WEBP_URL,
    ANIME_API,
    ANILIST_API,
    TORRENT_URL,
    ANIME_DOMEN,
    ANILIST_API_KEY,
    MANGA_IMAGES_DOMAIN,
    MANGA_IMAGE_POSTER_DOMAIN,
  };
};

const getNextEnv = () => {
  const { publicRuntimeConfig } = getConfig();

  return {
    publicRuntimeConfig: getEnvObj(publicRuntimeConfig),
  };
};

export default getNextEnv;
