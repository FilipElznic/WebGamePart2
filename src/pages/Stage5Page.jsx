import React, { useState, useEffect } from "react";
import AIAngry from "/AIAngry.png";
import peterThink from "/peterThink.png";
import { Link } from "react-router-dom";
import LetsPlayGame from "../Components/LetsPlayGame";
import Peter from "../Components/Peter";

function Stage4Page() {
  // AI text states
  const [aiDisplayText, setAiDisplayText] = useState("");
  const [aiIsTypingComplete, setAiIsTypingComplete] = useState(false);
  const [PeterHide, setPeterHide] = useState(true);

  // Peter text states
  const [peterDisplayText, setPeterDisplayText] = useState("");
  const [peterIsTypingComplete, setPeterIsTypingComplete] = useState(false);

  // General states
  const [showButton, setShowButton] = useState(false);
  const [showDialogue, setShowDialogue] = useState(true);
  const [showPeter, setShowPeter] = useState(false);
  const peterSlides = [
    {
      title: "Well, well, well...",
      description:
        "This looks like a bit complicated. I think the best way to go through is to go via all applications!",
    },
    {
      title: "Little bit of help",
      description:
        "Don't forget to read hints, know basic terminal commands and try to remember primary school math jokes!",
    },
  ];

  const aiText =
    "Welcome to Stage 5! This stage is a bit different and hard stage, as you will see, there is a desktop behind me, You will need to find the missing numbers to unlock the next stage. The numbers are hidden somewhere in the desktop, Good Luck!";

  const peterText =
    "Dont be scared, we will do this together, I can't be that bad right?!";

  // AI typing effect
  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 20; // milliseconds per character

    const typeAiText = () => {
      if (currentIndex < aiText.length) {
        setAiDisplayText(aiText.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeAiText, typingSpeed);
      } else {
        setAiIsTypingComplete(true);
        // Show Peter after AI finishes typing (with a small delay)
        setTimeout(() => setShowPeter(true), 1000);
      }
    };

    // Start AI typing after 1 second
    const startDelay = setTimeout(typeAiText, 1000);

    return () => clearTimeout(startDelay);
  }, []);

  // Peter typing effect
  useEffect(() => {
    if (!showPeter) return;

    let currentIndex = 0;
    const typingSpeed = 20; // milliseconds per character

    const typePeterText = () => {
      if (currentIndex < peterText.length) {
        setPeterDisplayText(peterText.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typePeterText, typingSpeed);
      } else {
        setPeterIsTypingComplete(true);
        // Show button after Peter finishes typing
        setTimeout(() => setShowButton(true), 500);
      }
    };

    // Start Peter typing after 500ms
    const startDelay = setTimeout(typePeterText, 500);

    return () => clearTimeout(startDelay);
  }, [showPeter]);

  const handleStartTask = () => {
    // Hide the dialogue (both characters)
    setShowDialogue(false);
    // Start the challenge
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden ">
      {showDialogue && (
        <>
          {/* Overlay background while dialogue is active */}
          <div className="fixed inset-0 bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-800 bg-opacity-80 z-20 pointer-events-none transition-all duration-500 flex items-center justify-center w-full">
            <div className="container  border-4 border-yellow-500 h-[90vh] relative">
              <div className="absolute -top-3 -left-3 w-5 h-5 border-t-5 border-l-5 border-yellow-600"></div>
              <div className="absolute -top-3 -right-3 w-5 h-5 border-t-5 border-r-5 border-yellow-600"></div>
              <div className="absolute -bottom-3 -left-3 w-5 h-5 border-b-5 border-l-5 border-yellow-600"></div>
              <div className="absolute -bottom-3 -right-3 w-5 h-5 border-b-5 border-r-5 border-yellow-600"></div>
              <div className="absolute inset-0 opacity-10 ">
                <div className="grid grid-cols-16 h-full">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="border-r border-yellow-300"></div>
                  ))}
                </div>
                <div className="absolute inset-0 grid grid-rows-12">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="border-b border-yellow-300 w-full"
                    ></div>
                  ))}
                </div>
              </div>
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
          </div>
          <div className=" z-40">
            <img
              src={AIAngry}
              alt="AI"
              className="absolute max-w-2xl bottom-0 z-40  "
            />

            {/* AI Speech bubble */}
            <div className="absolute bottom-80 left-96 z-50 max-w-md">
              <div className="bg-white border-4 border-yellow-400 rounded-lg p-4 relative shadow-xl">
                {/* Speech bubble tail */}
                <div className="absolute -bottom-3 left-8 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
                <div className="absolute -bottom-4 left-7 w-0 h-0 border-l-6 border-r-6 border-t-10 border-l-transparent border-r-transparent border-t-yellow-400"></div>

                {/* Corner decorations */}
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-yellow-600"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-yellow-600"></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-yellow-600"></div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-yellow-600"></div>

                {/* AI Dialogue text */}
                <div className="text-black font-mono">
                  <p className="text-lg font-bold text-yellow-700 mb-2">AI:</p>
                  <p className="text-sm leading-relaxed">
                    "{aiDisplayText}
                    {!aiIsTypingComplete && (
                      <span className="inline-block w-2 h-4 bg-yellow-600 ml-1 animate-pulse">
                        |
                      </span>
                    )}
                    "
                  </p>

                  {/* AI Typing indicator - only show while typing */}
                  {!aiIsTypingComplete && (
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
                </div>
              </div>
            </div>
          </div>

          {/* Peter Character - only show after AI finishes */}
          {showPeter && (
            <div className=" z-40">
              <img
                src={peterThink}
                alt="Peter Thinking"
                className="absolute max-w-2xl bottom-0 right-0 z-40 "
              />

              {/* Peter Speech bubble */}
              <div className="absolute bottom-80 right-96 z-50 max-w-md ">
                <div className="bg-white border-4 border-blue-400 rounded-lg p-4 relative shadow-xl">
                  {/* Speech bubble tail */}
                  <div className="absolute -bottom-3 right-8 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
                  <div className="absolute -bottom-4 right-7 w-0 h-0 border-l-6 border-r-6 border-t-10 border-l-transparent border-r-transparent border-t-blue-400"></div>

                  {/* Corner decorations */}
                  <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-blue-600"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-blue-600"></div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-blue-600"></div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-blue-600"></div>

                  {/* Peter Dialogue text */}
                  <div className="text-black font-mono">
                    <p className="text-lg font-bold text-blue-700 mb-2">
                      Peter:
                    </p>
                    <p className="text-sm leading-relaxed">
                      "{peterDisplayText}
                      {!peterIsTypingComplete && (
                        <span className="inline-block w-2 h-4 bg-blue-600 ml-1 animate-pulse">
                          |
                        </span>
                      )}
                      "
                    </p>

                    {/* Peter Typing indicator - only show while typing */}
                    {!peterIsTypingComplete && (
                      <div className="flex items-center mt-3 text-blue-600">
                        <span className="text-xs">💭</span>
                        <div className="ml-2 flex space-x-1">
                          <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Single button to hide both characters - only show after both finish typing */}
          {showButton && (
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-50">
              <button
                onClick={handleStartTask}
                className="bg-gradient-to-r from-yellow-400 to-blue-400 hover:from-yellow-500 hover:to-blue-500 border-2 border-yellow-600 text-black font-bold py-3 px-8 font-mono text-lg transition-all duration-200 transform hover:scale-105 relative group shadow-lg"
              >
                {/* Button corner decorations */}
                <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-yellow-700"></div>
                <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-blue-700"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-yellow-700"></div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-blue-700"></div>
                [START CHALLENGE] ▶
              </button>
            </div>
          )}
        </>
      )}

      <Link to="/main-menu" className="z-50 relative">
        <span className="bg-yellow-500 hover:bg-yellow-500 border-2 border-yellow-600 text-black font-bold py-2 px-6 font-mono text-sm transition-all duration-200 transform hover:scale-105 relative group">
          HOME ▶
        </span>
      </Link>

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
      <div className="container mx-auto  relative w-full h-full z-10">
        <div className=" backdrop-blur-sm rounded-xl h-[90vh] border-4 border-zinc-400 shadow-2xl  relative overflow-hidden flex  flex-col items-center justify-center">
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
          {PeterHide && (
            <div className="absolute -bottom-1/4 left-1/12 w-full h-full z-50">
              <Peter
                slides={peterSlides}
                imageSrc="/peterIdea.png"
                className=" absolute  z-50"
              />
              <button
                onClick={() => setPeterHide(false)}
                className="absolute top-1/5 right-1/9 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded shadow-lg z-50"
              >
                X
              </button>
            </div>
          )}

          <LetsPlayGame />
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

export default Stage4Page;
