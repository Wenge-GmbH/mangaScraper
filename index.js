const express = require("express");
const scrape = require("./mangaScaper.js");

const app = express();

app.get("/", function (req, res) {
  res.send('Hello World');
});

scrape();

app.listen(3001, function () {
  console.log('Server running on port 3000');
});
