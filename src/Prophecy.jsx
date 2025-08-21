import React from 'react';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const ProphecyDepartment = () => {
  return (
    <>
      <Header />

      {/* Full-width blue background header */}
      <section className="w-full bg-blue-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-center">
            Prophecy Department
          </h1>
        </div>
      </section>

      {/* Main Page Content */}
      <main className="bg-gray-100 py-12 px-6 md:px-20 font-sans text-gray-800 max-w-7xl mx-auto">
        
        {/* Bible Verse */}
        <blockquote className="text-center italic text-lg mb-10 text-blue-800 max-w-3xl mx-auto">
          "Surely the Lord God will do nothing, but he revealeth his secret unto his servants the prophets."
          <br />
          <span className="text-sm text-gray-600">— Amos 3:7</span>
        </blockquote>

        {/* About */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-3">About Prophecy Department</h2>
          <p className="text-lg leading-relaxed">
            The Prophecy Department is a spiritual resource hub within the church dedicated to studying, teaching,
            and applying the prophetic messages of the Bible. Our mission is to help members understand God's
            purpose in current events and prepare spiritually for Christ’s soon return.
          </p>
        </section>

        {/* Aims */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-3">Aims</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>To promote the study of Bible prophecy (Daniel, Revelation, and more).</li>
            <li>To help members recognize signs of the times and their relevance to daily Christian life.</li>
            <li>To encourage watchfulness, spiritual growth, and faithfulness in preparation for the Second Coming.</li>
            <li>To equip the church and community with truth, discernment, and hope through prophecy seminars, Bible studies, and outreach.</li>
          </ul>
        </section>

        {/* Does Prophecy Matter */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-3">Does Prophecy Matter?</h2>
          <p className="text-lg leading-relaxed mb-4">
            It is evident that the world we live in is broken — is there hope? Yes, there is hope. Through Bible prophecy we get:
          </p>
          <blockquote className="bg-blue-100 border-l-4 border-blue-800 px-6 py-4 rounded-lg italic text-blue-900">
            “The Revelation of Jesus Christ, which God gave unto him, to shew unto his servants things which must shortly come to pass...” <br />
            <span className="block text-sm text-right">— Revelation 1:1</span>
            <br />
            “Blessed is he that readeth, and they that hear the words of this prophecy, and keep those things which are written therein.” <br />
            <span className="block text-sm text-right">— Revelation 1:3</span>
          </blockquote>
        </section>

        {/* What We Do */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-3">What We Do</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>Weekly or monthly prophecy study sessions</li>
            <li>End-time prophecy studies</li>
            <li>Interactive sessions on current world events in light of prophecy</li>
            <li>Support for youth and new believers in understanding difficult prophetic symbols</li>
            <li>Community outreach with literature and media</li>
          </ul>
        </section>

        {/* Social Media */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-800 mb-3">Social Media Platforms</h2>
          <a
            href="https://chat.whatsapp.com/De8PwoUz2zE9AhDa6dL9Fw?mode=ac_t"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline hover:text-blue-900"
          >
            Join our WhatsApp Group
          </a>
        </section>

        {/* Resources */}
        <section className="mb-4">
          <h2 className="text-2xl font-semibold text-blue-800 mb-3">Resources</h2>
          <a
            href="https://classroom.google.com/c/NzI3MjY3ODM4MDA2?cjc=ulb5z7f"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline hover:text-blue-900"
          >
            Access Google Classroom Materials
          </a>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ProphecyDepartment;
