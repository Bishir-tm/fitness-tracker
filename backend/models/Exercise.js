const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  day: { type: String, required: true }, // Monday to Sunday
  typeOfExercise: { type: String, required: true },
  duration: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  bloodPressure: { type: String },
  heartRate: { type: Number },
  weight: { type: Number, required: true },
});

module.exports = mongoose.model("Exercise", exerciseSchema);
