import { Link } from 'react-router-dom';
import Sdachurchlogo from '../../assets/Sdachurchlogo.jpg';

export const Header = () => {
    return (
        <>
            {/* Header Bar */}
            <div className="flex items-center h-16 shadow-lg bg-gradient-to-r from-yellow-400 via-red-500 to-green-900">
                <img src={Sdachurchlogo} alt="SDA Church logo" className="w-12 h-12 ml-8 border-2 border-white rounded-full shadow-md" />
                <p className="ml-6 text-2xl font-extrabold text-transparent bg-gradient-to-r from-yellow-600 via-red-600 to-green-900 bg-clip-text drop-shadow-lg">
                    Dedan Kimathi University SDA Church
                </p>
            </div>
            {/* Navigation */}
            <nav className="bg-white shadow">
                <ul className="flex items-center justify-center py-4 space-x-8 font-sans font-bold text-md">
                    <li>
                        <Link to="/" className="transition hover:text-yellow-600">HOME</Link>
                    </li>
                    <li className="relative group">
                        <span className="flex items-center cursor-pointer hover:text-yellow-600">ABOUT US
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 ml-1"><path d="M6 9l6 6 6-6" fill="none" stroke="black" strokeWidth="2" /></svg>
                        </span>
                        <ul className="absolute left-0 z-10 hidden w-56 mt-2 bg-white border rounded shadow-lg group-hover:block border-neutral-200">
                            <li><Link to="/Aboutdekusda" className="block px-4 py-2 hover:bg-yellow-100">About DeKUSDA</Link></li>
                            <li><Link to="/Aboutsda" className="block px-4 py-2 hover:bg-yellow-100">About SDA church</Link></li>
                            <li className="relative group">
                                <span className="flex items-center px-4 py-2 cursor-pointer hover:bg-yellow-100">Leadership
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                </span>
                                <ul className="absolute top-0 z-20 hidden w-56 mt-0 bg-white border rounded shadow-lg left-full group-hover:block border-neutral-200">
                                    <li><Link to='/Leaders2024' className='block px-4 py-2 hover:bg-yellow-100'>Church leaders 2024/2025</Link></li>
                                    <li><Link to='/Leaders2023' className='block px-4 py-2 hover:bg-yellow-100'>Church leaders 2023/2024</Link></li>
                                    <li><Link to='/Leaders2022' className='block px-4 py-2 hover:bg-yellow-100'>Church leaders 2022/2023</Link></li>
                                </ul>
                            </li>
                            <li><Link to="/Pastormessage" className="block px-4 py-2 hover:bg-yellow-100">Message from pastor/patron</Link></li>
                            <li><Link to="/Eldermessage" className="block px-4 py-2 hover:bg-yellow-100">Head elder's message</Link></li>
                        </ul>
                    </li>
                    <li className="relative group">
                        <span className="flex items-center cursor-pointer hover:text-yellow-600">MINISTRIES/DEPARTMENT
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 ml-1"><path d="M6 9l6 6 6-6" fill="none" stroke="black" strokeWidth="2" /></svg>
                        </span>
                        <ul className="absolute left-0 z-10 hidden w-56 mt-2 bg-white border rounded shadow-lg group-hover:block border-neutral-200">
                            <li><Link to="/Personalministries" className="block px-4 py-2 hover:bg-yellow-100">Personal ministries</Link></li>
                        </ul>
                    </li>
                    <li className="relative group">
                        <span className="flex items-center cursor-pointer hover:text-yellow-600">EVANGELISM
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 ml-1"><path d="M6 9l6 6 6-6" fill="none" stroke="black" strokeWidth="2" /></svg>
                        </span>
                        <ul className="absolute left-0 z-10 hidden w-56 mt-2 bg-white border rounded shadow-lg group-hover:block border-neutral-200">
                            <li><Link to="/PCM" className="block px-4 py-2 hover:bg-yellow-100">Public Campus Ministries</Link></li>
                        </ul>
                    </li>
                    <li className="relative group">
                        <span className="flex items-center cursor-pointer hover:text-yellow-600">MUSIC
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 ml-1"><path d="M6 9l6 6 6-6" fill="none" stroke="black" strokeWidth="2" /></svg>
                        </span>
                        <ul className="absolute left-0 z-10 hidden w-56 mt-2 bg-white border rounded shadow-lg group-hover:block border-neutral-200">
                            <li><Link to='/Churchchoir' className='block px-4 py-2 hover:bg-yellow-100'>Church choir</Link></li>
                            <li><Link to="/DCM" className='block px-4 py-2 hover:bg-yellow-100'>DCM</Link></li>
                            <li><Link to='/Blissful' className='block px-4 py-2 hover:bg-yellow-100'>Blissful</Link></li>
                        </ul>
                    </li>
                    <li className="relative group">
                        <span className="flex items-center cursor-pointer hover:text-yellow-600">RESOURCES
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 ml-1"><path d="M6 9l6 6 6-6" fill="none" stroke="black" strokeWidth="2" /></svg>
                        </span>
                        <ul className="absolute left-0 z-10 hidden w-56 mt-2 bg-white border rounded shadow-lg group-hover:block border-neutral-200">
                            <li><Link to="/COE" className="block px-4 py-2 hover:bg-yellow-100">COE</Link></li>
                            <li><Link to='/Sermons' className='block px-4 py-2 hover:bg-yellow-100'>Sermons</Link></li>
                            <li><Link to='/Books' className='block px-4 py-2 hover:bg-yellow-100'>Books and resources</Link></li>
                        </ul>
                    </li>
                    <li className="relative group">
                        <span className="flex items-center cursor-pointer hover:text-yellow-600">MORE
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 ml-1"><path d="M6 9l6 6 6-6" fill="none" stroke="black" strokeWidth="2" /></svg>
                        </span>
                        <ul className="absolute left-0 z-10 hidden w-56 mt-2 bg-white border rounded shadow-lg group-hover:block border-neutral-200">
                            <li><Link to='/Announcements' className='block px-4 py-2 hover:bg-yellow-100'>Announcements</Link></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </>
    );
};