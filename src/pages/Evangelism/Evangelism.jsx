import React, { useEffect, useState } from 'react';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import SunsetImage from '../../assets/SunsetImage.jpg';
import Bible from '../../assets/Bible.jpg';
import Calling from '../../assets/Calling.jpg';
import Cross from '../../assets/Cross.jpg';
import Fruits from '../../assets/Fruits.jpg';
import BibleImage from '../../assets/BibleImage.jpg';

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

const Evangelism = () => {
  const evangelismText = 'EVANGELISM MINISTRY';
  const typedMessage = useTypingEffect(evangelismText, 120);
  return (
    <>
      <Header/>

      <div className='bg-primaryBlue w-full h-24 flex justify-center'>
        <p className='text-3xl text-white font-bold mt-6'>{typedMessage}</p>
      </div>

      <div className='xs:h-auto xs:pb-6 xl:h-96 w-full bg-lightBlue lg:flex xl:flex'>
        <div className='xs:pt-6 flex justify-center'>  
          <img src={SunsetImage} alt="" className='h-60 w-60 rounded-full border-white border-2 lg:ml-20 lg:mt-6 xl:ml-60 xl:mt-12' />
        </div>
        <div className='lg:ml-20 xl:ml-20'>
          <p className='xs:text-2xl xs:flex xs:justify-center sm:text-3xl lg:text-3xl xl:text-3xl font-bold mt-6 '>Evangelism Department Message</p>
          <div className='xs:px-4'>
            <p className='mt-3'>The Evangelism Department stands as a cornerstone of DeKUSDA Church,</p>
            <p>rooted deeply in both scripture and mission. Its origins are inspired</p>
            <p>by one of the most defining moments in the ministry of Jesus</p> 
            <p>Christ — His walk along the shores of the Sea of Galilee. It was there</p> 
            <p>that He paused to engage in a life-changing conversation with His disciples,</p> 
            <p>commissioning them with a calling that would evolve into what we now know</p> 
            <p>as The Great Commission.</p>
            <p className='mt-3'>His words on that fateful day have continued to echo in our hearts, inspiring</p>
            <p>us to rise above our trials and giving us hope in times when we might</p>
            <p>otherwise sink into despair and hopelessness.</p>
          </div>
        </div>
      </div>

      <div className='w-full xs:h-[900px] md:h-[780px] xl:h-[515px]'>
        <p className='font-georgia pt-4 flex justify-center xs:text-2xl xs:my-6 md:mb-4 lg:py-4 xl:text-3xl xl:my-4'>WHAT WE DO AS A DEPARTMENT</p>

        <div className='grid xs:grid-cols-2 xs:ml-6 xs:gap-y-2 md:grid-cols-2 md:ml-10 md:gap-y-4 lg:grid-cols-3 lg:ml-6 xl:grid-cols-4 xl:ml-20'>
          <div className='bg-softGray/10 xs:w-44 xs:h-[355px] md:w-80 md:h-[320px] lg:h-[330px] xl:w-64 xl:h-[410px]'>
            <img src={Bible} alt="" className='xs:h-28 xs:w-44 md:w-80 md:h-40 xl:h-48 xl:w-64'/>
            <div className='text-sm mt-4 px-4'>
              <div>
                <p>Scripture likens the Church to a body, with each part serving a unique function. Within this spiritual framework, the Evangelism Department embraces its sacred role with unwavering dedication.</p>
              </div>
            </div>
          </div>

          <div className='bg-softGray/10 xs:w-44 xs:h-[355px] md:h-[320px] md:w-80 lg:h-[330px] xl:w-64 xl:h-[410px]'>
            <img src={Cross} alt="" className='xs:h-28 xs:w-44 md:w-80 md:h-40 xl:h-48 xl:w-64'/>
            <div className='text-sm mt-4 px-4'>
              <div>
                <p>Our primary mission, as entrusted to us by Christ, is to “Go therefore and make disciples of all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Spirit.” (Matthew 28:19)</p>
              </div>
            </div>
          </div>

          <div className='bg-softGray/10 xs:w-44 xs:h-[425px] md:w-80 md:h-[330px] xl:w-64 xl:h-[410px]'>
            <img src={Calling} alt="" className='xs:h-28 xs:w-44 md:w-80 md:h-40 xl:h-48 xl:w-64'/>
            <div className='text-sm mt-4 px-4'>
              <div >
                <p>To fulfill this calling, we engage in multiple initiatives. Chief among them are weekly Bible study sessions designed not only to impart biblical knowledge but to cultivate a deep, personal relationship with Jesus Christ. Our goal is not merely to inform minds, but to transform hearts.</p>
              </div>
            </div>
          </div>

          <div className='bg-softGray/10 xs:w-44 xs:h-[425px] md:w-80 md:h-[330px] xl:w-64 xl:h-[410px]'>
            <img src={Fruits} alt="" className='xs:h-28 xs:w-44 md:w-80 md:h-40 xl:h-48 xl:w-64'/>
            <div className='text-sm mt-4 px-4'>
              <div>
                  <p>By God’s grace, this mission has borne much fruit as we have witnessed many members grow in faith, some even reaching the point of being baptized into the family of God.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className='w-full xs:h-auto xs:pb-6 md:h-auto md:pb-6 xl:h-[450px] bg-gradient-to-b from-lightBlue/50 to-primaryBlue/20 lg:flex xl:flex'>
          <div className='xs:w-full xl:ml-20 xl:w-[800px]'>
            <p className='text-3xl font-georgia xs:pt-6 xs:flex xs:justify-center xl:mt-10 mb-6'>Our Outreach Efforts</p>

            <div className='xs:px-4'>
              <p>As a department, we also organize annual mission trips with the goal of reaching individuals beyond the walls of our university. These missions have taken us to different parts of the country, and the impact has been monumental.
            </p>

            <p className='mt-2'>We have seen many people surrender their lives to Christ after hearing the powerful message of the gospel. This work has played a crucial role in preparing a people for the soon return of Christ.
            </p>

            <p className='mt-2 italic text-primaryBlue'>“If we in our own strength confide, our striving would be losing.” – Martin Luther
            </p>
            <p className='mt-2'>We echo this truth as a department: the success of our evangelistic campaigns is not the result of our own strength, intellect, or financial resources — it is entirely due to the faithfulness of our God.
            </p>

            <p className='mt-2'>And as He has promised to be with us to the end of the age, we move forward with confidence, knowing we have nothing to fear for the future.
            </p>
          </div>

        </div>

        <div>
          <img src={BibleImage} alt="" className='xs:h-80 xs:w-80 xs:ml-10 xs:mt-6 sm:h-80 sm:w-80 sm:ml-10 sm:mt-6 md:h-80 md:w-80 md:ml-10 md:mt-6 lg:h-72 lg:w-72 lg:mt-8 lg:ml-0 xl:h-80 xl:w-80 xl:ml-10 xl:mt-14'/>
        </div>
      </div>

      <section></section>
      <Footer />
    </>
  );
};

export default Evangelism;
