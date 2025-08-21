import React from 'react';
import { Header } from '../../components/Layout/Header';
import { Footer } from '../../components/Layout/Footer';

const LiteratureMinistry = () => {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-primaryBlue to-darkBlue text-white py-8 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Literature Ministry Department
        </h1>
        <p className="italic text-base md:text-lg max-w-3xl mx-auto">
          “Fulfilling the great commission through the printed page”
        </p>
      </div>

      {/* Main Content with white background */}
      <div className="w-full bg-white">
        <main className="max-w-6xl mx-auto py-12 px-6 md:px-20 text-gray-800 font-sans">
          {/* Vision */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">Vision</h2>
            <p className="leading-relaxed">
              To see every home, heart, and nation reached with the message of hope and salvation through Seventh-day Adventist literature.
            </p>
          </section>

          {/* Mission */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">Mission</h2>
            <p className="leading-relaxed">
              To uplift Christ by equipping and mobilizing church members to share truth-filled literature that transforms lives for eternity.
            </p>
          </section>

          {/* Who Are We */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">Who Are We?</h2>
            <p className="mb-3 leading-relaxed">
              The Literature Ministry Department of Dedan Kimathi University of Technology SDA Church is part of a global network committed to evangelism through printed and digital materials.
            </p>
            <p className="leading-relaxed">
              Inspired by the three angels’ message, we echo the global mission locally—providing gospel-centered resources for church members and the broader community.
            </p>
          </section>

          {/* Historical Foundation */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">Historical Foundation</h2>
            <p className="mb-3 leading-relaxed">
              The literature ministry dates back to the 1840s. Elder James White published <em>The Present Truth</em> in 1849, laying the foundation for Adventist publishing.
            </p>
            <p className="mb-3 leading-relaxed">
              DeKUT's literature ministry began in 2012 and continues through divine guidance, spreading the gospel one page at a time.
            </p>
            <p className="italic text-blue-700">
              “There is no better witness of Christ than the inspired text of scripture.”
            </p>
          </section>

          {/* What We Do */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">What We Do</h2>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed">
              <li><strong>Literature Distribution:</strong> Books, tracts, magazines, and Bible studies sharing hope, health, and healing.</li>
              <li><strong>Training and Empowerment:</strong> Equipping members to become literature evangelists in all walks of life.</li>
              <li><strong>Evangelism Support:</strong> Partnering with other departments for outreach and mission events.</li>
              <li><strong>Digital Access:</strong> Promoting online materials, QR codes, and social media outreach.</li>
            </ul>
          </section>

          {/* Goals and Objectives */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">Goals and Objectives</h2>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed">
              <li>Revive literature evangelism in the church.</li>
              <li>Encourage all members to be literature missionaries.</li>
              <li>Nurture spiritual growth through inspired writings.</li>
              <li>Reach unreached communities with Christ-centered messages.</li>
              <li>Support youth through summer literature programs.</li>
            </ul>
          </section>

          {/* Why It Still Matters */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">Why It Still Matters</h2>
            <p className="mb-3 leading-relaxed">
              A printed book or tract can quietly speak to a soul when words cannot. This ministry remains one of the most effective outreach channels today.
            </p>
            <blockquote className="bg-blue-50 border-l-4 border-blue-400 px-6 py-4 rounded-lg italic text-blue-900">
              “If there is one work more important than another, it is that of getting our publications before the people.” — Ellen G. White, <em>The Publishing Ministry</em>, p. 385
            </blockquote>
          </section>

          {/* How to Get Involved */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">How You Can Get Involved</h2>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed">
              <li>Share a tract or book daily.</li>
              <li>Volunteer for training or distribution workshops.</li>
              <li>Support evangelists through prayer or donations.</li>
              <li>Donate materials or help build the inventory.</li>
              <li>Pray for open hearts in our community.</li>
            </ul>
          </section>

          {/* Contact */}
          <section className="bg-blue-50 p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">Contact Us</h2>
            <p className="mb-1"><strong>Phone:</strong> +254 740 486498 / +254 740 756479 / +254 112 998265</p>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default LiteratureMinistry;