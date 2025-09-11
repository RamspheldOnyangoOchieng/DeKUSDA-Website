import React, { useState, useEffect } from 'react';
import { memberService } from '../../services/adminService';
import { FiDollarSign, FiCalendar, FiCreditCard, FiTrendingUp, FiPieChart } from 'react-icons/fi';

const MemberDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({
    total_amount: 0,
    total_count: 0,
    this_year: 0,
    this_month: 0
  });

  useEffect(() => {
    fetchDonations();
  }, [currentPage]);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const response = await memberService.getMyDonations();
      if (response.success) {
        setDonations(response.data.data || []);
        setTotalPages(response.data.last_page || 1);
        calculateStats(response.data.data || []);
      }
    } catch (err) {
      setError('Failed to load donations');
      console.error('Donations error:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (donationsData) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const totalAmount = donationsData.reduce((sum, donation) => sum + parseFloat(donation.amount || 0), 0);
    const thisYearAmount = donationsData
      .filter(donation => new Date(donation.created_at).getFullYear() === currentYear)
      .reduce((sum, donation) => sum + parseFloat(donation.amount || 0), 0);
    const thisMonthAmount = donationsData
      .filter(donation => {
        const donationDate = new Date(donation.created_at);
        return donationDate.getFullYear() === currentYear && donationDate.getMonth() === currentMonth;
      })
      .reduce((sum, donation) => sum + parseFloat(donation.amount || 0), 0);

    setStats({
      total_amount: totalAmount,
      total_count: donationsData.length,
      this_year: thisYearAmount,
      this_month: thisMonthAmount
    });
  };

  const getPaymentMethodIcon = (method) => {
    switch (method?.toLowerCase()) {
      case 'mpesa':
        return '📱';
      case 'bank_transfer':
        return '🏦';
      case 'cash':
        return '💵';
      case 'card':
      case 'credit_card':
        return '💳';
      default:
        return '💰';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
      case 'cancelled':
        return 'bg-red-100 text-red-800';
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
          <h1 className="text-3xl font-bold text-gray-900">My Donations</h1>
          <p className="mt-2 text-gray-600">Track your giving history and impact</p>
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard
            title="Total Donated"
            value={`KSh ${stats.total_amount.toLocaleString()}`}
            icon={<FiDollarSign className="h-6 w-6 text-green-600" />}
            color="green"
          />
          <StatCard
            title="Total Donations"
            value={stats.total_count}
            icon={<FiPieChart className="h-6 w-6 text-blue-600" />}
            color="blue"
          />
          <StatCard
            title="This Year"
            value={`KSh ${stats.this_year.toLocaleString()}`}
            icon={<FiTrendingUp className="h-6 w-6 text-purple-600" />}
            color="purple"
          />
          <StatCard
            title="This Month"
            value={`KSh ${stats.this_month.toLocaleString()}`}
            icon={<FiCalendar className="h-6 w-6 text-orange-600" />}
            color="orange"
          />
        </div>

        {/* Donations List */}
        {donations.length > 0 ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {donations.map((donation) => (
                <li key={donation.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-lg">
                            {getPaymentMethodIcon(donation.payment_method)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <p className="text-lg font-medium text-gray-900">
                            KSh {parseFloat(donation.amount || 0).toLocaleString()}
                          </p>
                          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(donation.status)}`}>
                            {donation.status?.charAt(0).toUpperCase() + donation.status?.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <FiCalendar className="flex-shrink-0 mr-1.5 h-4 w-4" />
                          {new Date(donation.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {donation.purpose || 'General Donation'}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <FiCreditCard className="flex-shrink-0 mr-1.5 h-4 w-4" />
                        {donation.payment_method?.replace('_', ' ').toUpperCase() || 'Unknown'}
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional Details */}
                  {(donation.notes || donation.reference || donation.transaction_id) && (
                    <div className="mt-3 ml-14">
                      <div className="bg-gray-50 rounded-lg p-3">
                        {donation.notes && (
                          <p className="text-sm text-gray-600 mb-2">
                            <span className="font-medium">Notes:</span> {donation.notes}
                          </p>
                        )}
                        {donation.reference && (
                          <p className="text-sm text-gray-600 mb-2">
                            <span className="font-medium">Reference:</span> {donation.reference}
                          </p>
                        )}
                        {donation.transaction_id && (
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Transaction ID:</span> {donation.transaction_id}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
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
            <FiDollarSign className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No donations found</h3>
            <p className="mt-1 text-sm text-gray-500">
              You haven't made any donations yet. Your giving history will appear here.
            </p>
            <div className="mt-6">
              <a
                href="/donations"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Make a Donation
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    green: 'bg-green-50 border-green-200',
    blue: 'bg-blue-50 border-blue-200',
    purple: 'bg-purple-50 border-purple-200',
    orange: 'bg-orange-50 border-orange-200'
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

export default MemberDonations;
