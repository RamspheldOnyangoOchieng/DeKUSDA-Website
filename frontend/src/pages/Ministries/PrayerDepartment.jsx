import { useState, useEffect } from 'react';
import { Header } from '../../components/Layout/Header';
import { Footer } from '../../components/Layout/Footer';
import { AiOutlineClockCircle, AiOutlineTeam, AiOutlineCalendar } from 'react-icons/ai';
import { FiUsers, FiBookOpen } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import churchService from '../../services/churchService';
import Loading from '../../components/common/Loading';

const PrayerDepartment = () => {
  const { isAuthenticated } = useAuth();
  const [prayerRequests, setPrayerRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    prayer_type: 'personal',
    is_urgent: false,
    is_anonymous: false
  });

  useEffect(() => {
    fetchPrayerRequests();
  }, []);

  const fetchPrayerRequests = async () => {
    try {
      setIsLoading(true);
      const response = await churchService.getPrayerRequests({ 
        status: 'approved',
        limit: 10 
      });
      if (response.success) {
        setPrayerRequests(response.data.slice(0, 10));
      }
    } catch (err) {
      console.error('Failed to load prayer requests:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await churchService.createPrayerRequest(formData);
      if (response.success) {
        setSuccess('Your prayer request has been submitted for review. Thank you!');
        setFormData({
          title: '',
          description: '',
          prayer_type: 'personal',
          is_urgent: false,
          is_anonymous: false
        });
        setShowForm(false);
        // Refresh the list after a short delay
        setTimeout(fetchPrayerRequests, 2000);
      }
    } catch (err) {
      setError('Failed to submit prayer request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="w-full">
        <Header />

        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-primaryBlue to-darkBlue text-white py-10 px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Prayer Department</h1>
          <p className="text-lg max-w-2xl mx-auto">
            The spiritual foundation of DEKUSDA, fostering a culture of prayer and devotion
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto py-12 px-6">

          {/* Leadership Section */}
          <div className="mb-16 bg-white p-8 rounded-xl shadow-lg border-l-4 border-primaryBlue">
            <h2 className="text-3xl font-bold text-darkBlue mb-6 flex items-center">
              <AiOutlineTeam className="mr-3 text-primaryBlue" />
              Leadership Team
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold text-primaryBlue mb-2">Department Leader</h3>
                <p className="text-xl text-gray-800">Jessy Kiplimo</p>
                <p className="text-gray-600 mt-2">Oversees all prayer initiatives and spiritual guidance</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold text-primaryBlue mb-2">Assistant Leader</h3>
                <p className="text-xl text-gray-800">Brian Kitheka</p>
                <p className="text-gray-600 mt-2">Coordinates prayer schedules and member participation</p>
              </div>
            </div>
          </div>

          {/* Prayer Schedule */}
          <div className="mb-16 bg-white p-8 rounded-xl shadow-lg border-l-4 border-primaryBlue">
            <h2 className="text-3xl font-bold text-darkBlue mb-6 flex items-center">
              <AiOutlineClockCircle className="mr-3 text-primaryBlue" />
              Prayer Schedule
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-primaryBlue mb-4 flex items-center">
                  <FiBookOpen className="mr-3" />
                  Daily Devotions
                </h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-bold text-darkBlue">Morning Prayer</h4>
                  <p className="text-gray-700">4:30 AM - 5:00 AM</p>
                  <p className="text-sm text-gray-500 mt-1">Using "With God at Dawn" by Ellen G. White</p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-primaryBlue mb-4 flex items-center">
                  <FiUsers className="mr-3" />
                  Weekly Gatherings
                </h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-bold text-darkBlue">Evening Prayer</h4>
                  <p className="text-gray-700">Monday, Wednesday, Friday</p>
                  <p className="text-gray-700">5:00 PM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Special Programs */}
          <div className="mb-16 bg-white p-8 rounded-xl shadow-lg border-l-4 border-primaryBlue">
            <h2 className="text-3xl font-bold text-darkBlue mb-6 flex items-center">
              <AiOutlineCalendar className="mr-3 text-primaryBlue" />
              Special Programs
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold text-primaryBlue mb-2">Prayer & Fasting</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Leaders' Session: Once per semester</li>
                  <li>Church-wide: Once per semester</li>
                </ul>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold text-primaryBlue mb-2">Week of Spiritual Emphasis</h3>
                <p className="text-gray-700">
                  Semesterly event focused on current spiritual needs with theme-based guidance
                </p>
              </div>
            </div>
          </div>

          {/* Prayer Requests Section */}
          <div className="mb-16 bg-white p-8 rounded-xl shadow-lg border-l-4 border-primaryBlue">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-darkBlue">Prayer Requests</h2>
              <button
                onClick={() => setShowForm(!showForm)}
                className="px-4 py-2 bg-primaryBlue text-white rounded-lg hover:bg-darkBlue transition-colors"
              >
                {showForm ? 'Cancel' : 'Submit Prayer Request'}
              </button>
            </div>

            {/* Messages */}
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                {success}
              </div>
            )}

            {/* Prayer Request Form */}
            {showForm && (
              <div className="mb-8 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-darkBlue mb-4">Submit Your Prayer Request</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prayer Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryBlue"
                      placeholder="Brief title for your prayer request"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prayer Type
                    </label>
                    <select
                      name="prayer_type"
                      value={formData.prayer_type}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryBlue"
                    >
                      <option value="personal">Personal</option>
                      <option value="health">Health & Healing</option>
                      <option value="academic">Academic</option>
                      <option value="family">Family</option>
                      <option value="spiritual">Spiritual Growth</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prayer Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryBlue"
                      placeholder="Please describe your prayer request..."
                    />
                  </div>

                  <div className="flex items-center space-x-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="is_urgent"
                        checked={formData.is_urgent}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primaryBlue focus:ring-primaryBlue border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Urgent Request</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="is_anonymous"
                        checked={formData.is_anonymous}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primaryBlue focus:ring-primaryBlue border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Submit Anonymously</span>
                    </label>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primaryBlue text-white rounded-md hover:bg-darkBlue disabled:opacity-50"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Submitting...' : 'Submit Prayer Request'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Recent Prayer Requests */}
            <div>
              <h3 className="text-xl font-semibold text-darkBlue mb-4">Recent Prayer Requests</h3>
              {isLoading && !showForm ? (
                <Loading text="Loading prayer requests..." />
              ) : prayerRequests.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No prayer requests to display at this time.</p>
              ) : (
                <div className="space-y-4">
                  {prayerRequests.map((request) => (
                    <div key={request.id} className="bg-gray-50 p-4 rounded-lg border-l-4 border-primaryBlue">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-darkBlue">{request.title}</h4>
                        <div className="flex items-center space-x-2">
                          {request.is_urgent && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                              Urgent
                            </span>
                          )}
                          <span className="text-xs text-gray-500 capitalize">
                            {request.prayer_type}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm mb-2">{request.description}</p>
                      <p className="text-xs text-gray-500">
                        {request.is_anonymous ? 'Anonymous' : request.requester_name || 'Church Member'} • 
                        {request.created_at ? new Date(request.created_at).toLocaleDateString() : 'Recently'}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Purpose Section */}
          <div className="mb-16 bg-white p-8 rounded-xl shadow-lg border-l-4 border-primaryBlue">
            <h2 className="text-3xl font-bold text-darkBlue mb-6">Our Purpose</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                The Prayer Department exists to cultivate a deep prayer culture within DEKUSDA, serving as:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The spiritual backbone supporting all church activities</li>
                <li>A training ground for personal prayer development</li>
                <li>A covering of intercession for the university community</li>
                <li>A catalyst for spiritual revival and transformation</li>
              </ul>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-darkBlue mb-4">Join Our Prayer Community</h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Whether you're new to prayer or have an established prayer life, we welcome you to grow with us.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-6 py-3 bg-primaryBlue text-white rounded-lg hover:bg-darkBlue transition-colors font-semibold">
                Become a Prayer Warrior
              </button>
              <button 
                onClick={() => setShowForm(true)}
                className="px-6 py-3 border-2 border-primaryBlue text-primaryBlue rounded-lg hover:bg-primaryBlue hover:text-white transition-colors font-semibold"
              >
                Request Prayer
              </button>
            </div>
          </div>

          {/* WhatsApp Group Section */}
          <div className="mt-16 max-w-4xl mx-auto bg-green-50 border-l-4 border-green-600 p-8 rounded-xl shadow-lg text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">
              Join the Prayer Band WhatsApp Group
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Stay connected with fellow prayer warriors, receive updates on prayer meetings, and share intercessory requests in real-time.
            </p>
            <a
              href="https://chat.whatsapp.com/Ims8N3mHbQY6uUeOJrjp8V?mode=r_t"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
            >
              Join WhatsApp Group
            </a>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default PrayerDepartment;
