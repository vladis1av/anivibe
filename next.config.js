const dotenv = require("dotenv");

dotenv.config();

const REWRITE_MANGA_API_SOURCE = "/manga/api";

const env = {
  HOST: process.env.HOST,
  JPG_URL: process.env.JPG_URL,
  WEBP_URL: process.env.WEBP_URL,
  ANIME_API: process.env.ANIME_API,
  IMAGE_PROXY: process.env.IMAGE_PROXY,
  ANIME_DOMEN: process.env.ANIME_DOMEN,
  TORRENT_URL: process.env.TORRENT_URL,
  ANILIST_API: process.env.ANILIST_API,
  HOST_MANGA_API: process.env.HOST_MANGA_API,
  ANILIST_API_KEY: process.env.ANILIST_API_KEY,
  MANGA_API_NUMBER: process.env.MANGA_API_NUMBER || 0,
  MANGAS_API: process.env.MANGAS_API?.split(',') || [""],
  MANGA_IMAGES_DOMAIN: process.env.MANGA_IMAGES_DOMAIN?.split(',') || [""],
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
