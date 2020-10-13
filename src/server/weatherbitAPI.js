const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const textapi = {
  application_key: process.env.WEATHERBIT_API_KEY,
};

const TYPE = {
  forecast: "forecast",
  normals: "normals",
};
const BASE = "https://api.weatherbit.io/v2.0";
const FORECAST = "forecast/daily";
const NORMALS = "normals";
const UNITS = "I";

const getAPIData = async (
  lat = "",
  lon = "",
  type = TYPE.forecast,
  start_day = "",
  end_day = ""
) => {
  let typeURL, dateRange;
  switch (type) {
    case TYPE.normals:
      typeURL = NORMALS;
      dateRange = `&start_day=${start_day}&end_day=${end_day}`;
      break;
    default:
      typeURL = FORECAST;
      dateRange = "";
      break;
  }
  const sb = [
    `${BASE}/${typeURL}?units=${UNITS}&lat=${lat}&lon=${lon}&key=${textapi.application_key}`,
    dateRange,
  ];
  const reqURL = sb.join("");
  console.log("weatherbitAPI:reqURL", reqURL);
  try {
    const res = await axios.get(reqURL);
    // axios parses JSON responses.
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.log("weatherbitAPI:ERROR:", error);
  }
};

module.exports = getAPIData;
