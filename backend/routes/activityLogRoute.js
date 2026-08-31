const express = require('express');
const router = express.Router();
const ActivityLog = require('../models/ActivityLog');
const connectMongoDB = require('../config/mongoDb');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.get('/', protect, restrictTo('admin'), async (req, res) => {
  try {
    await connectMongoDB();
    const logs = await ActivityLog.find()
      .sort({ createdAt: -1 })
      .limit(100); 
    res.json(logs);
  } catch (err) {
    console.error('Error fetching activity logs:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;