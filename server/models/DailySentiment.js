const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var DailySentimentSchema = new Schema(
  {
    dailySentimentScore: {
      type: Number,
      required: true
    },
    overallMood: {
      type: String,
      required: true
    },
    timesTweeted: Number
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("DailySentiment", DailySentimentSchema);
