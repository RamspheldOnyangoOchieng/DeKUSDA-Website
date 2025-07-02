import React, { useState } from 'react';
import './AboutSDA.css';

import logo from '../../assets/logo.jpg';
import ellenWhite from '../../assets/HELLEN G WHITE.jpg';

const AboutSDA = () => {
  const [showWhiteBio, setShowWhiteBio] = useState(false);
  const [activeQa, setActiveQa] = useState(null);

  const qaItems = [
    {
      id: 1,
      question: "How do Adventists view faith and science?",
      answer: (
        <ul>
          <li>Operate 118 universities with strong STEM programs</li>
          <li>Loma Linda researchers contribute to NASA studies</li>
          <li>"All truth is God's truth" whether revealed or discovered</li>
        </ul>
      )
    },
    {
      id: 2,
      question: "Why keep Sabbath in the 21st century?",
      answer: (
        <ol>
          <li>24-hour digital detox reduces stress</li>
          <li>Community building through fellowship</li>
          <li>Historical roots in early Christianity</li>
        </ol>
      )
    },
    {
      id: 3,
      question: "What makes Adventist education unique?",
      answer: (
        <ul>
          <li>Whole-person development</li>
          <li>Service learning opportunities</li>
          <li>Integration of values in all disciplines</li>
        </ul>
      )
    },
    {
      id: 4,
      question: "How does Adventism approach social justice?",
      answer: (
        <ul>
          <li>Humanitarian work through ADRA</li>
          <li>Health advocacy and education</li>
          <li>Religious liberty initiatives</li>
        </ul>
      )
    }
  ];

  return (
    <div className="page-container">
      
      {/* Sidebar */}
      <aside className="sidebar">
        <nav>
          <h2>Quick Links</h2>
          <ul>
            <li><a href="#history-section">History</a></li>
            <li><a href="#qa-section">Frequent Q&A</a></li>
            <li><a href="#global-impact">Global Impact</a></li>
            <li><a href="#white-section">Ellen G. White</a></li>
            <li><a href="#mission-section">Mission & Structure</a></li>
          </ul>
        </nav>
        <div className="sidebar-note">
          <h3>Did You Know?</h3>
          <p>Seventh-day Adventists observe the Sabbath on Saturday, emphasizing rest, worship, and family.</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section (no background now) */}
        <div className="hero-section plain-hero">
          <div className="hero-content">
            <h1>ABOUT SEVENTH DAY ADVENTIST CHURCH (SDA)</h1>
            <p className="church-motto">"Come now, let us reason together" - Isaiah 1:18</p>
            <p className="student-call">A faith that welcomes intellectual inquiry</p>
          </div>
        </div>

        {/* History Section */}
        <section id="history-section" className="history-section">
          <div className="history-image-container">
            <img
              src={logo}
              alt="SDA Church History"
              className="history-image"
            />
            <div className="year-badge">1863</div>
            <div className="history-video-container">
              <h3>The Adventist Story in 3 Minutes</h3>
              <div className="video-wrapper">
                <iframe
                  src="https://www.youtube.com/embed/0YUCQmNRZCM?start=28"
                  title="SDA History Explained"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>

          <div className="history-text">
            <h2>SMALL HISTORY ABOUT SDA</h2>
            <p>
              The Seventh-day Adventist Church emerged from the Great Awakening movements of the
              19th century, when young Bible students began questioning mainstream interpretations
              of Scripture.
            </p>

            {/* Q&A Section */}
            <section id="qa-section" className="controversial-qa">
              <h3>FREQUENT Q&A</h3>

              {qaItems.map((item) => (
                <div className="qa-item" key={item.id}>
                  <button
                    onClick={() => setActiveQa(activeQa === item.id ? null : item.id)}
                    aria-expanded={activeQa === item.id}
                    aria-controls={`answer-${item.id}`}
                    className="qa-question-button"
                  >
                    <span>{item.question}</span>
                    <span>{activeQa === item.id ? '−' : '+'}</span>
                  </button>
                  {activeQa === item.id && (
                    <div id={`answer-${item.id}`} className="qa-answer">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </section>
          </div>
        </section>

        {/* Global Impact Section */}
        <section id="global-impact" className="global-impact">
          <h2>Adventist Global Impact</h2>
          <div className="impact-grid">
            <div className="impact-card">
              <h3>Education</h3>
              <p><strong>118</strong> universities worldwide</p>
              <p>Education in <strong>150+</strong> languages</p>
            </div>
            <div className="impact-card">
              <h3>Healthcare</h3>
              <p><strong>175</strong> hospitals</p>
              <p>Loma Linda ranked top hospital in CA</p>
            </div>
            <div className="impact-card">
              <h3>Humanitarian</h3>
              <p>ADRA in <strong>118</strong> countries</p>
              <p><strong>10M+</strong> served annually</p>
            </div>
          </div>
        </section>

        {/* Ellen G. White Section */}
        <section id="white-section" className="white-section">
          <div className="white-portrait">
            <img
              src={ellenWhite}
              alt="Ellen G. White"
              className="ellen-white-img"
            />
          </div>
          <div className="white-content">
            <h2>Ellen G. WHITE MESSAGE OF HOPE</h2>
            <p>
              Ellen G. White's message of hope centers on God's unfailing love and the assurance of
              salvation through Jesus Christ. She emphasized that no one is beyond God's mercy, and
              that those who come to Him with a repentant heart will find forgiveness, healing, and
              strength to overcome.
            </p>

            {showWhiteBio && (
              <div className="white-bio">
                <p>
                  Her book <em>Education</em> presents a revolutionary view: "True education means
                  more than the pursuit of a certain course of study. It prepares the student for the
                  joy of service in this world and for the higher joy of wider service in the world to
                  come."
                </p>
                <div className="white-downloads">
                  <a
                    href="/downloads/great-controversy-student.pdf"
                    className="download-btn"
                    download
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#2c5aa0">
                      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                    </svg>
                    Download <em>The Great Controversy</em>
                  </a>
                  <p className="download-note">Student edition with study guides</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setShowWhiteBio(!showWhiteBio)}
              className="toggle-bio-btn"
              aria-expanded={showWhiteBio}
            >
              {showWhiteBio ? 'Show Less' : 'Learn More'}
            </button>
          </div>
        </section>

        {/* Mission Section */}
        <h1 id="mission-section">MISSION AND THE CHURCH STRUCTURES</h1>
        <section className="mission-section">
          <p>
            The mission of the Seventh-day Adventist Church is to proclaim the everlasting gospel of Jesus Christ to all nations, emphasizing holistic health, education, and community service. The Church is organized with a global structure that includes local churches, conferences, unions, divisions, and the General Conference, ensuring effective leadership and unity across 215 countries.
          </p>
        </section>
      </main>
    </div>
  );
};

export default AboutSDA;
