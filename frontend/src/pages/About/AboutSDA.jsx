import React, { useState } from 'react';
import './AboutSDA.css';

import { Header } from '../../components/Layout/Header';
import { Footer } from '../../components/Layout/Footer';

import logo from '../../assets/logo.jpg';

const AboutSDA = () => {
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
    <>
      <Header />
      <div className="page-container about-sda-page">
        <aside className="sidebar blue-sidebar">
          <nav>
            <h2>Quick Links</h2>
            <ul>
              <li><a href="#history-section">History</a></li>
              <li><a href="#qa-section">Frequent Q&A</a></li>
              <li><a href="#global-impact">Global Impact</a></li>
              <li><a href="#mission-section">Mission & Structure</a></li>
            </ul>
          </nav>
          <div className="sidebar-note">
            <h3>Did You Know?</h3>
            <p>Seventh-day Adventists observe the Sabbath on Saturday, emphasizing rest, worship, and family.</p>
          </div>
        </aside>

        <main className="main-content">
          <div className="hero-section plain-hero">
            <div className="hero-content">
              <h1>ABOUT SEVENTH DAY ADVENTIST CHURCH (SDA)</h1>
              <p className="church-motto">"Come now, let us reason together" - Isaiah 1:18</p>
              <p className="student-call">A faith that welcomes intellectual inquiry</p>
            </div>
          </div>

          <section id="history-section" className="history-section">
            <div className="history-image-container">
              <img src={logo} alt="SDA Church History" className="history-image" />
              <div className="year-badge">1863</div>
              <div className="history-video-container">
                <h3>The Adventist Story in 3 Minutes</h3>
                <div className="video-wrapper">
                  <iframe
                    src="https://www.youtube.com/embed/0YUCQmNRZCM?start=28"
                    title="SDA History Explained"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
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

          <section id="mission-section" className="mission-structure">
            <h2>Mission & Church Structure</h2>
            <p>
              The mission of the SDA Church is to proclaim the everlasting gospel of Jesus Christ to all
              people, teaching biblical principles and promoting a healthy, balanced lifestyle.
            </p>
            <ul>
              <li>Global organizational structure</li>
              <li>Emphasis on youth and community programs</li>
              <li>Active missionary work worldwide</li>
            </ul>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AboutSDA;
