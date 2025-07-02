import React from 'react';

const ElderMessage = () => {
  return (
    <section className="px-6 py-12 font-sans text-gray-800 bg-gray-100 lg:px-24">
      <div className="p-6 mx-auto max-w-5xl bg-white rounded-xl shadow-md md:p-10">
        {/* Header Section */}
        <div className="flex flex-col gap-6 items-start mb-8 md:flex-row">
          <img
            src="/images/elder.jpg"
            alt="First Elder"
            className="w-40 h-auto rounded-lg shadow-sm"
          />
          <div>
            <h1 className="mb-2 text-3xl font-bold text-blue-800">Word From the First Elder</h1>
            <h3 className="text-lg font-semibold text-gray-600">Brian Okari, First Elder</h3>
            <p className="mt-2 italic text-gray-500">
              "How good! How pleasant! it is for brethren to commune together in love."
            </p>
          </div>
        </div>

        {/* Body Text */}
        <div className="space-y-6 leading-relaxed text-[1.05rem]">
          <p>
            Welcome to DeKUSDA, the Seventh-day Adventist Church at Dedan Kimathi University of Technology.
            I warmly welcome you to this sacred space — a home far away from home, where faith meets intellect,
            and divine purpose shapes destinies.
          </p>

          <p>
            In a world that is constantly changing, filled with empty pursuits, and ever-widening voids; in such a world that needs
            light, hope, and direction, DeKUSDA Church stands as a beacon of hope and spiritual anchorage. Within the dynamic and
            often challenging university environment, our church strives — in the most diverse and intentional ways — to meet the
            deepest spiritual, emotional, and moral needs of students and members.
          </p>

          <p>
            Guided by our vision: <span className="font-bold text-blue-800">"To empower the Seventh-day Adventist students, professionals, the Church, and to heal the nation"</span>,
            we are committed to fostering a mission-focused culture through public campus ministries, personal ministry, and
            evangelistic outreach.
          </p>

          <p>
            <span className="italic text-gray-600">
              "Iron sharpeneth iron; so a man sharpeneth the countenance of his friend." — Proverbs 27:17
            </span><br />
            We place a strong emphasis on mentorship among members — where the spiritually mature walk alongside the young in faith —
            and on the upbringing of leaders who are rooted in Christ and equipped to serve.
          </p>

          <p>
            A church that fails to engage in mission and evangelism risks losing its heart and identity. Thus, as a church, we are
            unequivocally committed to the Great Commission Christ entrusted to us in
            <span className="font-semibold text-blue-700"> Matthew 28:18–20</span>, where He declares,
            <span className="italic text-gray-600"> “All authority in heaven and on earth has been given to Me. Go ye therefore and make disciples…”</span>
          </p>

          <p>
            As a church, we move forward not by our own strength, but with unwavering confidence in the One who called us.
            Christ’s words echo time and again and anchor our ministry:
            <span className="italic text-gray-600"> “Lo, I am with you alway, even unto the end of the world”</span> (Matthew 28:20).
            Through every season, every challenge, and every opportunity, God has been faithful — and we trust fully in His continued leading.
          </p>

          <p className="font-semibold text-blue-800">Welcome on board!</p>
        </div>
      </div>
    </section>
  );
};

export default ElderMessage;
