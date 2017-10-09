const Twitter = require("twitter");
const googleController = require("./googleController");
const env = require("dotenv").config();

const twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

exports.instantiateStream = function() {
  twitterClient.stream(
    "statuses/filter",
    { follow: process.env.TWITTER_WATCHER_ID },
    function(stream) {
      stream.on("data", function(tweet) {
        if (!tweetIsRetweeted(tweet.text) && tweeterIsFollowedTweeter(tweet)) {
          googleController.processTweet(tweet.text);
        }
      });

      stream.on("error", function(error) {
        console.log(error);
      });
    }
  );
};

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
