import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PeterIdea from "/peterIdea.png";

function GameStart() {
  const [showImage, setShowImage] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [titleText, setTitleText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [isTypingTitle, setIsTypingTitle] = useState(false);
  const [isTypingDescription, setIsTypingDescription] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Refs to store timeout IDs for cleanup
  const titleTimeoutRef = React.useRef(null);
  const descriptionTimeoutRef = React.useRef(null);

  const slides = [
    {
      title: "Welcome to Peter's Quest",
      description: "Hi my name is Peter, and I have a small problem.",
    },
    {
      title: "What's the Problem?",
      description:
        "I have found an old computer in the basement that seems a little bit forgotten. I have turned it on, and it seems to have a weird OS on it.",
    },
    {
      title: "Will you help me?",
      description:
        "I am too scared to explore the OS by myself, it seems like it can see me too, but there is no web camera, which is scary!",
    },
    {
      title: "Ready to Play?",
      description:
        "Lets explore this pc and see what we can find! Mabye some background story, or some hidden secrets. (starting the pc noises...)",
    },
  ];

  const currentSlideData = slides[currentSlide];

  useEffect(() => {
    // Sequence of animations
    const timer1 = setTimeout(() => {
      setShowImage(true);
    }, 500);

    const timer2 = setTimeout(() => {
      setShowContent(true);
      setIsTypingTitle(true);
    }, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (titleTimeoutRef.current) {
        clearTimeout(titleTimeoutRef.current);
      }
      if (descriptionTimeoutRef.current) {
        clearTimeout(descriptionTimeoutRef.current);
      }
    };
  }, []);

  // Reset typing when slide changes
  useEffect(() => {
    // Clear any existing timeouts
    if (titleTimeoutRef.current) {
      clearTimeout(titleTimeoutRef.current);
      titleTimeoutRef.current = null;
    }
    if (descriptionTimeoutRef.current) {
      clearTimeout(descriptionTimeoutRef.current);
      descriptionTimeoutRef.current = null;
    }

    // Reset states
    setTitleText("");
    setDescriptionText("");
    setIsTypingTitle(false);
    setIsTypingDescription(false);

    // Start typing for new slide
    if (currentSlide >= 0) {
      setTimeout(() => {
        setIsTypingTitle(true);
      }, 100); // Small delay to ensure clean state reset
    }
  }, [currentSlide]);

  // Typewriter effect for title
  useEffect(() => {
    if (isTypingTitle) {
      let index = 0;
      const typeTitle = () => {
        if (index < currentSlideData.title.length) {
          setTitleText(currentSlideData.title.slice(0, index + 1));
          index++;
          titleTimeoutRef.current = setTimeout(typeTitle, 100); // Typing speed for title
        } else {
          setIsTypingTitle(false);
          setIsTypingDescription(true);
          titleTimeoutRef.current = null;
        }
      };
      typeTitle();
    }

    // Cleanup function
    return () => {
      if (titleTimeoutRef.current) {
        clearTimeout(titleTimeoutRef.current);
        titleTimeoutRef.current = null;
      }
    };
  }, [isTypingTitle, currentSlideData.title]);

  // Typewriter effect for description
  useEffect(() => {
    if (isTypingDescription) {
      let index = 0;
      const typeDescription = () => {
        if (index < currentSlideData.description.length) {
          setDescriptionText(currentSlideData.description.slice(0, index + 1));
          index++;
          descriptionTimeoutRef.current = setTimeout(typeDescription, 30); // Faster typing speed for description
        } else {
          setIsTypingDescription(false);
          descriptionTimeoutRef.current = null;
        }
      };
      typeDescription();
    }

    // Cleanup function
    return () => {
      if (descriptionTimeoutRef.current) {
        clearTimeout(descriptionTimeoutRef.current);
        descriptionTimeoutRef.current = null;
      }
    };
  }, [isTypingDescription, currentSlideData.description]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 relative overflow-hidden">
      {/* Retro grid background */}
      <div className="absolute inset-0 opacity-5">
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

      {/* Floating retro elements */}
      <div className="absolute top-20 left-10 text-4xl text-yellow-400 opacity-20 animate-bounce font-mono">
        ◆
      </div>
      <div className="absolute top-32 right-20 text-3xl text-yellow-500 opacity-30 animate-pulse font-mono">
        ★
      </div>
      <div className="absolute bottom-32 left-16 text-5xl text-yellow-400 opacity-25 animate-pulse font-mono">
        ◇
      </div>
      <div className="absolute bottom-20 right-16 text-4xl text-yellow-500 opacity-20 animate-bounce font-mono">
        ♦
      </div>

      <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
        <div className="w-full max-w-6xl bg-white/90 backdrop-blur-sm border-4 border-yellow-400 shadow-2xl relative">
          {/* Retro border decorations */}
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-yellow-500"></div>
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-yellow-500"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-yellow-500"></div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-yellow-500"></div>

          <div className="flex flex-col md:flex-row items-center p-8 min-h-[60vh]">
            {/* Image section */}
            <div className="flex-1 flex justify-center mb-8 md:mb-0">
              <img
                src={PeterIdea}
                alt="Peter's Idea"
                className={`max-w-md w-full h-auto transition-all duration-1000 ease-out transform ${
                  showImage
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-10 scale-95"
                }`}
              />
            </div>

            {/* Content section */}
            <div
              className={`flex-1 flex flex-col justify-center px-6 transition-all duration-1000 ease-out transform ${
                showContent
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              {/* Title with typing effect */}
              <div className="mb-6">
                <h1 className="text-4xl md:text-5xl font-mono font-bold text-gray-800 text-left">
                  <span className="bg-yellow-100 px-3 py-2 border-2 border-yellow-400 inline-block">
                    {titleText}
                    {isTypingTitle && (
                      <span className="animate-pulse text-yellow-600">|</span>
                    )}
                  </span>
                </h1>
              </div>

              {/* Description with typing effect */}
              <div className="bg-yellow-50 border-2 border-yellow-400 p-4 mb-6">
                <div className="font-mono text-sm mb-2 text-yellow-600">
                  &gt; MISSION_BRIEFING:
                </div>
                <p className="text-gray-800 font-mono text-sm leading-relaxed">
                  {descriptionText}
                  {isTypingDescription && (
                    <span className="animate-pulse text-yellow-600">|</span>
                  )}
                </p>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between">
                <button
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                  className="bg-blue-400 hover:bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed border-4 border-gray-800 px-4 py-2 font-mono font-bold text-gray-800 text-sm uppercase tracking-wider transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                >
                  [ &lt; PREV ]
                </button>

                {/* Slide indicators */}
                <div className="flex space-x-2">
                  {slides.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 border-2 border-gray-800 transition-colors duration-200 ${
                        index === currentSlide ? "bg-yellow-400" : "bg-white"
                      }`}
                    ></div>
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  disabled={currentSlide === slides.length - 1}
                  className="bg-green-400 hover:bg-green-500 disabled:bg-gray-300 disabled:cursor-not-allowed border-4 border-gray-800 px-4 py-2 font-mono font-bold text-gray-800 text-sm uppercase tracking-wider transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                >
                  [ NEXT &gt; ]
                </button>
              </div>

              {/* Start Button - Only show on final slide after typing completes */}
              {currentSlide === slides.length - 1 &&
                !isTypingTitle &&
                !isTypingDescription && (
                  <div className="mt-6 text-center">
                    <Link
                      to="/main-menu"
                      className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 border-4 border-gray-800 px-8 py-4 font-mono font-bold text-gray-800 text-xl uppercase tracking-wider transition-all duration-200 hover:scale-110 transform shadow-lg relative overflow-hidden"
                    >
                      <span className="relative z-10">[ START ADVENTURE ]</span>
                      <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-200"></div>

                      {/* Animated glow effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-300 to-yellow-400 opacity-30 blur animate-pulse"></div>
                    </Link>
                  </div>
                )}
            </div>
          </div>

          {/* Header decoration */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 px-3 py-1 border-2 border-gray-800 font-mono text-sm font-bold text-gray-800">
            GAME_INTRO
          </div>
        </div>
      </div>

      {/* Retro scan lines effect */}
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
  );
}

export default GameStart;
