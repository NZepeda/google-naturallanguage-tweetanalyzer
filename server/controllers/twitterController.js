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

exports.getUserTweets = async (req, res) => {
  let handle = req.query.handle.replace('@', '');

  twitterClient.get('statuses/user_timeline', {screen_name: handle, count: 3}, (err, results) => {
    if(err){
      res.status(500).send({error: err.message, data: null})
    }
    else{
      let tweets = results.map(tweet => tweet.text)

      googleController.analyzeTweetSentiments(tweets).then(response => {
        res.status(200).send({error: null, data: response});
      }).catch(err => {
        res.status(500).send({error: err.message, data: null});
      });
    }
  });
}

