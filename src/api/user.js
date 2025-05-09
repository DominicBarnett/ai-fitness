const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  try {
    const { name, email, profile } = req.body;
    const user = await User.findById(req.user._id);
    
    if (name) user.name = name;
    if (email) user.email = email;
    if (profile) user.profile = { ...user.profile, ...profile };
    
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user profile' });
  }
});

module.exports = router; 