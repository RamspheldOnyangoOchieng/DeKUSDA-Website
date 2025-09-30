import API from './api';

export const adminService = {
  async getDashboard() {
    try {
      const response = await API.get('/v1/admin/dashboard');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getSettings() {
    try {
      const response = await API.get('/v1/admin/settings');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateSettings(settings) {
    try {
      const response = await API.put('/v1/admin/settings', settings);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getMonthlyStats() {
    try {
      const response = await API.get('/v1/admin/monthly-stats');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export const memberService = {
  async getDashboard() {
    try {
      const response = await API.get('/member/dashboard');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getProfile() {
    try {
      const response = await API.get('/member/profile');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateProfile(profileData) {
    try {
      const response = await API.put('/member/profile', profileData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getMyPrayerRequests() {
    try {
      const response = await API.get('/member/prayer-requests');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getMyDonations() {
    try {
      const response = await API.get('/member/donations');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getMyEvents() {
    try {
      const response = await API.get('/member/events');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
