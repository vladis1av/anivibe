import { ConfigType } from '@interfaces/config';

const getProcessEnv = (): ConfigType => {
  const REGIONS = process.env.REGIONS?.split(',') || [''];
  const MANGAS_API = process.env.MANGAS_API?.split(',') || [''];

  const {
    HOST = '',
    RUNTIME = 'nodejs',
    JPG_URL = '',
    WEBP_URL = '',
    ANIME_API = '',
    ANILIST_API = '',
    TORRENT_URL = '',
    ANIME_DOMEN = '',
    ANILIST_API_KEY = '',
    MANGA_API_NUMBER = '0',
    EDGE_FUNCTIONS_ANIME_API = '',
    EDGE_FUNCTIONS_MANGA_API = '',
    EDGE_FUNCTIONS_ANILIST_API = '',
  } = process.env;

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

export default getProcessEnv;
