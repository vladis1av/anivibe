import getConfig from 'next/config';

type ConfigType = {
  HOST: string;
  RUNTIME: string;
  JPG_URL: string;
  WEBP_URL: string;
  REGIONS: string[];
  ANIME_API: string;
  ANIME_DOMEN: string;
  TORRENT_URL: string;
  ANILIST_API: string;
  MANGAS_API: string[];
  ANILIST_API_KEY: string;
  MANGA_API_NUMBER: string;
};

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
  };
};

const getEnv = () => {
  const { publicRuntimeConfig } = getConfig();

  return {
    publicRuntimeConfig: getEnvObj(publicRuntimeConfig),
  };
};

export default getEnv;
