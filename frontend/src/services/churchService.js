import apiService from './apiService';

class ChurchService {
  // Events API
  async getEvents(params = {}) {
    return await apiService.get('/events', true, params);
  }

  async getEvent(id) {
    return await apiService.get(`/events/${id}`, true);
  }

  async createEvent(eventData) {
    // Refresh token before making authenticated request
    apiService.refreshToken();
    return await apiService.post('/events', eventData, true);
  }

  async updateEvent(id, eventData) {
    return await apiService.put(`/events/${id}`, eventData, true);
  }

  async deleteEvent(id) {
    return await apiService.delete(`/events/${id}`, true);
  }

  // Gallery API
  async getGalleryItems(params = {}) {
    return await apiService.get('/gallery', true, params);
  }

  async getGalleryItem(id) {
    return await apiService.get(`/gallery/${id}`, true);
  }

  async createGalleryItem(itemData) {
    const isFormData = itemData instanceof FormData;
    return await apiService.post('/gallery', itemData, true, isFormData);
  }

  async updateGalleryItem(id, itemData) {
    return await apiService.put(`/gallery/${id}`, itemData, true);
  }

  async deleteGalleryItem(id) {
    return await apiService.delete(`/gallery/${id}`, true);
  }

  async uploadGalleryImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    return await apiService.post('/gallery/upload', formData, true, true);
  }

  // Sermons API
  async getSermons(params = {}) {
    return await apiService.get('/sermons', true, params);
  }

  async getSermon(id) {
    return await apiService.get(`/sermons/${id}`, true);
  }

  async createSermon(sermonData) {
    return await apiService.post('/sermons', sermonData, true);
  }

  async updateSermon(id, sermonData) {
    return await apiService.put(`/sermons/${id}`, sermonData, true);
  }

  async deleteSermon(id) {
    return await apiService.delete(`/sermons/${id}`, true);
  }

  async uploadSermonFile(file, type) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type); // 'audio', 'video', 'pdf', or 'thumbnail'
    return await apiService.post('/sermons/upload', formData, true, true);
  }

  // Admin Dashboard API
  async getDashboardStats() {
    return await apiService.get('/v1/admin/dashboard', true);
  }

  async getStatistics() {
    return await apiService.get('/v1/admin/statistics', true);
  }

  async getRecentActivities() {
    return await apiService.get('/v1/admin/recent-activities', true);
  }

  async getMonthlyStats() {
    return await apiService.get('/v1/admin/monthly-stats', true);
  }

  async getSettings() {
    return await apiService.get('/v1/admin/settings', true);
  }

  async updateSettings(settings) {
    return await apiService.put('/v1/admin/settings', settings, true);
  }
}

// Export a singleton instance
const churchService = new ChurchService();
export default churchService;
