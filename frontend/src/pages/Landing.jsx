import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-blue-100 via-white to-blue-200 overflow-hidden">
      {/* Glowing background blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* Left side */}
        <div className="lg:w-[55%] w-full flex items-center justify-center bg-blue-700 text-white p-10 lg:p-16">
          <div className="text-center max-w-lg">
            <h1 className="text-5xl font-extrabold mb-4 tracking-tight">🧠 MindMapper</h1>
            <p className="text-lg font-light mb-8">
              Map your mind. Organize your thoughts. Stay focused.
            </p>
            <img
              src="/landing-bg.png"
              alt="Mind Map"
              className="mx-auto w-full max-w-sm rounded-2xl border-4 border-white shadow-2xl"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="lg:w-[45%] w-full flex items-center justify-center p-8 lg:p-16">
          <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl border border-gray-200">
            <h2 className="text-4xl font-bold text-blue-700 text-center mb-6">
              Welcome to MindMapper
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Start capturing and organizing your thoughts today.
            </p>
            <div className="flex flex-col gap-4">
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold text-center transition"
              >
                🔐 Login
              </Link>
              <Link
                to="/signup"
                className="border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-xl text-lg font-semibold text-center transition"
              >
                📝 Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
