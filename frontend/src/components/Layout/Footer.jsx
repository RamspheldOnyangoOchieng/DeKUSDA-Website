import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { AiFillInstagram, AiFillYoutube, AiOutlineMail } from 'react-icons/ai';

export const Footer = () => {
  const [email, setEmail] = useState('');

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    // TODO: integrate backend email handler or service (e.g. EmailJS, API call)
    alert(`Thank you! We received your inquiry: ${email}`);
    setEmail('');
  };

  return (
    <footer className="bg-darkBlue text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Church Info */}
          <div>
            <h4 className="text-lg font-bold text-lightBlue mb-4">About DeKUSDA Church</h4>
            <p className="text-sm leading-relaxed">
              A university-based Seventh-day Adventist Church centered on nurturing spiritual growth, 
              fellowship, and academic excellence through Christ. Welcome home.
            </p>
            <div className="mt-4">
              <p className="text-sm text-gray-300">
                <strong>Location:</strong> Dedan Kimathi University of Technology
              </p>
              <p className="text-sm text-gray-300">
                <strong>Email:</strong> dekutsda@students.dkut.ac.ke
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-lightBlue mb-4">Quick Links</h4>
            <ul className="text-sm space-y-3">
              <li><Link to="/" className="hover:text-lightBlue transition-colors">🏠 Home</Link></li>
              <li><Link to="/About/AboutDekusda" className="hover:text-lightBlue transition-colors">About Us</Link></li>
              <li><Link to="/Ministries/PersonalMinistries" className="hover:text-lightBlue transition-colors">Ministries</Link></li>
              <li><Link to="/Resources/TithesOfferings" className="hover:text-lightBlue transition-colors">TithesOfferings</Link></li>
              <li><Link to="/More/Announcements" className="hover:text-lightBlue transition-colors">Announcements</Link></li>
              <li><Link to="/Resources/Books" className="hover:text-lightBlue transition-colors">Resources</Link></li>
            </ul>
          </div>

          {/* Worship Schedule */}
          <div className='xl:-ml-20'>
            <h4 className="text-lg font-bold text-lightBlue mb-4">Worship Hours</h4>
            <ul className="text-sm space-y-2">
              <li>Prayers: Monday & Wednesday 5:00PM - 6:00PM</li>
              <li>Family Meeting: Tuesday 7:00PM - 8:00PM</li>
              <li>Bible Study: Wednesday 6:30PM - 8:00PM</li>
              <li>Vespers: Friday 6:30PM - 8:00PM</li>
              <li>Sabbath School: 8:20AM - 10:00AM</li>
              <li>Divine Service: 11:00AM - 1:00PM</li>
              <li>Afternoon Fellowship: 2:00PM - 5:00PM</li>
            </ul>
          </div>

          {/* Inquiries / Subscribe */}
          <div>
            <h4 className="text-lg font-bold text-lightBlue mb-4">For Inquiries </h4>
            <p className="text-sm mb-4">Don’t miss updates! Make an inquiry :</p>
            <form onSubmit={handleInquirySubmit} className="flex">
              <input
                type="email"
                required
                placeholder="Your mail here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-l-full text-gray-800 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white px-4 rounded-r-full flex items-center justify-center"
              >
                <AiOutlineMail className="text-xl" />
              </button>
            </form>
            <div className="mt-6">
              <h4 className="text-sm font-semibold">Stay Connected:</h4>
              <div className="flex space-x-4 text-2xl mt-2">
                <a href="https://chat.whatsapp.com/ILydxcM2OmlDT4Z0egZhNu?mode=ac_c" className="hover:text-lightBlue transition-colors" title="WhatsApp Group" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
                <a href="https://www.instagram.com/dekusda_church/profilecard/?igsh=MWh3NXJtcHNhM3FybA==" className="hover:text-lightBlue transition-colors" title="Instagram"><AiFillInstagram /></a>
                <a href="#" className="hover:text-lightBlue transition-colors" title="YouTube"><AiFillYoutube /></a>
                <a href="mailto:dekusda@students.dkut.ac.ke" className="hover:text-lightBlue transition-colors" title="Email"><AiOutlineMail /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} DeKUSDA Church. Powered by Faith & Technology.
            </p>
             <p className="text-xs text-gray-600 mt-1">
            | Built with ❤️ for our community
            </p>
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="/About/AboutDekusda" className="text-gray-400 hover:text-lightBlue transition-colors">Privacy Policy</a>
            <a href="/About/AboutDekusda" className="text-gray-400 hover:text-lightBlue transition-colors">Terms of Service</a>
            <a href="/About/AboutDekusda" className="text-gray-400 hover:text-lightBlue transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
