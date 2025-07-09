import React from 'react';

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
    <div className="p-8">
      <h2 className="mb-6 text-2xl font-bold">DeKUSDA Church Weekly Program</h2>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Day</th>
            <th className="px-4 py-2 border">Time</th>
            <th className="px-4 py-2 border">Activity</th>
          </tr>
        </thead>
        <tbody>
          {program.map((item, idx) => (
            <tr key={idx} className="text-center">
              <td className="px-4 py-2 border">{item.day}</td>
              <td className="px-4 py-2 border">{item.time}</td>
              <td className="px-4 py-2 border">{item.activity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

