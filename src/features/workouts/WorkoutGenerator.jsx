import React from 'react';

const WorkoutGenerator = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">AI Workout Generator</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-gray-600 mb-4">
          Your personalized workout plan will be generated based on your fitness goals and preferences.
        </p>
        {/* Workout generation form will be added here */}
      </div>
    </div>
  );
};

export default WorkoutGenerator; 