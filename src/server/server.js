const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const geonamesAPI = require("./geonamesAPI");
const weatherbitAPI = require("./weatherbitAPI");
const pixabayAPI = require("./pixabayAPI");

const PORT = process.env.PORT || 8081;

// Setup empty JS object to act as endpoint for all routes
projectData = {};
// To hold new data entries.
const data = [];

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
    temperature: req.body.temperature,
    date: req.body.date,
    userResponse: req.body.userResponse,
  };
  data.push(newEntry);
  // Save latest entry to projectData.
  projectData = { ...newEntry };
  res.send(projectData);
});

app.post("/geonames", (req, res) => {
  const placename = req.body.placename;
  console.log("server:geonames:placename", placename);
  geonamesAPI(placename)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log("server:geonames:error", err));
});

app.post("/weatherbit", (req, res) => {
  const { lat, lon, type, start_day, end_day } = req.body;
  console.log(
    `server:weatherbit: lat=${lat},lon=${lon},type=${type},start_day=${start_day},end_day=${end_day}`
  );
  weatherbitAPI(lat, lon, type, start_day, end_day)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => console.log("server:geonames:error", err));
});

app.post("/pixabay", (req, res) => {
  const placename = req.body.placename;
  console.log("server:pixabay:query", placename);
  pixabayAPI(placename)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log("server:pixabay:error", err));
});

// Setup Server
app.listen(PORT, () => {
  console.log(`Server started on localhost port ${PORT}`);
});
