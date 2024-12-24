const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assumes a User model exists
      required: true,
    },
    exerciseType: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, // Duration in minutes
      required: true,
    },
    weight: {
      type: Number, // Duration in minutes
      required: true,
    },
    caloriesBurned: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Log", logSchema);
