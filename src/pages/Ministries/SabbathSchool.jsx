import React, { useEffect, useState } from 'react';
import { Header } from '../../components/Layout/Header';
import { Footer } from '../../components/Layout/Footer';
import Sabbath from '../../assets/Sabbath.jpg';
import SabbathImage1 from '../../assets/SabbathImage1.jpg';
import SabbathImage2 from '../../assets/SabbathImage2.jpg';
import SabbathImage3 from '../../assets/SabbathImage3.jpg';
import SabbathImage4 from '../../assets/SabbathImage4.jpg';

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

const SabbathSchool = () => {
  const SabbathText = 'SABBATH SCHOOL DEPARTMENT';
  const typedMessage = useTypingEffect(SabbathText, 120);
  return (
    <>
      <Header />

      {/* Full-width title bar */}
      <div className="bg-blue-900 text-white text-center py-4">
        <h1 className="text-3xl md:text-4xl font-bold">{typedMessage}</h1>
        <p className="italic text-lg mt-1">"Building Faith, Deepening Fellowship, Sharing Hope"</p>
      </div>

      <div className='bg-softGray/10 xs:h-auto xs:pb-6 sm:pb-0'>
        <div className='sm:flex md:flex lg:flex xl:flex'>
          <img src={Sabbath} alt="" className='xs:w-full xs:h-[300px] sm:h-[250px] sm:w-[250px] md:h-[300px] md:w-[400px] xl:h-[300px] xl:w-[450px]'/>
          <div>
            <div className='xs:ml-4 xs:mt-2 sm:text-3xl sm:mt-6 md:mt-16 lg:text-3xl lg:ml-8 xl:text-3xl xl:ml-20 text-2xl font-georgia xl:mt-16'>Happy Sabbath!</div>
            <p className='xs:mx-4 lg:ml-8 xl:w-[500px] xl:ml-20 mt-2'>The Sabbath School Department of Dedan Kimathi University of Technology SDA Church is the heart of our spiritual growth and Bible study ministry. Rooted in the mission of the Seventh-day Adventist Church.</p>
          </div>  
        </div>
      </div>

      <div>
        <p className='font-georgia flex justify-center text-3xl my-6'>Our department seeks to:</p>
        <div className='lg:flex xl:flex xl:mx-40'>
          <div className='flex xs:mb-4 xs:ml-4'>
            <img src={SabbathImage1} alt="" className='xs:h-60 xs:w-40 sm:h-60 sm:w-72 md:h-60 md:w-72 lg:h-60 lg:w-44 xl:h-60 xl:w-44'/>
            <p className='ml-6 mt-20'>Teach the Word of God through interactive and relevant Bible study.</p>
          </div>

          <div className='flex xs:mb-4 xs:ml-4'>
            <img src={SabbathImage2} alt="" className='xs:h-60 xs:w-80 sm:h-60 sm:w-60 md:h-60 md:w-80 lg:h-60 lg:w-60 lg:ml-9 xl:h-60 xl:w-60'/>
            <p className='ml-6 mt-20'>Foster fellowship among members through heartfelt discussions and prayer.</p>
          </div>
        </div>

        <div className='lg:flex xl:flex xl:mx-40 xl:mt-10 xl:mb-20'>
          <div className='flex xs:mb-4 xs:ml-4 ml-4'>
            <img src={SabbathImage3} alt="" className='h-60 w-72'/>
            <p className='xs:ml-4 xl:ml-6 mt-20'>Promote mission locally and globally through giving and story sharing.</p>
          </div>

          <div className='flex xs:ml-4'>
            <img src={SabbathImage4} alt="" className='xs:h-60 xs:w-60 sm:h-60 sm:w-[350px] md:h-60 md:w-[350px] lg:h-60 lg:w-60 xl:h-60 xl:w-60'/>
            <p className='ml-6 mt-20'>Nurture spiritual maturity through prayer, discipleship, and Christ-centered programs.</p>
          </div>
        </div>

      </div>

      <div>
        <p className='font-georgia text-3xl flex justify-center xs:mt-4 xl:my-6'>Weekly Program</p>
      </div>

      <div className="p-6">
      <table className="xs:w-[400px] sm:w-[600px] md:w-[700px] md:ml-4 lg:w-[900px] lg:ml-10 xl:w-[1000px] xl:ml-36 border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2 bg-lightBlue">Day</th>
            <th className="border border-gray-400 px-4 py-2">Time</th>
            <th className="border border-gray-400 px-4 py-2 bg-lightBlue">Event</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-400 px-4 py-2" rowSpan={3}>Sabbath</td>
            <td className="border border-gray-400 px-4 py-2 bg-lightBlue">7:50 – 8:20 AM</td>
            <td className="border border-gray-400 px-4 py-2">Morning Prayer</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">8:20 – 9:00 AM</td>
            <td className="border border-gray-400 px-4 py-2 bg-lightBlue">General Program – Welcome, Songs, Announcements
              – Devotion & Mission Story
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2 bg-lightBlue">9:00 – 10:00 AM</td>
            <td className="border border-gray-400 px-4 py-2">Lesson Study in Classes
              – Adult Lesson Guide Only
              – Happy Class for unbaptized members
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2 bg-lightBlue">Mid-week</td>
            <td className="border border-gray-400 px-4 py-2"> 4:30 - 6:00 PM</td>
            <td className="border border-gray-400 px-4 py-2 bg-lightBlue">Lesson harmonisation— an interactive time to      explore the week's topic in detail, align insights, and prepare spiritually for Sabbath.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className='xs:mx-4 xs:pb-6 xl:h-[200px] xl:w-[1200px] xl:ml-16 mt-10 mb-10 bg-softGray/10 rounded-lg border border-l-8 border-l-softGray'>
      <p className='font-georgia text-3xl xs:ml-2 sm:ml-10 xl:flex xl:justify-center my-6'>A Welcome Message from the Superintendant</p>
      <p className='px-6 italic'>"Welcome to Sabbath School at DeKUT SDA Church! Whether you're new or returning, there's a space here for you—to learn, to share, and to grow. As young people navigating faith in a university environment, we need each other—and we need the Word of God even more. Come study with us, pray with us, and let's prepare together for the soon return of Jesus."</p>
    </div>

      <Footer />
    </>
  );
};

export default SabbathSchool;
