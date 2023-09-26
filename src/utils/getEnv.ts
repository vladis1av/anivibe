import getConfig from 'next/config';

const getEnv = () => {
  const { publicRuntimeConfig } = getConfig();

  const {
    HOST,
    RUNTIME,
    REGIONS,
    DESU_ME_API,
    ANILIST_API,
    DESU_ME_API2,
    ANILIST_API_KEY,
    ANILIBRIA_API,
    ANILIBRIA_DOMEN,
    DESU_ME_API_NUMBER,
    JPG_URL,
    WEBP_URL,
    TORRENT_URL,
  } = publicRuntimeConfig;

  return {
    HOST,
    RUNTIME,
    REGIONS,
    DESU_ME_API,
    ANILIST_API,
    DESU_ME_API2,
    ANILIST_API_KEY,
    ANILIBRIA_API,
    ANILIBRIA_DOMEN,
    DESU_ME_API_NUMBER,
    JPG_URL,
    WEBP_URL,
    TORRENT_URL,
  };
};

export default getEnv;
