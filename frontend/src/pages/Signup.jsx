// src/pages/Signup.jsx
import React, { useState } from "react";
import API from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/api/register", form);  // ✅ Matches backend
      alert("✅ Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "❌ Signup failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-blue-700">🧠 MindMapper</h1>
        <p className="text-gray-600 mt-2 text-lg">Join us and organize your mind better!</p>
      </div>

      <div className="w-full max-w-2xl bg-white p-12 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">📝 Create an Account</h2>

        {error && <p className="text-red-500 text-center mb-6">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">Username</label>
            <input
              name="username"
              type="text"
              placeholder="JohnDoe"
              value={form.username}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Create a secure password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded transition duration-200"
          >
            🚀 Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already registered?{" "}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
