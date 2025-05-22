const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

// Get user's workouts
router.get('/', async (req, res) => {
  console.log('GET /api/workouts - User:', req.user);
  try {
    const workouts = await Workout.find({ user: req.user._id });
    console.log('Found workouts:', workouts);
    res.json(workouts);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).json({ message: 'Error fetching workouts' });
  }
});

// Create new workout
router.post('/', async (req, res) => {
  console.log('POST /api/workouts - Request body:', req.body);
  try {
    const workout = new Workout({
      ...req.body,
      user: req.user._id
    });
    console.log('Creating workout:', workout);
    await workout.save();
    console.log('Workout saved successfully');
    res.status(201).json(workout);
  } catch (error) {
    console.error('Error creating workout:', error);
    res.status(500).json({ message: 'Error creating workout' });
  }
});

module.exports = router; 