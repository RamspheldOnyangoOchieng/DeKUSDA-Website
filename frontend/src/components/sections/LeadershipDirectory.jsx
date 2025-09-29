import React, { useState, useEffect } from 'react';
import { 
  FaPhone, FaEnvelope, FaLinkedin, FaFacebook, 
  FaGraduationCap, FaCalendarAlt, FaQuoteLeft,
  FaChevronDown, FaChevronUp
} from 'react-icons/fa';
import { leaderService } from '../../services/leaders';

// Helper function to resolve image paths
const getImagePath = (imagePath) => {
  if (!imagePath) return null;
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) return imagePath;
  
  // Convert /src/assets/ paths to work with Vite's asset handling
  if (imagePath.startsWith('/src/assets/')) {
    // Remove /src/assets/ and use the filename for importing
    const filename = imagePath.replace('/src/assets/', '');
    try {
      // Use dynamic import for assets - this is a workaround
      return new URL(`../../assets/${filename}`, import.meta.url).href;
    } catch (e) {
      console.warn('Could not resolve image:', imagePath);
      return null;
    }
  }
  
  return imagePath;
};

const LeadershipDirectory = () => {
  const [expandedBio, setExpandedBio] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch leaders from API
  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        setLoading(true);
        const response = await leaderService.getPublicLeaders();
        console.log('Leadership response:', response); // Debug log
        if (response.success) {
          setLeaders(response.data || []);
        } else {
          setLeaders([]);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching leaders:', err);
        setError('Failed to load leadership information');
        setLeaders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaders();
  }, []);

  const categories = [
    { id: 'all', label: 'All Leaders' },
    { id: 'pastoral', label: 'Pastoral Staff' },
    { id: 'elders', label: 'Elders' },
    { id: 'ministry', label: 'Ministry Leaders' },
    { id: 'deacons', label: 'Deacons' }
  ];

  const filteredLeaders = activeCategory === 'all' 
    ? leaders 
    : leaders.filter(leader => leader.category === activeCategory);

  const toggleBio = (leaderId) => {
    setExpandedBio(expandedBio === leaderId ? null : leaderId);
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading leadership information...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Leadership
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet our dedicated spiritual leaders who guide our church family with wisdom, 
            compassion, and unwavering faith in God's calling.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Leaders Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLeaders.map((leader) => (
            <div key={leader.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Leader Image */}
              <div className="h-64 bg-gradient-to-br from-blue-400 to-blue-600 relative">
                {leader.image ? (
                  <img 
                    src={getImagePath(leader.image)} 
                    alt={leader.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.log('Image failed to load:', leader.image);
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className={`flex items-center justify-center h-full ${leader.image ? 'hidden' : ''}`}>
                  <span className="text-6xl font-bold text-white">
                    {leader.name?.charAt(0) || '?'}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    leader.category === 'pastoral' ? 'bg-purple-100 text-purple-800' :
                    leader.category === 'elders' ? 'bg-green-100 text-green-800' :
                    leader.category === 'ministry' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {leader.category ? leader.category.charAt(0).toUpperCase() + leader.category.slice(1) : 'Leader'}
                  </span>
                </div>
              </div>

              {/* Leader Information */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{leader.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{leader.position}</p>
                
                {/* Contact Information */}
                <div className="space-y-2 mb-4">
                  {leader.email && (
                    <div className="flex items-center text-gray-600">
                      <FaEnvelope className="w-4 h-4 mr-2" />
                      <span className="text-sm">{leader.email}</span>
                    </div>
                  )}
                  {leader.phone && (
                    <div className="flex items-center text-gray-600">
                      <FaPhone className="w-4 h-4 mr-2" />
                      <span className="text-sm">{leader.phone}</span>
                    </div>
                  )}
                  {leader.years_of_service && (
                    <div className="flex items-center text-gray-600">
                      <FaCalendarAlt className="w-4 h-4 mr-2" />
                      <span className="text-sm">{leader.years_of_service} years of service</span>
                    </div>
                  )}
                </div>

                {/* Education */}
                {leader.education && (
                  <div className="mb-4">
                    <div className="flex items-center text-gray-700 mb-2">
                      <FaGraduationCap className="w-4 h-4 mr-2" />
                      <span className="font-medium text-sm">Education</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-6">{leader.education}</p>
                  </div>
                )}

                {/* Specialties */}
                {leader.specialties && Array.isArray(leader.specialties) && leader.specialties.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2 text-sm">Specialties</h4>
                    <div className="flex flex-wrap gap-1">
                      {leader.specialties.map((specialty, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievements */}
                {leader.achievements && Array.isArray(leader.achievements) && leader.achievements.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2 text-sm">Key Achievements</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {leader.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-sm">{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Languages */}
                {leader.languages && Array.isArray(leader.languages) && leader.languages.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2 text-sm">Languages</h4>
                    <div className="flex flex-wrap gap-1">
                      {leader.languages.map((language, idx) => (
                        <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Biography */}
                {leader.biography && (
                  <div className="border-t pt-4">
                    <button
                      onClick={() => toggleBio(leader.id)}
                      className="flex items-center justify-between w-full text-left"
                    >
                      <span className="font-medium text-gray-700 flex items-center">
                        <FaQuoteLeft className="w-4 h-4 mr-2" />
                        Biography
                      </span>
                      {expandedBio === leader.id ? (
                        <FaChevronUp className="w-4 h-4 text-gray-500" />
                      ) : (
                        <FaChevronDown className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                    
                    {expandedBio === leader.id && (
                      <div className="mt-3 text-gray-600 text-sm leading-relaxed">
                        {leader.biography}
                      </div>
                    )}
                  </div>
                )}

                {/* Social Links */}
                {(leader.linkedin_url || leader.facebook_url) && (
                  <div className="border-t pt-4 mt-4">
                    <div className="flex space-x-3">
                      {leader.linkedin_url && (
                        <a
                          href={leader.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <FaLinkedin className="w-5 h-5" />
                        </a>
                      )}
                      {leader.facebook_url && (
                        <a
                          href={leader.facebook_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <FaFacebook className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No leaders message */}
        {filteredLeaders.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No leaders found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LeadershipDirectory;

