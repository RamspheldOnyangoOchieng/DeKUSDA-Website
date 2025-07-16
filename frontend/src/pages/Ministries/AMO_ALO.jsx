import React from "react";
import { Header } from "../../components/Layout/Header";
import { Footer } from "../../components/Layout/Footer";

const AMO_ALO = () => {
  return (
    <>
      <Header />

      {/* Full-width blue title bar */}
      <div className="bg-blue-900 text-white text-center py-6">
        <h1 className="text-3xl md:text-4xl font-bold">AMO/ALO Department</h1>
        <p className="italic text-sm md:text-base mt-1 text-blue-100">
          Nurturing health, joy, and relationships in Christ
        </p>
      </div>

      {/* White content container with shadow */}
      <div className="w-full bg-gray-100 py-12 px-4 md:px-8 min-h-screen font-sans text-gray-800">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-10 space-y-10">

          {/* Intro */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">Who We Are</h2>
            <p className="text-lg leading-relaxed">
              The AMO/ALO department is a ministry that embraces and upholds the health message — not only focusing on the spiritual and mental well-being, but also on the social lives of members.
              From Sabbath excursions to fun days and interactive outings, this department creates a blissful atmosphere that nurtures unity and joy among believers.
            </p>
          </section>

          {/* Activities */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">Our Activities</h2>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li><strong>Excursions after Sabbath:</strong> Reflecting on the message of the Sabbath and uplifting one another for the coming week.</li>
              <li><strong>Fun Days:</strong> Interactive games and bonding activities held within school grounds to relax and engage socially.</li>
              <li><strong>Social Sundays:</strong> Visits to hills, waterfalls, and nature trails — promoting fellowship, adventure, and outreach.</li>
            </ul>
          </section>

          {/* Relationship Seminars */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">Relationship Seminars</h2>
            <p className="mb-3 leading-relaxed">
              Due to rising concerns over toxic relationships, AMO/ALO hosts Bible-based seminars that empower members to pursue and maintain godly relationships.
            </p>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li>Separate mentorship tracks for ladies and gents</li>
              <li>Merged sessions for balanced insights and discussions</li>
              <li>Teachings rooted in Biblical values and spiritual maturity</li>
            </ul>
          </section>

          {/* Humanitarian Efforts */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">Humanitarian Efforts</h2>
            <p className="mb-3 leading-relaxed">
              Our ministry extends its care beyond fellowship into the community through compassionate outreach:
            </p>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li>Visiting children’s homes and offering support</li>
              <li>Assisting fellow students in need with fees, food, or rent</li>
            </ul>
          </section>

          {/* Closing Statement */}
          <section className="text-center pt-6">
            <p className="italic text-blue-700 text-lg">
              In a nutshell, AMO/ALO is the basic unit of the church — a home for all.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AMO_ALO;
