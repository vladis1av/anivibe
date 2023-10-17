import getConfig from 'next/config';

import { ConfigType } from '@interfaces/config';

const getEnvObj = (config: ConfigType): ConfigType => {
  const {
    HOST,
    RUNTIME,
    JPG_URL,
    REGIONS,
    WEBP_URL,
    ANIME_API,
    MANGAS_API,
    ANILIST_API,
    TORRENT_URL,
    ANIME_DOMEN,
    ANILIST_API_KEY,
    MANGA_API_NUMBER,
    EDGE_FUNCTIONS_ANIME_API,
    EDGE_FUNCTIONS_MANGA_API,
    EDGE_FUNCTIONS_ANILIST_API,
  } = config;

  return {
    HOST,
    RUNTIME,
    JPG_URL,
    REGIONS,
    WEBP_URL,
    ANIME_API,
    MANGAS_API,
    ANILIST_API,
    TORRENT_URL,
    ANIME_DOMEN,
    ANILIST_API_KEY,
    MANGA_API_NUMBER,
    EDGE_FUNCTIONS_ANIME_API,
    EDGE_FUNCTIONS_MANGA_API,
    EDGE_FUNCTIONS_ANILIST_API,
  };
};

const getNextEnv = () => {
  const { publicRuntimeConfig } = getConfig();

  return {
    publicRuntimeConfig: getEnvObj(publicRuntimeConfig),
  };
};

export default getNextEnv;
