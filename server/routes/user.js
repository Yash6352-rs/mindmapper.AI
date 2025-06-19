const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const User = require('../models/User');
const Mindmap = require('../models/Mindmap');

// DELETE /users/me — delete account and all data
router.delete('/me', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const userDeleted = await User.findByIdAndDelete(userId);
    const mapsDeleted = await Mindmap.deleteMany({ userId });

    if (!userDeleted) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: 'Your account and all data have been deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete account.' });
  }
});
module.exports = router;
