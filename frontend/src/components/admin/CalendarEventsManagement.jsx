import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCalendarAlt, FaPlus, FaEdit, FaTrash, FaClock, FaMapMarkerAlt,
  FaUsers, FaTag, FaSave, FaTimes, FaEye, FaChurch, FaBookOpen
} from 'react-icons/fa';

const CalendarEventsManagement = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [message, setMessage] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [eventForm, setEventForm] = useState({
    date: '',
    sabbath_school_topic: '',
    sabbath_school_presenter: '',
    divine_service_topic: '',
    divine_service_preacher: '',
    afternoon_program: '',
    afternoon_presenter: '',
    special_notes: '',
    event_type: 'regular', // regular, special, camp_meeting, etc.
    is_featured: false
  });

  // Sample event types
  const eventTypes = [
    { value: 'regular', label: 'Regular Sabbath' },
    { value: 'special', label: 'Special Program' },
    { value: 'camp_meeting', label: 'Camp Meeting' },
    { value: 'evangelism', label: 'Evangelistic Campaign' },
    { value: 'youth', label: 'Youth Program' },
    { value: 'communion', label: 'Communion Service' },
    { value: 'baptism', label: 'Baptism Service' },
    { value: 'conference', label: 'Conference Event' }
  ];

  // Months for filtering
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    loadEvents();
  }, [selectedMonth, selectedYear]);

  const loadEvents = async () => {
    try {
      setIsLoading(true);
      // In a real implementation, this would call the events API
      // For now, we'll use sample data
      const sampleEvents = [
        {
          id: 1,
          date: '2025-09-06',
          sabbath_school_topic: 'Walking in Faith',
          sabbath_school_presenter: 'Elder John Kamau',
          divine_service_topic: 'The Power of Prayer',
          divine_service_preacher: 'Pastor Frank Maina',
          afternoon_program: 'Youth Fellowship',
          afternoon_presenter: 'Youth Ministry Team',
          special_notes: 'First Sabbath Communion',
          event_type: 'communion',
          is_featured: true
        },
        {
          id: 2,
          date: '2025-09-13',
          sabbath_school_topic: 'Bible Study Methods',
          sabbath_school_presenter: 'Deacon Peter Mwangi',
          divine_service_topic: 'Christian Education',
          divine_service_preacher: 'Dr. Sarah Kimani',
          afternoon_program: 'Personal Ministries Training',
          afternoon_presenter: 'Personal Ministries Dept.',
          special_notes: '',
          event_type: 'regular',
          is_featured: false
        }
      ];
      setEvents(sampleEvents);
      setMessage('Calendar events loaded successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error loading events:', error);
      setMessage('Failed to load calendar events');
      setTimeout(() => setMessage(''), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let updatedEvents;
      if (editingEvent) {
        // Update existing event
        updatedEvents = events.map(event => 
          event.id === editingEvent.id 
            ? { ...event, ...eventForm }
            : event
        );
        setMessage('Calendar event updated successfully');
      } else {
        // Create new event
        const newEvent = {
          id: Date.now(),
          ...eventForm
        };
        updatedEvents = [...events, newEvent];
        setMessage('Calendar event created successfully');
      }
      
      setEvents(updatedEvents);
      resetForm();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving event:', error);
      setMessage('Failed to save calendar event');
      setTimeout(() => setMessage(''), 5000);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this calendar event?')) {
      try {
        const updatedEvents = events.filter(event => event.id !== id);
        setEvents(updatedEvents);
        setMessage('Calendar event deleted successfully');
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        console.error('Error deleting event:', error);
        setMessage('Failed to delete calendar event');
        setTimeout(() => setMessage(''), 5000);
      }
    }
  };

  const startEditing = (event) => {
    setEventForm({
      date: event.date,
      sabbath_school_topic: event.sabbath_school_topic,
      sabbath_school_presenter: event.sabbath_school_presenter,
      divine_service_topic: event.divine_service_topic,
      divine_service_preacher: event.divine_service_preacher,
      afternoon_program: event.afternoon_program,
      afternoon_presenter: event.afternoon_presenter,
      special_notes: event.special_notes,
      event_type: event.event_type,
      is_featured: event.is_featured
    });
    setEditingEvent(event);
    setShowForm(true);
  };

  const resetForm = () => {
    setEventForm({
      date: '',
      sabbath_school_topic: '',
      sabbath_school_presenter: '',
      divine_service_topic: '',
      divine_service_preacher: '',
      afternoon_program: '',
      afternoon_presenter: '',
      special_notes: '',
      event_type: 'regular',
      is_featured: false
    });
    setEditingEvent(null);
    setShowForm(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEventTypeLabel = (type) => {
    const eventType = eventTypes.find(t => t.value === type);
    return eventType ? eventType.label : type;
  };

  const getEventTypeColor = (type) => {
    const colors = {
      regular: 'bg-blue-100 text-blue-800',
      special: 'bg-purple-100 text-purple-800',
      camp_meeting: 'bg-green-100 text-green-800',
      evangelism: 'bg-orange-100 text-orange-800',
      youth: 'bg-yellow-100 text-yellow-800',
      communion: 'bg-red-100 text-red-800',
      baptism: 'bg-teal-100 text-teal-800',
      conference: 'bg-indigo-100 text-indigo-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

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
              <FaCalendarAlt className="mr-3" />
              Calendar of Events Management
            </h2>
            <p className="text-gray-600 mt-2">Manage Sabbath programs and special events</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaPlus className="mr-2" />
            Add Event
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

        {/* Month/Year Filter */}
        <div className="flex items-center space-x-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              {months.map((month, index) => (
                <option key={index} value={index}>{month}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              {[2024, 2025, 2026, 2027, 2028].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Event Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-4 text-blue-800">
              {editingEvent ? 'Edit Calendar Event' : 'Add New Calendar Event'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Type
                  </label>
                  <select
                    value={eventForm.event_type}
                    onChange={(e) => setEventForm({ ...eventForm, event_type: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    {eventTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Sabbath School Section */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <FaBookOpen className="mr-2 text-blue-600" />
                  Sabbath School
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sabbath School Topic
                    </label>
                    <input
                      type="text"
                      value={eventForm.sabbath_school_topic}
                      onChange={(e) => setEventForm({ ...eventForm, sabbath_school_topic: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter Sabbath School lesson topic"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Presenter
                    </label>
                    <input
                      type="text"
                      value={eventForm.sabbath_school_presenter}
                      onChange={(e) => setEventForm({ ...eventForm, sabbath_school_presenter: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter presenter name"
                    />
                  </div>
                </div>
              </div>

              {/* Divine Service Section */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <FaChurch className="mr-2 text-blue-600" />
                  Divine Service
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Divine Service Topic
                    </label>
                    <input
                      type="text"
                      value={eventForm.divine_service_topic}
                      onChange={(e) => setEventForm({ ...eventForm, divine_service_topic: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter sermon topic"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preacher
                    </label>
                    <input
                      type="text"
                      value={eventForm.divine_service_preacher}
                      onChange={(e) => setEventForm({ ...eventForm, divine_service_preacher: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter preacher name"
                    />
                  </div>
                </div>
              </div>

              {/* Afternoon Program Section */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <FaClock className="mr-2 text-blue-600" />
                  Afternoon Program
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Afternoon Program
                    </label>
                    <input
                      type="text"
                      value={eventForm.afternoon_program}
                      onChange={(e) => setEventForm({ ...eventForm, afternoon_program: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter afternoon program details"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Presenter/Department
                    </label>
                    <input
                      type="text"
                      value={eventForm.afternoon_presenter}
                      onChange={(e) => setEventForm({ ...eventForm, afternoon_presenter: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter presenter or department"
                    />
                  </div>
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Notes
                </label>
                <textarea
                  value={eventForm.special_notes}
                  onChange={(e) => setEventForm({ ...eventForm, special_notes: e.target.value })}
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add any special notes or announcements"
                />
              </div>

              {/* Featured Event */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={eventForm.is_featured}
                  onChange={(e) => setEventForm({ ...eventForm, is_featured: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                  Mark as featured event
                </label>
              </div>

              {/* Form Actions */}
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaSave className="mr-2" />
                  {editingEvent ? 'Update Event' : 'Create Event'}
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

      {/* Events List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Calendar Events ({events.length})
          </h3>
        </div>

        {events.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <FaCalendarAlt className="text-4xl mx-auto mb-4 opacity-50" />
            <p>No calendar events found for {months[selectedMonth]} {selectedYear}</p>
            <p className="text-sm mt-2">Add your first calendar event to get started.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {events.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-lg font-semibold text-gray-900">
                        {formatDate(event.date)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.event_type)}`}>
                        {getEventTypeLabel(event.event_type)}
                      </span>
                      {event.is_featured && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gold-100 text-gold-800">
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h4 className="font-medium text-blue-800 mb-1">Sabbath School</h4>
                        <p className="text-gray-800">{event.sabbath_school_topic}</p>
                        <p className="text-gray-600">{event.sabbath_school_presenter}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-800 mb-1">Divine Service</h4>
                        <p className="text-gray-800">{event.divine_service_topic}</p>
                        <p className="text-gray-600">{event.divine_service_preacher}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-800 mb-1">Afternoon Program</h4>
                        <p className="text-gray-800">{event.afternoon_program}</p>
                        <p className="text-gray-600">{event.afternoon_presenter}</p>
                      </div>
                    </div>

                    {event.special_notes && (
                      <div className="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                        <p className="text-sm text-yellow-800">{event.special_notes}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => startEditing(event)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      title="Edit Event"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      title="Delete Event"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarEventsManagement;