import React, { useState, useEffect } from 'react';
import { HiOutlineLocationMarker, HiOutlineClock } from 'react-icons/hi';
import { FaBullhorn, FaCalendarAlt } from 'react-icons/fa';
import announcementService from '../../services/announcements';

const AnnouncementBanner = () => {
  const [announcement, setAnnouncement] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeaturedAnnouncement();
  }, []);

  const fetchFeaturedAnnouncement = async () => {
    try {
      setIsLoading(true);
      const response = await announcementService.getFeaturedAnnouncement();
      
      if (response.success && response.data && response.data.length > 0) {
        // Get the first featured announcement
        setAnnouncement(response.data[0]);
      } else {
        // Fallback to default content if no announcement is found
        setAnnouncement(null);
      }
    } catch (error) {
      console.error('Error fetching featured announcement:', error);
      setError(error.message);
      setAnnouncement(null); // Fallback to default
    } finally {
      setIsLoading(false);
    }
  };

  // Default fallback content
  const defaultAnnouncement = {
    title: "This Sabbath is a Communication Sabbath",
    content: "Join us for a special time of worship and fellowship — see you there!",
    event_time: "7:50 AM",
    event_location: "Food Science Workshop"
  };

  const displayAnnouncement = announcement || defaultAnnouncement;

  if (isLoading) {
    return (
      <div className="w-full bg-gradient-to-b from-lightBlue/50 to-primaryBlue/20 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-gradient-to-r from-primaryBlue via-darkBlue to-primaryBlue rounded-2xl shadow-lg px-8 py-6 max-w-2xl text-center">
                <div className="animate-pulse">
                  <div className="h-8 bg-white/20 rounded mb-3"></div>
                  <div className="h-6 bg-white/20 rounded mb-4"></div>
                  <div className="h-10 bg-white/20 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-b from-lightBlue/50 to-primaryBlue/20 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-primaryBlue via-darkBlue to-primaryBlue rounded-2xl shadow-lg px-8 py-6 max-w-2xl text-center">
              {/* Announcement Icon */}
              {announcement && (
                <div className="flex justify-center mb-3">
                  <FaBullhorn className="w-6 h-6 text-white/80" />
                </div>
              )}
              
              {/* Main Title */}
              <h2 className="text-3xl font-bold text-white tracking-wide mb-3">
                {displayAnnouncement.title}
              </h2>
              
              {/* Content/Description */}
              <p className="text-white/80 font-medium mb-4">
                {displayAnnouncement.content}
              </p>
              
              {/* Event Details */}
              {(displayAnnouncement.event_time || displayAnnouncement.event_location) && (
                <span className="inline-flex items-center gap-2 bg-white text-primaryBlue font-semibold px-5 py-2 rounded-full shadow hover:shadow-lg transition">
                  {displayAnnouncement.event_location && (
                    <>
                      <HiOutlineLocationMarker className="w-5 h-5 text-primaryBlue" />
                      {displayAnnouncement.event_location}
                    </>
                  )}
                  {displayAnnouncement.event_time && (
                    <>
                      {displayAnnouncement.event_location && " • "}
                      <HiOutlineClock className="w-5 h-5 text-primaryBlue" />
                      {displayAnnouncement.event_time}
                    </>
                  )}
                </span>
              )}

              {/* Action Button if action is required */}
              {announcement && announcement.action_required && (
                <div className="mt-4">
                  <button className="bg-white text-primaryBlue font-semibold px-6 py-2 rounded-full shadow hover:shadow-lg transition hover:bg-gray-50">
                    Learn More
                  </button>
                </div>
              )}

              {/* Category Badge */}
              {announcement && announcement.category && (
                <div className="mt-3">
                  <span className="inline-block bg-white/20 text-white text-sm px-3 py-1 rounded-full">
                    {announcement.category.charAt(0).toUpperCase() + announcement.category.slice(1)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;