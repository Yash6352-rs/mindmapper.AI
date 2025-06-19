// src/pages/Landing.jsx

import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-blue-100 to-blue-200">
      {/* Left side (Image and Branding) */}
      <div className="lg:w-1/2 w-full flex items-center justify-center bg-blue-700 text-white p-8">
        <div className="text-center max-w-xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">🧠 MindMapper</h1>
          <p className="text-lg md:text-xl font-light mb-6">
            Map your mind. Organize your thoughts. Stay focused.
          </p>
          <img
            src="/landing-bg.png" // Make sure this is inside your public folder
            alt="Mind Mapping Illustration"
            className="mx-auto w-full max-w-md rounded-2xl shadow-xl"
          />
        </div>
      </div>

      {/* Right side (Login/Signup Actions) */}
      <div className="lg:w-1/2 w-full flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700 text-center mb-6">
            Welcome to MindMapper
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Start capturing and organizing your thoughts today.
          </p>

          <div className="flex flex-col gap-4">
            <Link
              to="/login"
              className="bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold text-center hover:bg-blue-700 transition"
            >
              🔐 Login
            </Link>
            <Link
              to="/signup"
              className="border border-blue-600 text-blue-600 py-3 rounded-xl text-lg font-semibold text-center hover:bg-blue-50 transition"
            >
              📝 Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
