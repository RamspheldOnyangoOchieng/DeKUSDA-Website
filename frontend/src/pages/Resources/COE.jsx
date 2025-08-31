import React from 'react';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const sabbathEvents = [
  { date: '06/09/2025', sabbathSchool: '', divineService: '', event: 'OPEN SABBATH' },
  { date: '13/09/2025', sabbathSchool: '', divineService: '', event: 'Handing Over' },
  { date: '20/09/2025', sabbathSchool: '', divineService: '', event: 'Communication Sabbath' },
  { date: '27/09/2025', sabbathSchool: '', divineService: '', event: 'High Sabbath' },

  { date: '04/10/2025', sabbathSchool: '', divineService: '', event: 'First Years Sabbath' },
  { date: '11/10/2025', sabbathSchool: '', divineService: '', event: 'Week Of Spiritual Emphasis Sabbath, Prayer Night' },
  { date: '18/10/2025', sabbathSchool: '', divineService: '', event: 'AMO / ALO Sabbath' },
  { date: '25/10/2025', sabbathSchool: '', divineService: '', event: 'Music Sabbath' },

  { date: '01/11/2025', sabbathSchool: '', divineService: '', event: 'Literature Evangelism' },
  { date: '08/11/2025', sabbathSchool: '', divineService: '', event: 'Associates Sabbath' },
  { date: '15/11/2025', sabbathSchool: '', divineService: '', event: 'Prophecy Sabbath' },
  { date: '22/11/2025', sabbathSchool: '', divineService: '', event: 'Finalist Sabbath' },
  { date: '29/11/2025', sabbathSchool: '', divineService: '', event: 'Personal Ministries Sabbath' },
  { date: '30/11/2025', sabbathSchool: '', divineService: '', event: 'Prayer and Fasting Day' },

  { date: '06/12/2025', sabbathSchool: '', divineService: '', event: 'Health Sabbath' },
  { date: '13/12/2025', sabbathSchool: '', divineService: '', event: 'Sabbath School Sabbath' },
  { date: '20/12/2025', sabbathSchool: '', divineService: '', event: 'Stewardship Sabbath' },
  { date: '27/12/2025', sabbathSchool: '', divineService: '', event: 'MISSION SABBATH' },

  { date: '03/01/2026', sabbathSchool: '', divineService: '', event: 'MISSION SABBATH' },
];

export default function SabbathCalendar() {
  return (
    <>
      <Header />

      {/* Full-width blue title header */}
      <div className="w-full bg-blue-900 text-white py-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">
          Calendar of Events Draft (Tentative)
        </h1>
      </div>

      {/* Page Content */}
      <main className="px-6 py-10 mx-auto max-w-6xl font-sans bg-gray-50 min-h-screen">
        <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
          <table className="min-w-full border border-gray-300 text-gray-800">
            <thead className="bg-blue-100 text-blue-800">
              <tr>
                <th className="px-6 py-3 border font-semibold text-left">Date</th>
                <th className="px-6 py-3 border font-semibold text-left">Sabbath School</th>
                <th className="px-6 py-3 border font-semibold text-left">Divine Service</th>
                <th className="px-6 py-3 border font-semibold text-left">Sabbath Event</th>
              </tr>
            </thead>
            <tbody>
              {sabbathEvents.map((item, idx) => (
                <tr key={idx} className="even:bg-gray-50 hover:bg-blue-50 transition">
                  <td className="px-6 py-3 border">{item.date}</td>
                  <td className="px-6 py-3 border">{item.sabbathSchool || ''}</td>
                  <td className="px-6 py-3 border">{item.divineService || ''}</td>
                  <td className="px-6 py-3 border">{item.event}</td>
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
