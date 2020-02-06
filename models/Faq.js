const mongoose = require("mongoose");

const FaqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  order: {
    type: Number
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  author: String
});

module.exports = mongoose.model("Faq", FaqSchema);
