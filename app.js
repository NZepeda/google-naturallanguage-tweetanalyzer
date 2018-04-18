require('newrelic');
var express = require("express");
var mongoose = require("mongoose");
var env = require("dotenv").config();
var bodyParser = require("body-parser");
var routes = require("./server/config/routes");
var googleController = require("./server/controllers/googleController");
const twitterController = require("./server/controllers/twitterController");
const scheduler = require("node-schedule");

// Model Requirements
require("./server/models/TweetSentiment");

var app = express();
var port = process.env.PORT || 8000;

googleController.authenticate();
twitterController.getUserTweets();

mongoose.connect(process.env.DATABASE, {
  useMongoClient: true
});

var db = mongoose.connection;

db.on("error", function(error) {
  throw new Error("Unable to connect to the database");
});

// Set timer
const scheduleString =
  process.env.TWEET_MINUTE + " " + process.env.TWEET_HOUR + " * * *";

scheduler.scheduleJob(scheduleString, function() {
  // Call the function to analyze tweets and tweet the result
  twitterController.analyzeDailyTweets();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

app.listen(port, function(req, res) {
  console.log("Listening on port: " + port);
});
