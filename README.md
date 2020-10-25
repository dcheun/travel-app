# Travel Planner App

travel-app is travel planning application to help users plan and get information about places they will be visiting.

## Usage

Users enters the location and departure date, and the application will display:

- How many days is the trip from today.
- The weather forecast or what the typical normals are if it is more than 7 days away.
- A picture of the location, otherwise a default travel picture.

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
