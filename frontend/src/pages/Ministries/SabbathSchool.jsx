import React from 'react';
import { Header } from '../../components/Layout/Header';
import { Footer } from '../../components/Layout/Footer';

const SabbathSchool = () => {
  return (
    <>
      <Header />

      <div className="bg-white text-gray-800 px-6 py-12 max-w-5xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-2">Sabbath School Department</h1>
        <p className="text-center italic text-lg text-gray-600 mb-10">
          "Building Faith, Deepening Fellowship, Sharing Hope"
        </p>

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
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">📅 Weekly Program – Every Sabbath</h2>
          <div className="space-y-3">
            <p><strong>7:50 – 8:20 AM:</strong> Morning Prayer</p>
            <p>
              <strong>8:20 – 9:00 AM:</strong> General Program – Welcome, Songs, Announcements<br />
              <span className="pl-4">– Devotion & Mission Story</span>
            </p>
            <p>
              <strong>9:00 – 10:00 AM:</strong> Lesson Study in Classes<br />
              <span className="pl-4">– Adult Lesson Guide Only</span><br />
              <span className="pl-4">– Happy Class for unbaptized members</span>
            </p>
            <p>
              We use the <strong>Adult Sabbath School Lesson Guide</strong> and follow a small group
              discussion model that allows everyone to share, reflect, and grow together.
            </p>
          </div>
        </section>

        {/* Midweek Program */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-800 mb-3">📖 Midweek Study – Thursday Lesson Harmonisation</h2>
          <p>
            Every Thursday from <strong>4:30 PM to 6:00 PM</strong>, we meet for lesson harmonisation—
            an interactive time to explore the week's topic in detail, align insights, and prepare
            spiritually for Sabbath.
          </p>
        </section>

        {/* Welcome Message */}
        <section className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">📬 A Welcome Message from the Superintendent</h2>
          <p className="italic mb-4">
            "Welcome to Sabbath School at DeKUT SDA Church! Whether you're new or returning, there's a
            space here for you—to learn, to share, and to grow. As young people navigating faith in a
            university environment, we need each other—and we need the Word of God even more. Come study
            with us, pray with us, and let's prepare together for the soon return of Jesus."
          </p>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default SabbathSchool;
