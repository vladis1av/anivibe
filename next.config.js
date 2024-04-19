const dotenv = require("dotenv");

dotenv.config();

const env = {
  API: process.env.API,
  HOST: process.env.HOST,
  JPG_URL: process.env.JPG_URL,
  WEBP_URL: process.env.WEBP_URL,
  ANIME_API: process.env.ANIME_API,
  ANIME_DOMEN: process.env.ANIME_DOMEN,
  TORRENT_URL: process.env.TORRENT_URL,
  ANILIST_API: process.env.ANILIST_API,
  ANILIST_API_KEY: process.env.ANILIST_API_KEY,
  MANGA_IMAGES_DOMAIN: process.env.MANGA_IMAGES_DOMAIN?.split(',') || [""],
}

module.exports = {
  publicRuntimeConfig: env,
};