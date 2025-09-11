import API from './api';

export const prayerService = {
  // Test API connection
  testConnection: async () => {
    try {
      console.log('Testing API connection...');
      const response = await API.get('/test');
      console.log('Connection test successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('Connection test failed:', error);
      throw error;
    }
  },

  // Get public prayer requests (prayer wall)
  getPrayerWall: async (params = {}) => {
    const response = await API.get('/v1/prayer-requests/public', { params });
    return response.data;
  },

  // Get recent prayers
  getRecentPrayers: async (limit = 3) => {
    const response = await API.get('/v1/prayer-requests/public', { params: { limit } });
    return response.data;
  },

  // Submit new prayer request
  submitPrayer: async (prayerData) => {
    try {
      // Map frontend field names to backend expected field names
      const mappedData = {
        requester_name: prayerData.requester_name || (prayerData.is_anonymous ? 'Anonymous' : ''),
        requester_email: prayerData.requester_email || null,
        requester_phone: prayerData.requester_phone || null,
        prayer_request: prayerData.prayer_text || prayerData.prayer_request,
        category: prayerData.category || 'other',
        is_public: prayerData.is_public || false,
        is_urgent: prayerData.is_urgent || false
      };
      
      console.log('Submitting prayer request:', mappedData);
      const response = await API.post('/v1/prayer-requests', mappedData);
      console.log('Prayer request response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Prayer request submission error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      throw error;
    }
  },

  // Pray for a specific request
  prayForRequest: async (prayerId) => {
    const response = await API.post(`/v1/prayer-requests/${prayerId}/pray`);
    return response.data;
  },

  // Mark prayer as answered (admin only)
  markAnswered: async (prayerId, testimony) => {
    const response = await API.post(`/v1/prayer-requests/${prayerId}/answer`, { 
      answer_testimony: testimony,
      date_answered: new Date().toISOString()
    });
    return response.data;
  },

  // Get prayer categories
  getCategories: async () => {
    const response = await API.get('/prayers/categories');
    return response.data;
  },

  // Get prayer statistics
  getStatistics: async () => {
    const response = await API.get('/prayers/statistics');
    return response.data;
  },

  // Join prayer chain
  joinPrayerChain: async () => {
    const response = await API.post('/prayer-chain/join');
    return response.data;
  },

  // Leave prayer chain
  leavePrayerChain: async () => {
    const response = await API.delete('/prayer-chain/leave');
    return response.data;
  },

  // Update prayer chain preferences
  updatePreferences: async (preferences) => {
    const response = await API.put('/prayer-chain/preferences', preferences);
    return response.data;
  }
};
