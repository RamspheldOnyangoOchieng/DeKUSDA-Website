import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBullhorn, FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash,
  FaSave, FaTimes, FaCalendarAlt, FaFlag, FaBell
} from 'react-icons/fa';
import announcementService from '../../services/announcements';

const AnnouncementsManagement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState('all');

  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    content: '',
    category: 'general',
    priority: 'medium',
    start_date: '',
    end_date: '',
    is_active: true,
    is_featured: false,
    target_audience: 'all',
    contact_info: '',
    action_required: false,
    action_deadline: '',
    image_url: '',
    event_time: '',
    event_location: ''
  });

  // Announcement categories
  const categories = [
    { value: 'general', label: 'General Announcement' },
    { value: 'worship', label: 'Worship Service' },
    { value: 'ministry', label: 'Ministry Program' },
    { value: 'youth', label: 'Youth Activity' },
    { value: 'outreach', label: 'Outreach Event' },
    { value: 'financial', label: 'Financial/Offering' },
    { value: 'health', label: 'Health Ministry' },
    { value: 'education', label: 'Education/Training' },
    { value: 'social', label: 'Social Event' },
    { value: 'urgent', label: 'Urgent Notice' }
  ];

  // Priority levels
  const priorities = [
    { value: 'low', label: 'Low Priority', color: 'bg-gray-100 text-gray-800' },
    { value: 'medium', label: 'Medium Priority', color: 'bg-blue-100 text-blue-800' },
    { value: 'high', label: 'High Priority', color: 'bg-orange-100 text-orange-800' },
    { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800' }
  ];

  // Target audiences
  const audiences = [
    { value: 'all', label: 'All Members' },
    { value: 'students', label: 'Students' },
    { value: 'staff', label: 'Staff & Faculty' },
    { value: 'youth', label: 'Youth' },
    { value: 'adults', label: 'Adults' },
    { value: 'seniors', label: 'Senior Members' },
    { value: 'ministry_leaders', label: 'Ministry Leaders' },
    { value: 'visitors', label: 'Visitors' }
  ];

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      setIsLoading(true);
      const response = await announcementService.getAnnouncementsForAdmin();
      
      if (response.success) {
        setAnnouncements(response.data);
        setMessage('Announcements loaded successfully');
      } else {
        // Fallback to sample data if API fails
        const sampleAnnouncements = [
          {
            id: 1,
            title: 'Communication Sabbath',
            content: 'Join us for a special time of worship and fellowship — see you there!',
            category: 'worship',
            priority: 'high',
            start_date: '2025-09-29',
            end_date: '2025-09-29',
            is_active: true,
            is_featured: true,
            target_audience: 'all',
            contact_info: '',
            action_required: false,
            action_deadline: '',
            image_url: '',
            event_time: '7:50 AM',
            event_location: 'Food Science Workshop',
            created_at: '2025-09-29'
          }
        ];
        setAnnouncements(sampleAnnouncements);
        setMessage('Using sample data - API connection failed');
      }
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error loading announcements:', error);
      // Fallback to sample data
      const sampleAnnouncements = [
        {
          id: 1,
          title: 'Communication Sabbath',
          content: 'Join us for a special time of worship and fellowship — see you there!',
          category: 'worship',
          priority: 'high',
          start_date: '2025-09-29',
          end_date: '2025-09-29',
          is_active: true,
          is_featured: true,
          target_audience: 'all',
          contact_info: '',
          action_required: false,
          action_deadline: '',
          image_url: '',
          event_time: '7:50 AM',
          event_location: 'Food Science Workshop',
          created_at: '2025-09-29'
        }
      ];
      setAnnouncements(sampleAnnouncements);
      setMessage('Failed to load announcements - using sample data');
      setTimeout(() => setMessage(''), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAnnouncement) {
        // Update existing announcement
        const response = await announcementService.updateAnnouncement(editingAnnouncement.id, announcementForm);
        if (response.success) {
          const updatedAnnouncements = announcements.map(announcement => 
            announcement.id === editingAnnouncement.id 
              ? { ...announcement, ...response.data }
              : announcement
          );
          setAnnouncements(updatedAnnouncements);
          setMessage('Announcement updated successfully');
        } else {
          setMessage('Failed to update announcement');
        }
      } else {
        // Create new announcement
        const response = await announcementService.createAnnouncement(announcementForm);
        if (response.success) {
          setAnnouncements([response.data, ...announcements]);
          setMessage('Announcement created successfully');
        } else {
          setMessage('Failed to create announcement');
        }
      }
      
      resetForm();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving announcement:', error);
      setMessage('Failed to save announcement');
      setTimeout(() => setMessage(''), 5000);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        const updatedAnnouncements = announcements.filter(announcement => announcement.id !== id);
        setAnnouncements(updatedAnnouncements);
        setMessage('Announcement deleted successfully');
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        console.error('Error deleting announcement:', error);
        setMessage('Failed to delete announcement');
        setTimeout(() => setMessage(''), 5000);
      }
    }
  };

  const toggleActive = async (id) => {
    try {
      const updatedAnnouncements = announcements.map(announcement => 
        announcement.id === id 
          ? { ...announcement, is_active: !announcement.is_active }
          : announcement
      );
      setAnnouncements(updatedAnnouncements);
      setMessage('Announcement status updated');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating announcement status:', error);
      setMessage('Failed to update announcement status');
      setTimeout(() => setMessage(''), 5000);
    }
  };

  const startEditing = (announcement) => {
    setAnnouncementForm({
      title: announcement.title,
      content: announcement.content,
      category: announcement.category,
      priority: announcement.priority,
      start_date: announcement.start_date,
      end_date: announcement.end_date,
      is_active: announcement.is_active,
      is_featured: announcement.is_featured,
      target_audience: announcement.target_audience,
      contact_info: announcement.contact_info,
      action_required: announcement.action_required,
      action_deadline: announcement.action_deadline,
      image_url: announcement.image_url,
      event_time: announcement.event_time || '',
      event_location: announcement.event_location || ''
    });
    setEditingAnnouncement(announcement);
    setShowForm(true);
  };

  const resetForm = () => {
    setAnnouncementForm({
      title: '',
      content: '',
      category: 'general',
      priority: 'medium',
      start_date: '',
      end_date: '',
      is_active: true,
      is_featured: false,
      target_audience: 'all',
      contact_info: '',
      action_required: false,
      action_deadline: '',
      image_url: '',
      event_time: '',
      event_location: ''
    });
    setEditingAnnouncement(null);
    setShowForm(false);
  };

  const getCategoryLabel = (category) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.label : category;
  };

  const getPriorityConfig = (priority) => {
    const config = priorities.find(p => p.value === priority);
    return config || { label: priority, color: 'bg-gray-100 text-gray-800' };
  };

  const getAudienceLabel = (audience) => {
    const aud = audiences.find(a => a.value === audience);
    return aud ? aud.label : audience;
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    if (filter === 'all') return true;
    if (filter === 'active') return announcement.is_active;
    if (filter === 'inactive') return !announcement.is_active;
    if (filter === 'featured') return announcement.is_featured;
    return announcement.category === filter;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-blue-800 flex items-center">
              <FaBullhorn className="mr-3" />
              Announcements Management
            </h2>
            <p className="text-gray-600 mt-2">Manage church announcements and notices</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaPlus className="mr-2" />
            Add Announcement
          </button>
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3 rounded-lg ${
              message.includes('Failed') || message.includes('Error')
                ? 'bg-red-100 text-red-700 border border-red-300'
                : 'bg-green-100 text-green-700 border border-green-300'
            }`}
          >
            {message}
          </motion.div>
        )}

        {/* Filters */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter Announcements</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Announcements</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
            <option value="featured">Featured Only</option>
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Announcement Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-4 text-blue-800">
              {editingAnnouncement ? 'Edit Announcement' : 'Add New Announcement'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={announcementForm.title}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter announcement title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <textarea
                  value={announcementForm.content}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
                  rows="6"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter announcement content"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={announcementForm.category}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, category: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={announcementForm.priority}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, priority: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    {priorities.map(priority => (
                      <option key={priority.value} value={priority.value}>{priority.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                  <select
                    value={announcementForm.target_audience}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, target_audience: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    {audiences.map(audience => (
                      <option key={audience.value} value={audience.value}>{audience.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={announcementForm.start_date}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, start_date: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={announcementForm.end_date}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, end_date: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Information</label>
                <input
                  type="text"
                  value={announcementForm.contact_info}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, contact_info: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Contact person, phone, email, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  value={announcementForm.image_url}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, image_url: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Time</label>
                  <input
                    type="text"
                    value={announcementForm.event_time}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, event_time: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 7:50 AM"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Location</label>
                  <input
                    type="text"
                    value={announcementForm.event_location}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, event_location: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Food Science Workshop"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="action-required"
                    checked={announcementForm.action_required}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, action_required: e.target.checked })}
                    className="mr-2"
                  />
                  <label htmlFor="action-required" className="text-sm font-medium text-gray-700">
                    Action Required
                  </label>
                </div>
                {announcementForm.action_required && (
                  <div className="flex-1">
                    <input
                      type="date"
                      value={announcementForm.action_deadline}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, action_deadline: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Action deadline"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="active"
                    checked={announcementForm.is_active}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, is_active: e.target.checked })}
                    className="mr-2"
                  />
                  <label htmlFor="active" className="text-sm font-medium text-gray-700">
                    Active
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={announcementForm.is_featured}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, is_featured: e.target.checked })}
                    className="mr-2"
                  />
                  <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                    Featured
                  </label>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaSave className="mr-2" />
                  {editingAnnouncement ? 'Update Announcement' : 'Create Announcement'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex items-center px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  <FaTimes className="mr-2" />
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Announcements List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Announcements ({filteredAnnouncements.length})
          </h3>
        </div>

        {filteredAnnouncements.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <FaBullhorn className="text-4xl mx-auto mb-4 opacity-50" />
            <p>No announcements found</p>
            <p className="text-sm mt-2">Add your first announcement to get started.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredAnnouncements.map((announcement) => {
              const priorityConfig = getPriorityConfig(announcement.priority);
              
              return (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-6 transition-colors ${announcement.is_active ? 'hover:bg-gray-50' : 'bg-gray-100'}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{announcement.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityConfig.color}`}>
                          {priorityConfig.label}
                        </span>
                        {announcement.is_featured && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Featured
                          </span>
                        )}
                        {!announcement.is_active && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Inactive
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span>{getCategoryLabel(announcement.category)}</span>
                        <span>•</span>
                        <span>{getAudienceLabel(announcement.target_audience)}</span>
                        <span>•</span>
                        <span>{announcement.created_at}</span>
                      </div>

                      <p className="text-gray-800 mb-3 line-clamp-3">{announcement.content}</p>

                      {announcement.contact_info && (
                        <p className="text-sm text-blue-600 mb-2">{announcement.contact_info}</p>
                      )}

                      {announcement.action_required && announcement.action_deadline && (
                        <div className="flex items-center text-sm text-orange-600 mb-2">
                          <FaBell className="mr-1" />
                          Action required by: {announcement.action_deadline}
                        </div>
                      )}

                      <div className="flex items-center text-sm text-gray-500">
                        <FaCalendarAlt className="mr-1" />
                        {announcement.start_date} - {announcement.end_date || 'Ongoing'}
                      </div>
                    </div>

                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => toggleActive(announcement.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          announcement.is_active 
                            ? 'text-green-600 hover:bg-green-100' 
                            : 'text-gray-400 hover:bg-gray-100'
                        }`}
                        title={announcement.is_active ? 'Mark as Inactive' : 'Mark as Active'}
                      >
                        {announcement.is_active ? <FaEye /> : <FaEyeSlash />}
                      </button>
                      <button
                        onClick={() => startEditing(announcement)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Edit Announcement"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(announcement.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete Announcement"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementsManagement;