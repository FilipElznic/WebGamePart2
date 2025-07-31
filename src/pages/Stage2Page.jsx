import React, { useState, useEffect } from "react";

import AIHappy from "/AIHappy.png";

import RetroPc from "../Components/RetroPc";

function Stage2Page() {
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showDialogue, setShowDialogue] = useState(true);

  // New states for the bike challenge

  const fullText =
    "Welcome to the Stage 2.! This stage will be easier. You need to take the password and use it to log into virtual computer. Then you need to explore the pc and play available game and score at least 500 points. After that you will be able to continue to the next stage.";

  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 30; // milliseconds per character

    const typeText = () => {
      if (currentIndex < fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeText, typingSpeed);
      } else {
        setIsTypingComplete(true);
        setTimeout(() => setShowButton(true), 500); // Show button after 500ms delay
      }
    };

    // Start typing after 1 second
    const startDelay = setTimeout(typeText, 1000);

    return () => clearTimeout(startDelay);
  }, []);

  const handleStartTask = () => {
    // Hide the image and text div
    setShowDialogue(false);
    // Start the challenge
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-white/50 to-yellow-200 relative overflow-hidden">
      {showDialogue && (
        <div className="">
          <img
            src={AIHappy}
            alt="AI"
            className="absolute max-w-2xl bottom-0 z-40"
          />

          {/* Speech bubble */}
          <div className="absolute bottom-80 left-96 z-40 max-w-md">
            <div className="bg-white border-4 border-yellow-400 rounded-lg p-4 relative shadow-xl">
              {/* Speech bubble tail */}
              <div className="absolute -bottom-3 left-8 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
              <div className="absolute -bottom-4 left-7 w-0 h-0 border-l-6 border-r-6 border-t-10 border-l-transparent border-r-transparent border-t-yellow-400"></div>

              {/* Corner decorations */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-yellow-600"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-yellow-600"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-yellow-600"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-yellow-600"></div>

              {/* Dialogue text */}
              <div className="text-black font-mono">
                <p className="text-lg font-bold text-yellow-700 mb-2">AI:</p>
                <p className="text-sm leading-relaxed">
                  "{displayText}
                  {!isTypingComplete && (
                    <span className="inline-block w-2 h-4 bg-yellow-600 ml-1 animate-pulse">
                      |
                    </span>
                  )}
                  "
                </p>

                {/* Typing indicator - only show while typing */}
                {!isTypingComplete && (
                  <div className="flex items-center mt-3 text-yellow-600">
                    <span className="text-xs">💭</span>
                    <div className="ml-2 flex space-x-1">
                      <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                )}

                {showButton && (
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={handleStartTask}
                      className="bg-yellow-400 hover:bg-yellow-500 border-2 border-yellow-600 text-black font-bold py-2 px-6 font-mono text-sm transition-all duration-200 transform hover:scale-105 relative group"
                    >
                      {/* Button corner decorations */}
                      <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-yellow-700"></div>
                      <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-yellow-700"></div>
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-yellow-700"></div>
                      <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-yellow-700"></div>
                      [HIDE AI] ▶
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => (window.location.href = "/main-menu")}
        className="z-50 relative"
      >
        <span className="bg-yellow-500 hover:bg-yellow-500 border-2 border-yellow-600 text-black font-bold py-2 px-6 font-mono text-sm transition-all duration-200 transform hover:scale-105 relative group">
          HOME ▶
        </span>
      </button>

      {/* Challenge Section - Inline (no popup) */}

      <RetroPc />

      {/* Retro grid background like main menu */}
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

      {/* Floating retro symbols */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl text-yellow-400 opacity-20 animate-pulse font-mono">
          ◆
        </div>
        <div className="absolute top-20 right-20 text-3xl text-yellow-500 opacity-30 animate-bounce font-mono">
          ★
        </div>
        <div className="absolute bottom-32 left-20 text-4xl text-yellow-400 opacity-25 animate-pulse font-mono">
          ◇
        </div>
        <div className="absolute bottom-20 right-32 text-3xl text-yellow-500 opacity-20 animate-bounce font-mono">
          ♦
        </div>
        <div className="absolute top-1/3 left-1/4 text-2xl text-yellow-400 opacity-20 animate-bounce font-mono">
          ▲
        </div>
        <div className="absolute top-2/3 right-1/4 text-3xl text-yellow-500 opacity-30 animate-pulse font-mono">
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
    </div>
  );
}

export default Stage2Page;
