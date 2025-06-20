import { NavLink, useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();

  const linkClass =
    'block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded transition duration-200';
  const activeClass = 'bg-gray-300 font-semibold';

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="w-64 bg-white p-6 shadow-md h-full flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-blue-600">🧠 MindMapper</h2>
        <nav className="space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ''}`
            }
          >
            📘 Dashboard
          </NavLink>
          <NavLink
            to="/add"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ''}`
            }
          >
            📝 Add Entry
          </NavLink>
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ''}`
            }
          >
            📊 Analytics
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ''}`
            }
          >
            ⚙️ Settings
          </NavLink>
        </nav>
      </div>

      <div className="mt-8 border-t pt-4">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 rounded transition"
        >
          🔓 Logout
        </button>
      </div>
    </div>
  );
}
