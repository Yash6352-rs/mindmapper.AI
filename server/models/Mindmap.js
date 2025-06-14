const mongoose = require("mongoose");

const mindmapSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  nodes: [
    {
      id: String,
      content: String,
      parent: String,
      position: {
        x: Number,
        y: Number
      }
    }
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("Mindmap", mindmapSchema);
