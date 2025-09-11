import apiService from './apiService';

class ChurchService {
  // Events API
  async getEvents(params = {}) {
    return await apiService.get('/events', false, params);
  }

  async getEvent(id) {
    return await apiService.get(`/events/${id}`, false);
  }

  async createEvent(eventData) {
    return await apiService.post('/events', eventData, true);
  }

  async updateEvent(id, eventData) {
    return await apiService.put(`/events/${id}`, eventData, true);
  }

  async deleteEvent(id) {
    return await apiService.delete(`/events/${id}`, true);
  }

  // Prayer Requests API
  async getPrayerRequests(params = {}) {
    return await apiService.get('/prayer-requests', false, params);
  }

  async getPrayerRequest(id) {
    return await apiService.get(`/prayer-requests/${id}`, false);
  }

  async createPrayerRequest(requestData) {
    return await apiService.post('/prayer-requests', requestData, false);
  }

  async updatePrayerRequest(id, requestData) {
    return await apiService.put(`/prayer-requests/${id}`, requestData, true);
  }

  async deletePrayerRequest(id) {
    return await apiService.delete(`/prayer-requests/${id}`, true);
  }

  async approvePrayerRequest(id) {
    return await apiService.put(`/prayer-requests/${id}/approve`, {}, true);
  }

  // Sermons API
  async getSermons(params = {}) {
    return await apiService.get('/sermons', false, params);
  }

  async getSermon(id) {
    return await apiService.get(`/sermons/${id}`, false);
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

  async uploadSermonFile(id, formData) {
    return await apiService.uploadFile(`/sermons/${id}/upload`, formData, true);
  }

  async downloadSermonFile(id) {
    return await apiService.download(`/sermons/${id}/download`, true);
  }

  // Ministries API
  async getMinistries(params = {}) {
    return await apiService.get('/ministries', false, params);
  }

  async getMinistry(id) {
    return await apiService.get(`/ministries/${id}`, false);
  }

  async createMinistry(ministryData) {
    return await apiService.post('/ministries', ministryData, true);
  }

  async updateMinistry(id, ministryData) {
    return await apiService.put(`/ministries/${id}`, ministryData, true);
  }

  async deleteMinistry(id) {
    return await apiService.delete(`/ministries/${id}`, true);
  }

  async joinMinistry(id) {
    return await apiService.post(`/ministries/${id}/join`, {}, true);
  }

  async leaveMinistry(id) {
    return await apiService.post(`/ministries/${id}/leave`, {}, true);
  }

  // Announcements API
  async getAnnouncements(params = {}) {
    return await apiService.get('/announcements', false, params);
  }

  async getAnnouncement(id) {
    return await apiService.get(`/announcements/${id}`, false);
  }

  async createAnnouncement(announcementData) {
    return await apiService.post('/announcements', announcementData, true);
  }

  async updateAnnouncement(id, announcementData) {
    return await apiService.put(`/announcements/${id}`, announcementData, true);
  }

  async deleteAnnouncement(id) {
    return await apiService.delete(`/announcements/${id}`, true);
  }

  // Donations API
  async getDonations(params = {}) {
    return await apiService.get('/donations', true, params);
  }

  async getDonation(id) {
    return await apiService.get(`/donations/${id}`, true);
  }

  async createDonation(donationData) {
    return await apiService.post('/donations', donationData, false);
  }

  async updateDonation(id, donationData) {
    return await apiService.put(`/donations/${id}`, donationData, true);
  }

  async deleteDonation(id) {
    return await apiService.delete(`/donations/${id}`, true);
  }

  // Gallery API
  async getGalleryItems(params = {}) {
    return await apiService.get('/gallery', false, params);
  }

  async getGalleryItem(id) {
    return await apiService.get(`/gallery/${id}`, false);
  }

  async createGalleryItem(galleryData) {
    return await apiService.post('/gallery', galleryData, true);
  }

  async updateGalleryItem(id, galleryData) {
    return await apiService.put(`/gallery/${id}`, galleryData, true);
  }

  async deleteGalleryItem(id) {
    return await apiService.delete(`/gallery/${id}`, true);
  }

  async uploadGalleryFile(id, formData) {
    return await apiService.uploadFile(`/gallery/${id}/upload`, formData, true);
  }

  async downloadGalleryFile(id) {
    return await apiService.download(`/gallery/${id}/download`, true);
  }

  // Church Members API (Admin only)
  async getMembers(params = {}) {
    return await apiService.get('/members', true, params);
  }

  async getMember(id) {
    return await apiService.get(`/members/${id}`, true);
  }

  async createMember(memberData) {
    return await apiService.post('/members', memberData, true);
  }

  async updateMember(id, memberData) {
    return await apiService.put(`/members/${id}`, memberData, true);
  }

  async deleteMember(id) {
    return await apiService.delete(`/members/${id}`, true);
  }

  // Admin Dashboard APIs
  async getDashboardStats() {
    return await apiService.get('/admin/dashboard', true);
  }

  async getSystemSettings() {
    return await apiService.get('/admin/settings', true);
  }

  async updateSystemSettings(settings) {
    return await apiService.put('/admin/settings', settings, true);
  }

  // File Management APIs
  async uploadFile(endpoint, file, category = 'general') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    return await apiService.uploadFile(endpoint, formData, true);
  }

  async downloadFile(endpoint) {
    return await apiService.download(endpoint, true);
  }
}

export default new ChurchService();
