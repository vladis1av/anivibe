require('dotenv').config();

module.exports = {
  env: {
    API_URL: process.env.API_URL,
    CLIENT_API: process.env.CLIENT_API,
    ANILIST_API_KEY: process.env.ANILIST_API_KEY,
    IMAGE_URL: process.env.IMAGE_URL,
    TORRENT_URL: process.env.TORRENT_URL,
  },
};
