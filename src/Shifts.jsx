import { useState, useEffect } from 'react';
import axios from 'axios';

function Shifts() {
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    async function getAllShifts() {
      try {
        const response = await axios.get("http://localhost:3007/shifts");
        setShifts(response.data);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    }

    getAllShifts();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table-auto min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-900 uppercase">Worker ID</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-900 uppercase">Date</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-900 uppercase">Start Time</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-900 uppercase">End Time</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'}>
              <td className="px-4 py-2 text-sm text-gray-800">{shift.worker_id}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{shift.date}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{shift.start_time}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{shift.end_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Shifts;
