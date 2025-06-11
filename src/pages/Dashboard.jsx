import { useEffect, useState } from 'react';
import { getEntries } from '../utils/entries';

export default function Dashboard() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    setEntries(getEntries());
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📘 Dashboard</h1>

      {entries.length === 0 ? (
        <p>No entries yet. Add your first one!</p>
      ) : (
        <div className="space-y-4">
          {entries.map((entry, index) => (
            <div key={index} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between mb-2 text-sm text-gray-500">
                <span>{entry.date}</span>
                <span>Mood: {entry.mood}</span>
              </div>
              <h2 className="text-xl font-semibold">{entry.title}</h2>
              <p>{entry.thought}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
