const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/User");
const authenticateToken = require("../middleware/auth");

// ✅ GET: Protected Profile Route
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "Profile accessed", user });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile", details: err });
  }
});

// ✅ POST: Register Route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      message: "User registered",
      user: { username, email }
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: "Username or email already exists" });
    }
    res.status(500).json({ error: "Registration failed", details: err });
  }
});

// ✅ POST: Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "yashrs",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email, username: user.username }
    });
  } catch (err) {
    res.status(500).json({ error: "Login error", details: err });
  }
});

module.exports = router;
