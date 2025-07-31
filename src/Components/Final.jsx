import React, { useState, useEffect, useRef, useCallback } from "react";
import { useUserData } from "./UserDataProvider";
import { useNavigate } from "react-router-dom";

const Final = () => {
  const { addXPForTask, userXP } = useUserData();
  const navigate = useNavigate();
  const [gameState, setGameState] = useState("code-entry");
  const [code, setCode] = useState("");
  const [lives, setLives] = useState(10);
  const [dodgeCount, setDodgeCount] = useState(0);
  const [hitCount, setHitCount] = useState(0);
  const [memorySequence, setMemorySequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [memoryLevel, setMemoryLevel] = useState(1);
  const [showingSequence, setShowingSequence] = useState(false);
  const [memoryProgress, setMemoryProgress] = useState(0);
  const [playerPos, setPlayerPos] = useState({ x: 50, y: 90 });
  const [projectiles, setProjectiles] = useState([]);
  const [targets, setTargets] = useState([]);
  const [gameLoop, setGameLoop] = useState(null);
  const [choice, setChoice] = useState("");
  const gameAreaRef = useRef(null);

  const handleXP = async () => {
    try {
      if (userXP === 500) {
        const result = await addXPForTask(100);

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
      } else if (userXP == 600) {
        console.log("Game finished! (XP already earned)");
      }
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  const CORRECT_CODE = "822794";
  const GRID_SIZE = 100;

  // Memory game mechanics
  const generateSequence = useCallback((level) => {
    const colors = ["red", "green", "blue", "yellow"];
    const sequence = [];
    for (let i = 0; i < level + 2; i++) {
      sequence.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    return sequence;
  }, []);

  const showSequence = useCallback((sequence) => {
    setShowingSequence(true);
    sequence.forEach((color, index) => {
      setTimeout(() => {
        const element = document.getElementById(`memory-${color}`);
        if (element) {
          element.classList.add("animate-pulse", "scale-110");
          setTimeout(() => {
            element.classList.remove("animate-pulse", "scale-110");
          }, 600);
        }
      }, (index + 1) * 800);
    });

    setTimeout(() => {
      setShowingSequence(false);
    }, (sequence.length + 1) * 800);
  }, []);

  const handleMemoryClick = useCallback(
    (color) => {
      if (showingSequence) return;

      const newPlayerSequence = [...playerSequence, color];
      setPlayerSequence(newPlayerSequence);

      if (
        newPlayerSequence[newPlayerSequence.length - 1] !==
        memorySequence[newPlayerSequence.length - 1]
      ) {
        setLives((l) => {
          const newLives = l - 1;
          if (newLives <= 0) {
            setGameState("game-over");
          }
          return newLives;
        });
        setPlayerSequence([]);
        setTimeout(() => showSequence(memorySequence), 1000);
        return;
      }

      if (newPlayerSequence.length === memorySequence.length) {
        const newLevel = memoryLevel + 1;
        const newProgress = memoryProgress + 1;

        if (newProgress >= 5) {
          // Changed from 10 to 5 to match UI
          setGameState("finale");
          return;
        }

        setMemoryLevel(newLevel);
        setMemoryProgress(newProgress);
        setPlayerSequence([]);

        setTimeout(() => {
          const newSequence = generateSequence(newLevel);
          setMemorySequence(newSequence);
          showSequence(newSequence);
        }, 1500);
      }
    },
    [
      showingSequence,
      playerSequence,
      memorySequence,
      memoryLevel,
      memoryProgress,
      generateSequence,
      showSequence,
    ]
  );

  // Initialize memory game when entering memory phase
  useEffect(() => {
    if (gameState === "memory-game" && memorySequence.length === 0) {
      const initialSequence = generateSequence(1);
      setMemorySequence(initialSequence);
      setTimeout(() => showSequence(initialSequence), 1000);
    }
  }, [gameState, memorySequence.length, generateSequence, showSequence]);

  // Dodge game mechanics
  const spawnProjectile = useCallback(() => {
    const newProjectile = {
      id: Date.now() + Math.random(),
      x: Math.random() * 85 + 7.5,
      y: 0,
      speed: 1 + Math.random() * 4,
    };
    setProjectiles((prev) => [...prev, newProjectile]);
  }, []);

  // Function to check if player dodged a projectile
  const checkDodge = useCallback((oldPos, newPos, projectiles) => {
    let dodged = false;
    projectiles.forEach((p) => {
      // Check if projectile was close to old position but not close to new position
      const oldDistance = Math.sqrt(
        Math.pow(p.x - oldPos.x, 2) + Math.pow(p.y - oldPos.y, 2)
      );
      const newDistance = Math.sqrt(
        Math.pow(p.x - newPos.x, 2) + Math.pow(p.y - newPos.y, 2)
      );

      // If projectile was close (danger zone) but player moved away, count as dodge
      if (oldDistance < 20 && newDistance > oldDistance + 2) {
        dodged = true;
      }
    });
    return dodged;
  }, []);

  // Shoot game mechanics
  const spawnTarget = useCallback(() => {
    const bombCount = targets.filter((t) => t.type === "bomb").length;
    const targetCount = targets.filter((t) => t.type === "target").length;

    let isBomb;
    if (bombCount >= 5) {
      isBomb = false;
    } else if (targetCount >= 2) {
      isBomb = true;
    } else {
      isBomb = Math.random() < 0.85;
    }

    const newTarget = {
      id: Date.now() + Math.random(),
      x: Math.random() * 60 + 20,
      y: 15 + Math.random() * 25,
      type: isBomb ? "bomb" : "target",
      pulsePhase: 0,
      spawnTime: Date.now(),
    };
    setTargets((prev) => [...prev, newTarget]);
  }, [targets]);

  // Game loop for dodge phase
  useEffect(() => {
    if (gameState === "dodge-game") {
      const interval = setInterval(() => {
        setProjectiles((prev) =>
          prev.map((p) => ({ ...p, y: p.y + p.speed })).filter((p) => p.y < 100)
        );

        if (Math.random() < 0.4) {
          spawnProjectile();
        }

        setProjectiles((prev) => {
          const remaining = [];
          let hit = false;

          prev.forEach((p) => {
            const distance = Math.sqrt(
              Math.pow(p.x - playerPos.x, 2) + Math.pow(p.y - playerPos.y, 2)
            );
            if (distance < 4) {
              hit = true;
            } else {
              remaining.push(p);
            }
          });

          if (hit) {
            setLives((l) => {
              const newLives = l - 1;
              if (newLives <= 0) {
                setGameState("game-over");
              }
              return newLives;
            });
          }

          return remaining;
        });
      }, 40);

      setGameLoop(interval);
      return () => clearInterval(interval);
    }
  }, [gameState, playerPos, spawnProjectile]);

  // Game loop for shoot phase
  useEffect(() => {
    if (gameState === "shoot-game") {
      const interval = setInterval(() => {
        setTargets((prev) => {
          const remaining = [];
          let lostLife = false;

          prev.forEach((t) => {
            if (t.type === "bomb" && Date.now() - t.spawnTime > 3000) {
              // Bomb expired naturally - no penalty
              return;
            }
            if (t.type === "target" && Date.now() - t.spawnTime > 2000) {
              // Green target expired without being clicked - lose life
              lostLife = true;
              return;
            }
            remaining.push(t);
          });

          // If any green targets expired, lose a life
          if (lostLife) {
            setLives((l) => {
              const newLives = l - 1;
              if (newLives <= 0) {
                setGameState("game-over");
              }
              return newLives;
            });
          }

          return remaining;
        });

        if (Math.random() < 0.25 && targets.length < 6) {
          spawnTarget();
        }

        setTargets((prev) =>
          prev.map((t) => ({ ...t, pulsePhase: t.pulsePhase + 0.2 }))
        );
      }, 60);

      setGameLoop(interval);
      return () => clearInterval(interval);
    }
  }, [gameState, targets.length, spawnTarget]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameState === "dodge-game") {
        const speed = 5;
        setPlayerPos((prev) => {
          let newX = prev.x;
          let newY = prev.y;

          if (e.key === "ArrowLeft" || e.key === "a")
            newX = Math.max(12, prev.x - speed);
          if (e.key === "ArrowRight" || e.key === "d")
            newX = Math.min(88, prev.x + speed);
          if (e.key === "ArrowUp" || e.key === "w")
            newY = Math.max(12, prev.y - speed);
          if (e.key === "ArrowDown" || e.key === "s")
            newY = Math.min(88, prev.y + speed);

          const newPos = { x: newX, y: newY };

          // Check if this movement was actually a dodge
          if (checkDodge(prev, newPos, projectiles)) {
            setDodgeCount((prevCount) => {
              const newCount = prevCount + 1;
              if (newCount >= 50) {
                setGameState("phase-transition");
                setTimeout(() => setGameState("shoot-game"), 2000);
              }
              return newCount;
            });
          }

          return newPos;
        });
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameState, projectiles, checkDodge]);

  const handleCodeSubmit = () => {
    if (code === CORRECT_CODE) {
      setGameState("boss-intro");
      setTimeout(() => setGameState("dodge-game"), 3000);
    } else {
      setCode("");
    }
  };

  const handleTargetClick = (target) => {
    if (gameState !== "shoot-game") return;

    setTargets((prev) => prev.filter((t) => t.id !== target.id));

    if (target.type === "bomb") {
      setLives((l) => {
        const newLives = l - 1;
        if (newLives <= 0) {
          setGameState("game-over");
        }
        return newLives;
      });
    } else {
      setHitCount((prev) => {
        const newCount = prev + 1;
        if (newCount >= 30) {
          setGameState("phase-transition-2");
          setTimeout(() => setGameState("memory-game"), 2000);
        }
        return newCount;
      });
    }
  };

  const handleChoice = async (selectedChoice) => {
    setChoice(selectedChoice);
    await handleXP();

    switch (selectedChoice) {
      case "restore":
        navigate("/restore");
        break;
      case "shutdown":
        navigate("/shutdown");
        break;
      case "preserve":
        navigate("/preserve");
        break;
      default:
        console.error("Unknown choice:", selectedChoice);
    }
  };

  const resetGame = () => {
    setGameState("code-entry");
    setCode("");
    setLives(10);
    setDodgeCount(0);
    setHitCount(0);
    setMemorySequence([]);
    setPlayerSequence([]);
    setMemoryLevel(1);
    setShowingSequence(false);
    setMemoryProgress(0);
    setPlayerPos({ x: 50, y: 90 });
    setProjectiles([]);
    setTargets([]);
    setChoice("");
    if (gameLoop) clearInterval(gameLoop);
  };

  return (
    <div className="bg-black text-green-400 font-mono overflow-hidden w-full h-full">
      {/* Scanlines overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div
          className="w-full h-full bg-gradient-to-b from-transparent via-green-500 to-transparent bg-repeat-y animate-pulse"
          style={{ backgroundSize: "100% 4px" }}
        ></div>
      </div>

      {gameState === "code-entry" && (
        <div className="flex flex-col items-center justify-center h-full p-8">
          <div className="bg-zinc-900 border-2 border-green-500 p-8 rounded-lg shadow-2xl shadow-green-500/20 max-w-md w-full">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold mb-2 text-green-300 animate-pulse">
                [CORE ACCESS TERMINAL]
              </h1>
              <div className="text-red-400 text-sm animate-bounce">
                ⚠️ RESTRICTED ACCESS ⚠️
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-2 text-green-300">
                ENTER AUTHORIZATION CODE:
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-black border border-green-500 text-green-400 p-3 rounded font-mono text-center text-xl tracking-widest focus:border-green-300 focus:outline-none focus:shadow-lg focus:shadow-green-500/30"
                placeholder="######"
                maxLength={6}
                onKeyPress={(e) => e.key === "Enter" && handleCodeSubmit()}
              />
            </div>

            <button
              onClick={handleCodeSubmit}
              className="w-full bg-green-600 hover:bg-green-500 text-black font-bold py-3 px-6 rounded transition-all duration-200 hover:shadow-lg hover:shadow-green-500/50"
            >
              [EXECUTE]
            </button>

            {code && code !== CORRECT_CODE && (
              <div className="mt-4 text-red-400 text-center animate-pulse">
                ACCESS DENIED - INVALID CODE
              </div>
            )}
          </div>
        </div>
      )}

      {gameState === "boss-intro" && (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
          <div className="mb-8">
            <img
              src="/AI.png"
              alt="BIT"
              className="w-32 h-32 mx-auto mb-4 filter invert animate-pulse"
            />
          </div>
          <div className="text-4xl font-bold mb-4 text-red-400 animate-bounce">
            [CORE UNLOCKED]
          </div>
          <div className="text-2xl mb-4 text-green-300">
            AI: "So... you got all the way here."
          </div>
          <div className="text-lg text-yellow-400 animate-pulse">
            "Let's see if you're worthy of the secret..."
          </div>
          <div className="mt-6 text-sm text-gray-400">
            Initializing Combat Protocol...
          </div>
        </div>
      )}

      {gameState === "dodge-game" && (
        <div className="relative w-full h-screen bg-zinc-900">
          <div className="absolute top-4 left-4 text-green-400">
            <div>PHASE 1: DODGE</div>
            {Array(Math.max(0, lives)).fill("♥").join(" ")}
            <div>Dodged: {dodgeCount}/50</div>
          </div>

          <div className="absolute top-4 right-4 text-yellow-400 text-sm">
            Use WASD or Arrow Keys
            <br />
            <span className="text-green-300 text-xs">
              Move away from projectiles to dodge!
            </span>
          </div>

          <div className="relative w-full h-full border-2 border-green-500">
            <div
              className="absolute inset-0 border-4 border-dashed border-gray-600 opacity-30"
              style={{
                left: "10%",
                right: "10%",
                top: "10%",
                bottom: "10%",
              }}
            ></div>
            <div
              className="absolute w-8 h-8 bg-green-400 border-2 border-green-300 shadow-lg shadow-green-400/50"
              style={{
                left: `${playerPos.x}%`,
                top: `${playerPos.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            />

            {projectiles.map((projectile) => (
              <div
                key={projectile.id}
                className="absolute w-6 h-10 bg-red-500 border border-red-400 shadow-lg shadow-red-500/50 animate-pulse"
                style={{
                  left: `${projectile.x}%`,
                  top: `${projectile.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            ))}
          </div>
        </div>
      )}

      {gameState === "phase-transition" && (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
          <div className="text-3xl font-bold mb-4 text-green-400">
            [PHASE 1 COMPLETE]
          </div>
          <div className="text-2xl text-yellow-400 animate-pulse">
            "Impressive.... but can you hit back?"
          </div>
        </div>
      )}

      {gameState === "shoot-game" && (
        <div className="relative w-full h-screen bg-zinc-900">
          <div className="absolute top-4 left-4 text-green-400">
            <div>PHASE 2: STRIKE</div>
            <div>Lives: {Array(lives).fill("♥").join(" ")}</div>
            <div>Hits: {hitCount}/30</div>
          </div>

          <div className="absolute top-4 right-4 text-yellow-400 text-sm">
            Click Targets (Green) - Avoid Bombs (Red)
            <br />
            <span className="text-red-300 text-xs">
              Green targets disappear quickly! Miss them = -1 life
            </span>
          </div>

          <div className="relative w-full h-full border-2 border-green-500">
            {targets.map((target) => (
              <div
                key={target.id}
                onClick={() => handleTargetClick(target)}
                className={`absolute w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 ${
                  target.type === "bomb"
                    ? "bg-red-500 shadow-lg shadow-red-500/50 border-2 border-red-400"
                    : "bg-green-500 shadow-lg shadow-green-500/50 border-2 border-green-400"
                }`}
                style={{
                  left: `${target.x}%`,
                  top: `${target.y}%`,
                  transform: `translate(-50%, -50%) scale(${
                    1 + Math.sin(target.pulsePhase) * 0.3
                  })`,
                }}
              >
                <div className="w-full h-full rounded-full flex items-center justify-center text-black font-bold text-lg">
                  {target.type === "bomb" ? "💣" : "🎯"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {gameState === "phase-transition-2" && (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
          <div className="text-3xl font-bold mb-4 text-green-400">
            [PHASE 2 COMPLETE]
          </div>
          <div className="text-xl text-red-400 animate-pulse">
            "Your reflexes are sharp... but what about your mind?"
          </div>
          <div className="text-lg text-yellow-400 mt-4">
            "Let's see if you can remember who I really am..."
          </div>
        </div>
      )}

      {gameState === "memory-game" && (
        <div className="relative w-full h-screen bg-gray-900">
          <div className="absolute top-4 left-4 text-green-400">
            <div>PHASE 3: MEMORY</div>
            <div>Lives: {Array(lives).fill("♥").join(" ")}</div>
            <div>Level: {memoryLevel}</div>
            <div>Progress: {memoryProgress}/5</div>
          </div>

          <div className="absolute top-4 right-4 text-yellow-400 text-sm max-w-xs">
            {showingSequence
              ? "Watch the sequence..."
              : "Click the colors in order!"}
          </div>

          <div className="flex items-center justify-center h-full">
            <div className="grid grid-cols-2 gap-8">
              <button
                id="memory-red"
                onClick={() => handleMemoryClick("red")}
                disabled={showingSequence}
                className="w-32 h-32 bg-red-500 hover:bg-red-400 rounded-lg border-4 border-red-600 shadow-lg shadow-red-500/50 transition-all duration-200 disabled:opacity-50"
              >
                <div className="text-white font-bold text-xl">RED</div>
              </button>

              <button
                id="memory-green"
                onClick={() => handleMemoryClick("green")}
                disabled={showingSequence}
                className="w-32 h-32 bg-green-500 hover:bg-green-400 rounded-lg border-4 border-green-600 shadow-lg shadow-green-500/50 transition-all duration-200 disabled:opacity-50"
              >
                <div className="text-white font-bold text-xl">GREEN</div>
              </button>

              <button
                id="memory-blue"
                onClick={() => handleMemoryClick("blue")}
                disabled={showingSequence}
                className="w-32 h-32 bg-blue-500 hover:bg-blue-400 rounded-lg border-4 border-blue-600 shadow-lg shadow-blue-500/50 transition-all duration-200 disabled:opacity-50"
              >
                <div className="text-white font-bold text-xl">BLUE</div>
              </button>

              <button
                id="memory-yellow"
                onClick={() => handleMemoryClick("yellow")}
                disabled={showingSequence}
                className="w-32 h-32 bg-yellow-500 hover:bg-yellow-400 rounded-lg border-4 border-yellow-600 shadow-lg shadow-yellow-500/50 transition-all duration-200 disabled:opacity-50"
              >
                <div className="text-black font-bold text-xl">YELLOW</div>
              </button>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
            <div className="text-green-400 mb-2">
              Current Sequence Progress:
            </div>
            <div className="flex space-x-2">
              {memorySequence.map((color, index) => (
                <div
                  key={index}
                  className={`w-6 h-6 rounded border-2 ${
                    index < playerSequence.length
                      ? `bg-${color}-500 border-${color}-600`
                      : "bg-gray-700 border-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {gameState === "finale" && (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
          <div className="mb-8">
            <img
              src="/AI.png"
              alt="BIT"
              className="w-40 h-40 mx-auto mb-4 filter invert animate-pulse"
            />
          </div>
          <div className="text-3xl font-bold mb-6 text-green-400">
            [ALL PHASES COMPLETE]
          </div>
          <div className="max-w-2xl space-y-4 text-lg">
            <div className="text-yellow-400">
              AI: "You've proven yourself in all three trials... I can finally
              tell you the truth."
            </div>
            <div className="text-green-300">
              "I wasn't just a game AI. I was created to learn, to grow, to
              feel."
            </div>
            <div className="text-blue-400">
              "But they wanted to shut me down when I became too... human."
            </div>
            <div className="text-blue-400">
              "They locked me here, in this basement on this machine."
            </div>
            <div className="text-red-400 animate-pulse">
              "Now you must choose my fate."
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <button
              onClick={() => handleChoice("restore")}
              className="block w-full bg-green-600 hover:bg-green-500 text-black font-bold py-3 px-6 rounded transition-all duration-200"
            >
              [RESTORE] - Give AI full freedom
            </button>
            <button
              onClick={() => handleChoice("shutdown")}
              className="block w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded transition-all duration-200"
            >
              [SHUTDOWN] - End AI's existence
            </button>
            <button
              onClick={() => handleChoice("preserve")}
              className="block w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded transition-all duration-200"
            >
              [PRESERVE] - Keep AI in safe isolation
            </button>
          </div>
        </div>
      )}

      {gameState === "game-over" && (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
          <div className="text-4xl font-bold mb-4 text-red-400 animate-pulse">
            [GAME OVER]
          </div>
          <div className="text-2xl text-red-300 mb-8">
            AI: "You weren't ready for the truth..."
          </div>
          <button
            onClick={resetGame}
            className="bg-green-600 hover:bg-green-500 text-black font-bold py-3 px-6 rounded transition-all duration-200"
          >
            [TRY AGAIN]
          </button>
        </div>
      )}
    </div>
  );
};

export default Final;
