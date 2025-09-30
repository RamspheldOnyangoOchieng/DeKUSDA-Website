import API from './api';

export const adminService = {
  // Dashboard
  getDashboard: async () => {
    const response = await API.get('/v1/admin/dashboard');
    return response.data;
  },

  // Content Moderation
  getPendingContent: async () => {
    const response = await API.get('/v1/admin/content/pending');
    return response.data;
  },

  approveContent: async (contentId) => {
    const response = await API.put(`/v1/admin/content/${contentId}/approve`);
    return response.data;
  },

  rejectContent: async (contentId, reason) => {
    const response = await API.delete(`/v1/admin/content/${contentId}/reject`, {
      data: { reason }
    });
    return response.data;
  },

  // Prayer Moderation
  getPrayersToModerate: async () => {
    const response = await API.get('/v1/admin/prayers/moderate');
    return response.data;
  },

  featurePrayer: async (prayerId) => {
    const response = await API.put(`/v1/admin/prayers/${prayerId}/feature`);
    return response.data;
  },

  removePrayer: async (prayerId) => {
    const response = await API.delete(`/v1/admin/prayers/${prayerId}`);
    return response.data;
  },

  // User Management
  getUsers: async (params = {}) => {
    const response = await API.get('/v1/admin/users', { params });
    return response.data;
  },

  updateUserRole: async (userId, role) => {
    const response = await API.put(`/admin/users/${userId}/role`, { role });
    return response.data;
  },

  updateUserStatus: async (userId, isActive) => {
    const response = await API.put(`/admin/users/${userId}/status`, { is_active: isActive });
    return response.data;
  },

  // Reports
  getDonationReports: async (params = {}) => {
    const response = await API.get('/admin/reports/donations', { params });
    return response.data;
  },

  getEngagementMetrics: async (params = {}) => {
    const response = await API.get('/admin/reports/engagement', { params });
    return response.data;
  },

  getContentPerformance: async (params = {}) => {
    const response = await API.get('/admin/reports/content', { params });
    return response.data;
  },

  // Bulk Operations
  sendBulkNotification: async (notificationData) => {
    const response = await API.post('/admin/notify/bulk', notificationData);
    return response.data;
  }
};
