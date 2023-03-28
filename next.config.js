const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  swcMinify: true,
  publicRuntimeConfig: {
    ANILIBRIA_API: process.env.ANILIBRIA_API,
    ANILIBRIA_DOMEN: process.env.ANILIBRIA_DOMEN,
    DESU_ME_API: process.env.DESU_ME_API,
    SHIKIMORI_API: process.env.SHIKIMORI_API,
    ANILIST_API: process.env.ANILIST_API,
    CLIENT_API: process.env.CLIENT_API,
    ANILIST_API_KEY: process.env.ANILIST_API_KEY,
    JPG_URL: process.env.JPG_URL,
    WEBP_URL: process.env.WEBP_URL,
    TORRENT_URL: process.env.TORRENT_URL,
    DESU_ME_API_WITH_CORS: process.env.DESU_ME_API_WITH_CORS,
  }
};
