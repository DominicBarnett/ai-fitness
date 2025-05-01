import React, { useState } from 'react';
import { validateProfileData } from './profileUtils';

const ProfileForm = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    gender: '',
    fitnessLevel: 'beginner',
    goals: [],
    activityLevel: 'moderate',
    medicalConditions: '',
    availableEquipment: []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fitnessGoals = [
    'Weight Loss',
    'Muscle Gain',
    'Endurance',
    'Flexibility',
    'General Fitness'
  ];

  const equipmentOptions = [
    'None',
    'Dumbbells',
    'Resistance Bands',
    'Pull-up Bar',
    'Bench',
    'Full Home Gym'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const validation = validateProfileData(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    // TODO: Handle form submission
    console.log('Form submitted:', formData);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onComplete();
    }, 1000);
  };

  const handleGoalToggle = (goal) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleEquipmentToggle = (equipment) => {
    setFormData(prev => ({
      ...prev,
      availableEquipment: prev.availableEquipment.includes(equipment)
        ? prev.availableEquipment.filter(e => e !== equipment)
        : [...prev.availableEquipment, equipment]
    }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Fitness Profile</h2>
        <span className="text-sm text-gray-500">Step 1 of 2</span>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            <span className="text-sm text-indigo-600">Required</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                id="age"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
              {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
            </div>
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight (kg)</label>
              <input
                type="number"
                id="weight"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              />
              {errors.weight && <p className="mt-1 text-sm text-red-600">{errors.weight}</p>}
            </div>
            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-700">Height (cm)</label>
              <input
                type="number"
                id="height"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
              />
              {errors.height && <p className="mt-1 text-sm text-red-600">{errors.height}</p>}
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                id="gender"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Fitness Goals */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Fitness Goals</h3>
            <span className="text-sm text-gray-500">Select all that apply</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {fitnessGoals.map((goal) => (
              <div key={goal} className="relative flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id={goal}
                    checked={formData.goals.includes(goal)}
                    onChange={() => handleGoalToggle(goal)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor={goal} className="font-medium text-gray-700">
                    {goal}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fitness Level and Activity */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Fitness Level & Activity</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fitnessLevel" className="block text-sm font-medium text-gray-700">Current Fitness Level</label>
              <select
                id="fitnessLevel"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.fitnessLevel}
                onChange={(e) => setFormData({ ...formData, fitnessLevel: e.target.value })}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label htmlFor="activityLevel" className="block text-sm font-medium text-gray-700">Activity Level</label>
              <select
                id="activityLevel"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.activityLevel}
                onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value })}
              >
                <option value="sedentary">Sedentary</option>
                <option value="light">Light</option>
                <option value="moderate">Moderate</option>
                <option value="very">Very Active</option>
                <option value="extra">Extra Active</option>
              </select>
            </div>
          </div>
        </div>

        {/* Available Equipment */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Available Equipment</h3>
            <span className="text-sm text-gray-500">Select all that apply</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {equipmentOptions.map((equipment) => (
              <div key={equipment} className="relative flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id={equipment}
                    checked={formData.availableEquipment.includes(equipment)}
                    onChange={() => handleEquipmentToggle(equipment)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor={equipment} className="font-medium text-gray-700">
                    {equipment}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medical Conditions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Medical Conditions</h3>
            <span className="text-sm text-gray-500">Optional</span>
          </div>
          <div>
            <textarea
              id="medicalConditions"
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Please list any medical conditions or injuries that might affect your workout..."
              value={formData.medicalConditions}
              onChange={(e) => setFormData({ ...formData, medicalConditions: e.target.value })}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Draft
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Continue'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm; 