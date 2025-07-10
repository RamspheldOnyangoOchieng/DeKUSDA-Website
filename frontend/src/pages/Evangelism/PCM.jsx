import React from 'react';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import PCMLogo from '../../assets/PCMlogo.png';
import PCMGroup from '../../assets/PCMgroup.png';

export const PCM = () => {
  return (
    <>
      <Header />

      <section className="relative px-6 py-12 mx-auto max-w-6xl bg-gradient-to-b from-blue-100 via-white to-blue-50 rounded-2xl shadow-2xl">
        {/* Enlarged Logo at Top Left */}
        <div className="absolute top-6 left-6">
          <img
            src={PCMLogo}
            alt="PCM Logo"
            className="w-56 h-56 object-contain"
          />
        </div>

        {/* Title Block */}
        <div className="mt-24 mb-10 pl-60 text-left"> {/* padding-left to align beside logo */}
          <h2 className="text-4xl font-extrabold tracking-wide text-indigo-900 uppercase">
            Public Campus Ministry
          </h2>
          <p className="mt-3 text-lg font-medium text-indigo-600 uppercase">
            What is this PCM?
          </p>
        </div>

        {/* Two Column Section */}
        <div className="flex flex-col gap-12 md:flex-row text-gray-800 text-lg relative z-10">
          {/* Left Column */}
          <div className="space-y-5 md:w-1/2">
            <p>
              Public Campus Ministry is a faith-based initiative that seeks to support and nurture the spiritual,
              emotional, and moral growth of students, faculty, and staff within public institutions of higher learning.
            </p>
            <p>
              Operating on university and college campuses, PCM bridges faith and academia — offering a space for worship,
              fellowship, Bible study, mentorship, and service.
            </p>
            <p>
              Its goal is to cultivate a Christ-centered environment that inspires personal growth, leadership, and purpose
              for students navigating academic and life challenges.
            </p>
            <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-indigo-700">
              “Follow Jesus, embrace His mission, change the world.”
            </blockquote>
          </div>

          {/* Right Column */}
          <div className="space-y-5 md:w-1/2">
            <h3 className="text-2xl font-semibold text-indigo-800 uppercase">
              The Future of PCM in DEKUSDA
            </h3>
            <p>
              PCM in DEKUSDA is a new department with vast opportunities. We aim to offer leadership development
              (PCM Level 1–3), nurturing tomorrow’s church leaders today.
            </p>
            <p>
              As followers of Christ and "fishers of men", PCM members are called to win souls and grow the kingdom of God through campus outreach.
            </p>
            <blockquote className="border-l-4 border-green-500 pl-4 italic text-green-700">
              “The gospel travels fastest through people who are passionate and unashamed.
              Be the fire that lights others up for Christ.”
              <br />
              <span className="block mt-2 text-sm text-gray-700 font-semibold">
                – Dr. Emmanuel Pelote, EKUC PCM Convention 2025
              </span>
            </blockquote>
          </div>
        </div>

        {/* Group Photo Bottom Right */}
        <div className="mt-12 flex justify-end">
          <img
            src={PCMGroup}
            alt="PCM Group"
            className="w-80 h-auto rounded-xl shadow-lg"
          />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default PCM;
