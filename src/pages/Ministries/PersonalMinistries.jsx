import React, { useEffect, useState } from 'react';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import Foundation1 from '../../assets/Foundation1.jpg';
import Foundation2 from '../../assets/Foundation2.jpg';
import MinistryImage1 from '../../assets/MinistryImage1.jpg';
import MinistryImage2 from '../../assets/MinistryImage2.jpg';
import MinistryImage3 from '../../assets/MinistryImage3.jpg';
import MinistryImage4 from '../../assets/MinistryImage4.jpg';
import MinistryImage5 from '../../assets/MinistryImage5.jpg';
import MinistryImage6 from '../../assets/MinistryImage6.jpg';

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

export const PersonalMinistries = () => {
  const healthText = 'PERSONAL MINISTRY';
  const typedMessage = useTypingEffect(healthText, 120);

  // List of families for Bible study meetings
  const families = [
    "Sentinels Family",
    "Fountain of Life Family",
    "Doves Family",
    "House of Bread Family",
    "Heralds Family",
    "Pillars of Truth Family",
    "Royals Family",
    "House of Bread Family",
    "Peniel Family",
    "Pearls Family ",
    "Goshen Family ",
    "Town Estate Family" // New family added here
  ];

  return (
    <>
      <Header />

      <div className="min-h-screen text-gray-800 bg-gray-100">
        <header className="p-6 text-white bg-blue-900 shadow-md">
          <h1 className="text-4xl font-bold text-center">{typedMessage}</h1>
          <p className="mt-2 text-lg text-center">
            Empowering Every Member to Share the Gospel
          </p>
        </header>

        <div className='xs:ml-8 sm:ml-10 lg:flex lg:ml-20 xl:flex xl:ml-40'>
          <div>
            <p className='
            text-xs font-bold text-primaryBlue/50 
            xs: mt-10
            sm:mt-8 
            md:mt-10
            lg:mt-20
            xl:mt-20'
            >EMPOWERED TO SERVE</p>
            <p className='xs:text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl font-bold mt-2'>Personal Ministries as a Call to Witness,</p>
            <p className='xs:text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl font-bold'>and Disciple Others</p>
            <p className='mt-2'>To make every believer a missionary in their daily life.</p>
            <p>To strengthen personal spiritual growth through service.</p>
          </div>
          <div>
            <img src={MinistryImage1} alt="" className='h-96 w-80 xs:mt-4 lg:ml-10 xl:ml-20'/>
          </div>
        </div>

        <div className='md:flex xl:flex bg-softGray/50 xl:pl-20 py-6'>
          <div>
            <img src={MinistryImage2} alt="" className='w-60 h-60 xs:ml-24 sm:ml-48 md:ml-10'/>
          </div>

          <div className='xs:ml-2 xl:ml-20 xl:mt-10'>
            <p className='text-3xl font-bold mt-2 xs:flex xs:justify-center sm:flex sm:justify-center xl:ml-4'>What is Personal Ministries?</p>
            <p className='xs:w-[420px] sm:w-[600px] sm:ml-4 md:w-[400px] md:ml-8 lg:w-[700px] xl:w-[600px] italic'>Personal Ministries is the heartbeat of the Seventh-day Adventist Church's mission. It empowers every member to participate in sharing the gospel, echoing the call of Christ to make disciples of all nations (Matthew 28:19). This article explores the purpose, methods, and relevance of Personal Ministries in today's world.</p>
          </div>
        </div>

        <div className='my-10'>
          <div className='text-3xl flex justify-center mb-4 font-bold'>Biblical Foundation</div>

          <div className='sm:ml-16 md:flex md:ml-10 lg:ml-16 xl:flex gap-2 xl:ml-44'>
            <div className='xs:w-[500px] xs:h-[500px] sm:w-[500px] sm:h-[500px] md:w-[350px] md:h-[570px] 
            lg:w-[450px] lg:h-[520px] xl:w-[500px] xl:h-[500px] bg-softGray/10 xs:mb-4'>
              <img src={Foundation1} alt=""  className='h-80 w-[500px]'/>
              <p className='mt-4 mx-4 italic'>Personal ministry is a facet of the church whose origin can be traced to the Old Testament times of the patriarchs, prophets, judges and kings. In the New Testament it is seen in Christ's example to the early church in Acts all the way to the beginning of Seventh-day Adventist® history in the 1860s. Today it has broadened to also incorporate online evangelism.</p>
            </div>

            <div className='xs:w-[500px] xs:h-[500px] sm:w-[500px] sm:h-[500px] md:w-[350px] md:h-[570px] 
            lg:w-[450px] lg:h-[520px] xl:w-[500px] xl:h-[500px] bg-softGray/10 xs:mb-4'>
              <img src={Foundation2} alt="" className='h-80 w-[500px]'/>
              <p className='mt-4 mx-4 italic'>Did you know, it's personal ministries that herald the spreading of the Gospel in the days of the Apostles? It was greatly accompanied by the outworking of the Holy Spirit. History will repeat itself in the closing work of the Great commission with the outpouring of the Latter rain on the Remnant church of God.</p>
            </div>
          </div>
        </div>

        <div className='xl:py-6'>
          <p className='text-3xl flex justify-center font-bold mb-10 '>Purpose and Vision</p>

          <div className='lg:ml-32 xl:ml-20'>

            <div className='lg:flex xl:flex'>
              <div>
                <div className='xl:flex mb-4'>
                  <img src={MinistryImage3} alt="" className='xs:h-60 xs:w-60 xs:ml-24 sm:ml-48 md:h-60 md:w-80 md:ml-60 lg:ml-0 lg:h-60 lg:w-96 xl:h-80 xl:w-60 xl:ml-2'/>
                  <p className='xs:px-2 xs:mt-2 lg:w-[400px] xl:w-[300px] xl:ml-6 xl:mt-0'>Personal Ministries endeavors to inspire, motivate, equip, train, and mobilize all members for dynamic Christian service with the conviction that "The church of Christ is organized for service" (Ministry of Healing, p. 148) and 
                    <span className='italic text-primaryBlue'>"Every son and daughter of God is called to be a missionary; we are called to the service of God and our fellow men"</span>(The Ministry of Healing, p. 395).
                  </p>
                </div>

                <div className='xl:flex'>
                  <img src={MinistryImage4} alt="" className='xs:h-60 xs:w-60 xs:ml-24 sm:ml-48 md:h-60 md:w-80 md:ml-60 lg:ml-0 lg:h-60 lg:w-96 xl:h-80 xl:w-60 xl:ml-2'/>
                  <p className='xs:px-2 xs:mt-2 xs:mb-4 lg:w-[400px] xl:w-[300px] xl:ml-6 xl:mt-0'><span className='text-xl'>Our purpose:</span><span className='italic text-primaryBlue'>"To enlist every member in active soul-winning service for God."</span> — SDA Church Manual</p>
                </div>
              </div>

              <div className='ml-4'>
                <div className='xl:flex mb-4'>
                  <img src={MinistryImage5} alt="" className='xs:h-60 xs:w-60 xs:ml-24 sm:ml-48 md:h-60 md:w-80 md:ml-60 lg:ml-0 lg:h-60 lg:w-96 xl:h-80 xl:w-60 xl:ml-6'/>
                  <p className='xs:px-2 xs:mt-2 lg:w-[400px] xl:w-[300px] xl:ml-6 xl:mt-0'><span className='italic text-primaryBlue'>"Christ's method alone will give true success in reaching the people. The Savior mingled with people as one who desired their good. He showed sympathy for them, ministered to their needs, and won their confidence. Then He invited them, 'Follow Me.'"</span>— The Ministry of Healing, p.73</p>
                </div>

                <div className='xl:flex'>
                  <img src={MinistryImage6} alt="" className='xs:h-60 xs:w-60 xs:ml-24 sm:ml-48 md:h-60 md:w-80 md:ml-60 lg:ml-0 lg:h-60 lg:w-96 lg:mt-10 xl:h-80 xl:w-60 xl:ml-6 xl:mt-0'/>
                  <p className='xs:px-2 xs:mt-2 lg:w-[400px] xl:w-[300px] xl:ml-6 xl:mt-0'><span className='italic text-primaryBlue'>"We need to come close to the people by personal effort. If we would give less time to sermonizing and more time to personal ministry, greater results would be seen. The poor are to be relieved, the sick cared for, the sorrowing and the bereaved comforted, the ignorant instructed, the inexperienced counseled. We are to weep with those who weep and to rejoice with those who rejoice. Accompanied by the power of persuasion, the power of prayer, the power of the love of God, this work will not, cannot, be without fruit."</span> — The Ministry of Healing, p.73</p>
                </div>
              </div>
            </div>

            </div>
        </div>

        <main className="p-6 mx-auto space-y-10 max-w-5xl">

          {/* Family Bible Study Meetings */}
          <section>
            <h2 className="text-2xl font-semibold">Family Bible Study Meetings</h2>
            <p className="mt-2">
              We regularly hold family meetings for Bible study and fellowship at the following families:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {families.map((family, index) => (
                <div 
                  key={index} 
                  className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-3 text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-800">{family}</h3>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="mt-6 text-gray-600 italic">
              "For where two or three gather in my name, there am I with them." — Matthew 18:20
            </p>
          </section>

          {/* Conclusion */}
          <section>
            <h2 className="text-2xl font-semibold">Conclusion</h2>
            <blockquote className="pl-4 italic border-l-4 border-green-600">
              "Every true disciple is born into the kingdom of God as a missionary." — The Desire of Ages, p. 195
            </blockquote>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default PersonalMinistries;