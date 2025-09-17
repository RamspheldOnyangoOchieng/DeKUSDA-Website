const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class AboutService {
    /**
     * Get all content for a specific about page
     */
    async getPageContent(pageType) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/about/${pageType}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching ${pageType} content:`, error);
            throw error;
        }
    }

    /**
     * Get specific section content
     */
    async getSectionContent(pageType, sectionKey) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/about/${pageType}/${sectionKey}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching ${pageType}/${sectionKey} content:`, error);
            throw error;
        }
    }

    /**
     * Update or create content (Admin only)
     */
    async updateContent(contentData, token) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/about/content`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(contentData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error updating content:', error);
            throw error;
        }
    }

    /**
     * Delete content (Admin only)
     */
    async deleteContent(contentId, token) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/about/content/${contentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error deleting content:', error);
            throw error;
        }
    }
}

const aboutService = new AboutService();
export default aboutService;
