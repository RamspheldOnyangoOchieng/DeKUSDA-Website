import { useRef } from "react";
import {
    AiFillFacebook,
    AiFillInstagram,
    AiFillYoutube,
    AiOutlineArrowRight,
    AiOutlineCalendar,
    AiOutlineCheckCircle,
    AiOutlineClockCircle,
    AiOutlineDownload,
    AiOutlineHeart,
    AiOutlineInfoCircle,
    AiOutlineMail,
    AiOutlinePlayCircle,
    AiOutlineTeam,
    AiOutlineUser,
} from 'react-icons/ai';
import { FiBookOpen, FiHeart, FiMusic, FiUsers } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Bereans from '../assets/Bereans.jpg';
import Collettes from '../assets/Collettes.jpg';
import Dekusdamain from '../assets/Dekusdamain.jpg';
import Fofanas from '../assets/Fofanas.jpg';
import Pilgrims from '../assets/Pilgrims.jpg';

import Dekusda3 from '../assets/Dekusda3.jpg';
import { Footer } from '../components/Layout/Footer';
import { Header } from '../components/Layout/Header';
import { Sidebar } from '../components/Layout/Sidebar';

export const Home = () => {
    const slides = [
        {
            image: Dekusdamain,
            title: "Welcome to DEKUSDA",
            subtitle: "A Christ-centered Family on Campus",
            cta: "Join Us This Sabbath",
            ctaLink: "/Aboutdekusda"
        },
        {
            image: Collettes,
            title: "AY Sabbath Explosion",
            subtitle: "Every 2nd Sabbath – Joyful Youth Service",
            cta: "Explore AY Events",
            ctaLink: "/Music/ChurchChoir"
        },
        {
            image: Bereans,
            title: "Grow in Grace & Truth",
            subtitle: "Join our Bible Study Fellowships Weekly",
            cta: "Join a Bible Group",
            ctaLink: "/Ministries/PersonalMinistries"
        },
        {
            image: Pilgrims,
            title: "Pathfinders: Building Christian Leaders",
            subtitle: "For Teens & Youth – Sundays @ 2PM",
            cta: "Sign Up Now",
            ctaLink: "/Evangelism/PCM"
        },
        {
            image: Fofanas,
            title: "Christ Our Foundation",
            subtitle: "1 Corinthians 3:11",
            cta: "Read More",
            ctaLink: "/About/AboutSDA"
        }
    ];

    // Refs for navigation buttons
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <>
            <div className='flex'>
                <div className='w-[85%]'>
                    <Header />
                    
                                        {/* Enhanced Hero Slider Section */}
                    <div className="relative -mt-2 overflow-hidden">
                        <Swiper
                            modules={[Autoplay, Navigation]}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            loop
                            onSwiper={(swiper) => {
                                // Link buttons after DOM is ready
                                setTimeout(() => {
                                    if (
                                        prevRef.current &&
                                        nextRef.current &&
                                        swiper.params?.navigation
                                    ) {
                                        swiper.params.navigation.prevEl = prevRef.current;
                                        swiper.params.navigation.nextEl = nextRef.current;
                                        swiper.navigation.destroy();
                                        swiper.navigation.init();
                                        swiper.navigation.update();
                                    }
                                }, 0);
                            }}
                            className=" xs:w-full sm: md: lg: xl:w-full xl:h-svh"
                        >
                            {slides.map((slide, index) => (
                                <SwiperSlide key={index}>
                                    <div className="relative w-full h-full">
                                        {/* Background Image */}
                                    <img
                                            src={slide.image}
                                        alt={`Slide ${index + 1}`}
                                        className="object-contain w-full h-auto transition-all duration-75 sm:h-auto sm:object-cover md:h-auto lg:h-svh xl:h-svh"
                                    />
                                        
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-darkBlue/80 via-darkBlue/40 to-transparent"></div>
                                        
                                        {/* Text Overlay */}
                                        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
                                            <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl text-shadow-lg">
                                                {slide.title}
                                            </h1>
                                            <p className="max-w-2xl mb-8 text-lg md:text-xl lg:text-2xl text-shadow-md">
                                                {slide.subtitle}
                                            </p>
                                            <button 
                                                className="px-8 py-3 font-bold text-white transition-all duration-300 transform rounded-full shadow-lg bg-gradient-to-r from-primaryBlue to-darkBlue hover:from-darkBlue hover:to-primaryBlue hover:scale-105 hover:shadow-xl animate-pulse"
                                                onClick={() => window.location.href = slide.ctaLink}
                                            >
                                                {slide.cta}
                                            </button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Enhanced Navigation Buttons */}
                        <button
                            ref={prevRef}
                            className="absolute z-10 p-3 text-white transition-all duration-300 transform -translate-y-1/2 rounded-full top-1/2 left-4 bg-darkBlue/60 hover:bg-darkBlue/80 hover:scale-110 backdrop-blur-sm"
                        >
                        </button>
                        <button
                            ref={nextRef}
                            className="absolute z-10 p-3 text-white transition-all duration-300 transform -translate-y-1/2 rounded-full top-1/2 right-4 bg-darkBlue/60 hover:bg-darkBlue/80 hover:scale-110 backdrop-blur-sm"
                        >
                        </button>
                    </div>

                    {/* Section 2: About Us Snapshot */}
                    <div className="w-full bg-gradient-to-b from-lightBlue to-primaryBlue">
                        <div className="max-w-6xl mx-auto">
                            {/* Section Title & Verse */}
                            <div className="mb-12 text-center">
                                <div className="flex items-center justify-center mb-4">
                                    <AiOutlineCheckCircle className="w-8 h-8 mr-3 text-primaryBlue" />
                                    <h2 className="text-4xl font-bold text-darkBlue">
                                        Who We Are – A Christ-Centered Family at DeKUT
                                    </h2>
                                </div>
                                <p className="text-xl italic text-softGray">
                                    "You are the light of the world. A city on a hill cannot be hidden." – Matthew 5:14
                                </p>
                            </div>

                            {/* Main Content */}
                            <div className="grid items-center gap-12 lg:grid-cols-2">
                                {/* Text Content */}
                                <div className="space-y-6">
                                    <p className="text-lg leading-relaxed text-softGray">
                                        <span className="font-bold text-darkBlue">DEKUSDA (Dedan Kimathi University Seventh-day Adventist Church)</span> is a vibrant, student-led church located in the heart of Dedan Kimathi University. We are more than just a place of worship—we are a family rooted in Christ, driven by mission, and empowered by love.
                                    </p>
                                    
                                    <p className="text-lg leading-relaxed text-softGray">
                                        We exist to nurture spiritual growth, foster godly friendships, and equip students to be strong ambassadors for Christ both on and off-campus. From weekly worship services, engaging Bible studies, music ministries, and community outreach—we believe in holistic spiritual transformation.
                                    </p>
                                    
                                    <p className="text-lg leading-relaxed text-softGray">
                                        Everyone is welcome at DEKUSDA: students, staff, alumni, and the surrounding community. Join us as we journey together toward eternity, walking in truth, love, and the light of the everlasting Gospel.
                                    </p>

                                    {/* Quick Statistics */}
                                    <div className="grid grid-cols-2 gap-6 mt-8 md:grid-cols-4">
                                        <div className="text-center">
                                            <div className="mb-2 text-3xl font-bold text-primaryBlue">350+</div>
                                            <div className="text-sm text-softGray">Active Members</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="mb-2 text-3xl font-bold text-primaryBlue">8</div>
                                            <div className="text-sm text-softGray">Bible Study Groups</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="mb-2 text-3xl font-bold text-primaryBlue">4</div>
                                            <div className="text-sm text-softGray">Choir Groups</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="mb-2 text-3xl font-bold text-primaryBlue">47</div>
                                            <div className="text-sm text-softGray">Baptisms (2024)</div>
                                        </div>
                                    </div>

                                    {/* Call to Action */}
                                    <div className="mt-8">
                                        <button 
                                            className="px-8 py-3 font-semibold text-white transition-all duration-300 transform rounded-lg shadow-lg bg-primaryBlue hover:bg-darkBlue hover:scale-105"
                                            onClick={() => window.location.href = '/Aboutdekusda'}
                                        >
                                            Learn More About Our Church
                                        </button>
                                    </div>
                                </div>

                                {/* Image */}
                                <div className="flex justify-center">
                                    <div className="relative">
                                        <img 
                                            src={Dekusda3} 
                                            alt="DEKUSDA Church Family" 
                                            className="object-cover border-4 border-white rounded-full shadow-2xl w-80 h-80"
                                        />
                                        <div className="absolute px-4 py-2 text-sm font-bold text-white rounded-full -bottom-4 -right-4 bg-primaryBlue">
                                            Join Our Family
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Weekly Schedule Snapshot */}
                    <div className="w-full bg-gradient-to-b from-lightBlue to-primaryBlue">
                        <div className="max-w-6xl mx-auto">
                            {/* Section Title & Tagline */}
                            <div className="mb-12 text-center">
                                <div className="flex items-center justify-center mb-4">
                                    <AiOutlineCalendar className="w-8 h-8 mr-3 text-primaryBlue" />
                                    <h2 className="text-4xl font-bold text-gray-800">
                                        Our Weekly Worship & Fellowship Schedule
                                    </h2>
                                </div>
                                <p className="text-xl text-gray-600">
                                    "Consistent fellowship is key to spiritual growth. Come join us."
                                </p>
                            </div>

                            {/* Notification Banner */}
                            <div className="p-4 mb-8 border-l-4 rounded-r-lg bg-lightBlue border-primaryBlue">
                                <div className="flex items-center">
                                    <AiOutlineInfoCircle className="w-6 h-6 mr-3 text-primaryBlue" />
                                    <p className="font-medium text-darkBlue">
                                        This week's AY will be hosted by the PCM department!
                                    </p>
                                </div>
                            </div>

                            {/* Weekly Schedule Cards */}
                            <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
                                {/* Monday */}
                                <div className="p-6 transition-all duration-300 transform border-l-4 border-blue-500 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-xl hover:scale-105">
                                    <div className="flex items-center mb-4">
                                        <div className="flex items-center justify-center w-10 h-10 mr-3 font-bold text-white bg-blue-500 rounded-full">
                                            M
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800">Monday</h3>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <div className="flex items-center gap-2 font-semibold text-gray-800">
                                                <FiBookOpen className="text-primaryBlue" /> Bible Study & Prayer Meeting
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <AiOutlineClockCircle className="text-primaryBlue" /> 7:00 PM – 8:30 PM
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <HiOutlineLocationMarker className="text-primaryBlue" /> Church Hall 2
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Wednesday */}
                                <div className="p-6 transition-all duration-300 transform border-l-4 shadow-lg bg-gradient-to-br from-lightBlue to-white rounded-xl hover:shadow-xl hover:scale-105 border-primaryBlue">
                                    <div className="flex items-center mb-4">
                                        <div className="flex items-center justify-center w-10 h-10 mr-3 font-bold text-white rounded-full bg-primaryBlue">
                                            W
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800">Wednesday</h3>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <div className="flex items-center gap-2 font-semibold text-gray-800">
                                                <FiUsers className="text-primaryBlue" /> Midweek Fellowship
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <AiOutlineClockCircle className="text-primaryBlue" /> 6:30 PM – 8:00 PM
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <HiOutlineLocationMarker className="text-primaryBlue" /> Church Lawn
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Friday */}
                                <div className="p-6 transition-all duration-300 transform border-l-4 shadow-lg bg-gradient-to-br from-lightBlue to-white rounded-xl hover:shadow-xl hover:scale-105 border-primaryBlue">
                                    <div className="flex items-center mb-4">
                                        <div className="flex items-center justify-center w-10 h-10 mr-3 font-bold text-white rounded-full bg-primaryBlue">
                                            F
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800">Friday</h3>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <div className="flex items-center gap-2 font-semibold text-gray-800">
                                                <FiHeart className="text-primaryBlue" /> Vespers / Sundown Worship
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <AiOutlineClockCircle className="text-primaryBlue" /> 6:30 PM – 8:00 PM
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <HiOutlineLocationMarker className="text-primaryBlue" /> Main Sanctuary
                                            </div>
                                            <p className="text-xs italic text-gray-500">A peaceful sundown worship to welcome the Sabbath.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Saturday - Sabbath School */}
                                <div className="p-6 transition-all duration-300 transform border-l-4 shadow-lg bg-gradient-to-br from-lightBlue to-white rounded-xl hover:shadow-xl hover:scale-105 border-primaryBlue">
                                    <div className="flex items-center mb-4">
                                        <div className="flex items-center justify-center w-10 h-10 mr-3 font-bold text-white rounded-full bg-primaryBlue">
                                            S
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800">Saturday</h3>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <div className="flex items-center gap-2 font-semibold text-gray-800">
                                                <FiBookOpen className="text-primaryBlue" /> Sabbath School
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <AiOutlineClockCircle className="text-primaryBlue" /> 8:30 AM – 10:00 AM
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <HiOutlineLocationMarker className="text-primaryBlue" /> Main Sanctuary
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 font-semibold text-gray-800">
                                                <AiOutlineTeam className="text-primaryBlue" /> Divine Service
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <AiOutlineClockCircle className="text-primaryBlue" /> 10:30 AM – 12:30 PM
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <HiOutlineLocationMarker className="text-primaryBlue" /> Main Sanctuary
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 font-semibold text-gray-800">
                                                <FiMusic className="text-primaryBlue" /> Afternoon AY Program
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <AiOutlineClockCircle className="text-primaryBlue" /> 2:00 PM – 5:00 PM
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <HiOutlineLocationMarker className="text-primaryBlue" /> Church Grounds
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Sunday */}
                                <div className="p-6 transition-all duration-300 transform border-l-4 shadow-lg bg-gradient-to-br from-lightBlue to-white rounded-xl hover:shadow-xl hover:scale-105 border-primaryBlue">
                                    <div className="flex items-center mb-4">
                                        <div className="flex items-center justify-center w-10 h-10 mr-3 font-bold text-white rounded-full bg-primaryBlue">
                                            S
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800">Sunday</h3>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <div className="flex items-center gap-2 font-semibold text-gray-800">
                                                <FiMusic className="text-primaryBlue" /> Music Practice & Outreach
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <AiOutlineClockCircle className="text-primaryBlue" /> 9:00 AM – 1:00 PM
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <HiOutlineLocationMarker className="text-primaryBlue" /> Choir Room / Field
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Countdown Timer Card */}
                                <div className="p-6 border-l-4 shadow-lg bg-gradient-to-br from-lightBlue to-white rounded-xl border-primaryBlue">
                                    <div className="flex items-center mb-4">
                                        <AiOutlineCalendar className="w-8 h-8 mr-3 text-primaryBlue" />
                                        <h3 className="text-xl font-bold text-gray-800">Next Program</h3>
                                    </div>
                                    <div className="text-center">
                                        <p className="mb-2 text-2xl font-bold text-primaryBlue">Friday Vespers</p>
                                        <p className="text-lg text-gray-600">in 3h 24m</p>
                                        <button className="px-4 py-2 mt-4 text-sm font-medium text-white transition-colors rounded-lg bg-primaryBlue hover:bg-darkBlue">
                                            Add to Calendar
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Download Schedule Link */}
                            <div className="text-center">
                                <a 
                                    href="/assets/schedule.pdf" 
                                    target="_blank" 
                                    className="inline-flex items-center font-medium underline transition-colors text-primaryBlue hover:text-darkBlue"
                                >
                                    <AiOutlineDownload className="w-5 h-5 mr-2" />
                                    📥 Download Full Semester Schedule (PDF)
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Featured Ministries */}
                    <div className="w-full bg-gradient-to-b from-lightBlue to-primaryBlue">
                        <div className="max-w-6xl mx-auto">
                            {/* Women's Ministries */}
                            <div className="p-6 transition-all duration-300 bg-white border-l-4 shadow-lg rounded-xl hover:scale-105 border-primaryBlue">
                                <div className="mb-4 text-4xl text-primaryBlue">{/* ...icon... */}</div>
                                <h3 className="mb-3 text-xl font-bold text-gray-800">Women's Ministries</h3>
                                <p className="mb-4 leading-relaxed text-gray-600">
                                    Empowering women to grow spiritually and serve their community through Bible study, prayer groups, and outreach programs.
                                </p>
                                <a 
                                    href="/Ministries/PersonalMinistries" 
                                    className="inline-flex items-center font-medium transition-colors text-primaryBlue hover:text-darkBlue"
                                >
                                    Learn more
                                    <AiOutlineArrowRight className="w-4 h-4 ml-1" />
                                </a>
                            </div>

                            {/* Music Ministry */}
                            <div className="p-6 transition-all duration-300 bg-white border-l-4 shadow-lg rounded-xl hover:scale-105 border-primaryBlue">
                                <div className="mb-4 text-4xl text-primaryBlue">🎵</div>
                                <h3 className="mb-3 text-xl font-bold text-gray-800">Music Ministry</h3>
                                <p className="mb-4 leading-relaxed text-gray-600">
                                    Bringing the Word to life through praise and worship. Multiple choirs and musical groups serving in various capacities.
                                </p>
                                <a 
                                    href="/Music/ChurchChoir" 
                                    className="inline-flex items-center font-medium transition-colors text-primaryBlue hover:text-darkBlue"
                                >
                                    Learn more
                                    <AiOutlineArrowRight className="w-4 h-4 ml-1" />
                                </a>
                            </div>

                            {/* PCM */}
                            <div className="p-6 transition-all duration-300 bg-white border-l-4 shadow-lg rounded-xl hover:scale-105 border-primaryBlue">
                                <div className="mb-4 text-4xl text-primaryBlue">🏫</div>
                                <h3 className="mb-3 text-xl font-bold text-gray-800">PCM (Public Campus Ministry)</h3>
                                <p className="mb-4 leading-relaxed text-gray-600">
                                    Connecting Adventist students on campus through spiritual and social events. Building community and sharing faith in the university environment.
                                </p>
                                <a 
                                    href="/Evangelism/PCM" 
                                    className="inline-flex items-center font-medium transition-colors text-primaryBlue hover:text-darkBlue"
                                >
                                    Learn more
                                    <AiOutlineArrowRight className="w-4 h-4 ml-1" />
                                </a>
                            </div>

                            {/* Sabbath School */}
                            <div className="p-6 transition-all duration-300 bg-white border-l-4 shadow-lg rounded-xl hover:scale-105 border-primaryBlue">
                                <div className="mb-4 text-4xl text-primaryBlue">📖</div>
                                <h3 className="mb-3 text-xl font-bold text-gray-800">Sabbath School</h3>
                                <p className="mb-4 leading-relaxed text-gray-600">
                                    Bible study sessions and interactive lessons every Saturday morning. Deep dive into God's Word with fellow believers.
                                </p>
                                <a 
                                    href="/Resources/COE" 
                                    className="inline-flex items-center font-medium transition-colors text-primaryBlue hover:text-darkBlue"
                                >
                                    Learn more
                                    <AiOutlineArrowRight className="w-4 h-4 ml-1" />
                                </a>
                            </div>

                            {/* Children's Ministry */}
                            <div className="p-6 transition-all duration-300 bg-white border-l-4 shadow-lg rounded-xl hover:scale-105 border-primaryBlue">
                                <div className="mb-4 text-4xl text-primaryBlue">👶</div>
                                <h3 className="mb-3 text-xl font-bold text-gray-800">Children's Ministry</h3>
                                <p className="mb-4 leading-relaxed text-gray-600">
                                    Building faith foundations for kids aged 2–12 through stories, activities, and age-appropriate Bible lessons.
                                </p>
                                <a 
                                    href="/Ministries/PersonalMinistries" 
                                    className="inline-flex items-center font-medium transition-colors text-primaryBlue hover:text-darkBlue"
                                >
                                    Learn more
                                    <AiOutlineArrowRight className="w-4 h-4 ml-1" />
                                </a>
                            </div>

                            {/* Communication & Media */}
                            <div className="p-6 transition-all duration-300 bg-white border-l-4 shadow-lg rounded-xl hover:scale-105 border-primaryBlue">
                                <div className="mb-4 text-4xl text-primaryBlue">📱</div>
                                <h3 className="mb-3 text-xl font-bold text-gray-800">Communication & Media</h3>
                                <p className="mb-4 leading-relaxed text-gray-600">
                                    Manages livestreaming, social content, and church announcements. Keeping our community connected through technology.
                                </p>
                                <a 
                                    href="/More/Announcements" 
                                    className="inline-flex items-center font-medium transition-colors text-primaryBlue hover:text-darkBlue"
                                >
                                    Learn more
                                    <AiOutlineArrowRight className="w-4 h-4 ml-1" />
                                </a>
                            </div>

                            {/* Health & Temperance */}
                            <div className="p-6 transition-all duration-300 bg-white border-l-4 shadow-lg rounded-xl hover:scale-105 border-primaryBlue">
                                <div className="mb-4 text-4xl text-primaryBlue">🏥</div>
                                <h3 className="mb-3 text-xl font-bold text-gray-800">Health & Temperance</h3>
                                <p className="mb-4 leading-relaxed text-gray-600">
                                    Promoting a healthy Adventist lifestyle via seminars, health fairs, and wellness programs for the whole person.
                                </p>
                                <a 
                                    href="/Resources/Books" 
                                    className="inline-flex items-center font-medium transition-colors text-primaryBlue hover:text-darkBlue"
                                >
                                    Learn more
                                    <AiOutlineArrowRight className="w-4 h-4 ml-1" />
                                </a>
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="mt-12 text-center">
                            <p className="mb-4 text-lg text-softGray">
                                Ready to get involved? Find your ministry and start serving today!
                            </p>
                            <button 
                                className="px-8 py-3 font-semibold text-white transition-all duration-300 transform rounded-lg shadow-lg bg-primaryBlue hover:bg-darkBlue hover:scale-105"
                                onClick={() => window.location.href = '/Ministries/PersonalMinistries'}
                            >
                                Join a Ministry Today
                            </button>
                        </div>
                    </div>

                    {/* Section 5: Pastor's Message */}
                    <div className="px-6 py-16 bg-white lg:px-24">
                        <div className="max-w-5xl mx-auto">
                            {/* Section Title & Subtitle */}
                            <div className="mb-12 text-center">
                                <div className="flex items-center justify-center mb-4">
                                    <AiOutlineUser className="w-8 h-8 mr-3 text-primaryBlue" />
                                    <h2 className="text-4xl font-bold text-gray-800">
                                        A Message from Our Chaplain
                                    </h2>
                                </div>
                                <p className="max-w-3xl mx-auto text-xl text-gray-600">
                                    "Welcome to DeKUT SDA Church – A place to grow in faith, serve with purpose, and experience God's presence daily."
                                </p>
                            </div>

                            {/* Main Content */}
                            <div className="grid items-center gap-12 lg:grid-cols-2">
                                {/* Pastor's Image */}
                                <div className="flex justify-center lg:justify-start">
                                    <div className="relative">
                                        <img 
                                            src="/images/pastor-frank.jpg" 
                                            alt="Chaplain Frank Maina" 
                                            className="object-cover w-64 h-64 border-4 rounded-full shadow-2xl border-lightBlue"
                                        />
                                        <div className="absolute px-4 py-2 text-sm font-bold text-white rounded-full -bottom-2 -right-2 bg-primaryBlue">
                                            Chaplain
                                        </div>
                                    </div>
                                </div>

                                {/* Message Content */}
                                <div className="space-y-6">
                                    <div className="p-8 border-l-4 bg-gradient-to-r from-lightBlue to-white rounded-xl border-primaryBlue">
                                        <p className="mb-4 text-lg leading-relaxed text-gray-700">
                                            Dear Church Family and Friends,
                                        </p>
                                        
                                        <p className="mb-4 text-lg leading-relaxed text-gray-700">
                                            I warmly welcome you to our <span className="font-semibold text-primaryBlue">Dedan Kimathi University of Technology SDA Church</span> family. As a vibrant spiritual hub within a technical university, our mission is to provide a place where you can not only pursue academic excellence but also deepen your walk with Christ.
                                        </p>
                                        
                                        <p className="mb-4 text-lg leading-relaxed text-gray-700">
                                            We are committed to nurturing holistic growth through prayer, worship, study, and service. Whether you are a freshman seeking direction, a senior preparing to transition into the workforce, or a guest exploring faith, this is a place for you.
                                        </p>
                                        
                                        <p className="mb-6 text-lg leading-relaxed text-gray-700">
                                            Join us every Sabbath, midweek, and in our many campus fellowships. I believe God has a purpose for your life — and we're here to walk that journey with you.
                                        </p>
                                        
                                        <div className="pt-4 border-t border-lightBlue">
                                            <p className="mb-2 text-lg text-gray-700">
                                                May God bless you abundantly.
                                            </p>
                                            <p className="italic text-gray-600">
                                                In Christ's Service,<br />
                                                <span className="font-semibold text-primaryBlue">Chaplain Frank Maina</span><br />
                                                DeKUT SDA Church
                                            </p>
                                        </div>
                                    </div>

                                    {/* Call to Action */}
                                    <div className="flex flex-col gap-4 sm:flex-row">
                                        <button 
                                            className="px-6 py-3 font-semibold text-white transition-all duration-300 transform rounded-lg shadow-lg bg-primaryBlue hover:bg-darkBlue hover:scale-105"
                                            onClick={() => window.location.href = '/Pastormessage'}
                                        >
                                            Read Full Message
                                        </button>
                                        <button 
                                            className="px-6 py-3 font-semibold transition-all duration-300 bg-transparent border-2 rounded-lg border-primaryBlue text-primaryBlue hover:bg-primaryBlue hover:text-white"
                                            onClick={() => window.location.href = '/Aboutdekusda'}
                                        >
                                            Meet Our Team
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Optional Video Section */}
                            <div className="mt-12 text-center">
                                <h3 className="mb-6 text-2xl font-bold text-gray-800">Watch Our Welcome Message</h3>
                                <div className="max-w-2xl mx-auto">
                                    <div className="relative w-full h-64 overflow-hidden bg-gray-200 rounded-lg shadow-lg">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center">
                                                <AiOutlinePlayCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                                                <p className="text-gray-600">Video coming soon...</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500">A personal greeting from our chaplain</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 6: Livestreams & Media Hub */}
                    <div className="px-6 py-16 bg-gray-900 lg:px-24">
                        <div className="max-w-6xl mx-auto">
                            {/* Section Title & Subtitle */}
                            <div className="mb-12 text-center">
                                <div className="flex items-center justify-center mb-4">
                                    <AiOutlinePlayCircle className="w-8 h-8 mr-3 text-primaryBlue" />
                                    <h2 className="text-4xl font-bold text-white">
                                        Worship Anywhere – Livestream & Media Hub
                                    </h2>
                                </div>
                                <p className="max-w-3xl mx-auto text-xl text-gray-300">
                                    "Join us live or catch up on recent sermons, music, and teachings from our vibrant university church."
                                </p>
                            </div>

                            {/* Live Stream Embed */}
                            <div className="mb-12">
                                <div className="overflow-hidden bg-black shadow-2xl rounded-xl">
                                    <div className="relative pb-[56.25%] h-0 overflow-hidden">
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                                            <div className="text-center">
                                                <AiOutlinePlayCircle className="w-16 h-16 mx-auto mb-4 text-primaryBlue" />
                                                <p className="text-lg font-semibold text-white">Live Stream</p>
                                                <p className="text-sm text-gray-400">Sabbath Service - Coming Soon</p>
                                                <button className="px-6 py-2 mt-4 font-medium text-white transition-colors rounded-lg bg-primaryBlue hover:bg-darkBlue">
                                                    Go Live
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Latest Sermons Grid */}
                            <div className="mb-12">
                                <h3 className="mb-6 text-2xl font-bold text-center text-white">Latest Sermons & Events</h3>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {/* Sermon 1 */}
                                    <div className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
                                        <div className="relative">
                                            <img 
                                                src="/images/sermon1.jpg" 
                                                alt="Sabbath Worship" 
                                                className="object-cover w-full h-48"
                                                onError={(e) => {
                                                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OWEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7imqIgU2VybW9uIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                                                }}
                                            />
                                            <div className="absolute px-2 py-1 text-xs font-bold text-white rounded top-2 right-2 bg-primaryBlue">
                                                NEW
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h4 className="mb-2 text-lg font-semibold text-primaryBlue">Sabbath Worship – July 6, 2025</h4>
                                            <p className="mb-3 text-sm text-gray-600">"Walking in Faith Through Trials" - Chaplain Frank Maina</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-500">July 6, 2025</span>
                                                <a 
                                                    href="https://youtu.be/example1" 
                                                    className="inline-flex items-center font-medium transition-colors text-primaryBlue hover:text-darkBlue"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Watch Now →
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sermon 2 */}
                                    <div className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
                                        <div className="relative">
                                            <img 
                                                src="/images/sermon2.jpg" 
                                                alt="Midweek Fellowship" 
                                                className="object-cover w-full h-48"
                                                onError={(e) => {
                                                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OWEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7imqIgU2VybW9uIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                                                }}
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h4 className="mb-2 text-lg font-semibold text-primaryBlue">Midweek Fellowship: Faith in the Fire</h4>
                                            <p className="mb-3 text-sm text-gray-600">"Overcoming Challenges with God's Grace" - Elder Brian Okari</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-500">July 3, 2025</span>
                                                <a 
                                                    href="https://youtu.be/example2" 
                                                    className="inline-flex items-center font-medium transition-colors text-primaryBlue hover:text-darkBlue"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Watch Now →
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Concert */}
                                    <div className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
                                        <div className="relative">
                                            <img 
                                                src="/images/concert.jpg" 
                                                alt="PCM Music Concert" 
                                                className="object-cover w-full h-48"
                                                onError={(e) => {
                                                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OWEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7imqIgU2VybW9uIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                                                }}
                                            />
                                            <div className="absolute px-2 py-1 text-xs font-bold text-white rounded top-2 right-2 bg-primaryBlue">
                                                MUSIC
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h4 className="mb-2 text-lg font-semibold text-primaryBlue">PCM Music Concert 2025</h4>
                                            <p className="mb-3 text-sm text-gray-600">"Praise & Worship Night" - Church Choir & DCM</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-500">June 29, 2025</span>
                                                <a 
                                                    href="https://youtu.be/example3" 
                                                    className="inline-flex items-center font-medium transition-colors text-primaryBlue hover:text-darkBlue"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Watch Now →
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Special Series Section */}
                            <div className="mb-12">
                                <h3 className="mb-6 text-2xl font-bold text-center text-white">📚 Special Series: Youth Week of Prayer</h3>
                                <div className="overflow-hidden bg-black shadow-2xl rounded-xl">
                                    <div className="relative pb-[56.25%] h-0 overflow-hidden">
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                                            <div className="text-center">
                                                <AiOutlinePlayCircle className="w-16 h-16 mx-auto mb-4 text-primaryBlue" />
                                                <p className="text-lg font-semibold text-white">Youth Week of Prayer</p>
                                                <p className="text-sm text-gray-400">Complete Series Playlist</p>
                                                <button className="px-6 py-2 mt-4 font-medium text-white transition-colors rounded-lg bg-primaryBlue hover:bg-darkBlue">
                                                    View Playlist
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Call to Action */}
                            <div className="text-center">
                                <p className="mb-4 text-lg text-gray-300">
                                    Missed a service? Visit our full media library below.
                                </p>
                                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                    <a 
                                        href="/Resources/Sermons" 
                                        className="inline-block px-6 py-3 font-semibold text-white transition-colors rounded-lg bg-primaryBlue hover:bg-darkBlue"
                                    >
                                        Explore Media Archive
                                    </a>
                                    <a 
                                        href="/Music/ChurchChoir" 
                                        className="inline-block px-6 py-3 font-semibold transition-colors bg-transparent border-2 rounded-lg border-primaryBlue text-primaryBlue hover:bg-primaryBlue hover:text-white"
                                    >
                                        Music Ministry
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 7: Church Events Calendar & Notices */}
                    <div className="px-6 py-16 bg-white lg:px-24">
                        <div className="max-w-6xl mx-auto">
                            {/* Section Title & Intro */}
                            <div className="mb-12 text-center">
                                <div className="flex items-center justify-center mb-4">
                                    <AiOutlineCalendar className="w-8 h-8 mr-3 text-green-600" />
                                    <h2 className="text-4xl font-bold text-gray-800">
                                        Upcoming Events & Church Calendar
                                    </h2>
                                </div>
                                <p className="max-w-3xl mx-auto text-xl text-gray-600">
                                    "Stay updated with all our upcoming programs, special services, and ministry activities. Mark your calendar and join us!"
                                </p>
                            </div>

                            {/* Featured Event (Hero Style) */}
                            <div className="p-8 mb-12 border-l-4 shadow-lg bg-gradient-to-r from-lightBlue to-white border-primaryBlue rounded-xl">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center mb-4">
                                            <span className="px-3 py-1 mr-3 text-sm font-bold text-white rounded-full bg-primaryBlue">
                                                FEATURED
                                            </span>
                                            <h3 className="text-3xl font-bold text-darkBlue">⛪ Annual Church Dedication</h3>
                                        </div>
                                        <p className="mb-4 text-lg leading-relaxed text-gray-700">
                                            Join us for a powerful dedication service featuring guest speakers, choirs, and a vibrant fellowship. This special service will mark a new chapter in our church's journey.
                                        </p>
                                        <div className="flex flex-wrap items-center gap-6 mb-4 text-sm text-gray-600">
                                            <span className="flex items-center">
                                                📍 University Auditorium
                                            </span>
                                            <span className="flex items-center">
                                                🗓️ July 28, 2025
                                            </span>
                                            <span className="flex items-center">
                                                ⏰ 10:00 AM
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-4 sm:flex-row">
                                            <a 
                                                href="/events/dedication2025" 
                                                className="inline-flex items-center font-semibold transition-colors text-primaryBlue hover:text-darkBlue"
                                            >
                                                View Details →
                                                <AiOutlineArrowRight className="w-4 h-4 ml-1" />
                                            </a>
                                            <button className="px-6 py-2 font-semibold text-white transition-colors rounded-lg bg-primaryBlue hover:bg-darkBlue">
                                                Add to Calendar
                                            </button>
                                        </div>
                                    </div>
                                    <div className="hidden ml-8 lg:block">
                                        <div className="flex items-center justify-center w-32 h-32 text-4xl font-bold text-white rounded-full bg-primaryBlue">
                                            28
                                        </div>
                                        <p className="mt-2 text-sm text-center text-gray-600">JULY</p>
                                    </div>
                                </div>
                            </div>

                            {/* Events Grid */}
                            <div className="mb-12">
                                <h3 className="mb-6 text-2xl font-bold text-center text-gray-800">This Month's Events</h3>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {/* Event 1 */}
                                    <div className="p-6 transition-shadow duration-300 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="px-2 py-1 text-xs font-semibold rounded bg-lightBlue text-primaryBlue">
                                                FELLOWSHIP
                                            </span>
                                            <span className="text-sm text-gray-500">July 10</span>
                                        </div>
                                        <h4 className="mb-2 text-lg font-semibold text-primaryBlue">Midweek Fellowship – Faith & Academics</h4>
                                        <p className="mb-2 text-sm text-gray-700">5:30 PM @ Dekusda Chapel</p>
                                        <p className="mb-3 text-sm text-gray-500">A power-packed session for students balancing faith and studies.</p>
                                        <a href="/events/fellowship" className="text-sm font-medium text-primaryBlue hover:text-darkBlue">
                                            Learn More →
                                        </a>
                                    </div>

                                    {/* Event 2 */}
                                    <div className="p-6 transition-shadow duration-300 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="px-2 py-1 text-xs font-semibold rounded bg-lightBlue text-primaryBlue">
                                                OUTREACH
                                            </span>
                                            <span className="text-sm text-gray-500">July 13</span>
                                        </div>
                                        <h4 className="mb-2 text-lg font-semibold text-primaryBlue">Youth PCM Outreach to Nyeri</h4>
                                        <p className="mb-2 text-sm text-gray-700">7:00 AM @ Church Parking Lot</p>
                                        <p className="mb-3 text-sm text-gray-500">Join the outreach mission to Nyeri PCM Church for music and evangelism.</p>
                                        <a href="/events/outreach" className="text-sm font-medium text-primaryBlue hover:text-darkBlue">
                                            Learn More →
                                        </a>
                                    </div>

                                    {/* Event 3 */}
                                    <div className="p-6 transition-shadow duration-300 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="px-2 py-1 text-xs font-semibold rounded bg-lightBlue text-primaryBlue">
                                                SACRED
                                            </span>
                                            <span className="text-sm text-gray-500">July 20</span>
                                        </div>
                                        <h4 className="mb-2 text-lg font-semibold text-primaryBlue">Holy Communion Service</h4>
                                        <p className="mb-2 text-sm text-gray-700">11:00 AM @ Main Church</p>
                                        <p className="mb-3 text-sm text-gray-500">A sacred celebration of the Lord's Supper for all baptized members.</p>
                                        <a href="/events/communion" className="text-sm font-medium text-primaryBlue hover:text-darkBlue">
                                            Learn More →
                                        </a>
                                    </div>

                                    {/* Event 4 */}
                                    <div className="p-6 transition-shadow duration-300 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="px-2 py-1 text-xs font-semibold rounded bg-lightBlue text-primaryBlue">
                                                MUSIC
                                            </span>
                                            <span className="text-sm text-gray-500">July 25</span>
                                        </div>
                                        <h4 className="mb-2 text-lg font-semibold text-primaryBlue">PCM Music Concert</h4>
                                        <p className="mb-2 text-sm text-gray-700">6:00 PM @ University Auditorium</p>
                                        <p className="mb-3 text-sm text-gray-500">An evening of praise and worship featuring all our choirs.</p>
                                        <a href="/events/concert" className="text-sm font-medium text-primaryBlue hover:text-darkBlue">
                                            Learn More →
                                        </a>
                                    </div>

                                    {/* Event 5 */}
                                    <div className="p-6 transition-shadow duration-300 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="px-2 py-1 text-xs font-semibold rounded bg-lightBlue text-primaryBlue">
                                                SPECIAL
                                            </span>
                                            <span className="text-sm text-gray-500">July 28</span>
                                        </div>
                                        <h4 className="mb-2 text-lg font-semibold text-primaryBlue">Annual Church Dedication</h4>
                                        <p className="mb-2 text-sm text-gray-700">10:00 AM @ University Auditorium</p>
                                        <p className="mb-3 text-sm text-gray-500">A special service marking our church's dedication and commitment.</p>
                                        <a href="/events/dedication" className="text-sm font-medium text-primaryBlue hover:text-darkBlue">
                                            Learn More →
                                        </a>
                                    </div>

                                    {/* Event 6 */}
                                    <div className="p-6 transition-shadow duration-300 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="px-2 py-1 text-xs font-semibold rounded bg-lightBlue text-primaryBlue">
                                                YOUTH
                                            </span>
                                            <span className="text-sm text-gray-500">July 30</span>
                                        </div>
                                        <h4 className="mb-2 text-lg font-semibold text-primaryBlue">Youth Week of Prayer</h4>
                                        <p className="mb-2 text-sm text-gray-700">7:00 PM @ Church Grounds</p>
                                        <p className="mb-3 text-sm text-gray-500">A week-long spiritual revival for young adults and students.</p>
                                        <a href="/events/youth-prayer" className="text-sm font-medium text-primaryBlue hover:text-darkBlue">
                                            Learn More →
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Calendar Integration */}
                            <div className="mb-12">
                                <h3 className="mb-6 text-2xl font-bold text-center text-gray-800">📅 Church Calendar</h3>
                                <div className="p-8 border border-gray-200 bg-gray-50 rounded-xl">
                                    <div className="text-center">
                                        <AiOutlineCalendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                                        <p className="mb-4 text-gray-600">Google Calendar integration coming soon...</p>
                                        <button className="px-6 py-2 font-semibold text-white transition-colors rounded-lg bg-primaryBlue hover:bg-darkBlue">
                                            Subscribe to Calendar
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Download Bulletin */}
                            <div className="text-center">
                                <p className="mb-4 text-lg text-gray-700">
                                    Need the full bulletin or announcement sheet?
                                </p>
                                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                    <a 
                                        href="/resources/bulletin-july.pdf" 
                                        className="inline-flex items-center px-6 py-3 font-semibold text-white transition-colors rounded-lg bg-primaryBlue hover:bg-darkBlue"
                                        download
                                    >
                                        <AiOutlineDownload className="w-5 h-5 mr-2" />
                                        📄 Download Bulletin
                                    </a>
                                    <a 
                                        href="/More/Announcements" 
                                        className="inline-flex items-center px-6 py-3 font-semibold transition-colors bg-transparent border-2 rounded-lg border-primaryBlue text-primaryBlue hover:bg-primaryBlue hover:text-white"
                                    >
                                        <AiOutlineInfoCircle className="w-4 h-4 mr-2" />
                                        📢 View All Notices
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 8: Ministry & Department Highlights */}
                    <div className="px-6 py-16 bg-gray-50 lg:px-24">
                        <div className="max-w-6xl mx-auto">
                            {/* Section Title & Intro */}
                            <div className="mb-12 text-center">
                                <div className="flex items-center justify-center mb-4">
                                    <AiOutlineTeam className="w-8 h-8 mr-3 text-green-600" />
                                    <h2 className="text-4xl font-bold text-gray-800">
                                        Our Ministries & Departments
                                    </h2>
                                </div>
                                <p className="max-w-3xl mx-auto text-xl text-gray-600">
                                    "Explore the vibrant ministries that make up our spiritual family. Each department plays a unique role in nurturing the body of Christ, serving the campus community, and fulfilling the mission of the church."
                                </p>
                            </div>

                            {/* Ministries Grid */}
                            <div className="grid grid-cols-1 gap-8 mb-12 sm:grid-cols-2 lg:grid-cols-3">
                                {/* Adventist Youth */}
                                <div className="p-6 transition-all duration-300 transform bg-white border-l-4 rounded-lg shadow-md border-primaryBlue hover:shadow-lg hover:scale-105">
                                    <div className="flex items-center mb-4 space-x-3">
                                        <span className="text-3xl">🎯</span>
                                        <h4 className="text-xl font-bold text-primaryBlue">Adventist Youth (AY)</h4>
                                    </div>
                                    <p className="mb-4 leading-relaxed text-softGray">
                                        Empowering the youth to grow spiritually, lead boldly, and evangelize through vibrant programs and missions.
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-softGray">Youth Ministry</span>
                                        <a href="/Music/ChurchChoir" className="font-medium transition-colors text-primaryBlue hover:text-darkBlue">
                                            Learn More →
                                        </a>
                                    </div>
                                </div>

                                {/* Public Campus Ministries */}
                                <div className="p-6 transition-all duration-300 transform bg-white border-l-4 rounded-lg shadow-md border-primaryBlue hover:shadow-lg hover:scale-105">
                                    <div className="flex items-center mb-4 space-x-3">
                                        <span className="text-3xl">🎓</span>
                                        <h4 className="text-xl font-bold text-primaryBlue">Public Campus Ministries (PCM)</h4>
                                    </div>
                                    <p className="mb-4 leading-relaxed text-softGray">
                                        Reaching out to fellow students through evangelism, mentorship, and community service on campus.
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-softGray">Campus Outreach</span>
                                        <a href="/Evangelism/PCM" className="font-medium transition-colors text-primaryBlue hover:text-darkBlue">
                                            Learn More →
                                        </a>
                                    </div>
                                </div>

                                {/* Church Choir */}
                                <div className="p-6 transition-all duration-300 transform bg-white border-l-4 rounded-lg shadow-md border-primaryBlue hover:shadow-lg hover:scale-105">
                                    <div className="flex items-center mb-4 space-x-3">
                                        <span className="text-3xl">🎶</span>
                                        <h4 className="text-xl font-bold text-primaryBlue">Church Choir</h4>
                                    </div>
                                    <p className="mb-4 leading-relaxed text-softGray">
                                        Ministering through powerful music during worship services and special occasions.
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-softGray">Music Ministry</span>
                                        <a href="/Music/ChurchChoir" className="font-medium transition-colors text-primaryBlue hover:text-darkBlue">
                                            Learn More →
                                        </a>
                                    </div>
                                </div>

                                {/* Health & Temperance */}
                                <div className="p-6 transition-all duration-300 transform bg-white border-l-4 rounded-lg shadow-md border-primaryBlue hover:shadow-lg hover:scale-105">
                                    <div className="flex items-center mb-4 space-x-3">
                                        <span className="text-3xl">🍎</span>
                                        <h4 className="text-xl font-bold text-primaryBlue">Health & Temperance</h4>
                                    </div>
                                    <p className="mb-4 leading-relaxed text-softGray">
                                        Promoting healthy lifestyles through medical camps, talks, and wellness programs for the whole person.
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-softGray">Wellness Ministry</span>
                                        <a href="/Resources/Books" className="font-medium transition-colors text-primaryBlue hover:text-darkBlue">
                                            Learn More →
                                        </a>
                                    </div>
                                </div>

                                {/* Personal Ministries */}
                                <div className="p-6 transition-all duration-300 transform bg-white border-l-4 rounded-lg shadow-md border-primaryBlue hover:shadow-lg hover:scale-105">
                                    <div className="flex items-center mb-4 space-x-3">
                                        <span className="text-3xl">🤝</span>
                                        <h4 className="text-xl font-bold text-primaryBlue">Personal Ministries</h4>
                                    </div>
                                    <p className="mb-4 leading-relaxed text-softGray">
                                        Equipping members for soul-winning, discipleship, and personal evangelism.
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-softGray">Evangelism</span>
                                        <a href="/Ministries/PersonalMinistries" className="font-medium transition-colors text-primaryBlue hover:text-darkBlue">
                                            Learn More →
                                        </a>
                                    </div>
                                </div>

                                {/* Children's Ministry */}
                                <div className="p-6 transition-all duration-300 transform bg-white border-l-4 rounded-lg shadow-md border-primaryBlue hover:shadow-lg hover:scale-105">
                                    <div className="flex items-center mb-4 space-x-3">
                                        <span className="text-3xl">👧</span>
                                        <h4 className="text-xl font-bold text-primaryBlue">Children's Ministry</h4>
                                    </div>
                                    <p className="mb-4 leading-relaxed text-softGray">
                                        Nurturing young hearts through Bible stories, crafts, and Sabbath School classes.
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-softGray">Kids Ministry</span>
                                        <a href="/Ministries/PersonalMinistries" className="font-medium transition-colors text-primaryBlue hover:text-darkBlue">
                                            Learn More →
                                        </a>
                                    </div>
                                </div>

                                {/* Divine Charm Melodies */}
                                <div className="p-6 transition-all duration-300 transform bg-white border-l-4 rounded-lg shadow-md border-primaryBlue hover:shadow-lg hover:scale-105">
                                    <div className="flex items-center mb-4 space-x-3">
                                        <span className="text-3xl">🎵</span>
                                        <h4 className="text-xl font-bold text-primaryBlue">Divine Charm Melodies (DCM)</h4>
                                    </div>
                                    <p className="mb-4 leading-relaxed text-softGray">
                                        A mission-driven choral group spreading the gospel through spiritually uplifting music.
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-softGray">Music Ministry</span>
                                        <a href="/Music/DCM" className="font-medium transition-colors text-primaryBlue hover:text-darkBlue">
                                            Learn More →
                                        </a>
                                    </div>
                                </div>

                                {/* Blissful Music Group */}
                                <div className="p-6 transition-all duration-300 transform bg-white border-l-4 rounded-lg shadow-md border-primaryBlue hover:shadow-lg hover:scale-105">
                                    <div className="flex items-center mb-4 space-x-3">
                                        <span className="text-3xl"></span>
                                        <h4 className="text-xl font-bold text-primaryBlue">Blissful Music Group</h4>
                                    </div>
                                    <p className="mb-4 leading-relaxed text-softGray">
                                        Contemporary Christian music ministry bringing joy and inspiration through modern worship.
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-softGray">Contemporary Music</span>
                                        <a href="/Music/Blissful" className="font-medium transition-colors text-primaryBlue hover:text-darkBlue">
                                            Learn More →
                                        </a>
                                    </div>
                                </div>

                                {/* Sabbath School */}
                                <div className="p-6 transition-all duration-300 transform bg-white border-l-4 rounded-lg shadow-md border-primaryBlue hover:shadow-lg hover:scale-105">
                                    <div className="flex items-center mb-4 space-x-3">
                                        <span className="text-3xl"></span>
                                        <h4 className="text-xl font-bold text-primaryBlue">Sabbath School</h4>
                                    </div>
                                    <p className="mb-4 leading-relaxed text-softGray">
                                        Interactive Bible study sessions and lessons every Saturday morning. Deep dive into God's Word with fellow believers.
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-softGray">Bible Study</span>
                                        <a href="/Resources/COE" className="font-medium transition-colors text-primaryBlue hover:text-darkBlue">
                                            Learn More →
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Mini Testimony */}
                            <div className="mb-12">
                                <div className="p-8 border-l-4 rounded-lg shadow-md bg-gradient-to-r from-lightBlue to-white border-primaryBlue">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="flex items-center justify-center w-16 h-16 text-2xl font-bold text-white rounded-full bg-primaryBlue">
                                                C
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <blockquote className="mb-4 text-lg italic leading-relaxed text-darkBlue">
                                                "PCM helped me discover my purpose. I've grown in leadership and now mentor other students on campus. The ministry has transformed not just my spiritual life, but also my academic journey."
                                            </blockquote>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-semibold text-darkBlue">Cynthia Mwangi</p>
                                                    <p className="text-sm text-softGray">PCM Leader 2024</p>
                                                </div>
                                                <span className="text-sm font-medium text-primaryBlue">PCM Ministry</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Join a Ministry CTA */}
                            <div className="text-center">
                                <h4 className="mb-4 text-2xl font-bold text-darkBlue">Want to Get Involved?</h4>
                                <p className="max-w-2xl mx-auto mb-6 text-lg text-softGray">
                                    Every gift and passion has a place in our church. Sign up to serve or learn more about how you can contribute to our vibrant community.
                                </p>
                                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                    <a 
                                        href="/Ministries/PersonalMinistries"
                                        className="inline-flex items-center px-8 py-3 font-semibold text-white transition-all duration-300 transform rounded-lg shadow-lg bg-primaryBlue hover:bg-darkBlue hover:scale-105"
                                    >
                                        <span className="mr-2">🙌</span>
                                        Join a Ministry
                                    </a>
                                    <a 
                                        href="/About/AboutDekusda"
                                        className="inline-flex items-center px-8 py-3 font-semibold transition-all duration-300 bg-transparent border-2 rounded-lg border-primaryBlue text-primaryBlue hover:bg-primaryBlue hover:text-white"
                                    >
                                        Learn About Our Mission
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 10: Weekly Devotionals / Spiritual Growth Corner */}
                    <div className="px-6 py-16 bg-gradient-to-br from-lightBlue to-white lg:px-24">
                        <div className="max-w-6xl mx-auto">
                            {/* Section Title & Intro */}
                            <div className="mb-12 text-center">
                                <div className="flex items-center justify-center mb-4">
                                    <AiOutlineClockCircle className="w-8 h-8 mr-3 text-primaryBlue" />
                                    <h2 className="text-4xl font-bold text-darkBlue">
                                        🌿 Weekly Devotionals
                                    </h2>
                                </div>
                                <p className="max-w-3xl mx-auto font-serif text-xl text-softGray">
                                    "Nourish your spirit throughout the week. Dive into short devotionals, memory verses, and spiritual growth plans that strengthen your walk with Christ amidst academic life."
                                </p>
                            </div>

                            {/* Current Week's Devotional Card */}
                                                            <div className="p-8 mb-8 border-l-4 shadow-lg bg-gradient-to-r from-lightBlue to-white rounded-xl border-primaryBlue">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="flex items-center justify-center w-16 h-16 text-2xl font-bold text-white rounded-full bg-primaryBlue">
                                                
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="mb-3 font-serif text-2xl font-bold text-darkBlue">This Week's Devotional:</h4>
                                            <h5 className="mb-3 text-xl italic font-semibold text-primaryBlue">"Faith Over Fear"</h5>
                                            <p className="mb-4 font-serif text-lg leading-relaxed text-softGray">
                                                Trusting God when the semester feels overwhelming. As exams approach and deadlines loom, remember that God's strength is made perfect in our weakness.
                                            </p>
                                            <p className="mb-4 text-sm text-softGray">
                                                <span className="font-semibold">Scripture Focus:</span> 2 Timothy 1:7
                                            </p>
                                            <div className="flex flex-col gap-4 sm:flex-row">
                                                <a 
                                                    href="/Resources/Books" 
                                                    className="inline-flex items-center font-medium transition-colors text-primaryBlue hover:text-darkBlue"
                                                >
                                                    Read full devotional →
                                                    <AiOutlineArrowRight className="w-4 h-4 ml-1" />
                                                </a>
                                                <button className="px-4 py-2 font-medium text-white transition-colors rounded-lg bg-primaryBlue hover:bg-darkBlue">
                                                    Download PDF
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            {/* Memory Verse */}
                            <div className="p-6 mb-8 bg-white border-l-4 shadow-md rounded-xl border-primaryBlue">
                                <div className="text-center">
                                    <h5 className="mb-4 text-xl font-semibold text-darkBlue"> Memory Verse of the Week:</h5>
                                    <blockquote className="mb-4 font-serif text-xl italic leading-relaxed text-darkBlue">
                                        "I can do all things through Christ who strengthens me."
                                    </blockquote>
                                    <p className="text-lg font-medium text-softGray">— Philippians 4:13</p>
                                    <div className="mt-4">
                                        <button className="px-6 py-2 font-medium text-white transition-colors rounded-lg bg-primaryBlue hover:bg-darkBlue">
                                            Save to Phone
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Spiritual Growth Resources Grid */}
                            <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
                                {/* 30-Day Bible Reading Challenge */}
                                <div className="p-6 transition-all duration-300 transform bg-white border-l-4 shadow-md rounded-xl hover:shadow-lg hover:scale-105 border-primaryBlue">
                                    <div className="flex items-center mb-4 space-x-3">
                                        <span className="text-3xl"></span>
                                        <h4 className="text-lg font-bold text-primaryBlue">30-Day Bible Reading Challenge</h4>
                                    </div>
                                    <p className="mb-4 leading-relaxed text-softGray">
                                        Join our campus-wide challenge to read through key passages. Perfect for busy students!
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-softGray">Day 12 of 30</span>
                                        <a href="/Resources/COE" className="font-medium transition-colors text-primaryBlue hover:text-darkBlue">
                                            Join Challenge →
                                        </a>
                                    </div>
                                </div>

                                {/* Campus Bible Study Plans */}
                                <div className="p-6 transition-all duration-300 transform bg-white border-l-4 shadow-md rounded-xl hover:shadow-lg hover:scale-105 border-primaryBlue">
                                    <div className="flex items-center mb-4 space-x-3">
                                        <span className="text-3xl"></span>
                                        <h4 className="text-lg font-bold text-primaryBlue">Campus Bible Study Plans</h4>
                                    </div>
                                    <p className="mb-4 leading-relaxed text-softGray">
                                        Structured study plans designed for university students balancing faith and academics.
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-softGray">8 Active Plans</span>
                                        <a href="/Resources/Sermons" className="font-medium transition-colors text-primaryBlue hover:text-darkBlue">
                                            View Plans →
                                        </a>
                                    </div>
                                </div>

                                {/* Spiritual Podcasts */}
                                <div className="p-6 transition-all duration-300 transform bg-white border-l-4 shadow-md rounded-xl hover:shadow-lg hover:scale-105 border-primaryBlue">
                                    <div className="flex items-center mb-4 space-x-3">
                                        <span className="text-3xl"></span>
                                        <h4 className="text-lg font-bold text-primaryBlue">Spiritual Podcasts</h4>
                                    </div>
                                    <p className="mb-4 leading-relaxed text-softGray">
                                        Listen to devotionals and sermons on your commute or study breaks.
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-softGray">Latest: "Faith in Finals"</span>
                                        <a href="/Resources/Sermons" className="font-medium transition-colors text-primaryBlue hover:text-darkBlue">
                                            Listen Now →
                                        </a>
                                    </div>
                                </div>

                                {/* Reflection Journal */}
                                <div className="p-6 transition-all duration-300 transform bg-white border-l-4 shadow-md rounded-xl hover:shadow-lg hover:scale-105 border-primaryBlue">
                                    <div className="flex items-center mb-4 space-x-3">
                                        <span className="text-3xl"></span>
                                        <h4 className="text-lg font-bold text-primaryBlue">Reflection Journal</h4>
                                    </div>
                                    <p className="mb-4 leading-relaxed text-softGray">
                                        Weekly prompts to help you reflect on God's work in your life and studies.
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-softGray">This Week's Prompt</span>
                                        <a href="/Resources/Books" className="font-medium transition-colors text-primaryBlue hover:text-darkBlue">
                                            Start Journaling →
                                        </a>
                                    </div>
                                </div>

                                {/* Downloadable Booklets */}
                                <div className="p-6 transition-all duration-300 transform bg-white border-l-4 shadow-md rounded-xl hover:shadow-lg hover:scale-105 border-primaryBlue">
                                    <div className="flex items-center mb-4 space-x-3">
                                        <span className="text-3xl"></span>
                                        <h4 className="text-lg font-bold text-primaryBlue">Devotional Booklets</h4>
                                    </div>
                                    <p className="mb-4 leading-relaxed text-softGray">
                                        Download our monthly devotional booklets for offline reading and study.
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-softGray">July 2025 Edition</span>
                                        <a href="/Resources/Books" className="font-medium transition-colors text-primaryBlue hover:text-darkBlue">
                                            Download →
                                        </a>
                                    </div>
                                </div>

                                {/* Email Subscription */}
                                <div className="p-6 transition-all duration-300 transform bg-white border-l-4 shadow-md rounded-xl hover:shadow-lg hover:scale-105 border-primaryBlue">
                                    <div className="flex items-center mb-4 space-x-3">
                                        <span className="text-3xl"></span>
                                        <h4 className="text-lg font-bold text-primaryBlue">Weekly Devotionals</h4>
                                    </div>
                                    <p className="mb-4 leading-relaxed text-softGray">
                                        Get weekly devotionals delivered to your inbox every Monday morning.
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-softGray">Free Subscription</span>
                                        <a href="/Resources/COE" className="font-medium transition-colors text-primaryBlue hover:text-darkBlue">
                                            Subscribe →
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Weekly Prayer Focus */}
                            <div className="p-8 mb-8 border-l-4 shadow-md bg-gradient-to-r from-lightBlue to-white rounded-xl border-primaryBlue">
                                <div className="text-center">
                                    <h4 className="mb-4 text-2xl font-bold text-darkBlue">🙏 This Week's Prayer Focus</h4>
                                    <p className="mb-4 font-serif text-lg text-softGray">
                                        <strong>Academic Excellence:</strong> Praying for students as they prepare for mid-semester exams and projects.
                                    </p>
                                    <p className="mb-6 text-softGray">
                                        "Commit your work to the Lord, and your plans will be established." — Proverbs 16:3
                                    </p>
                                    <button className="px-8 py-3 font-semibold text-white transition-colors rounded-lg bg-primaryBlue hover:bg-darkBlue">
                                        Join Prayer Chain
                                    </button>
                                </div>
                            </div>

                            {/* Call to Action */}
                            <div className="text-center">
                                <h4 className="mb-4 text-2xl font-bold text-darkBlue">Ready to Grow Spiritually?</h4>
                                <p className="max-w-2xl mx-auto mb-6 text-lg text-softGray">
                                    Start your spiritual growth journey today. Choose from our various resources designed specifically for university students.
                                </p>
                                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                    <a 
                                        href="/Resources/COE"
                                        className="inline-flex items-center px-8 py-3 font-semibold text-white transition-all duration-300 transform rounded-lg shadow-lg bg-primaryBlue hover:bg-darkBlue hover:scale-105"
                                    >
                                        <span className="mr-2"></span>
                                        Explore Resources
                                    </a>
                                    <a 
                                        href="/Resources/Sermons"
                                        className="inline-flex items-center px-8 py-3 font-semibold transition-all duration-300 bg-transparent border-2 rounded-lg border-primaryBlue text-primaryBlue hover:bg-primaryBlue hover:text-white"
                                    >
                                        Listen to Sermons
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 11: Prayer Request Wall */}
                    <div className="px-6 py-16 bg-gradient-to-br from-lightBlue to-white lg:px-24">
                        <div className="max-w-6xl mx-auto">
                            {/* Title & Spiritual Welcome */}
                            <div className="px-6 py-12 mb-8 bg-white shadow-md rounded-xl">
                                <div className="text-center">
                                    <h2 className="mb-4 text-4xl font-bold text-primaryBlue"><AiOutlineHeart className="inline-block mr-2 align-middle" /> Prayer Request Wall</h2>
                                    <p className="max-w-3xl mx-auto text-lg leading-relaxed text-softGray">
                                        "Cast all your anxiety on Him because He cares for you." — 1 Peter 5:7
                                    </p>
                                    <p className="max-w-2xl mx-auto mt-4 text-softGray">
                                        Share your burden with our community. We believe in the power of prayer and are here to stand with you in faith.
                                    </p>
                                </div>
                            </div>

                            {/* Prayer Request Submission Form */}
                            <div className="max-w-2xl mx-auto mb-12">
                                <div className="p-8 bg-white border-l-4 shadow-lg rounded-xl border-primaryBlue">
                                    <h3 className="mb-6 text-2xl font-bold text-center text-darkBlue">Submit Your Prayer Request</h3>
                                    
                                    <form className="space-y-6">
                                        <div>
                                            <label className="block mb-2 font-semibold text-darkBlue">
                                                Your Name (Optional):
                                            </label>
                                            <input 
                                                type="text" 
                                                placeholder="John or Anonymous" 
                                                className="w-full p-3 transition-colors border rounded-lg border-softGray focus:ring-2 focus:ring-primaryBlue focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block mb-2 font-semibold text-darkBlue">
                                                Prayer Request:
                                            </label>
                                            <textarea 
                                                rows="5" 
                                                placeholder="Write your prayer request here..." 
                                                className="w-full p-3 transition-colors border rounded-lg resize-none border-softGray focus:ring-2 focus:ring-primaryBlue focus:border-transparent"
                                            ></textarea>
                                        </div>

                                        <div className="flex items-center">
                                            <input 
                                                type="checkbox" 
                                                id="public-request"
                                                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primaryBlue focus:ring-primaryBlue focus:ring-2"
                                            />
                                            <label htmlFor="public-request" className="ml-2 text-sm text-softGray">
                                                Make this request visible on the Prayer Wall
                                            </label>
                                        </div>

                                        <div className="text-center">
                                            <button 
                                                type="submit"
                                                className="px-8 py-3 font-semibold text-white transition-all duration-300 transform rounded-lg shadow-lg bg-primaryBlue hover:bg-darkBlue hover:scale-105"
                                            >
                                                🙏 Submit Prayer Request
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Prayer Wall Display */}
                            <div className="max-w-4xl mx-auto">
                                <h3 className="mb-6 text-2xl font-semibold text-center text-darkBlue">🙏 Prayer Requests from the Community</h3>

                                <div className="space-y-6">
                                    {/* Prayer Request 1 */}
                                    <div className="p-6 transition-shadow duration-300 bg-white border-l-4 rounded-lg shadow-md border-primaryBlue hover:shadow-lg">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <p className="mb-3 text-lg leading-relaxed text-darkBlue">
                                                    Please pray for strength as I go through exams and feel overwhelmed with pressure. I need God's peace and wisdom to focus on my studies.
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm italic text-softGray">– Anonymous, July 7, 2025</p>
                                                    <div className="flex items-center space-x-4">
                                                        <span className="text-sm font-medium text-primaryBlue">12 people praying</span>
                                                        <button className="text-sm font-medium transition-colors text-primaryBlue hover:text-darkBlue">
                                                            🙏 I'm Praying
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Prayer Request 2 */}
                                    <div className="p-6 transition-shadow duration-300 bg-white border-l-4 rounded-lg shadow-md border-primaryBlue hover:shadow-lg">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <p className="mb-3 text-lg leading-relaxed text-darkBlue">
                                                    Praying for a friend's health and for guidance in my internship search. I trust God will open the right doors at the right time.
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm italic text-softGray">– Esther K., July 6, 2025</p>
                                                    <div className="flex items-center space-x-4">
                                                        <span className="text-sm font-medium text-primaryBlue">8 people praying</span>
                                                        <button className="text-sm font-medium transition-colors text-primaryBlue hover:text-darkBlue">
                                                            🙏 I'm Praying
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Prayer Request 3 */}
                                    <div className="p-6 transition-shadow duration-300 bg-white border-l-4 rounded-lg shadow-md border-primaryBlue hover:shadow-lg">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <p className="mb-3 text-lg leading-relaxed text-darkBlue">
                                                    My family is going through financial difficulties. Please pray for God's provision and for us to trust in His timing and plan.
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm italic text-softGray">– David M., July 5, 2025</p>
                                                    <div className="flex items-center space-x-4">
                                                        <span className="text-sm font-medium text-primaryBlue">15 people praying</span>
                                                        <button className="text-sm font-medium transition-colors text-primaryBlue hover:text-darkBlue">
                                                            🙏 I'm Praying
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Prayer Request 4 */}
                                    <div className="p-6 transition-shadow duration-300 bg-white border-l-4 rounded-lg shadow-md border-primaryBlue hover:shadow-lg">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <p className="mb-3 text-lg leading-relaxed text-darkBlue">
                                                    Praying for spiritual growth and deeper relationship with God. I want to be more intentional about my faith journey this semester.
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm italic text-softGray">– Sarah W., July 4, 2025</p>
                                                    <div className="flex items-center space-x-4">
                                                        <span className="text-sm font-medium text-primaryBlue">6 people praying</span>
                                                        <button className="text-sm font-medium transition-colors text-primaryBlue hover:text-darkBlue">
                                                            🙏 I'm Praying
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Prayer Request 5 */}
                                    <div className="p-6 transition-shadow duration-300 bg-white border-l-4 rounded-lg shadow-md border-primaryBlue hover:shadow-lg">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <p className="mb-3 text-lg leading-relaxed text-darkBlue">
                                                    Please pray for my roommate who is struggling with depression. I want to be a good friend and show God's love to them.
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm italic text-softGray">– Anonymous, July 3, 2025</p>
                                                    <div className="flex items-center space-x-4">
                                                        <span className="text-sm font-medium text-primaryBlue">20 people praying</span>
                                                        <button className="text-sm font-medium transition-colors text-primaryBlue hover:text-darkBlue">
                                                            🙏 I'm Praying
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Load More Button */}
                                <div className="mt-8 text-center">
                                    <button className="px-6 py-3 font-semibold text-white transition-colors rounded-lg bg-primaryBlue hover:bg-darkBlue">
                                        Load More Prayer Requests
                                    </button>
                                </div>
                            </div>

                            {/* Prayer Guidelines */}
                            <div className="p-8 mt-12 border-l-4 shadow-md bg-gradient-to-r from-lightBlue to-white rounded-xl border-primaryBlue">
                                <div className="text-center">
                                    <h4 className="mb-4 text-2xl font-bold text-darkBlue"> Prayer Guidelines</h4>
                                    <div className="grid max-w-4xl gap-6 mx-auto text-left md:grid-cols-2">
                                        <div>
                                            <h5 className="mb-2 font-semibold text-primaryBlue">How to Submit:</h5>
                                            <ul className="space-y-1 text-sm text-softGray">
                                                <li>• Be specific but respectful</li>
                                                <li>• You can remain anonymous</li>
                                                <li>• Choose public or private visibility</li>
                                                <li>• Update when prayers are answered</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="mb-2 font-semibold text-primaryBlue">How to Pray:</h5>
                                            <ul className="space-y-1 text-sm text-softGray">
                                                <li>• Click "I'm Praying" to show support</li>
                                                <li>• Pray regularly for the requests</li>
                                                <li>• Encourage others in the comments</li>
                                                <li>• Celebrate answered prayers together</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Call to Action */}
                            <div className="mt-12 text-center">
                                <h4 className="mb-4 text-2xl font-bold text-darkBlue">Join Our Prayer Community</h4>
                                <p className="max-w-2xl mx-auto mb-6 text-lg text-softGray">
                                    Your prayers matter. Whether you're submitting a request or praying for others, you're part of a powerful spiritual community.
                                </p>
                                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                    <button 
                                        className="inline-flex items-center px-8 py-3 font-semibold text-white transition-all duration-300 transform rounded-lg shadow-lg bg-primaryBlue hover:bg-darkBlue hover:scale-105"
                                    >
                                        <span className="mr-2">🙏</span>
                                        Submit a Prayer Request
                                    </button>
                                    <a 
                                        href="/Resources/COE"
                                        className="inline-flex items-center px-8 py-3 font-semibold transition-all duration-300 bg-transparent border-2 rounded-lg border-primaryBlue text-primaryBlue hover:bg-primaryBlue hover:text-white"
                                    >
                                        Learn About Prayer
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 20: Final Closing Section — "Stay Connected in Faith" */}
                    <div className="px-6 py-16 text-center bg-gradient-to-r from-lightBlue via-white to-primaryBlue">
                        <div className="max-w-6xl mx-auto">
                            <h2 className="mb-6 text-3xl font-bold md:text-4xl text-darkBlue">Stay Connected in Faith</h2>
                            <p className="max-w-3xl mx-auto mb-8 text-lg leading-relaxed text-softGray">
                                "The Lord bless you and keep you; the Lord make His face shine upon you and be gracious to you."
                                <br />
                                <span className="text-softGray">— Numbers 6:24–25</span>
                            </p>
                            
                            <div className="flex flex-col items-center justify-center gap-6 mb-8 md:flex-row">
                                <a 
                                    href="/About/AboutDekusda" 
                                    className="inline-flex items-center px-8 py-4 font-semibold text-white transition-all duration-300 transform rounded-lg shadow-lg bg-primaryBlue hover:bg-darkBlue hover:scale-105"
                                >
                                    <span className="mr-2"></span>
                                    Contact Us
                                </a>
                                <a 
                                    href="/Resources/Sermons" 
                                    className="inline-flex items-center px-8 py-4 font-semibold text-white transition-all duration-300 transform rounded-lg shadow-lg bg-primaryBlue hover:bg-darkBlue hover:scale-105"
                                >
                                    <span className="mr-2"></span>
                                    Watch Sermons
                                </a>
                                <a 
                                    href="/Ministries/PersonalMinistries" 
                                    className="inline-flex items-center px-8 py-4 font-semibold text-white transition-all duration-300 transform rounded-lg shadow-lg bg-primaryBlue hover:bg-darkBlue hover:scale-105"
                                >
                                    <span className="mr-2"></span>
                                    Join a Ministry
                                </a>
                            </div>

                            <div className="p-8 shadow-lg bg-white/80 backdrop-blur-sm rounded-xl">
                                <h3 className="mb-4 text-2xl font-bold text-darkBlue">We're Here for You</h3>
                                <p className="max-w-2xl mx-auto mb-6 text-softGray">
                                    Whether you're a student seeking spiritual guidance, a visitor exploring faith, or a member looking to get involved, 
                                    our church family welcomes you with open arms. Let's grow together in Christ.
                                </p>
                                <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-3">
                                    <div className="p-4">
                                        <div className="mb-2 text-3xl"></div>
                                        <h4 className="mb-2 font-semibold text-darkBlue">Find Your Home</h4>
                                        <p className="text-sm text-softGray">A place where you belong and can grow in faith</p>
                                    </div>
                                    <div className="p-4">
                                        <div className="mb-2 text-3xl"></div>
                                        <h4 className="mb-2 font-semibold text-darkBlue">Connect & Serve</h4>
                                        <p className="text-sm text-softGray">Join ministries and make meaningful friendships</p>
                                    </div>
                                    <div className="p-4">
                                        <div className="mb-2 text-3xl"></div>
                                        <h4 className="mb-2 font-semibold text-darkBlue">Grow Spiritually</h4>
                                        <p className="text-sm text-softGray">Deepen your relationship with God</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Footer></Footer>
                </div>
                <Sidebar></Sidebar>
            </div>
        </>
    );
}

export default Home;