const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getLogsByUser,
  getLogsByUserId,
  createLog,
} = require("../controllers/logController");

// GET logs for a specific user
router.get("/", protect, getLogsByUser);
router.get("/fetch-logs-by-id/:id", getLogsByUserId);

// POST create a new log
router.post("/", protect, createLog);

module.exports = router;
