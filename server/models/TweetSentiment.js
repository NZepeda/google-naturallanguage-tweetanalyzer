const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var TweetSentimentSchema = new Schema(
  {
    tweetText: {
      type: String,
      required: true
    },
    tweetSentimentScore: {
      type: Number,
      required: true
    },
    tweetSentimentMagnitude: {
      type: Number,
      required: false
    }
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("TweetSentiment", TweetSentimentSchema);
