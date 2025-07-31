import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../firebase/auth";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    const { error } = await loginUser(formData.email, formData.password);

    if (error) {
      setErrors({ submit: error });
    } else {
      // Login successful, redirect to game
      navigate("/game");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 relative overflow-hidden">
      <Navbar />
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-16 h-full">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="border-r border-yellow-300"></div>
          ))}
        </div>
        <div className="absolute inset-0 grid grid-rows-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-b border-yellow-300 w-full"></div>
          ))}
        </div>
      </div>

      {/* Floating retro elements */}
      <div className="absolute top-20 left-10 text-4xl text-yellow-400 opacity-20 animate-bounce font-mono">
        ◆
      </div>
      <div className="absolute top-32 right-20 text-3xl text-yellow-500 opacity-30 animate-pulse font-mono">
        ★
      </div>
      <div className="absolute bottom-32 left-16 text-5xl text-yellow-400 opacity-25 animate-pulse font-mono">
        ◇
      </div>
      <div className="absolute bottom-20 right-16 text-4xl text-yellow-500 opacity-20 animate-bounce font-mono">
        ♦
      </div>

      <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
        <div className="bg-white/90 backdrop-blur-sm p-8 border-4 border-yellow-400 shadow-2xl max-w-md w-full relative">
          {/* Retro border decorations */}
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-yellow-500"></div>
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-yellow-500"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-yellow-500"></div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-yellow-500"></div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-yellow-400 px-4 py-2 border-2 border-gray-800 font-mono text-gray-800 text-sm font-bold uppercase tracking-wider inline-block mb-4">
              USER_AUTHENTICATION
            </div>
            <h1 className="text-3xl font-mono font-bold text-gray-800 relative">
              <span className="relative z-10">
                <span className="text-yellow-600 bg-yellow-100 px-3 py-2 border-2 border-yellow-400 inline-block">
                  &gt; LOGIN.EXE
                </span>
              </span>
            </h1>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-gray-800 font-mono text-sm font-bold mb-2">
                <span className="text-yellow-600">&gt;</span> EMAIL_ADDRESS:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-yellow-50 border-2 border-yellow-400 px-4 py-3 font-mono text-gray-800 focus:outline-none focus:border-yellow-600 focus:bg-white transition-colors duration-200"
                placeholder="Enter your email"
                disabled={loading}
              />
              {errors.email && (
                <p className="text-red-500 font-mono text-sm mt-1">
                  [ERROR] {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-800 font-mono text-sm font-bold mb-2">
                <span className="text-yellow-600">&gt;</span> PASSWORD:
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-yellow-50 border-2 border-yellow-400 px-4 py-3 font-mono text-gray-800 focus:outline-none focus:border-yellow-600 focus:bg-white transition-colors duration-200"
                placeholder="Enter your password"
                disabled={loading}
              />
              {errors.password && (
                <p className="text-red-500 font-mono text-sm mt-1">
                  [ERROR] {errors.password}
                </p>
              )}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="bg-red-50 border-2 border-red-400 p-3">
                <p className="text-red-500 font-mono text-sm">
                  [SYSTEM_ERROR] {errors.submit}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 border-4 border-gray-800 px-6 py-4 font-mono font-bold text-gray-800 text-lg uppercase tracking-wider transition-all duration-200 hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed relative overflow-hidden"
            >
              <span className="relative z-10">
                {loading ? "[ AUTHENTICATING... ]" : "[ LOGIN ]"}
              </span>
              {!loading && (
                <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-200"></div>
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <div className="bg-yellow-50 border border-yellow-300 p-3 font-mono text-sm">
              <p className="text-gray-700 mb-2">
                <span className="text-yellow-600">&gt;</span> NEW_USER?
              </p>
              <Link
                to="/register"
                className="text-yellow-600 hover:text-yellow-700 font-bold underline transition-colors duration-200"
              >
                CREATE_ACCOUNT.EXE
              </Link>
            </div>
          </div>

          {/* Quick Access Info */}
          <div className="mt-4 bg-yellow-100 border border-yellow-400 p-3 font-mono text-xs">
            <div className="text-gray-600">
              <p className="mb-1">
                <span className="text-yellow-600">&gt;</span> SYSTEM_STATUS:
                ONLINE
              </p>
              <p className="mb-1">
                <span className="text-yellow-600">&gt;</span> ENCRYPTION:
                ENABLED
              </p>
              <p>
                <span className="text-yellow-600">&gt;</span> GAME_MODE: READY
              </p>
            </div>
          </div>

          {/* Header decoration */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 px-3 py-1 border-2 border-gray-800 font-mono text-sm font-bold text-gray-800">
            LOGIN_FORM
          </div>
        </div>
      </div>

      {/* Retro scan lines effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="h-full w-full opacity-5"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, #fbbf24 3px, #fbbf24 6px)",
          }}
        ></div>
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;
