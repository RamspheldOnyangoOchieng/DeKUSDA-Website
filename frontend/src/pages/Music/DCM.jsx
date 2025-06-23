import React from 'react';

const DCM = () => {
  return (
    <section className="bg-gray-50 py-12 px-6 lg:px-24">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl font-bold text-blue-800 mb-6 text-center">
          Dynamic Choral Ministry (DCM)
        </h2>

        {/* Who we are */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-blue-700 mb-2">Who We Are</h3>
          <p className="text-gray-700 leading-relaxed">
            The Dynamic Choral Ministry (DCM) is a mission-driven choral group under the Music Department of DEKUSDA.
            Our core purpose is to spread the gospel through spiritually uplifting music and service to the community.
            We believe in ministry through song, mentorship, and outreach—both within Dedan Kimathi University and beyond.
          </p>
        </div>

        {/* Mission */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-blue-700 mb-2">Our Mission</h3>
          <p className="text-gray-700 leading-relaxed">
            To evangelize and inspire through choral music, living out the gospel commission of Matthew 28:19–20.
            We aim to be vessels of hope, joy, and transformation wherever the Lord sends us.
          </p>
        </div>

        {/* Group Activities */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-blue-700 mb-2">Group Activities</h3>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed">
            <li>Regular rehearsals and spiritual devotions</li>
            <li>Campus and church outreach through music</li>
            <li>Evangelistic missions in local and regional areas</li>
            <li>Community service and hospital visitations</li>
            <li>Annual music ministry retreats</li>
          </ul>
        </div>

        {/* Members */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4">Our Team</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
            {/* Replace these with real members later */}
            {[
              { name: 'John Doe', role: 'Chairperson' },
              { name: 'Jane Mwangi', role: 'Music Director' },
              { name: 'Samuel Otieno', role: 'Missions Coordinator' },
              { name: 'Grace Achieng', role: 'Treasurer' },
              { name: 'David Kimani', role: 'Prayer & Welfare' },
              { name: 'Mercy Wanja', role: 'Secretary' },
            ].map((member, idx) => (
              <div key={idx} className="bg-white p-4 rounded shadow-sm hover:shadow-md transition">
                <h4 className="font-bold text-blue-800">{member.name}</h4>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DCM;
