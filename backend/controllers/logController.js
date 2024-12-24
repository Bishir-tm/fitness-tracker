const Log = require("../models/Log");

// Fetch logs for a specific user
const getLogsByUser = async (req, res) => {
  try {
    const { userId } = req.params.userId ? req.params : req.body.user;
    const logs = await Log.find({ user: userId }).sort({ date: -1 });
    return res.status(200).json(logs);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch logs", error: error.message });
  }
};

// Fetch logs by specific user id (admin only)
const getLogsByUserId = async (req, res) => {
  try {
    const userId = req.params;
    const logs = await Log.find({ userId: userId.id }).sort({ date: -1 });
    return res.status(200).json(logs);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch logs", error: error.message });
  }
};

// Add a new log
const createLog = async (req, res) => {
  try {
    const {
      exerciseType,
      bloodPressure,
      heartRate,
      weight,
      duration,
      caloriesBurned,
    } = req.body;

    const userId = req.body.user.id;
    if (
      !userId ||
      !exerciseType ||
      !bloodPressure ||
      !heartRate ||
      !weight ||
      !duration ||
      !caloriesBurned
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newLog = new Log({
      userId,
      exerciseType,
      bloodPressure,
      heartRate,
      weight,
      duration,
      caloriesBurned,
    });

    const savedLog = await newLog.save();
    return res.status(201).json(savedLog);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to create log", error: error.message });
  }
};

module.exports = {
  getLogsByUser,
  getLogsByUserId,
  createLog,
};
