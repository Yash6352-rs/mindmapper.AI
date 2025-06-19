const express = require("express");
const router = express.Router();
const Mindmap = require("../models/Mindmap");
const authenticateToken = require("../middleware/auth");

// CREATE a new mindmap
router.post("/", authenticateToken, async (req, res) => {
  const { title, nodes = [], thought = "", mood = "" } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  try {
    const newMap = new Mindmap({
      title, nodes, thought, mood,
      userId: req.user._id
    });
    await newMap.save();
    res.status(201).json(newMap);
  } catch (err) {
    console.error("Error saving:", err);
    res.status(500).json({ error: "Failed to save mindmap", details: err.message });
  }
});

// GET all mindmaps for logged-in user
router.get("/", authenticateToken, async (req, res) => {
  try {
    const mindmaps = await Mindmap.find({ userId: req.user._id });
    res.json(mindmaps);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch mindmaps", details: err.message });
  }
});

// UPDATE a mindmap
router.put("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, nodes, thought, mood } = req.body;

  try {
    const updated = await Mindmap.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { title, nodes, thought, mood },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Mindmap not found" });
    }

    res.json({ message: "Mindmap updated", mindmap: updated });
  } catch (err) {
    res.status(500).json({ error: "Update failed", details: err.message });
  }
});

// DELETE a mindmap
router.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Mindmap.findOneAndDelete({ _id: id, userId: req.user._id });

    if (!deleted) {
      return res.status(404).json({ error: "Mindmap not found" });
    }

    res.json({ message: "Mindmap deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed", details: err.message });
  }
});

module.exports = router;
