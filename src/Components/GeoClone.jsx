import { useState, useEffect, useCallback, useRef, useMemo } from "react";

function SpaceGeometryDash() {
  const [playerPos, setPlayerPos] = useState({ x: 100, y: 300 });
  const [velocity, setVelocity] = useState({ x: 6, y: 0 });
  const [isGrounded, setIsGrounded] = useState(false);
  const [gameRunning, setGameRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [cameraX, setCameraX] = useState(0);
  const [distance, setDistance] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const keysRef = useRef({});
  const playerPosRef = useRef({ x: 100, y: 300 });
  const velocityRef = useRef({ x: 6, y: 0 });
  const isGroundedRef = useRef(false);
  const gameRunningRef = useRef(false);

  const GRAVITY = 0.8;
  const JUMP_FORCE = -12;
  const BASE_SPEED = 6;
  const PLAYER_SIZE = 30;
  const VIEWPORT_WIDTH = 800;
  const VIEWPORT_HEIGHT = 600;
  const GROUND_HEIGHT = 400;

  // Level geometry - platforms, spikes, and obstacles
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
        y: GROUND_HEIGHT - 680,
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
      // Victory platform
      { x: 2600, y: GROUND_HEIGHT, width: 200, height: 50, type: "ground" },
    ],
    []
  );

  // Camera follows player
  useEffect(() => {
    const targetCameraX = Math.max(0, playerPos.x - 200);
    setCameraX(targetCameraX);
    setDistance(Math.max(0, playerPos.x - 100));
  }, [playerPos.x]);

  // Collision detection
  const checkCollision = useCallback((newX, newY) => {
    const playerRect = {
      x: newX,
      y: newY,
      width: PLAYER_SIZE,
      height: PLAYER_SIZE,
    };

    for (let obstacle of levelGeometry) {
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
  }, []);

  // Check if player hits deadly obstacles
  const checkDeath = useCallback((collision) => {
    if (!collision) return false;
    return collision.type === "spike" || collision.type === "ceiling_spike";
  }, []);

  // Update refs when state changes
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
    gameRunningRef.current = gameRunning;
  }, [gameRunning]);

  // Main game loop
  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (!gameRunningRef.current) return;

      const currentPos = playerPosRef.current;
      const currentVel = velocityRef.current;
      const currentGrounded = isGroundedRef.current;
      const keys = keysRef.current;

      let newVelX = currentVel.x;
      let newVelY = currentVel.y + GRAVITY;

      // Jumping - any key or click
      if (
        (keys[" "] || keys["ArrowUp"] || keys["w"] || keys["W"]) &&
        currentGrounded
      ) {
        newVelY = JUMP_FORCE;
        setIsGrounded(false);
        isGroundedRef.current = false;
      }

      // Calculate new position
      let newX = currentPos.x + newVelX;
      let newY = currentPos.y + newVelY;

      // Check collision
      const collision = checkCollision(newX, newY);

      if (collision) {
        // Check if it's a deadly obstacle
        if (checkDeath(collision)) {
          setGameOver(true);
          setGameRunning(false);
          return;
        }

        // Handle platform collision
        if (collision.type === "ground" || collision.type === "platform") {
          if (newVelY > 0 && currentPos.y + PLAYER_SIZE <= collision.y + 5) {
            // Landing on top
            newY = collision.y - PLAYER_SIZE;
            newVelY = 0;
            setIsGrounded(true);
            isGroundedRef.current = true;
          } else if (
            newVelY < 0 &&
            currentPos.y >= collision.y + collision.height - 5
          ) {
            // Hitting from below
            newY = collision.y + collision.height;
            newVelY = 0;
          } else {
            // Side collision - game over in geometry dash style
            setGameOver(true);
            setGameRunning(false);
            return;
          }
        }
      } else {
        // No collision, player is in air
        setIsGrounded(false);
        isGroundedRef.current = false;
      }

      // Check if player fell off the world or hit ceiling
      if (newY > VIEWPORT_HEIGHT || newY < -50) {
        setGameOver(true);
        setGameRunning(false);
        return;
      }

      setPlayerPos({ x: newX, y: newY });
      setVelocity({ x: newVelX, y: newVelY });
    }, 16);

    return () => clearInterval(gameLoop);
  }, [checkCollision, checkDeath]);

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
    setVelocity({ x: BASE_SPEED, y: 0 });
    setIsGrounded(false);
    setCameraX(0);
    setDistance(0);
  };

  const resetGame = () => {
    setGameRunning(false);
    setGameOver(false);
    setPlayerPos({ x: 100, y: 300 });
    setVelocity({ x: BASE_SPEED, y: 0 });
    setIsGrounded(false);
    setCameraX(0);
    setDistance(0);
    setAttempts((prev) => prev + 1);
    keysRef.current = {};
  };

  const renderObstacle = (obstacle) => {
    switch (obstacle.type) {
      case "ground":
        return (
          <div className="absolute inset-0 bg-gray-600 border-t-2 border-gray-400">
            <div className="absolute inset-0 opacity-30">
              <div
                className="h-full w-full"
                style={{
                  background:
                    "repeating-linear-gradient(90deg, transparent, transparent 10px, #4a5568 10px, #4a5568 12px)",
                }}
              />
            </div>
          </div>
        );
      case "platform":
        return (
          <div className="absolute inset-0 bg-blue-600 border-2 border-blue-400">
            <div className="absolute inset-0 opacity-40">
              <div
                className="h-full w-full"
                style={{
                  background:
                    "repeating-linear-gradient(45deg, transparent, transparent 4px, #2c5282 4px, #2c5282 6px)",
                }}
              />
            </div>
          </div>
        );
      case "spike":
        return (
          <div className="absolute inset-0 flex items-end justify-center">
            <div
              className="bg-red-500 border-2 border-red-700"
              style={{
                width: 0,
                height: 0,
                borderLeft: `${obstacle.width / 2}px solid transparent`,
                borderRight: `${obstacle.width / 2}px solid transparent`,
                borderBottom: `${obstacle.height}px solid #ef4444`,
                borderTop: "none",
              }}
            />
          </div>
        );
      case "ceiling_spike":
        return (
          <div className="absolute inset-0 flex items-start justify-center">
            <div
              className="bg-red-500 border-2 border-red-700"
              style={{
                width: 0,
                height: 0,
                borderLeft: `${obstacle.width / 2}px solid transparent`,
                borderRight: `${obstacle.width / 2}px solid transparent`,
                borderTop: `${obstacle.height}px solid #ef4444`,
                borderBottom: "none",
              }}
            />
          </div>
        );
      default:
        return null;
    }
  };

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
        {/* Stars background */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 60 }).map((_, i) => {
            const x = (i * 137.508) % 100;
            const y = (i * 73.205) % 100;
            const size = i % 4 === 0 ? 2 : 1;
            return (
              <div
                key={i}
                className="absolute bg-white rounded-full animate-pulse"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity: 0.3 + (i % 5) * 0.15,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            );
          })}
        </div>

        {/* Game world */}
        <div
          className="absolute w-full h-full"
          style={{
            transform: `translateX(-${cameraX}px)`,
            transition: gameRunning ? "none" : "transform 0.1s ease-out",
          }}
        >
          {/* Level geometry */}
          {levelGeometry.map((obstacle, index) => (
            <div
              key={index}
              className="absolute overflow-hidden"
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
            className="absolute rounded-full border-2 border-cyan-300 flex items-center justify-center shadow-lg transition-transform duration-100"
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
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
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
