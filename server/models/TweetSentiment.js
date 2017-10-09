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

TweetSentimentSchema.statics.findTweetsFromPreviousDay = function(cb) {
  // Return objects inserted in the last 24 hours
  // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds gives us the amount
  // of seconds that have passed since insertion
  return this.find(
    {
      created_at: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    },
    cb
  );
};

module.exports = mongoose.model("TweetSentiment", TweetSentimentSchema);
