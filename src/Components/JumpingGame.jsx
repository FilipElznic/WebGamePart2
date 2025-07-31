import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useUserData } from "./UserDataProvider";
import Peter from "./Peter.jsx";

function SpaceJumpingGame() {
  //lets do xp
  const [playerPos, setPlayerPos] = useState({ x: 10, y: 400 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isGrounded, setIsGrounded] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [cameraX, setCameraX] = useState(0);
  const [wrenchCollected, setWrenchCollected] = useState(false);
  const { addXPForTask, userXP } = useUserData();
  const [hidePeter, setHidePeter] = useState(false);

  const keysRef = useRef({});
  const playerPosRef = useRef({ x: 50, y: 400 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const isGroundedRef = useRef(false);

  const GRAVITY = 0.8;
  const JUMP_FORCE = -15;
  const MOVE_SPEED = 8;
  const PLAYER_SIZE = 40;
  const VIEWPORT_WIDTH = 800;
  const VIEWPORT_HEIGHT = 600;
  const MAP_WIDTH = 5000;

  const handleXP = async () => {
    try {
      if (userXP === 200) {
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
      } else if (userXP == 300) {
        console.log("Game finished! (XP already earned)");
      }
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  // Spaceship debris platforms - more challenging vertical navigation required
  const platforms = useMemo(
    () => [
      // Starting area - low platforms
      { x: 0, y: 650, width: 150, height: 20, type: "hull" },
      { x: 200, y: 580, width: 120, height: 20, type: "wing" },

      // First challenge - must go up to continue
      { x: 350, y: 420, width: 100, height: 20, type: "engine" },
      { x: 500, y: 550, width: 90, height: 20, type: "hull" },
      { x: 650, y: 210, width: 110, height: 20, type: "cockpit" },

      // Down and up pattern - forces vertical navigation
      { x: 700, y: 350, width: 80, height: 20, type: "wing" },
      { x: 1000, y: 200, width: 70, height: 20, type: "engine" },
      { x: 1000, y: 200, width: 5, height: 400, type: "wall" },
      { x: 1100, y: 650, width: 90, height: 20, type: "hull" },

      // Major vertical challenge - high platforms
      { x: 1280, y: 650, width: 145, height: 20, type: "cockpit" },
      { x: 1280, y: 550, width: 85, height: 20, type: "cockpit" },
      { x: 1280, y: 150, width: 85, height: 20, type: "cockpit" },
      { x: 1280, y: 450, width: 85, height: 20, type: "cockpit" },
      { x: 1280, y: 350, width: 85, height: 20, type: "cockpit" },
      { x: 1280, y: 250, width: 85, height: 20, type: "cockpit" },
      { x: 1280, y: 100, width: 5, height: 470, type: "wall" },
      { x: 1450, y: 50, width: 75, height: 20, type: "wing" },

      // Back down but still elevated
      { x: 1550, y: 180, width: 80, height: 20, type: "engine" },
      { x: 1750, y: 300, width: 70, height: 20, type: "hull" },

      // Another climb sequence
      { x: 2200, y: 0, width: 10, height: 500, type: "wall" },
      { x: 2050, y: 650, width: 85, height: 20, type: "wing" },
      { x: 2200, y: 650, width: 100, height: 20, type: "engine" },

      // Final challenging descent and climb
      { x: 2600, y: 100, width: 200, height: 20, type: "hull" },
      { x: 2350, y: 220, width: 90, height: 20, type: "hull" },
      { x: 2350, y: 520, width: 90, height: 20, type: "hull" },
      { x: 2250, y: 420, width: 90, height: 20, type: "hull" },
      { x: 2500, y: 320, width: 120, height: 20, type: "cockpit" },
      { x: 2800, y: 320, width: 120, height: 20, type: "cockpit" },
      { x: 2700, y: 100, width: 5, height: 600, type: "wall" },
      { x: 2700, y: 670, width: 120, height: 20, type: "cockpit" },
      { x: 2900, y: 570, width: 120, height: 20, type: "cockpit" },
      { x: 2900, y: 370, width: 120, height: 20, type: "cockpit" },
      { x: 3000, y: 470, width: 120, height: 20, type: "cockpit" },
      { x: 3000, y: 270, width: 120, height: 20, type: "cockpit" },
      { x: 2920, y: 170, width: 120, height: 20, type: "cockpit" },
      { x: 2920, y: 0, width: 5, height: 400, type: "wall" },
      { x: 3200, y: 100, width: 5, height: 450, type: "wall" },
      { x: 3200, y: 570, width: 50, height: 20, type: "cockpit" },
      { x: 3500, y: 570, width: 50, height: 20, type: "cockpit" },
      { x: 3800, y: 570, width: 50, height: 20, type: "cockpit" },
      { x: 4100, y: 570, width: 50, height: 20, type: "cockpit" },
      { x: 4400, y: 570, width: 50, height: 20, type: "cockpit" },
      { x: 4600, y: 470, width: 50, height: 20, type: "cockpit" },
      { x: 4600, y: 270, width: 50, height: 20, type: "cockpit" },
      { x: 4800, y: 370, width: 50, height: 20, type: "cockpit" },
      { x: 4800, y: 170, width: 50, height: 20, type: "cockpit" },
      { x: 4900, y: 150, width: 100, height: 20, type: "cockpit" },

      // Final platform with wrench - elevated
    ],
    []
  );

  // Wrench position (on the final platform)
  const wrenchPos = { x: 4950, y: 100, width: 40, height: 40 };

  // Platform colors based on debris type
  const getPlatformColor = (type) => {
    switch (type) {
      case "hull":
        return { bg: "#4a5568", border: "#2d3748" };
      case "wing":
        return { bg: "#2b6cb0", border: "#2c5282" };
      case "engine":
        return { bg: "#e53e3e", border: "#c53030" };
      case "cockpit":
        return { bg: "#38a169", border: "#2f855a" };
      case "command":
        return { bg: "#d69e2e", border: "#b7791f" };
      case "wall":
        return { bg: "#ffffff", border: "#ffffff" };
      default:
        return { bg: "#4a5568", border: "#2d3748" };
    }
  };

  // Render debris based on type
  const renderDebrisContent = (type, width, height) => {
    switch (type) {
      case "hull":
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Hull plating with rivets */}
            <div className="w-full h-full relative">
              {/* Rivets */}
              {Array.from({ length: Math.floor(width / 20) }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-gray-400 rounded-full border border-gray-600"
                  style={{
                    left: `${10 + i * 20}px`,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
              ))}
              {/* Damage marks */}
              <div className="absolute inset-0 opacity-60">
                <div className="w-1/3 h-1 bg-gray-800 absolute top-1/4 left-1/4 transform rotate-12" />
                <div className="w-1/4 h-0.5 bg-gray-800 absolute bottom-1/3 right-1/4 transform -rotate-6" />
              </div>
            </div>
          </div>
        );

      case "wing":
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Wing shape with aerodynamic lines */}
            <div className="w-full h-full relative overflow-hidden">
              {/* Wing structure lines */}
              <div className="absolute inset-0">
                <div className="w-full h-0.5 bg-blue-300 absolute top-1/4 opacity-70" />
                <div className="w-3/4 h-0.5 bg-blue-300 absolute bottom-1/4 left-1/8 opacity-70" />
                <div className="w-1/2 h-0.5 bg-blue-300 absolute top-1/2 left-1/4 opacity-70" />
              </div>
              {/* Wing tip damage */}
              <div className="absolute right-0 top-0 w-2 h-full bg-gray-800 opacity-50 transform skew-x-12" />
            </div>
          </div>
        );

      case "engine":
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Engine with exhaust ports and damage */}
            <div className="w-full h-full relative">
              {/* Exhaust ports */}
              {Array.from({ length: Math.floor(width / 25) }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 bg-red-800 rounded-full border border-red-600"
                  style={{
                    left: `${5 + i * 25}px`,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
              ))}
              {/* Engine damage/sparks */}
              <div className="absolute inset-0 opacity-80">
                <div className="w-1 h-1 bg-yellow-400 absolute top-1/3 left-1/3 rounded-full animate-pulse" />
                <div className="w-0.5 h-0.5 bg-orange-400 absolute bottom-1/3 right-1/4 rounded-full animate-pulse" />
                <div className="w-2 h-0.5 bg-red-800 absolute top-1/2 left-1/2 transform rotate-45" />
              </div>
            </div>
          </div>
        );

      case "cockpit":
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Cockpit with windows and control panels */}
            <div className="w-full h-full relative">
              {/* Windows/viewports */}
              {width > 60 && (
                <>
                  <div className="absolute w-4 h-3 bg-cyan-200 border border-green-600 left-1/4 top-1/2 transform -translate-y-1/2 opacity-70" />
                  <div className="absolute w-4 h-3 bg-cyan-200 border border-green-600 right-1/4 top-1/2 transform -translate-y-1/2 opacity-70" />
                </>
              )}
              {width <= 60 && (
                <div className="absolute w-3 h-2 bg-cyan-200 border border-green-600 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-70" />
              )}
              {/* Control panel indicators */}
              <div className="absolute inset-0 opacity-60">
                <div className="w-1 h-1 bg-green-400 absolute top-1/4 left-1/6 rounded-full" />
                <div className="w-1 h-1 bg-red-400 absolute top-1/4 right-1/6 rounded-full" />
                <div className="w-0.5 h-0.5 bg-blue-400 absolute bottom-1/4 left-1/3 rounded-full" />
              </div>
            </div>
          </div>
        );

      case "wall":
        return (
          <div className="absolute inset-0">
            {/* Keep walls as simple white blocks */}
            <div className="w-full h-full bg-white" />
          </div>
        );

      default:
        return null;
    }
  };

  // Camera follows player horizontally
  useEffect(() => {
    const targetCameraX = Math.max(
      0,
      Math.min(MAP_WIDTH - VIEWPORT_WIDTH, playerPos.x - VIEWPORT_WIDTH / 2)
    );
    setCameraX(targetCameraX);
  }, [playerPos.x]);

  // Improved collision detection - checks for overlapping rectangles
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
  );

  // Separate X and Y collision checking for more precise collision resolution
  const checkXCollision = useCallback(
    (newX, currentY) => {
      return checkCollision(newX, currentY);
    },
    [checkCollision]
  );

  const checkYCollision = useCallback(
    (currentX, newY) => {
      return checkCollision(currentX, newY);
    },
    [checkCollision]
  );

  // Check if player collected the wrench
  const checkWrenchCollection = useCallback(
    (playerX, playerY) => {
      if (!wrenchCollected) {
        const playerRect = {
          x: playerX,
          y: playerY,
          width: PLAYER_SIZE,
          height: PLAYER_SIZE,
        };

        if (
          playerRect.x < wrenchPos.x + wrenchPos.width &&
          playerRect.x + playerRect.width > wrenchPos.x &&
          playerRect.y < wrenchPos.y + wrenchPos.height &&
          playerRect.y + playerRect.height > wrenchPos.y
        ) {
          setWrenchCollected(true);
          setGameFinished(true);
          handleXP();
          return true;
        }
      }
      return false;
    },
    [wrenchCollected]
  );

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

      let newVelX = currentVel.x * 0.85; // Air resistance
      let newVelY = currentVel.y + GRAVITY;

      // Horizontal movement
      if (keys["a"] || keys["A"] || keys["ArrowLeft"]) newVelX = -MOVE_SPEED;
      if (keys["d"] || keys["D"] || keys["ArrowRight"]) newVelX = MOVE_SPEED;

      // Jumping
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

      // Calculate potential new positions
      let newX = currentPos.x + newVelX;
      let newY = currentPos.y + newVelY;

      // Keep player within map bounds
      newX = Math.max(0, Math.min(MAP_WIDTH - PLAYER_SIZE, newX));

      // Check horizontal collision first (X-axis movement)
      const xCollision = checkXCollision(newX, currentPos.y);
      if (xCollision) {
        // Stop horizontal movement if hitting a wall
        if (newVelX > 0) {
          // Moving right, position player to the left of the platform
          newX = xCollision.x - PLAYER_SIZE;
        } else if (newVelX < 0) {
          // Moving left, position player to the right of the platform
          newX = xCollision.x + xCollision.width;
        }
        newVelX = 0; // Stop horizontal velocity
      }

      // Check vertical collision (Y-axis movement)
      let onGround = false;
      const yCollision = checkYCollision(newX, newY);
      if (yCollision) {
        if (newVelY > 0) {
          // Falling down - check if we're landing on top of a platform
          if (currentPos.y + PLAYER_SIZE <= yCollision.y + 2) {
            newY = yCollision.y - PLAYER_SIZE;
            newVelY = 0;
            onGround = true;
          } else {
            // Hitting platform from the side while falling
            if (newVelX > 0) {
              newX = yCollision.x - PLAYER_SIZE;
            } else if (newVelX < 0) {
              newX = yCollision.x + yCollision.width;
            }
            newVelX = 0;
          }
        } else if (newVelY < 0) {
          // Moving up - hitting ceiling
          if (currentPos.y >= yCollision.y + yCollision.height - 2) {
            newY = yCollision.y + yCollision.height;
            newVelY = 0;
          } else {
            // Hitting platform from the side while jumping
            if (newVelX > 0) {
              newX = yCollision.x - PLAYER_SIZE;
            } else if (newVelX < 0) {
              newX = yCollision.x + yCollision.width;
            }
            newVelX = 0;
          }
        }
      }

      // Reset if player falls off the bottom
      if (newY > VIEWPORT_HEIGHT + 100) {
        setPlayerPos({ x: 50, y: 400 });
        setVelocity({ x: 0, y: 0 });
        setIsGrounded(false);
        return;
      }

      // Check wrench collection
      checkWrenchCollection(newX, newY);

      setPlayerPos({ x: newX, y: newY });
      setVelocity({ x: newVelX, y: newVelY });
      setIsGrounded(onGround);
    }, 16);

    return () => clearInterval(gameLoop);
  }, [gameFinished, checkXCollision, checkYCollision, checkWrenchCollection]);

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
    setPlayerPos({ x: 50, y: 400 });
    setVelocity({ x: 0, y: 0 });
    setGameFinished(false);
    setIsGrounded(false);
    setWrenchCollected(false);
    keysRef.current = {};
  };

  // Progress calculation based on horizontal distance
  const progress = Math.max(
    0,
    Math.min(100, (playerPos.x / (MAP_WIDTH - 100)) * 100)
  );

  const peterSlides = [
    {
      title: "Awesome job!",
      description:
        "You collected the space wrench! Now you can fix the engine. You have earned 100 XP! Next stage: Repair the engine. Continue at number 3.",
    },
  ];

  return (
    <div className="flex flex-col items-center p-4 bg-gray-900 min-h-screen font-mono">
      {/* Space-themed Title */}

      {!hidePeter && gameFinished && (
        <div className="">
          <Peter
            slides={peterSlides}
            imageSrc="/AIHappy.png"
            className="absolute top-50 right-1/4"
          />
          <button
            onClick={() => setHidePeter(true)}
            className="absolute top-1/2 left-1/2 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded shadow-lg z-50"
          >
            X
          </button>
        </div>
      )}

      {/* Controls Display */}
      <div className="mb-4 text-blue-200 text-center bg-black/50 p-3 border-2 border-blue-400 rounded">
        <p className="font-bold text-blue-300">🎮 CONTROLS:</p>
        <p>A/D (or Arrow Keys) to move • SPACEBAR/W/UP to jump</p>
        <p className="text-blue-300">
          🌟 PROGRESS: {Math.round(progress)}% • DISTANCE:{" "}
          {Math.round(playerPos.x)}m
        </p>
      </div>

      {/* Reset Button */}
      <button
        onClick={resetGame}
        className="mb-4 px-6 py-2 bg-red-600 hover:bg-red-700 border-2 border-red-800 text-white font-bold rounded transition-all duration-200 transform hover:scale-105 z-50"
      >
        🔄 RESTART MISSION
      </button>

      {/* Game Canvas */}
      <div
        className="relative border-4 border-gray-600 bg-gradient-to-b from-indigo-900 via-purple-900 to-black overflow-hidden focus:outline-none shadow-2xl rounded"
        style={{
          width: "70vw",
          height: "80vh",
        }}
        tabIndex={0}
      >
        {/* Stars background - static positions */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => {
            // Create deterministic star positions based on index
            const x = (i * 137.508) % 100; // Golden angle for distribution
            const y = (i * 73.205) % 100;
            const size = i % 3 === 0 ? 2 : 1; // Some bigger stars
            return (
              <div
                key={i}
                className="absolute bg-white rounded-full"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity: 0.3 + (i % 7) * 0.1, // Varying brightness
                }}
              />
            );
          })}
        </div>

        {/* Game world container */}
        <div
          className="absolute w-full h-full"
          style={{
            transform: `translateX(-${cameraX}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          {/* Platforms (spaceship debris) */}
          {platforms.map((platform, index) => {
            const colors = getPlatformColor(platform.type);
            return (
              <div
                key={index}
                className="absolute border-2 shadow-lg rounded overflow-hidden"
                style={{
                  left: `${platform.x}px`,
                  top: `${platform.y}px`,
                  width: `${platform.width}px`,
                  height: `${platform.height}px`,
                  backgroundColor: colors.bg,
                  borderColor: colors.border,
                  boxShadow: `0 0 10px ${colors.border}`,
                }}
              >
                {/* Debris texture background */}
                <div className="absolute inset-0 opacity-30 rounded">
                  <div
                    className="h-full w-full rounded"
                    style={{
                      background: `repeating-linear-gradient(45deg, transparent, transparent 4px, ${colors.border} 4px, ${colors.border} 6px)`,
                    }}
                  />
                </div>

                {/* Render debris content */}
                {renderDebrisContent(
                  platform.type,
                  platform.width,
                  platform.height
                )}
              </div>
            );
          })}

          {/* Wrench (goal item) */}
          {!wrenchCollected && (
            <div
              className="absolute flex items-center justify-center animate-bounce"
              style={{
                left: `${wrenchPos.x}px`,
                top: `${wrenchPos.y}px`,
                width: `${wrenchPos.width}px`,
                height: `${wrenchPos.height}px`,
              }}
            >
              <div className="text-4xl animate-pulse">🔧</div>
              <div className="absolute inset-0 bg-yellow-400 opacity-20 rounded-full animate-ping" />
            </div>
          )}

          {/* Player (astronaut) */}
          <div
            className="absolute border-2 border-blue-300 flex items-center justify-center rounded-full shadow-lg"
            style={{
              left: `${playerPos.x}px`,
              top: `${playerPos.y}px`,
              width: `${PLAYER_SIZE}px`,
              height: `${PLAYER_SIZE}px`,
              backgroundColor: "#f7fafc",
              boxShadow: "0 0 15px rgba(59, 130, 246, 0.8)",
            }}
          >
            <div className="text-2xl">👨‍🚀</div>
          </div>
        </div>

        {/* Distance indicator */}
        <div className="absolute bottom-4 left-4 bg-black/70 border border-blue-400 rounded p-2 text-blue-300 text-sm">
          📍 Distance: {Math.round(playerPos.x)}m / {MAP_WIDTH}m
        </div>
      </div>

      {/* Victory Message */}
      {gameFinished && wrenchCollected && (
        <div className="mt-4 p-6 bg-green-600 border-4 border-green-800 text-white rounded font-bold text-center shadow-2xl">
          <div className="text-3xl mb-2">🎉 MISSION ACCOMPLISHED! 🎉</div>
          <div className="text-xl mb-2">🔧 Space Wrench Recovered! 🔧</div>
          <div className="text-lg">The space station can now be repaired!</div>
        </div>
      )}
    </div>
  );
}

export default SpaceJumpingGame;
