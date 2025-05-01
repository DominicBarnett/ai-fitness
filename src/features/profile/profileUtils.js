// Utility functions for profile management

export const calculateBMI = (weight, height) => {
  // Weight in kg, height in meters
  return weight / (height * height);
};

export const getFitnessLevel = (bmi, activityLevel) => {
  // Basic fitness level calculation based on BMI and activity level
  if (bmi < 18.5) return 'underweight';
  if (bmi >= 18.5 && bmi < 25) return 'normal';
  if (bmi >= 25 && bmi < 30) return 'overweight';
  return 'obese';
};

export const validateProfileData = (data) => {
  const errors = {};

  if (!data.name) {
    errors.name = 'Name is required';
  }

  if (!data.age) {
    errors.age = 'Age is required';
  } else if (isNaN(data.age) || data.age < 13 || data.age > 100) {
    errors.age = 'Please enter a valid age between 13 and 100';
  }

  if (!data.weight) {
    errors.weight = 'Weight is required';
  } else if (isNaN(data.weight) || data.weight < 30 || data.weight > 300) {
    errors.weight = 'Please enter a valid weight between 30 and 300 kg';
  }

  if (!data.height) {
    errors.height = 'Height is required';
  } else if (isNaN(data.height) || data.height < 100 || data.height > 250) {
    errors.height = 'Please enter a valid height between 100 and 250 cm';
  }

  if (!data.gender) {
    errors.gender = 'Gender is required';
  }

  if (data.goals.length === 0) {
    errors.goals = 'Please select at least one fitness goal';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}; 