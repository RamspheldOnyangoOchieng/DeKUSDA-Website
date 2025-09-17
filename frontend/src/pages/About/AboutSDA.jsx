import React, { useState, useEffect } from 'react';
import './AboutSDA.css';

import { Header } from '../../components/Layout/Header';
import { Footer } from '../../components/Layout/Footer';
import { Sidebar } from '../../components/Layout/Sidebar';
import aboutService from '../../services/aboutService';

import logo from '../../assets/logo.jpg';

const AboutSDA = () => {
  const [activeQa, setActiveQa] = useState(null);
  const [pageContent, setPageContent] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Load dynamic content
  useEffect(() => {
    const loadPageContent = async () => {
      try {
        setIsLoading(true);
        const content = await aboutService.getPageContent('about_sda');
        setPageContent(content.data || {});
      } catch (error) {
        console.error('Error loading AboutSDA content:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPageContent();
  }, []);

  const fallbackContent = {
    title: {
      title: 'ABOUT SEVENTH DAY ADVENTIST CHURCH (SDA)',
      content: ''
    },
    motto: {
      title: '"Come now, let us reason together" - Isaiah 1:18',
      content: 'A faith that welcomes intellectual inquiry'
    },
    history_title: {
      title: 'SMALL HISTORY ABOUT SDA',
      content: 'The Seventh-day Adventist Church emerged from the Great Awakening movements of the 19th century, when young Bible students began questioning mainstream interpretations of Scripture.'
    },
    qa_title: {
      title: 'FREQUENT Q&A',
      content: ''
    },
    global_impact_title: {
      title: 'Adventist Global Impact',
      content: ''
    },
    mission_title: {
      title: 'Mission & Church Structure',
      content: 'The mission of the SDA Church is to proclaim the everlasting gospel of Jesus Christ to all people, teaching biblical principles and promoting a healthy, balanced lifestyle.'
    },
    mission_content: {
      title: '',
      content: '<ul><li>Global organizational structure</li><li>Emphasis on youth and community programs</li><li>Active missionary work worldwide</li></ul>'
    }
  };

  const getContent = (sectionKey) => {
    return pageContent[sectionKey] || fallbackContent[sectionKey] || { title: '', content: '' };
  };

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
      <div className='flex'>
        <div className='w-full lg:w-[85%]'>
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
              <h1>{getContent('title').title || 'ABOUT SEVENTH DAY ADVENTIST CHURCH (SDA)'}</h1>
              <p className="church-motto">{getContent('motto').title || '"Come now, let us reason together" - Isaiah 1:18'}</p>
              <p className="student-call">{getContent('motto').content || 'A faith that welcomes intellectual inquiry'}</p>
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
              <h2>{getContent('history_title').title || 'SMALL HISTORY ABOUT SDA'}</h2>
              <div dangerouslySetInnerHTML={{ __html: getContent('history_title').content || 
                'The Seventh-day Adventist Church emerged from the Great Awakening movements of the 19th century, when young Bible students began questioning mainstream interpretations of Scripture.' 
              }} />

              <section id="qa-section" className="controversial-qa">
                <h3>{getContent('qa_title').title || 'FREQUENT Q&A'}</h3>

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
            <h2>{getContent('global_impact_title').title || 'Adventist Global Impact'}</h2>
            <div dangerouslySetInnerHTML={{ __html: getContent('global_impact_content').content }} />
            
            {/* Fallback to original cards if no dynamic content */}
            {!getContent('global_impact_content').content && (
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
            )}
          </section>

          <section id="mission-section" className="mission-structure">
            <h2>{getContent('mission_title').title || 'Mission & Church Structure'}</h2>
            <div dangerouslySetInnerHTML={{ __html: getContent('mission_title').content || 
              'The mission of the SDA Church is to proclaim the everlasting gospel of Jesus Christ to all people, teaching biblical principles and promoting a healthy, balanced lifestyle.' 
            }} />
            <div dangerouslySetInnerHTML={{ __html: getContent('mission_content').content || 
              '<ul><li>Global organizational structure</li><li>Emphasis on youth and community programs</li><li>Active missionary work worldwide</li></ul>' 
            }} />
          </section>
        </main>
      </div>
      <Footer />
    </div>
    <Sidebar />
  </div>
  </>
  );
};

export default AboutSDA;
