import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api'; // Axios instance with token

export default function AddEntry() {
  const [title, setTitle] = useState('');
  const [thought, setThought] = useState('');
  const [mood, setMood] = useState('Happy');
  const [suggestion, setSuggestion] = useState('');
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/api/mindmaps', {
        title,
        thought,
        mood,
        nodes: [
          { id: '1', label: thought },
          { id: '2', label: mood },
        ],
      });
      alert('✅ Mindmap saved!');
      setTitle('');
      setThought('');
      setMood('Happy');
      setSuggestion('');
    } catch (error) {
      console.error('❌ Error saving mindmap:', error.response?.data || error.message);
      alert('Failed to save mindmap.');
    }
  };

  const handleGetSuggestion = async () => {
    if (!thought && !title) return alert("✍️ Please enter a thought or title first.");
    setLoadingSuggestion(true);
    setSuggestion('');
    try {
      const res = await API.post('/api/ai/suggest', {
        thought: thought || title,
      });
      setSuggestion(res.data.suggestion);
    } catch (err) {
      console.error(err);
      setSuggestion('❌ Failed to fetch AI suggestion.');
    } finally {
      setLoadingSuggestion(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📝 Add New Mindmap</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl bg-white p-6 rounded shadow">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded mt-1"
            placeholder="Mindmap title"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Thought</label>
          <textarea
            value={thought}
            onChange={(e) => setThought(e.target.value)}
            className="w-full border px-3 py-2 rounded mt-1"
            rows="4"
            placeholder="Your core thought here"
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-medium">Mood</label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full border px-3 py-2 rounded mt-1"
          >
            <option>Happy</option>
            <option>Sad</option>
            <option>Excited</option>
            <option>Angry</option>
            <option>Anxious</option>
            <option>Neutral</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          ➕ Save Mindmap
        </button>
      </form>

      {/* AI Suggestion Section */}
      <div className="mt-6 max-w-xl">
        <button
          type="button"
          onClick={handleGetSuggestion}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
        >
          🤖 Get AI Suggestion
        </button>

        {loadingSuggestion && <p className="mt-3 text-sm text-gray-600">Thinking...</p>}

        {suggestion && (
          <div className="mt-4 p-4 bg-purple-50 border border-purple-300 rounded text-purple-800">
            <strong>💡 AI Suggestion:</strong>
            <p>{suggestion}</p>
          </div>
        )}
      </div>
    </div>
  );
}
