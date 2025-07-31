import { useState, useEffect, useCallback, useRef, useMemo } from "react";

function SpaceGeometryDash() {
  const [playerPos, setPlayerPos] = useState({ x: 100, y: 300 });
  const [gameRunning, setGameRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [cameraX, setCameraX] = useState(0);
  const [distance, setDistance] = useState(0);
  const [attempts, setAttempts] = useState(0);

  // Use refs for values that change frequently but don't need to trigger re-renders
  const playerPosRef = useRef({ x: 100, y: 300 });
  const velocityRef = useRef({ x: 6, y: 0 });
  const isGroundedRef = useRef(false);
  const gameRunningRef = useRef(false);
  const keysRef = useRef({});
  const animationFrameRef = useRef();

  const GRAVITY = 0.8;
  const JUMP_FORCE = -12;
  const BASE_SPEED = 6;
  const PLAYER_SIZE = 30;
  const GROUND_HEIGHT = 400;

  const GroundElement = () => (
    <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 border-t-4 border-purple-400 shadow-inner">
      {/* Pixelated star pattern overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1 left-2 w-1 h-1 bg-purple-300"></div>
        <div className="absolute top-3 left-8 w-1 h-1 bg-purple-200"></div>
        <div className="absolute top-2 left-16 w-1 h-1 bg-purple-400"></div>
        <div className="absolute top-4 left-24 w-1 h-1 bg-purple-300"></div>
      </div>
      {/* Scan lines effect */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(147, 51, 234, 0.1) 2px, rgba(147, 51, 234, 0.1) 4px)",
        }}
      ></div>
    </div>
  );

  // Cosmic retro platform element
  const PlatformElement = () => (
    <div className="absolute inset-0 bg-gradient-to-b from-purple-600 via-purple-700 to-purple-800 border-4 border-purple-400 shadow-lg">
      {/* Pixelated energy core */}
      <div className="absolute inset-2 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-60">
        <div className="absolute top-1 left-1 w-2 h-2 bg-purple-300 animate-pulse"></div>
        <div
          className="absolute top-1 right-1 w-2 h-2 bg-purple-300 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-1 left-1 w-2 h-2 bg-purple-300 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1 right-1 w-2 h-2 bg-purple-300 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>
      {/* Scan lines */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(147, 51, 234, 0.2) 1px, rgba(147, 51, 234, 0.2) 2px)",
        }}
      ></div>
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 bg-purple-300"></div>
      <div className="absolute top-0 right-0 w-3 h-3 bg-purple-300"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 bg-purple-300"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 bg-purple-300"></div>
    </div>
  );

  // Cosmic retro spike element
  const SpikeElement = ({ width = 40, height = 40 }) => (
    <div className="absolute inset-0 flex items-end justify-center">
      {/* Main spike body */}
      <div
        className="relative"
        style={{
          width: 0,
          height: 0,
          borderLeft: `${width / 2}px solid transparent`,
          borderRight: `${width / 2}px solid transparent`,
          borderBottom: `${height}px solid #7c3aed`,
          filter: "drop-shadow(0 0 8px rgba(124, 58, 237, 0.6))",
        }}
      >
        {/* Energy core gradient overlay */}
        <div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
          style={{
            width: 0,
            height: 0,
            borderLeft: `${width / 2 - 4}px solid transparent`,
            borderRight: `${width / 2 - 4}px solid transparent`,
            borderBottom: `${height - 8}px solid #a855f7`,
          }}
        ></div>
        {/* Inner core */}
        <div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
          style={{
            width: 0,
            height: 0,
            borderLeft: `${width / 2 - 8}px solid transparent`,
            borderRight: `${width / 2 - 8}px solid transparent`,
            borderBottom: `${height - 16}px solid #c084fc`,
          }}
        ></div>
      </div>

      {/* Pixelated danger particles */}
      <div className="absolute bottom-0 left-0 w-1 h-1 bg-purple-300 animate-ping"></div>
      <div
        className="absolute bottom-2 right-1 w-1 h-1 bg-purple-400 animate-ping"
        style={{ animationDelay: "0.3s" }}
      ></div>
      <div
        className="absolute bottom-4 left-2 w-1 h-1 bg-purple-200 animate-ping"
        style={{ animationDelay: "0.6s" }}
      ></div>

      {/* Base glow effect */}
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-purple-500 opacity-50 blur-sm animate-pulse"
        style={{ width: width + 10, height: 4 }}
      ></div>
    </div>
  );

  // Optimized level geometry - removed some complex elements
  const levelGeometry = useMemo(
    () => [
      // Starting area
      { x: 0, y: GROUND_HEIGHT, width: 1300, height: 50, type: "ground" },

      // First spike section
      { x: 1300, y: GROUND_HEIGHT, width: 200, height: 50, type: "ground" },
      { x: 1320, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 1360, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },

      // Platform section
      { x: 1500, y: GROUND_HEIGHT, width: 100, height: 50, type: "ground" },
      { x: 1650, y: 350, width: 100, height: 20, type: "platform" },
      { x: 1800, y: 300, width: 100, height: 20, type: "platform" },
      { x: 1950, y: 350, width: 100, height: 20, type: "platform" },

      // More spikes
      { x: 2100, y: GROUND_HEIGHT, width: 300, height: 50, type: "ground" },
      { x: 2120, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 2160, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },

      { x: 2280, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 2340, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },

      // Ceiling spikes section
      { x: 2400, y: GROUND_HEIGHT, width: 200, height: 50, type: "ground" },

      // Complex platform jumps
      { x: 2600, y: GROUND_HEIGHT, width: 100, height: 50, type: "ground" },
      { x: 2750, y: 330, width: 80, height: 20, type: "platform" },
      { x: 2820, y: 320, width: 10, height: 10, type: "spike" },
      { x: 2900, y: 270, width: 80, height: 20, type: "platform" },
      { x: 2970, y: 260, width: 10, height: 10, type: "spike" },
      { x: 3100, y: 300, width: 80, height: 20, type: "platform" },

      // Final section
      { x: 3200, y: GROUND_HEIGHT, width: 800, height: 50, type: "ground" },
      { x: 4000, y: 350, width: 80, height: 20, type: "platform" },
      { x: 4000, y: 340, width: 10, height: 10, type: "spike" },
      { x: 4200, y: 350, width: 80, height: 20, type: "platform" },
      { x: 4400, y: 350, width: 80, height: 20, type: "platform" },
      {
        x: 4500,
        y: GROUND_HEIGHT - 80,
        width: 2000,
        height: 250,
        type: "ground",
      },

      { x: 4800, y: 310, width: 100, height: 10, type: "spike" },
      { x: 5400, y: 310, width: 100, height: 10, type: "spike" },

      {
        x: 6500,
        y: GROUND_HEIGHT - 640,
        width: 2000,
        height: 450,
        type: "ground",
      },
      {
        x: 6500,
        y: GROUND_HEIGHT - 80,
        width: 2000,
        height: 450,
        type: "ground",
      },
      { x: 6600, y: 310, width: 100, height: 10, type: "spike" },
      { x: 6900, y: 210, width: 200, height: 10, type: "spike" },
      { x: 7200, y: 310, width: 70, height: 10, type: "spike" },
      { x: 7400, y: 210, width: 200, height: 10, type: "spike" },
      { x: 7670, y: 310, width: 70, height: 10, type: "spike" },
      { x: 7850, y: 210, width: 200, height: 10, type: "spike" },
      // Victory platform
      { x: 2600, y: GROUND_HEIGHT, width: 200, height: 50, type: "ground" },
    ],
    []
  );

  // Optimized collision detection - only check nearby obstacles
  const checkCollision = useCallback(
    (newX, newY) => {
      const playerRect = {
        x: newX,
        y: newY,
        width: PLAYER_SIZE,
        height: PLAYER_SIZE,
      };

      // Only check obstacles that could potentially collide (within reasonable range)
      for (let obstacle of levelGeometry) {
        if (obstacle.x > newX + 200) break; // Stop checking if obstacle is too far ahead
        if (obstacle.x + obstacle.width < newX - 50) continue; // Skip if obstacle is too far behind

        if (
          playerRect.x < obstacle.x + obstacle.width &&
          playerRect.x + playerRect.width > obstacle.x &&
          playerRect.y < obstacle.y + obstacle.height &&
          playerRect.y + playerRect.height > obstacle.y
        ) {
          return obstacle;
        }
      }
      return null;
    },
    [levelGeometry]
  );

  // Optimized game loop using requestAnimationFrame
  const gameLoop = useCallback(() => {
    if (!gameRunningRef.current) return;

    const currentPos = playerPosRef.current;
    const currentVel = velocityRef.current;
    const currentGrounded = isGroundedRef.current;
    const keys = keysRef.current;

    let newVelX = currentVel.x;
    let newVelY = currentVel.y + GRAVITY;

    // Jumping
    if (
      (keys[" "] || keys["ArrowUp"] || keys["w"] || keys["W"]) &&
      currentGrounded
    ) {
      newVelY = JUMP_FORCE;
      isGroundedRef.current = false;
    }

    // Calculate new position
    let newX = currentPos.x + newVelX;
    let newY = currentPos.y + newVelY;

    // Check collision
    const collision = checkCollision(newX, newY);

    if (collision) {
      // Check if it's a deadly obstacle
      if (collision.type === "spike") {
        setGameOver(true);
        setGameRunning(false);
        gameRunningRef.current = false;
        return;
      }

      // Handle platform collision
      if (collision.type === "ground" || collision.type === "platform") {
        if (newVelY > 0 && currentPos.y + PLAYER_SIZE <= collision.y + 5) {
          // Landing on top
          newY = collision.y - PLAYER_SIZE;
          newVelY = 0;
          isGroundedRef.current = true;
        } else if (
          newVelY < 0 &&
          currentPos.y >= collision.y + collision.height - 5
        ) {
          // Hitting from below
          newY = collision.y + collision.height;
          newVelY = 0;
        } else {
          // Side collision - game over
          setGameOver(true);
          setGameRunning(false);
          gameRunningRef.current = false;
          return;
        }
      }
    } else {
      isGroundedRef.current = false;
    }

    // Check bounds
    if (newY > 600 || newY < -50) {
      setGameOver(true);
      setGameRunning(false);
      gameRunningRef.current = false;
      return;
    }

    // Update refs
    playerPosRef.current = { x: newX, y: newY };
    velocityRef.current = { x: newVelX, y: newVelY };

    // Update React state less frequently for better performance
    const frameCount = Math.floor(Date.now() / 50); // Update every ~50ms instead of every frame
    if (frameCount !== gameLoop.lastUpdate) {
      gameLoop.lastUpdate = frameCount;
      setPlayerPos({ x: newX, y: newY });
      setCameraX(Math.max(0, newX - 200));
      setDistance(Math.max(0, newX - 100));
    }

    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, [checkCollision]);

  // Start game loop
  useEffect(() => {
    if (gameRunning) {
      gameRunningRef.current = true;
      gameLoop();
    } else {
      gameRunningRef.current = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameRunning, gameLoop]);

  // Input handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      keysRef.current[e.key] = true;
      if (
        e.key === " " ||
        e.key === "ArrowUp" ||
        e.key === "w" ||
        e.key === "W"
      ) {
        e.preventDefault();
        if (!gameRunning && !gameOver) {
          startGame();
        }
      }
    };

    const handleKeyUp = (e) => {
      keysRef.current[e.key] = false;
    };

    const handleClick = () => {
      if (!gameRunning && !gameOver) {
        startGame();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("click", handleClick);
    };
  }, [gameRunning, gameOver]);

  const startGame = () => {
    setGameRunning(true);
    setGameOver(false);
    setPlayerPos({ x: 100, y: 300 });
    playerPosRef.current = { x: 100, y: 300 };
    velocityRef.current = { x: BASE_SPEED, y: 0 };
    isGroundedRef.current = false;
    setCameraX(0);
    setDistance(0);
  };

  const resetGame = () => {
    setGameRunning(false);
    setGameOver(false);
    setPlayerPos({ x: 100, y: 300 });
    playerPosRef.current = { x: 100, y: 300 };
    velocityRef.current = { x: BASE_SPEED, y: 0 };
    isGroundedRef.current = false;
    setCameraX(0);
    setDistance(0);
    setAttempts((prev) => prev + 1);
    keysRef.current = {};
  };

  // Simplified obstacle rendering
  const renderObstacle = (obstacle) => {
    switch (obstacle.type) {
      case "ground":
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 border-t-4 border-purple-400 shadow-inner">
            {/* Pixelated star pattern overlay */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1 left-2 w-1 h-1 bg-purple-300"></div>
              <div className="absolute top-3 left-8 w-1 h-1 bg-purple-200"></div>
              <div className="absolute top-2 left-16 w-1 h-1 bg-purple-400"></div>
              <div className="absolute top-4 left-24 w-1 h-1 bg-purple-300"></div>
              <div className="absolute top-1 left-32 w-1 h-1 bg-purple-200"></div>
              <div className="absolute top-5 left-40 w-1 h-1 bg-purple-400"></div>
            </div>
            {/* Scan lines effect */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(147, 51, 234, 0.1) 2px, rgba(147, 51, 234, 0.1) 4px)",
              }}
            ></div>
          </div>
        );

      case "platform":
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-purple-600 via-purple-700 to-purple-800 border-4 border-purple-400 shadow-lg">
            {/* Pixelated energy core */}
            <div className="absolute inset-2 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-60">
              <div className="absolute top-1 left-1 w-2 h-2 bg-purple-300 animate-pulse"></div>
              <div
                className="absolute top-1 right-1 w-2 h-2 bg-purple-300 animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute bottom-1 left-1 w-2 h-2 bg-purple-300 animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute bottom-1 right-1 w-2 h-2 bg-purple-300 animate-pulse"
                style={{ animationDelay: "1.5s" }}
              ></div>
            </div>
            {/* Scan lines */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(147, 51, 234, 0.2) 1px, rgba(147, 51, 234, 0.2) 2px)",
              }}
            ></div>
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-3 h-3 bg-purple-300"></div>
            <div className="absolute top-0 right-0 w-3 h-3 bg-purple-300"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 bg-purple-300"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-purple-300"></div>
          </div>
        );

      case "spike":
        return (
          <div className="absolute inset-0 flex items-end justify-center">
            {/* Main spike body */}
            <div
              className="relative"
              style={{
                width: 0,
                height: 0,
                borderLeft: `${obstacle.width / 2}px solid transparent`,
                borderRight: `${obstacle.width / 2}px solid transparent`,
                borderBottom: `${obstacle.height}px solid #7c3aed`,
                filter: "drop-shadow(0 0 8px rgba(124, 58, 237, 0.6))",
              }}
            >
              {/* Energy core gradient overlay */}
              <div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: `${obstacle.width / 2 - 4}px solid transparent`,
                  borderRight: `${obstacle.width / 2 - 4}px solid transparent`,
                  borderBottom: `${obstacle.height - 8}px solid #a855f7`,
                }}
              ></div>
              {/* Inner core */}
              <div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: `${obstacle.width / 2 - 8}px solid transparent`,
                  borderRight: `${obstacle.width / 2 - 8}px solid transparent`,
                  borderBottom: `${obstacle.height - 16}px solid #c084fc`,
                }}
              ></div>
            </div>

            {/* Pixelated danger particles */}
            <div className="absolute bottom-0 left-0 w-1 h-1 bg-purple-300 animate-ping"></div>
            <div
              className="absolute bottom-2 right-1 w-1 h-1 bg-purple-400 animate-ping"
              style={{ animationDelay: "0.3s" }}
            ></div>
            <div
              className="absolute bottom-4 left-2 w-1 h-1 bg-purple-200 animate-ping"
              style={{ animationDelay: "0.6s" }}
            ></div>

            {/* Base glow effect */}
            <div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-purple-500 opacity-50 blur-sm animate-pulse"
              style={{ width: obstacle.width + 10, height: 4 }}
            ></div>
          </div>
        );

      default:
        return null;
    }
  };

  // Simplified stars background (fewer stars, no animation)
  const stars = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => {
      const x = (i * 137.508) % 100;
      const y = (i * 73.205) % 100;
      return (
        <div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: "2px",
            height: "2px",
            opacity: 0.6,
          }}
        />
      );
    });
  }, []);

  return (
    <div className="flex flex-col items-center p-4 bg-gray-900 min-h-screen font-mono">
      {/* Title */}
      <div className="mb-4 text-center">
        <h1 className="text-4xl font-bold text-blue-300 mb-2">
          🚀 SPACE GEOMETRY DASH 🚀
        </h1>
        <p className="text-blue-200">
          Navigate through the cosmic debris field!
        </p>
      </div>

      {/* Stats */}
      <div className="mb-4 flex gap-6 text-blue-200 bg-black/50 p-3 border-2 border-blue-400 rounded">
        <div>📊 Distance: {Math.round(distance)}m</div>
        <div>🎯 Attempts: {attempts}</div>
        <div>💨 Speed: {BASE_SPEED}m/s</div>
      </div>

      {/* Instructions */}
      {!gameRunning && !gameOver && (
        <div className="mb-4 text-center text-blue-200 bg-black/50 p-4 border-2 border-blue-400 rounded">
          <p className="font-bold text-blue-300">🎮 HOW TO PLAY:</p>
          <p>Press SPACEBAR, W, UP ARROW, or CLICK to jump</p>
          <p>Avoid the red spikes! Land on platforms safely!</p>
          <p className="mt-2 text-yellow-300">
            Press any key or click to start!
          </p>
        </div>
      )}

      {/* Game Over Screen */}
      {gameOver && (
        <div className="mb-4 text-center text-red-200 bg-red-900/80 p-4 border-2 border-red-400 rounded">
          <p className="font-bold text-red-300 text-2xl">💥 CRASHED! 💥</p>
          <p>Distance reached: {Math.round(distance)}m</p>
          <button
            onClick={resetGame}
            className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded"
          >
            🔄 Try Again
          </button>
        </div>
      )}

      {/* Game Canvas */}
      <div
        className="relative border-4 border-gray-600 bg-gradient-to-b from-indigo-900 via-purple-900 to-black overflow-hidden shadow-2xl rounded cursor-pointer"
        style={{
          width: "80vw",
          height: "60vh",
          maxWidth: "1000px",
          maxHeight: "600px",
        }}
        onClick={() => {
          if (!gameRunning && !gameOver) startGame();
        }}
      >
        {/* Simplified stars background */}
        <div className="absolute inset-0 pointer-events-none">{stars}</div>

        {/* Game world */}
        <div
          className="absolute w-full h-full"
          style={{
            transform: `translateX(-${cameraX}px)`,
          }}
        >
          {/* Level geometry */}
          {levelGeometry.map((obstacle, index) => (
            <div
              key={index}
              className="absolute"
              style={{
                left: `${obstacle.x}px`,
                top: `${obstacle.y}px`,
                width: `${obstacle.width}px`,
                height: `${obstacle.height}px`,
              }}
            >
              {renderObstacle(obstacle)}
            </div>
          ))}

          {/* Player cube */}
          <div
            className="absolute rounded-full border-2 border-cyan-300 flex items-center justify-center"
            style={{
              left: `${playerPos.x}px`,
              top: `${playerPos.y}px`,
              width: `${PLAYER_SIZE}px`,
              height: `${PLAYER_SIZE}px`,
              backgroundColor: "#06b6d4",
              boxShadow: "0 0 20px rgba(6, 182, 212, 0.8)",
              transform: gameRunning
                ? `rotate(${(playerPos.x * 2) % 360}deg)`
                : "rotate(0deg)",
            }}
          >
            <div className="w-3 h-3 bg-white rounded-full opacity-80" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-4 left-4 right-4 bg-black/70 border border-blue-400 rounded p-2">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${Math.min(100, (distance / 10000) * 100)}%` }}
            />
          </div>
          <div className="text-blue-300 text-sm text-center mt-1">
            Progress: {Math.round((distance / 10000) * 100)}%
          </div>
        </div>
      </div>

      {/* Victory message */}
      {distance > 10000 && (
        <div className="mt-4 p-6 bg-green-600 border-4 border-green-800 text-white rounded font-bold text-center shadow-2xl">
          <div className="text-3xl mb-2">🎉 LEVEL COMPLETED! 🎉</div>
          <div className="text-xl">
            You navigated through the entire debris field!
          </div>
          <button
            onClick={resetGame}
            className="mt-2 px-4 py-2 bg-green-700 hover:bg-green-800 text-white font-bold rounded"
          >
            🎮 Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default SpaceGeometryDash;

const GroundElement = () => (
  <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 border-t-4 border-purple-400 shadow-inner">
    {/* Pixelated star pattern overlay */}
    <div className="absolute inset-0 opacity-30">
      <div className="absolute top-1 left-2 w-1 h-1 bg-purple-300"></div>
      <div className="absolute top-3 left-8 w-1 h-1 bg-purple-200"></div>
      <div className="absolute top-2 left-16 w-1 h-1 bg-purple-400"></div>
      <div className="absolute top-4 left-24 w-1 h-1 bg-purple-300"></div>
    </div>
    {/* Scan lines effect */}
    <div
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(147, 51, 234, 0.1) 2px, rgba(147, 51, 234, 0.1) 4px)",
      }}
    ></div>
  </div>
);

// Cosmic retro platform element
const PlatformElement = () => (
  <div className="absolute inset-0 bg-gradient-to-b from-purple-600 via-purple-700 to-purple-800 border-4 border-purple-400 shadow-lg">
    {/* Pixelated energy core */}
    <div className="absolute inset-2 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-60">
      <div className="absolute top-1 left-1 w-2 h-2 bg-purple-300 animate-pulse"></div>
      <div
        className="absolute top-1 right-1 w-2 h-2 bg-purple-300 animate-pulse"
        style={{ animationDelay: "0.5s" }}
      ></div>
      <div
        className="absolute bottom-1 left-1 w-2 h-2 bg-purple-300 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-1 right-1 w-2 h-2 bg-purple-300 animate-pulse"
        style={{ animationDelay: "1.5s" }}
      ></div>
    </div>
    {/* Scan lines */}
    <div
      className="absolute inset-0 opacity-30"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(147, 51, 234, 0.2) 1px, rgba(147, 51, 234, 0.2) 2px)",
      }}
    ></div>
    {/* Corner accents */}
    <div className="absolute top-0 left-0 w-3 h-3 bg-purple-300"></div>
    <div className="absolute top-0 right-0 w-3 h-3 bg-purple-300"></div>
    <div className="absolute bottom-0 left-0 w-3 h-3 bg-purple-300"></div>
    <div className="absolute bottom-0 right-0 w-3 h-3 bg-purple-300"></div>
  </div>
);

// Cosmic retro spike element
const SpikeElement = ({ width = 40, height = 40 }) => (
  <div className="absolute inset-0 flex items-end justify-center">
    {/* Main spike body */}
    <div
      className="relative"
      style={{
        width: 0,
        height: 0,
        borderLeft: `${width / 2}px solid transparent`,
        borderRight: `${width / 2}px solid transparent`,
        borderBottom: `${height}px solid #7c3aed`,
        filter: "drop-shadow(0 0 8px rgba(124, 58, 237, 0.6))",
      }}
    >
      {/* Energy core gradient overlay */}
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
        style={{
          width: 0,
          height: 0,
          borderLeft: `${width / 2 - 4}px solid transparent`,
          borderRight: `${width / 2 - 4}px solid transparent`,
          borderBottom: `${height - 8}px solid #a855f7`,
        }}
      ></div>
      {/* Inner core */}
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
        style={{
          width: 0,
          height: 0,
          borderLeft: `${width / 2 - 8}px solid transparent`,
          borderRight: `${width / 2 - 8}px solid transparent`,
          borderBottom: `${height - 16}px solid #c084fc`,
        }}
      ></div>
    </div>

    {/* Pixelated danger particles */}
    <div className="absolute bottom-0 left-0 w-1 h-1 bg-purple-300 animate-ping"></div>
    <div
      className="absolute bottom-2 right-1 w-1 h-1 bg-purple-400 animate-ping"
      style={{ animationDelay: "0.3s" }}
    ></div>
    <div
      className="absolute bottom-4 left-2 w-1 h-1 bg-purple-200 animate-ping"
      style={{ animationDelay: "0.6s" }}
    ></div>

    {/* Base glow effect */}
    <div
      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-purple-500 opacity-50 blur-sm animate-pulse"
      style={{ width: width + 10, height: 4 }}
    ></div>
  </div>
);
