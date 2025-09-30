import API from './api';

class AnnouncementService {
  // Get all announcements (public)
  async getAllAnnouncements() {
    try {
      const response = await API.get('/v1/announcements');
      return response.data;
    } catch (error) {
      console.error('Error fetching announcements:', error);
      throw error;
    }
  }

  // Get featured/active announcement for homepage
  async getFeaturedAnnouncement() {
    try {
      const response = await API.get('/v1/announcements?featured=true&active=true');
      return response.data;
    } catch (error) {
      console.error('Error fetching featured announcement:', error);
      throw error;
    }
  }

  // Get announcement by ID
  async getAnnouncementById(id) {
    try {
      const response = await API.get(`/v1/announcements/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching announcement:', error);
      throw error;
    }
  }

  // Admin: Create new announcement
  async createAnnouncement(announcementData) {
    try {
      const response = await API.post('/v1/announcements', announcementData);
      return response.data;
    } catch (error) {
      console.error('Error creating announcement:', error);
      throw error;
    }
  }

  // Admin: Update announcement
  async updateAnnouncement(id, announcementData) {
    try {
      const response = await API.put(`/v1/announcements/${id}`, announcementData);
      return response.data;
    } catch (error) {
      console.error('Error updating announcement:', error);
      throw error;
    }
  }

  // Admin: Delete announcement
  async deleteAnnouncement(id) {
    try {
      const response = await API.delete(`/v1/announcements/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting announcement:', error);
      throw error;
    }
  }

  // Admin: Get all announcements for management
  async getAnnouncementsForAdmin() {
    try {
      const response = await API.get('/v1/announcements');
      return response.data;
    } catch (error) {
      console.error('Error fetching announcements for admin:', error);
      throw error;
    }
  }
}

export default new AnnouncementService();