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
var app = express();
var port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(routes);

// Instantiate Google Credentials
googleController.authenticate();

require('./server/routes')(app);

if(process.env.NODE_ENV == 'production'){
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log("Listening on port: " + port);
});
