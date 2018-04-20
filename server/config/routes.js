var express = require("express");
var path = require("path");

let router = express.Router();

// default route
router.get("/", function(req, res) {
  res.sendFile(path.resolve(__dirname + "/../index.html"));
});

module.exports = router;
