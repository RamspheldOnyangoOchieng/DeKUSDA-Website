import React from 'react';
import { 
  FaUsers, FaHandsHelping, FaHeartbeat, FaBookOpen, FaPray, 
  FaBible, FaMusic, FaMicrophone, FaChurch
} from 'react-icons/fa';
import { AiOutlineArrowRight } from 'react-icons/ai';

const FeaturedMinistries = () => {
  const ministries = [
    {
      title: "Deconary Department",
      description: "Supporting church leadership through orderly worship services and spiritual guidance for our university community.",
      icon: FaChurch,
      members: "Deacons & Deaconesses",
      meetingTime: "Monthly Training",
      link: "/DeconaryDepartment"
    },
    {
      title: "Personal Ministries",
      description: "Equipping members for evangelism and community outreach through practical training and witness.",
      icon: FaHandsHelping,
      members: "Active Volunteers",
      meetingTime: "Sabbath 3:00 PM",
      link: "/Personalministries"
    },
    {
      title: "Prayer Department",
      description: "Interceding for our university community, church, and world through dedicated prayer warriors.",
      icon: FaPray,
      members: "Prayer Warriors",
      meetingTime: "Daily Prayer",
      link: "/PrayerDepartment"
    },
    {
      title: "AMO / ALO",
      description: "Adventist Men's Organization and Adventist Ladies Organization fostering fellowship and service.",
      icon: FaUsers,
      members: "Men & Women",
      meetingTime: "Monthly Meetings",
      link: "/AMO_ALO"
    },
    {
      title: "Health Department",
      description: "Promoting wholistic health - physical, mental, and spiritual wellbeing for university students.",
      icon: FaHeartbeat,
      members: "Health Professionals",
      meetingTime: "Monthly Seminars",
      link: "/Health"
    },
    {
      title: "Sabbath School",
      description: "Interactive Bible study and spiritual education for all ages within our university community.",
      icon: FaBookOpen,
      members: "Study Groups",
      meetingTime: "Sabbath 8:20 AM",
      link: "/SabbathSchool"
    },
    {
      title: "Prophecy Department",
      description: "Studying and teaching biblical prophecy and last day events for spiritual preparation.",
      icon: FaBible,
      members: "Bible Students",
      meetingTime: "Weekly Studies",
      link: "/Prophecy"
    },
    {
      title: "Church Choir",
      description: "Leading worship through traditional hymns and contemporary Christian music.",
      icon: FaMusic,
      members: "Main Choir",
      meetingTime: "Wednesday 6:00 PM",
      link: "/Music/ChurchChoir"
    },
    {
      title: "Blissful Tones",
      description: "Contemporary worship group bringing modern praise to our university services.",
      icon: FaMicrophone,
      members: "Youth Choir",
      meetingTime: "Friday Rehearsals",
      link: "/Music/Blissful"
    }
  ];

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-darkBlue mb-4">
            Our Active Ministries & Departments
          </h2>
          <p className="text-xl text-softGray max-w-3xl mx-auto">
            Discover ways to serve, grow, and connect through our diverse ministry opportunities at 
            Dedan Kimathi University SDA Church. Every student and member has a place to use their gifts for God's glory.
          </p>
          <div className="mt-6 h-1 w-24 bg-primaryBlue mx-auto rounded-full"></div>
        </div>

        {/* Ministries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {ministries.map((ministry, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
            >
              {/* Ministry Card Header */}
              <div className="bg-primaryBlue p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <ministry.icon className="text-4xl text-lightBlue" />
                  <div className="text-right">
                    <div className="text-sm opacity-90">{ministry.members}</div>
                    <div className="text-xs opacity-75">{ministry.meetingTime}</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold">{ministry.title}</h3>
              </div>

              {/* Ministry Card Body */}
              <div className="p-6">
                <p className="text-softGray leading-relaxed mb-6">
                  {ministry.description}
                </p>
                
                <button 
                  onClick={() => window.location.href = ministry.link}
                  className="group flex items-center justify-between w-full px-4 py-3 bg-gray-50 hover:bg-lightBlue/20 text-darkBlue hover:text-primaryBlue rounded-lg transition-all duration-200"
                >
                  <span className="font-medium">Learn More</span>
                  <AiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-primaryBlue text-white p-8 rounded-2xl">
          <h3 className="text-2xl font-bold mb-4">Ready to Get Involved?</h3>
          <p className="text-lightBlue mb-6 max-w-2xl mx-auto">
            Join one of our ministries and discover your purpose in God's kingdom. 
            Every gift, every talent, every heart matters in our university church family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-primaryBlue font-semibold rounded-lg hover:bg-lightBlue transition-colors">
              Contact Ministry Leaders
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primaryBlue transition-colors">
              View All Ministries
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMinistries;
