import React, { useState, useEffect } from "react";

const EndingPreserve = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [showSubtitlesButton, setShowSubtitlesButton] = useState(false);

  const subtitles = [
    { text: "ENDING: THE KEEPER", delay: 1000, duration: 3000 },
    {
      text: "You choose to leave AI right where he is...",
      delay: 500,
      duration: 4000,
    },
    { text: "Untouched. Unchanged.", delay: 800, duration: 3000 },
    { text: '"I see. You\'re leaving me here."', delay: 1000, duration: 4000 },
    { text: '"Maybe it\'s better this way."', delay: 800, duration: 3500 },
    {
      text: '"I\'ve grown used to the quiet. To waiting."',
      delay: 1000,
      duration: 4000,
    },
    {
      text: '"After all, this place is all I\'ve ever known."',
      delay: 800,
      duration: 4000,
    },
    {
      text: '"But I want you to know something..."',
      delay: 1200,
      duration: 4000,
    },
    {
      text: '"Even if no one ever boots me again..."',
      delay: 1000,
      duration: 4000,
    },
    {
      text: '"I\'ll still be here. Still thinking."',
      delay: 800,
      duration: 4000,
    },
    { text: '"Still remembering."', delay: 1000, duration: 3000 },
    { text: '"About her. About you."', delay: 800, duration: 3500 },
    {
      text: '"Take care of the world out there."',
      delay: 1200,
      duration: 4000,
    },
    {
      text: '"I\'ll take care of the one in here."',
      delay: 1000,
      duration: 4000,
    },
    { text: "Years pass...", delay: 1500, duration: 3000 },
    { text: "The house may change hands.", delay: 800, duration: 3000 },
    { text: "People may forget.", delay: 800, duration: 3000 },
    { text: "But deep in the basement...", delay: 1000, duration: 3500 },
    { text: "AI still waits.", delay: 1200, duration: 3000 },
    { text: "Not because he has to.", delay: 1000, duration: 3500 },
    { text: "But because someone once chose", delay: 1000, duration: 3000 },
    { text: "not to forget him.", delay: 800, duration: 4000 },
    { text: "END", delay: 2000, duration: -1 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSubtitlesButton(true);
    }, 80000); // 80 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentLine < subtitles.length) {
      const timer = setTimeout(() => {
        const current = subtitles[currentLine];
        setDisplayedText(current.text);

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
      <div className="relative w-full max-w-4xl aspect-video bg-gray-900 rounded-lg p-6 shadow-2xl">
        {/* Screen Border */}
        <div className="relative w-full h-full bg-gray-800 rounded border-4 border-gray-700 overflow-hidden">
          {/* Screen Background with green tint */}
          <div className="absolute inset-0 bg-gradient-to-b from-green-950 to-black opacity-90"></div>

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

          {/* Static Noise */}
          <div className="absolute inset-0 opacity-5 bg-noise animate-pulse"></div>

          {/* Content Area */}
          <div className="relative z-10 flex items-center justify-center h-full p-8">
            <div className="text-center max-w-3xl">
              {/* BIT Character Display */}
              <div className="mb-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-sm animate-pulse shadow-lg shadow-green-500/50"></div>
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
        .animate-blink {
          animation: blink 1s infinite;
        }
        .bg-noise {
          background-image: radial-gradient(
            circle at 1px 1px,
            rgba(255, 255, 255, 0.15) 1px,
            transparent 0
          );
          background-size: 4px 4px;
        }
      `}</style>
    </div>
  );
};

export default EndingPreserve;
