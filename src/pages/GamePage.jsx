import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUserData, logoutUser } from "../firebase/auth";
import Footer from "../Components/Footer";

function GamePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserData = async () => {
      const { userData, error } = await getCurrentUserData();
      if (userData && !error) {
        setUser(userData);
      } else {
        // User not logged in, redirect to main page
        navigate("/");
      }
      setLoading(false);
    };

    loadUserData();
  }, [navigate]);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  function handleStartQuest() {
    // Placeholder for starting the quest
    window.location.href = "/start"; // Redirect to shipwrecked page
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm p-8 border-4 border-yellow-400 shadow-2xl">
          <div className="text-center font-mono">
            <div className="text-yellow-600 text-xl mb-4">
              [LOADING GAME...]
            </div>
            <div className="animate-pulse text-gray-600">Please wait...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 relative overflow-hidden">
        {/* Retro grid background */}
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

        {/* Header */}
        <div className="relative z-10 p-4">
          <div className="flex justify-between items-center">
            <div
              onClick={() => {
                window.location.href = "/";
              }}
              className="bg-yellow-400 px-4 py-2 cursor-pointer border-2 border-gray-800 font-mono text-gray-800 text-sm font-bold uppercase tracking-wider"
            >
              PETER'S_QUEST_V1.0
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/90 px-3 py-2 border-2 border-yellow-400 font-mono text-sm">
                <span className="text-yellow-600">&gt;</span> Welcome,{" "}
                <span className="font-bold text-gray-800">
                  {user?.displayName || "Player"}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-400 hover:bg-red-500 border-2 border-gray-800 px-4 py-2 font-mono font-bold text-gray-800 text-sm uppercase tracking-wider transition-all duration-200 hover:scale-105"
              >
                [LOGOUT]
              </button>
            </div>
          </div>
        </div>

        {/* Game Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <div className="bg-white/90 backdrop-blur-sm p-8 border-4 border-yellow-400 shadow-2xl max-w-4xl w-full relative">
            {/* Retro border decorations */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-yellow-500"></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-yellow-500"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-yellow-500"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-yellow-500"></div>

            {/* Game Header */}
            <div className="text-center mb-8">
              <div className="bg-yellow-400 px-4 py-2 border-2 border-gray-800 font-mono text-gray-800 text-sm font-bold uppercase tracking-wider inline-block mb-4">
                GAME_SYSTEM_ACTIVE
              </div>
              <h1 className="text-4xl font-mono font-bold text-gray-800 relative">
                <span className="relative z-10">
                  <span className="text-yellow-600 bg-yellow-100 px-4 py-3 border-2 border-yellow-400 inline-block">
                    &gt; PETER'S QUEST
                  </span>
                </span>
              </h1>
              <span className="text-yellow-600 mt-2">INITIALIZED</span>
            </div>

            {/* Game Status */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-yellow-50 border-2 border-yellow-400 p-4">
                <h3 className="font-mono font-bold text-gray-800 mb-3 border-b border-yellow-400 pb-2">
                  <span className="text-yellow-600">&gt;</span> PLAYER_STATUS
                </h3>
                <div className="space-y-2 font-mono text-sm">
                  <p>
                    <span className="text-yellow-600">NAME:</span>{" "}
                    {user?.displayName || "Unknown"}
                  </p>
                  <p>
                    <span className="text-yellow-600">EMAIL:</span>{" "}
                    {user?.email || "Unknown"}
                  </p>
                  <p>
                    <span className="text-yellow-600">STATUS:</span>{" "}
                    <span className="text-green-600">ONLINE</span>
                  </p>
                  <p>
                    <span className="text-yellow-600">LEVEL:</span>{" "}
                    {user?.level || 1}
                  </p>
                  <p>
                    <span className="text-yellow-600">XP:</span> {user?.xp || 0}
                    /100
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-400 p-4">
                <h3 className="font-mono font-bold text-gray-800 mb-3 border-b border-yellow-400 pb-2">
                  <span className="text-yellow-600">&gt;</span> GAME_STATUS
                </h3>
                <div className="space-y-2 font-mono text-sm">
                  <p>
                    <span className="text-yellow-600">WORLD:</span> Peter's home
                  </p>
                  <p>
                    <span className="text-yellow-600">QUEST:</span> Help Peter
                  </p>
                  <p>
                    <span className="text-yellow-600">PROGRESS:</span> Unknown
                  </p>
                  <p>
                    <span className="text-yellow-600">DIFFICULTY:</span> Normal
                  </p>
                  <p>
                    <span className="text-yellow-600">TIME:</span> Won't be
                    calculated
                  </p>
                </div>
              </div>
            </div>

            {/* Game Message */}
            <div className="bg-gray-800 text-green-400 p-6 font-mono text-sm border-2 border-yellow-400 mb-6">
              <div className="mb-4">
                <span className="text-yellow-400">&gt;</span> SYSTEM MESSAGE:
              </div>
              <div className="space-y-2">
                <p>&gt; Welcome to Peter's Quest, {user?.displayName}!</p>
                <p>
                  &gt; You have successfully authenticated and entered the game
                  world.
                </p>
                <p>&gt; Your mission: Help Peter with his unusual problem</p>
                <p>
                  &gt; Use your skills and wit to navigate through challenges.
                </p>
                <p>&gt; Game development is in progress...</p>
                <p>&gt; More features coming soon maybe!</p>
              </div>
            </div>

            {/* Game Actions */}
            <div className="grid md:grid-cols-1 gap-4">
              <button
                onClick={handleStartQuest}
                className="bg-yellow-400 hover:bg-yellow-500 border-4 border-gray-800 px-6 py-4 font-mono font-bold text-gray-800 text-lg uppercase tracking-wider transition-all duration-200 hover:scale-105 relative overflow-hidden"
              >
                <span className="relative z-10">[START QUEST]</span>
                <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-200"></div>
              </button>
            </div>

            {/* Header decoration */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 px-3 py-1 border-2 border-gray-800 font-mono text-sm font-bold text-gray-800">
              GAME_INTERFACE
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
      </div>
      <Footer />
    </>
  );
}

export default GamePage;
