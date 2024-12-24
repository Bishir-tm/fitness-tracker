const express = require("express");
const {
  registerUser,
  loginUser,
  fetchAllUsers,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser); // Register a new user
router.post("/login", loginUser); // Login a user
router.get("/fetch-all-users", fetchAllUsers); // Login a user

module.exports = router;
