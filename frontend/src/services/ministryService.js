import API from './api';

const ministryService = {
    // Get all ministries
    getAllMinistries: async () => {
        try {
            const response = await API.get('/ministries');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get ministry by ID
    getMinistry: async (id) => {
        try {
            const response = await API.get(`/ministries/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get ministries by category
    getMinisteriesByCategory: async (category) => {
        try {
            const response = await API.get(`/ministries/category/${category}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Create new ministry
    createMinistry: async (ministryData) => {
        try {
            const formData = new FormData();
            
            // Append all ministry data to FormData
            Object.keys(ministryData).forEach(key => {
                if (key === 'social_links' && typeof ministryData[key] === 'object') {
                    formData.append(key, JSON.stringify(ministryData[key]));
                } else if (key === 'featured_image' && ministryData[key] instanceof File) {
                    formData.append(key, ministryData[key]);
                } else {
                    formData.append(key, ministryData[key]);
                }
            });

            const response = await API.post('/ministries', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update ministry
    updateMinistry: async (id, ministryData) => {
        try {
            const formData = new FormData();
            
            // Append all ministry data to FormData
            Object.keys(ministryData).forEach(key => {
                if (key === 'social_links' && typeof ministryData[key] === 'object') {
                    formData.append(key, JSON.stringify(ministryData[key]));
                } else if (key === 'featured_image' && ministryData[key] instanceof File) {
                    formData.append(key, ministryData[key]);
                } else {
                    formData.append(key, ministryData[key]);
                }
            });

            // Add PUT method to form data for Laravel
            formData.append('_method', 'PUT');

            const response = await API.post(`/ministries/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Delete ministry
    deleteMinistry: async (id) => {
        try {
            const response = await API.delete(`/ministries/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default ministryService;
