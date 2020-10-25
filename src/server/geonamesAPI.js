const axios = require("axios");
const textapi = require("./textapi");

const BASE_URL = "http://api.geonames.org/postalCodeSearchJSON";
const MAX_ROWS = 10;

const getAPIData = async (placename = "") => {
  reqURL = `${BASE_URL}?placename=${placename}&maxRows=${MAX_ROWS}&username=${textapi.geonamesKey}`;
  try {
    const res = await axios.get(reqURL);
    // axios parses JSON responses.
    return res.data;
  } catch (error) {
    console.log("geonamesAPI:ERROR:", error);
  }
};

module.exports = getAPIData;
