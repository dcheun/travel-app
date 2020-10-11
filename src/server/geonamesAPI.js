const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const textapi = {
  application_key: process.env.GEONAMES_UN,
};

const BASE_URL = "http://api.geonames.org/postalCodeSearchJSON";
const MAX_ROWS = 10;

const getAPIData = async (placename = "") => {
  reqURL = `${BASE_URL}?placename=${placename}&maxRows=${MAX_ROWS}&username=${textapi.application_key}`;
  console.log("geonamesAPI:reqURL", reqURL);
  try {
    const res = await axios.get(reqURL);
    // axios parses JSON responses.
    return res.data;
  } catch (error) {
    console.log("geonamesAPI:ERROR:", error);
  }
};

module.exports = getAPIData;
