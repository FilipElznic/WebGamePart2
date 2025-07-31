function Footer() {
  return (
    <footer className="bg-white border-t-4 border-yellow-400 relative overflow-hidden">
      {/* Retro grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-20 h-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="border-r border-yellow-300 h-full"></div>
          ))}
        </div>
        <div className="absolute inset-0 grid grid-rows-10">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="border-b border-yellow-300 w-full"></div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Retro Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-bold font-mono text-gray-800 mb-4 relative">
              <span className="relative z-10 bg-yellow-100 px-3 py-2 border-2 border-yellow-400">
                &gt; PETER'S_QUEST_V1.0
              </span>
              <div className="absolute inset-0 bg-yellow-300 opacity-20 blur-lg"></div>
            </h3>
            <div className="bg-yellow-50 border-2 border-yellow-400 p-4 mb-6 font-mono text-sm">
              <p className="text-gray-800 mb-2">
                <span className="text-yellow-600 font-bold">&gt;</span> SYSTEM
                STATUS: ONLINE
              </p>
              <p className="text-gray-800 mb-2">
                <span className="text-yellow-600 font-bold">&gt;</span> HOSTING:
                VERCEL
              </p>
              <p className="text-gray-800">
                <span className="text-yellow-600 font-bold">&gt;</span> MODE:
                RETRO GAMING
              </p>
            </div>

            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/fprofilipka/"
                className="group relative text-gray-800 hover:text-yellow-600 transition-all duration-300 hover:scale-110"
                aria-label="Follow us on Twitter"
              >
                <div className="bg-yellow-100 border-2 border-yellow-400 p-3 group-hover:border-yellow-600 group-hover:bg-yellow-200 transition-colors duration-300">
                  <span className="font-mono text-lg font-bold">IG</span>
                </div>
                <div className="absolute -inset-1 bg-yellow-300 opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300"></div>
              </a>
              <a
                href="https://github.com/FilipElznic"
                className="group relative text-gray-800 hover:text-yellow-600 transition-all duration-300 hover:scale-110"
                aria-label="Follow us on GitHub"
              >
                <div className="bg-yellow-100 border-2 border-yellow-400 p-3 group-hover:border-yellow-600 group-hover:bg-yellow-200 transition-colors duration-300">
                  <span className="font-mono text-lg font-bold">GH</span>
                </div>
                <div className="absolute -inset-1 bg-yellow-300 opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300"></div>
              </a>
              <a
                href="https://www.linkedin.com/in/filip-elznic/"
                className="group relative text-gray-800 hover:text-yellow-600 transition-all duration-300 hover:scale-110"
              >
                <div className="bg-yellow-100 border-2 border-yellow-400 p-3 group-hover:border-yellow-600 group-hover:bg-yellow-200 transition-colors duration-300">
                  <span className="font-mono text-lg font-bold">LI</span>
                </div>
                <div className="absolute -inset-1 bg-yellow-300 opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300"></div>
              </a>
            </div>
          </div>

          {/* Retro Navigation Menu */}
          <div>
            <h4 className="text-lg font-bold font-mono text-gray-800 mb-4 uppercase tracking-wider bg-yellow-100 px-3 py-1 border-2 border-yellow-400 inline-block">
              [NAV_MENU]
            </h4>
            <div className="bg-yellow-50 border-2 border-yellow-400 p-3">
              <ul className="space-y-2 font-mono text-sm">
                <li>
                  <a
                    href="/home"
                    className="text-gray-700 hover:text-yellow-600 transition-colors duration-200 block hover:bg-yellow-100 px-2 py-1 rounded"
                  >
                    <span className="text-yellow-600 font-bold">&gt;</span>{" "}
                    HOME.EXE
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-gray-700 hover:text-yellow-600 transition-colors duration-200 block hover:bg-yellow-100 px-2 py-1 rounded"
                  >
                    <span className="text-yellow-600 font-bold">&gt;</span>{" "}
                    ABOUT.EXE
                  </a>
                </li>
                <li>
                  <a
                    href="/game"
                    className="text-gray-700 hover:text-yellow-600 transition-colors duration-200 block hover:bg-yellow-100 px-2 py-1 rounded"
                  >
                    <span className="text-yellow-600 font-bold">&gt;</span>{" "}
                    GAME.EXE
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-gray-700 hover:text-yellow-600 transition-colors duration-200 block hover:bg-yellow-100 px-2 py-1 rounded"
                  >
                    <span className="text-yellow-600 font-bold">&gt;</span>{" "}
                    CONTACT.EXE
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Retro System Info */}
          <div>
            <h4 className="text-lg font-bold font-mono text-gray-800 mb-4 uppercase tracking-wider bg-yellow-200 px-3 py-1 border-2 border-yellow-500 inline-block">
              [SYS_INFO]
            </h4>
            <div className="bg-yellow-50 border-2 border-yellow-500 p-3">
              <ul className="space-y-2 font-mono text-sm">
                <li>
                  <a
                    href="/help"
                    className="text-gray-700 hover:text-yellow-600 transition-colors duration-200 block hover:bg-yellow-100 px-2 py-1 rounded"
                  >
                    <span className="text-yellow-600 font-bold">&gt;</span>{" "}
                    HELP.DOC
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="text-gray-700 hover:text-yellow-600 transition-colors duration-200 block hover:bg-yellow-100 px-2 py-1 rounded"
                  >
                    <span className="text-yellow-600 font-bold">&gt;</span>{" "}
                    PRIVACY.TXT
                  </a>
                </li>

                <li>
                  <a
                    href="/feedback"
                    className="text-gray-700 hover:text-yellow-600 transition-colors duration-200 block hover:bg-yellow-100 px-2 py-1 rounded"
                  >
                    <span className="text-yellow-600 font-bold">&gt;</span>{" "}
                    FEEDBACK.LOG
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Retro Terminal Bottom Section */}
        <div className="mt-8 pt-8 border-t-2 border-yellow-400">
          <div className="bg-yellow-50 border-2 border-yellow-400 p-4 font-mono text-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <div className="text-gray-800">
                <p className="mb-1">
                  <span className="text-yellow-600 font-bold">
                    Filip Elznic
                  </span>
                  copyright {new Date().getFullYear()}
                </p>
                <p>
                  <span className="text-yellow-500 font-bold">[INFO]</span> All
                  rights reserved. Built for PC Gaming Excellence.
                </p>
              </div>
              <div className="text-right">
                <p className="text-yellow-600 text-xs font-bold">◆ GAME_ON ◆</p>
                <p className="text-gray-700 text-xs">
                  Made with <span className="text-red-500">♥</span> for
                  shipwrecked hackathon
                </p>
              </div>
            </div>
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

      {/* Animated corner brackets */}
      <div className="absolute top-4 left-4 text-yellow-400 font-mono text-2xl animate-pulse">
        ◤
      </div>
      <div className="absolute top-4 right-4 text-yellow-400 font-mono text-2xl animate-pulse">
        ◥
      </div>
      <div className="absolute bottom-4 left-4 text-yellow-400 font-mono text-2xl animate-pulse">
        ◣
      </div>
      <div className="absolute bottom-4 right-4 text-yellow-400 font-mono text-2xl animate-pulse">
        ◢
      </div>
    </footer>
  );
}

export default Footer;
