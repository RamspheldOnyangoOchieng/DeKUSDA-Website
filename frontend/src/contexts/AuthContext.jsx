import React, { createContext, useContext, useReducer, useEffect } from 'react';
import authService from '../services/authService';

// Initial state
const initialState = {
  user: null,
  role: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
};

// Action types
const AUTH_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_USER: 'SET_USER',
  SET_ERROR: 'SET_ERROR',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload.user,
        role: action.payload.role,
        isAuthenticated: !!action.payload.user,
        isLoading: false,
        error: null
      };
    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        role: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      };
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = () => {
      const user = authService.getCurrentUser();
      const role = authService.getUserRole();
      
      if (user && authService.isAuthenticated()) {
        dispatch({
          type: AUTH_ACTIONS.SET_USER,
          payload: { user, role }
        });
      } else {
        dispatch({
          type: AUTH_ACTIONS.SET_LOADING,
          payload: false
        });
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      
      const response = await authService.login(credentials);
      
      if (response.success) {
        dispatch({
          type: AUTH_ACTIONS.SET_USER,
          payload: {
            user: response.data.user,
            role: response.data.role
          }
        });
        return response;
      }
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: error.message || 'Login failed'
      });
      throw error;
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      
      const response = await authService.register(userData);
      
      if (response.success) {
        dispatch({
          type: AUTH_ACTIONS.SET_USER,
          payload: {
            user: response.data.user,
            role: response.data.role
          }
        });
        return response;
      }
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: error.message || 'Registration failed'
      });
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await authService.logout();
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    } catch (error) {
      console.error('Logout error:', error);
      // Still logout locally even if API fails
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
  };

  // Refresh user data
  const refreshUser = async () => {
    try {
      const userData = await authService.refreshUser();
      if (userData) {
        dispatch({
          type: AUTH_ACTIONS.SET_USER,
          payload: {
            user: userData.user,
            role: userData.role
          }
        });
      }
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  // Helper functions
  const isAdmin = () => state.role === 'admin';
  const isMember = () => state.role === 'member' || state.role === 'admin';
  const isVisitor = () => !state.isAuthenticated;

  const value = {
    // State
    user: state.user,
    role: state.role,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    
    // Actions
    login,
    register,
    logout,
    refreshUser,
    clearError,
    
    // Helper functions
    isAdmin,
    isMember,
    isVisitor
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
