import React, { useState, useEffect } from 'react';
import aboutService from '../../services/aboutService';
import './AboutContentManager.css';

const AboutContentManager = () => {
  const [selectedPage, setSelectedPage] = useState('about_dekusda');
  const [pageContent, setPageContent] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', content: '' });
  const [message, setMessage] = useState('');

  const pageTypes = [
    { value: 'about_dekusda', label: 'About DeKUSDA' },
    { value: 'about_sda', label: 'About SDA' },
    { value: 'elder_message', label: 'Elder Message' },
    { value: 'pastor_message', label: 'Pastor Message' }
  ];

  // Load page content
  const loadPageContent = async (pageType) => {
    try {
      setIsLoading(true);
      const response = await aboutService.getPageContent(pageType);
      setPageContent(response.data || {});
    } catch (error) {
      console.error('Error loading content:', error);
      setMessage('Failed to load content');
    } finally {
      setIsLoading(false);
    }
  };

  // Load content when page changes
  useEffect(() => {
    loadPageContent(selectedPage);
  }, [selectedPage]);

  // Start editing a section
  const startEditing = (sectionKey, section) => {
    setEditingSection(sectionKey);
    setEditForm({
      title: section.title || '',
      content: section.content || ''
    });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingSection(null);
    setEditForm({ title: '', content: '' });
  };

  // Save changes
  const saveChanges = async () => {
    try {
      const token = localStorage.getItem('auth_token'); // You'll need to implement auth
      if (!token) {
        setMessage('Authentication required');
        return;
      }

      const contentData = {
        page_type: selectedPage,
        section_key: editingSection,
        title: editForm.title,
        content: editForm.content
      };

      await aboutService.updateContent(contentData, token);
      setMessage('Content updated successfully!');
      loadPageContent(selectedPage); // Reload content
      cancelEditing();
    } catch (error) {
      console.error('Error updating content:', error);
      setMessage('Failed to update content');
    }
  };

  return (
    <div className="about-content-manager">
      <div className="manager-header">
        <h1>About Content Manager</h1>
        
        <div className="page-selector">
          <label htmlFor="pageSelect">Select Page:</label>
          <select
            id="pageSelect"
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
          >
            {pageTypes.map(page => (
              <option key={page.value} value={page.value}>
                {page.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {message && (
        <div className={`message ${message.includes('Failed') ? 'error' : 'success'}`}>
          {message}
          <button onClick={() => setMessage('')}>×</button>
        </div>
      )}

      {isLoading ? (
        <div className="loading">Loading content...</div>
      ) : (
        <div className="content-sections">
          <h2>Content Sections for {pageTypes.find(p => p.value === selectedPage)?.label}</h2>
          
          {Object.keys(pageContent).length === 0 ? (
            <div className="no-content">No content found for this page.</div>
          ) : (
            <div className="sections-grid">
              {Object.entries(pageContent).map(([sectionKey, section]) => (
                <div key={sectionKey} className="section-card">
                  <div className="section-header">
                    <h3>{sectionKey.replace(/_/g, ' ').toUpperCase()}</h3>
                    <button
                      onClick={() => startEditing(sectionKey, section)}
                      className="edit-btn"
                      disabled={editingSection === sectionKey}
                    >
                      {editingSection === sectionKey ? 'Editing...' : 'Edit'}
                    </button>
                  </div>
                  
                  {editingSection === sectionKey ? (
                    <div className="edit-form">
                      <div className="form-group">
                        <label>Title:</label>
                        <input
                          type="text"
                          value={editForm.title}
                          onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Enter title"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Content:</label>
                        <textarea
                          value={editForm.content}
                          onChange={(e) => setEditForm(prev => ({ ...prev, content: e.target.value }))}
                          placeholder="Enter content (HTML allowed)"
                          rows={6}
                        />
                      </div>
                      
                      <div className="form-actions">
                        <button onClick={saveChanges} className="save-btn">
                          Save Changes
                        </button>
                        <button onClick={cancelEditing} className="cancel-btn">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="section-content">
                      <div className="content-preview">
                        <strong>Title:</strong> {section.title || '(No title)'}
                      </div>
                      <div className="content-preview">
                        <strong>Content:</strong>
                        <div
                          className="content-html"
                          dangerouslySetInnerHTML={{ 
                            __html: section.content || '(No content)' 
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AboutContentManager;
