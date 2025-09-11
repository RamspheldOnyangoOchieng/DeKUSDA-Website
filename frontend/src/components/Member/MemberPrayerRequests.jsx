import React, { useState, useEffect } from 'react';
import { memberService } from '../../services/adminService';
import { FiHeart, FiClock, FiUser, FiMessageCircle } from 'react-icons/fi';

const MemberPrayerRequests = () => {
  const [prayers, setPrayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPrayers();
  }, [currentPage]);

  const fetchPrayers = async () => {
    try {
      setLoading(true);
      const response = await memberService.getMyPrayerRequests();
      if (response.success) {
        setPrayers(response.data.data || []);
        setTotalPages(response.data.last_page || 1);
      }
    } catch (err) {
      setError('Failed to load prayer requests');
      console.error('Prayer requests error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Prayer Requests</h1>
          <p className="mt-2 text-gray-600">Track your submitted prayer requests and their status</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Prayer Requests */}
        {prayers.length > 0 ? (
          <div className="space-y-6">
            {prayers.map((prayer) => (
              <div key={prayer.id} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <FiHeart className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {prayer.title || 'Prayer Request'}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(prayer.status)}`}>
                            {prayer.status?.charAt(0).toUpperCase() + prayer.status?.slice(1)}
                          </span>
                          {prayer.priority && (
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(prayer.priority)}`}>
                              {prayer.priority?.charAt(0).toUpperCase() + prayer.priority?.slice(1)} Priority
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <FiClock className="h-4 w-4 mr-1" />
                      {new Date(prayer.created_at).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Prayer Content */}
                  <div className="mb-4">
                    <p className="text-gray-700 leading-relaxed">
                      {prayer.prayer_text || prayer.request}
                    </p>
                  </div>

                  {/* Prayer Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {prayer.category && (
                      <div className="flex items-center text-sm text-gray-600">
                        <FiMessageCircle className="h-4 w-4 mr-2" />
                        <span className="font-medium mr-1">Category:</span>
                        {prayer.category}
                      </div>
                    )}
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <FiUser className="h-4 w-4 mr-2" />
                      <span className="font-medium mr-1">Requested by:</span>
                      {prayer.requester_name || 'Anonymous'}
                    </div>

                    {prayer.prayer_count && (
                      <div className="flex items-center text-sm text-gray-600">
                        <FiHeart className="h-4 w-4 mr-2" />
                        <span className="font-medium mr-1">Prayer Count:</span>
                        {prayer.prayer_count} people praying
                      </div>
                    )}

                    {prayer.urgency_level && (
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium mr-1">Urgency:</span>
                        {prayer.urgency_level}
                      </div>
                    )}
                  </div>

                  {/* Admin Response */}
                  {prayer.admin_response && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <h4 className="text-sm font-medium text-blue-900 mb-2">Church Response:</h4>
                      <p className="text-sm text-blue-800">{prayer.admin_response}</p>
                    </div>
                  )}

                  {/* Prayer Updates */}
                  {prayer.updates && prayer.updates.length > 0 && (
                    <div className="mt-4 border-t pt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Updates:</h4>
                      <div className="space-y-2">
                        {prayer.updates.map((update, index) => (
                          <div key={index} className="text-sm text-gray-600">
                            <span className="font-medium">{new Date(update.created_at).toLocaleDateString()}:</span>
                            <span className="ml-2">{update.message}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg shadow">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Page <span className="font-medium">{currentPage}</span> of{' '}
                      <span className="font-medium">{totalPages}</span>
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <FiHeart className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No prayer requests found</h3>
            <p className="mt-1 text-sm text-gray-500">
              You haven't submitted any prayer requests yet. Visit the prayer page to submit one.
            </p>
            <div className="mt-6">
              <a
                href="/prayers"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit Prayer Request
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberPrayerRequests;
