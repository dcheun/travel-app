# Travel Planner App

travel-app is travel planning application to help users plan and get information about places they will be visiting.

This application is deployed to and hosted on [Heroku](https://dc-travel-planner.herokuapp.com/).

Users enters the location and departure date in the input fields provided. Users can also optionally enter flight, lodging, packing list, and notes infomration. However, these extra fields are simply test fields. Once the information is submitted, the application will fetch the required data and dynamically update the UI.

## Usage

### Env Variables - API Keys Set Up

To deploy or run the app, you will need to supply your own API credentials.

Create a .env file at the root level and supply the following information.

```
GEONAMES_UN=<your_geonames_username>
WEATHERBIT_API_KEY=<your_weatherbit_api_key>
PIXABAY_API_KEY=<your_pixabay_api_key>
```

### Install Dependencies

```
npm install
```

### Run

Since the project uses webpack-dev-server for development mode, dev version listens on port 8080 and prod version listens on port 8081.

Note that you will need to run 'npm start' in either mode to start the express server which will serve the HTTP routes that is needed for the application to function.

```
# Run in development mode (:8080)
npm run dev

# Run production build, first build project, then run production script (:8081)
npm run build
npm start

# You can then reach the respective build (development/production) using a browser and navigating to localhost:<port>
```

### Test

Included unit tests for frontend app.js and backend server.js. Tests are run via Jest.

```
npm run test
```

## Features

The application can display the following information:

- How many days is the trip from today.
- The weather forecast or what the typical normals are if it is more than 7 days away.
- A picture of the location, otherwise a default travel picture.
- Optionally information on flight, lodging, packing, and notes. These are just text fields the user enters.

## Project Details

The application calls several third party APIs where the data retreived from each has dependency on each other. For example, Weatherbit takes coordinates and not place names.

APIs used include:

- Geonames
- Weatherbit
- Pixabay

### Tech Stack

- Node.js, Express, Webpack, Sass, Service Workers, various supporting npm packages

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
