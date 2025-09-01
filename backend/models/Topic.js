const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  pros: {
    type: String,
    required: true,
  },
  cons: {
    type: String,
    required: true,
  },
  url: {
    type: String, // link to original article
  },
  fullArticle: {
    type: String, // full article content
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Topic", topicSchema);