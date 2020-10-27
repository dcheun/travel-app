// server.js
const PORT = process.env.PORT || 8081;

const app = require("./app");

// Setup Server
app.listen(PORT, () => {
  console.log(`Server started on localhost port ${PORT}`);
});
