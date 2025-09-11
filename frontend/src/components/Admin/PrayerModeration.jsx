import { useState, useEffect } from 'react';
import { adminService } from '../../services/admin';
import { useAdmin } from '../../context/AdminContext';
import { formatDate, truncateText, capitalizeFirst } from '../../utils/helpers';
import { Button } from '../UI/Button';
import { Modal } from '../UI/Modal';
import { 
  AiOutlineCheckCircle, 
  AiOutlineCloseCircle, 
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineFlag
} from 'react-icons/ai';

const PrayerModeration = () => {
  const { pendingContent, approveContent, rejectContent } = useAdmin();
  const [prayersToModerate, setPrayersToModerate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrayer, setSelectedPrayer] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    fetchPrayersToModerate();
  }, []);

  const fetchPrayersToModerate = async () => {
    setLoading(true);
    try {
      const response = await adminService.getPrayersToModerate();
      setPrayersToModerate(response.data);
    } catch (error) {
      console.error('Error fetching prayers to moderate:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprovePrayer = async (prayerId) => {
    try {
      await approveContent(prayerId);
      setPrayersToModerate(prev => prev.filter(p => p.id !== prayerId));
    } catch (error) {
      console.error('Error approving prayer:', error);
    }
  };

  const handleRejectPrayer = async () => {
    if (!selectedPrayer || !rejectReason.trim()) return;

    try {
      await rejectContent(selectedPrayer.id, rejectReason);
      setPrayersToModerate(prev => prev.filter(p => p.id !== selectedPrayer.id));
      setShowRejectModal(false);
      setRejectReason('');
      setSelectedPrayer(null);
    } catch (error) {
      console.error('Error rejecting prayer:', error);
    }
  };

  const openRejectModal = (prayer) => {
    setSelectedPrayer(prayer);
    setShowRejectModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primaryBlue"></div>
        <span className="ml-3 text-gray-600">Loading prayers...</span>
      </div>
    );
  }

  return (
    <div className="prayer-moderation space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-darkBlue mb-2">Prayer Request Moderation</h2>
            <p className="text-gray-600">
              Review and approve prayer requests before they appear on the prayer wall
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primaryBlue">{prayersToModerate.length}</p>
            <p className="text-sm text-gray-600">Pending Reviews</p>
          </div>
        </div>
      </div>

      {/* Prayer Cards */}
      {prayersToModerate.length === 0 ? (
        <div className="bg-white p-12 rounded-lg shadow-md text-center">
          <AiOutlineCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">All caught up!</h3>
          <p className="text-gray-600">No prayer requests pending moderation.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {prayersToModerate.map(prayer => (
            <PrayerModerationCard
              key={prayer.id}
              prayer={prayer}
              onApprove={handleApprovePrayer}
              onReject={openRejectModal}
            />
          ))}
        </div>
      )}

      {/* Reject Modal */}
      <Modal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        title="Reject Prayer Request"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Please provide a reason for rejecting this prayer request:
          </p>
          
          <textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent"
            placeholder="Enter rejection reason..."
          />
          
          <div className="flex justify-end space-x-3">
            <Button
              onClick={() => setShowRejectModal(false)}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleRejectPrayer}
              disabled={!rejectReason.trim()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              Reject Request
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Prayer Moderation Card Component
const PrayerModerationCard = ({ prayer, onApprove, onReject }) => {
  const [showFullText, setShowFullText] = useState(false);

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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(prayer.category)}`}>
            {capitalizeFirst(prayer.category)}
          </span>
          
          {prayer.urgency_level === 'urgent' && (
            <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
              <AiOutlineFlag className="w-3 h-3 mr-1" />
              Urgent
            </span>
          )}
          
          {prayer.is_public && (
            <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              Public Request
            </span>
          )}
        </div>
        
        <div className="text-sm text-gray-500">
          {formatDate(prayer.created_at)}
        </div>
      </div>

      {/* Requester Info */}
      <div className="flex items-center mb-4">
        <AiOutlineUser className="w-4 h-4 mr-2 text-gray-500" />
        <span className="text-sm text-gray-700">
          {prayer.is_anonymous ? 'Anonymous Request' : prayer.requester_name || 'Church Member'}
        </span>
        {prayer.requester_email && (
          <span className="ml-2 text-sm text-gray-500">
            ({prayer.requester_email})
          </span>
        )}
      </div>

      {/* Prayer Text */}
      <div className="mb-6">
        <p className="text-gray-800 leading-relaxed">
          {showFullText ? prayer.prayer_text : truncateText(prayer.prayer_text, 200)}
        </p>
        
        {prayer.prayer_text.length > 200 && (
          <button
            onClick={() => setShowFullText(!showFullText)}
            className="mt-2 text-primaryBlue hover:text-darkBlue text-sm"
          >
            {showFullText ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => onApprove(prayer.id)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <AiOutlineCheckCircle className="w-4 h-4 mr-2" />
            Approve
          </Button>
          
          <Button
            onClick={() => onReject(prayer)}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <AiOutlineCloseCircle className="w-4 h-4 mr-2" />
            Reject
          </Button>
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <AiOutlineEye className="w-4 h-4 mr-1" />
          <span>Submitted {formatDate(prayer.created_at)}</span>
        </div>
      </div>
    </div>
  );
};

export default PrayerModeration;
