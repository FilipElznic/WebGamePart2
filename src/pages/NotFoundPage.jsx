import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-purple-950 text-white flex items-center justify-center">
      <div className="absolute inset-0 pointer-events-none">
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 text-4xl text-purple-400 opacity-20 animate-pulse font-mono">
          ◆
        </div>
        <div className="absolute top-20 right-20 text-3xl text-purple-500 opacity-30 animate-bounce font-mono">
          ★
        </div>
        <div className="absolute bottom-32 left-20 text-4xl text-purple-400 opacity-25 animate-pulse font-mono">
          ◇
        </div>
        <div className="absolute bottom-20 right-32 text-3xl text-purple-500 opacity-20 animate-bounce font-mono">
          ♦
        </div>
        <div className="absolute top-1/3 left-1/4 text-2xl text-purple-400 opacity-20 animate-bounce font-mono">
          ▲
        </div>
        <div className="absolute top-2/3 right-1/4 text-3xl text-purple-500 opacity-30 animate-pulse font-mono">
          ●
        </div>

        {/* Scan lines effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="h-full w-full opacity-5"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 3px, #fbbf24 3px, #fbbf24 6px)",
            }}
          ></div>
        </div>
      </div>

      <div className="text-center z-10 relative max-w-2xl mx-auto px-4">
        {/* 404 Display */}
        <div className="bg-gradient-to-br from-purple-800 via-zinc-900 to-purple-950 backdrop-blur-sm p-8 border-4 border-purple-400 shadow-2xl relative mb-8">
          {/* Retro border decorations */}
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-purple-500"></div>
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-purple-500"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-purple-500"></div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-purple-500"></div>

          {/* Error Code */}
          <div className="mb-6">
            <div className="text-8xl font-mono font-bold text-red-400 mb-4 animate-pulse">
              404
            </div>
            <div className="text-2xl font-mono text-purple-300 mb-2">
              [SYSTEM ERROR]
            </div>
            <div className="text-lg font-mono text-gray-300">
              NAVIGATION MATRIX CORRUPTED
            </div>
          </div>

          {/* Error Message */}
          <div className="bg-black/50 border-2 border-red-500 p-6 mb-6 relative">
            <div className="absolute top-1 left-1 w-2 h-2 bg-red-400 rotate-45"></div>
            <div className="absolute top-1 right-1 w-2 h-2 bg-red-400 rotate-45"></div>
            <h1 className="text-xl font-mono font-bold text-red-300 mb-3">
              PAGE NOT FOUND IN DATABASE
            </h1>
            <p className="text-gray-300 font-mono text-sm leading-relaxed">
              The requested coordinates do not exist in our navigation system.
              The ship's computer has lost track of this sector. Please return
              to a known location and try again.
            </p>
          </div>

          {/* Navigation Options */}
          <div className="space-y-4">
            <div className="text-purple-300 font-mono text-sm mb-4">
              [EMERGENCY NAVIGATION OPTIONS]
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="bg-purple-600 hover:bg-purple-700 border-2 border-purple-500 text-white font-mono font-bold py-3 px-6 transition-all duration-200 transform hover:scale-105 relative group"
              >
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-purple-300"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-purple-300"></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-purple-300"></div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-purple-300"></div>
                [RETURN TO LANDING]
              </Link>

              <Link
                to="/main-menu"
                className="bg-blue-600 hover:bg-blue-700 border-2 border-blue-500 text-white font-mono font-bold py-3 px-6 transition-all duration-200 transform hover:scale-105 relative group"
              >
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-blue-300"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-blue-300"></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-blue-300"></div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-blue-300"></div>
                [MAIN MENU]
              </Link>
            </div>

            <button
              onClick={() => window.history.back()}
              className="bg-gray-600 hover:bg-gray-700 border-2 border-gray-500 text-white font-mono font-bold py-2 px-4 transition-all duration-200 transform hover:scale-105 relative group mt-4"
            >
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-gray-300"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-gray-300"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-gray-300"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-gray-300"></div>
              [GO BACK]
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center text-purple-400 font-mono text-sm opacity-75">
          <p>Error Code: 404_NAVIGATION_FAILURE</p>
          <p>System Status: OPERATIONAL</p>
          <p>
            Recommendation: Contact system administrator if problem persists
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
