import { useState, useEffect } from "react";

function PCOnlyPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the device is mobile
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = [
        "mobile",
        "android",
        "iphone",
        "ipad",
        "ipod",
        "blackberry",
      ];
      const isMobileDevice = mobileKeywords.some((keyword) =>
        userAgent.includes(keyword)
      );

      // Also check screen width as an additional indicator
      const isSmallScreen = window.innerWidth < 768;

      return isMobileDevice && isSmallScreen;
    };

    const deviceIsMobile = checkDevice();
    setIsMobile(deviceIsMobile);

    // Show popup if on mobile/tablet or small screen
    if (deviceIsMobile) {
      setShowPopup(true);
    }

    // Listen for window resize to detect orientation changes
    const handleResize = () => {
      const deviceIsMobile = checkDevice();
      setIsMobile(deviceIsMobile);
      if (deviceIsMobile && !showPopup) {
        setShowPopup(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showPopup]);

  const closePopup = () => {
    setShowPopup(false);
  };

  if (!showPopup || !isMobile) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-black via-zinc-900 to-purple-950 backdrop-blur-sm border-4 border-purple-900 shadow-2xl relative max-w-2xl w-full mx-4 p-8 text-zinc-200">
        {/* Retro border decorations - dark theme */}
        <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-purple-900"></div>
        <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-purple-900"></div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-purple-900"></div>
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-purple-900"></div>

        {/* Close button - retro style */}
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 bg-purple-900 hover:bg-purple-800 text-zinc-200 font-mono text-lg px-3 py-1 border-2 border-purple-950 transition-colors duration-200"
          aria-label="Close popup"
        >
          ✕
        </button>

        {/* PC Icon - retro style */}
        <div className="text-center mb-6">
          <div className="mx-auto w-20 h-20 bg-purple-950 border-4 border-purple-900 flex items-center justify-center mb-4">
            <div className="font-mono text-3xl text-purple-400">🖥️</div>
          </div>
        </div>

        {/* Title - retro style */}
        <h2 className="text-4xl font-mono font-bold text-purple-300 text-center mb-6 relative">
          <span className="bg-zinc-900 px-4 py-2 border-2 border-purple-900 inline-block">
            [PC REQUIRED]
          </span>
        </h2>

        {/* Message - retro info box style */}
        <div className="bg-zinc-900 border-2 border-purple-900 p-6 mb-8 relative">
          <div className="absolute top-2 left-2 w-3 h-3 bg-purple-900 rotate-45"></div>
          <div className="absolute top-2 right-2 w-3 h-3 bg-purple-900 rotate-45"></div>

          <div className="font-mono text-zinc-200 space-y-4">
            <p className="text-lg">
              <span className="text-purple-400 font-bold">
                &gt; SYSTEM ALERT:
              </span>
              <br />
              This retro gaming experience requires:
            </p>

            <div className="bg-purple-950 border-2 border-purple-900 p-4 space-y-2">
              <div className="flex items-center">
                <span className="text-purple-400 mr-3 font-bold">✓</span>
                <span>Desktop or laptop computer</span>
              </div>
              <div className="flex items-center">
                <span className="text-purple-400 mr-3 font-bold">✓</span>
                <span>Keyboard and mouse controls</span>
              </div>
              <div className="flex items-center">
                <span className="text-purple-400 mr-3 font-bold">✓</span>
                <span>Larger screen for optimal gameplay</span>
              </div>
              <div className="flex items-center">
                <span className="text-purple-400 mr-3 font-bold">✓</span>
                <span>True retro gaming experience</span>
              </div>
            </div>

            <p className="text-sm text-gray-600">
              <span className="text-purple-700 font-bold">&gt; NOTE:</span>
              For the authentic Peter's Quest experience, please access from a
              PC.
            </p>
          </div>
        </div>

        {/* Buttons - retro style */}
        <div className="flex flex-col lg:flex-row gap-4 justify-center">
          <button
            onClick={closePopup}
            className="group relative font-mono text-gray-700 hover:text-gray-900 px-6 py-3 text-lg font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105"
          >
            <span className="relative z-10 bg-blue-100 hover:bg-blue-200 px-4 py-2 border-2 border-blue-400 transition-colors duration-200">
              [PLAY ON PC LATER]
            </span>
            <div className="absolute inset-0 bg-blue-200 opacity-0 group-hover:opacity-20 transition-all duration-200"></div>
          </button>

          <button
            onClick={closePopup}
            className="group relative font-mono text-gray-700 hover:text-gray-900 px-6 py-3 text-lg font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105"
          >
            <span className="relative z-10 bg-red-100 hover:bg-red-200 px-4 py-2 border-2 border-red-400 transition-colors duration-200">
              [CONTINUE ANYWAY]
            </span>
            <div className="absolute inset-0 bg-red-200 opacity-0 group-hover:opacity-20 transition-all duration-200"></div>
          </button>
        </div>

        {/* Bottom retro accent */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-purple-400"></div>
      </div>
    </div>
  );
}

export default PCOnlyPopup;
