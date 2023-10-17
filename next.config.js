const dotenv = require("dotenv");

dotenv.config();

const REWRITE_MANGA_API_SOURCE = "/manga/api";

const env = {
  HOST: process.env.HOST,
  RUNTIME: process.env.RUNTIME,
  JPG_URL: process.env.JPG_URL,
  WEBP_URL: process.env.WEBP_URL,
  ANIME_API: process.env.ANIME_API,
  ANIME_DOMEN: process.env.ANIME_DOMEN,
  TORRENT_URL: process.env.TORRENT_URL,
  ANILIST_API: process.env.ANILIST_API,
  ANILIST_API_KEY: process.env.ANILIST_API_KEY,
  REGIONS: process.env.REGIONS?.split(',') || [""],
  MANGA_API_NUMBER: process.env.MANGA_API_NUMBER || 0,
  MANGAS_API: process.env.MANGAS_API?.split(',') || [""],
  EDGE_FUNCTIONS_ANIME_API: process.env.EDGE_FUNCTIONS_ANIME_API,
  EDGE_FUNCTIONS_MANGA_API: process.env.EDGE_FUNCTIONS_MANGA_API,
  EDGE_FUNCTIONS_ANILIST_API: process.env.EDGE_FUNCTIONS_ANILIST_API
}

const getRewrite = (source, destination) => {
  return {
    source,
    destination,
  }
};

const getApiByNumber = (apiArr, apiNumber, defaultApi) => (apiArr[Number(apiNumber)] || defaultApi);

const getMangaRewrites = () => {
  return ([
    getRewrite(REWRITE_MANGA_API_SOURCE, getApiByNumber(env.MANGAS_API, env.MANGAS_API_NUMBER, env.MANGAS_API[0])),
  ])
};

module.exports = {
  publicRuntimeConfig: env,
  async rewrites() {
    return getMangaRewrites()
  },
};
