import React from 'react';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const program = [
  { day: 'Sunday', time: '2:00 - 5:00 PM', activity: 'Choir Practice' },
  { day: 'Monday', time: '5:00 - 6:00 PM', activity: 'Prayer Meeting' },
  { day: 'Tuesday', time: '6:30 - 8:00 PM', activity: 'Family Meeting' },
  { day: 'Wednesday', time: '5:00 - 6:00 PM', activity: 'Mid-week Prayers' },
  { day: 'Wednesday', time: '6:30 - 8:00 PM', activity: 'Bible Study' },
  { day: 'Thursday', time: '4:30 - 6:00 PM', activity: 'Lesson Harmonization' },
  { day: 'Friday', time: '4:00 - 6:00 PM', activity: 'Choir Practice' },
  { day: 'Friday', time: '6:30 - 8:00 PM', activity: 'Friday Vespers' },
  { day: 'Saturday', time: '7:50 AM - 6:00 PM', activity: 'Sabbath Worship' }
];

export default function ChurchProgram() {
  return (
    <>
      <Header />

      {/* Full-width blue header section */}
      <section className="w-full bg-blue-900 text-white py-10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-2">DeKUSDA Church Weekly Program</h2>
          <p className="text-lg italic text-blue-100">
            “Let all things be done decently and in order.” – 1 Corinthians 14:40
          </p>
        </div>
      </section>

      {/* Main content */}
      <main className="px-6 py-12 mx-auto max-w-5xl min-h-screen bg-gray-100 font-sans text-gray-800">
        <div className="p-6 bg-white rounded-xl shadow-lg">
          {/* Table Section */}
          <section className="mb-12">
            <h3 className="text-2xl font-semibold text-blue-800 mb-4 border-b pb-2">
              Weekly Schedule
            </h3>
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-blue-100 text-blue-900 text-left">
                  <tr>
                    <th className="px-6 py-3 border">Day</th>
                    <th className="px-6 py-3 border">Time</th>
                    <th className="px-6 py-3 border">Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {program.map((item, idx) => (
                    <tr key={idx} className="even:bg-gray-50 hover:bg-blue-50 transition">
                      <td className="px-6 py-3 border">{item.day}</td>
                      <td className="px-6 py-3 border">{item.time}</td>
                      <td className="px-6 py-3 border">{item.activity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Mission Section */}
          <section className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold text-green-800 mb-2">
              Mission Emphasis: Evangelistic Campaign to Eldoret
            </h3>
            <p className="mb-2 text-gray-700">
              We shall be heading to <strong>Eldoret</strong> for our evangelistic campaign.
              The theme is: <span className="italic font-semibold text-blue-800">"Behold He Cometh"</span>.
              <br />
              <strong>Key Text:</strong> Revelation 22:12
            </p>
            <p className="text-gray-800 font-medium mt-4">Support the Mission:</p>
            <ul className="text-gray-700 list-disc ml-5">
              <li><strong>Paybill:</strong> 247247</li>
              <li><strong>Account Number:</strong> 144111#M25</li>
            </ul>
            <p className="mt-2 italic text-sm text-gray-500">
              Every contribution helps share the Gospel.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
