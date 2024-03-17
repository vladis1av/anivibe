import getConfig from 'next/config';

import { ConfigType } from '@interfaces/config';

const getEnvObj = (config: ConfigType): ConfigType => {
  const {
    HOST,
    JPG_URL,
    WEBP_URL,
    ANIME_API,
    MANGAS_API,
    ANILIST_API,
    TORRENT_URL,
    ANIME_DOMEN,
    ANILIST_API_KEY,
    MANGA_API_NUMBER,
    MANGA_IMAGES_DOMAIN,
    HOST_MANGA_API,
  } = config;

  return {
    HOST,
    JPG_URL,
    WEBP_URL,
    ANIME_API,
    MANGAS_API,
    ANILIST_API,
    TORRENT_URL,
    ANIME_DOMEN,
    ANILIST_API_KEY,
    MANGA_API_NUMBER,
    MANGA_IMAGES_DOMAIN,
    HOST_MANGA_API,
  };
};

const getNextEnv = () => {
  const { publicRuntimeConfig } = getConfig();

  return {
    publicRuntimeConfig: getEnvObj(publicRuntimeConfig),
  };
};

export default getNextEnv;
