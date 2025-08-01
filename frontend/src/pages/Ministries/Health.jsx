import React from 'react';
import { Header } from '../../components/Layout/Header';
import { Footer } from '../../components/Layout/Footer';

const HealthClassSection = () => {
  return (
    <>
      <Header />

      {/* Full-width title bar */}
      <div className="bg-blue-900 text-white text-center py-4">
        <h1 className="text-3xl md:text-4xl font-bold">Health Class Ministry</h1>
      </div>

      <section className="w-full bg-white py-12 px-4 md:px-16 text-gray-800">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Mission Paragraph */}
          <p className="text-lg leading-relaxed">
            Through our regular <strong>Health Class</strong> sessions—a platform created for learning about healthy living, disease prevention, lifestyle reform, and mental health awareness—our mission is to educate, empower, and inspire members to take responsibility for their health as a sacred duty. We aim to present Christ and use <strong>Christ's method alone</strong>, leading souls to behold the Lamb of God that taketh away the sin of the world.
          </p>

          {/* Spirit of Prophecy Quote */}
          <blockquote className="bg-blue-100 border-l-4 border-blue-700 px-6 py-4 rounded-lg italic text-blue-800">
            True healing begins with God. <br />
            <strong>"Christ is the wellspring of life."</strong> That which many need is to have a clearer knowledge of Him; they need to be patiently and kindly, yet earnestly, taught how the whole being may be thrown open to the healing agencies of heaven.
            <div className="mt-2 text-sm text-right">– Ministry of Healing, p. 247.2</div>
          </blockquote>

          {/* Bible Verse */}
          <div className="text-lg font-semibold italic text-center text-blue-800">
            “Beloved, I wish above all things that thou mayest prosper and be in health, even as thy soul prospereth.”<br />
            <span className="text-sm text-gray-600">– 3 John 1:2</span>
          </div>

          {/* Closing Paragraph */}
          <p className="text-lg leading-relaxed">
            By grasping and incorporating the Health Message and applying it in our lives, <strong>doors shall be opened for the advancement of the cause of God.</strong>
          </p>
        </div>
      </section>

      {/* WhatsApp CTA Section */}
      <section className="mt-12 px-4 md:px-16">
        <div className="max-w-4xl mx-auto bg-blue-50 border-l-4 border-green-600 p-8 rounded-xl shadow-md text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4">Join Our Health Class Community</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Stay connected, get reminders, share health tips, and participate in our weekly sessions through our official WhatsApp group.
          </p>
          <a
            href="https://chat.whatsapp.com/GuZTzdXXMAAHBpqFTPJrqW?mode=ac_t"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            Join WhatsApp Group
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default HealthClassSection;
