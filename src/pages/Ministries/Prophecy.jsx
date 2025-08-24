import React, { useEffect, useState } from 'react';
import { Header } from "../../components/Layout/Header";
import { Footer } from "../../components/Layout/Footer";
import ProphesyImage1 from '../../assets/ProphesyImage1.jpg';
import ProphesyImage2 from '../../assets/ProphesyImage2.jpg';
import ProphesyImage3 from '../../assets/ProphesyImage3.jpg';
import ProphesyImage4 from '../../assets/ProphesyImage4.jpg';

const useTypingEffect = (text, speed = 100) => {
  const [displayedText, setDisplayedText] = useState('');
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;
      if (index === text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return displayedText;
};

const ProphecyDepartment = () => {
  const healthText = 'PROPHESY DEPARTMENT';
  const typedMessage = useTypingEffect(healthText, 120);
  return (
    <>
      <Header />

      <div className="bg-gray-100 py-12 px-4 md:px-20 min-h-screen font-sans text-gray-800">
        {/* Title with full-width background */}
        <div className="bg-blue-900 text-white text-center py-4 w-full mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">{typedMessage}</h1>
          <p className="italic text-lg">"Surely the Lord God will do nothing, but he revealeth his secret unto his servants the prophets." – Amos 3:7</p>
        </div>
        <div className='xs:ml-8 sm:ml-10 lg:flex lg:ml-20 xl:flex xl:ml-40'>
          <div>
            <p className='
            text-xs font-bold text-primaryBlue/50 
            xs: mt-10
            sm:mt-8 
            md:mt-10
            lg:mt-20
            xl:mt-20'
            >THE NATURE OF PROPHESY</p>
            <p className='xs:text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl font-bold mt-2'>A Message of Foresight, Guidance,</p>
            <p className='xs:text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl font-bold'>and Spiritual Insight</p>
            <p className='mt-2'>Prophecy is more than simply predicting the future.</p>
            <p>It is about communicating divine truth.</p>
          </div>
          <div>
            <img src={ProphesyImage1} alt="" className='h-96 w-80 xs:mt-2 lg:ml-10 xl:ml-20'/>
          </div>
        </div>
      </div>

      <div className='md:flex xl:flex'>
        <div>
          <img src={ProphesyImage2} alt="" className='xs:h-60 xs:w-60 xs:my-10 xs:flex xs:ml-24 sm:ml-44
           md:ml-10 lg:h-64 lg:w-64 xl:h-80 xl:w-80 xl:ml-32 xl:my-10 rounded-full'/>
        </div>

        <div className='xs:ml-4 xs:mb-4 lg:my-6 xl:mt-10 xl:ml-16'>
          <p className='text-3xl font-georgia'>Aims</p>
          <p className='bg-softGray/10 border border-l-4 border-softGray xs:w-[400px] sm:w-[600px] md:w-[400px] lg:w-[600px] xl:w-[600px] rounded-lg px-2 py-1 mt-4 italic'>To promote the study of Bible prophecy (Daniel, Revelation, and more).</p>

          <p className='bg-softGray/10 border border-l-4 border-softGray xs:w-[400px] sm:w-[600px] md:w-[400px] lg:w-[600px] xl:w-[600px] rounded-lg px-2 py-1 mt-4 italic'>To help members recognize signs of the times and their relevance to daily Christian life.</p>

          <p className='bg-softGray/10 border border-l-4 border-softGray xs:w-[400px] sm:w-[600px] md:w-[400px] lg:w-[600px] xl:w-[600px] rounded-lg px-2 py-1 mt-4 italic'>To encourage watchfulness, spiritual growth, and faithfulness in preparation for the Second Coming.</p>

          <p className='bg-softGray/10 border border-l-4 border-softGray xs:w-[400px] sm:w-[600px] md:w-[400px] lg:w-[600px] xl:w-[600px] rounded-lg px-2 py-1 mt-4 italic'>To equip the church and community with truth, discernment, and hope through prophecy seminars, Bible studies, and outreach.</p>
        </div>
      </div>

      <div className='lg:flex xl:flex bg-softGray/10'>
        <div>
          <img src={ProphesyImage3} alt="" className='xs:h-60 xs:w-60 xs:pt-10 xs:ml-24 sm:ml-48 md:h-72 md:w-72 md:ml-64 lg:h-64 lg:w-64 lg:ml-6 xl:h-80 xl:w-80 xl:ml-32 xl:my-10'/>
        </div>

        <div className='xs:mt-4 xs:ml-6 xs:pb-4 md:ml-2 lg:ml-14 xl:mt-10 xl:ml-16'>
          <p className='text-3xl font-georgia'>Does Prophesy matter?</p>
          <p className='italic text-primaryBlue my-2'>It is evident that the world we live in is broken. Is there hope? Yes, there is hope. Through Bible prophecy, we receive:</p>

          <div className='flex mt-4 gap-x-2'>
            <div className='xs:w-[200px] sm:w-[300px] md:w-[370px] lg:w-[350px] xl:w-[380px] bg-white border border-l-4 border-softGray rounded-lg px-3 py-6 italic'>“The Revelation of Jesus Christ, which God gave unto him, to shew unto his servants things which must shortly come to pass...” — Revelation 1:1</div>

            <div className='xs:w-[200px] sm:w-[300px] md:w-[370px] lg:w-[350px] xl:w-[380px] bg-white border border-l-4 border-softGray rounded-lg px-3 py-6 italic'>“Blessed is he that readeth, and they that hear the words of this prophecy, and keep those things which are written therein.” — Revelation 1:3</div>
          </div>

        </div> 
      </div>

      <div className='md:flex md:my-6 xl:flex'>
        <div>
          <img src={ProphesyImage4} alt="" className='xs:h-60 xs:w-60 xs:my-10 xs:flex xs:ml-24 sm:ml-44 md:ml-10 lg:h-64 lg:w-64 xl:h-80 xl:w-80 xl:ml-32 xl:my-10 rounded-full'/>
        </div>

        <div className='xs:ml-4 xs:mb-4 xl:mt-10 xl:ml-16'>
          <p className='text-3xl font-georgia'>What We Do</p>
          <p className='bg-softGray/10 border border-l-4 border-softGray xs:w-[400px] md:w-[400px] sm:w-[600px] lg:w-[600px] xl:w-[600px] rounded-lg px-2 py-1 mt-4 italic'>Weekly or monthly prophecy study sessions</p>

          <p className='bg-softGray/10 border border-l-4 border-softGray xs:w-[400px] sm:w-[600px] md:w-[400px] lg:w-[600px] xl:w-[600px] rounded-lg px-2 py-1 mt-4 italic'>End-time prophecy studies</p>

          <p className='bg-softGray/10 border border-l-4 border-softGray xs:w-[400px] sm:w-[600px] md:w-[400px] lg:w-[600px] xl:w-[600px] rounded-lg px-2 py-1 mt-4 italic'>Interactive sessions on current world events in light of prophecy</p>

          <p className='bg-softGray/10 border border-l-4 border-softGray xs:w-[400px] sm:w-[600px] md:w-[400px] lg:w-[600px] xl:w-[600px] rounded-lg px-2 py-1 mt-4 italic'>Support for youth and new believers in understanding difficult prophetic symbols</p>

          <p className='bg-softGray/10 border border-l-4 border-softGray xs:w-[400px] sm:w-[600px] md:w-[400px] lg:w-[600px] xl:w-[600px] rounded-lg px-2 py-1 mt-4 italic'>Community outreach with literature and media</p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProphecyDepartment;
