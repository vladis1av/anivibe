const dotenv = require("dotenv");

dotenv.config();

const REWRITE_MANGA_API_SOURCE = "/manga/api";
const MANGA_API_NAME = "DESU_ME_API";
const DESU_ME_API = process.env.DESU_ME_API;
const DESU_ME_API_NUMBER = process.env.DESU_ME_API_NUMBER || "1";

const RUNTIME = process.env.RUNTIME
const REGIONS = process.env.REGIONS.split(',')

const getRewrite = (source, destination) => {
  return {
    source,
    destination,
  }
};

const getApiByNumber = (api, apiNumber, defaultApi) => {
  const apiByNumber = `${api}${apiNumber}`
  return process.env[apiByNumber] || defaultApi;
};

const getMangaRewrites = () => {
  return ([
    getRewrite(REWRITE_MANGA_API_SOURCE, getApiByNumber(MANGA_API_NAME, DESU_ME_API_NUMBER, DESU_ME_API))
  ])
};

module.exports = {
  swcMinify: true,
  async rewrites() {
    return getMangaRewrites()
  },
  publicRuntimeConfig: {
    RUNTIME,
    REGIONS,
    ANILIBRIA_API: process.env.ANILIBRIA_API,
    ANILIBRIA_DOMEN: process.env.ANILIBRIA_DOMEN,
    DESU_ME_API_NUMBER,
    DESU_ME_API,
    DESU_ME_API2: process.env.DESU_ME_API2,
    SHIKIMORI_API: process.env.SHIKIMORI_API,
    ANILIST_API: process.env.ANILIST_API,
    HOST: process.env.HOST,
    ANILIST_API_KEY: process.env.ANILIST_API_KEY,
    JPG_URL: process.env.JPG_URL,
    WEBP_URL: process.env.WEBP_URL,
    TORRENT_URL: process.env.TORRENT_URL,
    DESU_ME_API_WITH_CORS: process.env.DESU_ME_API_WITH_CORS,
  }
};
