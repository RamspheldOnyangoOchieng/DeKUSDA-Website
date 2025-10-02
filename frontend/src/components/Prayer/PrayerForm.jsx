import { useState } from 'react';
import churchService from '../../services/churchService';
import { Button } from '../UI/Button';
import { AiOutlineHeart, AiOutlineUser } from 'react-icons/ai';

const PrayerForm = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    requester_name: '',
    prayer_request: '',
    category: 'thanksgiving',
    is_urgent: false,
    is_public: true
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Validate required fields
      if (!formData.prayer_request.trim()) {
        throw new Error('Prayer request text is required');
      }

      console.log('Submitting prayer request:', formData);
      const response = await churchService.createPrayerRequest(formData);
      console.log('Prayer request submitted successfully');
      
      setMessage({
        type: 'success',
        text: 'Prayer request submitted successfully! It will be reviewed before appearing on the prayer wall.'
      });
      
      // Reset form
      setFormData({
        requester_name: '',
        prayer_request: '',
        category: 'thanksgiving',
        is_urgent: false,
        is_public: true
      });

      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      console.error('Prayer submission error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      
      let errorMessage = 'Failed to submit prayer request. ';
      
      if (error.response) {
        // Server responded with error status
        errorMessage += `Server error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`;
      } else if (error.request) {
        // Request was made but no response received
        errorMessage += 'No response from server. Please check your connection.';
      } else {
        // Something else happened
        errorMessage += error.message;
      }
      
      setMessage({
        type: 'error',
        text: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-primaryBlue">
      <div className="flex items-center mb-6">
        <AiOutlineHeart className="w-6 h-6 mr-3 text-primaryBlue" />
        <h3 className="text-2xl font-bold text-darkBlue">Submit Your Prayer Request</h3>
      </div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-100 border border-green-400 text-green-700'
            : message.type === 'info'
            ? 'bg-blue-100 border border-blue-400 text-blue-700'
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            <AiOutlineUser className="inline w-4 h-4 mr-1" />
            Your Name *
          </label>
          <input
            type="text"
            name="requester_name"
            value={formData.requester_name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Category Selection */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Prayer Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent"
          >
            <option value="thanksgiving">Thanksgiving</option>
            <option value="healing">Healing</option>
            <option value="guidance">Guidance</option>
            <option value="family">Family</option>
            <option value="financial">Financial</option>
            <option value="spiritual">Spiritual Growth</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Prayer Request */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Prayer Request *
          </label>
          <textarea
            name="prayer_request"
            value={formData.prayer_request}
            onChange={handleInputChange}
            rows="5"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent"
            placeholder="Share your prayer request..."
            required
          ></textarea>
        </div>

        {/* Options */}
        <div className="flex items-center space-x-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="is_urgent"
              checked={formData.is_urgent}
              onChange={handleInputChange}
              className="mr-2 h-4 w-4 text-primaryBlue focus:ring-primaryBlue border-gray-300 rounded"
            />
            <span className="text-gray-700">Urgent Request</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="is_public"
              checked={formData.is_public}
              onChange={handleInputChange}
              className="mr-2 h-4 w-4 text-primaryBlue focus:ring-primaryBlue border-gray-300 rounded"
            />
            <span className="text-gray-700">Make Public</span>
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading || !formData.prayer_request.trim()}
          className="w-full py-3 bg-primaryBlue text-white rounded-lg hover:bg-darkBlue transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Submitting...
            </div>
          ) : (
            'Submit Prayer Request'
          )}
        </Button>
      </form>

      {/* Privacy Note */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Privacy Notice:</strong> All prayer requests are reviewed by our prayer ministry team before being made public. 
          Your personal information will only be used for prayer ministry purposes and will never be shared with third parties.
        </p>
      </div>
    </div>
  );
};

export default PrayerForm;
