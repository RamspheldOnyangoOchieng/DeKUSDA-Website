import React, { useEffect, useState } from 'react';
import { Header } from '../../components/Layout/Header';
import { Footer } from '../../components/Layout/Footer';
import ACallToMedicalEvangelism from '../../assets/A_Call_To_Medical_Evangelism.jpg';
import AdventistHome from '../../assets/AdventistHome.jpg';
import Books from '../../assets/Books.jpg';
import ChildGuidance from '../../assets/Child_Guidance.jpg';
import ChristObjectLessons from '../../assets/Christ_Object_Lessons.jpg';
import DesireofAges from '../../assets/Desire_of_Ages.jpg';
import HelpInDailyliving from '../../assets/Help_In_Daily_living.jpg';
import LastDayEvents from '../../assets/Last_Day_Events.jpg';
import MessagetoYoungPeople from '../../assets/Message_to_Young_People.jpg';
import ProphetsandKings from '../../assets/Prophets_and_Kings.jpg';
import StepstoChrist from '../../assets/Steps_to_Christ.jpg';
import TheGreatControversy from '../../assets/The_Great_Controversy.jpg';

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

const LiteratureMinistry = () => {
  const literatureText = 'LITERATURE MINISTRY DEPARTMENT';
  const typedMessage = useTypingEffect(literatureText, 120);
  return (
    <>
      <Header />

      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-primaryBlue to-darkBlue text-white py-8 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          {typedMessage}
        </h1>
        <p className="italic text-base md:text-lg max-w-3xl mx-auto">
          “Fulfilling the great commission through the printed page”
        </p>
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
                >BOOKS OF WISDOM:</p>
                <p className='xs:text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl font-bold mt-2'>Timeless Christian literature that</p>
                <p className='xs:text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl font-bold'>inspires faith, strengthens hope</p>
                <p className='xs:text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl font-bold'>and guides spiriual living</p>
                <p className='mt-2'>Life changing books</p>
                <p>Treasures of light</p>
              </div>
              <div>
                <img src={Books} alt="" className='h-96 w-80 lg:ml-10 xl:ml-20'/>
              </div>
            </div>

            <div className='grid xs:grid-cols-2 xs:ps-4 xs:h-[1700px] sm:pl-10 md:grid-cols-3 md:h-[1400px] 
            lg:h-[1100px] xl:grid-cols-3 w-full xl:h-[1000px] xl:px-20 mt-10 bg-softGray/10'>

              <div className='xs:w-[200px] lg:w-[270px] xl:w-[350px]'>
                <p className='text-2xl flex justify-center mt-2 font-georgia text-primaryBlue'>Vision</p>
                <p className='px-2 mt-2 italic'>To see every home, heart, and nation reached with the message of hope and salvation through Seventh-day Adventist literature.</p>
              </div>

              <div className='xs:w-[200px] lg:w-[270px] xl:w-[350px]'>
                <p className='text-2xl flex justify-center mt-2 font-georgia text-primaryBlue'>Mission</p>
                <p className='px-2 mt-2 italic'>To uplift Christ by equipping and mobilizing church members to share truth-filled literature that transforms lives for eternity.</p>
              </div>

              <div className='xs:w-[200px] lg:w-[270px] xl:w-[350px]'>
                <p className='text-2xl flex justify-center mt-2 font-georgia text-primaryBlue'>Who Are We?</p>
                <p className='px-2 mt-2 italic'>The Literature Ministry Department of Dedan Kimathi University of Technology SDA Church is part of a global network committed to evangelism through printed and digital materials.</p>

                <p className='px-2 mt-2 italic'>Inspired by the three angels’ message, we echo the global mission locally—providing gospel-centered resources for church members and the broader community.</p>
              </div>

              <div className='xs:w-[200px] lg:w-[270px] xl:w-[350px]'>
                <p className='text-2xl flex justify-center mt-2 font-georgia text-primaryBlue'>Historical Foundation</p>
                <p className='px-2 mt-2 italic'>The literature ministry dates back to the 1840s. Elder James White published The Present Truth in 1849, laying the foundation for Adventist publishing.</p>

                <p className='px-2 mt-2 italic'>DeKUT's literature ministry began in 2012 and continues through divine guidance, spreading the gospel one page at a time.</p>
                
                <p className='px-2 mt-2 italic'>“There is no better witness of Christ than the inspired text of scripture.”</p>
              </div>

              <div className='xs:w-[200px] lg:w-[270px] xl:w-[350px]'>
                <p className='text-2xl flex justify-center mt-2 font-georgia text-primaryBlue'>What We Do</p>
                <p className='px-2 mt-2 italic'>Literature Distribution: Books, tracts, magazines, and Bible studies sharing hope, health, and healing.</p>

                <p className='px-2 mt-2 italic'>Training and Empowerment: Equipping members to become literature evangelists in all walks of life.</p>

                <p className='px-2 mt-2 italic'>Evangelism Support: Partnering with other departments for outreach and mission events.</p>

                <p className='px-2 mt-2 italic'>Digital Access: Promoting online materials, QR codes, and social media outreach.</p>
              </div>

              <div className='xs:w-[200px] lg:w-[270px] xl:w-[350px]'>
                <p className='text-2xl flex justify-center mt-2 font-georgia text-primaryBlue'>Goals and Objectives</p>
                <p className='px-2 mt-2 italic'>•	Revive literature evangelism in the church.</p>
                <p className='px-2 italic'>•	Encourage all members to be literature missionaries.</p>
                <p className='px-2 italic'>•	Nurture spiritual growth through inspired writings.</p>
                <p className='px-2 italic'>•	Reach unreached communities with Christ-centred messages.</p>
                <p className='px-2 italic'>•	Support youth through summer literature programs.</p>
              </div>

              <div className='xs:w-[200px] lg:w-[270px] xl:w-[350px]'>
                <p className='text-2xl flex justify-center mt-2 font-georgia text-primaryBlue'>Why It Still Matters</p>
                <p className='px-2 mt-2 italic'>A printed book or tract can quietly speak to a soul when words cannot. This ministry remains one of the most effective outreach channels today.</p>

                <p className='px-2 mt-2 italic'>“If there is one work more important than another, it is that of getting our publications before the people.” — Ellen G. White, The Publishing Ministry, p. 385</p>
              </div>

              <div className='xs:w-[200px] lg:w-[270px] xl:w-[350px]'>
                <p className='text-2xl flex justify-center mt-2 font-georgia text-primaryBlue'>How You Can Get Involved</p>
                <p className='px-2 mt-2 italic'>•	Share a tract or book daily.</p>
                <p className='px-2 italic'>•	Volunteer for training or distribution workshops.</p>
                <p className='px-2 italic'>•	Support evangelists through prayer or donations.</p>
                <p className='px-2 italic'>•	Donate materials or help build the inventory.</p>
                <p className='px-2 italic'>•	Pray for open hearts in our community.</p>
              </div>

            </div>

            <div>
              <p className='font-georgia flex justify-center text-3xl text-primaryBlue mb-6 mt-10'>THE BOOKS WE READ</p>
              <div className='grid xs:grid-cols-2 sm:ml-14 md:grid-cols-3 md:ml-8 xl:grid-cols-5 lg:grid-cols-4 xl:ml-10 gap-y-4'>
                <img src={ACallToMedicalEvangelism} alt="" className='h-80 w-56' />
                <img src={AdventistHome} alt="" className='h-80 w-56' />
                <img src={ChildGuidance} alt="" className='h-80 w-56' />
                <img src={ChristObjectLessons} alt="" className='h-80 w-56'/>
                <img src={DesireofAges} alt="" className='h-80 w-56'/>
                <img src={HelpInDailyliving} alt="" className='h-80 w-56'/>
                <img src={LastDayEvents} alt="" className='h-80 w-56' />
                <img src={MessagetoYoungPeople} alt="" className='h-80 w-56' />
                <img src={ProphetsandKings} alt="" className='h-80 w-56'/>
                <img src={StepstoChrist} alt="" className='h-80 w-56'/>
                <img src={TheGreatControversy } alt="" className='h-80 w-56 mb-4'/>
              </div>
            </div>

      <Footer />
    </>
  );
};

export default LiteratureMinistry;