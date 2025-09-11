import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AiOutlineHome, AiOutlineLogout, AiOutlineUser, AiOutlineTeam, 
  AiOutlineSetting, AiOutlineBarChart, AiOutlineBell, AiOutlineCalendar,
  AiOutlineMail, AiOutlineFileText, AiOutlineDatabase
} from 'react-icons/ai';
import { 
  FaBroadcastTower, FaUsers, FaChurch, FaCrown, FaShieldAlt,
  FaUserCog, FaChartLine, FaGlobe, FaServer, FaTools, FaHeadset,
  FaDollarSign
} from 'react-icons/fa';
import { BiStats, BiCog, BiSupport } from 'react-icons/bi';
import { motion } from 'framer-motion';
import Loader from '../components/Loader';

const CommunicationDashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      navigate('/leaders');
      return;
    }

    setUser(JSON.parse(userData));
    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/dashboard`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('department');
    navigate('/');
  };

  const menuItems = [
    { id: 'overview', label: 'System Overview', icon: FaGlobe },
    { id: 'departments', label: 'All Departments', icon: FaUsers },
    { id: 'communications', label: 'Communications', icon: FaBroadcastTower },
    { id: 'members', label: 'Member Management', icon: AiOutlineTeam },
    { id: 'analytics', label: 'Advanced Analytics', icon: FaChartLine },
    { id: 'system', label: 'System Administration', icon: FaServer },
    { id: 'settings', label: 'Global Settings', icon: AiOutlineSetting },
    { id: 'support', label: 'Technical Support', icon: FaHeadset }
  ];

  const departmentCards = [
    { name: 'Youth Ministry', members: 45, active: 38, color: 'bg-blue-500' },
    { name: 'Music Ministry', members: 32, active: 29, color: 'bg-green-500' },
    { name: 'Pastoral Team', members: 8, active: 8, color: 'bg-red-500' },
    { name: 'Health Ministry', members: 23, active: 20, color: 'bg-orange-500' },
    { name: 'Education Ministry', members: 19, active: 16, color: 'bg-teal-500' },
    { name: 'Finance Committee', members: 12, active: 11, color: 'bg-gray-500' },
    { name: 'Prayer Ministry', members: 35, active: 32, color: 'bg-purple-500' },
    { name: 'Communication Dept', members: 15, active: 15, color: 'bg-indigo-500' }
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-gradient-to-r from-purple-800 to-indigo-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <FaBroadcastTower className="text-3xl text-yellow-400" />
              <div>
                <h1 className="text-xl font-bold text-white">Communication Command Center</h1>
                <p className="text-purple-200 text-xs">Supreme Administrative Access</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2">
                <FaCrown className="text-yellow-400" />
                <span className="text-white text-sm">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <AiOutlineLogout />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg h-screen sticky top-0">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <FaShieldAlt className="text-2xl text-purple-600" />
              <span className="font-bold text-gray-800">Supreme Control</span>
            </div>
            
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-purple-100 text-purple-700 border-l-4 border-purple-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="text-lg" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeSection === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">System Overview</h2>
                <p className="text-gray-600">Complete church management system status</p>
              </div>

              {/* Supreme Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Total Members</p>
                      <p className="text-3xl font-bold">{stats?.total_members || 0}</p>
                    </div>
                    <FaUsers className="text-4xl text-purple-200" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Active Departments</p>
                      <p className="text-3xl font-bold">8</p>
                    </div>
                    <FaChurch className="text-4xl text-green-200" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">System Uptime</p>
                      <p className="text-3xl font-bold">99.9%</p>
                    </div>
                    <FaServer className="text-4xl text-blue-200" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Communications</p>
                      <p className="text-3xl font-bold">Active</p>
                    </div>
                    <FaBroadcastTower className="text-4xl text-orange-200" />
                  </div>
                </div>
              </div>

              {/* Department Overview */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Department Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {departmentCards.map((dept, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`w-3 h-3 rounded-full ${dept.color}`}></div>
                        <h4 className="font-semibold text-gray-800">{dept.name}</h4>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">Total: {dept.members}</p>
                        <p className="text-sm text-green-600">Active: {dept.active}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Supreme Administrative Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg flex items-center space-x-3 transition-colors">
                    <FaUserCog className="text-2xl" />
                    <div className="text-left">
                      <p className="font-semibold">Manage All Users</p>
                      <p className="text-sm text-purple-100">Full user administration</p>
                    </div>
                  </button>

                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-lg flex items-center space-x-3 transition-colors">
                    <BiCog className="text-2xl" />
                    <div className="text-left">
                      <p className="font-semibold">System Settings</p>
                      <p className="text-sm text-indigo-100">Global configuration</p>
                    </div>
                  </button>

                  <button className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg flex items-center space-x-3 transition-colors">
                    <BiSupport className="text-2xl" />
                    <div className="text-left">
                      <p className="font-semibold">Technical Support</p>
                      <p className="text-sm text-green-100">System maintenance</p>
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'communications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Communications Center</h2>
                <p className="text-gray-600">Broadcast and communication management</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Broadcast Messages</h3>
                  <div className="space-y-4">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg text-left">
                      <p className="font-semibold">Send Church-wide Announcement</p>
                      <p className="text-sm text-blue-100">Reach all members instantly</p>
                    </button>
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg text-left">
                      <p className="font-semibold">Department Communications</p>
                      <p className="text-sm text-green-100">Send to specific departments</p>
                    </button>
                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg text-left">
                      <p className="font-semibold">Emergency Notifications</p>
                      <p className="text-sm text-purple-100">Critical alerts system</p>
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Communication Analytics</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Messages Sent Today</p>
                      <p className="text-2xl font-bold text-gray-800">24</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Active Recipients</p>
                      <p className="text-2xl font-bold text-gray-800">189</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Engagement Rate</p>
                      <p className="text-2xl font-bold text-gray-800">87%</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Add more sections as needed */}
          {activeSection !== 'overview' && activeSection !== 'communications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <FaTools className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">
                {menuItems.find(item => item.id === activeSection)?.label}
              </h3>
              <p className="text-gray-500">This section is under development</p>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CommunicationDashboard;
