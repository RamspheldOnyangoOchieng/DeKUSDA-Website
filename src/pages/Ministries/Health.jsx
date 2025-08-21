import React, { useEffect, useState } from 'react';
import { Header } from '../../components/Layout/Header';
import { Footer } from '../../components/Layout/Footer';
import Food1 from '../../assets/Food1.jpg';
import Food2 from '../../assets/Food2.jpg';
import Food3 from '../../assets/Food3.jpg';
import Food4 from '../../assets/Food4.jpg';
import Food5 from '../../assets/Food5.jpg';
import HealthyEating from '../../assets/HealthyEating.jpg'

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

const HealthClassSection = () => {
  const healthText = 'HEALTH CLASS MINISTRY';
  const typedMessage = useTypingEffect(healthText, 120);

  return (
    <>
      <Header />

      {/* Full-width title bar */}
      <div className='xs:ml-8 sm:ml-10 lg:flex lg:ml-20 xl:flex xl:ml-40'>
        <div>
          <p className='
          text-xs font-bold text-primaryBlue/50 
          xs: mt-10
          sm:mt-8 
          md:mt-10
          lg:mt-20
          xl:mt-20'
          >SOUND DIET, SOUND MIND</p>
          <p className='xs:text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl font-bold mt-2'>Eating well helps mental health,</p>
          <p className='xs:text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl font-bold'>and a healthy mind helps you make</p>
          <p className='xs:text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl font-bold'>wise dietary choices.</p>
          <p className='mt-2'>Eating a variety of fruits, vegetables, proteins, and whole grains.</p>
          <p>Drinking enough water.</p>
        </div>
        <div>
          <img src={HealthyEating} alt="" className='h-96 w-80 lg:ml-10 xl:ml-20'/>
        </div>
      </div>
      <div className="bg-blue-900 text-white text-center py-4">
        <h1 className="text-3xl md:text-4xl font-bold">{typedMessage}</h1>
      </div>

      <section className="w-full bg-white py-12 px-4 md:px-16 text-gray-800">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Mission Paragraph */}
          <p className="text-lg leading-relaxed">
            Through our regular <strong>Health Class</strong> sessions—a platform created for learning about healthy living, disease prevention, lifestyle reform, and mental health awareness—our mission is to educate, empower, and inspire members to take responsibility for their health as a sacred duty. We aim to present Christ and use <strong>Christ's method alone</strong>, leading souls to behold the Lamb of God that taketh away the sin of the world.
          </p>

          {/* Spirit of Prophecy Quote */}
          <blockquote className="bg-blue-100 border-l-4 border-blue-700 px-6 py-4 rounded-lg italic text-blue-800">
            True healing begins with God. <br />
            <strong>"Christ is the wellspring of life."</strong> That which many need is to have a clearer knowledge of Him; they need to be patiently and kindly, yet earnestly, taught how the whole being may be thrown open to the healing agencies of heaven.
            <div className="mt-2 text-sm text-right">– Ministry of Healing, p. 247.2</div>
          </blockquote>

          {/* Bible Verse */}
          <div className="text-lg font-semibold italic text-center text-blue-800">
            “Beloved, I wish above all things that thou mayest prosper and be in health, even as thy soul prospereth.”<br />
            <span className="text-sm text-gray-600">– 3 John 1:2</span>
          </div>

          {/* Closing Paragraph */}
          <p className="text-lg leading-relaxed">
            By grasping and incorporating the Health Message and applying it in our lives, <strong>doors shall be opened for the advancement of the cause of God.</strong>
          </p>
        </div>

        <div className='bg-lightBlue sm:h-[300px] md:h-[300px] lg:h-[350px] xl:h-[500px] mt-10 border flex items-center justify-center'>
            <div className='grid grid-cols-5'>
              <img src={Food1} alt="" className='
              sm:h-44 sm:w-28 sm:mr-2 
              md:h-44 md:w-28 md:mr-2
              lg:h-72 lg:w-40 lg:mr-2
              xl:h-80 xl:w-52 xl:mr-4'/>
              <img src={Food2} alt="" className='
              sm:h-44 sm:w-28 
              md:h-44 md:w-28 md:mr-2
              lg:h-72 lg:w-40 lg:mr-2
              xl:h-80 xl:w-52'/>
              <img src={Food3} alt="" className='
              sm:h-44 sm:w-28 
              md:h-44 md:w-28 md:mr-2
              lg:h-72 lg:w-40 lg:mr-2
              xl:h-80 xl:w-52'/>
              <img src={Food4} alt="" className='
              sm:h-44 sm:w-28 
              md:h-44 md:w-28 md:mr-2
              lg:h-72 lg:w-40 lg:mr-2
              xl:h-80 xl:w-52'/>
              <img src={Food5} alt="" className='
              sm:h-44 sm:w-28 
              md:h-44 md:w-28 md:mr-2
              lg:h-72 lg:w-40 lg:mr-2
              xl:h-80 xl:w-52'/>
            </div>
        </div>

      </section>

      <Footer />
    </>
  );
};

export default HealthClassSection;
