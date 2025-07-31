import React, { useState, useEffect } from "react";
import peterIdea from "/peterIdea.png";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function PrivacyPage() {
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showDialogue, setShowDialogue] = useState(true);

  const fullText =
    "Welcome to the Privacy Page! You can find here how we handle your data.";

  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 50; // milliseconds per character

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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 relative overflow-hidden">
      <Navbar />
      {showDialogue && (
        <div className="">
          <img
            src={peterIdea}
            alt="Peter's Idea"
            className="absolute max-w-2xl bottom-1/3 z-40"
          />

          {/* Speech bubble */}
          <div className="absolute bottom-3/5 left-1/4 z-40 max-w-md">
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
                <p className="text-lg font-bold text-yellow-700 mb-2">Peter:</p>
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
                      [HIDE PETER] ▶
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 relative w-full h-full z-10">
        <div className=" backdrop-blur-sm p-8 border-4 border-yellow-400 shadow-2xl relative overflow-hidden flex h-[90vh] flex-col items-center justify-center">
          {/* Retro border decorations */}

          <div className="max-w-2xl w-full text-center z-10">
            <h1 className="text-4xl font-mono font-bold text-yellow-700 mb-6">
              [Privacy Policy]
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-1/2">
            {/* Team Info */}
            <div className="bg-yellow-50 border-2 border-yellow-400 p-6 relative">
              <div className="absolute top-2 left-2 w-3 h-3 bg-yellow-400 rotate-45"></div>
              <div className="absolute top-2 right-2 w-3 h-3 bg-yellow-400 rotate-45"></div>

              <h3 className="text-xl font-mono font-bold text-gray-800 mb-4 bg-yellow-200 px-3 py-1 border border-yellow-500 inline-block">
                [HOW_HANDLE_DATA]
              </h3>

              <div className="font-mono text-gray-800 space-y-3">
                <h2>How do we handle your data?</h2>
                <p className="leading-relaxed">
                  <span className="text-yellow-600 font-bold">&gt;</span> We
                  take your privacy seriously. All data collected during the
                  game is not personal.
                </p>

                {/* Team stats */}
                <div className="bg-white border border-yellow-300 p-3 mt-4">
                  <p className="text-sm mb-1">
                    <span className="text-yellow-600">&gt;</span> DATA:
                    ENCRYPTED
                  </p>
                  <p className="text-sm mb-1">
                    <span className="text-yellow-600">&gt;</span> COOKIES: NOPE
                  </p>
                  <p className="text-sm">
                    <span className="text-yellow-600">&gt;</span> 3RD SITES: NOT
                    USED
                  </p>
                </div>
              </div>
            </div>
            {/* Mission Info */}
            <div className="bg-yellow-50 border-2 border-yellow-400 p-6 relative">
              <div className="absolute top-2 left-2 w-3 h-3 bg-yellow-400 rotate-45"></div>
              <div className="absolute top-2 right-2 w-3 h-3 bg-yellow-400 rotate-45"></div>

              <h3 className="text-xl font-mono font-bold text-gray-800 mb-4 bg-yellow-200 px-3 py-1 border border-yellow-500 inline-block">
                [COOKIES]
              </h3>

              <div className="font-mono text-gray-800 space-y-3">
                <h1>Does this web game use cookies?</h1>
                <p className="leading-relaxed">
                  <span className="text-yellow-600 font-bold">&gt;</span> No !
                  Our game does not use cookies or any tracking mechanisms.
                </p>
                <h1>Why is that like?</h1>
                <p className="leading-relaxed">
                  <span className="text-yellow-600 font-bold">&gt;</span> We
                  want to ensure your privacy and security while playing.
                </p>

                {/* Mission objectives */}
              </div>
            </div>
            <div className="bg-yellow-50 border-2 border-yellow-400 p-6 relative">
              <div className="absolute top-2 left-2 w-3 h-3 bg-yellow-400 rotate-45"></div>
              <div className="absolute top-2 right-2 w-3 h-3 bg-yellow-400 rotate-45"></div>

              <h3 className="text-xl font-mono font-bold text-gray-800 mb-4 bg-yellow-200 px-3 py-1 border border-yellow-500 inline-block">
                [3RD_PARTY]
              </h3>

              <div className="font-mono text-gray-800 space-y-3">
                <h1>What data is shared with 3rd parties?</h1>
                <p className="leading-relaxed">
                  <span className="text-yellow-600 font-bold">&gt;</span> None,
                  your data is not shared with any 3rd parties.
                </p>

                {/* Mission objectives */}
              </div>
            </div>
            <div className="bg-yellow-50 border-2 border-yellow-400 p-6 relative">
              <div className="absolute top-2 left-2 w-3 h-3 bg-yellow-400 rotate-45"></div>
              <div className="absolute top-2 right-2 w-3 h-3 bg-yellow-400 rotate-45"></div>

              <h3 className="text-xl font-mono font-bold text-gray-800 mb-4 bg-yellow-200 px-3 py-1 border border-yellow-500 inline-block">
                [ENCRYPTION]
              </h3>

              <div className="font-mono text-gray-800 space-y-3">
                <h1>How is my data protecteds?</h1>
                <p className="leading-relaxed">
                  <span className="text-yellow-600 font-bold">&gt;</span> Your
                  data is protected through encryption into a secure firebase
                  database.
                </p>

                {/* Mission objectives */}
              </div>
            </div>
          </div>
        </div>
      </div>

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
      <Footer />
    </div>
  );
}

export default PrivacyPage;
