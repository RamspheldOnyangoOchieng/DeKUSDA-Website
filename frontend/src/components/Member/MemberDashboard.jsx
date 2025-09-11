import React, { useState, useEffect } from 'react';
import { memberService } from '../../services/adminService';
import { useAuth } from '../../context/AuthContext';
import { FiCalendar, FiBookOpen, FiHeart, FiDollarSign, FiUser, FiEdit } from 'react-icons/fi';

const MemberDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await memberService.getDashboard();
      if (response.success) {
        setDashboardData(response.data);
      }
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {dashboardData?.member_info?.name?.split(' ')[0] || user?.name}!
          </h1>
          <p className="mt-2 text-gray-600">Here's what's happening with your church activities</p>
        </div>

        {/* Member Info Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiUser className="h-8 w-8 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Member Since</dt>
                  <dd className="text-lg font-medium text-gray-900">{dashboardData?.member_info?.join_date}</dd>
                </dl>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Ministry</dt>
                  <dd className="text-lg font-medium text-gray-900">{dashboardData?.member_info?.ministry || 'Not assigned'}</dd>
                </dl>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Status</dt>
                  <dd className="text-lg font-medium text-gray-900 capitalize">{dashboardData?.member_info?.status}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard
            title="Upcoming Events"
            value={dashboardData?.quick_stats?.upcoming_events?.length || 0}
            icon={<FiCalendar className="h-6 w-6 text-blue-600" />}
            color="blue"
          />
          <StatCard
            title="Recent Sermons"
            value={dashboardData?.quick_stats?.recent_sermons?.length || 0}
            icon={<FiBookOpen className="h-6 w-6 text-green-600" />}
            color="green"
          />
          <StatCard
            title="My Prayer Requests"
            value={dashboardData?.quick_stats?.my_prayer_requests?.length || 0}
            icon={<FiHeart className="h-6 w-6 text-red-600" />}
            color="red"
          />
          <StatCard
            title="My Donations"
            value={dashboardData?.quick_stats?.my_donations?.length || 0}
            icon={<FiDollarSign className="h-6 w-6 text-yellow-600" />}
            color="yellow"
          />
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Events */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Upcoming Events</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              {dashboardData?.quick_stats?.upcoming_events?.length > 0 ? (
                <div className="space-y-4">
                  {dashboardData.quick_stats.upcoming_events.slice(0, 3).map((event) => (
                    <div key={event.id} className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <FiCalendar className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{event.title}</p>
                        <p className="text-sm text-gray-500">{new Date(event.event_date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No upcoming events</p>
              )}
            </div>
          </div>

          {/* Recent Sermons */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Sermons</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              {dashboardData?.quick_stats?.recent_sermons?.length > 0 ? (
                <div className="space-y-4">
                  {dashboardData.quick_stats.recent_sermons.slice(0, 3).map((sermon) => (
                    <div key={sermon.id} className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                          <FiBookOpen className="h-5 w-5 text-green-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{sermon.title}</p>
                        <p className="text-sm text-gray-500">Pastor {sermon.pastor}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No recent sermons</p>
              )}
            </div>
          </div>

          {/* My Prayer Requests */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">My Prayer Requests</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              {dashboardData?.quick_stats?.my_prayer_requests?.length > 0 ? (
                <div className="space-y-4">
                  {dashboardData.quick_stats.my_prayer_requests.slice(0, 3).map((prayer) => (
                    <div key={prayer.id} className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                          <FiHeart className="h-5 w-5 text-red-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{prayer.title || 'Prayer Request'}</p>
                        <p className="text-sm text-gray-500 capitalize">{prayer.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No prayer requests</p>
              )}
            </div>
          </div>

          {/* My Donations */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Donations</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              {dashboardData?.quick_stats?.my_donations?.length > 0 ? (
                <div className="space-y-4">
                  {dashboardData.quick_stats.my_donations.slice(0, 3).map((donation) => (
                    <div key={donation.id} className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center">
                          <FiDollarSign className="h-5 w-5 text-yellow-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{donation.purpose || 'General Donation'}</p>
                        <p className="text-sm text-gray-500">KSh {donation.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No recent donations</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    red: 'bg-red-50 border-red-200',
    yellow: 'bg-yellow-50 border-yellow-200'
  };

  return (
    <div className={`${colorClasses[color]} border rounded-lg px-4 py-5`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="text-lg font-medium text-gray-900">{value}</dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
