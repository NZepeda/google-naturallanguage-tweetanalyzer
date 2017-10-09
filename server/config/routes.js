var express = require("express");
var path = require("path");

let router = express.Router();
// const googleController = require("../controllers/googleController");

// default route
router.get("/", function(req, res) {
  res.sendFile(path.resolve(__dirname + "/../index.html"));
});

// router.get("/analyzesentiment", googleController.processTweet);

module.exports = router;
