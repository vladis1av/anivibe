require('dotenv').config();

module.exports = {
  env: {
    API_URL: process.env.API_URL,
    IMAGE_URL: process.env.IMAGE_URL,
    ANILIST_API: process.env.ANILIST_API,
    CLIENT_API: process.env.CLIENT_API,
  },
};
