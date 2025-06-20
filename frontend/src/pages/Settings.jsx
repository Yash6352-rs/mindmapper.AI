import { useState } from 'react';
import API from '../utils/api'; // axios with token
import { saveAs } from 'file-saver';

export default function Settings() {
  const [downloading, setDownloading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleExportData = async () => {
    setDownloading(true);
    try {
      const res = await API.get('/api/mindmaps'); // Get user-specific mindmaps
      const blob = new Blob([JSON.stringify(res.data, null, 2)], { type: 'application/json' });
      saveAs(blob, 'my_mindmaps.json');
    } catch (err) {
      console.error('Export failed:', err);
      alert('Failed to export data.');
    } finally {
      setDownloading(false);
    }
  };


  const handleDeleteAccount = async () => {
    if (!window.confirm("⚠️ Are you sure you want to delete your account permanently?")) return;

    try {
      const res = await API.delete("/api/users/me");
      alert(res.data.message);
      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (err) {
      console.error("❌ Delete error:", err.response?.data || err.message);
      alert("Failed to delete account. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">⚙️ Settings</h1>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">🧠 Export My Mindmaps</h2>
          <p className="text-gray-600 mb-2">Download all your saved mindmaps as a JSON file.</p>
          <button
            onClick={handleExportData}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={downloading}
          >
            {downloading ? 'Exporting...' : 'Download'}
          </button>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">❌ Delete Account</h2>
          <p className="text-gray-600 mb-2">Permanently delete your account and all data.</p>
          <button
            onClick={handleDeleteAccount}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            disabled={deleteLoading}
          >
            {deleteLoading ? 'Deleting...' : 'Delete Account'}
          </button>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">🚪 Logout</h2>
          <button
            onClick={handleLogout}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
