import React, { useState } from 'react';
import { validateWorkoutPreferences } from './workoutUtils';

const WorkoutGenerator = ({ onBack }) => {
  const [preferences, setPreferences] = useState({
    workoutType: '',
    duration: '30',
    daysPerWeek: '3',
    preferredTime: 'morning',
    intensityLevel: 'moderate',
    focusAreas: []
  });

  const [errors, setErrors] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const focusAreas = [
    'Upper Body',
    'Lower Body',
    'Core',
    'Cardio',
    'Flexibility',
    'Full Body'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    
    const validation = validateWorkoutPreferences(preferences);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsGenerating(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setGeneratedPlan({
        weeklySchedule: [
          {
            day: 'Monday',
            workout: 'Upper Body Strength',
            duration: '45 min',
            exercises: [
              { name: 'Push-ups', sets: 3, reps: '12-15' },
              { name: 'Dumbbell Rows', sets: 3, reps: '12-15' },
              { name: 'Shoulder Press', sets: 3, reps: '10-12' }
            ]
          },
          {
            day: 'Wednesday',
            workout: 'Lower Body Focus',
            duration: '45 min',
            exercises: [
              { name: 'Squats', sets: 4, reps: '12-15' },
              { name: 'Lunges', sets: 3, reps: '12 each leg' },
              { name: 'Calf Raises', sets: 3, reps: '15-20' }
            ]
          },
          {
            day: 'Friday',
            workout: 'Full Body Circuit',
            duration: '40 min',
            exercises: [
              { name: 'Burpees', sets: 3, reps: '10' },
              { name: 'Mountain Climbers', sets: 3, reps: '30 sec' },
              { name: 'Plank', sets: 3, reps: '45 sec' }
            ]
          }
        ]
      });
      setIsGenerating(false);
    }, 2000);
  };

  const handleFocusAreaToggle = (area) => {
    setPreferences(prev => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(area)
        ? prev.focusAreas.filter(a => a !== area)
        : [...prev.focusAreas, area]
    }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Generate Workout Plan</h2>
        <span className="text-sm text-gray-500">Step 2 of 2</span>
      </div>

      {!generatedPlan ? (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Workout Type */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Workout Type</h3>
              <span className="text-sm text-indigo-600">Required</span>
            </div>
            <div>
              <select
                id="workoutType"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={preferences.workoutType}
                onChange={(e) => setPreferences({ ...preferences, workoutType: e.target.value })}
              >
                <option value="">Select workout type</option>
                <option value="strength">Strength Training</option>
                <option value="cardio">Cardio</option>
                <option value="hiit">HIIT</option>
                <option value="flexibility">Flexibility & Mobility</option>
                <option value="mixed">Mixed Training</option>
              </select>
              {errors.workoutType && <p className="mt-1 text-sm text-red-600">{errors.workoutType}</p>}
            </div>
          </div>

          {/* Duration and Frequency */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Duration & Frequency</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Workout Duration (minutes)</label>
                <select
                  id="duration"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={preferences.duration}
                  onChange={(e) => setPreferences({ ...preferences, duration: e.target.value })}
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </div>
              <div>
                <label htmlFor="daysPerWeek" className="block text-sm font-medium text-gray-700">Days per Week</label>
                <select
                  id="daysPerWeek"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={preferences.daysPerWeek}
                  onChange={(e) => setPreferences({ ...preferences, daysPerWeek: e.target.value })}
                >
                  <option value="2">2 days</option>
                  <option value="3">3 days</option>
                  <option value="4">4 days</option>
                  <option value="5">5 days</option>
                </select>
              </div>
            </div>
          </div>

          {/* Preferred Time and Intensity */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700">Preferred Time</label>
                <select
                  id="preferredTime"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={preferences.preferredTime}
                  onChange={(e) => setPreferences({ ...preferences, preferredTime: e.target.value })}
                >
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
              <div>
                <label htmlFor="intensityLevel" className="block text-sm font-medium text-gray-700">Intensity Level</label>
                <select
                  id="intensityLevel"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={preferences.intensityLevel}
                  onChange={(e) => setPreferences({ ...preferences, intensityLevel: e.target.value })}
                >
                  <option value="light">Light</option>
                  <option value="moderate">Moderate</option>
                  <option value="intense">Intense</option>
                </select>
              </div>
            </div>
          </div>

          {/* Focus Areas */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Focus Areas</h3>
              <span className="text-sm text-gray-500">Select all that apply</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {focusAreas.map((area) => (
                <div key={area} className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      id={area}
                      checked={preferences.focusAreas.includes(area)}
                      onChange={() => handleFocusAreaToggle(area)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor={area} className="font-medium text-gray-700">
                      {area}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Back
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Preferences
            </button>
            <button
              type="submit"
              disabled={isGenerating}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? 'Generating...' : 'Generate Plan'}
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-indigo-50">
              <h3 className="text-lg font-medium text-indigo-900">Your Weekly Workout Plan</h3>
              <p className="mt-1 text-sm text-indigo-700">
                Based on your preferences, we've created a personalized workout schedule.
              </p>
            </div>
            <div className="border-t border-gray-200">
              {generatedPlan.weeklySchedule.map((day, index) => (
                <div key={day.day} className={`px-4 py-5 sm:px-6 ${index !== 0 ? 'border-t border-gray-200' : ''}`}>
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-medium text-gray-900">{day.day}</h4>
                    <span className="text-sm text-gray-500">{day.duration}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{day.workout}</p>
                  <div className="mt-4 space-y-3">
                    {day.exercises.map((exercise, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">{exercise.name}</span>
                        <span className="text-gray-500">{exercise.sets} sets × {exercise.reps}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setGeneratedPlan(null)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Generate New Plan
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Plan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutGenerator; 