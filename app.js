var express = require("express");
var mongoose = require("mongoose");
var env = require("dotenv").config();
var bodyParser = require("body-parser");
var routes = require("./server/config/routes");
var googleController = require("./server/controllers/googleController");
const twitterController = require("./server/controllers/twitterController");

// Model Requirements
require("./server/models/TweetSentiment");

var app = express();
var port = process.env.PORT || 8000;

googleController.authenticate();
twitterController.instantiateStream();

mongoose.connect(process.env.DATABASE, {
  useMongoClient: true
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

app.listen(port, function(req, res) {
  console.log("Listening on port: " + port);
});
