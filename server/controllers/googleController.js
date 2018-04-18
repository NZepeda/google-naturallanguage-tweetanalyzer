const Language = require("@google-cloud/language");
const googleapi = require("googleapis");
const language = Language();
const mongoose = require("mongoose");
const TweetSentiment = require("../models/TweetSentiment");
const _ = require("lodash");

exports.processTweet = function(text) {
  const document = {
    content: text,
    type: "PLAIN_TEXT"
  };

  language.analyzeSentiment({document: document, txt: text})
    .then((results) => {
      const sentiment = results[0].documentSentiment;
      storeTweetSentiment(text, sentiment);
    })
    .catch((err) => {
      console.log("ERROR: ", err);
    });
};

exports.analyzeTweetSentiments = (tweets) =>{

  for(i in tweets){
    const document = {
      content: tweets[i],
      type: 'PLAIN_TEXT'
    }

    language.analyzeSentiment({document: document, txt: tweets[i]}).then((results)=>{
      const sentiment = results[0].documentSentiment;
      console.log(sentiment)
    }).catch((err) => {
      console.log("Error: " + err.message)
    });
  }
}

exports.authenticate = () => {
  googleapi.auth.getApplicationDefault((err, authClient) => {
    if (err) {
      console.log("ERROR:", err);
    } else {
      if (authClient.createScopedRequired &&authClient.createScopedRequired()) {

        authClient = authClient.createScoped([
          "https://www.googleapis.com/auth/cloud-language"
        ]);
      }
    }
  });
};

exports.calculateSentimentRange = function(averageSentimentScore) {
  console.log("Sentiment score: ", averageSentimentScore);
  // Sentiments between -1 and -0.25 are negative
  if (_.inRange(averageSentimentScore, -1.01, -0.25)) {
    return "negative";
  }

  // Sentiments between -.24 and 0.25 are average
  if (_.inRange(averageSentimentScore, -0.2499, 0.25)) {
    return "average";
  }

  // Sentiments greater than .2501 but less than 1 are positive
  if (_.inRange(averageSentimentScore, 0.2501, 1.01)) {
    return "positive";
  }

  // Anything that is not within the range is unknown
  return "unknown";
};

function storeTweetSentiment(tweet, sentiment) {
  const newSentiment = new TweetSentiment({
    tweetText: tweet,
    tweetSentimentScore: sentiment.score,
    tweetSentimentMagnitude: sentiment.magnitude
  });

  newSentiment.save((error) => {
    if (error) {
      console.log("ERROR: ", error.message);
    } else {
      console.log("Stored into database");
    }
  });
}
