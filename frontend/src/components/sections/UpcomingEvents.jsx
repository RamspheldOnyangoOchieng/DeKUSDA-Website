import React, { useState, useEffect } from 'react';
import { 
  FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers, 
  FaChevronLeft, FaChevronRight, FaPlus 
} from 'react-icons/fa';
import { AiOutlineArrowRight } from 'react-icons/ai';

const UpcomingEvents = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const events = [
    {
      title: "PCM Mission Emphasis Week",
      date: "2025-09-15",
      time: "Monday-Friday, Various Times",
      location: "DeKUT Campus & Community",
      description: "Personal Christian Ministries department focuses on sharing Christ through practical evangelism and community service.",
      attendees: "All Students & Members",
      category: "Mission",
      image: "/src/assets/MinistryImage1.jpg",
      featured: true,
      register: true
    },
    {
      title: "Deconary Training Workshop",
      date: "2025-09-20",
      time: "Sabbath 3:00 PM",
      location: "Main Sanctuary",
      description: "Deconary Department training for church leadership, communion preparation, and pastoral care ministry.",
      attendees: "Deacons & Leaders",
      category: "Training",
      image: "/src/assets/church.jpeg",
      featured: true,
      register: true
    },
    {
      title: "AMO/ALO Fellowship & Service",
      date: "2025-09-22",
      time: "Sunday 2:00 PM",
      location: "Local Community",
      description: "Adventist Men's & Ladies Organizations unite for community service and fellowship outreach program.",
      attendees: "Men & Women",
      category: "Fellowship",
      image: "/src/assets/helpingHand.jpg",
      featured: true,
      register: true
    },
    {
      title: "Prophecy Department Seminar",
      date: "2025-09-25",
      time: "Wednesday 6:00 PM",
      location: "Lecture Hall",
      description: "Deep study of biblical prophecy and last day events, focusing on Daniel and Revelation.",
      attendees: "Bible Students",
      category: "Bible Study",
      image: "/src/assets/BibleImage.jpg",
      featured: false,
      register: false
    },
    {
      title: "Health Department Wellness Fair",
      date: "2025-09-28",
      time: "Saturday 10:00 AM",
      location: "University Grounds",
      description: "Health screenings, nutrition education, and natural remedies workshop for university community.",
      attendees: "University Community",
      category: "Health",
      image: "/src/assets/HealthyEating.jpg",
      featured: false,
      register: true
    },
    {
      title: "Prayer Department 40 Days of Prayer",
      date: "2025-10-01",
      time: "Daily 6:00 AM & 6:00 PM",
      location: "Prayer Room",
      description: "Intensive prayer campaign for spiritual revival, academic success, and mission advancement.",
      attendees: "Prayer Warriors",
      category: "Prayer",
      image: "/src/assets/MinistryImage6.jpg",
      featured: true,
      register: false
    },
    {
      title: "Sabbath School Teacher Training",
      date: "2025-10-05",
      time: "Saturday 8:00 AM",
      location: "Sabbath School Rooms",
      description: "Quarterly training for Sabbath School teachers and lesson study leaders across all age groups.",
      attendees: "SS Teachers",
      category: "Training",
      image: "/src/assets/SabbathImage.jpg",
      featured: false,
      register: true
    },
    {
      title: "Church Choir & Blissful Tones Concert",
      date: "2025-10-10",
      time: "Sabbath Evening 6:00 PM",
      location: "Main Sanctuary",
      description: "Musical worship evening featuring our Church Choir and Blissful Tones contemporary group.",
      attendees: "Music Lovers",
      category: "Music",
      image: "/src/assets/churchchoir.jpeg",
      featured: false,
      register: false
    },
    {
      title: "Mission Field Preparation Seminar",
      date: "2025-10-15",
      time: "Sunday 9:00 AM - 5:00 PM",
      location: "Conference Room",
      description: "Intensive training for students preparing for mission service and evangelistic outreach.",
      attendees: "Mission Volunteers",
      category: "Mission",
      image: "/src/assets/mission.jpg",
      featured: true,
      register: true
    }
  ];

  const featuredEvents = events.filter(event => event.featured);
  
  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying || featuredEvents.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredEvents.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [featuredEvents.length, isAutoPlaying]);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredEvents.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length);
  };

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Youth': 'bg-blue-500',
      'Health': 'bg-green-500',
      'Outreach': 'bg-orange-500',
      'Bible Study': 'bg-purple-500',
      'Prayer': 'bg-indigo-500',
      'Children': 'bg-pink-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <div className="w-full bg-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            Upcoming Events & Programs
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Stay connected with our church family through our exciting upcoming events, 
            programs, and fellowship opportunities.
          </p>
          <div className="mt-4 sm:mt-6 h-1 w-16 sm:w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Featured Events Slider */}
        <div className="mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Featured Events</h3>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button 
                onClick={prevSlide}
                className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full transition-colors"
              >
                <FaChevronLeft />
              </button>
              <button 
                onClick={nextSlide}
                className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full transition-colors"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>

          <div 
            className="relative overflow-hidden rounded-xl sm:rounded-2xl"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredEvents.map((event, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="relative h-64 sm:h-80 lg:h-96 bg-gradient-to-r from-gray-900 to-gray-700 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover opacity-40 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    
                    <div className="relative h-full flex items-end p-4 sm:p-6 lg:p-8">
                      <div className="text-white max-w-full sm:max-w-2xl">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-3 sm:mb-4">
                          <span className={`px-2 sm:px-3 py-1 ${getCategoryColor(event.category)} text-white text-xs sm:text-sm font-medium rounded-full`}>
                            {event.category}
                          </span>
                          <span className="text-blue-200 text-xs sm:text-sm">
                            {event.attendees}
                          </span>
                        </div>
                        
                        <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3">{event.title}</h4>
                        <p className="text-gray-200 text-sm sm:text-base lg:text-lg mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-none">{event.description}</p>
                        
                        <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-6 mb-4 sm:mb-6">
                          <div className="flex items-center space-x-2">
                            <FaCalendarAlt className="text-blue-400 text-sm" />
                            <span className="text-sm sm:text-base">{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FaClock className="text-blue-400 text-sm" />
                            <span className="text-sm sm:text-base">{event.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FaMapMarkerAlt className="text-blue-400 text-sm" />
                            <span className="text-sm sm:text-base truncate">{event.location}</span>
                          </div>
                        </div>

                        {event.register && (
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-colors">
                            Register Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Slide Indicators */}
            {featuredEvents.length > 1 && (
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
                {featuredEvents.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-white scale-110' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* All Events Grid */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">All Upcoming Events</h3>
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base">
              <span>View Full Calendar</span>
              <AiOutlineArrowRight />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {events.slice(0, 6).map((event, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-shadow overflow-hidden">
                <div className="h-40 sm:h-48 bg-gray-200 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-1 ${getCategoryColor(event.category)} text-white text-xs font-medium rounded`}>
                      {event.category}
                    </span>
                    <span className="text-gray-500 text-xs sm:text-sm">{event.attendees}</span>
                  </div>
                  
                  <h4 className="text-base sm:text-lg font-bold text-gray-800 mb-2">{event.title}</h4>
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{event.description}</p>
                  
                  <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                    <div className="flex items-center text-gray-600 text-xs sm:text-sm">
                      <FaCalendarAlt className="mr-2 text-blue-500 text-xs" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center text-gray-600 text-xs sm:text-sm">
                      <FaClock className="mr-2 text-blue-500 text-xs" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-gray-600 text-xs sm:text-sm">
                      <FaMapMarkerAlt className="mr-2 text-blue-500 text-xs" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-colors">
                      Learn More
                    </button>
                    {event.register && (
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-colors">
                        Register
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Add Event (For Admins) */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Church Calendar</h3>
              <p className="text-gray-600">Stay up to date with all church activities and important dates.</p>
            </div>
            <div className="flex space-x-3">
              <button className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 font-medium transition-colors">
                View Full Calendar
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                <FaPlus className="text-sm" />
                <span>Subscribe to Calendar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
