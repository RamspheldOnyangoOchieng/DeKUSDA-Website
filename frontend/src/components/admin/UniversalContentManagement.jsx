import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaChurch, FaUsers, FaPray, FaHeartbeat, FaBookOpen, FaBible,
  FaMusic, FaMicrophone, FaHandsHelping, FaCalendarAlt, FaDollarSign,
  FaBullhorn, FaEdit, FaTrash, FaPlus, FaSave, FaTimes
} from 'react-icons/fa';

const UniversalContentManagement = () => {
  const [selectedPage, setSelectedPage] = useState('ministries');
  const [selectedSubPage, setSelectedSubPage] = useState('');
  const [contentData, setContentData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', content: '', image_url: '' });
  const [message, setMessage] = useState('');

  // Page categories and their sub-pages
  const pageCategories = {
    ministries: {
      label: 'Ministry Pages',
      icon: FaUsers,
      pages: [
        { key: 'deconary', label: 'Deconary Department', icon: FaChurch },
        { key: 'personal_ministries', label: 'Personal Ministries', icon: FaHandsHelping },
        { key: 'prayer_department', label: 'Prayer Department', icon: FaPray },
        { key: 'amo_alo', label: 'AMO/ALO', icon: FaUsers },
        { key: 'health', label: 'Health Ministry', icon: FaHeartbeat },
        { key: 'sabbath_school', label: 'Sabbath School', icon: FaBookOpen },
        { key: 'prophecy', label: 'Prophecy Department', icon: FaBible }
      ]
    },
    music: {
      label: 'Music Pages',
      icon: FaMusic,
      pages: [
        { key: 'church_choir', label: 'Church Choir', icon: FaMusic },
        { key: 'dcm', label: 'DCM', icon: FaMicrophone },
        { key: 'blissful', label: 'Blissful', icon: FaMusic }
      ]
    },
    evangelism: {
      label: 'Evangelism Pages',
      icon: FaHandsHelping,
      pages: [
        { key: 'pcm', label: 'PCM', icon: FaHandsHelping },
        { key: 'evangelism', label: 'Evangelism Department', icon: FaBullhorn }
      ]
    },
    resources: {
      label: 'Resources Pages',
      icon: FaBookOpen,
      pages: [
        { key: 'calendar_events', label: 'Calendar of Events', icon: FaCalendarAlt },
        { key: 'tithes_offerings', label: 'Tithes & Offerings', icon: FaDollarSign },
        { key: 'books', label: 'Books & Literature', icon: FaBookOpen }
      ]
    },
    announcements: {
      label: 'Announcements',
      icon: FaBullhorn,
      pages: [
        { key: 'announcements', label: 'Church Announcements', icon: FaBullhorn }
      ]
    }
  };

  // Common content sections for all pages
  const contentSections = [
    { key: 'hero_title', label: 'Page Title', type: 'text' },
    { key: 'hero_subtitle', label: 'Page Subtitle', type: 'text' },
    { key: 'hero_image', label: 'Hero Image URL', type: 'url' },
    { key: 'introduction', label: 'Introduction/Overview', type: 'textarea' },
    { key: 'mission', label: 'Mission Statement', type: 'textarea' },
    { key: 'vision', label: 'Vision', type: 'textarea' },
    { key: 'activities', label: 'Activities/Programs', type: 'textarea' },
    { key: 'schedule', label: 'Schedule/Meeting Times', type: 'textarea' },
    { key: 'leadership', label: 'Leadership Information', type: 'textarea' },
    { key: 'contact', label: 'Contact Information', type: 'textarea' },
    { key: 'gallery_images', label: 'Gallery Images (comma-separated URLs)', type: 'textarea' },
    { key: 'additional_info', label: 'Additional Information', type: 'textarea' }
  ];

  useEffect(() => {
    if (selectedSubPage) {
      loadPageContent();
    }
  }, [selectedSubPage]);

  const loadPageContent = async () => {
    try {
      setIsLoading(true);
      // For now, we'll use placeholder data
      // In a real implementation, this would call an API
      setContentData({
        hero_title: { title: 'Page Title', content: '', image_url: '' },
        hero_subtitle: { title: 'Page Subtitle', content: '', image_url: '' },
        hero_image: { title: 'Hero Image URL', content: '', image_url: '' },
        introduction: { title: 'Introduction', content: '', image_url: '' },
        mission: { title: 'Mission Statement', content: '', image_url: '' },
        vision: { title: 'Vision', content: '', image_url: '' },
        activities: { title: 'Activities', content: '', image_url: '' },
        schedule: { title: 'Schedule', content: '', image_url: '' },
        leadership: { title: 'Leadership', content: '', image_url: '' },
        contact: { title: 'Contact Information', content: '', image_url: '' },
        gallery_images: { title: 'Gallery Images', content: '', image_url: '' },
        additional_info: { title: 'Additional Information', content: '', image_url: '' }
      });
      setMessage('Content loaded successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error loading content:', error);
      setMessage('Failed to load content');
      setTimeout(() => setMessage(''), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSection = async (sectionKey) => {
    try {
      // Simulate API call to save content
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setContentData(prev => ({
        ...prev,
        [sectionKey]: {
          ...prev[sectionKey],
          title: editForm.title,
          content: editForm.content,
          image_url: editForm.image_url
        }
      }));
      
      setMessage(`${contentSections.find(s => s.key === sectionKey)?.label} saved successfully`);
      setEditingSection(null);
      setEditForm({ title: '', content: '', image_url: '' });
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving content:', error);
      setMessage('Failed to save content');
      setTimeout(() => setMessage(''), 5000);
    }
  };

  const startEditing = (sectionKey) => {
    const section = contentData[sectionKey] || { title: '', content: '', image_url: '' };
    setEditForm({
      title: section.title || '',
      content: section.content || '',
      image_url: section.image_url || ''
    });
    setEditingSection(sectionKey);
  };

  const cancelEditing = () => {
    setEditingSection(null);
    setEditForm({ title: '', content: '', image_url: '' });
  };

  const renderEditForm = (sectionKey) => {
    const section = contentSections.find(s => s.key === sectionKey);
    
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500"
      >
        <h4 className="font-semibold text-blue-800 mb-4">Edit {section.label}</h4>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={editForm.title}
              onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder={section.label}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            {section.type === 'textarea' ? (
              <textarea
                value={editForm.content}
                onChange={(e) => setEditForm(prev => ({ ...prev, content: e.target.value }))}
                rows="6"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder={`Enter ${section.label.toLowerCase()} content...`}
              />
            ) : (
              <input
                type={section.type === 'url' ? 'url' : 'text'}
                value={editForm.content}
                onChange={(e) => setEditForm(prev => ({ ...prev, content: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder={`Enter ${section.label.toLowerCase()}...`}
              />
            )}
          </div>
          
          {(section.key.includes('image') || section.type === 'url') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="url"
                value={editForm.image_url}
                onChange={(e) => setEditForm(prev => ({ ...prev, image_url: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          )}
          
          <div className="flex space-x-3">
            <button
              onClick={() => handleSaveSection(sectionKey)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaSave className="mr-2" />
              Save Changes
            </button>
            <button
              onClick={cancelEditing}
              className="flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              <FaTimes className="mr-2" />
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Universal Content Management</h2>
        <p className="text-gray-600">Manage content for all website pages from one central location</p>
        
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 p-3 rounded-lg ${
              message.includes('Failed') || message.includes('Error')
                ? 'bg-red-100 text-red-700 border border-red-300'
                : 'bg-green-100 text-green-700 border border-green-300'
            }`}
          >
            {message}
          </motion.div>
        )}
      </div>

      {/* Category Selection */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Page Category</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(pageCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedPage(key);
                setSelectedSubPage('');
              }}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedPage === key
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
              }`}
            >
              <category.icon className="text-2xl mx-auto mb-2" />
              <span className="text-sm font-medium">{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sub-page Selection */}
      {selectedPage && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Select {pageCategories[selectedPage].label} Page
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pageCategories[selectedPage].pages.map((page) => (
              <button
                key={page.key}
                onClick={() => setSelectedSubPage(page.key)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  selectedSubPage === page.key
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                <div className="flex items-center">
                  <page.icon className="text-xl mr-3" />
                  <span className="font-medium">{page.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content Management */}
      {selectedSubPage && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Manage Content: {pageCategories[selectedPage].pages.find(p => p.key === selectedSubPage)?.label}
            </h3>
            {isLoading && (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            )}
          </div>

          <div className="space-y-6">
            {contentSections.map((section) => {
              const content = contentData[section.key] || { title: '', content: '', image_url: '' };
              const isEditing = editingSection === section.key;

              return (
                <div key={section.key} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-800">{section.label}</h4>
                    <button
                      onClick={() => startEditing(section.key)}
                      disabled={isEditing}
                      className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      <FaEdit className="mr-1" />
                      Edit
                    </button>
                  </div>

                  {!isEditing ? (
                    <div className="space-y-2">
                      {content.title && (
                        <div>
                          <span className="text-sm font-medium text-gray-600">Title: </span>
                          <span className="text-gray-800">{content.title}</span>
                        </div>
                      )}
                      {content.content && (
                        <div>
                          <span className="text-sm font-medium text-gray-600">Content: </span>
                          <p className="text-gray-800 line-clamp-3">
                            {content.content.length > 200 
                              ? content.content.substring(0, 200) + '...'
                              : content.content
                            }
                          </p>
                        </div>
                      )}
                      {content.image_url && (
                        <div>
                          <span className="text-sm font-medium text-gray-600">Image: </span>
                          <span className="text-blue-600 text-sm">{content.image_url}</span>
                        </div>
                      )}
                      {!content.title && !content.content && !content.image_url && (
                        <p className="text-gray-500 italic">No content available. Click Edit to add content.</p>
                      )}
                    </div>
                  ) : (
                    <AnimatePresence>
                      {renderEditForm(section.key)}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversalContentManagement;