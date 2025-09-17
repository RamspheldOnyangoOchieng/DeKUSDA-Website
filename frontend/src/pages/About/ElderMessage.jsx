import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Layout/Header';
import { Footer } from '../../components/Layout/Footer';
import { Sidebar } from '../../components/Layout/Sidebar';
import aboutService from '../../services/aboutService';
import elderImage from '../../assets/elder.jpg';

export const ElderMessage = () => {
  const [pageContent, setPageContent] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Load dynamic content
  useEffect(() => {
    const loadPageContent = async () => {
      try {
        setIsLoading(true);
        const content = await aboutService.getPageContent('elder_message');
        setPageContent(content.data || {});
      } catch (error) {
        console.error('Error loading Elder Message content:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPageContent();
  }, []);

  const fallbackContent = {
    title: {
      title: 'First Elder',
      content: ''
    },
    heading: {
      title: 'Word From the First Elder',
      content: ''
    },
    elder_name: {
      title: 'Brian Okari, First Elder',
      content: ''
    },
    quote: {
      title: '"How good! How pleasant! it is for brethren to commune together in love."',
      content: ''
    },
    message: {
      title: '',
      content: '<p>Welcome to DeKUSDA, the Seventh-day Adventist Church at Dedan Kimathi University of Technology. I warmly welcome you to this sacred space — a home far away from home, where faith meets intellect, and divine purpose shapes destinies.</p><p>In a world that is constantly changing, filled with empty pursuits, and ever-widening voids; in such a world that needs light, hope, and direction, DeKUSDA Church stands as a beacon of hope and spiritual anchorage. Within the dynamic and often challenging university environment, our church strives — in the most diverse and intentional ways — to meet the deepest spiritual, emotional, and moral needs of students and members.</p><p>Guided by our vision: "To empower the Seventh-day Adventist students, professionals and the Church, to heal the nation", we are committed to fostering a mission-focused culture through public campus ministries, personal ministry, and evangelistic outreach.</p><p><span class="italic text-gray-600">"Iron sharpeneth iron; so a man sharpeneth the countenance of his friend." — Proverbs 27:17</span><br />We place a strong emphasis on mentorship among members — where the spiritually mature walk alongside the young in faith — and on the upbringing of leaders who are rooted in Christ and equipped to serve.</p><p>A church that fails to engage in mission and evangelism risks losing its heart and identity. Thus, as a church, we are unequivocally committed to the Great Commission Christ entrusted to us in <span class="font-semibold text-blue-700"> Matthew 28:18–20</span>, where He declares, <span class="italic text-gray-600"> "All authority in heaven and on earth has been given to Me. Go ye therefore and make disciples…"</span></p><p>As a church, we move forward not by our own strength, but with unwavering confidence in the One who called us. Christ\'s words echo time and again and anchor our ministry: <span class="italic text-gray-600"> "Lo, I am with you alway, even unto the end of the world"</span> (Matthew 28:20). Through every season, every challenge, and every opportunity, God has been faithful — and we trust fully in His continued leading.</p><p class="font-semibold text-blue-800">Welcome on board!</p>'
    }
  };

  const getContent = (sectionKey) => {
    return pageContent[sectionKey] || fallbackContent[sectionKey] || { title: '', content: '' };
  };
  return (
    <>
      <div className='flex'>
        <div className='w-full lg:w-[85%]'>
          <Header />

          <section className="min-h-screen px-6 py-12 font-sans text-gray-800 bg-gray-100 lg:px-24">
            <div className="p-6 mx-auto max-w-5xl bg-white rounded-xl shadow-md md:p-10">
              <div className="flex flex-col gap-6 items-start mb-8 md:flex-row">
                <img
                  src={elderImage}
                  alt="First Elder"
                  className="w-40 h-40 object-cover rounded-lg shadow-sm"
                />
                <div>
                  <h1 className="text-xl text-gray-500 uppercase font-semibold">{getContent('title').title || 'First Elder'}</h1>
                  <h2 className="text-3xl font-bold text-blue-800 mb-2">{getContent('heading').title || 'Word From the First Elder'}</h2>
                  <h3 className="text-lg font-semibold text-gray-600">{getContent('elder_name').title || 'Brian Okari, First Elder'}</h3>
              <p className="mt-2 italic text-gray-500">
                {getContent('quote').title || '"How good! How pleasant! it is for brethren to commune together in love."'}
              </p>
            </div>
          </div>

          <div className="space-y-6 leading-relaxed text-[1.05rem]">
            <div dangerouslySetInnerHTML={{ __html: getContent('message').content || 
              '<p>Welcome to DeKUSDA, the Seventh-day Adventist Church at Dedan Kimathi University of Technology. I warmly welcome you to this sacred space — a home far away from home, where faith meets intellect, and divine purpose shapes destinies.</p>' 
            }} />

            <p>
              In a world that is constantly changing, filled with empty pursuits, and ever-widening voids; in such a world that needs
              light, hope, and direction, DeKUSDA Church stands as a beacon of hope and spiritual anchorage. Within the dynamic and
              often challenging university environment, our church strives — in the most diverse and intentional ways — to meet the
              deepest spiritual, emotional, and moral needs of students and members.
            </p>

            <p>
              Guided by our vision: "To empower the Seventh-day Adventist students, professionals and the Church, to heal the nation", we are committed to fostering a mission-focused culture through public campus ministries, personal ministry, and evangelistic outreach.
            </p>

            <p>
              <span className="italic text-gray-600">
                "Iron sharpeneth iron; so a man sharpeneth the countenance of his friend." — Proverbs 27:17
              </span><br />
              We place a strong emphasis on mentorship among members — where the spiritually mature walk alongside the young in faith —
              and on the upbringing of leaders who are rooted in Christ and equipped to serve.
            </p>

            <p>
              A church that fails to engage in mission and evangelism risks losing its heart and identity. Thus, as a church, we are
              unequivocally committed to the Great Commission Christ entrusted to us in
              <span className="font-semibold text-blue-700"> Matthew 28:18–20</span>, where He declares,
              <span className="italic text-gray-600"> “All authority in heaven and on earth has been given to Me. Go ye therefore and make disciples…”</span>
            </p>

            <p>
              As a church, we move forward not by our own strength, but with unwavering confidence in the One who called us.
              Christ’s words echo time and again and anchor our ministry:
              <span className="italic text-gray-600"> “Lo, I am with you alway, even unto the end of the world”</span> (Matthew 28:20).
              Through every season, every challenge, and every opportunity, God has been faithful — and we trust fully in His continued leading.
            </p>

            <p className="font-semibold text-blue-800">Welcome on board!</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    <Sidebar />
  </div>
  </>
  );
};

export default ElderMessage;
