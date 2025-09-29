// Base API configuration and utilities
let _baseHost = 'http://127.0.0.1:8000';
try {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) {
    _baseHost = import.meta.env.VITE_API_URL;
  }
} catch (_) {
  // Fallback remains default
}
const API_BASE_URL = `${_baseHost}/api`;

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('auth_token') || localStorage.getItem('token');
  }

  // Refresh token from localStorage (useful when token is updated elsewhere)
  refreshToken() {
    this.token = localStorage.getItem('auth_token') || localStorage.getItem('token');
    return this.token;
  }


  // Set authentication token
  setToken(token) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  // Remove authentication token
  removeToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // Get headers with optional authentication
  getHeaders(includeAuth = true) {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (includeAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Handle API responses
  async handleResponse(response) {
    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: 'Network error occurred. Please check if the backend server is running.'
      }));
      
      // Provide more specific error messages
      if (response.status === 401) {
        error.message = 'Authentication required. Please log in.';
      } else if (response.status === 403) {
        error.message = 'Access denied. You do not have permission to perform this action.';
      } else if (response.status === 404) {
        error.message = 'Resource not found. The requested endpoint may not exist.';
      } else if (response.status >= 500) {
        error.message = 'Server error. Please try again later.';
      }
      
      throw new Error(error.message || `HTTP ${response.status}`);
    }
    return response.json();
  }

  // Generic GET request
  async get(endpoint, requireAuth = false, params = {}) {
    this.refreshToken();
    
    // Add query parameters if provided
    const queryParams = new URLSearchParams(params);
    const queryString = queryParams.toString();
    const url = queryString ? `${this.baseURL}${endpoint}?${queryString}` : `${this.baseURL}${endpoint}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(requireAuth),
    });
    return this.handleResponse(response);
  }

  // Generic POST request
  async post(endpoint, data, requireAuth = true, isFormData = false) {
    this.refreshToken();
    const headers = this.getHeaders(requireAuth);
    
    // Remove Content-Type for FormData (browser will set it with boundary)
    if (isFormData) {
      delete headers['Content-Type'];
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers,
      body: isFormData ? data : JSON.stringify(data)
    });

    return this.handleResponse(response);
  }

  // Generic PUT request
  async put(endpoint, data, requireAuth = true) {
    this.refreshToken();
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(requireAuth),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  // Generic DELETE request
  async delete(endpoint, requireAuth = true) {
    this.refreshToken();
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(requireAuth),
    });
    return this.handleResponse(response);
  }

  // File upload request
  async uploadFile(endpoint, formData, requireAuth = true) {
    this.refreshToken();
    const headers = {};
    if (requireAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
    });
    return this.handleResponse(response);
  }
}

export default new ApiService();
