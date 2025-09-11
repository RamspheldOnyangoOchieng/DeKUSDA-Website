import { useRef, useEffect, useState } from "react";
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

// Swiper imports with all required CSS
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import { Autoplay, Navigation, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import services
import { homepageService } from '../services/homepage';

// Import fallback images
import Bereans from '../assets/Bereans.jpg';
import Collettes from '../assets/Collettes.jpg';
import Dekusdamain from '../assets/Dekusdamain.jpg';
import Fofanas from '../assets/Fofanas.jpg';
import Pilgrims from '../assets/Pilgrims.jpg';
import Church from '../assets/church.jpeg';
import Mission from '../assets/mission2.jpeg';

// Import Professional Section Components
import FeaturedMinistries from '../components/sections/FeaturedMinistries';
import UpcomingEvents from '../components/sections/UpcomingEvents';
import WorshipServices from '../components/sections/WorshipServices';
import LeadershipDirectory from '../components/sections/LeadershipDirectory';
import PrayerForm from '../components/Prayer/PrayerForm';
import OnlineGiving from '../components/sections/OnlineGiving';
import QuickAccess from '../components/sections/QuickAccess';
import NewsletterSignup from '../components/sections/NewsletterSignup';

import { Footer } from '../components/Layout/Footer';
import { Header } from '../components/Layout/Header';
import { Sidebar } from '../components/Layout/Sidebar';

export const Home = () => {
    // State for dynamic content
    const [homepageData, setHomepageData] = useState({
        slides: [],
        contents: {},
        worship_services: [],
        featured_projects: [],
        about_content: null,
        welcome_message: null,
        prayer_verse: null
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fallback slides for when API fails
    const fallbackSlides = [
        {
            image: Dekusdamain,
            title: "DEKUSDA Family",
            cta_link: "/Aboutdekusda"
        },
        {
            image: Collettes,
            title: "Collettes",
            cta_link: "/Music/ChurchChoir"
        },
        {
            image: Bereans,
            title: "Bereans",
            cta_link: "/Ministries/PersonalMinistries"
        },
        {
            image: Pilgrims,
            title: "Pilgrims",
            cta_link: "/Evangelism/PCM"
        },
        {
            image: Fofanas,
            title: "Fofana",
            cta_link: "/About/AboutSDA"
        },
        {
            image: Mission,
            title: "Mission Emphasis",
            cta_link: "/About/Mission"
        }
    ];
    
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const swiperRef = useRef(null);

    // Fetch homepage data on component mount
    useEffect(() => {
        const fetchHomepageData = async () => {
            try {
                setLoading(true);
                const response = await homepageService.getHomepageData();
                if (response.status === 'success') {
                    setHomepageData(response.data);
                } else {
                    console.warn('Failed to fetch homepage data, using fallback');
                    setError('Using fallback content');
                }
            } catch (error) {
                console.error('Error fetching homepage data:', error);
                setError('Failed to load dynamic content, using fallback');
            } finally {
                setLoading(false);
            }
        };

        fetchHomepageData();
    }, []);

    // Ensure autoplay starts properly
    useEffect(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.autoplay.start();
        }
    }, []);

    // Use dynamic slides or fallback
    const slides = homepageData.slides.length > 0 ? homepageData.slides : fallbackSlides;

    // Get content with fallback
    const getContent = (sectionKey, fallback = '') => {
        return homepageData.contents[sectionKey] || { content: fallback, title: '', subtitle: '' };
    };

    return (
        <>
            <div className='flex'>
                <div className='w-[85%]'>
                    <Header />
                    
                    {/* Enhanced Hero Slider Section */}
                    <div className="relative -mt-2 overflow-hidden">
                        <Swiper
                            ref={swiperRef}
                            modules={[Autoplay, Navigation]}
                            autoplay={{ 
                                delay: 1500,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                                waitForTransition: true,
                                stopOnLastSlide: false
                            }}
                            speed={1200}
                            loop={true}
                            loopAdditionalSlides={1}
                            spaceBetween={0}
                            slidesPerView={1}
                            grabCursor={true}
                            watchSlidesProgress={true}
                            preloadImages={true}
                            updateOnImagesReady={true}
                            lazy={false}
                            navigation={{
                                nextEl: nextRef.current,
                                prevEl: prevRef.current,
                            }}
                            onSwiper={(swiper) => {
                                // Delay navigation initialization to ensure refs are ready
                                setTimeout(() => {
                                    if (prevRef.current && nextRef.current) {
                                        swiper.params.navigation.prevEl = prevRef.current;
                                        swiper.params.navigation.nextEl = nextRef.current;
                                        swiper.navigation.destroy();
                                        swiper.navigation.init();
                                        swiper.navigation.update();
                                    }
                                }, 100);
                            }}
                            onInit={(swiper) => {
                                // Ensure autoplay is active
                                swiper.autoplay.start();
                            }}
                            className="xs:w-full sm: md: lg: xl:w-full xl:h-svh"
                        >
                            {slides.map((slide, index) => (
                             <SwiperSlide key={slide.id || index}>
                             <div className="w-full flex flex-col items-center justify-center px-4">
                               <div
                                 className={`w-full h-[70vh] mb-4 rounded-xl shadow-xl relative overflow-hidden transform transition-all duration-500 ${
                                   slide.title === "Mission Emphasis"
                                     ? 'bg-[url("/textures/dots.svg")] bg-repeat bg-cover bg-blend-overlay bg-white/60'
                                     : ''
                                 }`}
                               >
                                 <img
                                   src={slide.image_url || slide.image}
                                   alt={`${slide.title} - DeKUSDA Church`}
                                   loading={index === 0 ? "eager" : "lazy"}
                                   decoding="async"
                                   fetchpriority={index === 0 ? "high" : "auto"}
                                   className={`w-full h-full rounded-xl transition-all duration-700 ease-in-out transform hover:scale-105 ${
                                     slide.title === "Mission Emphasis" ? 'object-contain' : 'object-cover'
                                   }`}
                                   style={{
                                     willChange: 'transform',
                                     backfaceVisibility: 'hidden',
                                     WebkitBackfaceVisibility: 'hidden'
                                   }}
                                   onError={(e) => {
                                     // Fallback to static images if dynamic ones fail
                                     const fallbackImages = {
                                       "DEKUSDA Family": Dekusdamain,
                                       "Collettes": Collettes,
                                       "Bereans": Bereans,
                                       "Pilgrims": Pilgrims,
                                       "Fofana": Fofanas,
                                       "Mission Emphasis": Mission
                                     };
                                     if (fallbackImages[slide.title]) {
                                       e.target.src = fallbackImages[slide.title];
                                     }
                                   }}
                                 />
                                 {/* Overlay for better text visibility */}
                                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-xl"></div>
                               </div>
                           
                               {/* Title */}
                               <div className="text-center w-full flex flex-col items-center space-y-2">
                                 <h2 className="text-xl sm:text-2xl font-semibold text-white bg-gradient-to-r from-primaryBlue to-darkBlue px-6 py-2 rounded-full shadow-md transform transition-all duration-300 hover:shadow-lg hover:scale-105">
                                   {slide.title}
                                 </h2>
                           
                                 {slide.cta_text && (
                                   <button
                                     className="px-5 py-1.5 text-sm font-medium text-white bg-primaryBlue rounded-full hover:bg-darkBlue transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                                     onClick={() => window.location.href = slide.cta_link || slide.ctaLink}
                                   >
                                     {slide.cta_text || 'Learn More'}
                                   </button>
                                 )}
                               </div>
                             </div>
                           </SwiperSlide>
                           

                         
                          

                            ))}
                        </Swiper>
                        
                        {/* Enhanced Navigation Buttons */}
                        <button
                            ref={prevRef}
                            className="absolute z-20 p-4 text-white transition-all duration-300 transform -translate-y-1/2 rounded-full top-1/2 left-4 bg-darkBlue/70 hover:bg-darkBlue/90 hover:scale-110 backdrop-blur-sm shadow-lg hover:shadow-xl group"
                            aria-label="Previous slide"
                        >
                            <svg className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            ref={nextRef}
                            className="absolute z-20 p-4 text-white transition-all duration-300 transform -translate-y-1/2 rounded-full top-1/2 right-4 bg-darkBlue/70 hover:bg-darkBlue/90 hover:scale-110 backdrop-blur-sm shadow-lg hover:shadow-xl group"
                            aria-label="Next slide"
                        >
                            <svg className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Progress indicator */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
                            <div className="flex space-x-2">
                                {slides.map((_, index) => (
                                    <div key={index} className="w-2 h-2 bg-white/50 rounded-full transition-all duration-300 hover:bg-white/80"></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Section 2: About Us Snapshot */}
                    <div className="w-full bg-white">
                        <div className="max-w-6xl mx-auto">
                            <div className="mb-12 text-center">
                                <div className="flex items-center justify-center mb-4">
                                    <AiOutlineCheckCircle className="w-8 h-8 mr-3 text-primaryBlue" />
                                    <h2 className="text-4xl font-bold text-darkBlue">
                                        {getContent('about_us', 'Who We Are – A Christ-Centered Family at DeKUT').title}
                                    </h2>
                                </div>
                                <p className="text-xl italic text-softGray">
                                    "You are the light of the world. A city on a hill cannot be hidden." – Matthew 5:14
                                </p>
                            </div>

                            <div className="grid items-center gap-12 lg:grid-cols-2">
                                <div className="space-y-6">
                                    <p className="text-lg leading-relaxed text-softGray ml-6">
                                        {getContent('about_us', 'DEKUSDA (Dedan Kimathi University Seventh-Day Adventist Church) is a vibrant, student-led church located in the heart of Dedan Kimathi University. We are more than just a place of worship—we are a family rooted in Christ, driven by mission, and empowered by love.').content}
                                    </p>
                                    
                                    <p className="text-lg leading-relaxed text-softGray ml-6">
                                        We exist to nurture spiritual growth, foster godly friendships, and equip students to be strong ambassadors for Christ both on and off-campus. From weekly worship services, engaging Bible studies, music ministries, and community outreach—we believe in holistic spiritual transformation.
                                    </p>
                                    
                                    <p className="text-lg leading-relaxed text-softGray ml-6">
                                        {getContent('welcome_message', 'Everyone is welcome at DEKUSDA: students, staff, alumni, and the surrounding community. Join us as we journey together toward eternity, walking in truth, love, and the light of the everlasting Gospel.').content}
                                    </p>

                                    <div className="grid grid-cols-2 gap-6 mt-8 md:grid-cols-4">
                                        <div className="text-center">
                                            <div className="mb-2 text-3xl font-bold text-primaryBlue">200+</div>
                                            <div className="text-sm text-softGray">Active Members</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="mb-2 text-3xl font-bold text-primaryBlue">12</div>
                                            <div className="text-sm text-softGray">Church Families</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="mb-2 text-3xl font-bold text-primaryBlue">3</div>
                                            <div className="text-sm text-softGray">Choir Groups</div>
                                        </div>
                                       
                                    </div>

                                    <div className="mt-8">
                                        <button 
                                            className="px-8 py-3 font-semibold text-white transition-all duration-300 transform rounded-lg shadow-lg bg-primaryBlue hover:bg-darkBlue hover:scale-105"
                                            onClick={() => window.location.href = getContent('about_us').button_link || '/Aboutdekusda'}
                                        >
                                            {getContent('about_us').button_text || 'Learn More About Our Church'}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <div className="relative">
                                        <img 
                                            src={Church} 
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



                    {/* Section 3: Communication Sabbath */}
                    <div className="w-full bg-gradient-to-b from-lightBlue/50 to-primaryBlue/20 py-16 px-6">
                        <div className="max-w-6xl mx-auto">
                            {/* Communication Sabbath Banner */}
                            <div className="mb-12 text-center">
                                <div className="flex justify-center mb-8">
                                    <div className="bg-gradient-to-r from-primaryBlue via-darkBlue to-primaryBlue rounded-2xl shadow-lg px-8 py-6 max-w-2xl text-center">
                                        <h2 className="text-3xl font-bold text-white tracking-wide mb-3">
                                            This Sabbath is a Communication Sabbath
                                        </h2>
                                        <p className="text-white/80 font-medium mb-4">
                                            Join us for a special time of worship and fellowship — see you there!
                                        </p>
                                        <span className="inline-flex items-center gap-2 bg-white text-primaryBlue font-semibold px-5 py-2 rounded-full shadow hover:shadow-lg transition">
                                            <HiOutlineLocationMarker className="w-5 h-5 text-primaryBlue" />
                                            Food Science Workshop • 7:50 AM
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Events - Beautiful Original Component */}
                    <UpcomingEvents />

                    {/* Weekly Schedule Snapshot */}
                    <div className="w-full bg-gradient-to-b from-lightBlue/50 to-primaryBlue/20">
                        <div className="max-w-6xl mx-auto">

                            <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
                                {/* Schedule cards remain the same as before */}
                                {/* ... */}
                            </div>

                            
                        </div>
                    </div>

                    {/* Section 4: Prayer Requests */}
                    <div className="w-full bg-gradient-to-b from-white to-softGray/80 py-16 px-6">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-12">
                                <div className="flex items-center justify-center mb-4">
                                    <AiOutlineHeart className="w-8 h-8 mr-3 mt-2 text-primaryBlue" />
                                    <h2 className="text-4xl font-bold text-darkBlue">
                                        {getContent('prayer_verse', 'Prayer Requests').title}
                                    </h2>
                                </div>
                                <p className="text-xl text-softGray">
                                    {getContent('prayer_verse', '"Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God." - Philippians 4:6').content}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Prayer Form */}
                                <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-primaryBlue">
                                    <h3 className="text-2xl font-bold text-darkBlue mb-6">Submit Your Request</h3>
                                    <div className="[&_.bg-white]:!bg-transparent [&_.border-l-4]:!border-l-0 [&_.rounded-xl]:!rounded-none [&_.shadow-lg]:!shadow-none [&_.p-8]:!p-0 [&_h3]:!hidden">
                                        <PrayerForm onSubmitSuccess={() => {
                                            // Optional: You can add success handling here
                                            console.log('Prayer request submitted successfully from home page');
                                        }} />
                                    </div>
                                </div>

                                {/* Recent Prayers */}
                                <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-primaryBlue">
                                    <h3 className="text-2xl font-bold text-darkBlue mb-6">Recent Prayers</h3>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <p className="text-gray-700 italic">"Please pray for my upcoming exams and for peace during this stressful period."</p>
                                            <p className="text-sm text-gray-500 mt-2">- Anonymous, 2 days ago</p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <p className="text-gray-700 italic">"Praying for healing for my grandmother who's in the hospital."</p>
                                            <p className="text-sm text-gray-500 mt-2">- Sarah M., 5 days ago</p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <p className="text-gray-700 italic">"Requesting prayers for our church leadership as they make important decisions."</p>
                                            <p className="text-sm text-gray-500 mt-2">- Brother James, 1 week ago</p>
                                        </div>
                                    </div>
                                    <button className="mt-6 w-full py-2 border-2 border-primaryBlue text-primaryBlue rounded-lg hover:bg-primaryBlue hover:text-white transition-colors font-medium">
                                        View All Prayer Requests
                                    </button>
                                </div>
                            </div>

                            {/* Prayer Chain Callout */}
                            <div className="mt-12 bg-primaryBlue/50 p-6 rounded-xl text-center">
                                <h3 className="text-xl font-bold text-darkBlue mb-2">Join Our Prayer Chain</h3>
                                <p className="text-gray-800/90 mb-4">Commit to praying for requests daily</p>
                               
                            </div>
                        </div>
                    </div>

                    {/* Professional Website Sections */}
                    <QuickAccess />
                    <FeaturedMinistries />
                    <WorshipServices />
                    <OnlineGiving projects={homepageData.featured_projects || []} />
                    <LeadershipDirectory />
                    <NewsletterSignup />

                    <Footer />
                </div>
                <Sidebar />
            </div>
        </>
    );
}

export default Home;