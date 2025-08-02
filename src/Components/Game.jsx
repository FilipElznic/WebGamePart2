import { useState, useEffect, useCallback, useMemo } from "react";
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
      if (userXP === 500) {
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
      } else if (userXP === 600) {
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
        "You've completed all the levels! Let's get this engine running again. So we can complete the mission. You have earned 100xp, and you can now access the final stage.",
    },
  ];

  // Level configurations
  const levels = useMemo(
    () => ({
      1: {
        name: "Tutorial Maze",
        grid: [
          ["W", "W", "W", "W", "W", "W", "W"],
          ["W", "S", ".", "W", "W", "G", "W"],
          ["W", ".", ".", "W", "W", ".", "W"],
          ["W", "W", ".", "W", ".", ".", "W"],
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
          ["W", "S", ".", "W", "E", ".", ".", "W"],
          ["W", ".", ".", ".", ".", "W", ".", "W"],
          ["W", "W", "W", "W", ".", "W", ".", "W"],
          ["W", "T", ".", ".", ".", "W", "G", "W"],
          ["W", "W", "W", "W", "W", "W", "W", "W"],
        ],
        description:
          "Navigate around walls. Think ahead - the tool slides until it hits something!",
      },
      3: {
        name: "Electric Fields",
        grid: [
          ["W", "W", "W", "W", "W", "W", "W", "W"],
          ["W", "S", ".", "W", ".", ".", ".", "W"],
          ["W", ".", ".", "E", "G", "E", ".", "W"],
          ["W", ".", "E", "E", "E", "E", ".", "W"],
          ["W", ".", ".", ".", ".", ".", ".", "W"],
          ["W", "W", "W", "W", "W", "W", "W", "W"],
        ],
        description:
          "Avoid electric zones (red tiles)! They'll destroy the tool on contact.",
      },
      4: {
        name: "Switch Control",
        grid: [
          ["W", "W", "W", "W", "W", "W", "W", "W", "W"],
          ["W", "S", ".", ".", "W", "W", ".", ".", "W"],
          ["W", "W", "T", ".", ".", "W", "G", ".", "W"],
          ["W", "W", "W", "W", "E", "W", "W", ".", "W"],
          ["W", ".", ".", ".", "E", ".", ".", ".", "W"],
          ["W", "W", "W", "W", "W", "W", "W", "W", "W"],
        ],
        description:
          "Hit the switch to disable the electric field and reach the goal!",
      },
      5: {
        name: "Electric Maze",
        grid: [
          ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W"],
          ["W", "S", ".", "W", "E", "W", ".", ".", ".", "W"],
          ["W", "E", ".", "W", ".", "E", ".", "W", ".", "W"],
          ["W", ".", ".", "E", "W", "E", "W", "W", ".", "W"],
          ["W", ".", "W", ".", ".", ".", "W", "G", ".", "W"],
          ["W", ".", "E", ".", "W", ".", "W", ".", ".", "W"],
          ["W", "T", "W", ".", ".", ".", "W", ".", ".", "W"],
          ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W"],
        ],
        description:
          "Complex electric field maze! Use the switch to clear a safe path.",
      },
      6: {
        name: "Double Switch",
        grid: [
          ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"],
          ["W", "S", "W", "E", ".", ".", "E", "W", ".", "G", "W"],
          ["W", ".", ".", "E", ".", ".", "E", "W", ".", ".", "W"],
          ["W", ".", "E", "E", "E", "T", "E", "E", "E", ".", "W"],
          ["W", ".", ".", ".", ".", ".", ".", "W", ".", ".", "W"],
          ["W", "W", "E", "E", ".", "T", ".", ".", "E", "W", "W"],
          ["W", ".", "W", "W", "W", ".", ".", ".", ".", ".", "W"],
          ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"],
        ],
        description:
          "Two switches control different electric zones. Plan your route carefully!",
      },
      7: {
        name: "Electric Gauntlet",
        grid: [
          ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"],
          ["W", "S", ".", ".", "W", "E", "E", "W", ".", ".", ".", "W"],
          ["W", "W", "E", ".", "E", ".", ".", "E", "G", "W", ".", "W"],
          ["W", ".", ".", ".", ".", ".", "W", "E", "W", "W", ".", "W"],
          ["W", ".", "E", ".", ".", ".", "T", ".", ".", "W", ".", "W"],
          ["W", ".", "E", ".", "E", ".", ".", "E", "E", "E", ".", "W"],
          ["W", ".", ".", ".", "W", ".", ".", "W", ".", ".", ".", "W"],
          ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"],
        ],
        description:
          "Navigate through the electric gauntlet! One switch controls everything.",
      },
    }),
    []
  );

  const currentLevel = levels[gameState.level];

  // Find start position in level
  const findStartPosition = useCallback((level) => {
    for (let y = 0; y < level.grid.length; y++) {
      for (let x = 0; x < level.grid[y].length; x++) {
        if (level.grid[y][x] === "S") {
          return { x, y };
        }
      }
    }
    return { x: 1, y: 1 };
  }, []);

  // Move tool in direction
  const moveTool = useCallback(
    (direction) => {
      setGameState((currentState) => {
        if (
          currentState.isMoving ||
          currentState.gameOver ||
          currentState.gameWon
        ) {
          return currentState;
        }

        const directions = {
          up: { x: 0, y: -1 },
          down: { x: 0, y: 1 },
          left: { x: -1, y: 0 },
          right: { x: 1, y: 0 },
        };

        const delta = directions[direction];
        let newX = currentState.toolPosition.x;
        let newY = currentState.toolPosition.y;
        let newSwitchesActivated = [...currentState.switchesActivated];

        const currentLevel = levels[currentState.level];

        const getTileAtPosition = (x, y) => {
          if (
            y < 0 ||
            y >= currentLevel.grid.length ||
            x < 0 ||
            x >= currentLevel.grid[0].length
          ) {
            return "W"; // Wall
          }
          let tile = currentLevel.grid[y][x];

          // Check if electric field should be disabled by switch
          if (
            tile === "E" &&
            newSwitchesActivated.includes(`${currentState.level}-switch`)
          ) {
            return "."; // Disabled electric field becomes empty space
          }

          return tile;
        };

        // Set moving state first
        const movingState = { ...currentState, isMoving: true };

        // Slide until hitting obstacle
        while (true) {
          const nextX = newX + delta.x;
          const nextY = newY + delta.y;
          const nextTile = getTileAtPosition(nextX, nextY);

          if (nextTile === "W") break; // Hit wall

          newX = nextX;
          newY = nextY;

          const currentTile = getTileAtPosition(newX, newY);

          // Check for hazards
          if (currentTile === "E") {
            return {
              ...currentState,
              toolPosition: { x: newX, y: newY },
              gameOver: true,
              isMoving: false,
            };
          }

          // Check for goal
          if (currentTile === "G") {
            setTimeout(() => {
              if (currentState.level < Object.keys(levels).length) {
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
            newSwitchesActivated.push(`${currentState.level}-switch`);
          }
        }

        // Schedule position update
        setTimeout(() => {
          setGameState((prev) => ({
            ...prev,
            toolPosition: { x: newX, y: newY },
            moves: prev.moves + 1,
            isMoving: false,
            switchesActivated: newSwitchesActivated,
          }));
        }, 300);

        return { ...movingState, switchesActivated: newSwitchesActivated };
      });
    },
    [levels, findStartPosition]
  );

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
  }, [currentLevel, findStartPosition]);

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
  }, [currentLevel, findStartPosition]);

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
        if (isSwitchActivated) {
          // Electric field disabled by switch
          tileClass += " bg-gray-900 border-gray-700 opacity-50";
          content = "⚡";
        } else {
          // Active electric field
          tileClass += " bg-red-900 border-red-600 animate-pulse";
          content = "⚡";
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
              <span>Electric Field</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-yellow-900 border border-yellow-500 flex items-center justify-center">
                🔘
              </div>
              <span>Switch</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-900 border border-gray-700 opacity-50 flex items-center justify-center">
                ⚡
              </div>
              <span>Disabled Field</span>
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
              className="absolute z-50 top-1/4 right-1/7 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-lg"
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
            Hit switches to disable electric fields and reach the goal safely!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Game;
