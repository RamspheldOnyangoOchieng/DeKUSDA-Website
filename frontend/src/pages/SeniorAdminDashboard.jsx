import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AiOutlineHome, AiOutlineLogout, AiOutlineUser, AiOutlineTeam, 
  AiOutlineSetting, AiOutlineBarChart, AiOutlineBell, AiOutlineCalendar,
  AiOutlineMail, AiOutlineFileText, AiOutlineEye
} from 'react-icons/ai';
import { 
  FaUserTie, FaCalculator, FaChurch, FaCrown, FaShieldAlt,
  FaUserCog, FaChartLine, FaHandHoldingUsd, FaPrayingHands, 
  FaUsers, FaClipboardCheck, FaGavel, FaBookOpen, FaDollarSign
} from 'react-icons/fa';
import { BiStats, BiCog, BiDonateHeart } from 'react-icons/bi';
import { motion } from 'framer-motion';
import Loader from '../components/Loader';

const SeniorAdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [department, setDepartment] = useState('');
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const navigate = useNavigate();

  const departmentConfigs = {
    pastoral: {
      name: 'Pastoral Team',
      icon: FaUserTie,
      color: 'from-red-600 to-rose-600',
      description: 'Spiritual leadership and pastoral care'
    },
    finance: {
      name: 'Finance Committee',
      icon: FaCalculator,
      color: 'from-gray-600 to-slate-600',
      description: 'Financial stewardship and oversight'
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const deptData = localStorage.getItem('department');
    
    if (!token || !userData || !deptData) {
      navigate('/leaders');
      return;
    }

    setUser(JSON.parse(userData));
    setDepartment(deptData);
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

  const currentDept = departmentConfigs[department] || {
    name: 'Senior Administration',
    icon: FaCrown,
    color: 'from-purple-600 to-indigo-600',
    description: 'Senior leadership access'
  };

  const getMenuItems = () => {
    const baseItems = [
      { id: 'overview', label: 'Executive Overview', icon: AiOutlineHome },
      { id: 'members', label: 'Member Oversight', icon: AiOutlineTeam },
      { id: 'reports', label: 'Executive Reports', icon: AiOutlineBarChart },
      { id: 'communications', label: 'Communications', icon: AiOutlineMail },
      { id: 'settings', label: 'Department Settings', icon: AiOutlineSetting }
    ];

    if (department === 'pastoral') {
      return [
        ...baseItems.slice(0, 2),
        { id: 'pastoral-care', label: 'Pastoral Care', icon: FaPrayingHands },
        { id: 'counseling', label: 'Counseling Records', icon: FaBookOpen },
        { id: 'spiritual-oversight', label: 'Spiritual Oversight', icon: FaChurch },
        ...baseItems.slice(2)
      ];
    } else if (department === 'finance') {
      return [
        ...baseItems.slice(0, 2),
        { id: 'financial-overview', label: 'Financial Overview', icon: FaHandHoldingUsd },
        { id: 'donations', label: 'Donations & Tithes', icon: BiDonateHeart },
        { id: 'budget-management', label: 'Budget Management', icon: FaCalculator },
        { id: 'audit-reports', label: 'Audit & Compliance', icon: FaClipboardCheck },
        ...baseItems.slice(2)
      ];
    }

    return baseItems;
  };

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
                <p className="text-white/80 text-xs">Senior Administrative Access</p>
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
              <FaShieldAlt className="text-2xl text-gray-700" />
              <span className="font-bold text-gray-800">Senior Control</span>
            </div>
            
            <nav className="space-y-2">
              {getMenuItems().map((item) => (
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
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Executive Overview</h2>
                <p className="text-gray-600">Senior administrative dashboard for {currentDept.name.toLowerCase()}</p>
              </div>

              {/* Executive Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className={`bg-gradient-to-br ${currentDept.color} text-white p-6 rounded-xl shadow-lg`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80">Total Members</p>
                      <p className="text-3xl font-bold">{stats?.total_members || 0}</p>
                    </div>
                    <FaUsers className="text-4xl text-white/60" />
                  </div>
                </div>

                {department === 'pastoral' && (
                  <>
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-6 rounded-xl shadow-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100">Active Counseling</p>
                          <p className="text-3xl font-bold">12</p>
                        </div>
                        <FaPrayingHands className="text-4xl text-blue-200" />
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100">Prayer Requests</p>
                          <p className="text-3xl font-bold">28</p>
                        </div>
                        <FaBookOpen className="text-4xl text-green-200" />
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100">Baptisms (YTD)</p>
                          <p className="text-3xl font-bold">15</p>
                        </div>
                        <FaChurch className="text-4xl text-purple-200" />
                      </div>
                    </div>
                  </>
                )}

                {department === 'finance' && (
                  <>
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100">Monthly Income</p>
                          <p className="text-3xl font-bold">$12.5K</p>
                        </div>
                        <BiDonateHeart className="text-4xl text-green-200" />
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-6 rounded-xl shadow-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100">Budget Utilization</p>
                          <p className="text-3xl font-bold">78%</p>
                        </div>
                        <FaCalculator className="text-4xl text-blue-200" />
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-6 rounded-xl shadow-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-100">Pending Approvals</p>
                          <p className="text-3xl font-bold">5</p>
                        </div>
                        <FaClipboardCheck className="text-4xl text-orange-200" />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Department-specific content */}
              {department === 'pastoral' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Pastoral Activities</h3>
                    <div className="space-y-4">
                      {[
                        { title: 'Marriage counseling session', member: 'John & Mary Smith', time: '2 hours ago' },
                        { title: 'Hospital visit completed', member: 'Elder Johnson', time: '1 day ago' },
                        { title: 'Baptism preparation class', member: '8 candidates', time: '3 days ago' },
                        { title: 'Spiritual guidance session', member: 'Sarah Wilson', time: '1 week ago' }
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 bg-red-50 rounded-lg">
                          <FaPrayingHands className="text-red-500" />
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">{activity.title}</p>
                            <p className="text-sm text-gray-600">{activity.member}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Spiritual Oversight</h3>
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Active Prayer Chains</p>
                        <p className="text-2xl font-bold text-blue-600">4</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Bible Study Groups</p>
                        <p className="text-2xl font-bold text-green-600">7</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Spiritual Mentoring</p>
                        <p className="text-2xl font-bold text-purple-600">15</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {department === 'finance' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Financial Overview</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                        <span className="text-gray-600">Tithes & Offerings</span>
                        <span className="text-2xl font-bold text-green-600">$8,750</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                        <span className="text-gray-600">Special Donations</span>
                        <span className="text-2xl font-bold text-blue-600">$2,100</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                        <span className="text-gray-600">Building Fund</span>
                        <span className="text-2xl font-bold text-purple-600">$1,650</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                        <span className="text-gray-600">Monthly Expenses</span>
                        <span className="text-2xl font-bold text-orange-600">$6,200</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Pending Approvals</h3>
                    <div className="space-y-4">
                      {[
                        { item: 'Youth Ministry Equipment', amount: '$850', priority: 'High' },
                        { item: 'Church Maintenance', amount: '$1,200', priority: 'Medium' },
                        { item: 'Outreach Program Funding', amount: '$500', priority: 'Low' },
                        { item: 'Audio System Upgrade', amount: '$2,100', priority: 'High' }
                      ].map((approval, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-800">{approval.item}</p>
                            <p className="text-sm text-gray-600">{approval.amount}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            approval.priority === 'High' ? 'bg-red-100 text-red-600' :
                            approval.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-green-100 text-green-600'
                          }`}>
                            {approval.priority}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Senior Administrative Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {department === 'pastoral' ? (
                    <>
                      <button className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-lg flex items-center space-x-3 transition-colors">
                        <FaPrayingHands className="text-2xl" />
                        <div className="text-left">
                          <p className="font-semibold">Schedule Counseling</p>
                          <p className="text-sm text-red-100">New pastoral care session</p>
                        </div>
                      </button>

                      <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg flex items-center space-x-3 transition-colors">
                        <FaChurch className="text-2xl" />
                        <div className="text-left">
                          <p className="font-semibold">Baptism Planning</p>
                          <p className="text-sm text-blue-100">Organize baptism ceremony</p>
                        </div>
                      </button>

                      <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg flex items-center space-x-3 transition-colors">
                        <FaBookOpen className="text-2xl" />
                        <div className="text-left">
                          <p className="font-semibold">Spiritual Report</p>
                          <p className="text-sm text-purple-100">Generate ministry report</p>
                        </div>
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg flex items-center space-x-3 transition-colors">
                        <FaHandHoldingUsd className="text-2xl" />
                        <div className="text-left">
                          <p className="font-semibold">Financial Report</p>
                          <p className="text-sm text-green-100">Generate monthly report</p>
                        </div>
                      </button>

                      <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg flex items-center space-x-3 transition-colors">
                        <FaGavel className="text-2xl" />
                        <div className="text-left">
                          <p className="font-semibold">Approve Expenses</p>
                          <p className="text-sm text-blue-100">Review pending requests</p>
                        </div>
                      </button>

                      <button className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded-lg flex items-center space-x-3 transition-colors">
                        <FaClipboardCheck className="text-2xl" />
                        <div className="text-left">
                          <p className="font-semibold">Audit Review</p>
                          <p className="text-sm text-gray-100">Financial compliance</p>
                        </div>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Other sections placeholder */}
          {activeSection !== 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <FaUserCog className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">
                {getMenuItems().find(item => item.id === activeSection)?.label}
              </h3>
              <p className="text-gray-500">Senior administrative section under development</p>
              <p className="text-sm text-gray-400 mt-2">
                {department === 'pastoral' ? 'Pastoral care' : 'Financial management'} features will be implemented here
              </p>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SeniorAdminDashboard;
