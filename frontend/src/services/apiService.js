// Base API configuration and utilities
const API_BASE_URL = 'http://127.0.0.1:8000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('auth_token');
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
        message: 'Network error occurred'
      }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }
    return response.json();
  }

  // Generic GET request
  async get(endpoint, requireAuth = false) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders(requireAuth),
    });
    return this.handleResponse(response);
  }

  // Generic POST request
  async post(endpoint, data, requireAuth = true) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(requireAuth),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  // Generic PUT request
  async put(endpoint, data, requireAuth = true) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(requireAuth),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  // Generic DELETE request
  async delete(endpoint, requireAuth = true) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(requireAuth),
    });
    return this.handleResponse(response);
  }

  // File upload request
  async uploadFile(endpoint, formData, requireAuth = true) {
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
