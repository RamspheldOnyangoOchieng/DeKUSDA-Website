import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import Dekusdamain from '../assets/Dekusdamain.jpg'
import Collettes from '../assets/Collettes.jpg'
import Bereans from '../assets/Bereans.jpg'
import Pilgrims from '../assets/Pilgrims.jpg'
import Fofanas from '../assets/Fofanas.jpg'

import Dekusda3 from '../assets/Dekusda3.jpg'
import { Header } from '../components/Layout/Header'
import { Footer } from '../components/Layout/Footer'
import { Sidebar } from '../components/Layout/Sidebar'

export const Home = () => {
    const images = [
        Dekusdamain,
        Collettes,
        Bereans,
        Pilgrims,
        Fofanas,
    ];

    // Refs for navigation buttons
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <>
            <div className='flex'>
                <div className='w-[85%]'>
                    <Header />
                    
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
                            className="
                            xs:w-full
                            sm:
                            md:
                            lg:
                            xl:w-full xl:h-svh"
                        >
                            {images.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={image}
                                        alt={`Slide ${index + 1}`}
                                        className="
                                        w-full h-auto object-contain sm:h-auto sm:object-cover md:h-auto 
                                        lg:h-svh xl:h-svh transition-all duration-75
                                        "
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Custom Navigation Buttons (interactive) */}
                        <button
                            ref={prevRef}
                            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/40 
                            text-white p-2 rounded-full hover:bg-black/70 z-10"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            ref={nextRef}
                            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/40 
                            text-white p-2 rounded-full hover:bg-black/70 z-10"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    {/* --- Rest of your section --- */}
                    <section className='
                    xs:h-[40%] 
                    sm:h-[35%]
                    md:h-[35%]
                    lg:h-[26%]
                    xl:h-96 
                    bg-neutral-200'>
                        <div className='xs:block sm: md: lg:flex xl:flex'>

                            <div className='
                            xs:flex xs:justify-center
                            sm:flex sm:justify-center
                            md:flex md:justify-center
                            lg:ml-20
                            xl:ml-20 
                            pt-10'>
                                <img src={Dekusda3} alt="" className='
                                xs:h-32 xs:w-64 xs:-mt-2 xs:-ml-6
                                sm:h-40 sm:w-72 sm:-mt-2 sm:ml-14
                                md:h-44 md:w-80  md:-mt-2
                                lg:h-52 lg:w-96 lg:mt-4 lg:-ml-10
                                xl:h-52 xl:w-96 xl:mt-10 xl:ml-4' />
                            </div>

                            <div>
                                <p className='
                                xs:mt-6 xs:text-center
                                sm:
                                md:
                                lg:mt-14 lg:text-start
                                xl:mt-20 xl:text-start 
                                text-red-500 lg:ml-10 xl:ml-28 font-bold text-md'>
                                    A snippet of us
                                </p>

                                <p className='
                                xs:text-2xl xs:font-bold xs:ml-4 xs:text-center
                                sm:
                                md:
                                lg:ml-10 lg:text-start
                                xl:text-3xl xl:font-bold xl:ml-28 xl:text-start'>
                                    We Preach the Gospel in Every Sermon
                                </p>
                                <p className='
                                xs:text-center xs:py-2
                                sm:
                                md:
                                lg:ml-10 lg:text-start
                                xl:ml-28 xl:py-2 xl:text-start'>
                                    1st Thessalonians 4: 11-12
                                </p>

                                <div className='flex'>
                                    <div className='
                                    lg:h-20 lg:w-[0.15rem] lg:bg-neutral-400 lg:ml-10
                                    xl:h-20 xl:w-[0.15rem] xl:bg-neutral-400 xl:ml-28'>
                                    </div>
                                    <div>
                                        <p className='
                                        xs:ml-4
                                        sm:
                                        md:
                                        lg:
                                        xl:ml-6 
                                        overflow-visible text-neutral-500'>
                                            And that ye study to be quiet, and to do your own business, and to
                                            work with your own hands, as we commanded you; That ye may walk 
                                            honestly toward them that are without, and that ye may have lack of
                                            nothing.
                                        </p>
                                        <p className='
                                        xs:text-center
                                        sm:
                                        md:
                                        lg:
                                        xl:text-justify
                                        text-neutral-600 xl:ml-64'>
                                            (King James Version)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <Footer></Footer>
                </div>
                <Sidebar></Sidebar>
            </div>
        </>
    );
}
