import { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { useAuth } from '../../context/AuthContext';
import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { FiUsers, FiCalendar, FiBookOpen, FiHeart, FiTrendingUp, FiActivity } from 'react-icons/fi';
import { formatNumber, formatCurrency } from '../../utils/helpers';
import { 
  AiOutlineUser, 
  AiOutlineHeart, 
  AiOutlineCalendar, 
  AiOutlineDollarCircle,
  AiOutlineEye,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle
} from 'react-icons/ai';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { dashboardStats, loading, fetchDashboardData } = useAdmin();
  const [recentActivity, setRecentActivity] = useState({});
  const [loadingActivity, setLoadingActivity] = useState(true);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchRecentActivity();
    }
  }, [user]);

  const fetchRecentActivity = async () => {
    setLoadingActivity(true);
    try {
      const response = await adminService.getDashboard();
      if (response.success) {
        setRecentActivity(response.data.recent_activities || []);
      }
    } catch (error) {
      console.error('Error loading activity:', error);
      setRecentActivity([]);
    } finally {
      setLoadingActivity(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primaryBlue"></div>
        <span className="ml-3 text-gray-600">Loading dashboard...</span>
      </div>
    );
  }

  const stats = dashboardStats || {};

  return (
    <div className="admin-dashboard space-y-8">
      {/* Welcome Header */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-darkBlue mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your church website today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.users?.total || 0}
          change={`+${stats.users?.new_this_week || 0} this week`}
          icon={<AiOutlineUser className="w-6 h-6" />}
          color="blue"
        />
        
        <StatCard
          title="Prayer Requests"
          value={stats.prayers?.total || 0}
          change={`${stats.prayers?.pending || 0} pending`}
          icon={<AiOutlineHeart className="w-6 h-6" />}
          color="red"
        />
        
        <StatCard
          title="Upcoming Events"
          value={stats.events?.upcoming || 0}
          change={`${stats.events?.this_month || 0} this month`}
          icon={<AiOutlineCalendar className="w-6 h-6" />}
          color="green"
        />
        
        <StatCard
          title="Monthly Donations"
          value={formatCurrency(stats.donations?.this_month || 0)}
          change={`${stats.donations?.total_donors || 0} donors`}
          icon={<AiOutlineDollarCircle className="w-6 h-6" />}
          color="yellow"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Content */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-darkBlue">Pending Content</h3>
            <AiOutlineEye className="w-5 h-5 text-gray-500" />
          </div>
          
          <div className="space-y-3">
            <PendingItem
              type="Prayer Requests"
              count={stats.prayers?.pending || 0}
              action="Review"
              link="/admin/prayers"
            />
            <PendingItem
              type="User Registrations"
              count={stats.users?.pending || 0}
              action="Approve"
              link="/admin/users"
            />
            <PendingItem
              type="Book Uploads"
              count={stats.books?.pending || 0}
              action="Review"
              link="/admin/books"
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-darkBlue">Recent Activity</h3>
            <button
              onClick={fetchRecentActivity}
              className="text-primaryBlue hover:text-darkBlue"
            >
              Refresh
            </button>
          </div>
          
          {loadingActivity ? (
            <div className="flex items-center justify-center h-24">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primaryBlue"></div>
            </div>
          ) : (
            <div className="space-y-3 text-sm">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <ActivityItem
                    key={index}
                    icon={activity.type === 'member' ? '👤' : activity.type === 'prayer' ? '🙏' : activity.type === 'event' ? '📅' : '💰'}
                    text={activity.action}
                    time={activity.time}
                  />
                ))
              ) : (
                <div className="text-center text-gray-500 py-4">
                  No recent activity
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-darkBlue mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickLinkButton
            title="Moderate Prayers"
            icon={<AiOutlineHeart className="w-5 h-5" />}
            link="/admin/prayers"
            color="red"
          />
          <QuickLinkButton
            title="Manage Events"
            icon={<AiOutlineCalendar className="w-5 h-5" />}
            link="/admin/events"
            color="blue"
          />
          <QuickLinkButton
            title="User Management"
            icon={<AiOutlineUser className="w-5 h-5" />}
            link="/admin/users"
            color="green"
          />
          <QuickLinkButton
            title="View Analytics"
            icon={<AiOutlineEye className="w-5 h-5" />}
            link="/admin/analytics"
            color="purple"
          />
        </div>
      </div>
    </div>
  );
};

// Helper Components
const StatCard = ({ title, value, change, icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-500 text-blue-50',
    red: 'bg-red-500 text-red-50',
    green: 'bg-green-500 text-green-50',
    yellow: 'bg-yellow-500 text-yellow-50'
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-darkBlue">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{change}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const PendingItem = ({ type, count, action, link }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
    <div>
      <p className="font-medium text-gray-900">{type}</p>
      <p className="text-sm text-gray-600">{count} pending</p>
    </div>
    <a
      href={link}
      className="px-3 py-1 bg-primaryBlue text-white text-sm rounded hover:bg-darkBlue transition-colors"
    >
      {action}
    </a>
  </div>
);

const ActivityItem = ({ icon, text, time }) => (
  <div className="flex items-center space-x-3">
    <span className="text-lg">{icon}</span>
    <div className="flex-1">
      <p className="text-gray-900">{text}</p>
      <p className="text-gray-500 text-xs">{time}</p>
    </div>
  </div>
);

const QuickLinkButton = ({ title, icon, link, color }) => {
  const colorClasses = {
    red: 'border-red-200 hover:bg-red-50 text-red-700',
    blue: 'border-blue-200 hover:bg-blue-50 text-blue-700',
    green: 'border-green-200 hover:bg-green-50 text-green-700',
    purple: 'border-purple-200 hover:bg-purple-50 text-purple-700'
  };

  return (
    <a
      href={link}
      className={`flex flex-col items-center p-4 border-2 rounded-lg transition-colors ${colorClasses[color]}`}
    >
      <div className="mb-2">{icon}</div>
      <span className="text-sm font-medium text-center">{title}</span>
    </a>
  );
};

export default AdminDashboard;
