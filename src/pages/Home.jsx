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
import Mission from '../assets/mission2.jpeg';

import { Footer } from '../components/Layout/Footer';
import { Header } from '../components/Layout/Header';
import { Sidebar } from '../components/Layout/Sidebar';

export const Home = () => {
    const slides = [
        {
            image: Dekusdamain,
            title: "DEKUSDA Family",
            ctaLink: "/Aboutdekusda"
        },
        {
            image: Collettes,
            title: "Collettes",
            ctaLink: "/Music/ChurchChoir"
        },
        {
            image: Bereans,
            title: "Bereans",
            ctaLink: "/Ministries/PersonalMinistries"
        },
        {
            image: Pilgrims,
            title: "Pilgrims",
            ctaLink: "/Evangelism/PCM"
        },
        {
            image: Fofanas,
            title: "Fofana",
            ctaLink: "/About/AboutSDA"
        },
        {
            image: Mission,
            title: "Mission Emphasis",
            ctaLink: "/About/Mission"
        }
    ];
    

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
                            autoplay={{ delay: 6000, disableOnInteraction: false }}
                            loop
                            onSwiper={(swiper) => {
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
                            className="xs:w-full sm: md: lg: xl:w-full xl:h-svh"
                        >
                            {slides.map((slide, index) => (
                             <SwiperSlide key={index}>
                             <div className="w-full flex flex-col items-center justify-center px-4">
                               <div
                                 className={`w-full h-[70vh] mb-4 rounded-xl shadow-xl relative overflow-hidden ${
                                   slide.image === Mission
                                     ? 'bg-[url("/textures/dots.svg")] bg-repeat bg-cover bg-blend-overlay bg-white/60'
                                     : ''
                                 }`}
                               >
                                 <img
                                   src={slide.image}
                                   alt={`Slide ${index + 1}`}
                                   className={`w-full h-full rounded-xl transition-all duration-500 ${
                                     slide.image === Mission ? 'object-contain' : 'object-cover'
                                   }`}
                                 />
                               </div>
                           
                               {/* Title */}
                               <div className="text-center w-full flex flex-col items-center space-y-2">
                                 <h2 className="text-xl sm:text-2xl font-semibold text-white bg-gradient-to-r from-primaryBlue to-darkBlue px-6 py-2 rounded-full shadow-md">
                                   {slide.title}
                                 </h2>
                           
                                 {slide.title === "DEKUSDA Family" && (
                                   <button
                                     className="px-5 py-1.5 text-sm font-medium text-white bg-primaryBlue rounded-full hover:bg-darkBlue transition duration-300"
                                     onClick={() => window.location.href = slide.ctaLink}
                                   >
                                     Learn More
                                   </button>
                                 )}
                               </div>
                             </div>
                           </SwiperSlide>
                           

                         
                          

                            ))}
                        </Swiper>
                        

                        <button
                            ref={prevRef}
                            className="absolute z-10 p-3 text-white transition-all duration-300 transform -translate-y-1/2 rounded-full top-1/2 left-4 bg-darkBlue/60 hover:bg-darkBlue/80 hover:scale-110 backdrop-blur-sm"
                        >
                            &lt;
                        </button>
                        <button
                            ref={nextRef}
                            className="absolute z-10 p-3 text-white transition-all duration-300 transform -translate-y-1/2 rounded-full top-1/2 right-4 bg-darkBlue/60 hover:bg-darkBlue/80 hover:scale-110 backdrop-blur-sm"
                        >
                            &gt;
                        </button>
                    </div>

                    {/* Section 2: About Us Snapshot */}
                    <div className="w-full bg-white">
                        <div className="max-w-6xl mx-auto">
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

                            <div className="grid items-center gap-12 lg:grid-cols-2">
                                <div className="space-y-6">
                                    <p className="text-lg leading-relaxed text-softGray ml-6">
                                        <span className="font-bold text-darkBlue">DEKUSDA (Dedan Kimathi University Seventh-Day Adventist Church)</span> is a vibrant, student-led church located in the heart of Dedan Kimathi University. We are more than just a place of worship—we are a family rooted in Christ, driven by mission, and empowered by love.
                                    </p>
                                    
                                    <p className="text-lg leading-relaxed text-softGray ml-6">
                                        We exist to nurture spiritual growth, foster godly friendships, and equip students to be strong ambassadors for Christ both on and off-campus. From weekly worship services, engaging Bible studies, music ministries, and community outreach—we believe in holistic spiritual transformation.
                                    </p>
                                    
                                    <p className="text-lg leading-relaxed text-softGray ml-6">
                                        Everyone is welcome at DEKUSDA: students, staff, alumni, and the surrounding community. Join us as we journey together toward eternity, walking in truth, love, and the light of the everlasting Gospel.
                                    </p>

                                    <div className="grid grid-cols-2 gap-6 mt-8 md:grid-cols-4">
                                        <div className="text-center">
                                            <div className="mb-2 text-3xl font-bold text-primaryBlue">350+</div>
                                            <div className="text-sm text-softGray">Active Members</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="mb-2 text-3xl font-bold text-primaryBlue">13</div>
                                            <div className="text-sm text-softGray">Church Families</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="mb-2 text-3xl font-bold text-primaryBlue">3</div>
                                            <div className="text-sm text-softGray">Choir Groups</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="mb-2 text-3xl font-bold text-primaryBlue">47</div>
                                            <div className="text-sm text-softGray">Baptisms (2024)</div>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <button 
                                            className="px-8 py-3 font-semibold text-white transition-all duration-300 transform rounded-lg shadow-lg bg-primaryBlue hover:bg-darkBlue hover:scale-105"
                                            onClick={() => window.location.href = '/Aboutdekusda'}
                                        >
                                            Learn More About Our Church
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <div className="relative">
                                        <img 
                                            src={Dekusda3} 
                                            alt="DEKUSDA Church Family" 
                                            className="object-cover border-4 border-white rounded-full shadow-2xl w-80 h-80"
                                        />
                                        <a href="https://chat.whatsapp.com/ILydxcM2OmlDT4Z0egZhNu?mode=ac_c">
                                            <div className="absolute px-4 py-2 text-sm font-bold text-white rounded-full -bottom-4 -right-4 bg-primaryBlue hover:cursor-pointer">
                                                Join Our Family
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Weekly Schedule Snapshot */}
                    <div className="w-full bg-gradient-to-b from-lightBlue/50 to-primaryBlue/20">
                        <div className="max-w-6xl mx-auto">
                            <div className="mb-12 text-center">
                                <div className="flex items-center justify-center mb-4">
                                    <AiOutlineCalendar className="w-8 h-8 mr-3 text-primaryBlue mt-7" />
                                    <h2 className="text-4xl font-bold text-gray-800 mt-6">
                                        Our Weekly Worship & Fellowship Schedule
                                    </h2>
                                </div>
                                <p className="text-xl text-gray-600">
                                    "Consistent fellowship is key to spiritual growth. Come join us."
                                </p>
                            </div>

                            <div className="flex justify-center items-center">
                            <div className="p-4 mb-6 border-l-4 rounded-r-lg w-80 bg-white border-primaryBlue">
                                <div className="flex items-center">
                                    <AiOutlineInfoCircle className="w-6 h-6 mr-3  text-primaryBlue/50" />
                                    <p className="font-medium text-darkBlue">
                                        This is a Music Sabbath week.
                                    </p>
                                </div>
                            </div>
                            </div>

                            <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
                                {/* Schedule cards remain the same as before */}
                                {/* ... */}
                            </div>

                            <div className="text-center">
                                <a 
                                    href="/assets/schedule.pdf" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center font-medium underline transition-colors text-primaryBlue hover:text-darkBlue mb-6"
                                >
                                    <AiOutlineDownload className="w-5 h-5 mr-2" />
                                    📥 Download Full Semester Schedule (PDF)
                                </a>
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
                                        Prayer Requests
                                    </h2>
                                </div>
                                <p className="text-xl text-softGray">
                                    "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God." - Philippians 4:6
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Prayer Form */}
                                <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-primaryBlue">
                                    <h3 className="text-2xl font-bold text-darkBlue mb-6">Submit Your Request</h3>
                                    <form className="space-y-4">
                                        <div>
                                            <label className="block text-gray-700 mb-2">Your Name (Optional)</label>
                                            <input 
                                                type="text" 
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mt-6">Prayer Request*</label>
                                            <textarea 
                                                rows="5"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent"
                                                required
                                            ></textarea>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="checkbox" id="public-request" className="mr-2" />
                                            <label htmlFor="public-request" className="text-gray-700">
                                                Share this request publicly on our prayer wall
                                            </label>
                                        </div>
                                        <button 
                                            type="submit"
                                            className="w-full py-3 bg-primaryBlue text-white rounded-lg hover:bg-darkBlue transition-colors font-semibold"
                                        >
                                            Submit Prayer Request
                                        </button>
                                    </form>
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
                            <div className="mt-12 bg-lightBlue/70 p-6 rounded-xl text-center">
                                <h3 className="text-xl font-bold text-darkBlue mb-2">Join Our Prayer Chain</h3>
                                <p className="text-gray-800/90 mb-4">Commit to praying for requests daily</p>
                                <button className="px-6 py-2 bg-primaryBlue text-white rounded-lg hover:bg-darkBlue transition-colors">
                                    Sign Up for Prayer Chain
                                </button>
                            </div>
                        </div>
                    </div>

                    <Footer />
                </div>
                <Sidebar />
            </div>
        </>
    );
}

export default Home;