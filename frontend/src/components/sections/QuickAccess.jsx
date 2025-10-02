import React from 'react';
import { 
  FaCalendarAlt, FaClock, FaMapMarkerAlt,
  FaHandsHelping, FaEnvelope, FaPhone, FaGift,
  FaArrowRight
} from 'react-icons/fa';

const QuickAccess = () => {
  const quickLinks = [];

  const contactInfo = [
    {
      icon: FaPhone,
      label: "Call Us",
      value: "+233 24 123 4567",
      action: "tel:+233241234567"
    },
    {
      icon: FaEnvelope,
      label: "Email",
      email: "info@dekusda.org",
      action: "mailto:info@dekusda.org"
    },
    {
      icon: FaMapMarkerAlt,
      label: "Visit",
      value: "DeKUSDA Church, Nyeri, Kenya",
      action: "#"
    }
  ];

  return (
    <div className="w-full bg-white py-16 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickLinks.map((link, index) => {
            const IconComponent = link.icon;
            return (
              <div key={index} className="group">
                <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className={`bg-gradient-to-r ${link.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="text-white text-xl" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{link.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{link.description}</p>
                  <button 
                    onClick={() => window.location.href = link.link}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium group-hover:translate-x-1 transition-transform"
                  >
                    <span>{link.action}</span>
                    <FaArrowRight className="text-sm" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Service Times & Contact */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Service Times */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6">This Week's Services</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white/10 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <FaCalendarAlt className="text-blue-200" />
                  <div>
                    <div className="font-semibold">Sabbath School</div>
                    <div className="text-blue-100 text-sm">Interactive Bible Study</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">Saturday</div>
                  <div className="text-blue-100 text-sm">8:20 AM</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between bg-white/10 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <FaClock className="text-blue-200" />
                  <div>
                    <div className="font-semibold">Divine Worship</div>
                    <div className="text-blue-100 text-sm">Main Service</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">Saturday</div>
                  <div className="text-blue-100 text-sm">10:00 AM</div>
                </div>
              </div>

              <div className="flex items-center justify-between bg-white/10 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <FaHandsHelping className="text-blue-200" />
                  <div>
                    <div className="font-semibold">Prayer Meeting</div>
                    <div className="text-blue-100 text-sm">Midweek Prayer</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">Wednesday</div>
                  <div className="text-blue-100 text-sm">7:00 PM</div>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              View Full Schedule
            </button>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h3>
            <div className="space-y-6">
              {contactInfo.map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <IconComponent className="text-blue-600 text-xl" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-600 font-medium">{contact.label}</div>
                      <a 
                        href={contact.action}
                        className="text-gray-800 font-semibold hover:text-blue-600 transition-colors"
                      >
                        {contact.value}
                      </a>
                    </div>
                  </div>
                );
              })}

              {/* Church Hours */}
              <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">Office Hours</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>7:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickAccess;
