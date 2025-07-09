import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import bibleStudyImg from '../../assets/BIBLESTUDY.jpg';
import churchImage from '../../assets/church.jpeg';
import sdaLogo from '../../assets/dekusdalogo.jpg';
import choirImg from '../../assets/harmonization.jpg';
import instagramIcon from '../../assets/instagram.png';
import missionsImg from '../../assets/mission.jpg';
import youtubeIcon from '../../assets/youtube.png';
import './aboutDekusda.css';

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
  const welcomeText = 'WELCOME TO (DEKUSDA) DEDAN KIMATHI UNIVERSITY';
  const typedWelcome = useTypingEffect(welcomeText, 120);

  return (
    <div className="page-container">
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

      <div className="content-container">
        <header className="header-container">
          <img src={churchImage} alt="Church" className="welcome-image" />
          <h1 className="welcome-message">{typedWelcome}</h1>
          <p className="invitation-message">
            We'd love to have you worship and grow with us. Would you like to join us?
          </p>
          <blockquote className="bible-verse">
            <em>"For where two or three gather in my name, there am I with them." - Matthew 18:20</em>
          </blockquote>
        </header>

        <div className="learn-more-container">
          <p>
            Would you like to learn more about SDA?{' '}
            <Link to="/about-sda">Click here</Link>
          </p>
        </div>

        <main className="main-container">

          <section id="who-we-are" className="section-container">
            <h2>ABOUT US!</h2>
            <p>
              Dedan Kimathi SDA Church is a vibrant Seventh-day Adventist congregation based in Kimathi.
              We are passionate about faith, fellowship, and community service.
            </p>
          </section>

          <section id="vision" className="section-container">
            <h2>Mission</h2>
            <p>
              To make disciples of all people by proclaiming the everlasting gospel in the context of the three
              angel messages of <b>Revelation 14:6–12</b>, leading them to accept Jesus as their personal Savior,
              unite with the remnant church, nurturing them to serve Him as Lord, and preparing them for His soon return.
            </p>

            <h2>Our Vision</h2>
            <p>
              Empowering Seventh-day Adventist students, professionals, the church, and healing the nation.
            </p>

            <h2>Our Purpose</h2>
            <ol type="A">
              <li>To assist students studying in Dedan Kimathi University of Technology (DEKUT) to 
                resolve problems that negatively impact their Christian principles and lifestyles.</li>
              <li>To promote a culture of continued learning in the Adventist church and community at
                large, embracing the principle of Christian education.</li>
              <li>To create mechanisms for integrating and inducting students into the world of work.</li>
              <li>To mobilize Adventist professionals for professional input to Adventist students in DEKUT,
                the church, and the community.</li>
            </ol>
          </section>

          <section id="activities" className="section-container">
            <h2>Our Activities</h2>
            <div className="activities-container">
              <div className="activity-card">
                <img src={bibleStudyImg} alt="Bible Study" className="activity-img" />
                <h3>Bible Study</h3>
                <p>Join us for deep, interactive study of the Bible every Wednesday from 6pm.</p>
              </div>
              <div className="activity-card">
                <img src={choirImg} alt="Choir Ministry" className="activity-img" />
                <h3>HARMONIZATION</h3>
                <p>join us every THURSDAY for a powerful harmonization session as we prepare together
                  for sabbath lesson insights!
                </p>
              </div>
              <div className="activity-card">
                <img src={missionsImg} alt="Missions" className="activity-img" />
                <h3>Missions</h3>
                <p>We serve the community — helping the needy, sharing hope and love. We also have missions
                  every year. Want to know about our upcoming mission?
                </p>
                <Link to="/ministries/personalministries" className="learn-more-button">
                  Click here for more
                </Link>
              </div>
            </div>
          </section>

          <section id="worship" className="section-container">
            <h2>Worship with Us</h2>
            <p>
              Join us every <strong>Saturday (Sabbath)</strong> in KIMATHI UNIVERSITY around Student's Mess.
              Services begin at <strong>7:50 AM</strong>.
            </p>
          </section>

          <section id="where-to-find-us" className="section-container">
            <h2>Where to Find Us</h2>
            <p>Dekusda church is located in DEDAN KIMATHI UNIVERSITY OF TECHNOLOGY in Nyeri County.</p>

            {/* Contact Us - above the map */}
            <div className="contact-us">
              <h3>Contact Us</h3>
              <p>Email: <a href="mailto:dekutsda@students.dkut.ac.ke">dekutsda@students.dkut.ac.ke</a></p>
              <div className="social-icons">
                <a href="https://www.instagram.com/dekusda_church" target="_blank" rel="noopener noreferrer">
                  <img src={instagramIcon} alt="Instagram" className="icon" width={30} height={30} />
                </a>
                <a href="https://www.youtube.com/@your_channel" target="_blank" rel="noopener noreferrer">
                  <img src={youtubeIcon} alt="YouTube" className="icon" width={30} height={30} />
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="map-container" style={{ marginTop: '20px' }}>
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

        <footer className="footer-container">
          <p>&copy; 2025 Dedan Kimathi SDA Church. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default AboutDekusda;
