import { useState, useEffect, useCallback, useRef, useMemo } from "react";

function SpaceGeometryDash() {
  const [gameState, setGameState] = useState({
    running: false,
    over: false,
    distance: 0,
    attempts: 0,
  });

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
  const UPDATE_INTERVAL = 16; // ~60fps

  // Simplified level geometry with spatial indexing
  const levelGeometry = useMemo(() => {
    const obstacles = [
      // Starting area
      { x: 0, y: GROUND_HEIGHT, width: 1600, height: 50, type: "ground" },

      // First spike section
      { x: 1400, y: GROUND_HEIGHT, width: 500, height: 50, type: "ground" },
      { x: 1300, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
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
      { x: 2200, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 2280, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 2340, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },

      // Ceiling section with top and bottom spikes
      { x: 2400, y: GROUND_HEIGHT, width: 600, height: 50, type: "ground" },
      { x: 2400, y: 200, width: 600, height: 50, type: "ground" }, // Ceiling - moved down
      { x: 2450, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 2520, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 2590, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 2450, y: 250, width: 20, height: 30, type: "spike" }, // Ceiling spikes - moved down
      { x: 2520, y: 250, width: 20, height: 30, type: "spike" },
      { x: 2590, y: 250, width: 20, height: 30, type: "spike" },
      { x: 2660, y: 250, width: 20, height: 30, type: "spike" },
      { x: 2730, y: 250, width: 20, height: 30, type: "spike" },
      { x: 2800, y: 250, width: 20, height: 30, type: "spike" },

      // Complex platform jumps with alternating spikes
      { x: 3000, y: GROUND_HEIGHT, width: 100, height: 50, type: "ground" },
      { x: 3150, y: 330, width: 80, height: 20, type: "platform" },
      { x: 3180, y: 320, width: 15, height: 10, type: "spike" },
      { x: 3280, y: 280, width: 80, height: 20, type: "platform" },
      { x: 3310, y: 270, width: 15, height: 10, type: "spike" },
      { x: 3410, y: 320, width: 80, height: 20, type: "platform" },
      { x: 3440, y: 310, width: 15, height: 10, type: "spike" },
      { x: 3540, y: 300, width: 80, height: 20, type: "platform" },

      // Narrow platforms section
      { x: 3700, y: GROUND_HEIGHT, width: 100, height: 50, type: "ground" },
      { x: 3850, y: 360, width: 40, height: 15, type: "platform" },
      { x: 3950, y: 340, width: 40, height: 15, type: "platform" },
      { x: 4050, y: 320, width: 40, height: 15, type: "platform" },
      { x: 4150, y: 350, width: 40, height: 15, type: "platform" },
      { x: 4250, y: 330, width: 40, height: 15, type: "platform" },

      // Dense spike forest
      { x: 4400, y: GROUND_HEIGHT, width: 800, height: 50, type: "ground" },
      { x: 4420, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 4460, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 4500, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 4540, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 4580, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 4620, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 4660, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 4700, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 4740, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 4780, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 4820, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 4860, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 4900, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 4940, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 4980, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 5020, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 5060, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 5100, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 5140, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },

      // Elevated platform with escape route
      {
        x: 5200,
        y: GROUND_HEIGHT - 80,
        width: 600,
        height: 20,
        type: "platform",
      },
      { x: 5250, y: GROUND_HEIGHT - 110, width: 15, height: 30, type: "spike" },
      { x: 5300, y: GROUND_HEIGHT - 110, width: 15, height: 30, type: "spike" },
      { x: 5350, y: GROUND_HEIGHT - 110, width: 15, height: 30, type: "spike" },
      { x: 5400, y: GROUND_HEIGHT - 110, width: 15, height: 30, type: "spike" },
      { x: 5450, y: GROUND_HEIGHT - 110, width: 15, height: 30, type: "spike" },
      { x: 5500, y: GROUND_HEIGHT - 110, width: 15, height: 30, type: "spike" },
      { x: 5550, y: GROUND_HEIGHT - 110, width: 15, height: 30, type: "spike" },
      { x: 5600, y: GROUND_HEIGHT - 110, width: 15, height: 30, type: "spike" },
      { x: 5650, y: GROUND_HEIGHT - 110, width: 15, height: 30, type: "spike" },
      { x: 5700, y: GROUND_HEIGHT - 110, width: 15, height: 30, type: "spike" },

      // Multi-level platforms section
      { x: 5850, y: GROUND_HEIGHT, width: 150, height: 50, type: "ground" },
      { x: 6050, y: 370, width: 60, height: 15, type: "platform" },
      { x: 6150, y: 340, width: 60, height: 15, type: "platform" },
      { x: 6250, y: 310, width: 60, height: 15, type: "platform" },
      { x: 6350, y: 280, width: 60, height: 15, type: "platform" },
      { x: 6450, y: 250, width: 60, height: 15, type: "platform" },
      { x: 6550, y: 220, width: 60, height: 15, type: "platform" },
      { x: 6650, y: 190, width: 60, height: 15, type: "platform" },

      // Staircase with spikes
      { x: 6750, y: 160, width: 80, height: 15, type: "platform" },
      { x: 6780, y: 150, width: 15, height: 10, type: "spike" },
      { x: 6850, y: 130, width: 80, height: 15, type: "platform" },
      { x: 6880, y: 120, width: 15, height: 10, type: "spike" },
      { x: 6950, y: 100, width: 80, height: 15, type: "platform" },
      { x: 6980, y: 90, width: 15, height: 10, type: "spike" },

      // Maze-like section
      { x: 7100, y: GROUND_HEIGHT, width: 800, height: 50, type: "ground" },
      { x: 7100, y: 200, width: 800, height: 50, type: "ground" }, // Upper ceiling
      { x: 7150, y: 350, width: 80, height: 50, type: "platform" },
      { x: 7180, y: 340, width: 15, height: 10, type: "spike" },
      { x: 7280, y: 320, width: 80, height: 50, type: "platform" },
      { x: 7310, y: 310, width: 15, height: 10, type: "spike" },
      { x: 7410, y: 290, width: 80, height: 50, type: "platform" },
      { x: 7440, y: 280, width: 15, height: 10, type: "spike" },
      { x: 7540, y: 270, width: 80, height: 50, type: "platform" },
      { x: 7570, y: 260, width: 15, height: 10, type: "spike" },
      { x: 7670, y: 250, width: 80, height: 50, type: "platform" },
      { x: 7700, y: 240, width: 15, height: 10, type: "spike" },

      // Final gauntlet
      { x: 7900, y: GROUND_HEIGHT, width: 1000, height: 50, type: "ground" },
      { x: 7920, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 7960, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 8000, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 8040, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 8080, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 8120, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 8160, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 8200, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 8240, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 8280, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 8320, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 8360, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 8400, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 8440, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 8480, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 8520, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 8560, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 8600, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 8640, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 8680, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 8720, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 8760, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },
      { x: 8800, y: GROUND_HEIGHT - 30, width: 20, height: 30, type: "spike" },

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
        // Game over
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

  // Canvas resize effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      renderGame();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [renderGame]);

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
        <div>📊 Distance: {Math.round(gameState.distance)}m</div>
        <div>🎯 Attempts: {gameState.attempts}</div>
        <div>💨 Speed: {BASE_SPEED}m/s</div>
      </div>

      {/* Instructions */}
      {!gameState.running && !gameState.over && (
        <div className="mb-4 text-center text-blue-200 bg-black/50 p-4 border-2 border-blue-400 rounded">
          <p className="font-bold text-blue-300">🎮 HOW TO PLAY:</p>
          <p>Press SPACEBAR, W, UP ARROW, or CLICK to jump</p>
          <p>Avoid the purple spikes! Land on platforms safely!</p>
          <p className="mt-2 text-yellow-300">
            Press any key or click to start!
          </p>
        </div>
      )}

      {/* Game Over Screen */}
      {gameState.over && (
        <div className="mb-4 text-center text-red-200 bg-red-900/80 p-4 border-2 border-red-400 rounded">
          <p className="font-bold text-red-300 text-2xl">💥 CRASHED! 💥</p>
          <p>Distance reached: {Math.round(gameState.distance)}m</p>
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
        className="relative border-4 border-gray-600 bg-black overflow-hidden shadow-2xl rounded cursor-pointer"
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
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ imageRendering: "pixelated" }}
        />

        {/* Progress bar overlay */}
        <div className="absolute bottom-4 left-4 right-4 bg-black/70 border border-blue-400 rounded p-2">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(100, (gameState.distance / 6000) * 100)}%`,
              }}
            />
          </div>
          <div className="text-blue-300 text-sm text-center mt-1">
            Progress: {Math.round((gameState.distance / 6000) * 100)}%
          </div>
        </div>
      </div>

      {/* Victory message */}
      {gameState.distance > 6000 && !gameState.running && (
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
