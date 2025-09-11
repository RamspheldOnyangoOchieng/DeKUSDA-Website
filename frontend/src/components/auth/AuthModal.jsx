import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthModal = ({ isOpen, onClose, initialForm = 'login' }) => {
  const [currentForm, setCurrentForm] = useState(initialForm);

  if (!isOpen) return null;

  const toggleForm = () => {
    setCurrentForm(currentForm === 'login' ? 'register' : 'login');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h1 className="text-xl font-semibold text-gray-800">
            {currentForm === 'login' ? 'Sign In' : 'Create Account'}
          </h1>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {currentForm === 'login' ? (
            <LoginForm onToggleForm={toggleForm} onClose={onClose} />
          ) : (
            <RegisterForm onToggleForm={toggleForm} onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
