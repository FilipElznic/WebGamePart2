import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import React from "react";

function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen relative py-16" id="about">
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Main About Section */}
          <div className="bg-white/90 backdrop-blur-sm p-8 border-4 border-yellow-400 shadow-2xl mb-8">
            {/* Retro border decorations */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-yellow-500"></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-yellow-500"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-yellow-500"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-yellow-500"></div>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="bg-yellow-400 px-4 py-2 border-2 border-gray-800 font-mono text-gray-800 text-sm font-bold uppercase tracking-wider inline-block mb-4">
                Contact SECTION
              </div>
              <h2 className="text-5xl font-mono font-bold text-gray-800 relative">
                <span className="relative z-10">
                  <span className="text-yellow-600 bg-yellow-100 px-4 py-2 border-2 border-yellow-400 inline-block transform rotate-1 shadow-lg">
                    &gt; CONTACT_ME.EXE
                  </span>
                </span>
                <div className="absolute inset-0 bg-yellow-200 opacity-20 blur-sm"></div>
              </h2>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Team Info */}
              <div className="bg-yellow-50 border-2 border-yellow-400 p-6 relative">
                <div className="absolute top-2 left-2 w-3 h-3 bg-yellow-400 rotate-45"></div>
                <div className="absolute top-2 right-2 w-3 h-3 bg-yellow-400 rotate-45"></div>

                <h3 className="text-xl font-mono font-bold text-gray-800 mb-4 bg-yellow-200 px-3 py-1 border border-yellow-500 inline-block">
                  [CONTACT_DATA]
                </h3>

                <div className="font-mono text-gray-800 space-y-3">
                  <p className="leading-relaxed">
                    <span className="text-yellow-600 font-bold">&gt;</span> The
                    best way to reach me is via feedback form on this page, that
                    can be found below in footer or in Navbar section.
                  </p>

                  {/* Team stats */}
                  <div className="bg-white border border-yellow-300 p-3 mt-4">
                    <p className="text-sm mb-1">
                      <span className="text-yellow-600">&gt;</span> FEEDBACK
                      FORM: ACTIVE
                    </p>
                    <p className="text-sm mb-1">
                      <span className="text-yellow-600">&gt;</span> SOCIALS: 3
                    </p>
                    <p className="text-sm">
                      <span className="text-yellow-600">&gt;</span> STATUS:
                      UNKNOWN
                    </p>
                  </div>
                </div>
              </div>

              {/* Mission Info */}
              <div className="bg-yellow-50 border-2 border-yellow-400 p-6 relative">
                <div className="absolute top-2 left-2 w-3 h-3 bg-yellow-400 rotate-45"></div>
                <div className="absolute top-2 right-2 w-3 h-3 bg-yellow-400 rotate-45"></div>

                <h3 className="text-xl font-mono font-bold text-gray-800 mb-4 bg-yellow-200 px-3 py-1 border border-yellow-500 inline-block">
                  [SOCIALS]
                </h3>

                <div className="font-mono text-gray-800 space-y-3">
                  <p className="leading-relaxed">
                    <span className="text-yellow-600 font-bold">&gt;</span> If
                    you still wanna reach me, by a different way. You can use my
                    socials, which are also found in the footer at the bottom of
                    most of the pages
                  </p>

                  {/* Mission objectives */}
                  <div className="bg-white border border-yellow-300 p-3 mt-4">
                    <p className="text-sm mb-1">
                      <span className="text-green-600">✓</span> LinkedIn
                    </p>
                    <p className="text-sm mb-1">
                      <span className="text-green-600">✓</span> Instagram
                    </p>
                    <p className="text-sm mb-1">
                      <span className="text-green-600">✓</span> Github
                    </p>
                    <p className="text-sm">
                      <span className="text-yellow-600">⧗</span> Twitter
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="bg-yellow-400 hover:bg-yellow-500 border-4 border-gray-800 px-8 py-4 font-mono font-bold text-gray-800 text-lg uppercase tracking-wider transition-all duration-200 hover:scale-105 cursor-pointer relative overflow-hidden inline-block">
                <span
                  onClick={() => (window.location.href = "/")}
                  className="relative z-10"
                >
                  [ RETURN TO HOME ]
                </span>
                <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-200"></div>
              </div>
            </div>

            {/* Header decoration */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 px-3 py-1 border-2 border-gray-800 font-mono text-sm font-bold text-gray-800">
              INFO_PANEL
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactPage;

/*

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
*/
