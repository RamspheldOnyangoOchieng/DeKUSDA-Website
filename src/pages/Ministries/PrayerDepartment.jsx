import { Header } from '../../components/Layout/Header';
import { Footer } from '../../components/Layout/Footer';
import { AiOutlineClockCircle, AiOutlineTeam, AiOutlineCalendar } from 'react-icons/ai';
import { FiUsers, FiBookOpen } from 'react-icons/fi';

const PrayerDepartment = () => {
  return (
    <>
      <div className="w-full">
        <Header />

        {/* Hero Section (Reduced height) */}
        <div className="relative bg-gradient-to-r from-primaryBlue to-darkBlue text-white py-10 px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Prayer Department</h1>
          <p className="text-lg max-w-2xl mx-auto">
            The spiritual foundation of DEKUSDA, fostering a culture of prayer and devotion
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto py-12 px-6">

          {/* Leadership Section */}
          <div className="mb-16 bg-white p-8 rounded-xl shadow-lg border-l-4 border-primaryBlue">
            <h2 className="text-3xl font-bold text-darkBlue mb-6 flex items-center">
              <AiOutlineTeam className="mr-3 text-primaryBlue" />
              Leadership Team
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold text-primaryBlue mb-2">Department Leader</h3>
                <p className="text-xl text-gray-800">Jessy Kiplimo</p>
                <p className="text-gray-600 mt-2">Oversees all prayer initiatives and spiritual guidance</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold text-primaryBlue mb-2">Assistant Leader</h3>
                <p className="text-xl text-gray-800">Brian Kitheka</p>
                <p className="text-gray-600 mt-2">Coordinates prayer schedules and member participation</p>
              </div>
            </div>
          </div>

          {/* Prayer Schedule */}
          <div className="mb-16 bg-white p-8 rounded-xl shadow-lg border-l-4 border-primaryBlue">
            <h2 className="text-3xl font-bold text-darkBlue mb-6 flex items-center">
              <AiOutlineClockCircle className="mr-3 text-primaryBlue" />
              Prayer Schedule
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-primaryBlue mb-4 flex items-center">
                  <FiBookOpen className="mr-3" />
                  Daily Devotions
                </h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-bold text-darkBlue">Morning Prayer</h4>
                  <p className="text-gray-700">4:30 AM - 5:00 AM</p>
                  <p className="text-sm text-gray-500 mt-1">Using "With God at Dawn" by Ellen G. White</p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-primaryBlue mb-4 flex items-center">
                  <FiUsers className="mr-3" />
                  Weekly Gatherings
                </h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-bold text-darkBlue">Evening Prayer</h4>
                  <p className="text-gray-700">Monday, Wednesday, Friday</p>
                  <p className="text-gray-700">5:00 PM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Special Programs */}
          <div className="mb-16 bg-white p-8 rounded-xl shadow-lg border-l-4 border-primaryBlue">
            <h2 className="text-3xl font-bold text-darkBlue mb-6 flex items-center">
              <AiOutlineCalendar className="mr-3 text-primaryBlue" />
              Special Programs
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold text-primaryBlue mb-2">Prayer & Fasting</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Leaders' Session: Once per semester</li>
                  <li>Church-wide: Once per semester</li>
                </ul>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold text-primaryBlue mb-2">Week of Spiritual Emphasis</h3>
                <p className="text-gray-700">
                  Semesterly event focused on current spiritual needs with theme-based guidance
                </p>
              </div>
            </div>
          </div>

          {/* Purpose Section */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-primaryBlue">
            <h2 className="text-3xl font-bold text-darkBlue mb-6">Our Purpose</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                The Prayer Department exists to cultivate a deep prayer culture within DEKUSDA, serving as:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The spiritual backbone supporting all church activities</li>
                <li>A training ground for personal prayer development</li>
                <li>A covering of intercession for the university community</li>
                <li>A catalyst for spiritual revival and transformation</li>
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-darkBlue mb-4">Join Our Prayer Community</h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Whether you're new to prayer or have an established prayer life, we welcome you to grow with us.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-6 py-3 bg-primaryBlue text-white rounded-lg hover:bg-darkBlue transition-colors font-semibold">
                Become a Prayer Warrior
              </button>
              <button className="px-6 py-3 border-2 border-primaryBlue text-primaryBlue rounded-lg hover:bg-primaryBlue hover:text-white transition-colors font-semibold">
                Request Prayer
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default PrayerDepartment;
