import Navbar from "../Components/Navbar";
import LandingPage from "../Components/LandingPage";
import About from "../Components/About";
import Footer from "../Components/Footer";
import PCOnlyPopup from "../Components/PCOnlyPopup";

function MainPage() {
  return (
    <div className="bg-gradient-to-br from-yellow-50 via-white to-yellow-100 relative overflow-hidden">
      {/* Unified retro grid background */}
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

      {/* Unified floating retro elements */}
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

      {/* Unified scan lines effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="h-full w-full opacity-5"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, #fbbf24 3px, #fbbf24 6px)",
          }}
        ></div>
      </div>

      <div className="relative z-10">
        <PCOnlyPopup />
        <Navbar />
        <LandingPage />
        <About />
        <Footer />
      </div>
    </div>
  );
}

export default MainPage;
