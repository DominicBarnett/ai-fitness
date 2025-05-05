const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please provide a workout name'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Please specify workout type'],
    enum: ['strength', 'cardio', 'flexibility', 'hiit', 'custom']
  },
  duration: {
    type: Number, // in minutes
    required: [true, 'Please specify workout duration']
  },
  exercises: [{
    name: {
      type: String,
      required: true
    },
    sets: {
      type: Number,
      required: true
    },
    reps: {
      type: Number,
      required: true
    },
    weight: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number, // in seconds
      default: 0
    },
    rest: {
      type: Number, // in seconds
      default: 60
    }
  }],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  targetMuscles: [{
    type: String,
    enum: ['chest', 'back', 'shoulders', 'arms', 'legs', 'core', 'full-body']
  }],
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout; 