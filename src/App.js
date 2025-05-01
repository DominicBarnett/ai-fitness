import React, { useState } from 'react';
import WorkoutGenerator from './features/workouts/WorkoutGenerator';
import ProfileForm from './features/profile/ProfileForm';
import HomePage from './features/home/HomePage';

function App() {
  const [currentStep, setCurrentStep] = useState(0); // 0: Home, 1: Profile, 2: Workout

  const renderContent = () => {
    switch (currentStep) {
      case 0:
        return <HomePage onGetStarted={() => setCurrentStep(1)} />;
      case 1:
        return <ProfileForm onComplete={() => setCurrentStep(2)} />;
      case 2:
        return <WorkoutGenerator onBack={() => setCurrentStep(1)} />;
      default:
        return <HomePage onGetStarted={() => setCurrentStep(1)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="w-full">
          <div className="flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">AI Fitness Coach</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => setCurrentStep(0)}
                className={`text-gray-600 hover:text-indigo-600 ${currentStep === 0 ? 'text-indigo-600 font-semibold' : ''}`}
              >
                Home
              </button>
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

      {/* Progress Steps - Only show when not on homepage */}
      {currentStep > 0 && (
        <div className="bg-white border-b">
          <div className="w-full">
            <div className="py-4 px-4 sm:px-6 lg:px-8">
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
      )}

      {/* Main Content */}
      <main className="w-full">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="w-full">
          <div className="py-12 px-4 sm:px-6 lg:px-8">
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
        </div>
      </footer>
    </div>
  );
}

export default App;
