import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AiOutlineHome, AiOutlineLogout, AiOutlineUser, AiOutlineTeam, 
  AiOutlineSetting, AiOutlineBarChart, AiOutlineBell, AiOutlineCalendar,
  AiOutlineMail, AiOutlineFileText, AiOutlineGlobal
} from 'react-icons/ai';
import { 
  FaUsers, FaMicrophone, FaHeartbeat, FaBookOpen, FaCalculator, FaPray,
  FaUserTie, FaChartLine, FaClipboardList, FaTasks, FaCalendarAlt, FaDollarSign,
  FaUserFriends
} from 'react-icons/fa';
import { BiStats, BiCog } from 'react-icons/bi';
import { motion } from 'framer-motion';
import Loader from '../components/Loader';
import EventsManagement from '../components/admin/EventsManagement';
import HomepageManagement from '../components/admin/HomepageManagement';
import UniversalContentManagement from '../components/admin/UniversalContentManagement';
import CalendarEventsManagement from '../components/admin/CalendarEventsManagement';
import AnnouncementsManagement from '../components/admin/AnnouncementsManagement';
import LeadershipManagement from '../components/admin/LeadershipManagement';

const DepartmentDashboard = () => {
  const [user, setUser] = useState(null);
  const [department, setDepartment] = useState('');
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const navigate = useNavigate();

  const departmentConfigs = {
    youth: {
      name: 'Youth Ministry',
      icon: FaUsers,
      color: 'from-blue-600 to-cyan-600',
      description: 'Empowering the next generation for Christ'
    },
    music: {
      name: 'Music Ministry',
      icon: FaMicrophone,
      color: 'from-green-600 to-emerald-600',
      description: 'Leading worship through music and praise'
    },
    health: {
      name: 'Health Ministry',
      icon: FaHeartbeat,
      color: 'from-orange-600 to-amber-600',
      description: 'Promoting wholistic health and wellness'
    },
    education: {
      name: 'Education Ministry',
      icon: FaBookOpen,
      color: 'from-teal-600 to-green-600',
      description: 'Teaching and discipleship programs'
    },
    prayer: {
      name: 'Prayer Ministry',
      icon: FaPray,
      color: 'from-violet-600 to-purple-600',
      description: 'Intercession and spiritual warfare'
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const deptData = localStorage.getItem('department');
    
    // Check for invalid or missing data
    if (!token || !userData || !deptData || userData === 'undefined' || userData === 'null') {
      // Clear any invalid localStorage data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('department');
      navigate('/leaders');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setDepartment(deptData);
      fetchDashboardData();
    } catch (error) {
      console.error('Error parsing user data:', error);
      // Clear invalid data and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('department');
      navigate('/leaders');
    }
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      const base = (import.meta?.env?.VITE_API_URL) ? `${import.meta.env.VITE_API_URL}` : 'http://127.0.0.1:8000';
      const token = localStorage.getItem('auth_token') || localStorage.getItem('token');
      const response = await fetch(`${base}/api/v1/admin/dashboard`, {
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

  const currentDept = departmentConfigs[department] || {
    name: 'Department',
    icon: FaUsers,
    color: 'from-gray-600 to-slate-600',
    description: 'Ministry Department'
  };

  const menuItems = [
    { id: 'overview', label: 'Department Overview', icon: AiOutlineHome },
    { id: 'members', label: 'Department Members', icon: AiOutlineTeam },
    { id: 'activities', label: 'Activities & Events', icon: AiOutlineCalendar },
    { id: 'homepage', label: 'Homepage Management', icon: AiOutlineGlobal },
    { id: 'content', label: 'Page Content Management', icon: AiOutlineFileText },
    { id: 'calendar', label: 'Calendar Events', icon: AiOutlineCalendar },
    { id: 'announcements', label: 'Announcements', icon: AiOutlineBell },
    { id: 'leadership', label: 'Leadership Management', icon: FaUserFriends },
    { id: 'reports', label: 'Reports & Analytics', icon: AiOutlineBarChart },
    { id: 'communications', label: 'Communications', icon: AiOutlineMail },
    { id: 'settings', label: 'Department Settings', icon: AiOutlineSetting }
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className={`bg-gradient-to-r ${currentDept.color} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <currentDept.icon className="text-3xl text-white" />
              <div>
                <h1 className="text-xl font-bold text-white">{currentDept.name}</h1>
                <p className="text-white/80 text-xs">{currentDept.description}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2">
                <AiOutlineUser className="text-white" />
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
              <currentDept.icon className="text-2xl text-gray-700" />
              <span className="font-bold text-gray-800">Admin Panel</span>
            </div>
            
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600'
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
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Department Overview</h2>
                <p className="text-gray-600">Manage your {currentDept.name.toLowerCase()} activities and members</p>
              </div>

              {/* Department Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className={`bg-gradient-to-br ${currentDept.color} text-white p-6 rounded-xl shadow-lg`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80">Active Members</p>
                      <p className="text-3xl font-bold">32</p>
                    </div>
                    <AiOutlineTeam className="text-4xl text-white/60" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">This Month Events</p>
                      <p className="text-3xl font-bold">8</p>
                    </div>
                    <AiOutlineCalendar className="text-4xl text-green-200" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Attendance Rate</p>
                      <p className="text-3xl font-bold">85%</p>
                    </div>
                    <BiStats className="text-4xl text-blue-200" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Budget Utilization</p>
                      <p className="text-3xl font-bold">72%</p>
                    </div>
                    <FaDollarSign className="text-4xl text-purple-200" />
                  </div>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Activities</h3>
                <div className="space-y-4">
                  {[
                    { title: 'Weekly team meeting completed', time: '2 hours ago', type: 'meeting' },
                    { title: 'New member orientation scheduled', time: '1 day ago', type: 'event' },
                    { title: 'Monthly report submitted', time: '3 days ago', type: 'report' },
                    { title: 'Budget request approved', time: '1 week ago', type: 'finance' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${
                        activity.type === 'meeting' ? 'bg-blue-500' :
                        activity.type === 'event' ? 'bg-green-500' :
                        activity.type === 'report' ? 'bg-purple-500' : 'bg-orange-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg flex items-center space-x-3 transition-colors">
                    <FaTasks className="text-2xl" />
                    <div className="text-left">
                      <p className="font-semibold">Schedule Event</p>
                      <p className="text-sm text-blue-100">Plan new activities</p>
                    </div>
                  </button>

                  <button className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg flex items-center space-x-3 transition-colors">
                    <AiOutlineTeam className="text-2xl" />
                    <div className="text-left">
                      <p className="font-semibold">Add Member</p>
                      <p className="text-sm text-green-100">Register new member</p>
                    </div>
                  </button>

                  <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg flex items-center space-x-3 transition-colors">
                    <AiOutlineFileText className="text-2xl" />
                    <div className="text-left">
                      <p className="font-semibold">Generate Report</p>
                      <p className="text-sm text-purple-100">Create monthly report</p>
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'activities' && (
            <EventsManagement />
          )}

          {activeSection === 'homepage' && (
            <HomepageManagement />
          )}

          {activeSection === 'content' && (
            <UniversalContentManagement />
          )}

          {activeSection === 'calendar' && (
            <CalendarEventsManagement />
          )}

          {activeSection === 'announcements' && (
            <AnnouncementsManagement />
          )}

          {activeSection === 'leadership' && (
            <LeadershipManagement />
          )}

          {/* Other sections placeholder */}
          {!['overview', 'activities', 'homepage', 'content', 'calendar', 'announcements', 'leadership'].includes(activeSection) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <FaClipboardList className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">
                {menuItems.find(item => item.id === activeSection)?.label}
              </h3>
              <p className="text-gray-500">This section is under development</p>
              <p className="text-sm text-gray-400 mt-2">
                Department-specific features will be implemented here
              </p>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DepartmentDashboard;
