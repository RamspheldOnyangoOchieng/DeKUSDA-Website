import React, { useState } from 'react';
import { 
  FaEnvelope, FaBell, FaNewspaper, FaCheck, 
  FaUsers, FaCalendarAlt, FaPray, FaHeart 
} from 'react-icons/fa';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const interestOptions = [
    { id: 'sermons', label: 'Weekly Sermons', icon: FaBell },
    { id: 'events', label: 'Church Events', icon: FaCalendarAlt },
    { id: 'ministries', label: 'Ministry Updates', icon: FaUsers },
    { id: 'prayer', label: 'Prayer Requests', icon: FaPray },
    { id: 'community', label: 'Community News', icon: FaHeart }
  ];

  const handleInterestToggle = (interestId) => {
    setInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send the data to your backend
      console.log('Newsletter signup:', { email, interests });
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
        setInterests([]);
      }, 3000);
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheck className="text-4xl" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Thank You for Subscribing!</h2>
          <p className="text-xl text-green-100">
            You'll receive our newsletter and updates based on your preferences. 
            Welcome to our church family's digital community!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Information */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaNewspaper className="text-blue-600 text-2xl" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Stay Connected</h2>
                <p className="text-blue-600 font-medium">Join our digital church family</p>
              </div>
            </div>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Get the latest church news, event updates, sermon recordings, and spiritual 
              encouragement delivered directly to your inbox. Stay connected with your 
              church family no matter where you are.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <FaCheck className="text-green-600" />
                </div>
                <span className="text-gray-700">Weekly sermon recordings and notes</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <FaCheck className="text-green-600" />
                </div>
                <span className="text-gray-700">Early access to event registration</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <FaCheck className="text-green-600" />
                </div>
                <span className="text-gray-700">Prayer request updates and testimonies</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <FaCheck className="text-green-600" />
                </div>
                <span className="text-gray-700">Ministry opportunities and volunteer calls</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">1,200+</div>
                <div className="text-sm text-gray-600">Newsletter Subscribers</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">Weekly</div>
                <div className="text-sm text-gray-600">Updates & Content</div>
              </div>
            </div>
          </div>

          {/* Right Side - Signup Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Join Our Newsletter</h3>
              <p className="text-gray-600">Choose what interests you most</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
                </div>
              </div>

              {/* Interest Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  What would you like to receive? (Select all that apply)
                </label>
                <div className="space-y-3">
                  {interestOptions.map((option) => {
                    const IconComponent = option.icon;
                    const isSelected = interests.includes(option.id);
                    
                    return (
                      <label
                        key={option.id}
                        className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                          isSelected 
                            ? 'bg-blue-50 border-2 border-blue-200' 
                            : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleInterestToggle(option.id)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <IconComponent className={`text-lg ${isSelected ? 'text-blue-600' : 'text-gray-500'}`} />
                        <span className={`font-medium ${isSelected ? 'text-blue-800' : 'text-gray-700'}`}>
                          {option.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-600">
                  By subscribing, you agree to receive emails from DeKUSDA Church. 
                  We respect your privacy and will never share your information. 
                  You can unsubscribe at any time.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Subscribe to Newsletter
              </button>
            </form>

            {/* Social Proof */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Join 1,200+ church members staying connected
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;
