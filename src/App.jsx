import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import React from "react";

import { AuthProvider, AuthContext } from "./context/AuthContext";

import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddEntry from "./pages/AddEntry";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Landing from "./pages/Landing";
import PrivateRoute from "./components/PrivateRoute";

function Layout({ children }) {
  const location = useLocation();
  const noLayoutRoutes = ["/login", "/signup", "/"];

  return noLayoutRoutes.includes(location.pathname) ? (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {children}
    </div>
  ) : (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto flex flex-col">
        <div className="flex-grow">{children}</div>
        <Footer />
      </div>
    </div>
  );
}

function AppRoutes() {
  const { token } = React.useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Landing />} />

        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/add" element={<PrivateRoute><AddEntry /></PrivateRoute>} />
        <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
