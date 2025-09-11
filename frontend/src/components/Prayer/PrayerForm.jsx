import { useState } from 'react';
import { prayerService } from '../../services/prayers';
import { PRAYER_CATEGORIES } from '../../utils/constants';
import { Button } from '../UI/Button';
import { AiOutlineHeart, AiOutlineUser } from 'react-icons/ai';

const PrayerForm = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    requester_name: '',
    requester_email: '',
    prayer_text: '',
    is_anonymous: false,
    is_public: false,
    category: 'other'
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
      if (!formData.prayer_text.trim()) {
        throw new Error('Prayer request text is required');
      }

      console.log('Submitting prayer request:', formData);
      await prayerService.submitPrayer(formData);
      console.log('Prayer request submitted successfully');
      
      setMessage({
        type: 'success',
        text: 'Prayer request submitted successfully! It will be reviewed before appearing on the prayer wall.'
      });
      
      // Reset form
      setFormData({
        requester_name: '',
        requester_email: '',
        prayer_text: '',
        is_anonymous: false,
        is_public: false,
        category: 'other'
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

  const testConnection = async () => {
    try {
      setMessage({ type: 'info', text: 'Testing API connection...' });
      await prayerService.testConnection();
      setMessage({ type: 'success', text: 'API connection test successful!' });
    } catch (error) {
      console.error('Connection test error:', error);
      setMessage({ 
        type: 'error', 
        text: `Connection test failed: ${error.response?.status || error.message}` 
      });
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

      {/* Test Connection Button */}
      <div className="mb-4">
        <Button
          type="button"
          onClick={testConnection}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm"
        >
          Test API Connection
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Anonymous/Named Toggle */}
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="is_anonymous"
              checked={formData.is_anonymous}
              onChange={handleInputChange}
              className="mr-2 h-4 w-4 text-primaryBlue focus:ring-primaryBlue border-gray-300 rounded"
            />
            <span className="text-gray-700">Submit anonymously</span>
          </label>
        </div>

        {/* Name Field (hidden if anonymous) */}
        {!formData.is_anonymous && (
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              <AiOutlineUser className="inline w-4 h-4 mr-1" />
              Your Name
            </label>
            <input
              type="text"
              name="requester_name"
              value={formData.requester_name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent"
              placeholder="Enter your name (optional)"
            />
          </div>
        )}

        {/* Email Field (optional) */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Email (Optional)
          </label>
          <input
            type="email"
            name="requester_email"
            value={formData.requester_email}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent"
            placeholder="Your email for follow-up (optional)"
          />
          <p className="text-sm text-gray-500 mt-1">
            Email will only be used to follow up on your prayer request if needed
          </p>
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
            {PRAYER_CATEGORIES.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Prayer Text */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Prayer Request *
          </label>
          <textarea
            name="prayer_text"
            value={formData.prayer_text}
            onChange={handleInputChange}
            rows="5"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent"
            placeholder="Share your prayer request..."
            required
          ></textarea>
        </div>

        {/* Public Prayer Wall Option */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="is_public"
            id="is_public"
            checked={formData.is_public}
            onChange={handleInputChange}
            className="mr-3 h-4 w-4 text-primaryBlue focus:ring-primaryBlue border-gray-300 rounded"
          />
          <label htmlFor="is_public" className="text-gray-700">
            Share this request publicly on our prayer wall for the community to pray together
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading || !formData.prayer_text.trim()}
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
