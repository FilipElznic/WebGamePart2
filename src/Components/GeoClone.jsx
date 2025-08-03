import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useUserData } from "./UserDataProvider";
import Peter from "./Peter.jsx";

function SpaceGeometryDash() {
  const [gameState, setGameState] = useState({
    running: false,
    over: false,
    distance: 0,
    attempts: 0,
  });

  const [hidePeter2, setHidePeter2] = useState(false);

  // Get user data first, before using it in other functions
  const { addXPForTask, userXP } = useUserData();

  const peterSlides = [
    {
      title: "Awesome job!",
      description:
        "By completing this game, you have collected eletrics wires! We will need them for the final stage of the game. You have also earned xp. Stage 4 got unlocked. Continue there.",
    },
  ];

  const handleXP = useCallback(async () => {
    try {
      if (userXP === 200) {
        const result = await addXPForTask(100); // Add 100 XP
        console.log("here");
        if (result.success) {
          console.log("XP added successfully:", result.newXP);
        } else {
          console.error("Failed to add XP:", result.error);
          if (result.error.includes("already has XP")) {
            console.log("Game finished! (XP already earned)");
          } else {
            console.log("Game finished! (XP update failed)");
          }
        }
      } else if (userXP == 300) {
        console.log("Game finished! (XP already earned)");
      }
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  }, [userXP, addXPForTask]);

  // Single ref for all game state that changes frequently
  const gameRef = useRef({
    player: { x: 100, y: 300 },
    velocity: { x: 6, y: 0 },
    camera: 0,
    grounded: false,
    running: false,
    keys: {},
    lastUpdate: 0,
  });

  const canvasRef = useRef();
  const animationRef = useRef();

  const GRAVITY = 0.8;
  const JUMP_FORCE = -12;
  const BASE_SPEED = 6;
  const PLAYER_SIZE = 30;
  const GROUND_HEIGHT = 400;
  const UPDATE_INTERVAL = 20; // ~60fps

  // Simplified level geometry with spatial indexing
  const levelGeometry = useMemo(() => {
    const obstacles = [
      // Starting area
      { x: 0, y: GROUND_HEIGHT, width: 1400, height: 50, type: "ground" },

      // First spike section
      { x: 1400, y: GROUND_HEIGHT, width: 100, height: 50, type: "ground" },

      { x: 1360, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },

      // Platform section with challenges
      { x: 1650, y: 350, width: 100, height: 20, type: "platform" },
      { x: 1720, y: 340, width: 15, height: 10, type: "spike" },
      { x: 1800, y: 300, width: 100, height: 20, type: "platform" },
      { x: 1870, y: 290, width: 15, height: 10, type: "spike" },
      { x: 1950, y: 350, width: 100, height: 20, type: "platform" },

      // More ground spikes
      { x: 2100, y: GROUND_HEIGHT, width: 300, height: 50, type: "ground" },

      { x: 2120, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 2160, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 2100, y: GROUND_HEIGHT, width: 300, height: 50, type: "ground" },
      { x: 2280, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },

      // Ceiling section with top and bottom spikes
      { x: 2400, y: GROUND_HEIGHT, width: 600, height: 50, type: "ground" },
      { x: 2400, y: 200, width: 600, height: 50, type: "ground" }, // Ceiling - moved down

      { x: 2520, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 2590, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 2450, y: 250, width: 20, height: 30, type: "spike" }, // Ceiling spikes - moved down
      { x: 2500, y: 250, width: 20, height: 30, type: "spike" },
      { x: 2600, y: GROUND_HEIGHT, width: 400, height: 50, type: "ground" },
      { x: 2800, y: 250, width: 20, height: 30, type: "spike" },
      { x: 2830, y: GROUND_HEIGHT, width: 300, height: 50, type: "ground" },

      // Complex platform jumps with alternating spikes

      { x: 3150, y: 350, width: 80, height: 20, type: "platform" },
      { x: 3200, y: 340, width: 15, height: 10, type: "spike" },
      { x: 3280, y: 330, width: 80, height: 20, type: "platform" },

      { x: 3380, y: 340, width: 80, height: 20, type: "platform" },

      { x: 3540, y: 300, width: 80, height: 20, type: "platform" },

      // Narrow platforms section
      { x: 3700, y: GROUND_HEIGHT, width: 100, height: 50, type: "ground" },
      { x: 3850, y: 360, width: 40, height: 15, type: "platform" },
      { x: 3950, y: 360, width: 40, height: 15, type: "platform" },
      { x: 4080, y: 320, width: 40, height: 15, type: "platform" },
      { x: 4150, y: 350, width: 40, height: 15, type: "platform" },
      { x: 4250, y: 330, width: 40, height: 15, type: "platform" },

      // Dense spike forest
      { x: 4400, y: GROUND_HEIGHT, width: 200, height: 50, type: "ground" },
      { x: 4420, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 4400, y: GROUND_HEIGHT, width: 200, height: 50, type: "ground" },
      { x: 4580, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 4620, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 4620, y: GROUND_HEIGHT, width: 400, height: 50, type: "ground" },
      { x: 4740, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 4780, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 4720, y: GROUND_HEIGHT, width: 300, height: 50, type: "ground" },

      // Elevated platform with escape route
      {
        x: 5000,
        y: GROUND_HEIGHT - 80,
        width: 600,
        height: 20,
        type: "platform",
      },

      // Multi-level platforms section
      { x: 5750, y: GROUND_HEIGHT, width: 2050, height: 50, type: "ground" },

      // Final gauntlet

      // Victory platform
      {
        x: 8900,
        y: GROUND_HEIGHT - 80,
        width: 200,
        height: 50,
        type: "ground",
      },
    ];

    // Sort by x position for efficient collision detection
    return obstacles.sort((a, b) => a.x - b.x);
  }, []);

  // Optimized collision detection - only check nearby obstacles
  const checkCollision = useCallback(
    (newX, newY) => {
      const playerRect = {
        x: newX,
        y: newY,
        width: PLAYER_SIZE,
        height: PLAYER_SIZE,
      };

      // Binary search to find starting point
      let start = 0;
      let end = levelGeometry.length - 1;

      while (start < end) {
        const mid = Math.floor((start + end) / 2);
        if (levelGeometry[mid].x + levelGeometry[mid].width < newX - 50) {
          start = mid + 1;
        } else {
          end = mid;
        }
      }

      // Check only nearby obstacles
      for (let i = start; i < levelGeometry.length; i++) {
        const obstacle = levelGeometry[i];
        if (obstacle.x > newX + 200) break;

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

  // Canvas-based rendering for better performance
  const renderGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const game = gameRef.current;

    // Clear canvas
    ctx.fillStyle = "#1e1b4b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Simple star background
    ctx.fillStyle = "#ffffff";
    for (let i = 0; i < 20; i++) {
      const x = (((i * 137.508) % 100) * canvas.width) / 100;
      const y = (((i * 73.205) % 100) * canvas.height) / 100;
      ctx.fillRect(x, y, 2, 2);
    }

    // Calculate visible area
    const viewX = game.camera;
    const viewWidth = canvas.width;

    // Render obstacles
    for (const obstacle of levelGeometry) {
      const screenX = obstacle.x - viewX;

      // Skip if not visible
      if (screenX + obstacle.width < 0 || screenX > viewWidth) continue;

      if (obstacle.type === "spike") {
        // Simple triangle for spikes
        ctx.fillStyle = "#7c3aed";
        ctx.beginPath();
        ctx.moveTo(screenX + obstacle.width / 2, obstacle.y);
        ctx.lineTo(screenX, obstacle.y + obstacle.height);
        ctx.lineTo(screenX + obstacle.width, obstacle.y + obstacle.height);
        ctx.closePath();
        ctx.fill();
      } else {
        // Simple rectangles for platforms and ground
        ctx.fillStyle = obstacle.type === "ground" ? "#581c87" : "#7c2d92";
        ctx.fillRect(screenX, obstacle.y, obstacle.width, obstacle.height);

        // Simple border
        ctx.strokeStyle = "#a855f7";
        ctx.lineWidth = 2;
        ctx.strokeRect(screenX, obstacle.y, obstacle.width, obstacle.height);
      }
    }

    // Render player
    const playerScreenX = game.player.x - viewX;
    ctx.fillStyle = "#06b6d4";
    ctx.fillRect(playerScreenX, game.player.y, PLAYER_SIZE, PLAYER_SIZE);

    // Player border and glow effect
    ctx.strokeStyle = "#67e8f9";
    ctx.lineWidth = 2;
    ctx.strokeRect(playerScreenX, game.player.y, PLAYER_SIZE, PLAYER_SIZE);

    // Simple dot in center
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(
      playerScreenX + PLAYER_SIZE / 2 - 2,
      game.player.y + PLAYER_SIZE / 2 - 2,
      4,
      4
    );
  }, [levelGeometry]);

  // Optimized game loop
  const gameLoop = useCallback(() => {
    const now = Date.now();
    const game = gameRef.current;

    if (!game.running) return;

    if (now - game.lastUpdate < UPDATE_INTERVAL) {
      animationRef.current = requestAnimationFrame(gameLoop);
      return;
    }

    game.lastUpdate = now;

    // Physics update
    let newVelY = game.velocity.y + GRAVITY;

    // Jumping
    if (
      (game.keys[" "] ||
        game.keys["ArrowUp"] ||
        game.keys["w"] ||
        game.keys["W"]) &&
      game.grounded
    ) {
      newVelY = JUMP_FORCE;
      game.grounded = false;
    }

    // Calculate new position
    const newX = game.player.x + game.velocity.x;
    const newY = game.player.y + newVelY;

    // Collision detection
    const collision = checkCollision(newX, newY);

    if (collision) {
      if (collision.type === "spike") {
        game.running = false;
        setGameState((prev) => ({ ...prev, running: false, over: true }));
        return;
      }

      // Platform collision
      if (collision.type === "ground" || collision.type === "platform") {
        if (newVelY > 0 && game.player.y + PLAYER_SIZE <= collision.y + 5) {
          // Landing on top
          game.player.x = newX;
          game.player.y = collision.y - PLAYER_SIZE;
          newVelY = 0;
          game.grounded = true;
        } else if (
          newVelY < 0 &&
          game.player.y >= collision.y + collision.height - 5
        ) {
          // Hitting from below
          game.player.x = newX;
          game.player.y = collision.y + collision.height;
          newVelY = 0;
        } else {
          // Side collision - game over
          game.running = false;
          setGameState((prev) => ({ ...prev, running: false, over: true }));
          return;
        }
      }
    } else {
      // No collision - update both x and y
      game.player.x = newX;
      game.player.y = newY;
      game.grounded = false;
    }

    // Update velocity
    game.velocity.y = newVelY;

    // Update camera
    game.camera = Math.max(0, game.player.x - 200);

    // Check bounds
    if (game.player.y > 600 || game.player.y < -50) {
      game.running = false;
      setGameState((prev) => ({ ...prev, running: false, over: true }));
      return;
    }

    // Update React state less frequently
    const distance = Math.max(0, game.player.x - 100);
    if (Math.floor(now / 100) !== Math.floor((now - UPDATE_INTERVAL) / 100)) {
      setGameState((prev) => ({ ...prev, distance }));
    }

    // Render
    renderGame();

    // Victory condition
    if (distance > 6000) {
      game.running = false;
      setGameState((prev) => ({ ...prev, running: false, distance }));
      return;
    }

    animationRef.current = requestAnimationFrame(gameLoop);
  }, [checkCollision, renderGame, JUMP_FORCE]);

  // Input handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      gameRef.current.keys[e.key] = true;
      if (
        e.key === " " ||
        e.key === "ArrowUp" ||
        e.key === "w" ||
        e.key === "W"
      ) {
        e.preventDefault();
        if (!gameState.running && !gameState.over) {
          startGame();
        }
      }
    };

    const handleKeyUp = (e) => {
      gameRef.current.keys[e.key] = false;
    };

    const handleClick = () => {
      if (!gameState.running && !gameState.over) {
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
  }, [gameState.running, gameState.over]);

  // Game loop effect
  useEffect(() => {
    if (gameState.running) {
      gameRef.current.running = true;
      gameRef.current.lastUpdate = 0;
      gameLoop();
    } else {
      gameRef.current.running = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameState.running, gameLoop]);

  const startGame = () => {
    gameRef.current.player = { x: 100, y: 300 };
    gameRef.current.velocity = { x: BASE_SPEED, y: 0 };
    gameRef.current.camera = 0;
    gameRef.current.grounded = false;
    gameRef.current.keys = {};

    setGameState((prev) => ({
      ...prev,
      running: true,
      over: false,
      distance: 0,
    }));
  };

  const resetGame = () => {
    gameRef.current.player = { x: 100, y: 300 };
    gameRef.current.velocity = { x: BASE_SPEED, y: 0 };
    gameRef.current.camera = 0;
    gameRef.current.grounded = false;
    gameRef.current.keys = {};

    setGameState((prev) => ({
      running: false,
      over: false,
      distance: 0,
      attempts: prev.attempts + 1,
    }));
  };

  // Handle XP when game ends with victory
  useEffect(() => {
    if (gameState.distance > 6000 && !gameState.running && !gameState.over) {
      handleXP();
    }
  }, [gameState.distance, gameState.running, gameState.over, handleXP]);

  // Canvas resize effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;

      // Always render the initial state when canvas is resized
      if (!gameState.running) {
        // Render static scene with player at starting position
        const ctx = canvas.getContext("2d");

        // Clear canvas
        ctx.fillStyle = "#1e1b4b";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Simple star background
        ctx.fillStyle = "#ffffff";
        for (let i = 0; i < 20; i++) {
          const x = (((i * 137.508) % 100) * canvas.width) / 100;
          const y = (((i * 73.205) % 100) * canvas.height) / 100;
          ctx.fillRect(x, y, 2, 2);
        }

        // Render obstacles (starting area)
        for (const obstacle of levelGeometry) {
          if (obstacle.x > 1500) break; // Only render starting area

          if (obstacle.type === "spike") {
            ctx.fillStyle = "#7c3aed";
            ctx.beginPath();
            ctx.moveTo(obstacle.x + obstacle.width / 2, obstacle.y);
            ctx.lineTo(obstacle.x, obstacle.y + obstacle.height);
            ctx.lineTo(
              obstacle.x + obstacle.width,
              obstacle.y + obstacle.height
            );
            ctx.closePath();
            ctx.fill();
          } else {
            ctx.fillStyle = obstacle.type === "ground" ? "#581c87" : "#7c2d92";
            ctx.fillRect(
              obstacle.x,
              obstacle.y,
              obstacle.width,
              obstacle.height
            );

            ctx.strokeStyle = "#a855f7";
            ctx.lineWidth = 2;
            ctx.strokeRect(
              obstacle.x,
              obstacle.y,
              obstacle.width,
              obstacle.height
            );
          }
        }

        // Render player at starting position
        ctx.fillStyle = "#06b6d4";
        ctx.fillRect(100, 300, PLAYER_SIZE, PLAYER_SIZE);

        ctx.strokeStyle = "#67e8f9";
        ctx.lineWidth = 2;
        ctx.strokeRect(100, 300, PLAYER_SIZE, PLAYER_SIZE);

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(
          100 + PLAYER_SIZE / 2 - 2,
          300 + PLAYER_SIZE / 2 - 2,
          4,
          4
        );
      } else {
        renderGame();
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [renderGame, gameState.running, levelGeometry]);

  return (
    <div className="flex flex-col items-center p-4 bg-gradient-to-br from-black via-purple-950 to-indigo-950 min-h-screen font-mono relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating geometric shapes */}
        <div className="absolute top-10 left-10 text-4xl text-purple-400 opacity-20 animate-pulse font-mono">
          ◆
        </div>
        <div className="absolute top-20 right-20 text-3xl text-blue-500 opacity-30 animate-bounce font-mono">
          ★
        </div>
        <div className="absolute bottom-32 left-20 text-4xl text-purple-400 opacity-25 animate-pulse font-mono">
          ◇
        </div>
        <div className="absolute bottom-20 right-32 text-3xl text-indigo-500 opacity-20 animate-bounce font-mono">
          ♦
        </div>
        <div className="absolute top-1/3 left-1/4 text-2xl text-purple-400 opacity-20 animate-bounce font-mono">
          ▲
        </div>
        <div className="absolute top-2/3 right-1/4 text-3xl text-blue-500 opacity-30 animate-pulse font-mono">
          ●
        </div>

        {/* Grid background */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-16 h-full">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="border-r border-purple-300"></div>
            ))}
          </div>
          <div className="absolute inset-0 grid grid-rows-12">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-b border-purple-300 w-full"></div>
            ))}
          </div>
        </div>

        {/* Scan lines effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="h-full w-full opacity-5"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 3px, #a855f7 3px, #a855f7 6px)",
            }}
          ></div>
        </div>
      </div>

      {/* Title with enhanced styling */}
      <div className="mb-6 text-center relative z-10">
        <div className="bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 backdrop-blur-sm p-6 border-4 border-purple-400 shadow-2xl relative">
          {/* Corner decorations */}
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-purple-500"></div>
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-purple-500"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-purple-500"></div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-purple-500"></div>

          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-2 animate-pulse">
            🚀 SPACE GEOMETRY DASH 🚀
          </h1>
          <p className="text-blue-200 text-lg font-mono">
            Navigate through the cosmic debris field!
          </p>

          {/* Glowing underline */}
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-3 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Enhanced Stats Panel */}
      <div className="mb-6 flex gap-6 text-blue-200 bg-black/60 backdrop-blur-sm p-4 border-2 border-purple-400 rounded-lg shadow-2xl relative z-10">
        {/* Corner accents */}
        <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400"></div>
        <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400"></div>
        <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400"></div>
        <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400"></div>

        <div className="flex items-center space-x-2">
          <span className="text-2xl">📊</span>
          <div>
            <div className="text-cyan-300 font-bold">Distance</div>
            <div className="text-yellow-300 text-xl">
              {Math.round(gameState.distance)}m
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🎯</span>
          <div>
            <div className="text-cyan-300 font-bold">Attempts</div>
            <div className="text-yellow-300 text-xl">{gameState.attempts}</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-2xl">⚡</span>
          <div>
            <div className="text-cyan-300 font-bold">Status</div>
            <div
              className={`text-xl font-bold ${
                gameState.running
                  ? "text-green-400"
                  : gameState.over
                  ? "text-red-400"
                  : "text-yellow-400"
              }`}
            >
              {gameState.running
                ? "FLYING"
                : gameState.over
                ? "CRASHED"
                : "READY"}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Instructions */}
      {!gameState.running && !gameState.over && (
        <div className="mb-6 text-center text-blue-200 bg-gradient-to-br from-purple-900/80 via-blue-900/80 to-indigo-900/80 backdrop-blur-sm p-6 border-2 border-cyan-400 rounded-lg shadow-2xl relative z-10 max-w-2xl">
          {/* Animated border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 rounded-lg opacity-30 animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-indigo-900/90 rounded-lg p-6 m-1">
            <div className="text-2xl mb-4 animate-bounce">🎮</div>
            <p className="font-bold text-cyan-300 text-xl mb-3">
              HOW TO NAVIGATE THE VOID:
            </p>
            <div className="space-y-2 text-sm">
              <p className="flex items-center justify-center space-x-2">
                <span className="text-yellow-400">⌨️</span>
                <span>
                  Press{" "}
                  <kbd className="bg-purple-700 px-2 py-1 rounded">
                    SPACEBAR
                  </kbd>
                  , <kbd className="bg-purple-700 px-2 py-1 rounded">W</kbd>,{" "}
                  <kbd className="bg-purple-700 px-2 py-1 rounded">↑</kbd>, or{" "}
                  <kbd className="bg-purple-700 px-2 py-1 rounded">CLICK</kbd>{" "}
                  to jump
                </span>
              </p>
              <p className="flex items-center justify-center space-x-2">
                <span className="text-red-400">⚠️</span>
                <span>
                  Avoid the{" "}
                  <span className="text-purple-400 font-bold">
                    purple spikes
                  </span>
                  ! Land on platforms safely!
                </span>
              </p>
              <p className="flex items-center justify-center space-x-2">
                <span className="text-green-400">🎯</span>
                <span>
                  Reach <span className="text-yellow-400 font-bold">6000m</span>{" "}
                  to complete the mission!
                </span>
              </p>
            </div>
            <div className="mt-4 p-3 bg-yellow-900/50 border border-yellow-400 rounded">
              <p className="text-yellow-300 font-bold animate-pulse">
                🚀 Press any key or click to launch!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Game Over Screen */}
      {gameState.over && (
        <div className="mb-6 text-center bg-gradient-to-br from-red-900/90 via-orange-900/90 to-red-900/90 backdrop-blur-sm p-6 border-2 border-red-400 rounded-lg shadow-2xl relative z-10 max-w-md">
          {/* Glitch effect border */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-lg opacity-50 animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-red-900/95 via-orange-900/95 to-red-900/95 rounded-lg p-6 m-1">
            {/* Animated explosion icon */}
            <div className="text-6xl mb-4 animate-bounce">💥</div>
            <p className="font-bold text-red-300 text-3xl mb-3 animate-pulse">
              SYSTEM FAILURE!
            </p>
            <div className="bg-black/50 border border-red-400 p-3 rounded mb-4">
              <p className="text-orange-300">
                Distance traveled:{" "}
                <span className="text-yellow-400 font-bold">
                  {Math.round(gameState.distance)}m
                </span>
              </p>
              <p className="text-red-200">
                Mission status:{" "}
                <span className="text-red-400 font-bold">TERMINATED</span>
              </p>
            </div>
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105 border-2 border-red-400 shadow-lg relative"
            >
              {/* Button corner decorations */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-red-300"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-red-300"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-red-300"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-red-300"></div>
              🔄 RESTART MISSION
            </button>
          </div>
        </div>
      )}

      {/* Enhanced Game Canvas */}
      <div
        className="relative border-4 border-purple-600 bg-black overflow-hidden shadow-2xl rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-500/50"
        style={{
          width: "80vw",
          height: "60vh",
          maxWidth: "1000px",
          maxHeight: "600px",
        }}
        onClick={() => {
          if (!gameState.running && !gameState.over) startGame();
        }}
      >
        {/* Glowing border effect */}
        <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-cyan-600 to-purple-600 rounded-lg opacity-30 animate-pulse pointer-events-none"></div>

        {/* Corner decorations for canvas */}
        <div className="absolute -top-3 -left-3 w-6 h-6 border-t-4 border-l-4 border-cyan-400 z-10"></div>
        <div className="absolute -top-3 -right-3 w-6 h-6 border-t-4 border-r-4 border-cyan-400 z-10"></div>
        <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-4 border-l-4 border-cyan-400 z-10"></div>
        <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-4 border-r-4 border-cyan-400 z-10"></div>

        <canvas
          ref={canvasRef}
          className="w-full h-full relative z-0"
          style={{ imageRendering: "pixelated" }}
        />

        {/* Enhanced progress bar overlay */}
        <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm border-2 border-purple-400 rounded-lg p-3 shadow-lg">
          {/* Progress bar with gradient */}
          <div className="w-full bg-gray-700 rounded-full h-3 mb-2 border border-gray-600">
            <div
              className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300 relative overflow-hidden"
              style={{
                width: `${Math.min(100, (gameState.distance / 6000) * 100)}%`,
              }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between items-center text-sm">
            <div className="text-cyan-300 font-bold">
              Progress: {Math.round((gameState.distance / 6000) * 100)}%
            </div>
            <div className="text-purple-300">
              {Math.round(gameState.distance)}/6000m
            </div>
          </div>
        </div>

        {/* Speed indicator */}
        {gameState.running && (
          <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm border border-green-400 rounded px-3 py-2">
            <div className="text-green-400 text-sm font-bold flex items-center space-x-2">
              <span className="animate-pulse">⚡</span>
              <span>ACTIVE</span>
            </div>
          </div>
        )}
      </div>

      {/* Victory Peter message */}
      {gameState.distance > 6000 && !gameState.running && (
        <>
          {!hidePeter2 && (
            <div className="fixed top-1/2 right-40    transform -translate-y-1/2 z-50 backdrop-blur-sm">
              <Peter
                slides={peterSlides}
                imageSrc="/AIHappy.png"
                className="relative "
              />
              <button
                onClick={() => setHidePeter2(true)}
                className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110 border-2 border-red-300"
              >
                ✕
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SpaceGeometryDash;
