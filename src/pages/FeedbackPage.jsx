import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import peterIdea from "/peterIdea.png";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function FeedbackPage() {
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showDialogue, setShowDialogue] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [feedbackType, setFeedbackType] = useState("general");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState(""); // 'success' or 'error'

  const fullText =
    "Greetings, fellow retro-gamer! Got feedback? Bug reports? Ideas? Drop them here and help us level up this experience!";

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_PUBLIC_KEY); // Replace with your actual public key
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 50;

    const typeText = () => {
      if (currentIndex < fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeText, typingSpeed);
      } else {
        setIsTypingComplete(true);
        setTimeout(() => setShowButton(true), 500);
      }
    };

    const startDelay = setTimeout(typeText, 1000);
    return () => clearTimeout(startDelay);
  }, []);

  const handleStartTask = () => {
    setShowDialogue(false);
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");
    setSubmitStatus("");

    // EmailJS template parameters
    const templateParams = {
      feedback_type: feedbackType.toUpperCase(),
      user_email: email || "Not provided",
      message: feedback,
      from_name: email ? email.split("@")[0] : "Anonymous User",
      to_name: "RetroGame Team", // You can customize this
    };

    try {
      const result = await emailjs.send(
        import.meta.env.VITE_SERVICE_ID, // Your service ID
        import.meta.env.VITE_TEMPLATE_ID, // Replace with your template ID
        templateParams
      );

      console.log("EmailJS Success:", result);
      setSubmitStatus("success");
      setSubmitMessage("FEEDBACK_TRANSMITTED_SUCCESSFULLY");
      setFeedback("");
      setEmail("");
      setFeedbackType("general");

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitMessage("");
        setSubmitStatus("");
      }, 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus("error");
      setSubmitMessage("TRANSMISSION_FAILED - Please try again");

      // Clear error message after 5 seconds
      setTimeout(() => {
        setSubmitMessage("");
        setSubmitStatus("");
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 relative overflow-hidden">
      <Navbar />

      {showDialogue && (
        <div className="">
          <img
            src={peterIdea}
            alt="Peter's Idea"
            className="absolute max-w-2xl bottom-2/5 z-40 border-b-2"
          />

          <div className="absolute bottom-3/5 left-1/4 z-40 max-w-md">
            <div className="bg-white border-4 border-yellow-400 rounded-lg p-4 relative shadow-xl">
              <div className="absolute -bottom-3 left-8 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
              <div className="absolute -bottom-4 left-7 w-0 h-0 border-l-6 border-r-6 border-t-10 border-l-transparent border-r-transparent border-t-yellow-400"></div>

              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-yellow-600"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-yellow-600"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-yellow-600"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-yellow-600"></div>

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

                {showButton && (
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={handleStartTask}
                      className="bg-yellow-400 hover:bg-yellow-500 border-2 border-yellow-600 text-black font-bold py-2 px-6 font-mono text-sm transition-all duration-200 transform hover:scale-105 relative group"
                    >
                      <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-yellow-700"></div>
                      <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-yellow-700"></div>
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-yellow-700"></div>
                      <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-yellow-700"></div>
                      [CONTINUE] ▶
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 relative w-full h-full z-10">
        <div className="backdrop-blur-sm p-8 border-4 border-yellow-400 shadow-2xl relative overflow-hidden min-h-[90vh]">
          {/* Animated header with CRT effect */}
          <div className="text-center mb-8 relative">
            <div className="inline-block bg-black text-yellow-400 px-8 py-4 border-4 border-yellow-500 font-mono text-4xl font-bold relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-20"></div>
              <div className="relative z-10">
                &gt;&gt; FEEDBACK_TERMINAL &lt;&lt;
              </div>
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-4 border-l-4 border-yellow-300"></div>
              <div className="absolute -top-2 -right-2 w-4 h-4 border-t-4 border-r-4 border-yellow-300"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-4 border-l-4 border-yellow-300"></div>
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-4 border-r-4 border-yellow-300"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left side - Feedback Form */}
            <div className="space-y-6">
              <div className="bg-black border-4 border-yellow-400 p-6 relative">
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-yellow-400"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400"></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-yellow-400"></div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-400"></div>

                <h3 className="text-yellow-400 font-mono text-xl font-bold mb-4 bg-yellow-400 text-black px-3 py-1 inline-block">
                  [INPUT_FORM]
                </h3>

                <form onSubmit={handleSubmitFeedback} className="space-y-4">
                  {/* Feedback Type Selector */}
                  <div>
                    <label className="block text-yellow-400 font-mono text-sm mb-2">
                      &gt; SELECT_FEEDBACK_TYPE:
                    </label>
                    <select
                      value={feedbackType}
                      onChange={(e) => setFeedbackType(e.target.value)}
                      className="w-full bg-yellow-900 text-yellow-100 border-2 border-yellow-400 p-2 font-mono focus:border-yellow-300 focus:outline-none"
                    >
                      <option value="general">GENERAL_FEEDBACK</option>
                      <option value="bug">BUG_REPORT</option>
                      <option value="feature">FEATURE_REQUEST</option>
                      <option value="compliment">COMPLIMENT</option>
                      <option value="complaint">COMPLAINT</option>
                    </select>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-yellow-400 font-mono text-sm mb-2">
                      &gt; EMAIL_ADDRESS: [OPTIONAL]
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="user@retro-game.net"
                      className="w-full bg-yellow-900 text-yellow-100 border-2 border-yellow-400 p-2 font-mono focus:border-yellow-300 focus:outline-none placeholder-yellow-600"
                    />
                  </div>

                  {/* Feedback Text Area */}
                  <div>
                    <label className="block text-yellow-400 font-mono text-sm mb-2">
                      &gt; MESSAGE_CONTENT:
                    </label>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Type your feedback here... Be specific about bugs, features, or general thoughts!"
                      rows="6"
                      className="w-full bg-yellow-900 text-yellow-100 border-2 border-yellow-400 p-3 font-mono focus:border-yellow-300 focus:outline-none placeholder-yellow-600 resize-none"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !feedback.trim()}
                    className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:bg-yellow-600 disabled:cursor-not-allowed text-black font-mono font-bold py-3 px-6 border-2 border-yellow-600 transition-all duration-200 transform hover:scale-105 relative group"
                  >
                    <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-yellow-800"></div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-yellow-800"></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-yellow-800"></div>
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-yellow-800"></div>

                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <span className="animate-spin mr-2">⚡</span>
                        TRANSMITTING...
                      </span>
                    ) : (
                      "[TRANSMIT_FEEDBACK] ►"
                    )}
                  </button>

                  {/* Success/Error Message */}
                  {submitMessage && (
                    <div
                      className={`border-2 p-3 font-mono text-center ${
                        submitStatus === "success"
                          ? "bg-green-900 border-green-400 text-green-400"
                          : "bg-red-900 border-red-400 text-red-400"
                      }`}
                    >
                      {submitStatus === "success" ? "✓" : "✗"} {submitMessage}
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Right side - Info Panels */}
            <div className="space-y-6">
              {/* Privacy Info */}
              <div className="bg-yellow-50 border-4 border-yellow-400 p-6 relative">
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-yellow-400 rotate-45"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rotate-45"></div>

                <h3 className="text-xl font-mono font-bold text-gray-800 mb-4 bg-yellow-200 px-3 py-1 border border-yellow-500 inline-block">
                  [PRIVACY_PROTOCOL]
                </h3>

                <div className="font-mono text-gray-800 space-y-3">
                  <p className="leading-relaxed">
                    <span className="text-yellow-600 font-bold">&gt;</span> All
                    feedback is sent securely via EmailJS and delivered directly
                    to our team.
                  </p>
                  <p className="leading-relaxed">
                    <span className="text-yellow-600 font-bold">&gt;</span> No
                    cookies, no tracking, no third-party data sharing. Pure
                    old-school privacy!
                  </p>

                  <div className="bg-white border border-yellow-300 p-3 mt-4">
                    <p className="text-sm mb-1">
                      <span className="text-yellow-600">&gt;</span> SERVICE:
                      EmailJS
                    </p>
                    <p className="text-sm mb-1">
                      <span className="text-yellow-600">&gt;</span> COOKIES:
                      DISABLED
                    </p>
                    <p className="text-sm">
                      <span className="text-yellow-600">&gt;</span> TRACKING:
                      NULL
                    </p>
                  </div>
                </div>
              </div>

              {/* Feedback Guidelines */}
              <div className="bg-yellow-50 border-4 border-yellow-400 p-6 relative">
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-yellow-400 rotate-45"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rotate-45"></div>

                <h3 className="text-xl font-mono font-bold text-gray-800 mb-4 bg-yellow-200 px-3 py-1 border border-yellow-500 inline-block">
                  [FEEDBACK_GUIDE]
                </h3>

                <div className="font-mono text-gray-800 space-y-3">
                  <h4 className="font-bold">For Bug Reports:</h4>
                  <p className="text-sm leading-relaxed">
                    <span className="text-yellow-600 font-bold">&gt;</span>{" "}
                    Describe what happened, what you expected, and steps to
                    reproduce.
                  </p>

                  <h4 className="font-bold">For Feature Requests:</h4>
                  <p className="text-sm leading-relaxed">
                    <span className="text-yellow-600 font-bold">&gt;</span> Tell
                    us what feature you'd like and why it would improve the
                    experience.
                  </p>

                  <h4 className="font-bold">General Feedback:</h4>
                  <p className="text-sm leading-relaxed">
                    <span className="text-yellow-600 font-bold">&gt;</span>{" "}
                    Share your thoughts, suggestions, or just say hi!
                  </p>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-yellow-50 border-4 border-yellow-400 p-6 relative">
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-yellow-400 rotate-45"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rotate-45"></div>

                <h3 className="text-xl font-mono font-bold text-gray-800 mb-4 bg-yellow-200 px-3 py-1 border border-yellow-500 inline-block">
                  [RESPONSE_TIME]
                </h3>

                <div className="font-mono text-gray-800 space-y-3">
                  <p className="leading-relaxed">
                    <span className="text-yellow-600 font-bold">&gt;</span> We
                    typically respond to feedback within 24-48 hours during
                    business days.
                  </p>
                  <p className="leading-relaxed">
                    <span className="text-yellow-600 font-bold">&gt;</span>{" "}
                    Critical bugs get priority processing in our retro-debug
                    queue!
                  </p>

                  <div className="bg-black text-yellow-400 border border-yellow-300 p-3 mt-4 font-mono text-sm">
                    <p className="mb-1">QUEUE_STATUS: ACTIVE</p>
                    <p className="mb-1">AVG_RESPONSE: 36_HOURS</p>
                    <p>PRIORITY_BUGS: &lt;12_HOURS</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced retro grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-20 h-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="border-r border-yellow-300"></div>
          ))}
        </div>
        <div className="absolute inset-0 grid grid-rows-16">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="border-b border-yellow-300 w-full"></div>
          ))}
        </div>
      </div>

      {/* More floating retro symbols */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl text-yellow-400 opacity-20 font-mono">
          ◆
        </div>
        <div className="absolute top-20 right-20 text-3xl text-yellow-500 opacity-30 font-mono">
          ★
        </div>
        <div className="absolute bottom-32 left-20 text-4xl text-yellow-400 opacity-25 font-mono">
          ◇
        </div>
        <div className="absolute bottom-20 right-32 text-3xl text-yellow-500 opacity-20 font-mono">
          ♦
        </div>
        <div className="absolute top-1/3 left-1/4 text-2xl text-yellow-400 opacity-20 font-mono">
          ▲
        </div>
        <div className="absolute top-2/3 right-1/4 text-3xl text-yellow-500 opacity-30 font-mono">
          ●
        </div>
        <div className="absolute top-1/2 left-10 text-2xl text-yellow-400 opacity-25 font-mono">
          ▼
        </div>
        <div className="absolute top-3/4 right-10 text-3xl text-yellow-500 opacity-20 font-mono">
          ◆
        </div>
        <div className="absolute top-1/4 right-1/3 text-2xl text-yellow-400 opacity-30 font-mono">
          ◄
        </div>
        <div className="absolute bottom-1/4 left-1/3 text-3xl text-yellow-500 opacity-25 font-mono">
          ►
        </div>

        {/* Enhanced scan lines effect */}
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

      <Footer />
    </div>
  );
}

export default FeedbackPage;
