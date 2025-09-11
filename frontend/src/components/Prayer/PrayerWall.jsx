import { useState, useEffect } from 'react';
import { prayerService } from '../../services/prayers';
import PrayerCard from './PrayerCard';
import { Button } from '../UI/Button';
import { AiOutlineHeart, AiOutlineReload } from 'react-icons/ai';

const PrayerWall = () => {
  const [prayers, setPrayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchPrayers();
  }, [filter]);

  const fetchPrayers = async (pageNumber = 1, resetPrayers = true) => {
    try {
      if (pageNumber === 1) {
        setLoading(true);
      }

      const params = {
        page: pageNumber,
        limit: 6,
        category: filter === 'all' ? undefined : filter
      };

      const response = await prayerService.getPrayerWall(params);
      
      if (resetPrayers) {
        setPrayers(response.data);
      } else {
        setPrayers(prev => [...prev, ...response.data]);
      }
      
      setHasMore(response.data.length === params.limit);
      setPage(pageNumber);
    } catch (error) {
      console.error('Error fetching prayers:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchPrayers(1, true);
  };

  const handleLoadMore = () => {
    fetchPrayers(page + 1, false);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPage(1);
  };

  const handlePrayForRequest = async (prayerId) => {
    try {
      await prayerService.prayForRequest(prayerId);
      
      // Update the prayer count locally
      setPrayers(prev => prev.map(prayer => 
        prayer.id === prayerId 
          ? { ...prayer, prayer_count: (prayer.prayer_count || 0) + 1 }
          : prayer
      ));
    } catch (error) {
      console.error('Error praying for request:', error);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-primaryBlue">
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primaryBlue"></div>
          <span className="ml-3 text-gray-600">Loading prayers...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-primaryBlue">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <AiOutlineHeart className="w-6 h-6 mr-3 text-primaryBlue" />
          <h3 className="text-2xl font-bold text-darkBlue">Prayer Wall</h3>
        </div>
        
        <Button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center px-4 py-2 text-primaryBlue border border-primaryBlue rounded-lg hover:bg-primaryBlue hover:text-white transition-colors"
        >
          <AiOutlineReload className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Filter Buttons */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'all', label: 'All Prayers' },
            { value: 'health', label: 'Health' },
            { value: 'family', label: 'Family' },
            { value: 'spiritual', label: 'Spiritual' },
            { value: 'financial', label: 'Financial' },
            { value: 'ministry', label: 'Ministry' }
          ].map(filterOption => (
            <button
              key={filterOption.value}
              onClick={() => handleFilterChange(filterOption.value)}
              className={`px-4 py-2 text-sm rounded-full transition-colors ${
                filter === filterOption.value
                  ? 'bg-primaryBlue text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>
      </div>

      {/* Prayer Cards */}
      {prayers.length === 0 ? (
        <div className="text-center py-12">
          <AiOutlineHeart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h4 className="text-xl text-gray-600 mb-2">No prayer requests yet</h4>
          <p className="text-gray-500">
            {filter === 'all' 
              ? 'Be the first to submit a prayer request to share with the community.'
              : `No prayer requests in the ${filter} category yet.`
            }
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {prayers.map(prayer => (
            <PrayerCard
              key={prayer.id}
              prayer={prayer}
              onPrayForRequest={handlePrayForRequest}
            />
          ))}
        </div>
      )}

      {/* Load More Button */}
      {hasMore && prayers.length > 0 && (
        <div className="text-center mt-8">
          <Button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Load More Prayers
          </Button>
        </div>
      )}

      {/* Prayer Chain Invitation */}
      <div className="mt-8 p-6 bg-gradient-to-r from-primaryBlue/10 to-purple-100 rounded-xl border border-primaryBlue/20">
        <h4 className="text-lg font-bold text-darkBlue mb-2">Join Our Prayer Chain</h4>
        <p className="text-gray-700 mb-4">
          Commit to praying regularly for these requests and receive notifications when new urgent prayers are submitted.
        </p>
        <Button className="px-6 py-2 bg-primaryBlue text-white rounded-lg hover:bg-darkBlue transition-colors">
          Join Prayer Chain
        </Button>
      </div>
    </div>
  );
};

export default PrayerWall;
