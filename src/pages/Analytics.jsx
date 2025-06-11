import { useEffect, useState } from 'react';
import { getEntries } from '../utils/entries';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Analytics() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    setEntries(getEntries());
  }, []);

  const moodCounts = {};
  const dayCounts = {};

  entries.forEach((entry) => {
    // Mood count
    moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;

    // Day count
    const day = new Date(entry.date).toLocaleDateString();
    dayCounts[day] = (dayCounts[day] || 0) + 1;
  });

  const moodData = {
    labels: Object.keys(moodCounts),
    datasets: [
      {
        data: Object.values(moodCounts),
        backgroundColor: [
          '#4ade80', // Green
          '#f87171', // Red
          '#60a5fa', // Blue
          '#facc15', // Yellow
          '#a78bfa', // Purple
          '#9ca3af', // Gray
        ],
      },
    ],
  };

  const barData = {
    labels: Object.keys(dayCounts),
    datasets: [
      {
        label: 'Entries Per Day',
        data: Object.values(dayCounts),
        backgroundColor: '#60a5fa',
      },
    ],
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📊 Analytics</h1>

      {entries.length === 0 ? (
        <p>No data to show yet. Add entries to see analytics.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Mood Distribution</h2>
            <Pie data={moodData} />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Entries Per Day</h2>
            <Bar data={barData} />
          </div>
        </div>
      )}
    </div>
  );
}
