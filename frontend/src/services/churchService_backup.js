import API from './api';

class ChurchService {
  // Events API
  async getEvents(params = {}) {
    const response = await API.get('/v1/events', { params });
    return response.data;
  }

  async getEvent(id) {
    const response = await API.get(`/v1/events/${id}`);
    return response.data;
  }

  import API from './api';

class ChurchService {
  // Events API
  async getEvents(params = {}) {
    const response = await API.get('/v1/events', { params });
    return response.data;
  }

  async getEvent(id) {
    const response = await API.get(`/v1/events/${id}`);
    return response.data;
  }

  async createEvent(eventData) {
    const response = await API.post('/v1/events', eventData);
    return response.data;
  }

  async updateEvent(id, eventData) {
    const response = await API.put(`/v1/events/${id}`, eventData);
    return response.data;
  }

  async deleteEvent(id) {
    const response = await API.delete(`/v1/events/${id}`);
    return response.data;
  }

  // Gallery API
  async getGallery(params = {}) {
    const response = await API.get('/v1/gallery', { params });
    return response.data;
  }

  async getGalleryItem(id) {
    const response = await API.get(`/v1/gallery/${id}`);
    return response.data;
  }

  async createGalleryItem(itemData) {
    const response = await API.post('/v1/gallery', itemData);
    return response.data;
  }

  async updateGalleryItem(id, itemData) {
    const response = await API.put(`/v1/gallery/${id}`, itemData);
    return response.data;
  }

  async deleteGalleryItem(id) {
    const response = await API.delete(`/v1/gallery/${id}`);
    return response.data;
  }

  async uploadGalleryImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    const response = await API.post('/v1/gallery/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }

  // Sermons API
  async getSermons(params = {}) {
    const response = await API.get('/v1/sermons', { params });
    return response.data;
  }

  async getSermon(id) {
    const response = await API.get(`/v1/sermons/${id}`);
    return response.data;
  }

  async createSermon(sermonData) {
    const response = await API.post('/v1/sermons', sermonData);
    return response.data;
  }

  async updateSermon(id, sermonData) {
    const response = await API.put(`/v1/sermons/${id}`, sermonData);
    return response.data;
  }

  async deleteSermon(id) {
    const response = await API.delete(`/v1/sermons/${id}`);
    return response.data;
  }

  async uploadSermon(file, type = 'audio') {
    const formData = new FormData();
    formData.append(type, file);
    const response = await API.post('/v1/sermons/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }

  // Admin API
  async getDashboard() {
    const response = await API.get('/v1/admin/dashboard');
    return response.data;
  }

  async getStatistics() {
    const response = await API.get('/v1/admin/statistics');
    return response.data;
  }

  async getRecentActivities() {
    const response = await API.get('/v1/admin/recent-activities');
    return response.data;
  }

  async getMonthlyStats() {
    const response = await API.get('/v1/admin/monthly-stats');
    return response.data;
  }

  async getSettings() {
    const response = await API.get('/v1/admin/settings');
    return response.data;
  }

  async updateSettings(settings) {
    const response = await API.put('/v1/admin/settings', settings);
    return response.data;
  }
}

export default new ChurchService();

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
