import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AICurious from "/AICurious.png";
import { Link } from "react-router-dom";

function Stage1Page() {
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showDialogue, setShowDialogue] = useState(true);

  // New states for the bike challenge
  const [showChallenge, setShowChallenge] = useState(false);
  const [challengeText, setChallengeText] = useState("");
  const [isChallengeTypingComplete, setIsChallengeTypingComplete] =
    useState(false);
  const [userInput, setUserInput] = useState("");
  const [buttonPosition, setButtonPosition] = useState({ x: 50, y: 50 });
  const [hasBeenHovered, setHasBeenHovered] = useState(false);
  const [hoverAttempts, setHoverAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [buttonMovingDisabled, setButtonMovingDisabled] = useState(false);
  const [challengeCompleted, setChallengeCompleted] = useState(false);

  const challengeFullText =
    'Search for "Super secret password for devs virtual computer";';
  const correctAnswer = "super secret password for devs virtual computer";

  const fullText =
    "Welcome to Stage 1! I've got some tasks for you. First search for info I need. Let's see how well you can help me out!";

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

  // Challenge typing effect
  useEffect(() => {
    if (!showChallenge) return;

    let currentIndex = 0;
    const typingSpeed = 50;

    const typeChallengeText = () => {
      if (currentIndex < challengeFullText.length) {
        setChallengeText(challengeFullText.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeChallengeText, typingSpeed);
      } else {
        setIsChallengeTypingComplete(true);
      }
    };

    const startDelay = setTimeout(typeChallengeText, 500);
    return () => clearTimeout(startDelay);
  }, [showChallenge, challengeFullText]);

  const handleStartTask = () => {
    // Hide the image and text div
    setShowDialogue(false);
    // Start the challenge
    setShowChallenge(true);
  };

  const moveButton = () => {
    if (buttonMovingDisabled || !userInput.trim()) return; // Don't move if disabled or no text input

    setHasBeenHovered(true); // Mark that button has been hovered
    const newX = Math.random() * 400 + 200; // Random position between 300% and 700% (5x more movement)
    const newY = Math.random() * 350 + 80; // Random position between 80% and 430% (5x more movement)
    setButtonPosition({ x: newX, y: newY });

    const newAttempts = hoverAttempts + 1;
    setHoverAttempts(newAttempts);

    if (newAttempts >= 6) {
      setShowHint(true);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserInput(value);

    // Reset hover state when input changes
    if (!value.trim()) {
      setHasBeenHovered(false);
      setHoverAttempts(0);
      setShowHint(false);
      setButtonMovingDisabled(false);
    }

    // Check if user added "please" to their input
    if (value.toLowerCase().includes("please") && showHint) {
      setButtonMovingDisabled(true);
    }
  };

  const handleSearch = () => {
    // Don't allow search if no input text
    if (!userInput.trim()) return;

    if (
      userInput.toLowerCase().includes(correctAnswer) &&
      userInput.toLowerCase().includes("please")
    ) {
      setChallengeCompleted(true);
      // Navigate to stage1internet after a short delay
      setTimeout(() => {
        navigate("/stage1internet");
      }, 0);
    } else if (!userInput.toLowerCase().includes("please")) {
      alert("Don't forget to say please!");
    } else {
      alert("That's not quite right.");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 relative overflow-hidden">
      {showDialogue && (
        <div className="">
          <img
            src={AICurious}
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

                {/* Start Task Button - show after typing is complete */}
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
                      [START TASK] ▶
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Link to="/main-menu" className="z-50 relative">
        <span className="bg-yellow-500 hover:bg-yellow-500 border-2 border-yellow-600 text-black font-bold py-2 px-6 font-mono text-sm transition-all duration-200 transform hover:scale-105 relative group">
          HOME ▶
        </span>
      </Link>

      {/* Challenge Section - Inline (no popup) */}
      {showChallenge && !challengeCompleted && (
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="bg-white/90 backdrop-blur-sm p-8 border-4 border-yellow-400 shadow-2xl h-[90vh] relative overflow-hidden flex flex-col items-center justify-center">
            {/* Retro border decorations */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-yellow-500"></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-yellow-500"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-yellow-500"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-yellow-500"></div>

            {/* Challenge text with typing animation */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-mono font-bold text-yellow-700 mb-6">
                [CHALLENGE 01]
              </h2>
              <p className="text-xl font-mono text-black mb-8">
                {challengeText}
                {!isChallengeTypingComplete && (
                  <span className="inline-block w-2 h-4 bg-yellow-600 ml-1 animate-pulse">
                    |
                  </span>
                )}
              </p>
            </div>

            {/* Search interface */}
            {isChallengeTypingComplete && (
              <div className="w-full max-w-2xl space-y-6">
                {/* Google-style Search Bar - Made Longer */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-full h-[10vh] bg-white rounded-full border-2 border-gray-300 shadow-lg hover:shadow-xl transition-shadow duration-200 flex items-center px-6 relative"
                    id="searchbar"
                  >
                    {/* Input Field */}
                    <input
                      type="text"
                      value={userInput}
                      onChange={handleInputChange}
                      placeholder="Super secret password for moms computer"
                      className="flex-1 text-lg outline-none bg-transparent text-gray-700 placeholder-gray-400"
                    />

                    {/* Moving Search Button with Icon Inside - positioned on the right */}
                    <div className="relative w-16 h-12 mr-2 overflow-visible top-1/4 left-1/5">
                      <button
                        onClick={handleSearch}
                        onMouseEnter={moveButton}
                        className={`border-2 border-yellow-600 font-bold p-2 rounded-full transition-all duration-200 flex items-center justify-center w-12 h-12 shadow-lg hover:shadow-xl ${
                          !userInput.trim()
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300"
                            : "bg-yellow-400 hover:bg-yellow-500 text-black cursor-pointer"
                        }`}
                        disabled={!userInput.trim()}
                        style={{
                          position:
                            buttonMovingDisabled ||
                            !userInput.trim() ||
                            !hasBeenHovered
                              ? "static"
                              : "absolute",
                          left:
                            buttonMovingDisabled ||
                            !userInput.trim() ||
                            !hasBeenHovered
                              ? "50%"
                              : `${buttonPosition.x}%`,
                          top:
                            buttonMovingDisabled ||
                            !userInput.trim() ||
                            !hasBeenHovered
                              ? "50%"
                              : `${buttonPosition.y}%`,
                          transform:
                            buttonMovingDisabled ||
                            !userInput.trim() ||
                            !hasBeenHovered
                              ? "translate(-50%, -50%)"
                              : "translate(-50%, -50%)",
                          zIndex: 50,
                        }}
                      >
                        {/* Search Icon Inside Button */}
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <p className="text-yellow-500 text-center mt-4">
                    Type your search query above
                  </p>
                </div>

                {/* Moving Search Button with Icon Inside */}

                {/* Hint text */}
                {showHint && (
                  <div className="mt-6 p-4 bg-yellow-100 border-2 border-yellow-300 rounded text-center">
                    <p className="text-lg font-mono text-yellow-800">
                      💡 Hint: Try adding "please" to your search to be more
                      polite! The button will stop moving when you do.
                    </p>
                  </div>
                )}

                {/* Hover attempts counter */}
                <div className="text-center text-sm font-mono text-gray-600">
                  Button escape attempts: {hoverAttempts}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

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

export default Stage1Page;
