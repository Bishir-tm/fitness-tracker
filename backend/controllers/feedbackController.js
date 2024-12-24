const Feedback = require("../models/Feedback");

// Add a new feedback
const addFeedback = async (req, res) => {
  try {
    const { userId, message } = req.body;

    if (!userId || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newFeedback = new Feedback({
      userId,
      message,
    });

    const savedFeedback = await newFeedback.save();
    return res.status(201).json(savedFeedback);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Failed to create feedback", error: error.message });
  }
};

// Fetch feedbacks for a specific user
const fetchFeedbacks = async (req, res) => {
  try {
    const userId = req.body.user._id;
    const feedbacks = await Feedback.find({ userId: userId }).sort({
      date: -1,
    });
    return res.status(200).json(feedbacks);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch feedback", error: error.message });
  }
};

module.exports = {
  addFeedback,
  fetchFeedbacks,
};
