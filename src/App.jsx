import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

import Dashboard from './pages/Dashboard';
import AddEntry from './pages/AddEntry';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 bg-gray-100 p-6 overflow-y-auto flex flex-col">
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add" element={<AddEntry />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
