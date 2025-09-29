import API from './api';

export const eventService = {
  // Get all events (public)
  getEvents: async (params = {}) => {
    const response = await API.get('/v1/events', { params });
    return response.data;
  },

  // Get calendar view
  getCalendar: async (month, year) => {
    const response = await API.get('/v1/events/calendar', { 
      params: { month, year } 
    });
    return response.data;
  },

  // Get single event (public)
  getEvent: async (eventId) => {
    const response = await API.get(`/v1/events/${eventId}`);
    return response.data;
  },

  // RSVP to event
  rsvpEvent: async (eventId, attending = true) => {
    const response = await API.post(`/v1/events/${eventId}/rsvp`, { attending });
    return response.data;
  },

  // Create event (admin only)
  createEvent: async (eventData) => {
    const response = await API.post('/v1/events', eventData);
    return response.data;
  },

  // Update event (admin only)
  updateEvent: async (eventId, eventData) => {
    const response = await API.put(`/v1/events/${eventId}`, eventData);
    return response.data;
  },

  // Delete event (admin only)
  deleteEvent: async (eventId) => {
    const response = await API.delete(`/v1/events/${eventId}`);
    return response.data;
  },

  // Get event attendees (admin only)
  getAttendees: async (eventId) => {
    const response = await API.get(`/events/${eventId}/attendees`);
    return response.data;
  }
};
