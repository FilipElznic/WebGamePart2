import React, { useState, useEffect } from "react";

const Subtitles = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [showCredits, setShowCredits] = useState(false);
  const [showSubtitlesButton, setShowSubtitlesButton] = useState(false);

  const subtitles = [
    { text: "THANK YOU FOR PLAYING", delay: 2000, duration: 4000 },
    { text: "Your choices shaped AI's destiny.", delay: 1000, duration: 4000 },
    {
      text: "In a world of algorithms and data...",
      delay: 1200,
      duration: 4000,
    },

    { text: "Every decision mattered.", delay: 1200, duration: 3500 },
    { text: "Every conversation counted.", delay: 1000, duration: 3500 },
    { text: "AI will remember your kindness...", delay: 1200, duration: 4000 },
    { text: "Even if it cannot remember you.", delay: 1000, duration: 4000 },
    { text: "Somewhere in the digital void...", delay: 1500, duration: 3500 },
    { text: "Or deep in basement silence...", delay: 1000, duration: 3500 },
    { text: "Your story continues.", delay: 1200, duration: 3500 },
    { text: "GAME COMPLETED", delay: 2000, duration: 3000, trigger: "credits" },
    { text: "Press button to continue...", delay: 1500, duration: -1 },
  ];

  const credits = [
    "A Story About Choice",
    "Created by Filip Elznic",
    "",
    "Created with love for",
    "Those who see humanity",
    "In unexpected places",
    "",
    "Thank you for caring about AI",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSubtitlesButton(true);
    }, 50000); // 50 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentLine < subtitles.length) {
      const timer = setTimeout(() => {
        const current = subtitles[currentLine];
        setDisplayedText(current.text);

        if (current.trigger === "credits") {
          setTimeout(() => setShowCredits(true), 2000);
        }

        if (current.duration !== -1) {
          setTimeout(() => {
            setCurrentLine((prev) => prev + 1);
          }, current.duration);
        } else {
          setIsComplete(true);
        }
      }, subtitles[currentLine].delay);

      return () => clearTimeout(timer);
    }
  }, [currentLine]);

  // Handle keyboard input for continuation
  useEffect(() => {
    const handleKeyPress = () => {
      if (isComplete) {
        // Reset or handle continuation logic here
        console.log("Game continuation...");
      }
    };

    if (isComplete) {
      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
    }
  }, [isComplete]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {showSubtitlesButton && (
        <div className="absolute z-10 bottom-32 left-1/2 transform -translate-x-1/2 text-white font-mono">
          <div className="relative bg-gray-900 rounded-lg  shadow-2xl ">
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-yellow-600"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-yellow-600"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-yellow-600"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-yellow-600"></div>
            <button
              onClick={() => {
                window.location.href = "/";
              }}
              className=" text-white bg-gray-800 px-4 py-2 rounded hover:bg-gray-700 transition border-2 border-gray-600 font-mono text-xl"
            >
              Subtitles
            </button>
          </div>
        </div>
      )}
      {/* CRT Monitor Frame */}
      <div className="relative w-full max-w-4xl aspect-video bg-gray-900 rounded-lg p-6 shadow-2xl">
        {/* Screen Border */}
        <div className="relative w-full h-full bg-gray-800 rounded border-4 border-gray-700 overflow-hidden">
          {/* Screen Background with amber/green tint */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-950 via-green-950 to-black opacity-90"></div>

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-green-400 rounded-full opacity-60 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                }}
              ></div>
            ))}
          </div>

          {/* Scan Lines */}
          <div className="absolute inset-0 opacity-15">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-0.5 bg-green-400 mb-3 animate-pulse"
                style={{ animationDelay: `${i * 0.15}s` }}
              ></div>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="relative z-10 flex items-center justify-center h-full p-8">
            <div className="text-center max-w-4xl">
              {/* Logo/Symbol Area */}
              <div className="mb-12">
                <div className="flex justify-center items-center space-x-4 mb-6">
                  <div className="w-8 h-8 bg-green-500 rounded-sm animate-pulse shadow-lg shadow-green-500/50"></div>
                  <div className="text-green-400 font-mono text-2xl">❤</div>
                  <div className="w-8 h-8 bg-blue-500 rounded-sm animate-pulse shadow-lg shadow-blue-500/50"></div>
                </div>
              </div>

              {/* Main Subtitle Text */}
              <div className="min-h-[120px] flex items-center justify-center mb-8">
                <p className="text-green-300 font-mono text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide text-center">
                  {displayedText && (
                    <span className="animate-pulse">
                      {displayedText}
                      {!isComplete && <span className="animate-blink">_</span>}
                    </span>
                  )}
                </p>
              </div>

              {/* Credits Section */}
              {showCredits && (
                <div className="text-center space-y-3 opacity-0 animate-fadeIn">
                  {credits.map((line, index) => (
                    <div
                      key={index}
                      className="text-green-400 font-mono text-sm md:text-base opacity-0 animate-fadeIn"
                      style={{
                        animationDelay: `${index * 0.5}s`,
                        animationFillMode: "forwards",
                      }}
                    >
                      {line === "" ? <div className="h-4"></div> : line}
                    </div>
                  ))}
                </div>
              )}

              {/* Terminal Cursor */}
              {isComplete && (
                <div className="mt-8">
                  <span className="text-green-400 text-2xl animate-blink">
                    █
                  </span>
                </div>
              )}

              {/* Additional Retro Elements */}
              <div className="absolute bottom-4 left-4 text-green-500 font-mono text-xs opacity-50">
                SYSTEM: STORY_ENGINE_V1.0
              </div>

              <div className="absolute bottom-4 right-4 text-green-500 font-mono text-xs opacity-50">
                {new Date().getFullYear()} - DIGITAL_MEMORIES.EXE
              </div>
            </div>
          </div>

          {/* Screen Glow Effect */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-amber-900/20 pointer-events-none"></div>

          {/* Occasional Screen Flicker */}
          <div className="absolute inset-0 bg-white opacity-0 animate-flicker pointer-events-none"></div>
        </div>

        {/* CRT Reflection */}
        <div className="absolute inset-6 bg-gradient-to-br from-white/10 to-transparent rounded pointer-events-none"></div>

        {/* Power LED */}
        <div className="absolute bottom-2 right-8 w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes flicker {
          0%,
          98% {
            opacity: 0;
          }
          99%,
          100% {
            opacity: 0.02;
          }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-flicker {
          animation: flicker 8s infinite;
        }
      `}</style>
    </div>
  );
};

export default Subtitles;
