import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import churchService from '../../services/churchService';
import Loading from '../../components/common/Loading';

const MemberDashboard = () => {
  const { user } = useAuth();
  const [memberData, setMemberData] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentSermons, setRecentSermons] = useState([]);
  const [myMinistries, setMyMinistries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMemberData();
  }, []);

  const fetchMemberData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch member's data and related information
      const [eventsResponse, sermonsResponse] = await Promise.all([
        churchService.getEvents({ limit: 5, upcoming: true }),
        churchService.getSermons({ limit: 5, recent: true })
      ]);

      if (eventsResponse.success) {
        // Handle both array and paginated responses for events
        const eventsData = Array.isArray(eventsResponse.data) 
          ? eventsResponse.data 
          : eventsResponse.data.data || [];
        setUpcomingEvents(eventsData.slice(0, 5));
      }

      if (sermonsResponse.success) {
        // Handle paginated response for sermons - data is nested in response.data.data
        const sermonsData = Array.isArray(sermonsResponse.data) 
          ? sermonsResponse.data 
          : sermonsResponse.data.data || [];
        setRecentSermons(sermonsData.slice(0, 5));
      }

      // Mock member data if API doesn't return it
      setMemberData({
        membership_since: '2022-01-15',
        prayer_requests_count: 3,
        events_attended: 12,
        ministries_joined: 2
      });

      setMyMinistries([
        { id: 1, name: 'Youth Ministry', role: 'Member' },
        { id: 2, name: 'Church Choir', role: 'Singer' }
      ]);

    } catch (err) {
      setError('Failed to load member data');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading fullScreen text="Loading your dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Member Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.first_name || 'Member'}!</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Member Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">📅</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Member Since</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {memberData?.membership_since 
                        ? new Date(memberData.membership_since).getFullYear()
                        : 'N/A'}
                    </dd>
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
                    <dd className="text-lg font-medium text-gray-900">{memberData?.prayer_requests_count || 0}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">🎪</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Events Attended</dt>
                    <dd className="text-lg font-medium text-gray-900">{memberData?.events_attended || 0}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">🏛️</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Ministries Joined</dt>
                    <dd className="text-lg font-medium text-gray-900">{myMinistries.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Upcoming Events */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Events</h3>
            {upcomingEvents.length === 0 ? (
              <p className="text-gray-500 text-sm">No upcoming events at this time.</p>
            ) : (
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="border-l-4 border-blue-400 pl-4">
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <div className="text-sm text-gray-500 mt-1">
                      <span>📅 {new Date(event.event_date).toLocaleDateString()}</span>
                      <span className="ml-4">🕐 {event.start_time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Sermons */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Sermons</h3>
            {recentSermons.length === 0 ? (
              <p className="text-gray-500 text-sm">No recent sermons available.</p>
            ) : (
              <div className="space-y-4">
                {recentSermons.map((sermon) => (
                  <div key={sermon.id} className="border-l-4 border-green-400 pl-4">
                    <h4 className="font-medium text-gray-900">{sermon.title}</h4>
                    <div className="text-sm text-gray-500 mt-1">
                      <span>👤 {sermon.speaker}</span>
                      <span className="ml-4">📅 {new Date(sermon.sermon_date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{sermon.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* My Ministries and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Ministries */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">My Ministries</h3>
            {myMinistries.length === 0 ? (
              <div className="text-center py-4">
                <span className="text-4xl block mb-2">🏛️</span>
                <p className="text-gray-500 text-sm">You haven't joined any ministries yet.</p>
                <button
                  onClick={() => window.location.href = '/Personalministries'}
                  className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  Explore Ministries
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {myMinistries.map((ministry) => (
                  <div key={ministry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div>
                      <h4 className="font-medium text-gray-900">{ministry.name}</h4>
                      <p className="text-sm text-gray-500">Role: {ministry.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => window.location.href = '/member/profile'}
                className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <span className="text-2xl mb-2">👤</span>
                <span className="text-sm font-medium text-blue-700">My Profile</span>
              </button>
              
              <button
                onClick={() => window.location.href = '/PrayerDepartment'}
                className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <span className="text-2xl mb-2">🙏</span>
                <span className="text-sm font-medium text-purple-700">Prayer Request</span>
              </button>
              
              <button
                onClick={() => window.location.href = '/tithes-offerings'}
                className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <span className="text-2xl mb-2">💰</span>
                <span className="text-sm font-medium text-green-700">Give</span>
              </button>
              
              <button
                onClick={() => window.location.href = '/COE'}
                className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
              >
                <span className="text-2xl mb-2">📅</span>
                <span className="text-sm font-medium text-orange-700">Calendar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
