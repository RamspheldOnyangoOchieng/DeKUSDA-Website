import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => (document.body.style.overflow = 'auto');
  }, [isOpen]);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-blue-900 h-14 -mt-6 flex items-center justify-center px-4 lg:px-0">
        <p className="mt-5 bg-gradient-to-r from-blue-300 to-red-300 text-transparent bg-clip-text">
          Dedan Kimathi University SDA Church
        </p>
      </div>

      {/* MENU label and hamburger */}
      <div className="flex justify-between items-center px-4 mb-2 lg:hidden">
        <div className="text-neutral-500 font-georgia">
          MENU
        </div>
        <button
          className="z-50 focus:outline-none p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-8 h-6 flex flex-col justify-between">
            <span className={`block h-1 bg-gray-500 transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-1 bg-gray-500 transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`} />
            <span className={`block h-1 bg-gray-500 transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        />
      )}

      {/* Mobile Sidebar Nav */}
      <div className={`fixed top-0 right-0 h-full w-2/3 bg-blue-900 text-white z-40 transform transition-transform duration-300 overflow-y-auto ${isOpen ? "translate-x-0" : "translate-x-full"} block lg:hidden`}>
        <ul className="p-6 space-y-4 text-sm font-medium">
          <li><Link to="/" onClick={() => setIsOpen(false)} className="hover:underline underline-offset-2">Home</Link></li>

          <li>
            <details>
              <summary className="cursor-pointer hover:underline underline-offset-2">About Us</summary>
              <ul className="pl-4 space-y-2">
                <li><Link to="/Aboutdekusda" onClick={() => setIsOpen(false)} className="hover:underline underline-offset-2">About DeKUSDA</Link></li>
                <li><Link to="/Aboutsda" onClick={() => setIsOpen(false)} className="hover:underline underline-offset-2">About SDA Church</Link></li>
                <li><Link to="/ElderMessage" onClick={() => setIsOpen(false)} className="hover:underline underline-offset-2">Elder Message</Link></li>
                <li><Link to="/PastorMessage" onClick={() => setIsOpen(false)} className="hover:underline underline-offset-2">Pastor Message</Link></li>
              </ul>
            </details>
          </li>

          <li>
            <details>
              <summary className="cursor-pointer hover:underline underline-offset-2">Ministries/Departments</summary>
              <ul className="pl-4 space-y-2">
                <li><Link to="/DeconaryDepartment" onClick={() => setIsOpen(false)} className="hover:underline underline-offset-2">Deconary Department</Link></li>
                <li><Link to="/Personalministries" onClick={() => setIsOpen(false)} className="hover:underline underline-offset-2">Personal ministries</Link></li>
                <li><Link to="/PrayerDepartment" onClick={() => setIsOpen(false)} className="hover:underline underline-offset-2">Prayer Department</Link></li>
                <li><Link to="/AMO_ALO" onClick={() => setIsOpen(false)} className="hover:underline underline-offset-2">AMO / ALO</Link></li>
                <li><Link to="/Health" onClick={() => setIsOpen(false)} className="hover:underline underline-offset-2">Health Department</Link></li>
                <li><Link to="/SabbathSchool" onClick={() => setIsOpen(false)} className="hover:underline underline-offset-2">Sabbath School</Link></li>
                <li><Link to="/Prophecy" onClick={() => setIsOpen(false)} className="hover:underline underline-offset-2">Prophecy</Link></li>
              </ul>
            </details>
          </li>

          <li>
            <details>
              <summary className="cursor-pointer hover:underline underline-offset-2">Music</summary>
              <ul className="pl-4 space-y-2">
                <li><Link to="/Music/ChurchChoir" onClick={() => setIsOpen(false)} className="hover:underline underline-offset-2">Church Choir</Link></li>
                <li><Link to="/Music/Blissful" onClick={() => setIsOpen(false)} className="hover:underline underline-offset-2">Blissful Tones</Link></li>
                <li><Link to="/Music/DCM" onClick={() => setIsOpen(false)} className="hover:underline underline-offset-2">DCM</Link></li>
              </ul>
            </details>
          </li>

          <li>
            <details>
              <summary className="cursor-pointer hover:underline underline-offset-2">Evangelism</summary>
              <ul className="pl-4 space-y-2">
                <li><Link to="/PCM" onClick={() => setIsOpen(false)} className="hover:underline underline-offset-2">PCM</Link></li>
                <li><Link to="/Evangelism" onClick={() => setIsOpen(false)} className="hover:underline underline-offset-2">Evangelism</Link></li>
              </ul>
            </details>
          </li>

          <li>
            <details>
              <summary className="cursor-pointer hover:underline underline-offset-2">Resources</summary>
              <ul className="pl-4 space-y-2">
                <li><Link to="/Books" onClick={() => setIsOpen(false)} className="hover:underline underline-offset-2">Books</Link></li>
                <li><Link to="/COE" onClick={() => setIsOpen(false)} className="hover:underline underline-offset-2">COE</Link></li>
                <li><Link to="/tithes-offerings" onClick={() => setIsOpen(false)} className="hover:underline underline-offset-2">Tithes &amp; Offerings</Link></li>
              </ul>
            </details>
          </li>

          <li>
            <details>
              <summary className="cursor-pointer hover:underline underline-offset-2">More</summary>
              <ul className="pl-4 space-y-2">
                <li><Link to="/Announcements" onClick={() => setIsOpen(false)} className="hover:underline underline-offset-2">Announcements</Link></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>

      {/* Desktop Navbar */}
      <nav className="hidden lg:block">
        <div className="lg:ml-40 xl:ml-80">
          <ul className="text-sm text-blue-900 space-x-4 flex">
            {/* Home */}
            <li className='my-10 xl:text-lg lg:text-[1rem] font-georgia font-normal'><Link to="/">Home</Link></li>

            {/* About */}
            <li className='relative z-50 group'>
              <div className='flex items-center justify-center my-10 xl:text-lg lg:text-[1rem] font-georgia font-normal cursor-pointer'>
                About Us
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='h-4 w-4'><path d="M6 9l6 6 6-6" /></svg>
              </div>
              <ul className='absolute left-0 -mt-6 lg:w-44 xl:w-52 bg-neutral-100 shadow-lg hidden group-hover:block space-y-4 pt-2 border border-neutral-200'>
                <li className='pl-2 hover:underline'><Link to="/Aboutdekusda">About DeKUSDA</Link></li>
                <li className='pl-2 hover:underline'><Link to="/Aboutsda">About SDA Church</Link></li>
                <li className='pl-2 hover:underline'><Link to="/ElderMessage">Elder's Message</Link></li>
                <li className='pl-2 hover:underline'><Link to="/PastorMessage">Pastor's Message</Link></li>
              </ul>
            </li>

            {/* Ministries */}
            <li className='relative z-50 group'>
              <div className='flex items-center justify-center my-10 xl:text-lg lg:text-[1rem] font-georgia font-normal cursor-pointer'>
                Ministries/Departments
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='h-4 w-4'><path d="M6 9l6 6 6-6" /></svg>
              </div>
              <ul className='absolute left-0 -mt-6 lg:w-52 bg-neutral-100 shadow-lg hidden group-hover:block space-y-4 pt-2 border border-neutral-200'>
                <li className='pl-2 hover:underline'><Link to="/DeconaryDepartment">Deconary Department</Link></li>
                <li className='pl-2 hover:underline'><Link to="/Personalministries">Personal ministries</Link></li>
                <li className='pl-2 hover:underline'><Link to="/PrayerDepartment">Prayer Department</Link></li>
                <li className='pl-2 hover:underline'><Link to="/AMO_ALO">AMO / ALO</Link></li>
                <li className='pl-2 hover:underline'><Link to="/Health">Health Department</Link></li>
                <li className='pl-2 hover:underline'><Link to="/SabbathSchool">Sabbath School</Link></li>
                <li className='pl-2 hover:underline'><Link to="/Prophecy">Prophecy</Link></li>
              </ul>
            </li>

            {/* Music */}
            <li className='relative z-50 group'>
              <div className='flex items-center justify-center my-10 xl:text-lg lg:text-[1rem] font-georgia font-normal cursor-pointer'>
                Music
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='h-4 w-4'><path d="M6 9l6 6 6-6" /></svg>
              </div>
              <ul className='absolute left-0 -mt-6 lg:w-52 bg-neutral-100 shadow-lg hidden group-hover:block space-y-4 pt-2 border border-neutral-200'>
                <li className='pl-2 hover:underline'><Link to="/Music/ChurchChoir">Church Choir</Link></li>
                <li className='pl-2 hover:underline'><Link to="/Music/Blissful">Blissful </Link></li>
                <li className='pl-2 hover:underline'><Link to="/Music/DCM">DCM</Link></li>
              </ul>
            </li>

            {/* Evangelism */}
            <li className='relative z-50 group'>
              <div className='flex items-center justify-center my-10 xl:text-lg lg:text-[1rem] font-georgia font-normal cursor-pointer'>
                Evangelism
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='h-4 w-4'><path d="M6 9l6 6 6-6" /></svg>
              </div>
              <ul className='absolute left-0 -mt-6 lg:w-44 bg-neutral-100 shadow-lg hidden group-hover:block space-y-4 pt-2 border border-neutral-200'>
                <li className='pl-2 hover:underline'><Link to="/PCM">PCM</Link></li>
                <li className='pl-2 hover:underline'><Link to="/Evangelism">Evangelism</Link></li>
              </ul>
            </li>

            {/* Resources */}
            <li className='relative z-50 group'>
              <div className='flex items-center justify-center my-10 xl:text-lg lg:text-[1rem] font-georgia font-normal cursor-pointer'>
                Resources
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='h-4 w-4'><path d="M6 9l6 6 6-6" /></svg>
              </div>
              <ul className='absolute left-0 -mt-6 lg:w-44 bg-neutral-100 shadow-lg hidden group-hover:block space-y-4 pt-2 border border-neutral-200'>
                <li className='pl-2 hover:underline'><Link to="/Books">Books</Link></li>
                <li className='pl-2 hover:underline'><Link to="/COE">COE</Link></li>
                <li className='pl-2 hover:underline'><Link to="/tithes-offerings">Tithes &amp; Offerings</Link></li>
              </ul>
            </li>

            {/* More */}
            <li className='relative z-50 group'>
              <div className='flex items-center justify-center my-10 xl:text-lg lg:text-[1rem] font-georgia font-normal cursor-pointer'>
                More
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='h-4 w-4'><path d="M6 9l6 6 6-6" /></svg>
              </div>
              <ul className='absolute left-0 -mt-6 lg:w-44 bg-neutral-100 shadow-lg hidden group-hover:block space-y-4 pt-2 border border-neutral-200'>
                <li className='pl-2 hover:underline'><Link to="/Announcements">Announcements</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
