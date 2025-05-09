import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchWorkoutsStart,
  fetchWorkoutsSuccess,
  fetchWorkoutsFailure,
  selectWorkout,
} from '../../store/slices/workoutSlice';

function WorkoutsPage() {
  const dispatch = useDispatch();
  const { workouts, selectedWorkout, loading, error } = useSelector((state) => state.workout);

  useEffect(() => {
    const fetchWorkouts = async () => {
      dispatch(fetchWorkoutsStart());
      try {
        // Mock API call - replace with actual API call
        const mockWorkouts = [
          {
            id: 1,
            title: 'Full Body Strength',
            duration: '45 min',
            difficulty: 'Intermediate',
            exercises: [
              { name: 'Push-ups', sets: 3, reps: 12 },
              { name: 'Squats', sets: 3, reps: 15 },
              { name: 'Plank', sets: 3, duration: '30 sec' },
              { name: 'Lunges', sets: 3, reps: 10 },
            ],
            description: 'A comprehensive full-body workout targeting all major muscle groups.',
          },
          {
            id: 2,
            title: 'HIIT Cardio',
            duration: '30 min',
            difficulty: 'Advanced',
            exercises: [
              { name: 'Jumping Jacks', sets: 4, duration: '45 sec' },
              { name: 'Mountain Climbers', sets: 4, duration: '30 sec' },
              { name: 'Burpees', sets: 4, reps: 10 },
              { name: 'High Knees', sets: 4, duration: '45 sec' },
            ],
            description: 'High-intensity interval training to boost cardiovascular fitness.',
          },
          {
            id: 3,
            title: 'Core Crusher',
            duration: '25 min',
            difficulty: 'Beginner',
            exercises: [
              { name: 'Crunches', sets: 3, reps: 15 },
              { name: 'Russian Twists', sets: 3, reps: 20 },
              { name: 'Leg Raises', sets: 3, reps: 12 },
              { name: 'Plank', sets: 3, duration: '45 sec' },
            ],
            description: 'Focus on strengthening and toning your core muscles.',
          },
        ];
        dispatch(fetchWorkoutsSuccess(mockWorkouts));
      } catch (error) {
        dispatch(fetchWorkoutsFailure(error.message));
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading workouts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Workout List */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Workouts</h2>
          <div className="space-y-4">
            {workouts.map((workout) => (
              <div
                key={workout.id}
                className={`bg-white rounded-lg shadow-sm p-6 cursor-pointer transition-all duration-200 ${
                  selectedWorkout?.id === workout.id
                    ? 'ring-2 ring-indigo-500'
                    : 'hover:shadow-md'
                }`}
                onClick={() => dispatch(selectWorkout(workout))}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{workout.title}</h3>
                    <p className="text-gray-600 mt-1">{workout.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-sm bg-indigo-100 text-indigo-800 rounded-full">
                      {workout.duration}
                    </span>
                    <span className="px-2 py-1 text-sm bg-gray-100 text-gray-800 rounded-full">
                      {workout.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workout Details */}
        <div className="lg:col-span-1">
          {selectedWorkout ? (
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{selectedWorkout.title}</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Duration: {selectedWorkout.duration}</span>
                  <span>Difficulty: {selectedWorkout.difficulty}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Exercises</h4>
                  <div className="space-y-3">
                    {selectedWorkout.exercises.map((exercise, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-700">{exercise.name}</span>
                        <span className="text-gray-600">
                          {exercise.reps ? `${exercise.sets} × ${exercise.reps} reps` : `${exercise.sets} × ${exercise.duration}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="w-full mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                  Start Workout
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-500">
              Select a workout to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkoutsPage; 