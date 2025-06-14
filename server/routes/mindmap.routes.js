const express = require("express");
const router = express.Router();
const Mindmap = require("../models/Mindmap");

// Create mindmap
router.post("/", async (req, res) => {
  try {
    const newMindmap = new Mindmap(req.body);
    await newMindmap.save();
    res.status(201).json(newMindmap);
  } catch (err) {
    res.status(400).json({ error: "Create failed", details: err });
  }
});

// Get all mindmaps by user
router.get("/:userId", async (req, res) => {
  try {
    const maps = await Mindmap.find({ userId: req.params.userId });
    res.json(maps);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

// Delete a mindmap
router.delete("/:id", async (req, res) => {
  try {
    await Mindmap.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;
