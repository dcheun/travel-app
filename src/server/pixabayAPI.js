const axios = require("axios");
const textapi = require("./textapi");

const BASE_URL = "https://pixabay.com/api/";
const API_OPTS = {
  imageType: "photo",
  safeSearch: true,
  filter: "travel",
  page: 1,
  per_page: 3,
};

const getAPIData = async (query) => {
  const reqURL = `${BASE_URL}?key=${textapi.pixabayKey}&q=${query}&image_type=${API_OPTS.imageType}&safesearch=${API_OPTS.safeSearch}&filter=${API_OPTS.filter}&page=${API_OPTS.page}&per_page=${API_OPTS.per_page}`;
  try {
    const res = await axios.get(reqURL);
    // axios parses JSON responses.
    return res.data;
  } catch (error) {
    console.log("pixabayAPI:ERROR:", error);
  }
};

module.exports = getAPIData;
