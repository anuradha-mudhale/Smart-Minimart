const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const app = require("./app");

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});