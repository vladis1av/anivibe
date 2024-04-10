const dotenv = require("dotenv");

dotenv.config();

const REWRITE_MANGA_CHAPTER_API_SOURCE = "/manga/api/:id/chapter/:chapterId";
// const getApiByNumber = (apiArr, apiNumber, defaultApi) => (apiArr[Number(apiNumber)] || defaultApi);

const getEnv = () => {
  const MANGA_API_NUMBER = process.env.MANGA_API_NUMBER || 0;
  const MANGAS_API = process.env.MANGAS_API?.split(',') || [""];

  return {
    MANGAS_API: MANGAS_API,
    HOST: process.env.HOST,
    JPG_URL: process.env.JPG_URL,
    WEBP_URL: process.env.WEBP_URL,
    ANIME_API: process.env.ANIME_API,
    MANGA_API_NUMBER: MANGA_API_NUMBER,
    IMAGE_PROXY: process.env.IMAGE_PROXY,
    ANIME_DOMEN: process.env.ANIME_DOMEN,
    TORRENT_URL: process.env.TORRENT_URL,
    ANILIST_API: process.env.ANILIST_API,
    HOST_MANGA_API: process.env.HOST_MANGA_API,
    ANILIST_API_KEY: process.env.ANILIST_API_KEY,
    MANGA_IMAGES_DOMAIN: process.env.MANGA_IMAGES_DOMAIN?.split(',') || [""],
    // CURRENT_MANGA_API: getApiByNumber(MANGAS_API,MANGA_API_NUMBER,MANGAS_API[0]),
  }
}

module.exports = {
  publicRuntimeConfig: getEnv(),
  async rewrites() {
  return ([
      {
        source:REWRITE_MANGA_CHAPTER_API_SOURCE ,
        destination: 'https://desu.me/manga/api/:id/chapter/:chapterId',
      },
      {
        source:REWRITE_MANGA_CHAPTER_API_SOURCE ,
        destination: 'https://desu.win/manga/api/:id/chapter/:chapterId',
      }
  ]);
  }
};