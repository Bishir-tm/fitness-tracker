const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createLog,
  getUserLogs,
  updateLog,
  deleteLog,
} = require("../controllers/logController");

const router = express.Router();

router
  .route("/")
  .post(protect, createLog) // Create a new log
  .get(protect, getUserLogs); // Get logs for the logged-in user

router
  .route("/:id")
  .put(protect, updateLog) // Update a log
  .delete(protect, deleteLog); // Delete a log

module.exports = router;
