import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../firebase/auth";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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

    if (!formData.displayName.trim()) {
      newErrors.displayName = "Display name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
    const { error } = await registerUser(
      formData.email,
      formData.password,
      formData.displayName
    );

    if (error) {
      setErrors({ submit: error });
    } else {
      // Registration successful, show success message
      setSuccess(true);
      setErrors({}); // Clear any previous errors

      // Redirect to game after showing success message
      setTimeout(() => {
        navigate("/game");
      }, 2000); // 2 second delay to show success message
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
              USER_REGISTRATION
            </div>
            <h1 className="text-3xl font-mono font-bold text-gray-800 relative">
              <span className="relative z-10">
                <span className="text-yellow-600 bg-yellow-100 px-3 py-2 border-2 border-yellow-400 inline-block">
                  &gt; CREATE_ACCOUNT.EXE
                </span>
              </span>
            </h1>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Display Name Field */}
            <div>
              <label className="block text-gray-800 font-mono text-sm font-bold mb-2">
                <span className="text-yellow-600">&gt;</span> PLAYER_NAME:
              </label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                className="w-full bg-yellow-50 border-2 border-yellow-400 px-4 py-3 font-mono text-gray-800 focus:outline-none focus:border-yellow-600 focus:bg-white transition-colors duration-200"
                placeholder="Enter your display name"
                disabled={loading}
              />
              {errors.displayName && (
                <p className="text-red-500 font-mono text-sm mt-1">
                  [ERROR] {errors.displayName}
                </p>
              )}
            </div>

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
                placeholder="Enter password (min 6 characters)"
                disabled={loading}
              />
              {errors.password && (
                <p className="text-red-500 font-mono text-sm mt-1">
                  [ERROR] {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-gray-800 font-mono text-sm font-bold mb-2">
                <span className="text-yellow-600">&gt;</span> CONFIRM_PASSWORD:
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-yellow-50 border-2 border-yellow-400 px-4 py-3 font-mono text-gray-800 focus:outline-none focus:border-yellow-600 focus:bg-white transition-colors duration-200"
                placeholder="Confirm your password"
                disabled={loading}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 font-mono text-sm mt-1">
                  [ERROR] {errors.confirmPassword}
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

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border-2 border-green-400 p-3">
                <div className="text-center">
                  <p className="text-green-600 font-mono text-sm font-bold mb-2">
                    [SUCCESS] ACCOUNT CREATED!
                  </p>
                  <p className="text-green-600 font-mono text-xs">
                    Welcome to Peter's Quest, {formData.displayName}!
                  </p>
                  <p className="text-green-600 font-mono text-xs">
                    Starting with 0 XP at Level 1...
                  </p>
                  <p className="text-green-600 font-mono text-xs mt-1">
                    Redirecting to game in 2 seconds...
                  </p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 border-4 border-gray-800 px-6 py-4 font-mono font-bold text-gray-800 text-lg uppercase tracking-wider transition-all duration-200 hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed relative overflow-hidden"
            >
              <span className="relative z-10">
                {loading
                  ? "[ CREATING ACCOUNT... ]"
                  : success
                  ? "[ ACCOUNT CREATED! ]"
                  : "[ CREATE ACCOUNT ]"}
              </span>
              {!loading && !success && (
                <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-200"></div>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <div className="bg-yellow-50 border border-yellow-300 p-3 font-mono text-sm">
              <p className="text-gray-700 mb-2">
                <span className="text-yellow-600">&gt;</span>{" "}
                ALREADY_HAVE_ACCOUNT?
              </p>
              <Link
                to="/login"
                className="text-yellow-600 hover:text-yellow-700 font-bold underline transition-colors duration-200"
              >
                LOGIN.EXE
              </Link>
            </div>
          </div>

          {/* Header decoration */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 px-3 py-1 border-2 border-gray-800 font-mono text-sm font-bold text-gray-800">
            REGISTER_FORM
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

export default RegisterPage;
