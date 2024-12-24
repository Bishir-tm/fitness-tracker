const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  fetchFeedbacks,
  addFeedback,
} = require("../controllers/feedbackController");

// POST create a new feedback
router.post("/", protect, addFeedback);

// GET logs for a specific user
router.get("/", protect, fetchFeedbacks);

module.exports = router;
