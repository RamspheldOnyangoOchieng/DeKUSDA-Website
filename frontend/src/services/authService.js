import apiService from './apiService';

class AuthService {
  constructor() {
    this.currentUser = null;
    this.userRole = null;
    this.loadUserFromStorage();
  }

  // Load user data from localStorage
  loadUserFromStorage() {
    const userData = localStorage.getItem('user_data');
    const userRole = localStorage.getItem('user_role');
    
    if (userData) {
      this.currentUser = JSON.parse(userData);
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
    apiService.removeToken();
  }

  // Login user
  async login(credentials) {
    try {
      const response = await apiService.post('/auth/login', credentials, false);
      
      if (response.success) {
        apiService.setToken(response.data.token);
        this.saveUserToStorage(response.data.user, response.data.role);
        return response;
      }
      throw new Error(response.message);
    } catch (error) {
      throw error;
    }
  }

  // Register new user
  async register(userData) {
    try {
      const response = await apiService.post('/auth/register', userData, false);
      
      if (response.success) {
        apiService.setToken(response.data.token);
        this.saveUserToStorage(response.data.user, response.data.role);
        return response;
      }
      throw new Error(response.message);
    } catch (error) {
      throw error;
    }
  }

  // Logout user
  async logout() {
    try {
      await apiService.post('/auth/logout', {}, true);
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
    return !!this.currentUser && !!apiService.token;
  }

  // Check if user is admin
  isAdmin() {
    return this.userRole === 'admin';
  }

  // Check if user is member
  isMember() {
    return this.userRole === 'member' || this.userRole === 'admin';
  }

  // Check if user is visitor (not authenticated)
  isVisitor() {
    return !this.isAuthenticated();
  }

  // Refresh user data
  async refreshUser() {
    try {
      const response = await apiService.get('/user', true);
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

export default new AuthService();
