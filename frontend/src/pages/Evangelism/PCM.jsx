import React from 'react';

export default function PublicCampusMinistry() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img
          src="/images/PCMlogo.png"
          alt="PCM Logo"
          className="w-24 h-24 object-contain"
        />
      </div>

      {/* Title Block */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white uppercase tracking-wider">
          Public Campus Ministry
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mt-2 font-medium uppercase tracking-wide">
          What is this PCM?
        </p>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col md:flex-row gap-10 text-gray-800 dark:text-gray-300 text-lg">
        {/* Left Column – What is PCM */}
        <div className="md:w-1/2 space-y-4">
          <p>
            Public Campus Ministry is a faith-based initiative that seeks to support and nurture the spiritual,
            emotional, and moral growth of students, faculty, and staff within public institutions of higher learning.
          </p>
          <p>
            Operating on university and college campuses, this ministry serves as a vital bridge between faith and
            academia, providing a space for worship, fellowship, Bible study, mentorship, and community service.
          </p>
          <p>
            Through its presence, Public Campus Ministry aims to cultivate a Christ-centered environment that encourages
            personal development, ethical leadership, and a sense of purpose among young adults navigating the challenges
            of academic life and societal expectations.
          </p>
          <blockquote className="italic text-blue-600 dark:text-blue-400 mt-4 border-l-4 pl-4 border-blue-500">
            “Follow Jesus, embrace His mission, change the world.”
          </blockquote>
        </div>

        {/* Right Column – Future of PCM in DEKUSDA */}
        <div className="md:w-1/2 space-y-4">
          <h3 className="text-xl font-semibold text-black dark:text-white uppercase">
            The Future of PCM in DEKUSDA
          </h3>
          <p>
            PCM in DEKUSDA is a new department, however, there is a room that should be covered. Beginning with having
            the leadership competence classes from level 1–3 so as to mentor the leaders of tomorrow in the church.
          </p>
          <p>
            As followers of Christ, embracing the mission of being fishers of men, it is the work and duty of PCM students
            to bring more students to Christ.
          </p>

          {/* Dr. Pelote quote */}
          <blockquote className="italic text-green-700 dark:text-green-400 mt-4 border-l-4 pl-4 border-green-500">
            “The gospel travels fastest through people who are passionate and unashamed.
            Be the fire that lights others up for Christ.”
            <br />
            <span className="block text-sm mt-2 font-medium text-gray-800 dark:text-gray-300">
              – Dr. Emmanuel Pelote, EKUC PCM Convention 2025
            </span>
          </blockquote>
        </div>
      </div>

      {/* Group Photo */}
      <div className="mt-12">
        <img
          src="/images/PCMgroup.png"
          alt="PCM Group"
          className="w-full rounded-xl shadow-md object-cover"
        />
      </div>
    </section>
  );
}
