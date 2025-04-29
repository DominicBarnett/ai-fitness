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

export const validateProfileData = (profileData) => {
  const errors = {};
  
  if (!profileData.name) {
    errors.name = 'Name is required';
  }
  
  if (!profileData.age || profileData.age < 0) {
    errors.age = 'Valid age is required';
  }
  
  if (!profileData.weight || profileData.weight <= 0) {
    errors.weight = 'Valid weight is required';
  }
  
  if (!profileData.height || profileData.height <= 0) {
    errors.height = 'Valid height is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}; 