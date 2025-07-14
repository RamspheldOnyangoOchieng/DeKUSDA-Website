import React from 'react';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const sabbathEvents = [
  { date: 'May 10', sabbathSchool: '', divineService: '', event: 'Nature Sabbath' },
  { date: 'May 17', sabbathSchool: 'Sentinels Family', divineService: 'Echoes of Truth', event: 'E.O.T Launch' },
  { date: 'May 24', sabbathSchool: 'Fountain of Life', divineService: 'BEREANS', event: 'Stewardship Sabbath' },
  { date: 'May 31', sabbathSchool: 'Sabbath School Dept.', divineService: 'Sabbath School Dept.', event: 'Sabbath School Sabbath' },
  { date: 'June 7', sabbathSchool: 'WoSE committee', divineService: 'WoSE committee', event: 'WOSE (AMO/ALO) Sabbath' },
  { date: 'June 14', sabbathSchool: 'Doves Family', divineService: 'Media Committee', event: 'Communication Sabbath' },
  { date: 'June 21', sabbathSchool: 'COLLETS', divineService: 'Evangelism committee', event: 'Evangelism Sabbath' },
  { date: 'June 28', sabbathSchool: 'House of Bread', divineService: 'AMO/ALO Department', event: 'PCM Sabbath' },
  { date: 'July 5', sabbathSchool: 'Deaconry Department', divineService: 'Deaconry Department', event: 'High Sabbath' },
  { date: 'July 12', sabbathSchool: 'Heralds Family', divineService: 'Health Class', event: 'Health Sabbath' },
  { date: 'July 19', sabbathSchool: 'Music Department', divineService: 'Music committee', event: 'Music Sabbath' },
  { date: 'July 26', sabbathSchool: 'Pillars of Truth', divineService: 'Elders’ Council', event: 'Elders’ Sabbath' },
  { date: 'Aug 2', sabbathSchool: 'Royals Family', divineService: 'Lit. Evangelism Committee', event: 'Lit. Evangelism Sabbath' },
  { date: 'Aug 9', sabbathSchool: 'House of Bread Family', divineService: 'PILGRIMS', event: 'Staff Sabbath' },
  { date: 'Aug 16', sabbathSchool: 'Peniel Family', divineService: 'Prophecy Class', event: 'Prophecy Sabbath' },
  { date: 'Aug 23', sabbathSchool: 'Pearls & Goshen Family', divineService: 'FOFANA', event: 'Pastoral Sabbath' },
  { date: 'Aug 30', sabbathSchool: 'Town Estate', divineService: 'Prayer Department', event: 'Open Sabbath' },
];

export default function SabbathCalendar() {
  return (
    <>
      <Header />

      {/* Full-width blue title header */}
      <div className="w-full bg-blue-900 text-white py-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">
          May–August 2025 Sabbath Program
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
                  <td className="px-6 py-3 border">{item.sabbathSchool || '-'}</td>
                  <td className="px-6 py-3 border">{item.divineService || '-'}</td>
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
