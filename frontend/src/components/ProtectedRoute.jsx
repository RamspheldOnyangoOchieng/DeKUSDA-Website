import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Loading from './common/Loading';

// Protected Route for authenticated users
export const ProtectedRoute = ({ children, requiredRole = null, fallback = null }) => {
  const { isAuthenticated, role, isLoading } = useAuth();

  if (isLoading) {
    return <Loading fullScreen text="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Authentication Required
          </h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in to access this page.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (requiredRole && role !== requiredRole && !(requiredRole === 'member' && role === 'admin')) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this page.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return children;
};

// Admin Only Route
export const AdminRoute = ({ children, fallback = null }) => {
  return (
    <ProtectedRoute requiredRole="admin" fallback={fallback}>
      {children}
    </ProtectedRoute>
  );
};

// Member Route (includes admin)
export const MemberRoute = ({ children, fallback = null }) => {
  return (
    <ProtectedRoute requiredRole="member" fallback={fallback}>
      {children}
    </ProtectedRoute>
  );
};

// Guest Route (redirect authenticated users)
export const GuestRoute = ({ children, redirectTo = '/' }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loading fullScreen text="Checking authentication..." />;
  }

  if (isAuthenticated) {
    window.location.href = redirectTo;
    return <Loading fullScreen text="Redirecting..." />;
  }

  return children;
};

export default ProtectedRoute;
