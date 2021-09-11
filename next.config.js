require('dotenv').config();

module.exports = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    IMAGE_URL: process.env.IMAGE_URL,
    CLIENT_API: process.env.CLIENT_API,
  },
};
