const dotenv = require("dotenv");

dotenv.config();

const textapi = {
  geonamesKey: process.env.GEONAMES_UN,
  pixabayKey: process.env.PIXABAY_API_KEY,
  weatherbitKey: process.env.WEATHERBIT_API_KEY,
};

module.exports = textapi;
