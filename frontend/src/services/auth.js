import API from './api';

export const authService = {
  // User registration
  register: async (userData) => {
    const response = await API.post('/register', userData);
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  },

  // User login
  login: async (credentials) => {
    const response = await API.post('/login', credentials);
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  },

  // User logout
  logout: async () => {
    try {
      await API.post('/logout');
    } finally {
      localStorage.removeItem('auth_token');
    }
  },

  // Get current user
  getUser: async () => {
    const response = await API.get('/user');
    return response.data;
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await API.post('/forgot-password', { email });
    return response.data;
  },

  // Reset password
  resetPassword: async (data) => {
    const response = await API.post('/reset-password', data);
    return response.data;
  },

  // Update profile
  updateProfile: async (userData) => {
    const response = await API.put('/profile', userData);
    return response.data;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('auth_token');
  },

  // Get stored token
  getToken: () => {
    return localStorage.getItem('auth_token');
  }
};
