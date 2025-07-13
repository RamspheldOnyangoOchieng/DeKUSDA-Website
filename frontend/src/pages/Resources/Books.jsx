import React from 'react';
import { Header } from '../../components/Layout/Header';
import { Footer } from '../../components/Layout/Footer';

const LiteratureMinistry = () => {
  return (
    <>
      <Header />

      <div className="px-6 md:px-20 py-10 text-gray-800 font-sans">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
          Literature Ministry Department
        </h1>
        <p className="italic text-lg text-blue-700 mb-6">
          “Fulfilling the great commission through the printed page”
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-800 mb-2">Vision</h2>
          <p>
            To see every home, heart, and nation reached with the message of hope and salvation through Seventh-day Adventist literature.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-800 mb-2">Mission</h2>
          <p>
            To uplift Christ by equipping and mobilizing church members to share truth-filled literature that transforms lives for eternity.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-800 mb-2">Who Are We?</h2>
          <p className="mb-2">
            The Literature Ministry Department of Dedan Kimathi University of Technology SDA Church is part of a global network committed to evangelism through printed and digital materials.
          </p>
          <p>
            Inspired by the three angels’ message, we echo the global mission locally—providing gospel-centered resources for church members and the broader community.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-800 mb-2">Historical Foundation</h2>
          <p className="mb-2">
            The literature ministry dates back to the 1840s. Elder James White published <em>The Present Truth</em> in 1849, laying the foundation for Adventist publishing.
          </p>
          <p className="mb-2">
            DeKUT's literature ministry began in 2012 and continues through divine guidance, spreading the gospel one page at a time.
          </p>
          <p>
            “There is no better witness of Christ than the inspired text of scripture.”
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-800 mb-2">What We Do</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Literature Distribution:</strong> Books, tracts, magazines, and Bible studies sharing hope, health, and healing.
            </li>
            <li>
              <strong>Training and Empowerment:</strong> Equipping members to become literature evangelists in all walks of life.
            </li>
            <li>
              <strong>Evangelism Support:</strong> Partnering with other departments for outreach and mission events.
            </li>
            <li>
              <strong>Digital Access:</strong> Promoting online materials, QR codes, and social media outreach.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-800 mb-2">Goals and Objectives</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Revive literature evangelism in the church.</li>
            <li>Encourage all members to be literature missionaries.</li>
            <li>Nurture spiritual growth through inspired writings.</li>
            <li>Reach unreached communities with Christ-centered messages.</li>
            <li>Support youth through summer literature programs.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-800 mb-2">Why It Still Matters</h2>
          <p className="mb-2">
            A printed book or tract can quietly speak to a soul when words cannot. This ministry remains one of the most effective outreach channels today.
          </p>
          <p className="italic">
            “If there is one work more important than another, it is that of getting our publications before the people.” — Ellen G. White, <em>The Publishing Ministry</em>, p. 385
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-800 mb-2">How You Can Get Involved</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Share a tract or book daily.</li>
            <li>Volunteer for training or distribution workshops.</li>
            <li>Support evangelists through prayer or donations.</li>
            <li>Donate materials or help build the inventory.</li>
            <li>Pray for open hearts in our community.</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-2">Contact Us</h2>
          <p><strong>Phone:</strong> +254 740 486498 / +254 740 756479 / +254 112 998265</p>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default LiteratureMinistry;
