import { useState } from 'react';
import { formatDate, getRelativeTime, capitalizeFirst } from '../../utils/helpers';
import { Button } from '../UI/Button';
import { AiOutlineHeart, AiOutlineUser, AiOutlineCalendar, AiOutlineTag } from 'react-icons/ai';

const PrayerCard = ({ prayer, onPrayForRequest }) => {
  const [praying, setPraying] = useState(false);
  const [hasPrayed, setHasPrayed] = useState(false);

  const handlePrayForRequest = async () => {
    if (hasPrayed || praying) return;

    setPraying(true);
    try {
      await onPrayForRequest(prayer.id);
      setHasPrayed(true);
    } catch (error) {
      console.error('Error praying for request:', error);
    } finally {
      setPraying(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      health: 'bg-red-100 text-red-800',
      family: 'bg-green-100 text-green-800',
      spiritual: 'bg-blue-100 text-blue-800',
      financial: 'bg-yellow-100 text-yellow-800',
      ministry: 'bg-purple-100 text-purple-800',
      general: 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors.general;
  };

  const getUrgencyIndicator = () => {
    if (prayer.urgency_level === 'urgent') {
      return (
        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
          🚨 Urgent
        </span>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-primaryBlue/50 hover:border-primaryBlue transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {/* Category Tag */}
          <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(prayer.category)}`}>
            <AiOutlineTag className="w-3 h-3 mr-1" />
            {capitalizeFirst(prayer.category)}
          </span>
          
          {/* Urgency Indicator */}
          {getUrgencyIndicator()}
        </div>
        
        {/* Date */}
        <div className="flex items-center text-sm text-gray-500">
          <AiOutlineCalendar className="w-4 h-4 mr-1" />
          {getRelativeTime(prayer.created_at)}
        </div>
      </div>

      {/* Prayer Text */}
      <div className="mb-4">
        <p className="text-gray-800 leading-relaxed">
          "{prayer.prayer_text}"
        </p>
      </div>

      {/* Requester Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-600">
          <AiOutlineUser className="w-4 h-4 mr-2" />
          <span>
            {prayer.is_anonymous ? 'Anonymous' : (prayer.requester_name || 'Church Member')}
          </span>
          {prayer.created_at && (
            <span className="ml-2">
              • {formatDate(prayer.created_at)}
            </span>
          )}
        </div>

        {/* Prayer Count & Action */}
        <div className="flex items-center space-x-4">
          {/* Prayer Count */}
          <div className="flex items-center text-sm text-gray-600">
            <AiOutlineHeart className="w-4 h-4 mr-1 text-primaryBlue" />
            <span>{prayer.prayer_count || 0} prayers</span>
          </div>

          {/* Pray Button */}
          <Button
            onClick={handlePrayForRequest}
            disabled={praying || hasPrayed}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              hasPrayed
                ? 'bg-green-100 text-green-700 cursor-default'
                : 'bg-primaryBlue text-white hover:bg-darkBlue'
            }`}
          >
            {praying ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current mr-2"></div>
                Praying...
              </div>
            ) : hasPrayed ? (
              <div className="flex items-center">
                <span className="mr-1">✓</span>
                Prayed
              </div>
            ) : (
              <div className="flex items-center">
                <AiOutlineHeart className="w-4 h-4 mr-1" />
                Pray
              </div>
            )}
          </Button>
        </div>
      </div>

      {/* Answered Prayer Section */}
      {prayer.is_answered && prayer.answer_testimony && (
        <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
          <div className="flex items-center mb-2">
            <span className="text-green-700 font-medium text-sm">🙏 Prayer Answered!</span>
            {prayer.answered_date && (
              <span className="ml-2 text-xs text-green-600">
                {formatDate(prayer.answered_date)}
              </span>
            )}
          </div>
          <p className="text-green-800 text-sm italic">
            {prayer.answer_testimony}
          </p>
        </div>
      )}
    </div>
  );
};

export default PrayerCard;
