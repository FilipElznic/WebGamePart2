import { useState, useEffect, useCallback, useRef } from "react";
import { useUserData } from "./UserDataProvider";
import Peter from "./Peter";

function JumpingGame() {
  const [playerPos, setPlayerPos] = useState({ x: 400, y: 2000 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isGrounded, setIsGrounded] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [cameraY, setCameraY] = useState(1700);
  const [xpAwarded, setXpAwarded] = useState(false);

  const [peterHide, setPeterHide] = useState(false);

  const { addXPForTask, userXP } = useUserData();

  const keysRef = useRef({});
  const playerPosRef = useRef({ x: 400, y: 2000 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const isGroundedRef = useRef(false);

  const GRAVITY = 0.8;
  const JUMP_FORCE = -15;
  const MOVE_SPEED = 10;
  const PLAYER_SIZE = 30;
  const VIEWPORT_HEIGHT = 600;
  const MAP_HEIGHT = 3600;

  const peterSlides = [
    {
      title: "Great job!",
      description:
        "You have successfully completed the Jumping Game! Now, we have the key needed for to the next stage, we need to find out what  secret it is hiding!",
    },
    {
      title: "The key ",
      description:
        "I have stored the key in my pocket and let's go continue our journey.",
    },
  ];

  const handleXP = async () => {
    console.log("Attempting to add XP");
    try {
      if (userXP === 200) {
        const result = await addXPForTask(100);
        console.log("XP added:", result);
      }
    } catch (error) {
      console.error("Failed to add XP:", error);
    }
  };

  useEffect(() => {
    if (gameFinished && !xpAwarded) {
      const awardXP = async () => {
        await handleXP();
        setXpAwarded(true);
      };
      awardXP();
    }
  }, [gameFinished, xpAwarded, handleXP]);

  const platforms = [
    { x: 0, y: 2080, width: 800, height: 15 },
    { x: 300, y: 2000, width: 200, height: 15 },
    { x: 100, y: 1920, width: 120, height: 15 },
    { x: 350, y: 1840, width: 140, height: 15 },
    { x: 250, y: 1740, width: 80, height: 15 },
    { x: 500, y: 1640, width: 90, height: 15 },
    { x: 350, y: 1540, width: 100, height: 15 },
    { x: 450, y: 1420, width: 70, height: 15 },
    { x: 300, y: 1320, width: 60, height: 15 },
    { x: 200, y: 1220, width: 80, height: 15 },
    { x: 100, y: 1100, width: 70, height: 15 },
    { x: 300, y: 1050, width: 80, height: 15 },
    { x: 500, y: 980, width: 80, height: 15 },
    { x: 300, y: 860, width: 60, height: 15 },
    { x: 400, y: 740, width: 70, height: 15 },
    { x: 250, y: 620, width: 50, height: 15 },
    { x: 450, y: 500, width: 60, height: 15 },
    { x: 250, y: 380, width: 50, height: 15 },
    { x: 350, y: 280, width: 40, height: 15 },
    { x: 300, y: 180, width: 60, height: 15 },
    { x: 200, y: 80, width: 50, height: 15 },
    { x: 400, y: 40, width: 200, height: 15 }, // This is now the final platform
  ];

  // **NEW:** Get a reference to the very last platform to use as the win condition.
  const finalPlatform = platforms[platforms.length - 1];

  // --- Core Game Logic (with modifications) ---

  useEffect(() => {
    const targetCameraY = Math.max(
      0,
      Math.min(MAP_HEIGHT - VIEWPORT_HEIGHT, playerPos.y - VIEWPORT_HEIGHT / 2)
    );
    setCameraY(targetCameraY);
  }, [playerPos.y]);

  const checkCollision = useCallback(
    (newX, newY) => {
      const playerRect = {
        x: newX,
        y: newY,
        width: PLAYER_SIZE,
        height: PLAYER_SIZE,
      };
      for (let platform of platforms) {
        if (
          playerRect.x < platform.x + platform.width &&
          playerRect.x + playerRect.width > platform.x &&
          playerRect.y < platform.y + platform.height &&
          playerRect.y + playerRect.height > platform.y
        ) {
          return platform;
        }
      }
      return null;
    },
    [platforms]
  ); // Added platforms to dependency array

  // **REMOVED:** The old checkFinish function is no longer needed.

  useEffect(() => {
    playerPosRef.current = playerPos;
  }, [playerPos]);
  useEffect(() => {
    velocityRef.current = velocity;
  }, [velocity]);
  useEffect(() => {
    isGroundedRef.current = isGrounded;
  }, [isGrounded]);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (gameFinished) return;
      const currentPos = playerPosRef.current;
      const currentVel = velocityRef.current;
      const currentGrounded = isGroundedRef.current;
      const keys = keysRef.current;
      let newVelX = currentVel.x * 0.8;
      let newVelY = currentVel.y + GRAVITY;
      if (keys["a"] || keys["A"] || keys["ArrowLeft"]) newVelX = -MOVE_SPEED;
      if (keys["d"] || keys["D"] || keys["ArrowRight"]) newVelX = MOVE_SPEED;
      if (
        (keys[" "] ||
          keys["Spacebar"] ||
          keys["w"] ||
          keys["W"] ||
          keys["ArrowUp"]) &&
        currentGrounded
      ) {
        newVelY = JUMP_FORCE;
        setIsGrounded(false);
        isGroundedRef.current = false;
      }
      let newX = currentPos.x + newVelX;
      let newY = currentPos.y + newVelY;
      newX = Math.max(0, Math.min(800 - PLAYER_SIZE, newX));
      const collision = checkCollision(newX, newY);
      let onGround = false;

      if (collision) {
        // Landing on a platform
        if (currentVel.y > 0 && currentPos.y + PLAYER_SIZE <= collision.y + 5) {
          newY = collision.y - PLAYER_SIZE;
          newVelY = 0;
          onGround = true;

          // Check for final platform
          if (
            collision.y === finalPlatform.y &&
            collision.x === finalPlatform.x
          ) {
            setGameFinished(true); // Only set game finished here
          }
        } else if (
          currentVel.y < 0 &&
          currentPos.y >= collision.y + collision.height - 5
        ) {
          newY = collision.y + collision.height;
          newVelY = 0;
        } else if (Math.abs(currentVel.x) > 0) {
          if (currentPos.x + PLAYER_SIZE <= collision.x)
            newX = collision.x - PLAYER_SIZE;
          else if (currentPos.x >= collision.x + collision.width)
            newX = collision.x + collision.width;
          newVelX = 0;
        }
      }

      // Reset if player falls
      if (newY > MAP_HEIGHT + 50) {
        setPlayerPos({ x: 400, y: 2000 });
        setVelocity({ x: 0, y: 0 });
        setIsGrounded(false);
        return;
      }

      // **REMOVED:** The old checkFinish() call is no longer here.

      setPlayerPos({ x: newX, y: newY });
      setVelocity({ x: newVelX, y: newVelY });
      setIsGrounded(onGround);
    }, 16);
    return () => clearInterval(gameLoop);
  }, [gameFinished, checkCollision, finalPlatform]); // Added finalPlatform to dependency array

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " " || e.key === "Spacebar" || e.key.startsWith("Arrow"))
        e.preventDefault();
      keysRef.current[e.key] = true;
    };
    const handleKeyUp = (e) => {
      keysRef.current[e.key] = false;
    };
    window.focus();
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const resetGame = () => {
    setPlayerPos({ x: 400, y: 2000 });
    setVelocity({ x: 0, y: 0 });
    setGameFinished(false);
    setIsGrounded(false);
    setXpAwarded(false); // Reset this too
    keysRef.current = {};
  };

  // **UPDATED:** Progress calculation now based on reaching the final platform's height
  const progress = Math.max(
    0,
    Math.min(100, ((2000 - playerPos.y) / (2000 - finalPlatform.y)) * 100)
  );

  return (
    <div className="flex flex-col items-center p-4 bg-yellow-900 min-h-screen font-mono z-30">
      {/* Retro CRT-style Title */}
      <div className="bg-yellow-400 p-2 border-4 border-yellow-600 mb-4">
        <h1 className="text-3xl font-bold text-black mb-2 text-center">
          ◆ TOWER QUEST ◆
        </h1>
        <div className="text-black text-center text-sm">
          █ REACH THE TOP PLATFORM █
        </div>
      </div>

      {/* Retro Controls Display */}
      <div className="mb-4 text-yellow-200 text-center bg-black/30 p-3 border-2 border-yellow-400">
        <p className="font-bold text-yellow-400">▶ CONTROLS:</p>
        <p>A/D (or Arrow Keys) to move • SPACEBAR/W/UP to jump</p>
        <p className="text-yellow-300">
          █ PROGRESS: {Math.round(progress)}% █ HEIGHT:{" "}
          {Math.max(0, Math.round(2000 - playerPos.y))}m
        </p>
      </div>

      {/* Retro Reset Button */}
      <button
        onClick={resetGame}
        className="mb-4 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 border-4 border-yellow-600 text-black font-bold font-mono text-sm transition-all duration-200 transform hover:scale-105 relative"
      >
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-yellow-800"></div>
        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-yellow-800"></div>
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-yellow-800"></div>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-yellow-800"></div>
        ◄ RESET GAME ►
      </button>

      {/* Game Canvas */}
      <div
        className="relative border-8 border-yellow-600 bg-black overflow-hidden focus:outline-none shadow-2xl"
        style={{
          width: "800px",
          height: "600px",
          boxShadow:
            "inset 0 0 20px rgba(251, 191, 36, 0.3), 0 0 30px rgba(251, 191, 36, 0.2)",
        }}
        tabIndex={0}
      >
        <div className="absolute inset-0 pointer-events-none opacity-10 z-10">
          <div
            className="h-full w-full"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, #fbbf24 2px, #fbbf24 4px)",
            }}
          ></div>
        </div>

        {/* Game world container */}
        <div
          className="absolute w-full"
          style={{
            height: `${MAP_HEIGHT}px`,
            transform: `translateY(-${cameraY}px)`,
            transition: "transform 0.1s ease-out",
            background:
              "linear-gradient(to bottom, #1a1a2e 0%, #16213e 30%, #0f3460 100%)",
          }}
        >
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-16 h-full">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="border-r border-yellow-400"></div>
              ))}
            </div>
            <div className="absolute inset-0 grid grid-rows-32">
              {Array.from({ length: 32 }).map((_, i) => (
                <div
                  key={i}
                  className="border-b border-yellow-400 w-full"
                ></div>
              ))}
            </div>
          </div>

          {platforms.map((platform, index) => (
            <div
              key={index}
              className="absolute border-2 shadow-lg"
              style={{
                left: `${platform.x}px`,
                top: `${platform.y}px`,
                width: `${platform.width}px`,
                height: `${platform.height}px`,
                backgroundColor: "#fbbf24",
                borderColor: "#d97706",
                boxShadow: "0 0 10px rgba(251, 191, 36, 0.3)",
              }}
            >
              <div className="absolute inset-0 opacity-30">
                <div
                  className="h-full w-full"
                  style={{
                    background:
                      "repeating-linear-gradient(90deg, transparent, transparent 8px, #d97706 8px, #d97706 10px)",
                  }}
                ></div>
              </div>
            </div>
          ))}

          {/* **REMOVED:** The old finish line div is gone. */}

          <div
            className="absolute border-2 border-yellow-400 flex items-center justify-center z-50"
            style={{
              left: `${playerPos.x}px`,
              top: `${playerPos.y}px`,
              width: `${PLAYER_SIZE}px`,
              height: `${PLAYER_SIZE}px`,
              backgroundColor: "#fbbf24",
              boxShadow:
                "0 0 15px rgba(251, 191, 36, 0.8), inset 0 0 5px rgba(255, 255, 255, 0.3)",
            }}
          >
            <div className="text-black text-lg font-bold z-30">●</div>
            <div className="absolute inset-0 bg-yellow-300 opacity-40 animate-pulse rounded"></div>
          </div>

          <div className="absolute top-200 left-100 text-2xl text-yellow-400 opacity-20 animate-pulse font-mono">
            ◆
          </div>
          <div className="absolute top-1000 left-200 text-2xl text-yellow-400 opacity-25 animate-pulse font-mono">
            ◇
          </div>
        </div>

        {/* Retro HUD */}
        <div className="absolute top-4 left-4 right-4 bg-black/70 border-2 border-yellow-400 rounded p-2 z-20">
          <div className="flex justify-between items-center text-yellow-400 text-sm font-mono">
            <span>█ PROGRESS █</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="bg-yellow-900 border border-yellow-600 rounded-full h-3 overflow-hidden mt-1">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-yellow-300 transition-all duration-300 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="absolute top-2 left-2 text-yellow-400 text-xs font-mono z-20">
          ◤
        </div>
        <div className="absolute top-2 right-2 text-yellow-400 text-xs font-mono z-20">
          ◥
        </div>
        <div className="absolute bottom-2 left-2 text-yellow-400 text-xs font-mono z-20">
          ◣
        </div>
        <div className="absolute bottom-2 right-2 text-yellow-400 text-xs font-mono z-20">
          ◢
        </div>
      </div>

      {/* Victory Message */}
      {gameFinished && (
        <>
          {!peterHide && (
            <div className="absolute bottom-0 left-0 w-full h-full z-50">
              <Peter
                slides={peterSlides}
                imageSrc="/peterHi.png"
                className="bg-white/20 absolute  w-full h-full z-50"
              />
              <button
                onClick={() => setPeterHide(true)}
                className="absolute top-1/4 right-1/6 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded shadow-lg z-50"
              >
                X
              </button>
            </div>
          )}
          <div className="mt-4 p-6 bg-yellow-400 border-4 border-yellow-600 text-black rounded font-bold text-center relative">
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 border-yellow-800"></div>
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 border-yellow-800"></div>
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 border-yellow-800"></div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 border-yellow-800"></div>
            <div className="text-2xl mb-2">🎉 █ TOWER CONQUERED █ 🎉</div>
            <div className="text-lg">You have reached the top!</div>
          </div>
        </>
      )}
    </div>
  );
}

export default JumpingGame;
