import { useEffect, useState } from 'react';
import axios from '../utils/api';

export default function Dashboard() {
  const [mindmaps, setMindmaps] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editNodes, setEditNodes] = useState('');

  const fetchMindmaps = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('/mindmaps', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMindmaps(response.data);
    } catch (error) {
      console.error('Error fetching mindmaps:', error);
    }
  };

  useEffect(() => {
    fetchMindmaps();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/mindmaps/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMindmaps((prev) => prev.filter((m) => m._id !== id));
      alert('Mindmap deleted ✅');
    } catch (err) {
      alert('Delete failed ❌');
    }
  };

  const startEditing = (mindmap) => {
    setEditingId(mindmap._id);
    setEditTitle(mindmap.title);
    setEditNodes(JSON.stringify(mindmap.nodes, null, 2));
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle('');
    setEditNodes('');
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      const updated = await axios.put(
        `/mindmaps/${editingId}`,
        {
          title: editTitle,
          nodes: JSON.parse(editNodes),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMindmaps((prev) =>
        prev.map((map) =>
          map._id === editingId ? updated.data.mindmap : map
        )
      );
      alert('Mindmap updated ✅');
      cancelEditing();
    } catch (err) {
      alert('Update failed ❌');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📘 Your Mindmaps</h1>

      {mindmaps.length === 0 ? (
        <p>No mindmaps yet. Add one first!</p>
      ) : (
        <div className="space-y-6">
          {mindmaps.map((mindmap) => (
            <div key={mindmap._id} className="bg-white p-4 rounded shadow">
              {editingId === mindmap._id ? (
                <div>
                  <input
                    className="w-full p-2 border rounded mb-2"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Title"
                  />
                  <textarea
                    className="w-full p-2 border rounded mb-2"
                    rows={4}
                    value={editNodes}
                    onChange={(e) => setEditNodes(e.target.value)}
                    placeholder='Example: [{"id":"1","label":"Root"}]'
                  />
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                    onClick={handleUpdate}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-500 text-white px-3 py-1 rounded"
                    onClick={cancelEditing}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between mb-2 text-sm text-gray-600">
                    <span>{new Date(mindmap.createdAt).toLocaleString()}</span>
                    <span>ID: {mindmap._id}</span>
                  </div>
                  <h2 className="text-xl font-semibold">{mindmap.title}</h2>
                  <pre className="text-sm bg-gray-100 p-2 rounded mt-2">
                    {JSON.stringify(mindmap.nodes, null, 2)}
                  </pre>
                  <div className="mt-3">
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
                      onClick={() => startEditing(mindmap)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() => handleDelete(mindmap._id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
