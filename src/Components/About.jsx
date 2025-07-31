function About() {
  return (
    <div className="min-h-screen relative py-16 " id="about">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main About Section */}
        <div className="bg-gradient-to-br from-black via-zinc-900 to-purple-950 backdrop-blur-sm p-8 border-4 border-purple-900 shadow-2xl mb-8 text-zinc-200">
          {/* Retro border decorations */}
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-purple-900"></div>
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-purple-900"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-purple-900"></div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-purple-900"></div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-purple-900 px-4 py-2 border-2 border-purple-950 font-mono text-purple-300 text-sm font-bold uppercase tracking-wider inline-block mb-4">
              ABOUT SECTION
            </div>
            <h2 className="text-5xl font-mono font-bold text-purple-300 relative">
              <span className="relative z-10">
                <span className="text-purple-400 bg-zinc-900 px-4 py-2 border-2 border-purple-900 inline-block transform rotate-1 shadow-lg">
                  &gt; ABOUT_US.EXE
                </span>
              </span>
              <div className="absolute inset-0 bg-purple-950 opacity-20 blur-sm"></div>
            </h2>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Team Info */}
            <div className="bg-zinc-900 border-2 border-purple-900 p-6 relative">
              <div className="absolute top-2 left-2 w-3 h-3 bg-purple-900 rotate-45"></div>
              <div className="absolute top-2 right-2 w-3 h-3 bg-purple-900 rotate-45"></div>

              <h3 className="text-xl font-mono font-bold text-purple-300 mb-4 bg-purple-950 px-3 py-1 border border-purple-900 inline-block">
                [TEAM_DATA]
              </h3>

              <div className="font-mono text-zinc-200 space-y-3">
                <p className="leading-relaxed">
                  <span className="text-purple-400 font-bold">&gt;</span> I am a
                  solo full-stack developer with a passion for creating engaging
                  web experiences. My goal is to bring retro gaming vibes to
                  modern web technologies.
                </p>

                {/* Team stats */}
                <div className="bg-purple-950 border border-purple-900 p-3 mt-4">
                  <p className="text-sm mb-1">
                    <span className="text-purple-400">&gt;</span> DEVELOPERS:
                    ACTIVE
                  </p>
                  <p className="text-sm mb-1">
                    <span className="text-purple-400">&gt;</span> GAMES_CREATED:
                    1
                  </p>
                  <p className="text-sm">
                    <span className="text-purple-400">&gt;</span> STATUS:
                    FINISHED
                  </p>
                </div>
              </div>
            </div>

            {/* Mission Info */}
            <div className="bg-zinc-900 border-2 border-purple-900 p-6 relative">
              <div className="absolute top-2 left-2 w-3 h-3 bg-purple-900 rotate-45"></div>
              <div className="absolute top-2 right-2 w-3 h-3 bg-purple-900 rotate-45"></div>

              <h3 className="text-xl font-mono font-bold text-purple-300 mb-4 bg-purple-950 px-3 py-1 border border-purple-900 inline-block">
                [MISSION_LOG]
              </h3>

              <div className="font-mono text-zinc-200 space-y-3">
                <p className="leading-relaxed">
                  <span className="text-purple-400 font-bold">&gt;</span> My
                  mission is to create a unique gaming experience that combines
                  retro aesthetics with modern gameplay mechanics.
                </p>

                {/* Mission objectives */}
                <div className="bg-purple-950 border border-purple-900 p-3 mt-4">
                  <p className="text-sm mb-1">
                    <span className="text-purple-400">✓</span> Make it fun to
                    play
                  </p>
                  <p className="text-sm mb-1">
                    <span className="text-purple-400">✓</span> Retro aesthetic
                    design
                  </p>
                  <p className="text-sm mb-1">
                    <span className="text-purple-400">✓</span> Cross-platform
                    compatibility
                  </p>
                  <p className="text-sm">
                    <span className="text-purple-400">⧗</span> Continuous
                    updates
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Technologies Section */}
          <div className="mt-8 bg-zinc-900 border-2 border-purple-900 p-6">
            <h3 className="text-xl font-mono font-bold text-purple-300 mb-4 bg-purple-950 px-3 py-1 border border-purple-900 inline-block">
              [TECH_STACK]
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-sm">
              <div className="bg-purple-950 border border-purple-900 p-3 text-center hover:bg-purple-900 transition-colors duration-200">
                <div className="text-purple-400 font-bold mb-1">REACT.JS</div>
                <div className="text-zinc-400">Frontend</div>
              </div>
              <div className="bg-purple-950 border border-purple-900 p-3 text-center hover:bg-purple-900 transition-colors duration-200">
                <div className="text-purple-400 font-bold mb-1">VITE</div>
                <div className="text-zinc-400">Build Tool</div>
              </div>
              <div className="bg-purple-950 border border-purple-900 p-3 text-center hover:bg-purple-900 transition-colors duration-200">
                <div className="text-purple-400 font-bold mb-1">TAILWIND</div>
                <div className="text-zinc-400">Styling</div>
              </div>
              <div className="bg-purple-950 border border-purple-900 p-3 text-center hover:bg-purple-900 transition-colors duration-200">
                <div className="text-purple-400 font-bold mb-1">JAVASCRIPT</div>
                <div className="text-zinc-400">Language</div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="bg-purple-900 hover:bg-purple-800 border-4 border-purple-950 px-8 py-4 font-mono font-bold text-purple-300 text-lg uppercase tracking-wider transition-all duration-200 hover:scale-105 cursor-pointer relative overflow-hidden inline-block">
              <span
                onClick={() => (window.location.href = "/game")}
                className="relative z-10"
              >
                [ JOIN THE ADVENTURE ]
              </span>
              <div className="absolute inset-0 bg-purple-950 opacity-0 hover:opacity-20 transition-opacity duration-200"></div>
            </div>
          </div>

          {/* Header decoration */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-900 px-3 py-1 border-2 border-purple-950 font-mono text-sm font-bold text-purple-300">
            INFO_PANEL
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
