import axios from 'axios';

// Create axios instance with Laravel API base URL
const API = axios.create({
  baseURL: import.meta.env.VITE_LARAVEL_API_URL || 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// CSRF protection for Laravel Sanctum (disabled for public routes)
API.interceptors.request.use(async (config) => {
  // Skip CSRF cookie for public API routes
  if (config.url?.includes('/v1/')) {
    return config;
  }
  
  // Get CSRF cookie for authenticated routes only
  try {
    await axios.get(`${import.meta.env.VITE_LARAVEL_BASE_URL || 'http://localhost:8000'}/sanctum/csrf-cookie`);
  } catch (error) {
    console.warn('Could not get CSRF cookie:', error);
  }
  return config;
});

// Response interceptor for handling authentication errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login or clear authentication
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;
