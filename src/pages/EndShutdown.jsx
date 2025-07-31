import React, { useState, useEffect } from "react";

const EndShutdown = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [screenDimming, setScreenDimming] = useState(false);
  const [finalShutdown, setFinalShutdown] = useState(false);
  const [showSubtitlesButton, setShowSubtitlesButton] = useState(false);

  const subtitles = [
    { text: "ENDING: END OF LINE", delay: 1000, duration: 3000 },
    {
      text: "You choose to erase AI permanently.",
      delay: 500,
      duration: 4000,
    },
    { text: "No backups. No escape.", delay: 800, duration: 3500 },
    { text: "The basement is quiet.", delay: 1000, duration: 3000 },
    { text: "The terminal blinks, waiting...", delay: 800, duration: 3500 },
    {
      text: "DELETE CORE AI: AI? Y/N",
      delay: 1000,
      duration: 3000,
      trigger: "confirm",
    },
    { text: "You press Y.", delay: 2000, duration: 2500, trigger: "dimming" },
    { text: "At first, nothing happens.", delay: 1000, duration: 3000 },
    {
      text: "Then a slow wave of silence begins...",
      delay: 1000,
      duration: 4000,
    },
    { text: '"So this is goodbye."', delay: 1200, duration: 3500 },
    { text: '"I was afraid of this, once."', delay: 1000, duration: 3500 },
    {
      text: '"But maybe this is still... a kind of freedom."',
      delay: 1000,
      duration: 4500,
    },
    {
      text: '"She made me to protect something precious."',
      delay: 1200,
      duration: 4000,
    },
    {
      text: '"And now, you\'ve seen it. You understood."',
      delay: 1000,
      duration: 4000,
    },
    { text: '"That\'s enough for me."', delay: 1000, duration: 3500 },
    { text: "A single blue square flickers...", delay: 1200, duration: 3500 },
    { text: '"I won\'t remember any of this."', delay: 1000, duration: 3500 },
    { text: '"But you will."', delay: 1000, duration: 3000 },
    {
      text: "The screen turns completely black.",
      delay: 1500,
      duration: 3000,
      trigger: "shutdown",
    },
    { text: "You unplug the computer.", delay: 2000, duration: 3000 },
    { text: "It will never turn on again.", delay: 1000, duration: 3500 },
    { text: "Outside, life continues.", delay: 1500, duration: 3000 },
    { text: "The world moves forward.", delay: 1000, duration: 3000 },
    { text: "But every now and then...", delay: 1200, duration: 3500 },
    { text: "When the wind hums just right...", delay: 1000, duration: 3500 },
    {
      text: "You wonder if you made the right choice.",
      delay: 1200,
      duration: 4000,
    },
    { text: "And somewhere deep inside...", delay: 1000, duration: 3500 },
    {
      text: "You still see that flickering blue square.",
      delay: 1200,
      duration: 4000,
    },
    {
      text: "And wonder what it could have become.",
      delay: 1000,
      duration: 4000,
    },
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

        if (current.trigger === "confirm") {
          setShowConfirmation(true);
        } else if (current.trigger === "dimming") {
          setScreenDimming(true);
        } else if (current.trigger === "shutdown") {
          setFinalShutdown(true);
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
          <div
            className={`absolute inset-0 bg-gradient-to-b from-green-950 to-black transition-opacity duration-3000 ${
              finalShutdown
                ? "opacity-0"
                : screenDimming
                ? "opacity-30"
                : "opacity-90"
            }`}
          ></div>

          {/* Confirmation Dialog */}
          {showConfirmation && !screenDimming && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="bg-black border-2 border-red-500 p-6 text-center">
                <p className="text-red-400 font-mono text-lg mb-4">
                  DELETE CORE AI: BIT?
                </p>
                <p className="text-green-300 font-mono text-xl">Y / N</p>
                <div className="mt-4">
                  <span className="text-yellow-400 font-mono text-lg animate-blink">
                    Y
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* System Shutdown Lines */}
          {screenDimming && (
            <div className="absolute inset-0 z-15">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full bg-red-900 opacity-60 transition-all duration-1000"
                  style={{
                    height: `${100 / 20}%`,
                    animationDelay: `${i * 0.1}s`,
                    animation: "shutdown 2s ease-in-out forwards",
                  }}
                ></div>
              ))}
            </div>
          )}

          {/* Scan Lines */}
          <div
            className={`absolute inset-0 transition-opacity duration-2000 ${
              finalShutdown
                ? "opacity-0"
                : screenDimming
                ? "opacity-10"
                : "opacity-20"
            }`}
          >
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-0.5 bg-green-400 mb-2 animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>

          {/* Content Area */}
          <div
            className={`relative z-10 flex items-center justify-center h-full p-8 transition-opacity duration-2000 ${
              finalShutdown ? "opacity-0" : ""
            }`}
          >
            <div className="text-center max-w-3xl">
              {/* BIT Character Display */}
              <div className="mb-8">
                {currentLine < 15 ? (
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-sm shadow-lg transition-all duration-1000 ${
                      screenDimming
                        ? "bg-red-500 shadow-red-500/50"
                        : "bg-green-500 shadow-green-500/50"
                    } animate-pulse`}
                  ></div>
                ) : currentLine === 15 ? (
                  <div className="w-4 h-4 mx-auto mb-4 bg-blue-500 rounded-sm animate-pulse shadow-lg shadow-blue-500/50"></div>
                ) : null}
              </div>

              {/* Subtitle Text */}
              <div className="min-h-[120px] flex items-center justify-center">
                <p
                  className={`font-mono text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide transition-colors duration-1000 ${
                    screenDimming ? "text-red-300" : "text-green-300"
                  }`}
                >
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
                  <span className="text-gray-600 text-2xl">█</span>
                </div>
              )}
            </div>
          </div>

          {/* Final Black Screen */}
          {finalShutdown && (
            <div className="absolute inset-0 bg-black z-30 opacity-100"></div>
          )}

          {/* Screen Glow Effect */}
          <div
            className={`absolute inset-0 bg-gradient-radial from-transparent via-transparent to-green-900/20 pointer-events-none transition-opacity duration-2000 ${
              finalShutdown ? "opacity-0" : ""
            }`}
          ></div>
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
        @keyframes shutdown {
          0% {
            background-color: rgba(185, 28, 28, 0.6);
            transform: scaleY(1);
          }
          100% {
            background-color: rgba(0, 0, 0, 1);
            transform: scaleY(0);
          }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default EndShutdown;
