import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPlus, FaEdit, FaTrash, FaCalendarAlt, FaClock, 
  FaMapMarkerAlt, FaUsers, FaDollarSign, FaEye 
} from 'react-icons/fa';
import { eventService } from '../../services/events';

const EventsManagement = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_datetime: '',
    end_datetime: '',
    location: '',
    event_type: 'fellowship',
    status: 'published',
    max_attendees: '',
    entry_fee: '',
    featured_image: '',
    additional_info: '',
    is_recurring: false,
    recurrence_pattern: ''
  });

  const eventTypes = [
    { value: 'worship', label: 'Worship Service' },
    { value: 'bible_study', label: 'Bible Study' },
    { value: 'youth', label: 'Youth Ministry' },
    { value: 'choir', label: 'Choir/Music' },
    { value: 'fellowship', label: 'Fellowship' },
    { value: 'community', label: 'Community Service' },
    { value: 'conference', label: 'Conference' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await eventService.getEvents();
      if (response.success) {
        setEvents(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic client-side validation with null checks
    if (!(formData.title || '').trim()) {
      alert('Title is required');
      return;
    }
    if (!(formData.description || '').trim()) {
      alert('Description is required');
      return;
    }
    if (!formData.start_datetime) {
      alert('Start date and time is required');
      return;
    }
    if (!formData.end_datetime) {
      alert('End date and time is required');
      return;
    }
    
    try {
      // Clean the form data before sending with proper null checks
      const cleanedData = {
        title: (formData.title || '').trim(),
        description: (formData.description || '').trim(),
        start_datetime: formData.start_datetime,
        end_datetime: formData.end_datetime,
        location: (formData.location || '').trim() || null,
        event_type: formData.event_type,
        status: formData.status,
        featured_image: (formData.featured_image || '').trim() || null,
        additional_info: (formData.additional_info || '').trim() || null,
        is_recurring: Boolean(formData.is_recurring),
        recurrence_pattern: formData.is_recurring ? (formData.recurrence_pattern || null) : null,
        max_attendees: formData.max_attendees ? parseInt(formData.max_attendees) : null,
        entry_fee: formData.entry_fee ? parseFloat(formData.entry_fee) : null
      };

      console.log('Sending event data:', cleanedData);

      if (editingEvent) {
        await eventService.updateEvent(editingEvent.id, cleanedData);
      } else {
        await eventService.createEvent(cleanedData);
      }
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        start_datetime: '',
        end_datetime: '',
        location: '',
        event_type: 'fellowship',
        status: 'published',
        max_attendees: '',
        entry_fee: '',
        featured_image: '',
        additional_info: '',
        is_recurring: false,
        recurrence_pattern: ''
      });
      
      setShowCreateForm(false);
      setEditingEvent(null);
      fetchEvents(); // Refresh events list
      
      alert(editingEvent ? 'Event updated successfully!' : 'Event created successfully!');
    } catch (error) {
      console.error('Error saving event:', error);
      console.error('Error response:', error.response?.data);
      // Show more detailed error information
      if (error.response?.data?.errors) {
        const validationErrors = Object.values(error.response.data.errors).flat();
        alert('Validation errors:\n' + validationErrors.join('\n'));
      } else if (error.response?.data?.message) {
        alert('Server error: ' + error.response.data.message);
      } else {
        alert('Error saving event. Please try again.');
      }
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title || '',
      description: event.description || '',
      start_datetime: event.start_datetime || '',
      end_datetime: event.end_datetime || '',
      location: event.location || '',
      event_type: event.event_type || 'fellowship',
      status: event.status || 'published',
      max_attendees: event.max_attendees || '',
      entry_fee: event.entry_fee || '',
      featured_image: event.featured_image || '',
      additional_info: event.additional_info || '',
      is_recurring: event.is_recurring || false,
      recurrence_pattern: event.recurrence_pattern || ''
    });
    setShowCreateForm(true);
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        // Debug authentication
        const token = localStorage.getItem('auth_token') || localStorage.getItem('token');
        console.log('Auth token exists:', !!token);
        console.log('Token length:', token ? token.length : 0);
        
        await eventService.deleteEvent(eventId);
        fetchEvents(); // Refresh events list
        alert('Event deleted successfully!');
      } catch (error) {
        console.error('Error deleting event:', error);
        console.error('Error details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers
        });
        alert('Error deleting event. Please check console for details.');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Events Management</h2>
          <p className="text-gray-600">Create and manage church events</p>
        </div>
        <button
          onClick={() => {
            setShowCreateForm(true);
            setEditingEvent(null);
            setFormData({
              title: '',
              description: '',
              start_datetime: '',
              end_datetime: '',
              location: '',
              event_type: 'fellowship',
              status: 'published',
              max_attendees: '',
              entry_fee: '',
              featured_image: '',
              additional_info: '',
              is_recurring: false,
              recurrence_pattern: ''
            });
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <FaPlus />
          <span>Add New Event</span>
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {editingEvent ? 'Edit Event' : 'Create New Event'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter event title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Type *
                </label>
                <select
                  name="event_type"
                  value={formData.event_type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {eventTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter event description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date & Time *
                </label>
                <input
                  type="datetime-local"
                  name="start_datetime"
                  value={formData.start_datetime}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date & Time *
                </label>
                <input
                  type="datetime-local"
                  name="end_datetime"
                  value={formData.end_datetime}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Event location"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Attendees
                </label>
                <input
                  type="number"
                  name="max_attendees"
                  value={formData.max_attendees}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0 for unlimited"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Entry Fee
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="entry_fee"
                  value={formData.entry_fee}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Featured Image URL
              </label>
              <input
                type="url"
                name="featured_image"
                value={formData.featured_image}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Information
              </label>
              <textarea
                name="additional_info"
                value={formData.additional_info}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any additional details about the event..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="is_recurring"
                  checked={formData.is_recurring}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_recurring: e.target.checked }))}
                  className="mr-2"
                />
                <label className="text-sm font-medium text-gray-700">
                  Recurring Event
                </label>
              </div>

              {formData.is_recurring && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Recurrence Pattern
                  </label>
                  <select
                    name="recurrence_pattern"
                    value={formData.recurrence_pattern}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select pattern</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingEvent(null);
                }}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingEvent ? 'Update Event' : 'Create Event'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Events List */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Current Events</h3>
        
        {events.length === 0 ? (
          <div className="text-center py-8">
            <FaCalendarAlt className="text-gray-400 text-4xl mx-auto mb-4" />
            <p className="text-gray-600">No events found. Create your first event!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{event.title}</h4>
                    <p className="text-gray-600 mb-3 line-clamp-2">{event.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <FaCalendarAlt />
                        <span>{formatDate(event.start_datetime)}</span>
                      </div>
                      
                      {event.location && (
                        <div className="flex items-center space-x-1">
                          <FaMapMarkerAlt />
                          <span>{event.location}</span>
                        </div>
                      )}
                      
                      {event.max_attendees && (
                        <div className="flex items-center space-x-1">
                          <FaUsers />
                          <span>Max {event.max_attendees}</span>
                        </div>
                      )}
                      
                      {event.entry_fee > 0 && (
                        <div className="flex items-center space-x-1">
                          <FaDollarSign />
                          <span>${event.entry_fee}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(event)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Event"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Event"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default EventsManagement;