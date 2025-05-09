import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WorkoutGenerator from './features/workouts/WorkoutGenerator';
import ProfileForm from './features/profile/ProfileForm';
import HomePage from './features/home/HomePage';
import SignIn from './features/auth/SignIn';
import SignUp from './features/auth/SignUp';
import WorkoutsPage from './features/workouts/WorkoutsPage';
import ProfilePage from './features/profile/ProfilePage';
import { loginSuccess, logout } from './store/slices/authSlice';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [currentStep, setCurrentStep] = useState(0); // 0: Home, 1: Profile, 2: Workouts
  const [authStep, setAuthStep] = useState(null); // null: none, 'signin': sign in, 'signup': sign up

  const handleSignIn = (data) => {
    dispatch(loginSuccess(data));
    setAuthStep(null);
    setCurrentStep(1); // Go to profile after sign in
  };

  const handleSignUp = (data) => {
    dispatch(loginSuccess(data));
    setAuthStep(null);
    setCurrentStep(1); // Go to profile after sign up
  };

  const handleSignOut = () => {
    dispatch(logout());
    setCurrentStep(0);
  };

  const renderContent = () => {
    if (authStep === 'signin') {
      return <SignIn 
        onSignIn={handleSignIn} 
        onSwitchToSignUp={() => setAuthStep('signup')} 
        onBackToHome={() => {
          setAuthStep(null);
          setCurrentStep(0);
        }}
      />;
    }
    if (authStep === 'signup') {
      return <SignUp 
        onSignUp={handleSignUp} 
        onSwitchToSignIn={() => setAuthStep('signin')} 
        onBackToHome={() => {
          setAuthStep(null);
          setCurrentStep(0);
        }}
      />;
    }

    switch (currentStep) {
      case 0:
        return <HomePage onGetStarted={() => setCurrentStep(1)} />;
      case 1:
        return <ProfilePage />;
      case 2:
        return <WorkoutsPage />;
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
              <button 
                onClick={() => setCurrentStep(2)}
                className={`text-gray-600 hover:text-indigo-600 ${currentStep === 2 ? 'text-indigo-600 font-semibold' : ''}`}
              >
                Workouts
              </button>
              <button 
                onClick={() => setCurrentStep(1)}
                className={`text-gray-600 hover:text-indigo-600 ${currentStep === 1 ? 'text-indigo-600 font-semibold' : ''}`}
              >
                Profile
              </button>
            </nav>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">Welcome, {user.name}</span>
                  <button 
                    onClick={handleSignOut}
                    className="px-4 py-2 text-indigo-600 hover:text-indigo-800"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => setAuthStep('signin')}
                    className="px-4 py-2 text-indigo-600 hover:text-indigo-800"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => setAuthStep('signup')}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps - Only show when not on homepage and not in auth */}
      {currentStep > 0 && !authStep && (
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
