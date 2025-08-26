import React, { useEffect, useState } from 'react';
import { Header } from "../../components/Layout/Header";
import { Footer } from "../../components/Layout/Footer";
import amo_alo1 from '../../assets/amo_alo1.jpg';
import amo_alo2 from '../../assets/amo_alo2.jpg';
import amo_alo3 from '../../assets/amo_alo3.jpg';
import amo_alo4 from '../../assets/amo_alo4.jpg';
import amo_alo5 from '../../assets/amo_alo5.jpg';
import helpingHand from '../../assets/helpingHand.jpg';
import support from '../../assets/support.jpg';

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

const AMO_ALO = () => {
  const Text = 'AMO ALO DEPARTMENT';
  const typedMessage = useTypingEffect(Text, 120);
  return (
    <>
      <Header />

      <div className="bg-blue-900 text-white text-center py-4">
        <h1 className="text-3xl md:text-4xl font-bold">{typedMessage}</h1>
        <p className="italic text-lg mt-1">"Building Faith, Deepening Fellowship, Sharing Hope"</p>
      </div>

      <div className="md:flex xl:flex my-4">
        <p className="xs:ml-10 xs:w-[400px] sm:w-[550px] sm:ml-16 md:ml-10 md:w-[400px] lg:w-[500px] lg:ml-20 xl:w-[400px] xs:mt-6 xl:ml-40 xl:mt-16"><span className='text-3xl font-bold'>The AMO/ALO department is a ministry that embraces and upholds the health message</span> — not only focusing on the spiritual and mental well-being, but also on the social lives of members. From Sabbath excursions to fun days and interactive outings, this department creates a blissful atmosphere that nurtures unity and joy among believers.</p>
        <img src={amo_alo1} alt="" className="xs:h-80 xs:w-[300px] xs:mt-4 xs:ml-20 sm:ml-44 md:ml-6 xl:h-96 xl:w-[500px] lg:ml-10 xl:ml-20"/>
      </div>

      <div className='xs:h-[1140px] sm:h-[850px] xl:h-[850px] bg-gradient-to-r from-softGray/10 to-darkBlue '>
        <p className='flex justify-center text-3xl font-georgia text-primaryBlue pt-6'>OUR ACTIVITIES</p>

        <div className='sm:flex xl:flex mb-6'>
          <img src={amo_alo2} alt="" className='h-60 w-60 xs:ml-24 sm:ml-10 md:ml-16 xl:ml-20 rounded-full'/>
          <p className='bg-white px-2 py-2 border border-l-4 border-softGray rounded-lg 
          xs:w-[400px] xs:ml-6 xs:mt-4 xs:h-[90px] sm:w-[300px] sm:h-[120px] sm:mt-12 lg:w-[450px] lg:h-[70px] lg:mt-20 xl:w-[500px] xl:h-[70px] xl:ml-10 xl:mt-16'><span className='font-bold'>Excursions after Sabbath:</span> Reflecting on the message of the Sabbath and uplifting one another for the coming week.</p>
        </div>

        <div className='sm:flex xl:flex mb-6'>
          <img src={amo_alo3} alt="" className='h-60 w-60 xs:ml-24 sm:ml-10 md:ml-44 lg:ml-60 xl:ml-96 rounded-full'/>
          <p className='bg-white px-2 py-2 border border-l-4 border-softGray rounded-lg xs:w-[400px] xs:ml-6 xs:mt-4 xs:h-[70px] sm:w-[300px] sm:h-[90px] sm:mt-12 lg:w-[450px] lg:h-[70px] lg:mt-20 xl:mt-16 xl:w-[500px] xl:h-[70px] xl:ml-10'><span className='font-bold'>Fun Days: </span>Interactive games and bonding activities held in school grounds.</p>
        </div>

        <div className='sm:flex xl:flex mb-6'>
          <img src={amo_alo4} alt="" className='h-60 w-60 xs:ml-24 sm:ml-10 lg:ml-20 xl:ml-20 rounded-full'/>
          <p className='bg-white px-2 py-2 border border-l-4 border-softGray rounded-lg xs:w-[400px] xs:ml-6 xs:mt-4 xs:h-[70px] sm:w-[300px] sm:h-[90px] sm:mt-12 lg:w-[450px] lg:h-[70px] lg:mt-20 xl:mt-16 xl:w-[500px] xl:h-[70px] xl:ml-10'><span className='font-bold'>Social Sundays:</span>Visiting places like hills, waterfalls, nature trails — promoting fellowship and evangelism.</p>
        </div>

      </div>

      <div className='xs:h-auto xs:pb-4 lg:flex xl:flex bg-softGray/10'>
        <img src={amo_alo5} alt="" className='h-80 w-80 xs:pt-6 xs:ml-16 sm:ml-40 md:ml-56 lg:ml-20 xl:ml-60 xl:my-6'/>
        <div className='xs:ml-4 xs:mt-4 sm:ml-32 md:ml-48 lg:ml-10 lg:mt-6 xl:ml-10 xl:mt-10'>
          <p className='xs:w-[400px] xl:w-[600px] italic'>Due to rising cases of relationship abuse, AMO/ALO conducts Bible-based seminars that teach members how to build healthy romantic relationships.</p>

          <p className='w-[420px] h-[50px] bg-white border border-l-4 border-softGray rounded-lg p-2 my-4'>Separate mentorship sessions for ladies and gents</p>

          <p className='w-[420px] h-[50px] bg-white border border-l-4 border-softGray rounded-lg p-2 my-4'>Occasional merged sessions for unified understanding</p>

          <p className='w-[420px] h-[50px] bg-white border border-l-4 border-softGray rounded-lg p-2 my-4'>Centered on Biblical teachings and spiritual growth</p>
        </div>
      </div>

      <div className='my-10'>
        <p className='text-3xl font-georgia flex justify-center text-primaryBlue'>Humanitarian Efforts</p>
        <p className='flex justify-center italic mb-4'>Our mission extends to the community and church through:</p>
        <div className='lg:flex xl:flex'>
          <div className='flex'>
            <img src={helpingHand} alt="" className='xs:h-60 xs:w-52 xl:h-60 xl:w-80 xs:ml-4 sm:ml-20 
            md:ml-40 lg:ml-20 xl:ml-32'/>
            <p className='w-[200px] italic ml-4 mt-20'>Visiting children's homes to lend a helping hand</p>
          </div>

          <div className='flex'>
            <img src={support} alt="" className='xs:h-60 xs:w-52 xs:mt-2 sm:ml-20 md:ml-40 lg:ml-10 xl:h-60 xl:w-80 ml-4'/>
            <p className='w-[200px] italic ml-4 mt-20'>Supporting members in need (e.g. school fees, rent)</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AMO_ALO;
