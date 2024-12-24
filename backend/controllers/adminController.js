const Exercise = require("../models/Log");
const Feedback = require("../models/Feedback");
const User = require("../models/User");

// Get all logs of a specific user
const getUserLogsByAdmin = async (req, res) => {
  try {
    const logs = await Exercise.find({ user: req.params.userId });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRole = async (req, res) => {
  const { userId, role } = req.body;

  if (!userId || !role) {
    return res.status(400).json({ message: "User ID and role are required" });
  }

  try {
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Role updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Send feedback to a user
const sendFeedback = async (req, res) => {
  const { feedback } = req.body;

  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newFeedback = await Feedback.create({
      admin: req.user._id,
      user: req.params.userId,
      feedback,
    });

    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserLogsByAdmin, sendFeedback, updateRole };
