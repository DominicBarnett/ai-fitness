import React, { useState } from 'react';
import WorkoutGenerator from './features/workouts/WorkoutGenerator';
import ProfileForm from './features/profile/ProfileForm';

function App() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">AI Fitness Coach</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button className="text-gray-600 hover:text-indigo-600">Dashboard</button>
              <button className="text-gray-600 hover:text-indigo-600">Workouts</button>
              <button className="text-gray-600 hover:text-indigo-600">Progress</button>
              <button className="text-gray-600 hover:text-indigo-600">Profile</button>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-indigo-600 hover:text-indigo-800">Sign In</button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Sign Up</button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-center space-x-8">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  1
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= 1 ? 'text-indigo-600' : 'text-gray-500'
                }`}>
                  Profile
                </span>
              </div>
              <div className="flex-1 h-0.5 bg-gray-200">
                <div className={`h-full bg-indigo-600 transition-all duration-300 ${
                  currentStep >= 2 ? 'w-full' : 'w-0'
                }`} />
              </div>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  2
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= 2 ? 'text-indigo-600' : 'text-gray-500'
                }`}>
                  Workout Plan
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              {currentStep === 1 ? (
                <ProfileForm onComplete={() => setCurrentStep(2)} />
              ) : (
                <WorkoutGenerator onBack={() => setCurrentStep(1)} />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">AI Fitness Coach</h3>
              <p className="text-gray-400">Your personal AI-powered fitness companion</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Personalized Workouts</li>
                <li>Progress Tracking</li>
                <li>AI Recommendations</li>
                <li>Custom Plans</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Blog</li>
                <li>Help Center</li>
                <li>Community</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
