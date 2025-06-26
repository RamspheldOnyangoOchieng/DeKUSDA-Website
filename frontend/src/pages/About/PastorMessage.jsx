import React from 'react';

export default function ChaplainsMessage() {
  return (
    <section className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md mt-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
        Chaplain's Message
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Image using public src path */}
        <div className="flex-shrink-0">
          <img
            src="/images/pastor-frank.jpg"
            alt="Pastor Frank Maina"
            className="rounded-2xl w-64 h-auto object-cover shadow-md"
          />
        </div>

        {/* Text Content */}
        <div className="flex-1 text-lg text-gray-700 dark:text-gray-300">
          <p className="mb-4">Hello there.</p>

          <p className="mb-4">
            Welcome to <span className="font-semibold text-blue-600 dark:text-blue-400">Dedan Kimathi University Seventh-Day Adventist Church</span>.
            We're here to support Adventist students in finding space for spiritual exploration and nourishment — reminding you that,
            <span className="italic"> “The fear of the Lord is the beginning of wisdom.”</span>
          </p>

          <p className="mb-4">
            Here, we are nurturing <span className="font-semibold">spirit</span>, <span className="font-semibold">soul</span>, and <span className="font-semibold">service</span>.
            Our Chaplaincy department offers pastoral care, spiritual programs, and opportunities for service — embracing diversity and fostering well-being.
          </p>

          <p className="mb-6">
            May the good Lord bless you for visiting this site.
          </p>

          <div className="text-right">
            <p className="text-xl font-medium text-gray-800 dark:text-white">Pastor Frank Maina,</p>
            <p className="text-gray-700 dark:text-gray-400">Chaplain</p>
          </div>
        </div>
      </div>
    </section>
  );
}
