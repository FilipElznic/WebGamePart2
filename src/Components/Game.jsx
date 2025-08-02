import { useState, useEffect, useCallback } from "react";
import { useUserData } from "./UserDataProvider";
import Peter from "./Peter.jsx";

function Game() {
  const [gameState, setGameState] = useState({
    level: 1,
    toolPosition: { x: 1, y: 1 },
    isMoving: false,
    switchesActivated: [],
    gameWon: false,
    gameOver: false,
    moves: 0,
  });

  const [hidePeter, setHidePeter] = useState(false);

  // Get user data for XP handling
  const { addXPForTask, userXP } = useUserData();

  const handleXP = useCallback(async () => {
    try {
      if (userXP === 400) {
        const result = await addXPForTask(100); // Add 100 XP
        console.log("Gravity Magnet Maze completed!");
        if (result.success) {
          console.log("XP added successfully:", result.newXP);
        } else {
          console.error("Failed to add XP:", result.error);
          if (result.error.includes("already has XP")) {
            console.log("Maze completed! (XP already earned)");
          } else {
            console.log("Maze completed! (XP update failed)");
          }
        }
      } else if (userXP === 500) {
        console.log("Game finished! (XP already earned)");
      }
    } catch (error) {
      console.error("Failed to add XP:", error);
    }
  }, [userXP, addXPForTask]);

  // Handle XP when game is won
  useEffect(() => {
    if (gameState.gameWon) {
      handleXP();
    }
  }, [gameState.gameWon, handleXP]);

  const peterSlides = [
    {
      title: "Excellent work!",
      description:
        "You've successfully retrieved the Flux Stabilizer! That's the last critical component we needed. Let's plug it in and get this engine running again. We're almost ready to return to frozen sleep!",
    },
  ];

  // Level configurations
  const levels = {
    1: {
      name: "Tutorial Maze",
      grid: [
        ["W", "W", "W", "W", "W", "W", "W"],
        ["W", "S", ".", ".", ".", "G", "W"],
        ["W", ".", ".", ".", ".", ".", "W"],
        ["W", ".", ".", "W", ".", ".", "W"],
        ["W", ".", ".", ".", ".", ".", "W"],
        ["W", "W", "W", "W", "W", "W", "W"],
      ],
      description:
        "Learn to control the magnetic fields. Guide the tool to the glowing terminal!",
    },
    2: {
      name: "Blocked Maze",
      grid: [
        ["W", "W", "W", "W", "W", "W", "W", "W"],
        ["W", "S", ".", "W", ".", ".", "G", "W"],
        ["W", ".", ".", "W", ".", "W", ".", "W"],
        ["W", ".", "W", "W", ".", "W", ".", "W"],
        ["W", ".", ".", ".", ".", ".", ".", "W"],
        ["W", "W", "W", "W", "W", "W", "W", "W"],
      ],
      description:
        "Navigate around walls. Think ahead - the tool slides until it hits something!",
    },
    3: {
      name: "Hazard Maze",
      grid: [
        ["W", "W", "W", "W", "W", "W", "W", "W"],
        ["W", "S", ".", "E", ".", ".", "G", "W"],
        ["W", ".", ".", "E", ".", "E", ".", "W"],
        ["W", ".", "E", "E", "E", "E", ".", "W"],
        ["W", ".", ".", ".", ".", ".", ".", "W"],
        ["W", "W", "W", "W", "W", "W", "W", "W"],
      ],
      description:
        "Avoid electric zones (red tiles)! They'll destroy the tool on contact.",
    },
    4: {
      name: "Switch Puzzle",
      grid: [
        ["W", "W", "W", "W", "W", "W", "W", "W", "W"],
        ["W", "S", ".", ".", "D", ".", ".", "G", "W"],
        ["W", ".", ".", "W", "D", "W", ".", ".", "W"],
        ["W", ".", "W", "W", "D", "W", "W", ".", "W"],
        ["W", ".", ".", ".", "T", ".", ".", ".", "W"],
        ["W", "W", "W", "W", "W", "W", "W", "W", "W"],
      ],
      description:
        "Hit the switch (yellow) to open the doors blocking your path!",
    },
  };

  const currentLevel = levels[gameState.level];

  // Get tile type at position
  const getTileAt = (x, y) => {
    if (
      y < 0 ||
      y >= currentLevel.grid.length ||
      x < 0 ||
      x >= currentLevel.grid[0].length
    ) {
      return "W"; // Wall
    }
    let tile = currentLevel.grid[y][x];

    // Check if door should be open
    if (
      tile === "D" &&
      gameState.switchesActivated.includes(`${gameState.level}-switch`)
    ) {
      return "."; // Open door
    }

    return tile;
  };

  // Move tool in direction
  const moveTool = useCallback(
    (direction) => {
      if (gameState.isMoving || gameState.gameOver || gameState.gameWon) return;

      setGameState((prev) => ({ ...prev, isMoving: true }));

      const directions = {
        up: { x: 0, y: -1 },
        down: { x: 0, y: 1 },
        left: { x: -1, y: 0 },
        right: { x: 1, y: 0 },
      };

      const delta = directions[direction];
      let newX = gameState.toolPosition.x;
      let newY = gameState.toolPosition.y;

      // Slide until hitting obstacle
      while (true) {
        const nextX = newX + delta.x;
        const nextY = newY + delta.y;
        const nextTile = getTileAt(nextX, nextY);

        if (nextTile === "W") break; // Hit wall

        newX = nextX;
        newY = nextY;

        const currentTile = getTileAt(newX, newY);

        // Check for hazards
        if (currentTile === "E") {
          setGameState((prev) => ({
            ...prev,
            toolPosition: { x: newX, y: newY },
            gameOver: true,
            isMoving: false,
          }));
          return;
        }

        // Check for goal
        if (currentTile === "G") {
          setTimeout(() => {
            if (gameState.level < Object.keys(levels).length) {
              setGameState((prev) => ({
                ...prev,
                level: prev.level + 1,
                toolPosition: findStartPosition(levels[prev.level + 1]),
                switchesActivated: [],
                moves: 0,
                isMoving: false,
              }));
            } else {
              setGameState((prev) => ({
                ...prev,
                gameWon: true,
                isMoving: false,
              }));
            }
          }, 300);
          break;
        }

        // Check for switch
        if (currentTile === "T") {
          setGameState((prev) => ({
            ...prev,
            switchesActivated: [
              ...prev.switchesActivated,
              `${prev.level}-switch`,
            ],
          }));
        }
      }

      setTimeout(() => {
        setGameState((prev) => ({
          ...prev,
          toolPosition: { x: newX, y: newY },
          moves: prev.moves + 1,
          isMoving: false,
        }));
      }, 300);
    },
    [
      gameState.toolPosition,
      gameState.isMoving,
      gameState.gameOver,
      gameState.gameWon,
      gameState.level,
      gameState.switchesActivated,
      getTileAt,
      levels,
    ]
  );

  // Find start position in level
  const findStartPosition = (level) => {
    for (let y = 0; y < level.grid.length; y++) {
      for (let x = 0; x < level.grid[y].length; x++) {
        if (level.grid[y][x] === "S") {
          return { x, y };
        }
      }
    }
    return { x: 1, y: 1 };
  };

  // Reset current level
  const resetLevel = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      toolPosition: findStartPosition(currentLevel),
      gameOver: false,
      switchesActivated: [],
      moves: 0,
      isMoving: false,
    }));
  }, [currentLevel]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key.toLowerCase()) {
        case "w":
        case "arrowup":
          e.preventDefault();
          moveTool("up");
          break;
        case "s":
        case "arrowdown":
          e.preventDefault();
          moveTool("down");
          break;
        case "a":
        case "arrowleft":
          e.preventDefault();
          moveTool("left");
          break;
        case "d":
        case "arrowright":
          e.preventDefault();
          moveTool("right");
          break;
        case "r":
          e.preventDefault();
          resetLevel();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [moveTool, resetLevel]);

  // Initialize tool position
  useEffect(() => {
    setGameState((prev) => ({
      ...prev,
      toolPosition: findStartPosition(currentLevel),
    }));
  }, [currentLevel]);

  // Render tile
  const renderTile = (tile, x, y) => {
    const isToolHere =
      gameState.toolPosition.x === x && gameState.toolPosition.y === y;
    const isSwitchActivated = gameState.switchesActivated.includes(
      `${gameState.level}-switch`
    );

    let tileClass =
      "w-12 h-12 border border-gray-600 flex items-center justify-center text-sm font-bold relative transition-all duration-300";
    let content = "";

    switch (tile) {
      case "W":
        tileClass += " bg-gray-800 border-gray-600";
        break;
      case ".":
        tileClass += " bg-gray-900 border-gray-700";
        break;
      case "S":
        tileClass += " bg-blue-900 border-blue-600";
        content = "🚀";
        break;
      case "G":
        tileClass += " bg-green-900 border-green-500 animate-pulse";
        content = "⭐";
        break;
      case "E":
        tileClass += " bg-red-900 border-red-600 animate-pulse";
        content = "⚡";
        break;
      case "D":
        if (isSwitchActivated) {
          tileClass += " bg-gray-900 border-gray-700";
        } else {
          tileClass += " bg-yellow-800 border-yellow-600";
          content = "🚪";
        }
        break;
      case "T":
        tileClass += isSwitchActivated
          ? " bg-green-800 border-green-500"
          : " bg-yellow-900 border-yellow-500";
        content = "🔘";
        break;
      default:
        tileClass += " bg-gray-900 border-gray-700";
    }

    return (
      <div key={`${x}-${y}`} className={tileClass}>
        {content}
        {isToolHere && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50 flex items-center justify-center text-black text-xs font-bold">
              🧲
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-2 text-cyan-300">
            🧲 Gravity Magnet Maze
          </h1>
          <p className="text-gray-300 mb-4">
            Control magnetic fields to guide the tool through the maze
          </p>

          {/* Level Info */}
          <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
            <h2 className="text-xl font-semibold text-yellow-300 mb-2">
              Level {gameState.level}: {currentLevel.name}
            </h2>
            <p className="text-sm text-gray-300 mb-2">
              {currentLevel.description}
            </p>
            <div className="flex justify-center gap-4 text-sm">
              <span className="text-blue-300">Moves: {gameState.moves}</span>
              <span className="text-green-300">
                Switches: {gameState.switchesActivated.length}
              </span>
            </div>
          </div>
        </div>

        {/* Game Grid */}
        <div className="flex justify-center mb-6">
          <div
            className="grid gap-1 p-4 bg-gray-800/30 rounded-lg border-2 border-cyan-500/30"
            style={{
              gridTemplateColumns: `repeat(${currentLevel.grid[0].length}, 1fr)`,
            }}
          >
            {currentLevel.grid.map((row, y) =>
              row.map((tile, x) => renderTile(tile, x, y))
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="text-center mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-md mx-auto mb-4">
            <button
              onClick={() => moveTool("up")}
              disabled={gameState.isMoving}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              ↑ Up (W)
            </button>
            <button
              onClick={() => moveTool("down")}
              disabled={gameState.isMoving}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              ↓ Down (S)
            </button>
            <button
              onClick={() => moveTool("left")}
              disabled={gameState.isMoving}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              ← Left (A)
            </button>
            <button
              onClick={() => moveTool("right")}
              disabled={gameState.isMoving}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              → Right (D)
            </button>
          </div>

          <button
            onClick={resetLevel}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition-colors mr-2"
          >
            🔄 Reset (R)
          </button>
        </div>

        {/* Legend */}
        <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold mb-2 text-center">Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center text-black">
                🧲
              </div>
              <span>Tool</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-900 border border-blue-600 flex items-center justify-center">
                🚀
              </div>
              <span>Start</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-900 border border-green-500 flex items-center justify-center">
                ⭐
              </div>
              <span>Goal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-900 border border-red-600 flex items-center justify-center">
                ⚡
              </div>
              <span>Electric</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-yellow-900 border border-yellow-500 flex items-center justify-center">
                🔘
              </div>
              <span>Switch</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-yellow-800 border border-yellow-600 flex items-center justify-center">
                🚪
              </div>
              <span>Door</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-800 border border-gray-600"></div>
              <span>Wall</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-900 border border-gray-700"></div>
              <span>Empty</span>
            </div>
          </div>
        </div>

        {/* Game Over Screen */}
        {gameState.gameOver && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-red-900 border-2 border-red-500 rounded-lg p-8 text-center max-w-md mx-4">
              <div className="text-6xl mb-4">💥</div>
              <h2 className="text-3xl font-bold text-red-300 mb-4">
                SYSTEM FAILURE!
              </h2>
              <p className="text-lg mb-6">
                The tool was destroyed by the electric field. The magnetic
                systems need recalibration.
              </p>
              <button
                onClick={resetLevel}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition-colors"
              >
                🔄 Try Again
              </button>
            </div>
          </div>
        )}

        {/* Victory Screen */}
        {gameState.gameWon && !hidePeter && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <Peter
              slides={peterSlides}
              imageSrc="/AIHappy.png"
              className="relative"
            />
            <button
              onClick={() => setHidePeter(true)}
              className="absolute top-1/4 right-1/4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-lg"
            >
              ✕
            </button>
          </div>
        )}

        {/* Instructions */}
        <div className="text-center text-gray-400 text-sm">
          <p>
            Use WASD or Arrow Keys to control magnetic fields • Press R to reset
            level
          </p>
          <p className="mt-1">
            Guide the tool to the goal while avoiding electric zones!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Game;
