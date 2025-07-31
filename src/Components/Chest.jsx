import React, { useState } from "react";
import Peter from "./Peter";
import { useUserData } from "./UserDataProvider";

const waveKeyframes = `
  @keyframes wave {
    0%, 100% { transform: rotate(0deg); }
    50% { transform: rotate(-20deg); }
  }
`;

const pulseSlowKeyframes = `
  @keyframes pulseSlow {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`;

const peterSlides = [
  {
    title: "Great job!",
    description:
      "You did it! You found the key to opened the chest. You saved us from the computer deleting it self!",
  },
  {
    title: "Open the chest",
    description:
      "Now open the chest, to see what is inside. I would break it again. haahaha",
  },
];

const peterSlides2 = [
  {
    title: "(Chest opening sounds...)!",
    description: "Wow, what is that inside....?",
  },
  {
    title: "It's a note ",
    description:
      "Let me read it... out loud for you. It's says, congratulation!. Here is a code you will need to continue your journey: 8*2*92*. Use it wisely! (Writing the code on the paper...) (continue to next stage)",
  },
];

const waveSlowAnimation = "wave 1s infinite ease-in-out";
const pulseSlowAnimation = "pulseSlow 2.5s infinite ease-in-out";

const PixelChest = () => {
  const { addXPForTask, userXP } = useUserData();
  const [hovered, setHovered] = useState(false);
  const [stoneClicked, setStoneClicked] = useState(false);
  const [keyFound, setKeyFound] = useState(false);
  const [chestOpen, setChestOpen] = useState(false);
  const [peterHide, setPeterHide] = useState(true);
  const [peterHide2, setPeterHide2] = useState(true);

  const handleXP = async () => {
    try {
      if (userXP === 300) {
        const result = await addXPForTask(100); // Add 100 XP
        console.log("here");
        if (result.success) {
          console.log("XP added successfully:", result.newXP);
        } else {
          console.error("Failed to add XP:", result.error);
          if (result.error.includes("already has XP")) {
            console.log("Chest opened! (XP already earned)");
          } else {
            console.log("Chest opened! (XP update failed)");
          }
        }
      } else if (userXP == 400) {
        console.log("Game finished! (XP already earned)");
      }
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  // When user clicks the key
  const onKeyClick = () => {
    setKeyFound(true);
  };

  // When user clicks the chest lid (if key is found)
  const onChestLidClick = () => {
    if (keyFound && !chestOpen) {
      setChestOpen(true);
      handleXP();
    }
  };

  return (
    <div className="flex items-end justify-center h-[90vh] w-full bg-gradient-to-b from-sky-300 via-sky-200 to-yellow-100 relative overflow-hidden">
      {/* Sea with waves */}

      {keyFound && peterHide && (
        <div className="absolute bottom-0 left-0 w-full h-full z-50">
          <Peter
            slides={peterSlides}
            imageSrc="/peterHappy.png"
            className="bg-white/20 absolute  w-full h-full z-50"
          />
          <button
            onClick={() => setPeterHide(false)}
            className="absolute top-1/4 right-1/6 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded shadow-lg z-50"
          >
            X
          </button>
        </div>
      )}
      {/* Crab */}
      <Castle />
      <Crab />

      <div className="absolute bottom-1/3 w-full h-1/3 bg-blue-400">
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#fde68a"
            fillOpacity="1"
            d="M0,250 C180,270 360,230 540,250 C720,270 900,230 1080,250 C1260,270 1440,230 1440,230 L1440,320 L0,320 Z"
          />
        </svg>
      </div>

      {/* Beach with curved edge */}
      <div className="absolute bottom-0 w-full h-1/3 bg-yellow-200">
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#fde68a"
            fillOpacity="1"
            d="M0,224L60,213.3C120,203,240,181,360,165.3C480,149,600,139,720,154.7C840,171,960,213,1080,229.3C1200,245,1320,235,1380,229.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Palm Tree (right) with angled leaves */}
      <div className="absolute right-16 bottom-1/3 flex flex-col items-center z-10">
        {/* Trunk */}
        <div
          className="w-5 h-60 bg-yellow-800 shadow-md"
          style={{ transform: "rotate(2deg)" }}
        ></div>
        {/* Leaves */}
        <div className="relative -top-65 right-15">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-50 h-4 bg-green-700 absolute rounded-full"
              style={{
                transform: `rotate(${i * 30 - 60}deg)`,
                top: 0,
                left: "-40px",
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Chest */}
      <div
        className="relative z-20"
        style={{ imageRendering: "pixelated" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Tooltip */}
        {hovered && !keyFound && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow z-30">
            Locked
          </div>
        )}
        {hovered && keyFound && !chestOpen && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-white text-xs px-2 py-1 rounded shadow  z-30">
            Click lid to open!
          </div>
        )}

        {/* Chest Base */}
        <div className="w-40 h-24 bg-yellow-900 border-4 border-yellow-700 rounded-b-md relative z-10">
          {/* Wooden planks */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute left-0 w-full h-1 border-b border-yellow-700"
              style={{ top: `${(i + 1) * 6}px` }}
            ></div>
          ))}

          {/* Keyhole */}
          {!chestOpen && (
            <div className="absolute left-1/2 top-1/2 w-4 h-6 bg-black rounded-sm -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-start">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-1"></div>
              <div className="w-1 h-2 bg-yellow-400 mt-0.5"></div>
            </div>
          )}
        </div>

        {/* Chest Lid (clickable if key found) */}
        {!chestOpen ? (
          <div
            className={`absolute w-40 h-12 bg-yellow-800 border-4 border-yellow-700 rounded-t-md top-[-48px] left-0 z-20 ${
              keyFound ? "cursor-pointer hover:bg-yellow-700" : ""
            }`}
            onClick={keyFound ? onChestLidClick : undefined}
            title={keyFound ? "Click to open" : "Locked"}
            style={keyFound ? { transition: "background 0.2s" } : {}}
          ></div>
        ) : (
          <div className="absolute w-40 h-12 bg-yellow-800 border-4 border-yellow-700 rounded-t-md top-[-80px] left-0 z-20 rotate-[-45deg] transition-all duration-500"></div>
        )}

        {/* Treasure Reveal */}
        {chestOpen && (
          <>
            {peterHide2 && (
              <>
                <div className="absolute bottom-0 -left-[26vw] w-[60vw] h-[60vh] z-50">
                  {/* Retro container with CRT monitor styling */}
                  <div className="relative w-full h-full bg-black border-8 border-yellow-400 shadow-2xl">
                    {/* CRT monitor frame decorations */}
                    <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-yellow-300"></div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-yellow-300"></div>
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-yellow-300"></div>
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-yellow-300"></div>

                    {/* Retro monitor screen bezel */}
                    <div className="absolute inset-4 border-4 border-yellow-500 bg-gradient-to-br from-yellow-100 to-yellow-200">
                      {/* Screen scanlines overlay */}
                      <div
                        className="absolute inset-0 opacity-10 pointer-events-none "
                        style={{
                          background:
                            "repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)",
                        }}
                      ></div>

                      {/* Inner screen glow */}
                      <div className="absolute inset-2 bg-gradient-to-br from-zinc-800 via-zinc-400 to-zinc-800 border-2 border-yellow-300 shadow-inner">
                        <Peter
                          slides={peterSlides2}
                          imageSrc="/peterNote.png"
                          className="w-full h-full z-50"
                        />
                      </div>
                    </div>

                    {/* Retro-styled close button */}
                    <button
                      onClick={() => setPeterHide2(false)}
                      className="absolute -top-4 -right-4 bg-red-600 hover:bg-red-700 text-yellow-100 font-mono font-bold py-2 px-3 border-4 border-red-800 shadow-lg z-50 transition-all duration-200 transform hover:scale-110 group"
                    >
                      {/* Button corner decorations */}
                      <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-red-400"></div>
                      <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-red-400"></div>
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-red-400"></div>
                      <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-red-400"></div>
                      [X]
                    </button>

                    {/* Monitor stand/base */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-yellow-600 border-4 border-yellow-700 shadow-lg"></div>
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-48 h-4 bg-yellow-700 border-2 border-yellow-800 shadow-lg"></div>

                    {/* Retro monitor label */}
                    <div className="absolute -bottom-6 left-4 bg-black text-yellow-400 font-mono text-xs px-2 py-1 border border-yellow-500">
                      PETER_TERMINAL_v1.0
                    </div>

                    {/* Power LED indicator */}
                    <div className="absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full border border-green-600 shadow-inner"></div>
                  </div>

                  {/* Retro floating elements around the monitor */}
                  <div className="absolute -top-8 -left-4 text-2xl text-yellow-400 opacity-30 font-mono">
                    ◆
                  </div>
                  <div className="absolute -top-6 -right-8 text-xl text-yellow-500 opacity-40 font-mono">
                    ★
                  </div>
                  <div className="absolute -bottom-4 -left-6 text-xl text-yellow-400 opacity-35 font-mono">
                    ▲
                  </div>
                </div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-16 bg-yellow-200 border-2 border-yellow-500 rounded shadow-lg flex flex-col items-center justify-center z-30 animate-pulse">
                  <div className="text-2xl text-yellow-700 font-bold mb-1">
                    💎
                  </div>
                  <div className="text-sm text-yellow-800 font-mono">
                    Treasure Found!
                  </div>
                  <div className="text-xs text-yellow-600 mt-1">
                    Congratulations!
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Stone with hidden key */}
      <div className="absolute bottom-[15%] left-[25%] cursor-pointer z-30">
        {!stoneClicked ? (
          // Stone: gray rounded shape with some pixel shading
          <div
            onClick={() => setStoneClicked(true)}
            title="Click the stone"
            style={{ imageRendering: "pixelated" }}
            className="w-6 h-6 bg-gray-500 rounded-full border-2 border-gray-600 shadow-inner"
          ></div>
        ) : !keyFound ? (
          // Key appears after stone disappears
          <div
            onClick={onKeyClick}
            title="Click the key"
            style={{ imageRendering: "pixelated" }}
            className="w-8 h-12 bg-yellow-400 border-2 border-yellow-600 rounded-sm relative"
          >
            {/* Key bit */}
            <div className="absolute bottom-0 left-1/2 w-4 h-2 bg-yellow-600 -translate-x-1/2 rounded-sm"></div>
            {/* Key handle */}
            <div className="absolute top-1 left-1/2 w-6 h-6 border-2 border-yellow-600 rounded-full -translate-x-1/2"></div>
          </div>
        ) : null}
      </div>
      <div className="absolute bottom-[5%] left-[5%] cursor-pointer  z-10">
        <div
          style={{ imageRendering: "pixelated" }}
          className="w-5 h-5 bg-gray-500 rounded-full border-2 border-gray-600 shadow-inner"
        ></div>
      </div>
      <div className="absolute bottom-[20%] left-[55%] cursor-pointer  z-10">
        <div
          style={{ imageRendering: "pixelated" }}
          className="w-5 h-5 bg-gray-500 rounded-full border-2 border-gray-600 shadow-inner"
        ></div>
      </div>
      <div className="absolute bottom-[2%] right-[25%] cursor-pointer  z-10">
        <div
          style={{ imageRendering: "pixelated" }}
          className="w-5 h-5 bg-gray-500 rounded-full border-2 border-gray-600 shadow-inner"
        ></div>
      </div>
      <div className="absolute bottom-[10%] right-[5%] cursor-pointer  z-10">
        <div
          style={{ imageRendering: "pixelated" }}
          className="w-5 h-5 bg-gray-500 rounded-full border-2 border-gray-600 shadow-inner"
        ></div>
      </div>
      <div className="absolute bottom-[35%] left-[5%] cursor-pointer  z-10">
        <div
          style={{ imageRendering: "pixelated" }}
          className="w-5 h-5 bg-gray-500 rounded-full border-2 border-gray-600 shadow-inner"
        ></div>
      </div>
      <div className="absolute bottom-[1%] left-[0%] cursor-pointer z-10">
        <div
          style={{ imageRendering: "pixelated" }}
          className="w-5 h-5 bg-gray-500 rounded-full border-2 border-gray-600 shadow-inner"
        ></div>
      </div>

      <div className="absolute bottom-[10%] left-[25%] cursor-pointer z-10">
        <div
          style={{ imageRendering: "pixelated" }}
          className="w-5 h-5 bg-gray-500 rounded-full border-2 border-gray-600 shadow-inner"
        ></div>
      </div>

      <div className="absolute bottom-[20%] left-[50%] cursor-pointer z-10">
        <div
          style={{ imageRendering: "pixelated" }}
          className="w-5 h-5 bg-gray-500 rounded-full border-2 border-gray-600 shadow-inner"
        ></div>
      </div>

      <div className="absolute bottom-[30%] left-[75%] cursor-pointer z-10">
        <div
          style={{ imageRendering: "pixelated" }}
          className="w-5 h-5 bg-gray-500 rounded-full border-2 border-gray-600 shadow-inner"
        ></div>
      </div>

      <div className="absolute bottom-[40%] left-[100%] cursor-pointer z-10">
        <div
          style={{ imageRendering: "pixelated" }}
          className="w-5 h-5 bg-gray-500 rounded-full border-2 border-gray-600 shadow-inner"
        ></div>
      </div>

      <div className="absolute bottom-[5%] left-[90%] cursor-pointer z-10">
        <div
          style={{ imageRendering: "pixelated" }}
          className="w-5 h-5 bg-gray-500 rounded-full border-2 border-gray-600 shadow-inner"
        ></div>
      </div>

      <div className="absolute bottom-[15%] left-[10%] cursor-pointer z-10">
        <div
          style={{ imageRendering: "pixelated" }}
          className="w-5 h-5 bg-gray-500 rounded-full border-2 border-gray-600 shadow-inner"
        ></div>
      </div>

      <div className="absolute bottom-[25%] left-[60%] cursor-pointer z-10">
        <div
          style={{ imageRendering: "pixelated" }}
          className="w-5 h-5 bg-gray-500 rounded-full border-2 border-gray-600 shadow-inner"
        ></div>
      </div>

      <div className="absolute bottom-[35%] left-[5%] cursor-pointer z-10">
        <div
          style={{ imageRendering: "pixelated" }}
          className="w-5 h-5 bg-gray-500 rounded-full border-2 border-gray-600 shadow-inner"
        ></div>
      </div>

      <div className="absolute bottom-[5%] left-[40%] cursor-pointer z-10">
        <div
          style={{ imageRendering: "pixelated" }}
          className="w-5 h-5 bg-gray-500 rounded-full border-2 border-gray-600 shadow-inner"
        ></div>
      </div>
    </div>
  );
};

export default PixelChest;

function Crab() {
  return (
    <>
      {/* Inject keyframes */}
      <style>{waveKeyframes}</style>

      {/* Crab container */}
      <div className="absolute bottom-1/5 left-1/6 z-20 flex flex-col items-center">
        {/* Body */}
        <div className="w-6 h-4 bg-red-600 rounded-full relative">
          {/* Eyes */}
          <div className="absolute -top-2 left-1 w-1 h-1 bg-black rounded-full"></div>
          <div className="absolute -top-2 right-1 w-1 h-1 bg-black rounded-full"></div>
        </div>
        {/* Claws */}
        <div className="flex justify-between w-10 mt-1">
          <div
            className="w-2 h-2 bg-red-600 rounded-full origin-bottom-left"
            style={{ animation: waveSlowAnimation }}
          ></div>
          <div
            className="w-2 h-2 bg-red-600 rounded-full origin-bottom-right"
            style={{ animation: waveSlowAnimation }}
          ></div>
        </div>
      </div>
    </>
  );
}

// Simple placeholder for Castle component
function Castle() {
  return (
    <>
      <style>{pulseSlowKeyframes}</style>
      <div className="absolute bottom-1/4 right-1/4 z-20 flex flex-col items-center animate-pulse-slow">
        {/* Base */}
        <div
          className="w-12 h-8 bg-yellow-300 border border-yellow-500 relative"
          style={{ animation: pulseSlowAnimation }}
        >
          {/* Door */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-500 rounded-t-md"></div>
        </div>
        {/* Towers */}
        <div
          className="flex gap-1 mt-1"
          style={{ animation: pulseSlowAnimation }}
        >
          <div className="w-3 h-4 bg-yellow-300 border border-yellow-500 rounded-t-md"></div>
          <div className="w-3 h-5 bg-yellow-300 border border-yellow-500 rounded-t-md"></div>
          <div className="w-3 h-4 bg-yellow-300 border border-yellow-500 rounded-t-md"></div>
        </div>
      </div>
    </>
  );
}
