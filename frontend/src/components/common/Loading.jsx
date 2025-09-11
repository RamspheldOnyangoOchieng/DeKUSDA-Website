import React from 'react';

const Loading = ({ 
  size = 'medium', 
  text = 'Loading...', 
  fullScreen = false,
  className = ''
}) => {
  const sizes = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  const textSizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className={`animate-spin rounded-full border-4 border-gray-200 border-t-blue-600 ${sizes[size]}`}></div>
      {text && (
        <p className={`text-gray-600 ${textSizes[size]}`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      <LoadingSpinner />
    </div>
  );
};

export default Loading;
