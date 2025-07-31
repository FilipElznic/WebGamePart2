function Shipwrecked() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 flex flex-col relative font-mono">
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white/95 p-6 sm:p-4 xs:p-2  shadow-lg border-4 border-yellow-400 max-w-3xl w-full h-full text-center z-30 mx-2 relative retro-shadow">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 border-2 border-yellow-700 px-4 py-1 text-3xl rounded-t-lg shadow-md text-black  font-bold tracking-widest retro-title">
            [SHIPWRECKED]
          </div>
          <div className="mt-8">
            <p className="text-base sm:text-sm xs:text-xs text-yellow-800 mb-2 tracking-wide">
              <span className="bg-yellow-100 border-2 border-yellow-400 px-2 py-1 rounded inline-block mb-2 retro-label text-3xl">
                Boston Private Island Hackathon
              </span>
            </p>
            <p className="text-2xl sm:text-base xs:text-sm text-gray-800 mb-2 retro-desc">
              Welcome to{" "}
              <span className="font-bold text-yellow-600">Shipwrecked</span>,
              the legendary hackathon adventure!
            </p>
            <p className="text-lg text-gray-700 mb-4 retro-desc">
              This unique event takes place on a private island,this is the
              first ever hackathon on a private island, where
            </p>
            <div align="center">
              <a
                href="https://shipwrecked.hackclub.com/?t=ghrm"
                target="_blank"
              >
                <img
                  src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/739361f1d440b17fc9e2f74e49fc185d86cbec14_badge.png"
                  alt="This project is part of Shipwrecked, the world's first hackathon on an island!"
                />
              </a>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={() => {
                  window.location.href = "/game";
                }}
                className="bg-yellow-400 border-2 border-yellow-700 text-black font-bold px-6 py-2 rounded shadow-lg hover:bg-yellow-300 transition-all retro-btn"
              >
                START GAME
              </button>
            </div>
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-yellow-500"></div>
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-yellow-500"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-yellow-500"></div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-yellow-500"></div>
        </div>
        <div className="absolute top-10 left-10 text-6xl text-yellow-400 opacity-20 animate-pulse font-mono">
          ◆
        </div>
        <div className="absolute top-20 right-20 text-4xl text-yellow-500 opacity-30 animate-bounce font-mono">
          ★
        </div>
        <div className="absolute top-[60vh] left-20 text-5xl text-yellow-400 opacity-25 animate-pulse font-mono">
          ◇
        </div>
        <div className="absolute top-[80vh] right-16 text-4xl text-yellow-500 opacity-20 animate-bounce font-mono">
          ♦
        </div>
        <div className="absolute top-[120vh] left-10 text-4xl text-yellow-400 opacity-20 animate-bounce font-mono">
          ▲
        </div>
        <div className="absolute top-[140vh] right-20 text-3xl text-yellow-500 opacity-30 animate-pulse font-mono">
          ●
        </div>
        <div className="absolute top-[160vh] left-16 text-5xl text-yellow-400 opacity-25 animate-pulse font-mono">
          ■
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
    </div>
  );
}

export default Shipwrecked;
