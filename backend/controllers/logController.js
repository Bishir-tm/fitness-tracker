const Exercise = require("../models/Exercise");

// Create a new log
const createLog = async (req, res) => {
  const {
    day,
    typeOfExercise,
    duration,
    caloriesBurned,
    bloodPressure,
    heartRate,
    weight,
  } = req.body;

  try {
    const log = await Exercise.create({
      user: req.user._id,
      day,
      typeOfExercise,
      duration,
      caloriesBurned,
      bloodPressure,
      heartRate,
      weight,
    });

    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all logs for the logged-in user
const getUserLogs = async (req, res) => {
  try {
    const logs = await Exercise.find({ user: req.user._id });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a log
const updateLog = async (req, res) => {
  try {
    const log = await Exercise.findById(req.params.id);

    if (!log) return res.status(404).json({ message: "Log not found" });

    if (log.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to update this log" });
    }

    const updatedLog = await Exercise.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedLog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a log
const deleteLog = async (req, res) => {
  try {
    const log = await Exercise.findById(req.params.id);

    if (!log) return res.status(404).json({ message: "Log not found" });

    if (log.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this log" });
    }

    await log.remove();
    res.status(200).json({ message: "Log deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createLog, getUserLogs, updateLog, deleteLog };
