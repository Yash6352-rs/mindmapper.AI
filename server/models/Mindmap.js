const mongoose = require("mongoose");

const mindmapSchema = new mongoose.Schema({
  title: { type: String, required: true },
  nodes: { type: Array, default: [] },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Mindmap", mindmapSchema);
