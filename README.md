# Travel Planner App

travel-app is travel planning application to help users plan and get information about places they will be visiting.

This application is deployed to and hosted on [Heroku](https://dc-travel-planner.herokuapp.com/).

## Usage

Users enters the location and departure date in the input fields provided. Users can also optionally enter flight, lodging, packing list, and notes infomration. However, these extra fields are simply test fields. Once the information is submitted, the application will fetch the required data and dynamically update the UI.

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
