import React from "react";
import { Header } from "../../components/Layout/Header";
import { Footer } from "../../components/Layout/Footer";

const ProphecyDepartment = () => {
  return (
    <>
      <Header />

      <div className="bg-gray-100 py-12 px-4 md:px-20 min-h-screen font-sans text-gray-800">
        {/* Title with full-width background */}
        <div className="bg-blue-900 text-white text-center py-4 w-full mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Prophecy Department</h1>
          <p className="italic text-lg">"Surely the Lord God will do nothing, but he revealeth his secret unto his servants the prophets." – Amos 3:7</p>
        </div>

        {/* About */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">About Prophecy Department</h2>
          <p className="text-lg leading-relaxed">
            The Prophecy Department is a spiritual resource hub within the church dedicated to studying,
            teaching, and applying the prophetic messages of the Bible. Our mission is to help members
            understand God's purpose in current events and prepare spiritually for Christ’s soon return.
          </p>
        </section>

        {/* Aims */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Aims</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>To promote the study of Bible prophecy (Daniel, Revelation, and more).</li>
            <li>To help members recognize signs of the times and their relevance to daily Christian life.</li>
            <li>To encourage watchfulness, spiritual growth, and faithfulness in preparation for the Second Coming.</li>
            <li>To equip the church and community with truth, discernment, and hope through prophecy seminars, Bible studies, and outreach.</li>
          </ul>
        </section>

        {/* Does Prophecy Matter? */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Does Prophecy Matter?</h2>
          <p className="mb-3">
            It is evident that the world we live in is broken. Is there hope? Yes, there is hope. Through
            Bible prophecy, we receive:
          </p>
          <blockquote className="bg-blue-50 border-l-4 border-blue-300 px-6 py-4 rounded-md italic text-blue-900">
            “The Revelation of Jesus Christ, which God gave unto him, to shew unto his servants things
            which must shortly come to pass...” — Revelation 1:1
            <br />
            “Blessed is he that readeth, and they that hear the words of this prophecy, and keep those
            things which are written therein.” — Revelation 1:3
          </blockquote>
        </section>

        {/* What We Do */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">What We Do</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Weekly or monthly prophecy study sessions</li>
            <li>End-time prophecy studies</li>
            <li>Interactive sessions on current world events in light of prophecy</li>
            <li>Support for youth and new believers in understanding difficult prophetic symbols</li>
            <li>Community outreach with literature and media</li>
          </ul>
        </section>

        {/* Links */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Join & Explore</h2>
          <p className="mb-2">
            <strong>WhatsApp Group:</strong> {" "}
            <a
              href="https://chat.whatsapp.com/De8PwoUz2zE9AhDa6dL9Fw?mode=ac_t"
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Click to join
            </a>
          </p>
          <p>
            <strong>Google Classroom:</strong> {" "}
            <a
              href="https://classroom.google.com/c/NzI3MjY3ODM4MDA2?cjc=ulb5z7f"
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Access resources
            </a>
          </p>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default ProphecyDepartment;
