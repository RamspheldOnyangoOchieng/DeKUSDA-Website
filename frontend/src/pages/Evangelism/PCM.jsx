import React from 'react';

export default function PublicCampusMinistry() {
  return (
    <section className="px-6 py-12 mx-auto max-w-6xl bg-white rounded-2xl shadow-lg dark:bg-gray-900">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img
          src="/images/PCMlogo.png"
          alt="PCM Logo"
          className="object-contain w-24 h-24"
        />
      </div>

      {/* Title Block */}
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold tracking-wider text-gray-800 uppercase dark:text-white">
          Public Campus Ministry
        </h2>
        <p className="mt-2 text-xl font-medium tracking-wide text-gray-600 uppercase dark:text-gray-300">
          What is this PCM?
        </p>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col gap-10 text-lg text-gray-800 md:flex-row dark:text-gray-300">
        {/* Left Column – What is PCM */}
        <div className="space-y-4 md:w-1/2">
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
          <blockquote className="pl-4 mt-4 italic text-blue-600 border-l-4 border-blue-500 dark:text-blue-400">
            “Follow Jesus, embrace His mission, change the world.”
          </blockquote>
        </div>

        {/* Right Column – Future of PCM in DEKUSDA */}
        <div className="space-y-4 md:w-1/2">
          <h3 className="text-xl font-semibold text-black uppercase dark:text-white">
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
          <blockquote className="pl-4 mt-4 italic text-green-700 border-l-4 border-green-500 dark:text-green-400">
            “The gospel travels fastest through people who are passionate and unashamed.
            Be the fire that lights others up for Christ.”
            <br />
            <span className="block mt-2 text-sm font-medium text-gray-800 dark:text-gray-300">
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
          className="object-cover w-full rounded-xl shadow-md"
        />
      </div>
    </section>
  );
}