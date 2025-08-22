
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaYoutube, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { AiFillFacebook, AiFillInstagram, AiFillYoutube, AiOutlineMail } from 'react-icons/ai';



export const Footer = () => {
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
                   {/* Quick Links */}
<div>
  <h4 className="text-lg font-bold text-lightBlue mb-4">Quick Links</h4>
  <ul className="text-sm space-y-3">
  <li><Link to="/">🏠 Home</Link></li>
  <li><Link to="/about/dekusda">About Us</Link></li>
  <li><Link to="/ministries/personal">Ministries</Link></li>
  <li><Link to="/resources/sermons">Sermons</Link></li>
  <li><Link to="/announcements">Announcements</Link></li>
  <li><Link to="/resources/books">Resources</Link></li>
</ul>

</div>


                    {/* Worship Schedule */}
                    <div className='xl:-ml-20'>
                        <h4 className="text-lg font-bold text-lightBlue mb-4">Worship Hours</h4>
                        <ul className="text-sm space-y-2">
                            <li className="flex items-center">
                                <span className="text-lightBlue mr-2"></span>
                                Prayers: Monday & Wednesday 5:00PM - 6:00PM
                            </li >
                            <li className="flex items-center">    
                            <span className="text-lightBlue mr-2"></span>
                            Family Meeting: Tuesday 7:00PM - 8:00PM
                            </li>
                            <li className="flex items-center">
                                <span className="text-lightBlue mr-2"></span>
                                Bible Study: Wednesday 6:30PM - 8:00PM
                            </li>
                            <li className="flex items-center">
                                <span className="text-lightBlue mr-2"></span>
                                Vespers: Friday 6:30PM - 8:00PM
                            </li>
                            <li className="flex items-center">
                                <span className="text-lightBlue mr-2"></span>
                                Sabbath School: 8:30AM - 10:00AM
                            </li>
                            <li className="flex items-center">
                                <span className="text-lightBlue mr-2"></span>
                                Divine Service: 11:00AM - 1:00PM
                            </li>
                            <li className="flex items-center">
                                <span className="text-lightBlue mr-2"></span>
                                Afternoon Fellowship: 2:00PM - 6:00PM
                            </li>
                        </ul>
                    </div>

                    {/* Social Media & Contact */}
                    <div>
                        <h4 className="text-lg font-bold text-lightBlue mb-4">Stay Connected</h4>
                        <p className="text-sm mb-4">Follow us on our channels:</p>
                        <div className="flex space-x-4 text-2xl mb-6">
                            <a href="https://chat.whatsapp.com/ILydxcM2OmlDT4Z0egZhNu?mode=ac_c" className="hover:text-lightBlue transition-colors" title="WhatsApp Group" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
                            <a href="https://www.instagram.com/dekusda_church/profilecard/?igsh=MWh3NXJtcHNhM3FybA==" className="hover:text-lightBlue transition-colors" title="Instagram"><AiFillInstagram /></a>
                            <a href="#" className="hover:text-lightBlue transition-colors" title="YouTube"><AiFillYoutube /></a>
                            <a href="mailto:dekusda@students.dkut.ac.ke" className="hover:text-lightBlue transition-colors" title="Email"><AiOutlineMail /></a>

                        </div>
                        <div className="text-sm">
                            <p className="mb-2"><strong>Emergency Contact:</strong></p>
                            <p className="text-gray-300">Chaplain: +254 712 220 411</p>
                            <p className="text-gray-300">Church Office: +254 748 260 864 </p>
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
                            Designed by Tech Ministry | Built with  for our community
                        </p>
                    </div>
                    <div className="flex space-x-6 text-sm">
                        <a href="/About/AboutDekusda" className="text-gray-400 hover:text-lightBlue transition-colors">
                            Privacy Policy
                        </a>
                        <a href="/About/AboutDekusda" className="text-gray-400 hover:text-lightBlue transition-colors">
                            Terms of Service
                        </a>
                        <a href="/About/AboutDekusda" className="text-gray-400 hover:text-lightBlue transition-colors">
                            Accessibility
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer;