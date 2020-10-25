// Setup empty JS object to act as endpoint for all routes
projectData = {};
// To hold new data entries.
const data = [];

const dotenv = require("dotenv");
dotenv.config();

const textapi = {
  geonamesKey: process.env.GEONAMES_UN,
  pixabayKey: process.env.PIXABAY_API_KEY,
  weatherbitKey: process.env.WEATHERBIT_API_KEY,
};

const PORT = process.env.PORT || 8081;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const geonamesAPI = require("./geonamesAPI");
const weatherbitAPI = require("./weatherbitAPI");
const pixabayAPI = require("./pixabayAPI");

// Start up an instance of app
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));

// Get projectData - most recent entry
app.get("/data", (req, res) => {
  res.send(projectData);
});

// Get all data
app.get("/all", (req, res) => {
  res.send(data);
});

// Post route to add new data.
app.post("/addData", (req, res) => {
  newEntry = {
    location: req.body.location,
    lat: req.body.lat,
    lng: req.body.lng,
    departing: req.body.departing,
    countdown: req.body.countdown,
    weather: req.body.weather,
    weatherType: req.body.weatherType,
    image: req.body.image,
  };
  data.push(newEntry);
  // Save latest entry to projectData.
  projectData = { ...newEntry };
  res.send(projectData);
});

app.post("/updateData", (req, res) => {
  projectData = { ...projectData, ...req.body };
  res.send(projectData);
});

app.post("/clearData", (req, res) => {
  projectData = {};
  res.send(projectData);
});

app.post("/geonames", (req, res) => {
  const location = req.body.location;
  geonamesAPI(location)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log("server:geonames:error", err));
});

app.post("/weatherbit", (req, res) => {
  const { lat, lon, type, start_day, end_day } = req.body;
  weatherbitAPI(lat, lon, type, start_day, end_day)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log("server:geonames:error", err));
});

app.post("/pixabay", (req, res) => {
  const location = req.body.location;
  pixabayAPI(location)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log("server:pixabay:error", err));
});

// Setup Server
app.listen(PORT, () => {
  console.log(`Server started on localhost port ${PORT}`);
});
