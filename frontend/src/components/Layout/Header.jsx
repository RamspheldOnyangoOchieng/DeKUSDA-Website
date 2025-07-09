import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top header bar */}
      <div className="bg-blue-900 h-14 -mt-6 flex items-center justify-between px-4 lg:px-0">
        <p className="mt-5 ml-10 bg-gradient-to-r from-blue-300 to-red-300 text-transparent bg-clip-text">
          Dedan Kimathi University SDA Church
        </p>
      </div>

      <div className='flex xs:mb-2 sm:mb-2 md:mb-2'>
         <div className="
      xs:block xs:ml-[250px]
      sm:block sm:ml-[420px]
      md:block md:ml-[520px]
      lg:hidden 
      xl:hidden
      p-4 font-georgia text-neutral-500
      ">MENU</div>
      {/* Hamburger: visible on xs, sm, md; hidden on lg+ */}
        <button
          className="block lg:hidden z-50 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-8 h-6 flex flex-col justify-between">
            <span
              className={`block h-1 bg-gray-500 transition-transform duration-300 ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-1 bg-gray-500 transition-opacity duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-1 bg-gray-500 transition-transform duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Sidebar Nav: only on xs, sm, md (block lg:hidden) */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 bg-blue-900 text-white z-40 transform transition-transform duration-300 overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } block lg:hidden`}
      >
        <ul className="p-6 space-y-4 text-sm font-medium">
          {/* Home */}
          <li>
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="hover:underline underline-offset-2"
            >
              Home
            </Link>
          </li>

          {/* About Us with nested Leadership */}
          <li>
            <details>
              <summary className="cursor-pointer hover:underline underline-offset-2">
                About Us
              </summary>
              <ul className="pl-4 space-y-2">
                <li>
                  <Link
                    to="/Aboutdekusda"
                    onClick={() => setIsOpen(false)}
                    className="hover:underline underline-offset-2"
                  >
                    About DeKUSDA
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Aboutsda"
                    onClick={() => setIsOpen(false)}
                    className="hover:underline underline-offset-2"
                  >
                    About SDA Church
                  </Link>
                </li>
                <li>
                  <details>
                    <summary className="cursor-pointer hover:underline underline-offset-2">
                      Leadership
                    </summary>
                    <ul className="pl-4 space-y-1">
                      <li>
                        <Link
                          to="/Leaders2024"
                          onClick={() => setIsOpen(false)}
                          className="hover:underline underline-offset-2"
                        >
                          Church leaders 2024/2025
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/Leaders2023"
                          onClick={() => setIsOpen(false)}
                          className="hover:underline underline-offset-2"
                        >
                          Church leaders 2023/2024
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/Leaders2022"
                          onClick={() => setIsOpen(false)}
                          className="hover:underline underline-offset-2"
                        >
                          Church leaders 2022/2023
                        </Link>
                      </li>
                    </ul>
                  </details>
                </li>
                <li>
                  <Link
                    to="/Pastormessage"
                    onClick={() => setIsOpen(false)}
                    className="hover:underline underline-offset-2"
                  >
                    Message from Pastor/Patron
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Eldermessage"
                    onClick={() => setIsOpen(false)}
                    className="hover:underline underline-offset-2"
                  >
                    Head Elder's Message
                  </Link>
                </li>
              </ul>
            </details>
          </li>

          {/* Ministries/Departments */}
          <li>
            <details>
              <summary className="cursor-pointer hover:underline underline-offset-2">
                Ministries/Departments
              </summary>
              <ul className="pl-4 space-y-2">
                <li>
                  <Link
                    to="/Personalministries"
                    onClick={() => setIsOpen(false)}
                    className="hover:underline underline-offset-2"
                  >
                    Personal ministries
                  </Link>
                </li>
              </ul>
            </details>
          </li>

          {/* Evangelism */}
          <li>
            <details>
              <summary className="cursor-pointer hover:underline underline-offset-2">
                Evangelism
              </summary>
              <ul className="pl-4 space-y-2">
                <li>
                  <Link
                    to="/PCM"
                    onClick={() => setIsOpen(false)}
                    className="hover:underline underline-offset-2"
                  >
                    Public Campus Ministries
                  </Link>
                </li>
              </ul>
            </details>
          </li>

          {/* Music */}
          <li>
            <details>
              <summary className="cursor-pointer hover:underline underline-offset-2">
                Music
              </summary>
              <ul className="pl-4 space-y-2">
                <li>
                  <Link
                    to="/Churchchoir"
                    onClick={() => setIsOpen(false)}
                    className="hover:underline underline-offset-2"
                  >
                    Church choir
                  </Link>
                </li>
                <li>
                  <Link
                    to="/DCM"
                    onClick={() => setIsOpen(false)}
                    className="hover:underline underline-offset-2"
                  >
                    DCM
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Blissful"
                    onClick={() => setIsOpen(false)}
                    className="hover:underline underline-offset-2"
                  >
                    Blissful
                  </Link>
                </li>
              </ul>
            </details>
          </li>

          {/* Resources */}
          <li>
            <details>
              <summary className="cursor-pointer hover:underline underline-offset-2">
                Resources
              </summary>
              <ul className="pl-4 space-y-2">
                <li>
                  <Link
                    to="/COE"
                    onClick={() => setIsOpen(false)}
                    className="hover:underline underline-offset-2"
                  >
                    COE
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Sermons"
                    onClick={() => setIsOpen(false)}
                    className="hover:underline underline-offset-2"
                  >
                    Sermons
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Books"
                    onClick={() => setIsOpen(false)}
                    className="hover:underline underline-offset-2"
                  >
                    Books and resources
                  </Link>
                </li>
              </ul>
            </details>
          </li>

          {/* More */}
          <li>
            <details>
              <summary className="cursor-pointer hover:underline underline-offset-2">
                More
              </summary>
              <ul className="pl-4 space-y-2">
                <li>
                  <Link
                    to="/Announcements"
                    onClick={() => setIsOpen(false)}
                    className="hover:underline underline-offset-2"
                  >
                    Announcements
                  </Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>

      {/* Original inline navigation — visible only on lg+ */}
      <nav className="hidden lg:block">
        <div className="xl:ml-80 lg:ml-40">
          <ul className="text-sm text-blue-900 space-x-4 flex">
            {/* This is what will be displayed on a large and extra large screen */}
            
              <li className='my-10 xl:text-lg lg:text-[1rem] font-georgia font-normal'>
                <Link to="/" >Home</Link>
              </li>
      
              <li className='relative z-50 group/leadership cursor-pointer'>
                <div className='flex items-center my-10 xl:text-lg lg:text-[1rem] font-georgia font-normal'>About Us
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='h-4 w-4'>
                  <path d="M6 9l6 6 6-6" fill="none" stroke="black" strokeWidth="2" />
                  </svg>
                </div>
                
                <ul className='ml-0 absolute left-0 -mt-6 lg:w-44 xl:w-52 h-52 bg-neutral-100 rounded-xs shadow-lg 
                transition-all duration-300 hidden group-hover/leadership:flex flex-col space-y-4 text-md 
                font-bold border border-neutral-200'>
                  <li className='text-black font-normal pt-4 hover:underline underline-offset-1 pl-2'>
                    <Link to="/Aboutdekusda">About DeKUSDA</Link>
                  </li>
                  
                  <li className='text-black font-normal hover:underline underline-offset-1 pl-2'>
                    <Link to="/Aboutsda">About SDA church</Link>
                  </li>
                
                  <li className='relative group cursor-pointer text-black font-normal hover:underline 
                  underline-offset-1 pl-2'>
                
                <div className='flex items-center'>Leadership
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" 
                  strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
                </div>
    
                <ul className='absolute lg:-left-8 xl:left-0 -mt-10 lg:w-48 xl:w-52 h-40 bg-neutral-100 rounded-xs shadow-lg 
                transition-all duration-300 hidden group-hover:block space-y-4 text-md font-bold border 
                border-neutral-200 ml-52 lg:pt-4 lg:pl-2 xl:pt-4 xl:pl-2'>
    
                  <li><Link to='/Leaders2024' className='font-normal hover:underline underline-offset-1'>
                  Church leaders 2024/2025</Link>
                  </li>
    
                  <li><Link to='/Leaders2023' className='font-normal hover:underline underline-offset-1'>
                  Church leaders 2023/2024</Link>
                  </li>
    
                  <li><Link to='/Leaders2022' className='font-normal hover:underline underline-offset-1'>
                  Church leaders 2022/2023</Link>
                  </li>
    
                </ul>
                </li>
    
                <li className='text-black font-normal hover:underline underline-offset-1 pl-2'>
                  <Link to="/Pastormessage">Message from pastor/patron</Link>
                </li>
                <li className='text-black font-normal hover:underline underline-offset-1 pl-2'>
                  <Link to="/Eldermessage">Head elder's message</Link>
                </li>
    
              </ul>
              </li>
      
              <li className='relative z-50 group'>
             
              <div className='flex items-center justify-center my-10 xl:text-lg lg:text-[1rem] font-georgia font-normal 
              cursor-pointer'>
                Ministries/Departments
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='h-4 w-4 '>
                <path d="M6 9l6 6 6-6" fill="none" stroke="black" strokeWidth="2" />
                </svg>
              </div>
      
              <ul className='absolute left-0 -mt-6 lg:w-44 xl:w-52 h-40 bg-neutral-100 rounded-xs shadow-lg 
              transition-all duration-300 hidden group-hover:block space-y-4 text-md font-bold border 
              border-neutral-200 ml-0 pt-2'>
                <li className='text-black font-normal hover:underline underline-offset-1 pl-2'>
                  <Link to="/Personalministries">Personal ministries</Link>
                </li>
              </ul>
              </li>
      
              <li className='relative z-50 group'>
              <div className='flex items-center my-10 xl:text-lg lg:text-[1rem] font-georgia font-normal cursor-pointer'>
                Evangelism
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='h-4 w-4'>
                <path d="M6 9l6 6 6-6" fill="none" stroke="black" strokeWidth="2" />
                </svg>
              </div>
      
              <ul className='absolute left-0 ml-0 -mt-6 lg:w-44 xl:w-52 h-40 bg-neutral-100 rounded-xs shadow-lg 
              transition-all duration-300 hidden group-hover:block space-y-4 text-md font-bold border 
              border-neutral-200  pt-2'>
                <li className='text-black font-normal hover:underline underline-offset-1 pl-2'>
                  <Link to="/PCM">Public Campus Ministries</Link>
                </li>
              </ul>
              </li>
      
              <li className='relative z-50 group'>
              <div className='flex items-center my-10 xl:text-lg lg:text-[1rem] font-georgia font-normal cursor-pointer'>
                Music
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='h-4 w-4'>
                <path d="M6 9l6 6 6-6" fill="none" stroke="black" strokeWidth="2" />
                </svg>
              </div>
              <ul className='absolute left-0 ml-0 -mt-6 lg:w-44 xl:w-52 h-40 bg-neutral-100 rounded-xs shadow-lg 
              transition-all duration-300 hidden group-hover:block space-y-4 text-md font-bold border 
              border-neutral-200 pt-2'>
                <li className='text-black font-normal hover:underline underline-offset-1 pl-2'>
                  <Link to='/Churchchoir'>Church choir</Link>
                </li>
      
                <li className='text-black font-normal hover:underline underline-offset-1 pl-2'>
                  <Link to="/DCM">DCM</Link>
                </li>
      
                <li className='text-black font-normal hover:underline underline-offset-1 pl-2'>
                  <Link to='/Blissful'>Blissful</Link>
                </li>
      
              </ul>
              </li>
      
              <li className='relative z-50 group'>
              <div className='flex items-center my-10 xl:text-lg lg:text-[1rem] font-georgia font-normal cursor-pointer'>
                Resources
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='h-4 w-4'>
                <path d="M6 9l6 6 6-6" fill="none" stroke="black" strokeWidth="2" />
                </svg>
              </div>
      
              <ul className='absolute left-0 ml-0 -mt-6 lg:w-44 xl:w-52 h-40 bg-neutral-100 rounded-xs shadow-lg 
              transition-all duration-300 hidden group-hover:block space-y-4 text-md font-bold border 
              border-neutral-200 pt-2'>
                <li className='text-black font-normal hover:underline underline-offset-1 pl-2'>
                  <Link to="/COE">COE</Link>
                </li>
      
                <li className='text-black font-normal hover:underline underline-offset-1 pl-2'>
                  <Link to='/Sermons'>Sermons</Link>
                </li>
      
                <li className='text-black font-normal hover:underline underline-offset-1 pl-2'>
                  <Link to='/Books'>Books and resources</Link>
                </li>
      
              </ul>
              </li>
      
              <li className='relative z-50 group'>
              <div className='flex items-center my-10 xl:text-lg lg:text-[1rem] font-georgia font-normal cursor-pointer'>More
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='h-4 w-4'>
                <path d="M6 9l6 6 6-6" fill="none" stroke="black" strokeWidth="2" />
                </svg>
              </div>
      
              <ul className='absolute  -mt-6 lg:w-44 xl:w-52 h-40 bg-neutral-100 rounded-xs shadow-lg transition-all 
                duration-300 hidden group-hover:block space-y-4 text-md font-bold border border-neutral-200 
                left-0 ml-0 pt-2'>
                <li className='text-black font-normal hover:underline underline-offset-1 pl-2'>
                  <Link to='/Announcements'>Announcements</Link>
                </li>
      
              </ul>
              </li>
            
          </ul>
        </div>
      </nav>
    </>
  );
};
export default Header;