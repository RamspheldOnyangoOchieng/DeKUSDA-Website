import { useState, useEffect } from 'react';
import { adminService } from '../../services/admin';
import { useAdmin } from '../../context/AdminContext';
import { formatDate, truncateText } from '../../utils/helpers';
import { Button } from '../UI/Button';
import { Modal } from '../UI/Modal';
import { 
  AiOutlineCheckCircle, 
  AiOutlineCloseCircle, 
  AiOutlineEye,
  AiOutlineEdit,
  AiOutlineCalendar,
  AiOutlineBook,
  AiOutlineFileText,
  AiOutlineImage
} from 'react-icons/ai';

const ContentModeration = () => {
  const { pendingContent, approveContent, rejectContent } = useAdmin();
  const [contentItems, setContentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContent, setSelectedContent] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    fetchPendingContent();
  }, []);

  const fetchPendingContent = async () => {
    setLoading(true);
    try {
      const response = await adminService.getPendingContent();
      setContentItems(response.data);
    } catch (error) {
      console.error('Error fetching pending content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveContent = async (contentId) => {
    try {
      await approveContent(contentId);
      setContentItems(prev => prev.filter(item => item.id !== contentId));
    } catch (error) {
      console.error('Error approving content:', error);
    }
  };

  const handleRejectContent = async () => {
    if (!selectedContent || !rejectReason.trim()) return;

    try {
      await rejectContent(selectedContent.id, rejectReason);
      setContentItems(prev => prev.filter(item => item.id !== selectedContent.id));
      setShowRejectModal(false);
      setRejectReason('');
      setSelectedContent(null);
    } catch (error) {
      console.error('Error rejecting content:', error);
    }
  };

  const openPreviewModal = (content) => {
    setSelectedContent(content);
    setShowPreviewModal(true);
  };

  const openRejectModal = (content) => {
    setSelectedContent(content);
    setShowRejectModal(true);
  };

  const getContentIcon = (type) => {
    const icons = {
      event: AiOutlineCalendar,
      book: AiOutlineBook,
      article: AiOutlineFileText,
      image: AiOutlineImage
    };
    const IconComponent = icons[type] || AiOutlineFileText;
    return <IconComponent className="w-5 h-5" />;
  };

  const getContentTypeColor = (type) => {
    const colors = {
      event: 'bg-blue-100 text-blue-800',
      book: 'bg-green-100 text-green-800',
      article: 'bg-purple-100 text-purple-800',
      image: 'bg-yellow-100 text-yellow-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const filteredContent = filterType === 'all' 
    ? contentItems 
    : contentItems.filter(item => item.type === filterType);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primaryBlue"></div>
        <span className="ml-3 text-gray-600">Loading content...</span>
      </div>
    );
  }

  return (
    <div className="content-moderation space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-darkBlue mb-2">Content Moderation</h2>
            <p className="text-gray-600">Review and approve content before publication</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primaryBlue">{filteredContent.length}</p>
            <p className="text-sm text-gray-600">Pending Reviews</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex space-x-2">
          {['all', 'event', 'book', 'article', 'image'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterType === type
                  ? 'bg-primaryBlue text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type === 'all' ? 'All Content' : type.charAt(0).toUpperCase() + type.slice(1) + 's'}
            </button>
          ))}
        </div>
      </div>

      {/* Content Cards */}
      {filteredContent.length === 0 ? (
        <div className="bg-white p-12 rounded-lg shadow-md text-center">
          <AiOutlineCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">All caught up!</h3>
          <p className="text-gray-600">No content pending moderation.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredContent.map(content => (
            <ContentModerationCard
              key={content.id}
              content={content}
              onApprove={handleApproveContent}
              onReject={openRejectModal}
              onPreview={openPreviewModal}
              getContentIcon={getContentIcon}
              getContentTypeColor={getContentTypeColor}
            />
          ))}
        </div>
      )}

      {/* Preview Modal */}
      <Modal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        title="Content Preview"
        size="large"
      >
        {selectedContent && (
          <ContentPreview content={selectedContent} />
        )}
      </Modal>

      {/* Reject Modal */}
      <Modal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        title="Reject Content"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Please provide a reason for rejecting this content:
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
              onClick={handleRejectContent}
              disabled={!rejectReason.trim()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              Reject Content
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Content Moderation Card Component
const ContentModerationCard = ({ 
  content, 
  onApprove, 
  onReject, 
  onPreview, 
  getContentIcon, 
  getContentTypeColor 
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {getContentIcon(content.type)}
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getContentTypeColor(content.type)}`}>
              {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
            </span>
          </div>
          
          {content.priority === 'high' && (
            <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
              High Priority
            </span>
          )}
        </div>
        
        <div className="text-sm text-gray-500">
          {formatDate(content.created_at)}
        </div>
      </div>

      {/* Content Info */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{content.title}</h3>
        
        {content.description && (
          <p className="text-gray-600 mb-2">
            {truncateText(content.description, 150)}
          </p>
        )}
        
        <div className="text-sm text-gray-500">
          <span>By: {content.author || 'Unknown Author'}</span>
          {content.scheduled_date && (
            <span className="ml-4">
              Scheduled: {formatDate(content.scheduled_date)}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Button
            onClick={() => onPreview(content)}
            className="flex items-center px-3 py-2 text-primaryBlue border border-primaryBlue rounded-lg hover:bg-primaryBlue hover:text-white transition-colors"
          >
            <AiOutlineEye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          
          <Button
            onClick={() => onApprove(content.id)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <AiOutlineCheckCircle className="w-4 h-4 mr-2" />
            Approve
          </Button>
          
          <Button
            onClick={() => onReject(content)}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <AiOutlineCloseCircle className="w-4 h-4 mr-2" />
            Reject
          </Button>
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <span>Submitted {formatDate(content.created_at)}</span>
        </div>
      </div>
    </div>
  );
};

// Content Preview Component
const ContentPreview = ({ content }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{content.title}</h2>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>Type: {content.type}</span>
          <span>Author: {content.author}</span>
          <span>Created: {formatDate(content.created_at)}</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="prose max-w-none">
        {content.image_url && (
          <img 
            src={content.image_url} 
            alt={content.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        )}
        
        {content.description && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{content.description}</p>
          </div>
        )}
        
        {content.content && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Full Content</h3>
            <div 
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content.content }}
            />
          </div>
        )}
        
        {content.type === 'event' && content.event_details && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Event Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Date:</strong> {formatDate(content.event_details.date)}
              </div>
              <div>
                <strong>Time:</strong> {content.event_details.time}
              </div>
              <div>
                <strong>Location:</strong> {content.event_details.location}
              </div>
              <div>
                <strong>Duration:</strong> {content.event_details.duration}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentModeration;
