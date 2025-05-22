const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['AI Generated', 'Custom', 'Preset'],
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
  },
  duration: {
    type: String,
    required: true,
  },
  equipment: [{
    type: String,
  }],
  exercises: [{
    name: String,
    sets: Number,
    reps: Number,
    duration: String,
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Workout', workoutSchema); 