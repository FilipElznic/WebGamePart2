import React from "react";
import { Link } from "react-router-dom";
import PeterImg from "/peter.png"; // Adjust the path as necessary

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-start justify-center w-full h-full p-4 relative">
      <div className="absolute h-[70vh] bg-white top-1/3 right-12  border-2 border-yellow-400">
        <img
          src={PeterImg}
          alt="Peter"
          className="h-[70vh] right-12 top-1/3 mb-8 drop-shadow-2xl
          border-4 border-yellow-400 "
          style={{
            filter: "drop-shadow(0 0 20px rgba(255, 255, 0, 0.3))",
          }}
        />
        <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-yellow-500"></div>
        <div className="absolute -bottom-3 -left-2 w-6 h-6 border-b-4 border-l-4 border-yellow-500"></div>
        <div className="absolute -bottom-3 -right-2 w-6 h-6 border-b-4 border-r-4 border-yellow-500"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="bg-white/90 backdrop-blur-sm p-8 border-4 border-yellow-400 shadow-2xl relative z-10 max-w-5xl">
          {/* Retro border decoration */}
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-yellow-500"></div>
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-yellow-500"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-yellow-500"></div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-yellow-500"></div>

          {/* Retro title with classic styling */}
          <h1 className="text-6xl lg:text-7xl mb-10 font-mono font-bold text-gray-800 relative">
            <span className="relative z-10">
              Welcome to the <br />
              <span className="text-yellow-600 bg-yellow-100 px-4 py-2 border-2 border-yellow-400 inline-block transform -rotate-1 shadow-lg">
                PETER'S QUEST
              </span>
            </span>
            <div className="absolute inset-0 bg-yellow-200 opacity-20 blur-sm"></div>
          </h1>

          {/* Retro info box */}
          <div className="bg-yellow-50 border-2 border-yellow-400 p-6 mb-8 relative">
            <div className="absolute top-2 left-2 w-3 h-3 bg-yellow-400 rotate-45"></div>
            <div className="absolute top-2 right-2 w-3 h-3 bg-yellow-400 rotate-45"></div>

            <p className="text-lg font-mono text-gray-800 w-full lg:w-2/3 mb-6 leading-relaxed">
              <span className="text-yellow-700 font-bold">
                &gt; MISSION BRIEFING:
              </span>
              <br />
              Your mission today is simple: Help Peter with his little problem!
              To continue this epic adventure, you'll need to sign up to make
              your progress saveable. Please create an account or login to your
              existing one.
            </p>

            {/* System status */}
            <div className="bg-white border border-yellow-300 p-3 mb-4 font-mono text-sm">
              <p className="text-green-600 mb-1">
                <span className="text-yellow-600">&gt;</span> STATUS:
                READY_TO_PLAY
              </p>
              <p className="text-green-600">
                <span className="text-yellow-600">&gt;</span> DIFFICULTY:
                TO_DO_HERO
              </p>
            </div>
          </div>

          {/* Retro start button */}
          <Link to="/game">
            <div className="group relative inline-block">
              <div className="bg-yellow-400 hover:bg-yellow-500 border-4 border-gray-800 px-8 py-4 font-mono font-bold text-gray-800 text-xl uppercase tracking-wider transition-all duration-200 hover:scale-105 cursor-pointer relative overflow-hidden">
                <span className="relative z-10">[ START THE GAME ]</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
              </div>
              <div className="absolute top-2 left-2 w-full h-full bg-gray-800 -z-10"></div>
              <div className="absolute -inset-1 bg-yellow-300 opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300"></div>
            </div>
          </Link>

          {/* Additional retro elements */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 px-3 py-1 border-2 border-gray-800 font-mono text-sm font-bold text-gray-800">
            GAME START
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
