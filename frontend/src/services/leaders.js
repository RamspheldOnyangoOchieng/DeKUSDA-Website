import API from './api';

// Use the shared API instance instead of creating a new one

export const leaderService = {
  // Get all leaders (public)
  getLeaders: async (category = null) => {
    const url = category ? `/v1/leaders?category=${category}` : '/v1/leaders';
    const response = await API.get(url);
    return response.data;
  },

  // Get public leaders (for homepage display)
  getPublicLeaders: async (category = null) => {
    const url = category ? `/v1/leaders?category=${category}&status=active` : '/v1/leaders?status=active';
    const response = await API.get(url);
    return response.data;
  },

  // Get single leader (public)
  getLeader: async (id) => {
    const response = await API.get(`/v1/leaders/${id}`);
    return response.data;
  },

  // Create leader (admin)
  createLeader: async (leaderData) => {
    const response = await API.post('/v1/leaders', leaderData);
    return response.data;
  },

  // Update leader (admin)
  updateLeader: async (id, leaderData) => {
    const response = await API.put(`/v1/leaders/${id}`, leaderData);
    return response.data;
  },

  // Delete leader (admin)
  deleteLeader: async (id) => {
    const response = await API.delete(`/v1/leaders/${id}`);
    return response.data;
  },

  // Reorder leaders (admin)
  reorderLeaders: async (leaders) => {
    const response = await API.post('/v1/leaders/reorder', { leaders });
    return response.data;
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