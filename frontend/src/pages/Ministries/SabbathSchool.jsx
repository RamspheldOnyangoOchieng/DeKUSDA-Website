import React from 'react';
import { Header } from '../../components/Layout/Header';
import { Footer } from '../../components/Layout/Footer';

const SabbathSchool = () => {
  return (
    <>
      <Header />

      {/* Full-width title bar */}
      <div className="bg-blue-900 text-white text-center py-6">
        <h1 className="text-3xl md:text-4xl font-bold">Sabbath School Department</h1>
        <p className="italic text-lg mt-1">"Building Faith, Deepening Fellowship, Sharing Hope"</p>
      </div>

      {/* Main content */}
      <main className="bg-gray-100 py-12 px-6 md:px-20 font-sans text-gray-800">
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-md">
          
          {/* Intro */}
          <section className="space-y-5 mb-12">
            <p>
              The Sabbath School Department of Dedan Kimathi University of Technology SDA Church is the
              heart of our spiritual growth and Bible study ministry. Rooted in the mission of the
              Seventh-day Adventist Church, our department seeks to:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Teach the Word of God through interactive and relevant Bible study.</li>
              <li>Foster fellowship among members through heartfelt discussions and prayer.</li>
              <li>Promote mission locally and globally through giving and story sharing.</li>
              <li>Nurture spiritual maturity through prayer, discipleship, and Christ-centered programs.</li>
            </ul>
            <p>
              We believe that Sabbath School is not just a program—it’s a family in the Word.
            </p>
          </section>

          {/* Weekly Program */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-blue-800 mb-6">📅 Weekly Program – Every Sabbath</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Morning Prayer */}
              <div className="bg-blue-50 border-l-4 border-blue-500 shadow-md p-5 rounded-md">
                <h3 className="text-xl font-semibold text-blue-900 mb-1">🕖 Morning Prayer</h3>
                <p className="text-gray-700"><strong>7:50 – 8:20 AM</strong></p>
              </div>

              {/* General Program */}
              <div className="bg-blue-50 border-l-4 border-blue-500 shadow-md p-5 rounded-md">
                <h3 className="text-xl font-semibold text-blue-900 mb-1">📢 General Program</h3>
                <p className="text-gray-700"><strong>8:20 – 9:00 AM</strong></p>
                <ul className="list-disc list-inside text-gray-700 mt-2 text-sm">
                  <li>Welcome, Songs, Announcements</li>
                  <li>Devotion & Mission Story</li>
                </ul>
              </div>

              {/* Lesson Study */}
              <div className="bg-blue-50 border-l-4 border-blue-500 shadow-md p-5 rounded-md">
                <h3 className="text-xl font-semibold text-blue-900 mb-1">📖 Lesson Study</h3>
                <p className="text-gray-700"><strong>9:00 – 10:00 AM</strong></p>
                <ul className="list-disc list-inside text-gray-700 mt-2 text-sm">
                  <li>Adult Lesson Guide</li>
                  <li>Happy Class (Unbaptized Members)</li>
                </ul>
              </div>

              {/* Summary */}
              <div className="bg-blue-100 border-l-4 border-blue-700 shadow-inner p-5 rounded-md">
                <p className="text-md italic text-gray-800">
                  Sabbath School uses the <strong>Adult Sabbath School Lesson Guide</strong> and a <strong>small group model</strong> that encourages sharing, reflection, and mutual growth in Christ.
                </p>
              </div>
            </div>
          </section>

          {/* Midweek Program */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">📖 Midweek Study – Thursday Lesson Harmonisation</h2>
            <p className="text-lg">
              Every Thursday from <strong>4:30 PM to 6:00 PM</strong>, we meet for lesson harmonisation—
              an interactive time to explore the week's topic in detail, align insights, and prepare
              spiritually for Sabbath.
            </p>
          </section>

          {/* Superintendent Message */}
          <section className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">📬 A Welcome Message from the Superintendent</h2>
            <p className="italic text-lg text-gray-700">
              "Welcome to Sabbath School at DeKUT SDA Church! Whether you're new or returning, there's a
              space here for you—to learn, to share, and to grow. As young people navigating faith in a
              university environment, we need each other—and we need the Word of God even more. Come study
              with us, pray with us, and let's prepare together for the soon return of Jesus."
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default SabbathSchool;
