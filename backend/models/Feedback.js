const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  feedback: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
