const Language = require("@google-cloud/language");
const googleapi = require("googleapis");
const language = Language();
const mongoose = require("mongoose");
const TweetSentiment = require("../models/TweetSentiment");

exports.processTweet = function(text) {
  const document = {
    content: text,
    type: "PLAIN_TEXT"
  };

  language
    .analyzeSentiment({
      document: document,
      text: text
    })
    .then(function(results) {
      const sentiment = results[0].documentSentiment;
      storeTweetSentiment(text, sentiment);
    })
    .catch(function(err) {
      console.log("ERROR: ", err);
    });
};

exports.authenticate = function() {
  googleapi.auth.getApplicationDefault(function(err, authClient) {
    if (err) {
      console.log("ERROR:", err);
    } else {
      if (
        authClient.createScopedRequired &&
        authClient.createScopedRequired()
      ) {
        authClient = authClient.createScoped([
          "https://www.googleapis.com/auth/cloud-language"
        ]);
      }
    }
  });
};

function storeTweetSentiment(tweet, sentiment) {
  const newSentiment = new TweetSentiment({
    tweetText: tweet,
    tweetSentimentScore: sentiment.score,
    tweetSentimentMagnitude: sentiment.magnitude
  });

  newSentiment.save(function(error) {
    if (error) {
      console.log("ERROR: ", error.message);
    } else {
      console.log("Stored into database");
    }
  });
}
