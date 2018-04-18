const Twitter = require("twitter");
const googleController = require("./googleController");
const env = require("dotenv").config();
const mongoose = require("mongoose");
const TweetSentiment = require("../models/TweetSentiment");
const DailySentiment = require("../models/DailySentiment");
const _ = require("lodash");

const twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

exports.instantiateStream = () => {
  twitterClient.stream("statuses/filter", { follow: process.env.TWITTER_WATCHER_ID }, (stream) => {
      stream.on("data", (tweet) => {
        if (!tweetIsRetweeted(tweet.text) && tweeterIsFollowedTweeter(tweet)) {
          googleController.processTweet(tweet.text);
        }
      });

      stream.on("error", (error) => {
        console.log(error);
      });
    }
  );
};

exports.getUserTweets = () => {

  twitterClient.get('statuses/user_timeline', {screen_name: 'elonmusk'}, (err, results) => {

    let tweets = results.map(tweet => tweet.text)
    googleController.analyzeTweetSentiments(tweets)

  });
}

exports.analyzeDailyTweets = () => {
  TweetSentiment.findTweetsFromPreviousDay((err, tweets) => {
    let average = _.meanBy(tweets, "tweetSentimentScore");
    let sentiment = googleController.calculateSentimentRange(average);

    const newDailySentiment = storeDailyTweetResults(
      average,
      sentiment,
      _.size(tweets)
    );
    createNewTweet(newDailySentiment);
  });
};

function createNewTweet(newDailySentiment) {
  const newTweet =
    "Today Trump tweeted " +
    newDailySentiment.timesTweeted +
    " times today and his overall mood was " +
    newDailySentiment.overallMood +
    ".";

  twitterClient.post("statuses/update", { status: newTweet }, ( error, tweet, response) => {
    if (!error) {
      console.log("Succesfully created a new tweet: " + tweet.text);
    }
  });
}

function storeDailyTweetResults(average, sentiment, numTweets) {
  const newDailySentiment = new DailySentiment({
    dailySentimentScore: average,
    overallMood: sentiment,
    timesTweeted: numTweets
  });

  newDailySentiment.save(function(error) {
    if (error) {
      console.log("ERROR: ", error.message);
    } else {
      console.log("Stored new daily sentiment average");
    }
  });

  return newDailySentiment;
}

function tweetIsRetweeted(tweet) {
  if (tweet.includes("RT")) {
    return true;
  }

  return false;
}

function tweeterIsFollowedTweeter(tweet) {
  const userId = parseInt(tweet.user.id);
  const envUserId = parseInt(process.env.TWITTER_WATCHER_ID);

  if (userId == envUserId) {
    return true;
  }
  return false;
}
