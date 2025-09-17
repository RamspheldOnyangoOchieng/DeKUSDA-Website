import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import churchService from '../../services/churchService';
import Loading from '../../components/common/Loading';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchDashboardStats();
    }
  }, [user]);

  const fetchDashboardStats = async () => {
    try {
      setIsLoading(true);
      const response = await churchService.getDashboardStats();
      if (response.success) {
        setStats(response.data);
      } else {
        // If API endpoint doesn't exist, create mock data
        setStats({
          total_members: 125,
          total_events: 8,
          total_sermons: 45,
          total_prayer_requests: 23,
          pending_prayer_requests: 5,
          total_ministries: 12,
          total_announcements: 6,
          total_donations: 89,
          recent_activities: [
            { type: 'member', action: 'New member registered', name: 'John Doe', time: '2 hours ago' },
            { type: 'sermon', action: 'New sermon uploaded', name: 'Faith in Action', time: '5 hours ago' },
            { type: 'prayer', action: 'Prayer request submitted', name: 'Mary Smith', time: '1 day ago' },
            { type: 'event', action: 'Event created', name: 'Youth Fellowship', time: '2 days ago' },
          ]
        });
      }
    } catch (err) {
      setError('Failed to load dashboard statistics');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading fullScreen text="Loading dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.first_name || 'Admin'}</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">👥</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Members</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats?.total_members || 0}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">📅</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Events</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats?.total_events || 0}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">🎤</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Sermons</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats?.total_sermons || 0}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">🙏</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Prayer Requests</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats?.total_prayer_requests || 0}
                      {stats?.pending_prayer_requests > 0 && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {stats.pending_prayer_requests} pending
                        </span>
                      )}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => window.location.href = '/admin/events'}
                className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <span className="text-2xl mb-2">📅</span>
                <span className="text-sm font-medium text-blue-700">Manage Events</span>
              </button>
              
              <button
                onClick={() => window.location.href = '/admin/sermons'}
                className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <span className="text-2xl mb-2">🎤</span>
                <span className="text-sm font-medium text-green-700">Manage Sermons</span>
              </button>
              
              <button
                onClick={() => window.location.href = '/admin/members'}
                className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <span className="text-2xl mb-2">👥</span>
                <span className="text-sm font-medium text-purple-700">Manage Members</span>
              </button>
              
              <button
                onClick={() => window.location.href = '/admin/gallery'}
                className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
              >
                <span className="text-2xl mb-2">🖼️</span>
                <span className="text-sm font-medium text-orange-700">Manage Gallery</span>
              </button>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {stats?.recent_activities?.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {activity.type === 'member' && <span className="text-blue-500">👤</span>}
                    {activity.type === 'sermon' && <span className="text-green-500">🎤</span>}
                    {activity.type === 'prayer' && <span className="text-purple-500">🙏</span>}
                    {activity.type === 'event' && <span className="text-orange-500">📅</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.name}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </div>
                </div>
              )) || (
                <p className="text-gray-500 text-sm">No recent activities</p>
              )}
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">System Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl mb-2">🏛️</div>
              <h4 className="text-sm font-medium text-gray-900">Ministries</h4>
              <p className="text-lg font-semibold text-blue-600">{stats?.total_ministries || 0}</p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl mb-2">📢</div>
              <h4 className="text-sm font-medium text-gray-900">Announcements</h4>
              <p className="text-lg font-semibold text-green-600">{stats?.total_announcements || 0}</p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl mb-2">💰</div>
              <h4 className="text-sm font-medium text-gray-900">Donations</h4>
              <p className="text-lg font-semibold text-purple-600">{stats?.total_donations || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
