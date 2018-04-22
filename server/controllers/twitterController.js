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

  twitterClient.get('statuses/user_timeline', {screen_name: handle, count: 100}, (err, results) => {
    if(err){
      res.status(500).send({error: err.message, data: null})
    }
    else{
      let userInfo = {
        image: results[0].user.profile_image_url,
        handle: results[0].user.screen_name,
        name: results[0].user.name
      }
      let tweets = results.map(tweet => tweet.text)

      googleController.analyzeTweetSentiments(tweets).then(response => {
        let average = getAverageSentimentScore(response);
        let mood = googleController.calculateSentimentRange(average)
        let buckets = getMoodBuckets(response);
        let data = {
          userInfo: userInfo,
          sentiments: response,
          averageScore: average,
          overallMood: mood,
          buckets: buckets
        }
        res.status(200).send({error: null, data: data});
      }).catch(err => {
        res.status(500).send({error: err.message, data: null});
      });
    }
  });
}

const getAverageSentimentScore = (sentiments) => {
  let average = 0;
  sentiments.forEach((sentiment) => {
    average += sentiment[0].documentSentiment.score;
  });
  
  return average / sentiments.length;
}

const getMoodBuckets = (sentiments) => {
  let  buckets = {
    'positive': 0,
    'negative': 0,
    'normal': 0,
    'unknown': 0
  }

  sentiments.forEach(sentiment => {
    let sentimentScore = sentiment[0].documentSentiment.score;

    if(sentimentScore >= 0.15){
      buckets['positive'] += 1
    }
    else if(sentimentScore > -0.25 && sentimentScore < 0.15){
      buckets['normal'] += 1
    }
    else if(sentimentScore <= -0.25){
      buckets['negative'] += 1
    }
    else{
      buckets['unknown'] += 1
    }
  });

  return buckets;
}
