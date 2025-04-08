const express = require('express');
const auth = require('../middleware/auth');
const Guest = require('../models/Guest');
const router = express.Router();

// Protected route - requires valid JWT
router.get('/', auth, async (req, res) => {
  try {
    const guests = await Guest.find();
    res.json(guests);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;