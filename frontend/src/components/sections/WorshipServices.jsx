import React, { useState } from 'react';
import { 
  FaClock, FaMapMarkerAlt, FaMicrophone, FaBookOpen, 
  FaUsers, FaHeart, FaPlay, FaDownload, FaExternalLinkAlt 
} from 'react-icons/fa';
import { AiOutlineArrowRight } from 'react-icons/ai';

const WorshipServices = () => {
  const [activeTab, setActiveTab] = useState('schedule');
  const [showWorshipContent, setShowWorshipContent] = useState(false);

  const services = [
    {
      name: "Sabbath School",
      time: "Saturday 8:20 AM - 9:45 AM",
      location: "Fellowship Hall & Classrooms",
      description: "Interactive Bible study for all ages with classes for children, youth, and adults.",
      leader: "Elder Patricia Wilson",
      attendees: "All Ages",
      type: "study",
      highlights: ["Adult Class", "Youth Discussion", "Children's Activities", "Quarterly Study"]
    },
    {
      name: "Divine Worship Service",
      time: "Saturday 10:00 AM - 12:00 PM",
      location: "Main Sanctuary",
      description: "Our main worship service featuring inspiring music, prayer, and biblical preaching.",
      leader: "Pastor Frank Ampofo",
      attendees: "200+ Members",
      type: "worship",
      highlights: ["Congregational Singing", "Special Music", "Sermon", "Prayer & Benediction"]
    },
    {
      name: "Afternoon Program",
      time: "Saturday 3:00 PM - 4:30 PM",
      location: "Main Sanctuary",
      description: "Additional worship, testimonies, and ministry-led programming.",
      leader: "Various Ministry Leaders",
      attendees: "Open to All",
      type: "program",
      highlights: ["Personal Ministries", "Youth Programs", "Special Events", "Community Focus"]
    },
    {
      name: "Prayer Meeting",
      time: "Wednesday 7:00 PM - 8:30 PM",
      location: "Fellowship Hall",
      description: "Midweek prayer, Bible study, and spiritual fellowship.",
      leader: "Elder James Mitchell",
      attendees: "Prayer Warriors",
      type: "prayer",
      highlights: ["Intercession", "Bible Study", "Testimonies", "Fellowship"]
    },
    {
      name: "Youth Service",
      time: "Friday 7:00 PM - 9:00 PM",
      location: "Youth Hall",
      description: "Dynamic worship service designed specifically for young people.",
      leader: "Youth Ministry Team",
      attendees: "Youth & Young Adults",
      type: "youth",
      highlights: ["Contemporary Worship", "Youth Choir", "Interactive Study", "Fellowship"]
    }
  ];

  const recentSermons = [
    {
      title: "Walking in Faith During Uncertain Times",
      preacher: "Pastor Frank Ampofo",
      date: "February 3, 2024",
      scripture: "Hebrews 11:1-6",
      duration: "45 minutes",
      views: "156",
      featured: true
    },
    {
      title: "The Power of Prayer in Daily Life",
      preacher: "Elder Patricia Wilson",
      date: "January 27, 2024",
      scripture: "1 Thessalonians 5:16-18",
      duration: "38 minutes",
      views: "203",
      featured: true
    },
    {
      title: "Building Strong Christian Families",
      preacher: "Pastor Frank Ampofo",
      date: "January 20, 2024",
      scripture: "Ephesians 6:1-4",
      duration: "42 minutes",
      views: "178",
      featured: false
    },
    {
      title: "Youth Devotional: Purpose in Christ",
      preacher: "Youth Ministry Team",
      date: "January 19, 2024",
      scripture: "Jeremiah 29:11",
      duration: "25 minutes",
      views: "89",
      featured: false
    }
  ];

  const getServiceIcon = (type) => {
    switch(type) {
      case 'study': return FaBookOpen;
      case 'worship': return FaMicrophone;
      case 'program': return FaUsers;
      case 'prayer': return FaHeart;
      case 'youth': return FaUsers;
      default: return FaClock;
    }
  };

  const getServiceColor = (type) => {
    switch(type) {
      case 'study': return 'from-green-500 to-emerald-500';
      case 'worship': return 'from-blue-500 to-cyan-500';
      case 'program': return 'from-purple-500 to-pink-500';
      case 'prayer': return 'from-indigo-500 to-purple-500';
      case 'youth': return 'from-orange-500 to-red-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Worship Services & Programs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us for meaningful worship, fellowship, and spiritual growth throughout the week. 
            Everyone is welcome in our church family.
          </p>
          <div className="mt-6 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Toggle Button for Worship Content */}
        <div className="text-center mb-8">
          <button 
            onClick={() => setShowWorshipContent(!showWorshipContent)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center mx-auto space-x-2 shadow-lg hover:shadow-xl"
          >
            <span>{showWorshipContent ? 'Hide Worship Details' : 'View Worship Details'}</span>
            <div className={`transform transition-transform duration-300 ${showWorshipContent ? 'rotate-180' : ''}`}>
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
        </div>

        {/* Worship Content - Conditionally Rendered */}
        {showWorshipContent && (
        <div>
        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg shadow-md p-1 flex">
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'schedule' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Service Schedule
            </button>
            <button
              onClick={() => setActiveTab('sermons')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'sermons' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Recent Sermons
            </button>
          </div>
        </div>

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="space-y-8">
            {/* Main Service Highlight */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 mb-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-4">Join Us This Sabbath</h3>
                  <p className="text-blue-100 text-lg mb-6">
                    Experience meaningful worship, inspiring music, and biblical preaching 
                    that will strengthen your faith and encourage your heart.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3">
                      <FaClock className="text-blue-200" />
                      <span className="text-blue-100">Saturday 10:00 AM - 12:00 PM</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaMapMarkerAlt className="text-blue-200" />
                      <span className="text-blue-100">Main Sanctuary</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaMicrophone className="text-blue-200" />
                      <span className="text-blue-100">Pastor Frank Ampofo</span>
                    </div>
                  </div>
                  <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Plan Your Visit
                  </button>
                </div>
                <div className="hidden lg:block">
                  <img 
                    src="/src/assets/church.jpeg" 
                    alt="Worship Service"
                    className="rounded-xl shadow-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => {
                const IconComponent = getServiceIcon(service.type);
                return (
                  <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                    {/* Service Header */}
                    <div className={`bg-gradient-to-r ${getServiceColor(service.type)} p-6 text-white`}>
                      <div className="flex items-center justify-between mb-4">
                        <IconComponent className="text-3xl" />
                        <span className="text-sm opacity-90">{service.attendees}</span>
                      </div>
                      <h4 className="text-xl font-bold">{service.name}</h4>
                    </div>

                    {/* Service Details */}
                    <div className="p-6">
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center text-gray-600">
                          <FaClock className="mr-3 text-blue-500" />
                          <span className="text-sm">{service.time}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FaMapMarkerAlt className="mr-3 text-blue-500" />
                          <span className="text-sm">{service.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FaUsers className="mr-3 text-blue-500" />
                          <span className="text-sm">{service.leader}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Service Highlights */}
                      <div className="mb-4">
                        <h5 className="text-sm font-semibold text-gray-700 mb-2">What to Expect:</h5>
                        <div className="flex flex-wrap gap-1">
                          {service.highlights.map((highlight, idx) => (
                            <span key={idx} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button className="w-full bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                        Learn More
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Sermons Tab */}
        {activeTab === 'sermons' && (
          <div>
            {/* Featured Sermons */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {recentSermons.filter(sermon => sermon.featured).map((sermon, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                        Featured
                      </span>
                      <span className="text-gray-500 text-sm">{sermon.views} views</span>
                    </div>
                    
                    <h4 className="text-xl font-bold text-gray-800 mb-2">{sermon.title}</h4>
                    <p className="text-gray-600 mb-3">by {sermon.preacher}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600 text-sm">
                        <FaBookOpen className="mr-2 text-blue-500" />
                        {sermon.scripture}
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <FaClock className="mr-2 text-blue-500" />
                        {sermon.date} • {sermon.duration}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
                        <FaPlay className="text-xs" />
                        <span>Listen</span>
                      </button>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm transition-colors">
                        <FaDownload />
                      </button>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm transition-colors">
                        <FaExternalLinkAlt />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* All Sermons List */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">Sermon Archive</h3>
                  <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium">
                    <span>View All Sermons</span>
                    <AiOutlineArrowRight />
                  </button>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {recentSermons.map((sermon, index) => (
                  <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-1">{sermon.title}</h4>
                        <p className="text-gray-600 text-sm mb-2">by {sermon.preacher}</p>
                        <div className="flex items-center space-x-4 text-gray-500 text-xs">
                          <span>{sermon.date}</span>
                          <span>•</span>
                          <span>{sermon.scripture}</span>
                          <span>•</span>
                          <span>{sermon.duration}</span>
                          <span>•</span>
                          <span>{sermon.views} views</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                          <FaPlay className="text-xs" />
                          <span>Play</span>
                        </button>
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors">
                          <FaDownload className="text-sm" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-gray-50 to-blue-50 border border-blue-200 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">First Time Visitor?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We'd love to welcome you to our church family! Learn what to expect, 
            find parking information, and discover how to get connected.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              Plan Your Visit
            </button>
            <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
              Contact Us
            </button>
          </div>
        </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default WorshipServices;
