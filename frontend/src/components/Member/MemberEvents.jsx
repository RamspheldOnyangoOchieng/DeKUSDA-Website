import React, { useState, useEffect } from 'react';
import { memberService } from '../../services/adminService';
import { FiCalendar, FiMapPin, FiClock, FiUsers, FiExternalLink } from 'react-icons/fi';

const MemberEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await memberService.getMyEvents();
      if (response.success) {
        setEvents(response.data.data || []);
      }
    } catch (err) {
      setError('Failed to load events');
      console.error('Events error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getEventStatus = (eventDate) => {
    const today = new Date();
    const event = new Date(eventDate);
    
    if (event.toDateString() === today.toDateString()) {
      return { status: 'Today', color: 'bg-green-100 text-green-800' };
    } else if (event > today) {
      return { status: 'Upcoming', color: 'bg-blue-100 text-blue-800' };
    } else {
      return { status: 'Past', color: 'bg-gray-100 text-gray-800' };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Church Events</h1>
          <p className="mt-2 text-gray-600">Stay updated with upcoming church activities and events</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Events Grid */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => {
              const eventStatus = getEventStatus(event.event_date);
              return (
                <div key={event.id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200">
                  {/* Event Image */}
                  {event.featured_image && (
                    <div className="h-48 w-full overflow-hidden">
                      <img
                        className="h-full w-full object-cover"
                        src={event.featured_image}
                        alt={event.title}
                      />
                    </div>
                  )}
                  
                  <div className="px-4 py-5 sm:p-6">
                    {/* Event Status Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${eventStatus.color}`}>
                        {eventStatus.status}
                      </span>
                      {event.category && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {event.category}
                        </span>
                      )}
                    </div>

                    {/* Event Title */}
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{event.title}</h3>

                    {/* Event Description */}
                    {event.description && (
                      <p className="text-sm text-gray-500 mb-4 line-clamp-3">
                        {event.description}
                      </p>
                    )}

                    {/* Event Details */}
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <FiCalendar className="flex-shrink-0 mr-1.5 h-4 w-4" />
                        {new Date(event.event_date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      
                      {event.start_time && (
                        <div className="flex items-center text-sm text-gray-500">
                          <FiClock className="flex-shrink-0 mr-1.5 h-4 w-4" />
                          {event.start_time} {event.end_time && `- ${event.end_time}`}
                        </div>
                      )}
                      
                      {event.location && (
                        <div className="flex items-center text-sm text-gray-500">
                          <FiMapPin className="flex-shrink-0 mr-1.5 h-4 w-4" />
                          {event.location}
                        </div>
                      )}
                      
                      {event.max_attendance && (
                        <div className="flex items-center text-sm text-gray-500">
                          <FiUsers className="flex-shrink-0 mr-1.5 h-4 w-4" />
                          Max {event.max_attendance} attendees
                        </div>
                      )}
                    </div>

                    {/* Event Actions */}
                    <div className="mt-4 flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        {event.organizer && `Organized by ${event.organizer}`}
                      </div>
                      
                      {event.registration_link && (
                        <a
                          href={event.registration_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500"
                        >
                          Register
                          <FiExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <FiCalendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No events found</h3>
            <p className="mt-1 text-sm text-gray-500">
              There are currently no events scheduled. Check back later for updates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberEvents;
