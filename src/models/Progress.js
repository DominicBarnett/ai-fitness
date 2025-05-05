const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  workout: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  completed: {
    type: Boolean,
    default: true
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  exercises: [{
    name: {
      type: String,
      required: true
    },
    sets: [{
      reps: Number,
      weight: Number,
      duration: Number, // in seconds
      completed: {
        type: Boolean,
        default: true
      }
    }]
  }],
  notes: String,
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  difficulty: {
    type: String,
    enum: ['too-easy', 'just-right', 'too-hard']
  },
  metrics: {
    caloriesBurned: Number,
    heartRate: {
      average: Number,
      max: Number
    },
    distance: Number // in kilometers
  },
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

// Index for efficient querying
progressSchema.index({ user: 1, date: -1 });
progressSchema.index({ workout: 1, date: -1 });

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress; 