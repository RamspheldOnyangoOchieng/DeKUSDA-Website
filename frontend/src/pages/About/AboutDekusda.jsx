import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/Layout/Header';
import { Footer } from '../../components/Layout/Footer';
import { Sidebar } from '../../components/Layout/Sidebar';
import aboutService from '../../services/aboutService';
import bibleStudyImg from '../../assets/BIBLESTUDY.jpg';
import churchImage from '../../assets/church.jpeg';
import sdaLogo from '../../assets/dekusdalogo.jpg';
import choirImg from '../../assets/harmonization.jpg';
import instagramIcon from '../../assets/instagram.png';
import missionsImg from '../../assets/mission.jpg';
import youtubeIcon from '../../assets/youtube.png';
import './AboutDekusda.css';

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

export const AboutDekusda = () => {
  const [pageContent, setPageContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback content
  const fallbackContent = {
    welcome: { 
      title: 'WELCOME TO DEDAN KIMATHI UNIVERSITY(DeKUSDA)',
      content: '' 
    },
    about_us: {
      title: 'ABOUT US!',
      content: 'SDA Church Dedan Kimathi University is a vibrant Seventh-day Adventist congregation based in Kimathi. We are passionate about faith, fellowship, and community service.'
    },
    mission: {
      title: 'Mission',
      content: 'To make disciples of all people by proclaiming the everlasting gospel in the context of the three angel messages of <b>Revelation 14:6–12</b>, leading them to accept Jesus as their personal Savior, unite with the remnant church, nurturing them to serve Him as Lord, and preparing them for His soon return.'
    },
    vision: {
      title: 'Our Vision',
      content: 'Empowering Seventh-day Adventist students, professionals, the church, and healing the nation.'
    },
    purpose: {
      title: 'Our Purpose',
      content: '<ol type="A"><li>To assist students studying in Dedan Kimathi University of Technology (DEKUT) to resolve problems that negatively impact their Christian principles and lifestyles.</li><li>To promote a culture of continued learning in the Adventist church and community at large, embracing the principle of Christian education.</li><li>To create mechanisms for integrating and inducting students into the world of work.</li><li>To mobilize Adventist professionals for professional input to Adventist students in DEKUT, the church, and the community.</li></ol>'
    },
    activities: {
      title: 'Our Activities',
      content: '' // Will use the card layout as fallback
    },
    worship: {
      title: 'Worship with Us',
      content: 'Join us every <strong>Saturday (Sabbath)</strong> in KIMATHI UNIVERSITY around Student\'s Mess. Services begin at <strong>7:50 AM</strong>.'
    },
    location: {
      title: 'Where to Find Us',
      content: 'Dekusda church is located in DEDAN KIMATHI UNIVERSITY OF TECHNOLOGY in Nyeri County.'
    },
    contact: {
      title: 'Contact Us',
      content: '' // Will use the original layout as fallback
    }
  };

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        setLoading(true);
        const response = await aboutService.getPageContent('about_dekusda');
        
        if (response.status === 'success') {
          setPageContent(response.data);
        } else {
          console.warn('Failed to fetch about dekusda content, using fallback');
          setPageContent(fallbackContent);
        }
      } catch (error) {
        console.error('Error fetching about dekusda content:', error);
        setPageContent(fallbackContent);
        setError('Using fallback content');
      } finally {
        setLoading(false);
      }
    };

    fetchPageContent();
  }, []);

  // Get content with fallback
  const getContent = (sectionKey) => {
    return pageContent[sectionKey] || fallbackContent[sectionKey] || { title: '', content: '' };
  };

  const welcomeText = getContent('welcome').title || 'WELCOME TO DEDAN KIMATHI UNIVERSITY(DeKUSDA)';
  const typedWelcome = useTypingEffect(welcomeText, 120);

  return (
    <div>
      <div className='flex'>
        <div className='w-full lg:w-[85%]'>
          <Header />
          
          <div className="page-container about-dekusda-page">
            <div className="main-content">
              {/* Sidebar */}
              <aside className="sidebar">
                <img src={sdaLogo} alt="SDA Logo" className="sda-logo" />
                <h3>Quick Links</h3>
                <ul>
                  <li><a href="#who-we-are">Who We Are</a></li>
                  <li><a href="#vision">MISSION & VISION</a></li>
                  <li><a href="#activities">Activities</a></li>
                  <li><a href="#worship">Worship</a></li>
                  <li><a href="#where-to-find-us">Where to Find Us</a></li>
                </ul>
              </aside>

        {/* Main Content */}
        <div className="content-container">
          <div className="header-container">
            <div className="welcome-image-container">
              <img src={churchImage} alt="Church" className="church-image" />
            </div>
            <h1 className="welcome-message">{typedWelcome}</h1>
            <p className="invitation-message">
              We'd love to have you worship and grow with us. Would you like to join us?
            </p>
            <blockquote className="bible-verse">
              <em>"For where two or three gather in my name, there am I with them." - Matthew 18:20</em>
            </blockquote>
          </div>

         
          <main className="main-container">
            <section id="who-we-are" className="section-container">
              <h2>{getContent('about_us').title || 'ABOUT US!'}</h2>
              <div dangerouslySetInnerHTML={{ __html: getContent('about_us').content || 
                'SDA Church Dedan Kimathi University is a vibrant Seventh-day Adventist congregation based in Kimathi. We are passionate about faith, fellowship, and community service.' 
              }} />
            </section>

            <section id="vision" className="section-container">
              <h2>{getContent('mission').title || 'Mission'}</h2>
              <div dangerouslySetInnerHTML={{ __html: getContent('mission').content || 
                'To make disciples of all people by proclaiming the everlasting gospel in the context of the three angel messages of <b>Revelation 14:6–12</b>, leading them to accept Jesus as their personal Savior, unite with the remnant church, nurturing them to serve Him as Lord, and preparing them for His soon return.' 
              }} />

              <h2>{getContent('vision').title || 'Our Vision'}</h2>
              <div dangerouslySetInnerHTML={{ __html: getContent('vision').content || 
                'Empowering Seventh-day Adventist students, professionals, the church, and healing the nation.' 
              }} />

              <h2>{getContent('purpose').title || 'Our Purpose'}</h2>
              <div dangerouslySetInnerHTML={{ __html: getContent('purpose').content || 
                '<ol type="A"><li>To assist students studying in Dedan Kimathi University of Technology (DEKUT) to resolve problems that negatively impact their Christian principles and lifestyles.</li><li>To promote a culture of continued learning in the Adventist church and community at large, embracing the principle of Christian education.</li><li>To create mechanisms for integrating and inducting students into the world of work.</li><li>To mobilize Adventist professionals for professional input to Adventist students in DEKUT, the church, and the community.</li></ol>' 
              }} />
            </section>

            <section id="activities" className="section-container">
              <h2>{getContent('activities').title || 'Our Activities'}</h2>
              <div dangerouslySetInnerHTML={{ __html: getContent('activities').content }} />
              
              {/* Fallback to original cards if no dynamic content */}
              {!getContent('activities').content && (
                <div className="activities-container">
                  <div className="activity-card">
                    <img src={bibleStudyImg} alt="Bible Study" className="activity-img" />
                    <h3>Bible Study</h3>
                    <p>Join us for deep, interactive study of the Bible every Wednesday from 6pm.</p>
                  </div>
                  <div className="activity-card">
                    <img src={choirImg} alt="Choir Ministry" className="activity-img" />
                    <h3>HARMONIZATION</h3>
                    <p>Join us every Thursday for a powerful harmonization session as we prepare for Sabbath!</p>
                  </div>
                  <div className="activity-card">
                    <img src={missionsImg} alt="Missions" className="activity-img" />
                    <h3>Missions</h3>
                    <p>We serve the community — helping the needy, sharing hope and love. We also have missions
                      every year. Want to know about our upcoming mission?
                    </p>
                  </div>
                </div>
              )}
            </section>

            <section id="worship" className="section-container">
              <h2>{getContent('worship').title || 'Worship with Us'}</h2>
              <div dangerouslySetInnerHTML={{ __html: getContent('worship').content || 
                'Join us every <strong>Saturday (Sabbath)</strong> in KIMATHI UNIVERSITY around Student\'s Mess. Services begin at <strong>7:50 AM</strong>.' 
              }} />
            </section>

            <section id="where-to-find-us" className="section-container">
              <h2>{getContent('location').title || 'Where to Find Us'}</h2>
              <div dangerouslySetInnerHTML={{ __html: getContent('location').content || 
                'Dekusda church is located in DEDAN KIMATHI UNIVERSITY OF TECHNOLOGY in Nyeri County.' 
              }} />

              <div className="contact-us">
                <h3>{getContent('contact').title || 'Contact Us'}</h3>
                <div dangerouslySetInnerHTML={{ __html: getContent('contact').content }} />
                
                {/* Fallback if no dynamic contact content */}
                {!getContent('contact').content && (
                  <>
                    <p>Email: <a href="mailto:dekutsda@students.dkut.ac.ke">dekutsda@students.dkut.ac.ke</a></p>
                    <div className="social-icons">
                      <a href="" target="_blank" rel="noopener noreferrer">
                        <img src={instagramIcon} alt="Instagram" className="icon" />
                      </a>
                      <img
                        src={youtubeIcon}
                        alt="YouTube"
                        className="icon"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="map-container">
                <iframe
                  title="DEKUSDA Church Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.339622036175!2d36.95100065!3d-0.3940003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182867cc4b1df407%3A0x540c830f1b693f26!2sDedan%20Kimathi%20University%20of%20Technology!5e0!3m2!1sen!2ske!4v1719057450000!5m2!1sen!2ske"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </section>
          </main>
        </div>
      </div>

      <Footer />
    </div>
    <Sidebar />
  </div>
  </div>
);
};

export default AboutDekusda;
