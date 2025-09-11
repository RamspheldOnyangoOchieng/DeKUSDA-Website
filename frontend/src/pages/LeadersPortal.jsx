import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMail, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineUser, AiOutlinePhone, AiOutlineCalendar } from 'react-icons/ai';
import { BiChurch, BiCrown, BiShield } from 'react-icons/bi';
import { FaUserTie, FaMicrophone, FaUsers, FaHeartbeat, FaBookOpen, FaCalculator, FaPray, FaBroadcastTower } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Loader from '../components/Loader';

const LeadersPortal = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    department: ''
  });

  const departments = [
    {
      id: 'communication',
      name: 'Communication Department',
      icon: FaBroadcastTower,
      description: 'Supreme Administrative Access - Complete system oversight',
      color: 'from-purple-600 to-indigo-600',
      access: 'Supreme Admin'
    },
    {
      id: 'youth',
      name: 'Youth Ministry',
      icon: FaUsers,
      description: 'Youth programs, activities, and member management',
      color: 'from-blue-600 to-cyan-600',
      access: 'Department Admin'
    },
    {
      id: 'music',
      name: 'Music Ministry',
      icon: FaMicrophone,
      description: 'Choir, worship teams, and musical events coordination',
      color: 'from-green-600 to-emerald-600',
      access: 'Department Admin'
    },
    {
      id: 'pastoral',
      name: 'Pastoral Team',
      icon: FaUserTie,
      description: 'Pastoral care, counseling, and spiritual guidance',
      color: 'from-red-600 to-rose-600',
      access: 'Senior Admin'
    },
    {
      id: 'health',
      name: 'Health Ministry',
      icon: FaHeartbeat,
      description: 'Health programs, wellness initiatives, and medical outreach',
      color: 'from-orange-600 to-amber-600',
      access: 'Department Admin'
    },
    {
      id: 'education',
      name: 'Education Ministry',
      icon: FaBookOpen,
      description: 'Bible study, educational programs, and training coordination',
      color: 'from-teal-600 to-green-600',
      access: 'Department Admin'
    },
    {
      id: 'finance',
      name: 'Finance Committee',
      icon: FaCalculator,
      description: 'Financial oversight, budgeting, and stewardship management',
      color: 'from-gray-600 to-slate-600',
      access: 'Senior Admin'
    },
    {
      id: 'prayer',
      name: 'Prayer Ministry',
      icon: FaPray,
      description: 'Prayer coordination, intercessory teams, and spiritual warfare',
      color: 'from-violet-600 to-purple-600',
      access: 'Department Admin'
    }
  ];

  const handleDepartmentSelect = (departmentId) => {
    setSelectedDepartment(departmentId);
    setLoginForm({...loginForm, department: departmentId});
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!loginForm.department) {
      alert('Please select your department first');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/leader-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(loginForm),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('department', loginForm.department);
        
        // Redirect based on department and role
        if (loginForm.department === 'communication') {
          navigate('/communication-dashboard');
        } else if (['pastoral', 'finance'].includes(loginForm.department)) {
          navigate('/senior-admin-dashboard');
        } else {
          navigate('/department-dashboard');
        }
      } else {
        alert(data.message || 'Login failed. Please check your credentials and department access.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center space-x-3 mb-4">
            <BiShield className="text-5xl text-yellow-400" />
            <BiChurch className="text-6xl text-white" />
            <BiCrown className="text-5xl text-yellow-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            DeKUSDA Leadership Portal
          </h1>
          <p className="text-purple-200 text-lg">
            Department-Specific Administrative Access
          </p>
        </motion.div>

        {!selectedDepartment ? (
          /* Department Selection */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-white text-center mb-8">
                Select Your Department
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {departments.map((dept, index) => (
                  <motion.div
                    key={dept.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => handleDepartmentSelect(dept.id)}
                    className="group cursor-pointer"
                  >
                    <div className={`bg-gradient-to-br ${dept.color} rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="bg-white/20 rounded-lg p-3">
                          <dept.icon className="text-2xl text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white">
                            {dept.name}
                          </h3>
                          <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">
                            {dept.access}
                          </span>
                        </div>
                      </div>
                      <p className="text-white/90 text-sm leading-relaxed">
                        {dept.description}
                      </p>
                      <div className="mt-4 text-right">
                        <span className="text-white/80 text-sm group-hover:text-white transition-colors">
                          Click to access →
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          /* Login Form */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="max-w-md mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
              {/* Selected Department Header */}
              <div className={`bg-gradient-to-r ${departments.find(d => d.id === selectedDepartment)?.color} px-6 py-6`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {React.createElement(departments.find(d => d.id === selectedDepartment)?.icon, {
                      className: "text-2xl text-white"
                    })}
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {departments.find(d => d.id === selectedDepartment)?.name}
                      </h3>
                      <span className="text-white/80 text-sm">
                        {departments.find(d => d.id === selectedDepartment)?.access}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedDepartment('');
                      setLoginForm({email: '', password: '', department: ''});
                    }}
                    className="text-white/80 hover:text-white text-sm"
                  >
                    Change
                  </button>
                </div>
              </div>

              {/* Login Form */}
              <div className="p-8">
                <form onSubmit={handleLoginSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <AiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                        className="w-full pl-10 pr-3 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                        placeholder="your.leader.email@church.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                        className="w-full pl-10 pr-10 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                        placeholder="Enter your secure password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`w-full bg-gradient-to-r ${departments.find(d => d.id === selectedDepartment)?.color} text-white py-3 rounded-lg font-medium hover:shadow-xl transition-all duration-200 transform hover:scale-105`}
                  >
                    Access Department Dashboard
                  </button>

                  <div className="text-center space-y-2">
                    <p className="text-white/60 text-xs">
                      Authorized personnel only. All activities are logged.
                    </p>
                    <Link to="/" className="text-sm text-purple-300 hover:text-white">
                      ← Back to Main Website
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        )}

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/20 p-6 text-center">
            <BiShield className="text-3xl text-yellow-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Secure Leadership Access
            </h3>
            <p className="text-purple-200 text-sm leading-relaxed">
              This portal provides department-specific administrative access to authorized church leaders. 
              Each department has tailored tools and oversight capabilities appropriate to their ministry responsibilities.
              The Communication Department maintains supreme administrative privileges across all systems.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LeadersPortal;
