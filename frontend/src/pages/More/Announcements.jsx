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

      <main className="px-6 py-10 mx-auto max-w-5xl font-sans bg-gray-50 min-h-screen">
        <h2 className="mb-6 text-3xl font-bold text-center text-blue-900">DeKUSDA Church Weekly Program</h2>
        <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
          <table className="min-w-full border border-gray-300 text-gray-800">
            <thead className="bg-blue-100 text-blue-800">
              <tr>
                <th className="px-6 py-3 border font-semibold text-left">Day</th>
                <th className="px-6 py-3 border font-semibold text-left">Time</th>
                <th className="px-6 py-3 border font-semibold text-left">Activity</th>
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
      </main>

      <Footer />
    </>
  );
}
