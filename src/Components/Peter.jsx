import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Peter({
  slides = [],
  imageSrc = "",
  imageAlt = "Game Image",
  showNavigation = true,
  onComplete = null,
  className = "",
}) {
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
  const completionTimeoutRef = React.useRef(null);

  // Default slides if none provided
  const defaultSlides = [
    {
      title: "Welcome to Peter's Quest",
      description: "Hi my name is Peter, and I have a small problem.",
    },
    {
      title: "What's the Problem?",
      description:
        "I have found myself alone home with this to do list that I need to complete today.",
    },
    {
      title: "Will you Help Me?",
      description:
        " I have no idea how to do it, and I need your help to solve it. Are you sure you want to try to do it with me ? It will be a lot of fun, I promise!",
    },
    {
      title: "Ready to Play?",
      description:
        "Let's embark on this adventure together! There are total of 6 stages to complete. Click the button below to start.",
    },
  ];

  const slidesToUse = slides.length > 0 ? slides : defaultSlides;
  const currentSlideData = slidesToUse[currentSlide];

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
      if (completionTimeoutRef.current) {
        clearTimeout(completionTimeoutRef.current);
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
    if (completionTimeoutRef.current) {
      clearTimeout(completionTimeoutRef.current);
      completionTimeoutRef.current = null;
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
    if (isTypingTitle && currentSlideData) {
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
  }, [isTypingTitle, currentSlideData?.title]);

  // Typewriter effect for description
  useEffect(() => {
    if (isTypingDescription && currentSlideData) {
      let index = 0;
      const typeDescription = () => {
        if (index < currentSlideData.description.length) {
          setDescriptionText(currentSlideData.description.slice(0, index + 1));
          index++;
          descriptionTimeoutRef.current = setTimeout(typeDescription, 30); // Faster typing speed for description
        } else {
          setIsTypingDescription(false);
          descriptionTimeoutRef.current = null;

          // Call onComplete callback if on last slide and typing is done, with 5 second delay
          if (currentSlide === slidesToUse.length - 1 && onComplete) {
            completionTimeoutRef.current = setTimeout(() => onComplete(), 5000);
          }
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
  }, [
    isTypingDescription,
    currentSlideData?.description,
    currentSlide,
    slidesToUse.length,
    onComplete,
  ]);

  const nextSlide = () => {
    if (currentSlide < slidesToUse.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Don't render if no slides or current slide data
  if (!currentSlideData) {
    return null;
  }

  return (
    <div className={`absolute z-50 overflow-hidden w-full h-full ${className}`}>
      {/* Retro grid background */}

      <div className="flex items-center justify-center px-4 relative z-10 h-full">
        <div className="w-full max-w-6xl relative">
          {/* Retro border decorations */}

          <div className="flex flex-col md:flex-row items-center p-8 min-h-[60vh]">
            {/* Image section - Fixed width */}
            {imageSrc && (
              <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className={`max-w-md w-full border-b-2 h-auto transition-all duration-1000 ease-out transform ${
                    showImage
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-10 scale-95"
                  }`}
                />
              </div>
            )}

            {/* Content section - Fixed width */}
            <div
              className={`flex-shrink-0 w-full ${
                imageSrc ? "md:w-1/2" : "md:w-full"
              } flex flex-col justify-center px-6 transition-all duration-1000 ease-out transform ${
                showContent
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              {/* Title with typing effect - Fixed height container */}
              <div className="mb-6 min-h-[4rem] flex items-start">
                <h1 className="text-4xl md:text-5xl font-mono font-bold text-gray-800 text-left">
                  <span className="bg-yellow-100 px-3 py-2 border-2 border-yellow-400 inline-block">
                    {titleText}
                    {isTypingTitle && (
                      <span className="animate-pulse text-yellow-600">|</span>
                    )}
                  </span>
                </h1>
              </div>

              {/* Description with typing effect - Fixed height container */}
              <div className="bg-yellow-50 border-2 border-yellow-400 p-4 mb-6 min-h-[8rem]">
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

              {/* Navigation buttons - Fixed height container */}
              {showNavigation && slidesToUse.length > 1 && (
                <div className="flex items-center justify-between min-h-[3rem]">
                  <button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className="bg-blue-400 hover:bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed border-4 border-gray-800 px-4 py-2 font-mono font-bold text-gray-800 text-sm uppercase tracking-wider transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                  >
                    [ &lt; PREV ]
                  </button>

                  {/* Slide indicators */}
                  <div className="flex space-x-2">
                    {slidesToUse.map((_, index) => (
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
                    disabled={currentSlide === slidesToUse.length - 1}
                    className="bg-green-400 hover:bg-green-500 disabled:bg-gray-300 disabled:cursor-not-allowed border-4 border-gray-800 px-4 py-2 font-mono font-bold text-gray-800 text-sm uppercase tracking-wider transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                  >
                    [ NEXT &gt; ]
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Header decoration */}
        </div>
      </div>
    </div>
  );
}

export default Peter;
