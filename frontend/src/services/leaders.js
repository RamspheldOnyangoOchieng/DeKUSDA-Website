import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export const leaderService = {
  // Get all leaders (public)
  getLeaders: async (category = null) => {
    const url = category ? `/v1/leaders?category=${category}` : '/v1/leaders';
    return await api.get(url);
  },

  // Get public leaders (for homepage display)
  getPublicLeaders: async (category = null) => {
    const url = category ? `/v1/leaders?category=${category}&status=active` : '/v1/leaders?status=active';
    return await api.get(url);
  },

  // Get single leader (public)
  getLeader: async (id) => {
    return await api.get(`/v1/leaders/${id}`);
  },

  // Create leader (admin)
  createLeader: async (leaderData) => {
    return await api.post('/v1/leaders', leaderData);
  },

  // Update leader (admin)
  updateLeader: async (id, leaderData) => {
    return await api.put(`/v1/leaders/${id}`, leaderData);
  },

  // Delete leader (admin)
  deleteLeader: async (id) => {
    return await api.delete(`/v1/leaders/${id}`);
  },

  // Reorder leaders (admin)
  reorderLeaders: async (leaders) => {
    return await api.post('/v1/leaders/reorder', { leaders });
  },

  // Get categories
  getCategories: () => {
    return {
      pastoral: 'Pastoral Staff',
      elders: 'Church Elders',
      ministry: 'Ministry Directors',
      deacons: 'Deacons & Deaconesses'
    };
  },

  // Helper function to get category counts
  getCategoryCounts: (leaders) => {
    const counts = {
      all: leaders.length,
      pastoral: 0,
      elders: 0,
      ministry: 0,
      deacons: 0
    };

    leaders.forEach(leader => {
      if (counts.hasOwnProperty(leader.category)) {
        counts[leader.category]++;
      }
    });

    return counts;
  }
};