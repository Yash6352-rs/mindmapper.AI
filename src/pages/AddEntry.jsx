import { useState } from 'react';
import { saveEntry } from '../utils/entries';

export default function AddEntry() {
  const [title, setTitle] = useState('');
  const [thought, setThought] = useState('');
  const [mood, setMood] = useState('Happy');

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = {
      title,
      thought,
      mood,
      date: new Date().toLocaleString(),
    };

    saveEntry(entry); // Save to local storage

    alert('Entry saved!');
    setTitle('');
    setThought('');
    setMood('Happy');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📝 Add New Entry</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl bg-white p-6 rounded shadow">

        <div>
          <label className="block font-medium">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}className="w-full border px-3 py-2 rounded mt-1" placeholder="What's on your mind?" required />
        </div>

        <div>
          <label className="block font-medium">Thought</label>
          <textarea value={thought} onChange={(e) => setThought(e.target.value)} className="w-full border px-3 py-2 rounded mt-1" rows="4" placeholder="Write your thoughts here..." required></textarea>
        </div>

        <div>
          <label className="block font-medium">Mood</label>
          <select value={mood} onChange={(e) => setMood(e.target.value)} className="w-full border px-3 py-2 rounded mt-1">
            <option>Happy</option>
            <option>Sad</option>
            <option>Angry</option>
            <option>Excited</option>
            <option>Anxious</option>
            <option>Neutral</option>
          </select>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"> ➕ Add Entry </button>
      </form>
    </div>
  );
}
