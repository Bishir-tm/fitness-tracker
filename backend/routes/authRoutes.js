const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser); // Register a new user
router.post("/login", loginUser); // Login a user

module.exports = router;
