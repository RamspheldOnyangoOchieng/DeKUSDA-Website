import {Link} from 'react-router-dom';
import Sdachurchlogo from '../assets/Sdachurchlogo.jpg';

export const Header = () => {
    return(
        <>
         <div className=' bg-blue-900 h-14 -mt-6 flex items-center'>
            <p className='mt-5 ml-20 bg-gradient-to-r from-blue-300 to-red-300 text-transparent bg-clip-text'>Dedan Kimathi University SDA Church</p>
            </div>
        
            <nav>
        
              <div className=''>
              <ul className='text-sm font-bold text-red-500 font-sans space-x-8 flex'>
                <li className='my-10 ml-80'>
                  <Link to="/" >HOME</Link>
                </li>
        
                <li className='relative group/leadership cursor-pointer'>
                  <div className='flex items-center my-10'>ABOUT US
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='h-4 w-4'>
                    <path d="M6 9l6 6 6-6" fill="none" stroke="black" strokeWidth="2" />
                    </svg>
                  </div>
        
                   <ul className='absolute left-0 -mt-4 w-52 h-52 bg-neutral-100 rounded-xs shadow-lg transition-all 
                      duration-300 hidden group-hover/leadership:flex flex-col space-y-4 text-md font-bold border border-neutral-200'>
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
                      xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M9 5l7 7-7 7"></path>
                    </svg>
                    </div>
        
                    <ul className='absolute left-0 -mt-10 w-52 h-40 bg-neutral-100 rounded-xs shadow-lg transition-all 
                      duration-300 hidden group-hover:block space-y-4 text-md font-bold border border-neutral-200 ml-52
                      pt-4 pl-2'>
        
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
        
                <li className='relative group'>
                <div className='flex items-center justify-center my-10'>MINISTRIES/DEPARTMENT
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='h-4 w-4'>
                  <path d="M6 9l6 6 6-6" fill="none" stroke="black" strokeWidth="2" />
                  </svg>
                </div>
        
                <ul className='absolute left-0 -mt-6 w-52 h-40 bg-neutral-100 rounded-xs shadow-lg transition-all 
                duration-300 hidden group-hover:block space-y-4 text-md font-bold border border-neutral-200 ml-0 pt-2'>
                  <li className='text-black font-normal hover:underline underline-offset-1 pl-2'>
                    <Link to="/Personalministries">Personal ministries</Link>
                  </li>
                </ul>
                </li>
        
                <li className='relative group'>
                <div className='flex items-center my-10'>EVANGELISM
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='h-4 w-4'>
                  <path d="M6 9l6 6 6-6" fill="none" stroke="black" strokeWidth="2" />
                  </svg>
                </div>
        
                <ul className='absolute left-0 -mt-6 w-52 h-40 bg-neutral-100 rounded-xs shadow-lg transition-all 
                  duration-300 hidden group-hover:block space-y-4 text-md font-bold border border-neutral-200 ml-0 pt-2'>
                  <li className='text-black font-normal hover:underline underline-offset-1 pl-2'>
                    <Link to="/PCM">Public Campus Ministries</Link>
                  </li>
                </ul>
                </li>
        
                <li className='relative group'>
                <div className='flex items-center my-10'>MUSIC
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='h-4 w-4'>
                  <path d="M6 9l6 6 6-6" fill="none" stroke="black" strokeWidth="2" />
                  </svg>
                </div>
                <ul className='absolute left-0 -mt-6 w-52 h-40 bg-neutral-100 rounded-xs shadow-lg transition-all 
                  duration-300 hidden group-hover:block space-y-4 text-md font-bold border border-neutral-200 ml-0 pt-2'>
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
        
                <li className='relative group'>
                <div className='flex items-center my-10'>RESOURCES
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='h-4 w-4'>
                  <path d="M6 9l6 6 6-6" fill="none" stroke="black" strokeWidth="2" />
                  </svg>
                </div>
        
                <ul className='absolute left-0 -mt-6 w-52 h-40 bg-neutral-100 rounded-xs shadow-lg transition-all 
                  duration-300 hidden group-hover:block space-y-4 text-md font-bold border border-neutral-200 ml-0 pt-2'>
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
        
                <li className='relative group'>
                <div className='flex items-center my-10'>MORE
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='h-4 w-4'>
                  <path d="M6 9l6 6 6-6" fill="none" stroke="black" strokeWidth="2" />
                  </svg>
                </div>
        
                <ul className='absolute left-0 -mt-6 w-52 h-40 bg-neutral-100 rounded-xs shadow-lg transition-all 
                  duration-300 hidden group-hover:block space-y-4 text-md font-bold border border-neutral-200 ml-0 pt-2'>
                  <li className='text-black font-normal hover:underline underline-offset-1 pl-2'>
                    <Link to='/Announcements'>Announcements</Link>
                  </li>
        
                </ul>
                </li>
        
                <img src={Sdachurchlogo} alt="sda Church logo" className='h-20 w-20 mt-4'/>
        
              </ul>
              
              </div>
            </nav>
        </>
    );
}