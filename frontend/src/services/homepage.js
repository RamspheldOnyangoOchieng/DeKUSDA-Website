import API from './api';

const homepageService = {
  // Get all homepage data in one request
  getHomepageData: async () => {
    try {
      const response = await API.get('/v1/homepage');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch homepage data:', error);
      throw error;
    }
  },

  // Get slides for carousel
  getSlides: async () => {
    try {
      const response = await API.get('/v1/homepage/slides');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch slides:', error);
      throw error;
    }
  },

  // Get content by section
  getContentBySection: async (sectionKey) => {
    try {
      const response = await API.get(`/v1/homepage/content/${sectionKey}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch content for section ${sectionKey}:`, error);
      throw error;
    }
  },

  // Get church projects
  getChurchProjects: async () => {
    try {
      const response = await API.get('/v1/church-projects');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch church projects:', error);
      throw error;
    }
  },

  // Get featured projects for homepage
  getFeaturedProjects: async () => {
    try {
      const response = await API.get('/v1/church-projects/featured');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch featured projects:', error);
      throw error;
    }
  },

  // Get worship services
  getWorshipServices: async () => {
    try {
      const response = await API.get('/v1/worship-services');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch worship services:', error);
      throw error;
    }
  },

  // Admin functions for content management
  admin: {
    // Update content by section
    updateContentBySection: async (sectionKey, data) => {
      try {
        const response = await API.put(`/v1/homepage/content/${sectionKey}`, data);
        return response.data;
      } catch (error) {
        console.error(`Failed to update content for section ${sectionKey}:`, error);
        throw error;
      }
    },

    // Create slide
    createSlide: async (slideData) => {
      try {
        const response = await API.post('/v1/homepage/slides', slideData);
        return response.data;
      } catch (error) {
        console.error('Failed to create slide:', error);
        throw error;
      }
    },

    // Update slide
    updateSlide: async (id, slideData) => {
      try {
        const response = await API.put(`/v1/homepage/slides/${id}`, slideData);
        return response.data;
      } catch (error) {
        console.error(`Failed to update slide ${id}:`, error);
        throw error;
      }
    },

    // Delete slide
    deleteSlide: async (id) => {
      try {
        const response = await API.delete(`/v1/homepage/slides/${id}`);
        return response.data;
      } catch (error) {
        console.error(`Failed to delete slide ${id}:`, error);
        throw error;
      }
    },

    // Create church project
    createProject: async (projectData) => {
      try {
        const response = await API.post('/v1/church-projects', projectData);
        return response.data;
      } catch (error) {
        console.error('Failed to create project:', error);
        throw error;
      }
    },

    // Update church project
    updateProject: async (id, projectData) => {
      try {
        const response = await API.put(`/v1/church-projects/${id}`, projectData);
        return response.data;
      } catch (error) {
        console.error(`Failed to update project ${id}:`, error);
        throw error;
      }
    },

    // Delete church project
    deleteProject: async (id) => {
      try {
        const response = await API.delete(`/v1/church-projects/${id}`);
        return response.data;
      } catch (error) {
        console.error(`Failed to delete project ${id}:`, error);
        throw error;
      }
    },

    // Create worship service
    createWorshipService: async (serviceData) => {
      try {
        const response = await API.post('/v1/worship-services', serviceData);
        return response.data;
      } catch (error) {
        console.error('Failed to create worship service:', error);
        throw error;
      }
    },

    // Update worship service
    updateWorshipService: async (id, serviceData) => {
      try {
        const response = await API.put(`/v1/worship-services/${id}`, serviceData);
        return response.data;
      } catch (error) {
        console.error(`Failed to update worship service ${id}:`, error);
        throw error;
      }
    },

    // Delete worship service
    deleteWorshipService: async (id) => {
      try {
        const response = await API.delete(`/v1/worship-services/${id}`);
        return response.data;
      } catch (error) {
        console.error(`Failed to delete worship service ${id}:`, error);
        throw error;
      }
    }
  }
};

export { homepageService };
