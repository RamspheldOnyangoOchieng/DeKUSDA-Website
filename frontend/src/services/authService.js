import API from './api';

class AuthService {
  constructor() {
    this.currentUser = null;
    this.userRole = null;
    this.loadUserFromStorage();
  }

  // Load user data from localStorage
  loadUserFromStorage() {
    // Check for both storage formats
    let userData = localStorage.getItem('user_data');
    let userRole = localStorage.getItem('user_role');
    
    // Fallback to legacy format
    if (!userData) {
      userData = localStorage.getItem('user');
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          userRole = parsedUser.role;
        } catch (error) {
          console.error('Error parsing legacy user data:', error);
          return;
        }
      }
    }
    
    if (userData) {
      this.currentUser = typeof userData === 'string' ? JSON.parse(userData) : userData;
      this.userRole = userRole;
    }
  }

  // Save user data to localStorage
  saveUserToStorage(user, role) {
    this.currentUser = user;
    this.userRole = role;
    localStorage.setItem('user_data', JSON.stringify(user));
    localStorage.setItem('user_role', role);
  }

  // Clear user data from localStorage
  clearUserStorage() {
    this.currentUser = null;
    this.userRole = null;
    localStorage.removeItem('user_data');
    localStorage.removeItem('user_role');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('token');
  }

  // Login user
  async login(credentials) {
    try {
      const response = await API.post('/auth/login', credentials);
      
      if (response.success) {
        localStorage.setItem('auth_token', response.data.token);
        this.saveUserToStorage(response.data.user, response.data.role);
        return response;
      }
      throw new Error(response.message || 'Login failed');
    } catch (error) {
      throw error;
    }
  }

  // Register new user
  async register(userData) {
    try {
      const response = await API.post('/auth/register', userData);
      
      if (response.success) {
        localStorage.setItem('auth_token', response.data.token);
        this.saveUserToStorage(response.data.user, response.data.role);
        return response;
      }
      throw new Error(response.message || 'Registration failed');
    } catch (error) {
      throw error;
    }
  }

  // Logout user
  async logout() {
    try {
      await API.post('/auth/logout');
    } catch (error) {
      console.warn('Logout API call failed:', error);
    } finally {
      this.clearUserStorage();
    }
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  }

  // Get user role
  getUserRole() {
    return this.userRole;
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('auth_token') || localStorage.getItem('token');
    return !!this.currentUser && !!token;
  }

  // Check if user is admin
  isAdmin() {
    return this.userRole === 'admin';
  }

  // Fetch current user from API
  async fetchCurrentUser() {
    try {
      const response = await API.get('/auth/user');
      if (response.success) {
        this.saveUserToStorage(response.data.user, response.data.role);
        return response.data;
      }
      throw new Error(response.message || 'Failed to fetch user data');
    } catch (error) {
      throw error;
    }
  }

  // Initialize auth state from token
  async initializeAuth() {
    const token = localStorage.getItem('auth_token') || localStorage.getItem('token');
    if (token && this.currentUser) {
      try {
        await this.fetchCurrentUser();
        return true;
      } catch (error) {
        this.clearUserStorage();
        return false;
      }
    }
    return false;
  }

  // Check if user is member
  isMember() {
    return this.userRole === 'member' || this.userRole === 'admin';
  }

  // Check if user is visitor
  isVisitor() {
    return !this.isAuthenticated();
  }

  // Refresh user data
  async refreshUser() {
    try {
      const response = await API.get('/auth/user');
      if (response.success) {
        this.saveUserToStorage(response.data.user, response.data.role);
        return response.data;
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
      this.clearUserStorage();
    }
  }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;
