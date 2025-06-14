const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware order matters: these first
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require("./routes/auth.routes");
const mindmapRoutes = require("./routes/mindmap.routes");

// Route registration
app.use("/api/auth", authRoutes);
app.use("/api/mindmaps", mindmapRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("MindMapper Backend Running 🎉");
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected");
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch((err) => console.error("❌ MongoDB connection failed:", err));