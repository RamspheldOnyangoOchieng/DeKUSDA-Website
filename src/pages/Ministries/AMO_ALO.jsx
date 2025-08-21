import React from "react";
import { Header } from "../../components/Layout/Header";
import { Footer } from "../../components/Layout/Footer";

const AMO_ALO = () => {
  return (
    <>
      <Header />

      {/* Full-width title bar outside the padded container */}
      <div className="bg-blue-900 text-white text-center py-4">
        <h1 className="text-3xl md:text-4xl font-bold">AMO/ALO Department</h1>
      </div>

      {/* Content container */}
      <div className="bg-gray-100 py-12 px-4 md:px-20 min-h-screen font-sans text-gray-800">
        {/* Intro */}
        <section className="mb-8">
          <p className="text-lg leading-relaxed">
            The AMO/ALO department is a ministry that embraces and upholds the health message — not only focusing on the spiritual and mental well-being, but also on the social lives of members. From Sabbath excursions to fun days and interactive outings, this department creates a blissful atmosphere that nurtures unity and joy among believers.
          </p>
        </section>

        {/* Activities */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-3">Our Activities</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Excursions after Sabbath:</strong> Reflecting on the message of the Sabbath and uplifting one another for the coming week.</li>
            <li><strong>Fun Days:</strong> Interactive games and bonding activities held in school grounds.</li>
            <li><strong>Social Sundays:</strong> Visiting places like hills, waterfalls, nature trails — promoting fellowship and evangelism.</li>
          </ul>
        </section>

        {/* Relationship Seminars */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-3">Relationship Seminars</h2>
          <p className="mb-2">
            Due to rising cases of relationship abuse, AMO/ALO conducts Bible-based seminars that teach members how to build healthy romantic relationships.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Separate mentorship sessions for ladies and gents</li>
            <li>Occasional merged sessions for unified understanding</li>
            <li>Centered on Biblical teachings and spiritual growth</li>
          </ul>
        </section>

        {/* Humanitarian Efforts */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-3">Humanitarian Efforts</h2>
          <p className="mb-2">Our mission extends to the community and church through:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Visiting children's homes to lend a helping hand</li>
            <li>Supporting members in need (e.g. school fees, rent)</li>
          </ul>
        </section>

        {/* Closing Statement */}
        <section className="text-center mt-10">
          <p className="italic text-blue-800 text-lg">
            In a nutshell, AMO/ALO is the basic unit of the church — a home for all.
          </p>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default AMO_ALO;
