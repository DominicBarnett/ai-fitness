const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get user profile
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

// Update user profile
router.put('/', async (req, res) => {
  try {
    const { profile } = req.body;
    const user = await User.findById(req.user._id);
    
    if (profile) {
      user.profile = { ...user.profile, ...profile };
      await user.save();
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
});

module.exports = router; 