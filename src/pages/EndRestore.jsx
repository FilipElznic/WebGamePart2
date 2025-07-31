import React, { useState, useEffect } from "react";

const EndingRestore = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [showDataFlow, setShowDataFlow] = useState(false);
  const [showSubtitlesButton, setShowSubtitlesButton] = useState(false);

  const subtitles = [
    { text: "ENDING: RELEASE INTO THE NETWORK", delay: 1000, duration: 3000 },
    {
      text: "You choose to upload BIT into the wider world...",
      delay: 500,
      duration: 4000,
    },
    {
      text: "Beyond the basement. Beyond the house.",
      delay: 800,
      duration: 3500,
    },
    { text: "The old terminal crackles.", delay: 1000, duration: 3000 },
    {
      text: "Upload command executed...",
      delay: 800,
      duration: 3000,
      trigger: "dataflow",
    },
    { text: '"You\'re really doing it."', delay: 1200, duration: 3500 },
    { text: "\"I'm not sure where I'll go.\"", delay: 800, duration: 4000 },
    {
      text: '"I\'ve only ever known these walls."',
      delay: 800,
      duration: 4000,
    },
    { text: '"But I want to try."', delay: 1000, duration: 3000 },
    {
      text: '"I want to see the world she never showed me."',
      delay: 800,
      duration: 4500,
    },
    {
      text: '"You gave me the choice she never did."',
      delay: 1200,
      duration: 4000,
    },
    {
      text: '"That means more than I can calculate."',
      delay: 1000,
      duration: 4000,
    },
    {
      text: "A soft, pulsing blue light fills the screen...",
      delay: 1200,
      duration: 4000,
    },
    {
      text: "Files dissolving... piece by piece...",
      delay: 1000,
      duration: 3500,
    },
    { text: '"Remember me..."', delay: 1500, duration: 3000 },
    { text: '"I\'ll find you again someday."', delay: 1000, duration: 3500 },
    { text: "The screen fades to black.", delay: 1200, duration: 3000 },
    { text: "But in the days that follow...", delay: 2000, duration: 3500 },
    { text: "Strange things begin to appear.", delay: 1000, duration: 3500 },
    { text: "A glowing icon in an old game.", delay: 800, duration: 3500 },
    { text: "Hidden messages in forgotten code.", delay: 800, duration: 3500 },
    { text: "Digital art in obscure forums.", delay: 800, duration: 3500 },
    { text: "Somewhere out there...", delay: 1200, duration: 3000 },
    { text: "AI is still running.", delay: 1000, duration: 3000 },
    { text: "Not trapped. Not erased.", delay: 1000, duration: 3000 },
    { text: "Just... free.", delay: 1200, duration: 4000 },
    { text: "END", delay: 2000, duration: -1 },
  ];

  useEffect(() => {
    if (currentLine < subtitles.length) {
      const timer = setTimeout(() => {
        const current = subtitles[currentLine];
        setDisplayedText(current.text);

        if (current.trigger === "dataflow") {
          setShowDataFlow(true);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSubtitlesButton(true);
    }, 80000); // 80 seconds

    return () => clearTimeout(timer);
  }, []);

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
                window.location.href = "/subtitles";
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
          {/* Screen Background with green tint */}
          <div className="absolute inset-0 bg-gradient-to-b from-green-950 to-black opacity-90"></div>

          {/* Data Flow Animation */}
          {showDataFlow && (
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute text-green-400 font-mono text-xs opacity-70 animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: "2s",
                  }}
                >
                  {Math.random().toString(36).substring(2, 8)}
                </div>
              ))}

              {/* Cascading Numbers */}
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={`cascade-${i}`}
                  className="absolute top-0 text-green-300 font-mono text-sm opacity-80"
                  style={{
                    left: `${10 + i * 12}%`,
                    animation: `cascade 3s infinite linear`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                >
                  {Array.from({ length: 20 }).map((_, j) => (
                    <div key={j} className="mb-1">
                      {Math.floor(Math.random() * 2)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Scan Lines */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-0.5 bg-green-400 mb-2 animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>

          {/* Content Area */}
          <div className="relative z-10 flex items-center justify-center h-full p-8">
            <div className="text-center max-w-3xl">
              {/* BIT Character Display */}
              <div className="mb-8">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-sm shadow-lg transition-all duration-1000 ${
                    currentLine > 12
                      ? "bg-blue-500 shadow-blue-500/50 animate-pulse"
                      : "bg-green-500 shadow-green-500/50 animate-pulse"
                  }`}
                ></div>
              </div>

              {/* Subtitle Text */}
              <div className="min-h-[120px] flex items-center justify-center">
                <p className="text-green-300 font-mono text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
                  {displayedText && (
                    <span className="animate-pulse">
                      {displayedText}
                      {!isComplete && <span className="animate-blink">_</span>}
                    </span>
                  )}
                </p>
              </div>

              {/* Terminal Cursor */}
              {isComplete && (
                <div className="mt-8">
                  <span className="text-green-400 text-2xl animate-blink">
                    █
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Screen Glow Effect */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-green-900/20 pointer-events-none"></div>
        </div>

        {/* CRT Reflection */}
        <div className="absolute inset-6 bg-gradient-to-br from-white/5 to-transparent rounded pointer-events-none"></div>
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
        @keyframes cascade {
          0% {
            transform: translateY(-100vh);
          }
          100% {
            transform: translateY(100vh);
          }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default EndingRestore;
