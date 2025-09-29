import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPlus, FaEdit, FaTrash, FaUser, FaPhone, FaEnvelope, 
  FaGraduationCap, FaQuoteLeft, FaSort, FaEye 
} from 'react-icons/fa';
import { leaderService } from '../../services/leaders';

const LeadershipManagement = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingLeader, setEditingLeader] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    category: 'pastoral',
    phone: '',
    quote: '',
    languages: '',
    image: '',
    status: 'active'
  });

  const categories = leaderService.getCategories();
  const categoryOptions = [
    { value: 'pastoral', label: 'Pastoral Staff' },
    { value: 'elders', label: 'Church Elders' },
    { value: 'ministry', label: 'Ministry Directors' },
    { value: 'deacons', label: 'Deacons & Deaconesses' }
  ];

  useEffect(() => {
    fetchLeaders();
  }, []);

  const fetchLeaders = async () => {
    try {
      setLoading(true);
      const response = await leaderService.getLeaders();
      if (response.success) {
        setLeaders(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching leaders:', error);
      alert('Failed to fetch leaders');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayInputChange = (field, value) => {
    // Convert comma-separated string to array
    const arrayValue = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({ ...prev, [field]: arrayValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!(formData.name || '').trim()) {
      alert('Name is required');
      return;
    }
    if (!(formData.title || '').trim()) {
      alert('Title is required');
      return;
    }
    
    try {
      // Prepare data for submission
      const submitData = {
        name: (formData.name || '').trim(),
        title: (formData.title || '').trim(),
        category: formData.category,
        phone: (formData.phone || '').trim() || null,
        quote: (formData.quote || '').trim() || null,
        image: (formData.image || '').trim() || null,
        languages: typeof formData.languages === 'string'
          ? formData.languages.split(',').map(l => l.trim()).filter(l => l)
          : formData.languages || [],
        status: formData.status
      };

      console.log('Submitting leader data:', submitData);

      if (editingLeader) {
        await leaderService.updateLeader(editingLeader.id, submitData);
        alert('Leader updated successfully!');
      } else {
        await leaderService.createLeader(submitData);
        alert('Leader created successfully!');
      }
      
      // Reset form
      setFormData({
        name: '',
        title: '',
        category: 'pastoral',
        phone: '',
        quote: '',
        languages: '',
        image: '',
        status: 'active'
      });
      
      setShowCreateForm(false);
      setEditingLeader(null);
      fetchLeaders();
      
    } catch (error) {
      console.error('Error saving leader:', error);
      console.error('Error response:', error.response?.data);
      
      if (error.response?.data?.errors) {
        const validationErrors = Object.values(error.response.data.errors).flat();
        alert('Validation errors:\n' + validationErrors.join('\n'));
      } else if (error.response?.data?.message) {
        alert('Error: ' + error.response.data.message);
      } else {
        alert('Error saving leader. Please try again.');
      }
    }
  };

  const handleEdit = (leader) => {
    setEditingLeader(leader);
    setFormData({
      name: leader.name || '',
      title: leader.title || '',
      category: leader.category || 'pastoral',
      phone: leader.phone || '',
      quote: leader.quote || '',
      languages: Array.isArray(leader.languages) ? leader.languages.join(', ') : '',
      image: leader.image || '',
      status: leader.status || 'active'
    });
    setShowCreateForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this leader?')) {
      try {
        await leaderService.deleteLeader(id);
        alert('Leader deleted successfully!');
        fetchLeaders();
      } catch (error) {
        console.error('Error deleting leader:', error);
        alert('Error deleting leader. Please try again.');
      }
    }
  };

  const filteredLeaders = activeCategory === 'all' 
    ? leaders 
    : leaders.filter(leader => leader.category === activeCategory);

  const categoryCounts = leaderService.getCategoryCounts(leaders);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading leadership...</div>
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
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Leadership Management</h2>
          <p className="text-gray-600">Manage church leadership directory</p>
        </div>
        <button
          onClick={() => {
            setShowCreateForm(true);
            setEditingLeader(null);
            setFormData({
              name: '',
              title: '',
              category: 'pastoral',
              phone: '',
              quote: '',
              languages: '',
              image: '',
              status: 'active'
            });
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <FaPlus />
          <span>Add New Leader</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeCategory === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Leaders ({categoryCounts.all})
        </button>
        {Object.entries(categories).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeCategory === key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {label} ({categoryCounts[key] || 0})
          </button>
        ))}
      </div>

      {showCreateForm && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {editingLeader ? 'Edit Leader' : 'Create New Leader'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position/Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Senior Pastor"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categoryOptions.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+254 700 123 456"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Personal Quote
              </label>
              <textarea
                name="quote"
                value={formData.quote}
                onChange={handleInputChange}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Inspirational quote or personal motto..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Languages
              </label>
              <input
                type="text"
                name="languages"
                value={formData.languages}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="English, Kiswahili, French (comma-separated)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Image
              </label>
              <select
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select an image</option>
                <option value="/src/assets/pastor-frank.png">Pastor Frank</option>
                <option value="/src/assets/elder.jpg">Elder</option>
                <option value="/src/assets/dekusdachurchlogo.png">Dekusda Church Logo</option>
                <option value="/src/assets/church.jpeg">Church</option>
                <option value="/src/assets/churchboard.jpeg">Church Board</option>
                <option value="/src/assets/churchchoir.jpeg">Church Choir</option>
                <option value="/src/assets/BIBLESTUDY.jpg">Bible Study</option>
                <option value="/src/assets/Bereans.jpg">Bereans</option>
                <option value="/src/assets/Collettes.jpg">Collettes</option>
                <option value="/src/assets/Dekusda.jpg">Dekusda</option>
                <option value="/src/assets/Dekusda2.jpg">Dekusda 2</option>
                <option value="/src/assets/Dekusda3.jpg">Dekusda 3</option>
                <option value="/src/assets/Dekusdamain.jpg">Dekusda Main</option>
                <option value="/src/assets/Fofanas.jpg">Fofanas</option>
                <option value="/src/assets/HELLEN G WHITE.jpg">Hellen G White</option>
                <option value="/src/assets/HealthyEating.jpg">Healthy Eating</option>
                <option value="/src/assets/PCMgroup.png">PCM Group</option>
                <option value="/src/assets/PCMlogo.png">PCM Logo</option>
                <option value="/src/assets/Pilgrims.jpg">Pilgrims</option>
                <option value="/src/assets/Sdachurchlogo.jpg">SDA Church Logo</option>
                <option value="/src/assets/SunsetImage.jpg">Sunset Image</option>
                <option value="/src/assets/dekusdachurchlogo2.jpg">Dekusda Church Logo 2</option>
                <option value="/src/assets/dekusdalogo.jpg">Dekusda Logo</option>
                <option value="/src/assets/harmonization.jpg">Harmonization</option>
                <option value="/src/assets/logo.jpg">Logo</option>
                <option value="/src/assets/mission.jpg">Mission</option>
                <option value="/src/assets/mission2.jpeg">Mission 2</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingLeader(null);
                }}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingLeader ? 'Update Leader' : 'Create Leader'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Leaders List */}
      <div className="grid gap-6">
        {filteredLeaders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No leaders found for this category
          </div>
        ) : (
          filteredLeaders.map((leader) => (
            <motion.div
              key={leader.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    {leader.image ? (
                      <img 
                        src={leader.image} 
                        alt={leader.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaUser className="text-gray-400 text-2xl" />
                    )}
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{leader.name}</h3>
                      <p className="text-lg text-blue-600">{leader.title}</p>
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded mt-1">
                        {categories[leader.category]}
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(leader)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(leader.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    {leader.phone && (
                      <div className="flex items-center">
                        <FaPhone className="mr-2 text-blue-500" />
                        {leader.phone}
                      </div>
                    )}
                  </div>
                  
                  {leader.quote && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg italic text-gray-700">
                      <FaQuoteLeft className="inline mr-2 text-blue-500" />
                      {leader.quote}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default LeadershipManagement;