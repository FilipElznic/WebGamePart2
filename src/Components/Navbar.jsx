import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getCurrentUserData,
  logoutUser,
  onAuthStateChange,
  createMissingUserDoc,
} from "../firebase/auth";

function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChange(async (authUser) => {
      if (authUser) {
        // User is signed in, get their data from Firestore
        const { userData, error } = await getCurrentUserData();
        if (userData && !error) {
          setUser(userData);
        } else {
          // If Firestore data doesn't exist, create it
          const { userData: newUserData, error: createError } =
            await createMissingUserDoc(authUser);
          if (newUserData && !createError) {
            setUser(newUserData);
          } else {
            // Final fallback - use auth user data
            setUser({
              uid: authUser.uid,
              email: authUser.email,
              displayName: authUser.displayName || authUser.email.split("@")[0],
              xp: 0,
              level: 1,
            });
          }
        }
      } else {
        // User is signed out
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
  };
  return (
    <nav className="bg-white border-b-4 border-yellow-400 shadow-lg relative overflow-hidden">
      {/* Retro grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-yellow-300"></div>
          ))}
        </div>
      </div>

      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-16">
          {/* Retro Logo */}
          <div className="flex-shrink-0">
            <h1
              onClick={() => (window.location.href = "/")}
              className="text-2xl font-bold font-mono text-gray-800 hover:text-yellow-600 transition-all duration-300 hover:scale-110 cursor-pointer relative"
            >
              <span className="relative z-10 bg-yellow-100 px-3 py-1 border-2 border-yellow-400">
                &gt; PETER'S_QUEST_V1.0
              </span>
              <div className="absolute inset-0 bg-yellow-300 opacity-0 hover:opacity-20 blur-lg transition-opacity duration-300"></div>
            </h1>
          </div>

          {/* Retro Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <ul className="flex space-x-1">
              <li>
                <a
                  href="/"
                  className="group relative font-mono text-gray-700 hover:text-gray-900 px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105"
                >
                  <span className="relative z-10 bg-yellow-50 hover:bg-yellow-200 px-2 py-1 border border-yellow-400 transition-colors duration-200">
                    [HOME]
                  </span>
                  <div className="absolute inset-0 bg-yellow-200 opacity-0 group-hover:opacity-20 transition-all duration-200"></div>
                  <div className="absolute -inset-1 bg-yellow-300 opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-200"></div>
                </a>
              </li>
              <li>
                <a
                  href="/shipwrecked"
                  className="group relative font-mono text-gray-700 hover:text-gray-900 px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105"
                >
                  <span className="relative z-10 bg-yellow-50 hover:bg-yellow-200 px-2 py-1 border border-yellow-400 transition-colors duration-200">
                    [SHIPWRECKED]
                  </span>
                  <div className="absolute inset-0 bg-yellow-200 opacity-0 group-hover:opacity-20 transition-all duration-200"></div>
                  <div className="absolute -inset-1 bg-yellow-300 opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-200"></div>
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="group relative font-mono text-gray-700 hover:text-gray-900 px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105"
                >
                  <span className="relative z-10 bg-yellow-50 hover:bg-yellow-200 px-2 py-1 border border-yellow-400 transition-colors duration-200">
                    [ABOUT]
                  </span>
                  <div className="absolute inset-0 bg-yellow-200 opacity-0 group-hover:opacity-20 transition-all duration-200"></div>
                  <div className="absolute -inset-1 bg-yellow-300 opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-200"></div>
                </a>
              </li>
              <li>
                <a
                  href="/feedback"
                  className="group relative font-mono text-gray-700 hover:text-gray-900 px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105"
                >
                  <span className="relative z-10 bg-yellow-50 hover:bg-yellow-200 px-2 py-1 border border-yellow-400 transition-colors duration-200">
                    [FEEDBACK]
                  </span>
                  <div className="absolute inset-0 bg-yellow-200 opacity-0 group-hover:opacity-20 transition-all duration-200"></div>
                  <div className="absolute -inset-1 bg-yellow-300 opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-200"></div>
                </a>
              </li>
            </ul>

            {/* Authentication Section */}
            <div className="flex items-center space-x-3 ml-6 border-l-2 border-yellow-400 pl-6">
              {loading ? (
                <div className="font-mono text-sm text-gray-600">
                  Loading...
                </div>
              ) : user ? (
                // User is logged in
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 border-2 border-green-400 px-3 py-1 font-mono text-sm">
                    <span className="text-green-600">&gt;</span> Welcome,{" "}
                    <span className="font-bold text-gray-800">
                      {user.displayName}
                    </span>
                  </div>
                  <Link
                    to="/game"
                    className="group relative font-mono text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105"
                  >
                    <span className="relative z-10 bg-blue-100 hover:bg-blue-200 px-2 py-1 border border-blue-400 transition-colors duration-200">
                      [PLAY]
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="group relative font-mono text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105"
                  >
                    <span className="relative z-10 bg-red-100 hover:bg-red-200 px-2 py-1 border border-red-400 transition-colors duration-200">
                      [LOGOUT]
                    </span>
                  </button>
                </div>
              ) : (
                // User is not logged in
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="group relative font-mono text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105"
                  >
                    <span className="relative z-10 bg-blue-100 hover:bg-blue-200 px-2 py-1 border border-blue-400 transition-colors duration-200">
                      [SIGN IN]
                    </span>
                    <div className="absolute inset-0 bg-blue-200 opacity-0 group-hover:opacity-20 transition-all duration-200"></div>
                  </Link>
                  <Link
                    to="/register"
                    className="group relative font-mono text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105"
                  >
                    <span className="relative z-10 bg-green-100 hover:bg-green-200 px-2 py-1 border border-green-400 transition-colors duration-200">
                      [SIGN UP]
                    </span>
                    <div className="absolute inset-0 bg-green-200 opacity-0 group-hover:opacity-20 transition-all duration-200"></div>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Retro Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-800 hover:text-yellow-600 bg-yellow-100 hover:bg-yellow-200 p-2 border-2 border-yellow-400 transition-all duration-200 font-mono text-xl"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>☰
            </button>
          </div>
        </div>
      </div>

      {/* Retro Mobile Menu */}
      <div
        className="md:hidden hidden bg-yellow-50 border-t-2 border-yellow-400"
        id="mobile-menu"
      >
        <div className="px-4 pt-2 pb-3 space-y-1">
          <a
            href="/"
            className="text-gray-700 hover:text-gray-900 hover:bg-yellow-200 block px-3 py-2 font-mono text-base font-bold uppercase tracking-wider transition-colors duration-200 border-l-4 border-transparent hover:border-yellow-400"
          >
            [HOME]
          </a>
          <a
            href="/#about"
            className="text-gray-700 hover:text-gray-900 hover:bg-yellow-200 block px-3 py-2 font-mono text-base font-bold uppercase tracking-wider transition-colors duration-200 border-l-4 border-transparent hover:border-yellow-400"
          >
            [ABOUT]
          </a>
          <a
            href="/#contact"
            className="text-gray-700 hover:text-gray-900 hover:bg-yellow-200 block px-3 py-2 font-mono text-base font-bold uppercase tracking-wider transition-colors duration-200 border-l-4 border-transparent hover:border-yellow-400"
          >
            [CONTACT]
          </a>

          {/* Mobile Authentication Section */}
          <div className="border-t-2 border-yellow-400 pt-3 mt-3">
            {loading ? (
              <div className="px-3 py-2 font-mono text-sm text-gray-600">
                Loading...
              </div>
            ) : user ? (
              // User is logged in
              <div>
                <div className="px-3 py-2 bg-green-100 border-l-4 border-green-400 font-mono text-sm mb-2">
                  <span className="text-green-600">&gt;</span> Welcome,{" "}
                  <span className="font-bold text-gray-800">
                    {user.displayName}
                  </span>
                </div>
                <Link
                  to="/game"
                  className="text-gray-700 hover:text-gray-900 hover:bg-blue-200 block px-3 py-2 font-mono text-base font-bold uppercase tracking-wider transition-colors duration-200 border-l-4 border-transparent hover:border-blue-400"
                >
                  [PLAY GAME]
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-gray-900 hover:bg-red-200 block px-3 py-2 font-mono text-base font-bold uppercase tracking-wider transition-colors duration-200 border-l-4 border-transparent hover:border-red-400 w-full text-left"
                >
                  [LOGOUT]
                </button>
              </div>
            ) : (
              // User is not logged in
              <div>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-gray-900 hover:bg-blue-200 block px-3 py-2 font-mono text-base font-bold uppercase tracking-wider transition-colors duration-200 border-l-4 border-transparent hover:border-blue-400"
                >
                  [SIGN IN]
                </Link>
                <Link
                  to="/register"
                  className="text-gray-700 hover:text-gray-900 hover:bg-green-200 block px-3 py-2 font-mono text-base font-bold uppercase tracking-wider transition-colors duration-200 border-l-4 border-transparent hover:border-green-400"
                >
                  [SIGN UP]
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Retro scan lines effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="h-full w-full opacity-5"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, #fbbf24 2px, #fbbf24 4px)",
          }}
        ></div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-yellow-400"></div>
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-yellow-400"></div>
    </nav>
  );
}

export default Navbar;
