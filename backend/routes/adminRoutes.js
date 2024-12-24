const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const {
  getUserLogsByAdmin,
  sendFeedback,
  updateRole,
} = require("../controllers/adminController");

const router = express.Router();

router.get("/user/:userId", protect, admin, getUserLogsByAdmin); // Get logs of a specific user
router.put("/user/update-role", protect, admin, updateRole); // Get logs of a specific user
router.post("/user/:userId/feedback", protect, admin, sendFeedback); // Send feedback to a user

module.exports = router;
