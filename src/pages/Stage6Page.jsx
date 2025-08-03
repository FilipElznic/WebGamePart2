import React, { useState, useEffect } from "react";
import AILaughtE from "/AILaughtE.png";
import peterThink from "/peterThink.png";
import { Link } from "react-router-dom";
import Final from "../Components/Final";
import Peter from "../Components/Peter";

const Stage4Page = React.memo(() => {
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
      title: "It's time buddy",
      description:
        "I wish you good luck my friend, Sorry for the code, but you need to do this section for both of us.",
    },
    {
      title: "Even if you lose",
      description:
        "If you don't succeed on the first try, just keep going! You have unlimited tries, so don't worry about it.",
    },
  ];

  const aiText =
    "Great job, we are almost there! Now you need to insert the code to the the lock. That Peter had surely written down and remembered it for you.";

  const peterText =
    "Ummmmm, well we have a big problem! I lost the code and I don't remember it. But there  were just 4 digit. But I think you can guess it.";

  // AI typing effect - optimized version
  useEffect(() => {
    let animationFrameId;
    let startTime;
    const typingSpeed = 30; // milliseconds per character
    const totalDuration = aiText.length * typingSpeed;

    const animateText = (timestamp) => {
      if (!startTime) startTime = timestamp + 1000; // 1 second delay

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / totalDuration, 1);
      const currentIndex = Math.floor(progress * aiText.length);

      if (currentIndex >= 0) {
        setAiDisplayText(aiText.slice(0, currentIndex + 1));
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateText);
      } else {
        setAiIsTypingComplete(true);
        // Show Peter after AI finishes typing
        setTimeout(() => setShowPeter(true), 1000);
      }
    };

    animationFrameId = requestAnimationFrame(animateText);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [aiText]);

  // Peter typing effect - optimized version
  useEffect(() => {
    if (!showPeter) return;

    let animationFrameId;
    let startTime;
    const typingSpeed = 30; // milliseconds per character
    const totalDuration = peterText.length * typingSpeed;

    const animateText = (timestamp) => {
      if (!startTime) startTime = timestamp + 500; // 500ms delay

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / totalDuration, 1);
      const currentIndex = Math.floor(progress * peterText.length);

      if (currentIndex >= 0) {
        setPeterDisplayText(peterText.slice(0, currentIndex + 1));
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateText);
      } else {
        setPeterIsTypingComplete(true);
        // Show button after Peter finishes typing
        setTimeout(() => setShowButton(true), 500);
      }
    };

    animationFrameId = requestAnimationFrame(animateText);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [showPeter, peterText]);

  const handleStartTask = () => {
    // Hide the dialogue (both characters)
    setShowDialogue(false);
    // Start the challenge
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-purple-950 relative overflow-hidden ">
      {showDialogue && (
        <>
          {/* Overlay background while dialogue is active */}
          <div className="fixed inset-0 bg-black bg-opacity-80 z-20 pointer-events-none transition-all duration-500 flex items-center justify-center w-full">
            <div className="container  border-4 border-purple-500 h-[90vh]  relative">
              <div className="absolute -top-3 -left-3 w-5 h-5 border-t-5 border-l-5 border-purple-600"></div>
              <div className="absolute -top-3 -right-3 w-5 h-5 border-t-5 border-r-5 border-purple-600"></div>
              <div className="absolute -bottom-3 -left-3 w-5 h-5 border-b-5 border-l-5 border-purple-600"></div>
              <div className="absolute -bottom-3 -right-3 w-5 h-5 border-b-5 border-r-5 border-purple-600"></div>
              <div className="absolute inset-0 opacity-10 ">
                <div className="grid grid-cols-8 h-full">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="border-r border-purple-300"></div>
                  ))}
                </div>
                <div className="absolute inset-0 grid grid-rows-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="border-b border-purple-300 w-full"
                    ></div>
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 pointer-events-none">
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
            </div>
          </div>
          <div className=" z-40">
            <img
              src={AILaughtE}
              alt="AI"
              className="absolute max-w-2xl left-1/2  -bottom-1/5 z-40  "
            />

            {/* AI Speech bubble */}
            <div className="absolute bottom-80 right-1/12 z-50 max-w-md">
              <div className="bg-white border-4 border-purple-400 rounded-lg p-4 relative shadow-xl">
                {/* Speech bubble tail */}
                <div className="absolute -bottom-3 left-8 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
                <div className="absolute -bottom-4 left-7 w-0 h-0 border-l-6 border-r-6 border-t-10 border-l-transparent border-r-transparent border-t-purple-400"></div>

                {/* Corner decorations */}
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-purple-600"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-purple-600"></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-purple-600"></div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-purple-600"></div>

                {/* AI Dialogue text */}
                <div className="text-black font-mono">
                  <p className="text-lg font-bold text-purple-700 mb-2">AI:</p>
                  <p className="text-sm leading-relaxed">
                    "{aiDisplayText}"
                    {!aiIsTypingComplete && (
                      <span className="inline-block w-0.5 h-4 bg-purple-600 ml-1 animate-pulse">
                        |
                      </span>
                    )}
                  </p>

                  {/* AI Typing indicator - only show while typing */}
                  {!aiIsTypingComplete && (
                    <div className="flex items-center mt-3 text-purple-600">
                      <span className="text-xs">💭</span>
                      <div className="ml-2 flex space-x-1">
                        <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-1 h-1 bg-purple-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-1 h-1 bg-purple-400 rounded-full animate-bounce"
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
                className="absolute max-w-2xl bottom-0 left-1/6 z-40 "
              />

              {/* Peter Speech bubble */}
              <div className="absolute bottom-80 left-32 z-50 max-w-md ">
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
                      "{peterDisplayText}"
                      {!peterIsTypingComplete && (
                        <span className="inline-block w-0.5 h-4 bg-blue-600 ml-1 animate-pulse">
                          |
                        </span>
                      )}
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
                className="text-white bg-gradient-to-r from-blue-400 to-black hover:from-blue-500 hover:to-purple-500 border-2 border-purple-600  font-bold py-3 px-8 font-mono text-lg transition-all duration-200 transform hover:scale-105 relative group shadow-lg"
              >
                {/* Button corner decorations */}
                <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-blue-900"></div>
                <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-purple-800"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-blue-900"></div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-purple-800"></div>
                [START CHALLENGE] ▶
              </button>
            </div>
          )}
        </>
      )}

      <Link to="/main-menu" className="z-50 relative">
        <span className="bg-purple-500 hover:bg-purple-500 border-2 border-purple-600 text-black font-bold py-2 px-6 font-mono text-sm transition-all duration-200 transform hover:scale-105 relative group">
          HOME ▶
        </span>
      </Link>

      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-8 h-full">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border-r border-purple-300"></div>
          ))}
        </div>
        <div className="absolute inset-0 grid grid-rows-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border-b border-purple-300 w-full"></div>
          ))}
        </div>
      </div>
      <div className="container mx-auto  relative w-full h-full z-10">
        <div className=" backdrop-blur-sm rounded-xl h-[95vh] border-4 border-zinc-400 shadow-2xl  relative overflow-hidden flex  flex-col items-center justify-center">
          <div className="absolute inset-0 pointer-events-none">
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
          {PeterHide && (
            <div className="absolute -bottom-1/4 left-1/12 w-full h-full z-50">
              <Peter
                slides={peterSlides}
                imageSrc="/peterHi.png"
                className=" absolute  z-50"
              />
              <button
                onClick={() => setPeterHide(false)}
                className="absolute top-1/4 right-1/6 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded shadow-lg z-50"
              >
                X
              </button>
            </div>
          )}

          <Final />
        </div>
      </div>

      {/* Floating retro symbols */}
      <div className="absolute inset-0 pointer-events-none">
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
    </div>
  );
});

export default Stage4Page;
