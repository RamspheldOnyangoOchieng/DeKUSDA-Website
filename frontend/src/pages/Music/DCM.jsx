import React from 'react';

export const DCM = () => {
  return (
    <section className="px-6 py-12 bg-gray-50 lg:px-24">
      <div className="mx-auto max-w-5xl">
        {/* Title */}
        <h2 className="mb-6 text-4xl font-bold text-center text-blue-800">
          Divine Charm Melodies (DCM)
        </h2>

        {/* Who we are */}
        <div className="mb-10">
          <h3 className="mb-2 text-2xl font-semibold text-blue-700">Who We Are</h3>
          <p className="leading-relaxed text-gray-700">
            Divine Charm Melodies (DCM) is a mission-driven choral group under the Music Department of DEKUSDA.
            Our core purpose is to spread the gospel through spiritually uplifting music and service to the community.
            We believe in ministry through song, mentorship, and outreach—both within Dedan Kimathi University and beyond.
          </p>
        </div>

        {/* Mission */}
        <div className="mb-10">
          <h3 className="mb-2 text-2xl font-semibold text-blue-700">Our Mission</h3>
          <p className="leading-relaxed text-gray-700">
            To evangelize and inspire through choral music, living out the gospel commission of Matthew 28:19–20.
            We aim to be vessels of hope, joy, and transformation wherever the Lord sends us.
          </p>
        </div>

        {/* Group Activities */}
        <div className="mb-10">
          <h3 className="mb-2 text-2xl font-semibold text-blue-700">Group Activities</h3>
          <ul className="leading-relaxed list-disc list-inside text-gray-700">
            <li>Regular rehearsals and spiritual devotions</li>
            <li>Campus and church outreach through music</li>
            <li>Evangelistic missions in local and regional areas</li>
            <li>Community service and hospital visitations</li>
            <li>Annual music ministry retreats</li>
          </ul>
        </div>

        {/* Members Placeholder */}
        <div className="mb-10">
          <h3 className="mb-4 text-2xl font-semibold text-blue-700">Our Team</h3>
          <p className="italic text-center text-gray-600">
            Team roles and members will be updated soon.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DCM;