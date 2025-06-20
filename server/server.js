const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
    origin: "https://mindmapper-ai-omega.vercel.app",
    credentials: true,
  })
);
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth.routes");
const mindmapRoutes = require("./routes/mindmap.routes");
const userRoutes = require("./routes/user");
const aiRoutes = require("./routes/ai-routes");

app.use("/api", authRoutes);
app.use("/api/mindmaps", mindmapRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ai", aiRoutes);

// Root test route
app.get("/", (req, res) => {
  res.send("MindMapper Backend Running 🎉");
});

// Connect to DB and start server
const PORT = process.env.PORT || 10000;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected");
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch((err) => console.error("❌ MongoDB connection failed:", err));
