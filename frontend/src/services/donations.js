import API from './api';

export const donationService = {
  // Process donation
  processDonation: async (donationData) => {
    const response = await API.post('/donations/create', donationData);
    return response.data;
  },

  // Get user donation history
  getDonationHistory: async (params = {}) => {
    const response = await API.get('/donations/history', { params });
    return response.data;
  },

  // Get donation receipt
  getReceipt: async (donationId) => {
    const response = await API.get(`/donations/${donationId}/receipt`);
    return response.data;
  },

  // Set up recurring donation
  setupRecurring: async (recurringData) => {
    const response = await API.post('/donations/recurring', recurringData);
    return response.data;
  },

  // Cancel recurring donation
  cancelRecurring: async (recurringId) => {
    const response = await API.delete(`/donations/recurring/${recurringId}`);
    return response.data;
  },

  // Get annual giving statements
  getAnnualStatement: async (year) => {
    const response = await API.get('/donations/statements', {
      params: { year }
    });
    return response.data;
  }
};
