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
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-purple-950 relative overflow-hidden">
      <Navbar />

      {/* Enhanced animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-16 h-full">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="border-r border-purple-900 animate-pulse"
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: "3s",
              }}
            ></div>
          ))}
        </div>
        <div className="absolute inset-0 grid grid-rows-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="border-b border-zinc-800 w-full animate-pulse"
              style={{
                animationDelay: `${i * 0.15}s`,
                animationDuration: "4s",
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Animated geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-purple-800 opacity-20 rotate-45 animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 border-2 border-purple-700 opacity-30 animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-purple-900 opacity-10 animate-pulse"></div>
        <div
          className="absolute top-1/2 right-1/3 w-20 h-20 border border-purple-600 opacity-25 rotate-12 animate-ping"
          style={{ animationDuration: "3s" }}
        ></div>
      </div>

      {/* Particle effect overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-40 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: "2s",
            }}
          ></div>
        ))}
      </div>

      {/* Floating retro elements */}
      <div className="absolute top-20 left-10 text-4xl text-purple-900 opacity-20 animate-bounce font-mono">
        5c6
      </div>
      <div className="absolute top-32 right-20 text-3xl text-purple-900 opacity-30 animate-pulse font-mono">
        605
      </div>
      <div className="absolute bottom-32 left-16 text-5xl text-purple-900 opacity-25 animate-pulse font-mono">
        5c7
      </div>
      <div className="absolute bottom-20 right-16 text-4xl text-purple-900 opacity-20 animate-bounce font-mono">
        666
      </div>

      {/* Enhanced floating retro elements with glitch effects */}
      <div className="absolute top-20 left-10 text-4xl text-purple-900 opacity-20 animate-bounce font-mono transform hover:scale-110 transition-transform duration-300">
        <span className="relative">
          5c6
          <span className="absolute top-0 left-0 text-purple-700 opacity-50 animate-pulse">
            5c6
          </span>
          <span className="absolute top-0 left-1 text-purple-500 opacity-30">
            5c6
          </span>
        </span>
      </div>
      <div className="absolute top-32 right-20 text-3xl text-purple-900 opacity-30 animate-pulse font-mono transform hover:rotate-12 transition-transform duration-300">
        <span className="relative">
          605
          <span className="absolute top-0 left-1 text-purple-600 opacity-40 animate-ping">
            605
          </span>
        </span>
      </div>
      <div className="absolute bottom-32 left-16 text-5xl text-purple-900 opacity-25 animate-pulse font-mono transform hover:scale-125 transition-transform duration-300">
        <span className="relative">
          5c7
          <span className="absolute top-0 left-1 text-purple-800 opacity-60 animate-bounce">
            5c7
          </span>
        </span>
      </div>
      <div className="absolute bottom-20 right-16 text-4xl text-purple-900 opacity-20 animate-bounce font-mono transform hover:skew-x-12 transition-transform duration-300">
        <span className="relative">
          666
          <span className="absolute top-0 left-0 text-purple-700 opacity-50 animate-pulse">
            666
          </span>
        </span>
      </div>

      {/* Additional floating UI elements */}
      <div className="absolute top-16 right-1/4 text-xs font-mono text-purple-800 opacity-40 animate-pulse">
        &gt; SYSTEM_ONLINE
      </div>
      <div className="absolute bottom-24 left-1/4 text-xs font-mono text-purple-800 opacity-40 animate-pulse">
        &gt; SECURE_CONNECTION
      </div>
      <div className="absolute top-1/3 left-8 text-xs font-mono text-purple-800 opacity-40 animate-bounce">
        [LOGIN_MODULE]
      </div>
      <div className="absolute bottom-1/3 right-8 text-xs font-mono text-purple-800 opacity-40 animate-bounce">
        [AUTH_READY]
      </div>

      <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
        <div className="bg-zinc-900/90 backdrop-blur-sm p-8 border-4 border-purple-900 shadow-2xl max-w-md w-full relative group hover:shadow-purple-900/50 transition-all duration-300">
          {/* Enhanced retro border decorations with glow effect */}
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-purple-950"></div>
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-purple-950"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-purple-950"></div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-purple-950"></div>

          {/* Glowing border effect */}
          <div className="absolute inset-0 border-2 border-purple-600 opacity-0 group-hover:opacity-50 blur-sm transition-opacity duration-300"></div>

          {/* Header with enhanced styling */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-purple-950 to-purple-900 px-4 py-2 border-2 border-purple-900 font-mono text-purple-200 text-sm font-bold uppercase tracking-wider inline-block mb-4 shadow-lg hover:shadow-purple-900/50 transition-shadow">
              <span className="relative">
                USER_AUTHENTICATION
                <div className="absolute inset-0 bg-purple-400 opacity-0 hover:opacity-20 transition-opacity"></div>
              </span>
            </div>
            <h1 className="text-3xl font-mono font-bold text-purple-200 relative group">
              <span className="relative z-10">
                <span className="text-purple-200 bg-gradient-to-r from-purple-900 to-purple-800 px-3 py-2 border-2 border-purple-950 inline-block shadow-lg hover:shadow-purple-800/60 transition-all duration-300 hover:scale-105">
                  &gt; LOGIN.EXE
                </span>
              </span>
              <div className="absolute inset-0 bg-purple-950 opacity-20 blur-lg group-hover:opacity-40 transition-opacity"></div>
            </h1>
          </div>

          {/* Login Form with enhanced inputs */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="relative group">
              <label className="block text-purple-200 font-mono text-sm font-bold mb-2">
                <span className="text-purple-400">&gt;</span> EMAIL_ADDRESS:
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-zinc-900 border-2 border-purple-900 px-4 py-3 font-mono text-purple-200 focus:outline-none focus:border-purple-400 focus:bg-black transition-all duration-200 hover:border-purple-700 focus:shadow-lg focus:shadow-purple-900/30"
                  placeholder="Enter your email"
                  disabled={loading}
                />
                <div className="absolute inset-0 border border-purple-500 opacity-0 group-hover:opacity-30 pointer-events-none transition-opacity"></div>
              </div>
              {errors.email && (
                <p className="text-red-400 font-mono text-sm mt-1 animate-pulse">
                  [ERROR] {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative group">
              <label className="block text-purple-200 font-mono text-sm font-bold mb-2">
                <span className="text-purple-400">&gt;</span> PASSWORD:
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-zinc-900 border-2 border-purple-900 px-4 py-3 font-mono text-purple-200 focus:outline-none focus:border-purple-400 focus:bg-black transition-all duration-200 hover:border-purple-700 focus:shadow-lg focus:shadow-purple-900/30"
                  placeholder="Enter your password"
                  disabled={loading}
                />
                <div className="absolute inset-0 border border-purple-500 opacity-0 group-hover:opacity-30 pointer-events-none transition-opacity"></div>
              </div>
              {errors.password && (
                <p className="text-red-400 font-mono text-sm mt-1 animate-pulse">
                  [ERROR] {errors.password}
                </p>
              )}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="bg-gradient-to-r from-red-950 to-red-900 border-2 border-red-900 p-3 animate-pulse">
                <p className="text-red-400 font-mono text-sm">
                  [SYSTEM_ERROR] {errors.submit}
                </p>
              </div>
            )}

            {/* Enhanced Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-950 to-purple-900 hover:from-purple-900 hover:to-purple-800 disabled:from-zinc-800 disabled:to-zinc-700 border-4 border-purple-900 px-6 py-4 font-mono font-bold text-purple-200 text-lg uppercase tracking-wider transition-all duration-200 hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed relative overflow-hidden group shadow-lg hover:shadow-purple-900/50"
            >
              <span className="relative z-10">
                {loading ? "[ AUTHENTICATING... ]" : "[ LOGIN ]"}
              </span>
              {!loading && (
                <>
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
                  <div className="absolute inset-0 border border-purple-400 opacity-0 group-hover:opacity-50 transition-opacity duration-200"></div>
                </>
              )}
              {loading && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </button>
          </form>

          {/* Enhanced Register Link */}
          <div className="mt-6 text-center">
            <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 border-2 border-purple-900 p-3 font-mono text-sm hover:shadow-lg hover:shadow-purple-900/30 transition-shadow">
              <p className="text-purple-200 mb-2">
                <span className="text-purple-400">&gt;</span> NEW_USER?
              </p>
              <Link
                to="/register"
                className="text-purple-400 hover:text-purple-200 font-bold underline transition-all duration-200 hover:shadow-lg hover:shadow-purple-400/20"
              >
                CREATE_ACCOUNT.EXE
              </Link>
            </div>
          </div>

          {/* Enhanced Quick Access Info */}
          <div className="mt-4 bg-gradient-to-r from-zinc-900 to-zinc-800 border-2 border-purple-900 p-3 font-mono text-xs hover:shadow-lg hover:shadow-purple-900/30 transition-shadow">
            <div className="text-purple-200 space-y-1">
              <p className="flex items-center">
                <span className="text-purple-400 mr-2">&gt;</span>
                <span>SYSTEM_STATUS:</span>
                <span className="ml-auto text-green-400 animate-pulse">
                  ONLINE
                </span>
              </p>
              <p className="flex items-center">
                <span className="text-purple-400 mr-2">&gt;</span>
                <span>ENCRYPTION:</span>
                <span className="ml-auto text-green-400">ENABLED</span>
              </p>
              <p className="flex items-center">
                <span className="text-purple-400 mr-2">&gt;</span>
                <span>GAME_MODE:</span>
                <span className="ml-auto text-blue-400 animate-pulse">
                  READY
                </span>
              </p>
            </div>
          </div>

          {/* Enhanced header decoration with glow */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-950 to-purple-900 px-3 py-1 border-2 border-purple-900 font-mono text-sm font-bold text-purple-200 shadow-lg">
            <span className="relative">
              LOGIN_FORM
              <div className="absolute inset-0 bg-purple-400 opacity-0 hover:opacity-20 transition-opacity"></div>
            </span>
          </div>
        </div>
      </div>

      {/* Enhanced retro scan lines effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="h-full w-full opacity-5"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, #2e1065 3px, #2e1065 6px)",
          }}
        ></div>
      </div>

      {/* Subtle animated overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="h-full w-full opacity-5 animate-pulse"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, #8b5cf6 0%, transparent 70%)",
            animationDuration: "4s",
          }}
        ></div>
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;
