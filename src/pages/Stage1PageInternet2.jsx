import React, { useState, useEffect } from "react";
import peterHappy from "/peterHappy.png";
import { useUserData } from "../Components/UserDataProvider";

function Stage1PageInternet2() {
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isPeterVisible, setIsPeterVisible] = useState(true);
  const [copied, setCopied] = useState(false);
  const [xpAwarded, setXpAwarded] = useState(false);
  const [xpMessage, setXpMessage] = useState("");
  const [isAddingXP, setIsAddingXP] = useState(false);
  const { userData, addXPForTask, userXP } = useUserData();

  const [InternetOnHidden, setInternetOnHidden] = useState(false);

  const fullText =
    "Great job, I knew you would find the solution! Now let's click copy text to get to the 2.stage and find the AI secret.";

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

  const handleHidePeter = () => {
    setIsPeterVisible(false);
  };

  const handleCopyCode = async () => {
    try {
      // Copy to clipboard
      await navigator.clipboard.writeText(
        "a3F9kL7mV2X0nB6qW8rT1zY5hC4dE7uJ9sP3oG8xQ6vM2iN1A0"
      );

      setCopied(true);

      // Check if user is eligible for XP (has 0 XP) and hasn't already been awarded
      if (userXP === 0 && !xpAwarded) {
        setIsAddingXP(true);

        const result = await addXPForTask(100); // Add 100 XP

        if (result.success) {
          setXpAwarded(true);
          setXpMessage("🎉 +100 XP Earned! Great job!");

          // Show XP message for 3 seconds
          setTimeout(() => {
            setXpMessage("");
          }, 3000);
        } else {
          console.error("Failed to add XP:", result.error);
          if (result.error.includes("already has XP")) {
            setXpMessage("Code copied! (XP already earned)");
          } else {
            setXpMessage("Code copied! (XP update failed)");
          }

          setTimeout(() => {
            setXpMessage("");
          }, 2000);
        }

        setIsAddingXP(false);
      } else if (xpAwarded || userXP > 0) {
        setXpMessage("Code copied! (XP already earned)");
        setTimeout(() => {
          setXpMessage("");
        }, 2000);
      }

      // Reset copied state
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 relative overflow-hidden">
      <button
        onClick={() => (window.location.href = "/main-menu")}
        className="z-50 relative"
      >
        <span className="bg-yellow-500 hover:bg-yellow-500 border-2 border-yellow-600 text-black font-bold py-2 px-6 font-mono text-sm transition-all duration-200 transform hover:scale-105 relative group">
          TASK MAP ▶
        </span>
      </button>
      {isPeterVisible && (
        <div className="z-50">
          <img
            src={peterHappy}
            alt="Peter's Idea"
            className="absolute max-w-2xl bottom-0 right-0 z-40"
          />

          {/* Speech bubble */}
          <div className="absolute bottom-80 right-96 z-40 max-w-md">
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

                {/* Continue Button - show after typing is complete */}
                {showButton && (
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={handleHidePeter}
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

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div
          className={` backdrop-blur-sm p-8 border-4 border-yellow-400 shadow-2xl h-[90vh] relative overflow-hidden flex flex-col items-center justify-center`}
        >
          <div className="w-full h-[5vh] border-2 relative">
            <button
              onClick={() => (window.location.href = "/main-menu")}
              className="absolute right-0 top-0 bg-red-500 h-full w-11 text-center text-white text-xl items-center flex justify-center"
            >
              X
            </button>
            <div
              className={`"absolute left-3-0 top-0 bg-white border-2 border-gray-300  h-full w-32 rounded-t-xl rounded-lg text-center  text-xl items-center flex justify-center`}
            >
              <span className=" font-bold">Search bar</span>
            </div>
          </div>
          <div
            className={`w-full h-full text-balance border-1 flex items-center flex-col`}
          >
            <div className="flex items-center  w-full h-full flex-col">
              <img src="/dino.png" alt="Dino" className="mb-4 w-20 h-20 " />
              <h1 className="text-4xl font-mono font-bold mb-4 text-center">
                Stage 1: Internet Connection Completed ✅
              </h1>
              <p className={`text-xl font-mono text-center w-1/2 `}>
                almost, here you have the code. But you need to copy it to
                continue. You will need it later in stage 2.
              </p>
              <div className="flex flex-col items-center mt-8">
                <div className="bg-black text-green-400 font-mono px-6 py-4 rounded-lg border-2 border-yellow-400 shadow-lg text-lg select-all text-center mb-3">
                  a3F9kL7mV2X0nB6qW8rT1zY5hC4dE7uJ9sP3oG8xQ6vM2iN1A0
                </div>

                <button
                  onClick={handleCopyCode}
                  disabled={isAddingXP}
                  className={`mt-1 bg-yellow-400 hover:bg-yellow-500 border-2 border-yellow-600 text-black font-bold py-2 px-6 rounded font-mono text-sm transition-all duration-200 transform hover:scale-105 ${
                    isAddingXP ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isAddingXP
                    ? "Adding XP..."
                    : copied
                    ? "Code Copied!"
                    : "Copy Code"}
                </button>

                {/* XP Message Display */}
                {xpMessage && (
                  <div className="mt-3 bg-green-100 border-2 border-green-400 text-green-800 px-4 py-2 rounded-lg font-mono text-sm animate-pulse">
                    {xpMessage}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Dark Mode Toggle Button */}

          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-yellow-500"></div>
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-yellow-500"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-yellow-500"></div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-yellow-500"></div>
        </div>
      </div>

      {/* Floating retro symbols */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          onClick={() => {
            setInternetOnHidden(true);
          }}
          className="absolute top-10 left-10 text-4xl text-yellow-400 opacity-20 animate-pulse font-mono pointer-events-auto"
        >
          ◆
        </div>
        <div className="absolute  top-20 right-20 text-3xl text-yellow-500 opacity-30 animate-bounce font-mono pointer-events-auto">
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

export default Stage1PageInternet2;
