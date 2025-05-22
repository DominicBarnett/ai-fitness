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
        const res = await fetch('http://localhost:5000/api/workouts', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!res.ok) {
          throw new Error('Failed to fetch workouts');
        }

        const data = await res.json();
        console.log('Workouts data:', data); // Debug log
        // Ensure data is an array before dispatching
        const workoutsArray = Array.isArray(data) ? data : data.workouts || [];
        dispatch(fetchWorkoutsSuccess(workoutsArray));
      } catch (error) {
        console.error('Error fetching workouts:', error);
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

  // Safety check for workouts array
  if (!Array.isArray(workouts)) {
    console.error('Workouts is not an array:', workouts);
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600">Error: Invalid workouts data</div>
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
            {workouts.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No workouts available. Generate a workout from your profile page!
              </div>
            ) : (
              workouts.map((workout) => (
                <div
                  key={workout._id || workout.id}
                  className={`bg-white rounded-lg shadow-sm p-6 cursor-pointer transition-all duration-200 ${
                    selectedWorkout?._id === workout._id || selectedWorkout?.id === workout.id
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
              ))
            )}
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