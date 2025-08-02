import React, { useState, useEffect, useCallback, useRef } from "react";
import { useUserData } from "./UserDataProvider";

function Final() {
  const { addXPForTask, userXP } = useUserData();

  // Main game state
  const [currentStage, setCurrentStage] = useState(0); // 0 = intro, 1-5 = mini-games, 6 = victory
  const [stagesCompleted, setStagesCompleted] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  // Game 1: Access Code Puzzle
  const [codeSequence, setCodeSequence] = useState(["∆", "◇", "□", "◯"]);
  const [playerInput, setPlayerInput] = useState(["", "", "", ""]);
  const [codeAttempts, setCodeAttempts] = useState(100);
  const [codeHints, setCodeHints] = useState([]);

  // Game 2: Wiring System
  const [wireConnections, setWireConnections] = useState({});
  const [wireTimeLeft, setWireTimeLeft] = useState(60);
  const [wireTargets] = useState([
    { id: "A", color: "red", connected: false },
    { id: "B", color: "blue", connected: false },
    { id: "C", color: "green", connected: false },
    { id: "D", color: "yellow", connected: false },
  ]);

  // Game 3: Rhythm Game
  const [rhythmSequence, setRhythmSequence] = useState([]);
  const [rhythmInput, setRhythmInput] = useState([]);
  const [rhythmBeat, setRhythmBeat] = useState(0);
  const [rhythmScore, setRhythmScore] = useState(0);
  const [rhythmMisses, setRhythmMisses] = useState(0);

  // Game 4: Wrench Battle
  const [wrenchHP, setWrenchHP] = useState(100);
  const [bossHP, setBossHP] = useState(100);
  const [playerX, setPlayerX] = useState(50);
  const [wrenchCooldown, setWrenchCooldown] = useState(0);

  // Game 5: Final Sequence
  const [finalSequence, setFinalSequence] = useState([]);
  const [finalInput, setFinalInput] = useState([]);
  const [finalCountdown, setFinalCountdown] = useState(10);
  const [sequenceShowing, setSequenceShowing] = useState(false);

  const intervalRef = useRef(null);

  // Handle XP when all stages complete
  const handleFinalXP = useCallback(async () => {
    try {
      if (userXP === 600) {
        const result = await addXPForTask(100); // Add 100 XP
        console.log("Final Mission completed!");
      }
    } catch (error) {
      console.error("Failed to add XP:", error);
    }
  }, [userXP, addXPForTask]);

  useEffect(() => {
    if (stagesCompleted.length === 5) {
      handleFinalXP();
    }
  }, [stagesCompleted.length, handleFinalXP]);

  // Initialize games
  useEffect(() => {
    if (currentStage === 1) {
      // Initialize code puzzle
      const symbols = ["∆", "◇", "□", "◯", "♦", "★", "▲", "●"];
      const newSequence = Array.from(
        { length: 4 },
        () => symbols[Math.floor(Math.random() * symbols.length)]
      );
      setCodeSequence(newSequence);
      setPlayerInput(["", "", "", ""]);
      setCodeAttempts(100); //testing
      setCodeHints([]);
    } else if (currentStage === 3) {
      // Initialize rhythm game
      const directions = ["↑", "↓", "←", "→"];
      const newSequence = Array.from(
        { length: 8 },
        () => directions[Math.floor(Math.random() * directions.length)]
      );
      setRhythmSequence(newSequence);
      setRhythmInput([]);
      setRhythmBeat(0);
      setRhythmScore(0);
      setRhythmMisses(0);
    } else if (currentStage === 5) {
      // Initialize final sequence
      const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
      const newSequence = Array.from(
        { length: 6 },
        () => colors[Math.floor(Math.random() * colors.length)]
      );
      setFinalSequence(newSequence);
      setFinalInput([]);
      setFinalCountdown(10);
    } else if (currentStage === 4) {
      // Initialize wrench battle
      setWrenchHP(100);
      setBossHP(100);
      setPlayerX(50);
      setWrenchCooldown(0);
    }
  }, [currentStage]);

  // Game 1: Code Puzzle Logic
  const submitCode = () => {
    if (playerInput.some((input) => input === "")) return;

    let correctPositions = 0;
    let correctSymbols = 0;
    const newHints = [];

    playerInput.forEach((symbol, index) => {
      if (symbol === codeSequence[index]) {
        correctPositions++;
        newHints.push(`Position ${index + 1}: ✓`);
      } else if (codeSequence.includes(symbol)) {
        correctSymbols++;
        newHints.push(`Symbol ${symbol} exists but wrong position`);
      }
    });

    if (correctPositions === 4) {
      setStagesCompleted((prev) => [...prev, 1]);
      setCurrentStage(2);
    } else {
      setCodeAttempts((prev) => prev - 1);
      setCodeHints(newHints);
      if (codeAttempts <= 1) {
        // Reset puzzle
        setCodeAttempts(3);
        setPlayerInput(["", "", "", ""]);
        setCodeHints(["Security reset. Try again."]);
      }
    }
  };

  // Game 2: Wiring Logic
  const connectWire = (sourceId, targetId) => {
    setWireConnections((prev) => ({
      ...prev,
      [sourceId]: targetId,
    }));
  };

  const checkWiring = () => {
    const correct =
      Object.keys(wireConnections).length === 4 &&
      wireTargets.every((target) => wireConnections[target.id] === target.id);

    if (correct) {
      setStagesCompleted((prev) => [...prev, 2]);
      setCurrentStage(3);
    }
  };

  // Game 3: Rhythm Game Logic
  const handleRhythmInput = (direction) => {
    const currentBeat = rhythmBeat;
    if (currentBeat < rhythmSequence.length) {
      const correct = direction === rhythmSequence[currentBeat];
      setRhythmInput((prev) => [...prev, direction]);

      if (correct) {
        setRhythmScore((prev) => prev + 10);
      } else {
        setRhythmMisses((prev) => prev + 1);
      }

      setRhythmBeat((prev) => prev + 1);

      if (currentBeat + 1 >= rhythmSequence.length) {
        if (rhythmMisses <= 2) {
          setStagesCompleted((prev) => [...prev, 3]);
          setCurrentStage(4);
        } else {
          // Reset rhythm game
          setRhythmBeat(0);
          setRhythmInput([]);
          setRhythmMisses(0);
          setRhythmScore(0);
        }
      }
    }
  };

  // Game 4: Wrench Battle Logic
  const movePlayer = (direction) => {
    if (!wrenchGameActive) return;

    setPlayerX((prev) => {
      const newX =
        direction === "left" ? Math.max(0, prev - 15) : Math.min(85, prev + 15); // Limit to 85% to account for player width
      return newX;
    });
  };

  const wrenchAttack = () => {
    if (wrenchCooldown > 0 || !wrenchGameActive) return;

    // Check if player is close enough to boss (within 30% of screen)
    if (playerX > 60) {
      setBossHP((prev) => {
        const newHP = Math.max(0, prev - 25);
        if (newHP <= 0) {
          setStagesCompleted((prev) => [...prev, 4]);
          setCurrentStage(5);
          setWrenchGameActive(false);
          setWrenchAlert("BOSS DEFEATED! CORE ACCESS GRANTED!");
        }
        return newHP;
      });
      setWrenchAlert("DIRECT HIT! Boss damaged!");
    } else {
      setWrenchAlert("TOO FAR! Get closer to attack!");
    }

    setWrenchCooldown(40);

    // Clear alert after 2 seconds
    setTimeout(() => setWrenchAlert(""), 2000);
  };

  // Boss attack system
  const bossAttack = useCallback(() => {
    if (!wrenchGameActive || bossAttackCooldown > 0) return;

    // Create projectile targeting player
    const newProjectile = {
      id: Date.now(),
      x: 80, // Boss position
      y: 20,
      targetX: playerX,
      speed: 2,
    };

    setProjectiles((prev) => [...prev, newProjectile]);
    setBossAttackCooldown(60); // Boss attacks every 3 seconds
    setWrenchAlert("INCOMING ATTACK!");

    setTimeout(() => setWrenchAlert(""), 1000);
  }, [wrenchGameActive, bossAttackCooldown, playerX]);

  // Update projectiles and check collisions
  const updateProjectiles = useCallback(() => {
    if (!wrenchGameActive) return;

    setProjectiles((prev) => {
      return prev
        .map((projectile) => ({
          ...projectile,
          y: projectile.y + projectile.speed,
          x: projectile.x + (projectile.targetX - projectile.x) * 0.02, // Homing effect
        }))
        .filter((projectile) => {
          // Check collision with player
          const playerLeft = playerX;
          const playerRight = playerX + 15; // Player width
          const playerTop = 75; // Player position
          const playerBottom = 90;

          const projLeft = projectile.x;
          const projRight = projectile.x + 5;
          const projTop = projectile.y;
          const projBottom = projectile.y + 5;

          // Collision detection
          if (
            projLeft < playerRight &&
            projRight > playerLeft &&
            projTop < playerBottom &&
            projBottom > playerTop
          ) {
            // Player hit!
            setWrenchHP((prevHP) => {
              const newHP = Math.max(0, prevHP - 20);
              if (newHP <= 0) {
                setWrenchGameActive(false);
                setWrenchAlert("GAME OVER! Restarting battle...");
                setTimeout(() => {
                  // Reset battle
                  setWrenchHP(100);
                  setBossHP(100);
                  setPlayerX(50);
                  setProjectiles([]);
                  setWrenchCooldown(0);
                  setBossAttackCooldown(0);
                  setWrenchGameActive(true);
                  setWrenchAlert("");
                }, 3000);
              } else {
                setWrenchAlert(`PLAYER HIT! HP: ${newHP}`);
                setTimeout(() => setWrenchAlert(""), 1500);
              }
              return newHP;
            });
            return false; // Remove projectile
          }

          // Remove projectiles that go off screen
          return projectile.y < 100;
        });
    });
  }, [wrenchGameActive, playerX]);

  // Game 5: Final Sequence Logic
  const submitFinalSequence = () => {
    const correct =
      finalInput.length === finalSequence.length &&
      finalInput.every((color, index) => color === finalSequence[index]);

    if (correct) {
      setStagesCompleted((prev) => [...prev, 5]);
      setCurrentStage(6);
    } else {
      setFinalInput([]);
      setFinalCountdown(10);
    }
  };

  // Timer effects
  useEffect(() => {
    if (currentStage === 2 && wireTimeLeft > 0) {
      const timer = setTimeout(() => setWireTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStage, wireTimeLeft]);

  useEffect(() => {
    if (wrenchCooldown > 0) {
      const timer = setTimeout(
        () => setWrenchCooldown((prev) => prev - 1),
        100
      );
      return () => clearTimeout(timer);
    }
  }, [wrenchCooldown]);

  useEffect(() => {
    if (bossAttackCooldown > 0) {
      const timer = setTimeout(
        () => setBossAttackCooldown((prev) => prev - 1),
        100
      );
      return () => clearTimeout(timer);
    }
  }, [bossAttackCooldown]);

  // Boss attack timer
  useEffect(() => {
    if (wrenchGameActive && bossAttackCooldown === 0) {
      bossAttack();
    }
  }, [wrenchGameActive, bossAttackCooldown, bossAttack]);

  // Projectile update timer
  useEffect(() => {
    if (wrenchGameActive) {
      const interval = setInterval(updateProjectiles, 100);
      return () => clearInterval(interval);
    }
  }, [wrenchGameActive, updateProjectiles]);

  useEffect(() => {
    if (currentStage === 5 && finalCountdown > 0) {
      const timer = setTimeout(
        () => setFinalCountdown((prev) => prev - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [currentStage, finalCountdown]);

  const renderIntro = () => (
    <div className="text-center">
      <div className="bg-gradient-to-br from-purple-800 via-zinc-900 to-purple-950 backdrop-blur-sm p-8 border-4 border-purple-400 shadow-2xl relative mb-8">
        <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-purple-500"></div>
        <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-purple-500"></div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-purple-500"></div>
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-purple-500"></div>

        <h1 className="text-5xl font-mono font-bold text-purple-300 mb-6">
          🧩 FINAL MISSION
        </h1>
        <h2 className="text-3xl font-mono text-yellow-300 mb-4">
          REACTIVATE THE CORE
        </h2>

        <div className="bg-black/50 border-2 border-purple-500 p-6 mb-6">
          <p className="text-lg font-mono text-green-300 mb-4">
            [MISSION BRIEFING]
          </p>
          <p className="text-gray-300 font-mono text-sm leading-relaxed mb-4">
            The ship's core has been damaged. You must complete 5 critical tasks
            to reactivate it:
          </p>
          <div className="text-left space-y-2 text-sm font-mono text-purple-200">
            <div>1. 🔐 DECRYPT ACCESS CODE</div>
            <div>2. ⚡ REWIRE THE GRID</div>
            <div>3. 🎵 CORE BEAT SYNC</div>
            <div>4. 🔧 WRENCH PROTOCOL</div>
            <div>5. 🚀 IGNITION SEQUENCE</div>
          </div>
        </div>

        <button
          onClick={() => {
            setGameStarted(true);
            setCurrentStage(1);
          }}
          className="bg-purple-600 hover:bg-purple-700 border-2 border-purple-500 text-white font-mono font-bold py-4 px-8 text-xl transition-all duration-200 transform hover:scale-105 relative"
        >
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-purple-300"></div>
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-purple-300"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-purple-300"></div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-purple-300"></div>
          [INITIATE MISSION]
        </button>
      </div>
    </div>
  );

  const renderCodePuzzle = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-black border-4 border-green-500 p-6 font-mono">
        <div className="text-green-400 mb-4">
          <div className="text-xl mb-2">&gt; SECURITY TERMINAL ACCESSED</div>
          <div className="text-sm">ATTEMPTS REMAINING: {codeAttempts}</div>
        </div>

        <div className="mb-6">
          <div className="text-green-300 mb-2">ENTER ACCESS SEQUENCE:</div>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {playerInput.map((input, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={input}
                onChange={(e) => {
                  const newInput = [...playerInput];
                  newInput[index] = e.target.value;
                  setPlayerInput(newInput);
                }}
                className="w-16 h-16 bg-black border-2 border-green-500 text-green-400 text-center text-2xl font-mono"
              />
            ))}
          </div>

          <div className="mb-4">
            <div className="text-yellow-300 mb-2">AVAILABLE SYMBOLS:</div>
            <div className="grid grid-cols-4 gap-2">
              {["∆", "◇", "□", "◯", "♦", "★", "▲", "●"].map((symbol) => (
                <button
                  key={symbol}
                  onClick={() => {
                    const emptyIndex = playerInput.findIndex(
                      (input) => input === ""
                    );
                    if (emptyIndex !== -1) {
                      const newInput = [...playerInput];
                      newInput[emptyIndex] = symbol;
                      setPlayerInput(newInput);
                    }
                  }}
                  className="bg-green-900 hover:bg-green-700 border border-green-500 text-green-300 p-2 text-xl"
                >
                  {symbol}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1 text-yellow-300 text-sm mb-4">
            {codeHints.map((hint, index) => (
              <div key={index}>&gt; {hint}</div>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={submitCode}
              className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-4"
            >
              SUBMIT
            </button>
            <button
              onClick={() => setPlayerInput(["", "", "", ""])}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4"
            >
              CLEAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderWiringGame = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-900 border-4 border-yellow-500 p-6">
        <div className="text-center mb-4">
          <h3 className="text-2xl font-mono text-yellow-300 mb-2">
            ⚡ REWIRE THE GRID
          </h3>
          <div className="text-red-400 font-mono text-xl">
            TIME: {wireTimeLeft}s
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-mono text-blue-300 mb-4">
              SOURCE TERMINALS
            </h4>
            {wireTargets.map((target) => (
              <div key={target.id} className="mb-2">
                <button
                  onClick={() => {
                    const targetId = prompt(
                      "Connect to which terminal? (A, B, C, D)"
                    );
                    if (
                      targetId &&
                      ["A", "B", "C", "D"].includes(targetId.toUpperCase())
                    ) {
                      connectWire(target.id, targetId.toUpperCase());
                    }
                  }}
                  className={`w-full p-3 border-2 font-mono font-bold
                    ${target.color === "red" ? "bg-red-600 border-red-400" : ""}
                    ${
                      target.color === "blue"
                        ? "bg-blue-600 border-blue-400"
                        : ""
                    }
                    ${
                      target.color === "green"
                        ? "bg-green-600 border-green-400"
                        : ""
                    }
                    ${
                      target.color === "yellow"
                        ? "bg-yellow-600 border-yellow-400"
                        : ""
                    }
                  `}
                >
                  {target.id} - {target.color.toUpperCase()}
                  {wireConnections[target.id] &&
                    ` → ${wireConnections[target.id]}`}
                </button>
              </div>
            ))}
          </div>

          <div>
            <h4 className="text-lg font-mono text-blue-300 mb-4">
              TARGET TERMINALS
            </h4>
            {wireTargets.map((target) => (
              <div key={`target-${target.id}`} className="mb-2">
                <div
                  className={`w-full p-3 border-2 font-mono font-bold text-center
                  ${target.color === "red" ? "bg-red-900 border-red-400" : ""}
                  ${
                    target.color === "blue" ? "bg-blue-900 border-blue-400" : ""
                  }
                  ${
                    target.color === "green"
                      ? "bg-green-900 border-green-400"
                      : ""
                  }
                  ${
                    target.color === "yellow"
                      ? "bg-yellow-900 border-yellow-400"
                      : ""
                  }
                `}
                >
                  {target.id} - {target.color.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={checkWiring}
            className="bg-green-600 hover:bg-green-700 text-white font-mono font-bold py-3 px-6"
          >
            TEST CONNECTIONS
          </button>
        </div>
      </div>
    </div>
  );

  const renderRhythmGame = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-purple-900 border-4 border-purple-400 p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-mono text-purple-300 mb-2">
            🎵 CORE BEAT SYNC
          </h3>
          <div className="text-white font-mono">
            Beat: {rhythmBeat + 1}/{rhythmSequence.length} | Score:{" "}
            {rhythmScore} | Misses: {rhythmMisses}/3
          </div>
        </div>

        <div className="mb-6">
          <div className="text-center mb-4">
            <div className="text-xl font-mono text-yellow-300">SEQUENCE:</div>
            <div className="text-2xl font-mono space-x-2 p-4 bg-black border border-purple-400">
              {rhythmSequence.map((direction, index) => (
                <span
                  key={index}
                  className={
                    index === rhythmBeat
                      ? "text-yellow-300 animate-pulse"
                      : "text-gray-500"
                  }
                >
                  {direction}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            <button
              onClick={() => handleRhythmInput("↑")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-mono font-bold py-4 px-4 text-2xl"
            >
              ↑
            </button>
            <button
              onClick={() => handleRhythmInput("↓")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-mono font-bold py-4 px-4 text-2xl"
            >
              ↓
            </button>
            <button
              onClick={() => handleRhythmInput("←")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-mono font-bold py-4 px-4 text-2xl"
            >
              ←
            </button>
            <button
              onClick={() => handleRhythmInput("→")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-mono font-bold py-4 px-4 text-2xl"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderWrenchBattle = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-red-900 border-4 border-red-400 p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-mono text-red-300 mb-2">
            🔧 WRENCH PROTOCOL
          </h3>
          <div className="flex justify-center gap-8 text-white font-mono">
            <div
              className={`${wrenchHP < 50 ? "text-red-400 animate-pulse" : ""}`}
            >
              Player HP: {wrenchHP}/100
            </div>
            <div
              className={`${
                bossHP < 50 ? "text-orange-400 animate-pulse" : ""
              }`}
            >
              Boss HP: {bossHP}/100
            </div>
          </div>

          {wrenchAlert && (
            <div className="mt-2 bg-yellow-900 border-2 border-yellow-500 p-2">
              <div className="text-yellow-300 font-mono font-bold animate-pulse">
                ⚠️ {wrenchAlert}
              </div>
            </div>
          )}
        </div>

        <div className="text-center mb-4 text-sm font-mono text-gray-300">
          Get close to the boss (move right) to attack! Dodge incoming
          projectiles!
        </div>

        <div className="relative h-64 bg-black border-2 border-red-500 mb-6 overflow-hidden">
          {/* Player */}
          <div
            className={`absolute bottom-4 w-12 h-12 bg-blue-500 border-2 border-blue-300 transition-all duration-200 flex items-center justify-center text-lg ${
              wrenchHP < 30 ? "animate-pulse" : ""
            }`}
            style={{ left: `${playerX}%` }}
          >
            🔧
          </div>

          {/* Boss */}
          <div
            className={`absolute top-4 right-4 w-20 h-20 bg-red-600 border-2 border-red-400 flex items-center justify-center text-3xl ${
              bossHP < 30 ? "animate-bounce" : ""
            }`}
          >
            🤖
          </div>

          {/* Attack Range Indicator */}
          {playerX > 60 && (
            <div className="absolute right-24 top-4 w-24 h-20 border-2 border-green-500 bg-green-500/20 flex items-center justify-center">
              <span className="text-green-300 font-mono text-xs animate-pulse">
                ATTACK RANGE
              </span>
            </div>
          )}

          {/* Projectiles */}
          {projectiles.map((proj) => (
            <div
              key={proj.id}
              className="absolute w-4 h-4 bg-orange-400 border border-orange-300 rounded-full animate-pulse"
              style={{ left: `${proj.x}%`, top: `${proj.y}%` }}
            >
              💥
            </div>
          ))}

          {/* Danger zones */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-red-500/10 border-t-2 border-red-500">
            <div className="text-center text-red-300 font-mono text-xs mt-1">
              PLAYER ZONE
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          <button
            onClick={() => movePlayer("left")}
            disabled={!wrenchGameActive}
            className={`font-mono font-bold py-3 px-4 ${
              wrenchGameActive
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-600 text-gray-400"
            }`}
          >
            ← MOVE LEFT
          </button>
          <button
            onClick={wrenchAttack}
            disabled={wrenchCooldown > 0 || !wrenchGameActive}
            className={`font-mono font-bold py-3 px-4 ${
              wrenchCooldown > 0 || !wrenchGameActive
                ? "bg-gray-600 text-gray-400"
                : playerX > 60
                ? "bg-green-600 hover:bg-green-700 text-white animate-pulse"
                : "bg-yellow-600 hover:bg-yellow-700 text-white"
            }`}
          >
            🔧 ATTACK{" "}
            {wrenchCooldown > 0 ? `(${Math.ceil(wrenchCooldown / 10)})` : ""}
          </button>
          <button
            onClick={() => movePlayer("right")}
            disabled={!wrenchGameActive}
            className={`font-mono font-bold py-3 px-4 ${
              wrenchGameActive
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-600 text-gray-400"
            }`}
          >
            MOVE RIGHT →
          </button>
        </div>

        <div className="mt-4 text-center text-xs font-mono text-gray-400">
          Boss attacks every 3 seconds • Get within attack range (right side) •
          Avoid projectiles!
        </div>
      </div>
    </div>
  );

  const renderFinalSequence = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-red-900 to-orange-900 border-4 border-orange-500 p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-mono text-orange-300 mb-2">
            🚀 IGNITION SEQUENCE
          </h3>
          <div className="text-white font-mono text-xl animate-pulse">
            COUNTDOWN: {finalCountdown}
          </div>
        </div>

        <div className="mb-6">
          <div className="text-center mb-4">
            <div className="text-lg font-mono text-yellow-300 mb-2">
              MEMORIZE SEQUENCE:
            </div>
            <div className="grid grid-cols-6 gap-2 mb-4">
              {finalSequence.map((color, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 border-2 border-white flex items-center justify-center font-bold
                    ${color === "red" ? "bg-red-500" : ""}
                    ${color === "blue" ? "bg-blue-500" : ""}
                    ${color === "green" ? "bg-green-500" : ""}
                    ${color === "yellow" ? "bg-yellow-500" : ""}
                    ${color === "purple" ? "bg-purple-500" : ""}
                    ${color === "orange" ? "bg-orange-500" : ""}
                  `}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mb-4">
            <div className="text-lg font-mono text-yellow-300 mb-2">
              INPUT SEQUENCE:
            </div>
            <div className="grid grid-cols-6 gap-2 mb-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 border-2 border-gray-400 flex items-center justify-center font-bold
                    ${finalInput[index] === "red" ? "bg-red-500" : ""}
                    ${finalInput[index] === "blue" ? "bg-blue-500" : ""}
                    ${finalInput[index] === "green" ? "bg-green-500" : ""}
                    ${finalInput[index] === "yellow" ? "bg-yellow-500" : ""}
                    ${finalInput[index] === "purple" ? "bg-purple-500" : ""}
                    ${finalInput[index] === "orange" ? "bg-orange-500" : ""}
                    ${!finalInput[index] ? "bg-gray-800" : ""}
                  `}
                >
                  {finalInput[index] ? index + 1 : "?"}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto mb-4">
            {["red", "blue", "green", "yellow", "purple", "orange"].map(
              (color) => (
                <button
                  key={color}
                  onClick={() => {
                    if (finalInput.length < 6) {
                      setFinalInput((prev) => [...prev, color]);
                    }
                  }}
                  className={`py-2 px-3 font-mono font-bold text-white border-2
                  ${color === "red" ? "bg-red-600 border-red-400" : ""}
                  ${color === "blue" ? "bg-blue-600 border-blue-400" : ""}
                  ${color === "green" ? "bg-green-600 border-green-400" : ""}
                  ${color === "yellow" ? "bg-yellow-600 border-yellow-400" : ""}
                  ${color === "purple" ? "bg-purple-600 border-purple-400" : ""}
                  ${color === "orange" ? "bg-orange-600 border-orange-400" : ""}
                `}
                >
                  {color.toUpperCase()}
                </button>
              )
            )}
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={submitFinalSequence}
              className="bg-green-600 hover:bg-green-700 text-white font-mono font-bold py-3 px-6"
            >
              INITIATE
            </button>
            <button
              onClick={() => setFinalInput([])}
              className="bg-red-600 hover:bg-red-700 text-white font-mono font-bold py-3 px-6"
            >
              RESET
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVictory = () => (
    <div className="text-center">
      <div className="bg-gradient-to-br from-green-800 via-blue-900 to-purple-950 backdrop-blur-sm p-8 border-4 border-green-400 shadow-2xl relative mb-8">
        <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-green-500"></div>
        <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-green-500"></div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-green-500"></div>
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-green-500"></div>

        <div className="text-6xl mb-6 animate-pulse">🎉</div>
        <h1 className="text-5xl font-mono font-bold text-green-300 mb-6">
          MISSION ACCOMPLISHED!
        </h1>
        <h2 className="text-3xl font-mono text-yellow-300 mb-4">
          CORE REACTIVATED
        </h2>

        <div className="bg-black/50 border-2 border-green-500 p-6 mb-6">
          <p className="text-lg font-mono text-green-300 mb-4">
            [SYSTEM STATUS: OPERATIONAL]
          </p>
          <p className="text-gray-300 font-mono text-sm leading-relaxed mb-4">
            Congratulations! You have successfully completed all critical tasks
            and reactivated the ship's core. The engine is now online and the
            mission can continue. Well done, Commander!
          </p>
          <div className="text-left space-y-2 text-sm font-mono text-green-200">
            <div>✓ Access Code Decrypted</div>
            <div>✓ Power Grid Rewired</div>
            <div>✓ Core Beat Synchronized</div>
            <div>✓ Wrench Protocol Completed</div>
            <div>✓ Ignition Sequence Initiated</div>
          </div>
        </div>

        <div className="text-purple-300 font-mono text-lg">+100 XP EARNED</div>
      </div>
    </div>
  );

  const renderProgressBar = () => (
    <div className="mb-6">
      <div className="bg-gray-800 border-2 border-purple-400 p-4">
        <div className="text-center font-mono text-purple-300 mb-2">
          MISSION PROGRESS: {stagesCompleted.length}/5
        </div>
        <div className="flex justify-center space-x-2">
          {[1, 2, 3, 4, 5].map((stage) => (
            <div
              key={stage}
              className={`w-8 h-8 border-2 flex items-center justify-center font-mono font-bold
                ${
                  stagesCompleted.includes(stage)
                    ? "bg-green-600 border-green-400 text-white"
                    : currentStage === stage
                    ? "bg-yellow-600 border-yellow-400 text-black animate-pulse"
                    : "bg-gray-600 border-gray-400 text-gray-300"
                }
              `}
            >
              {stage}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-purple-950 text-white p-4">
      <div className="absolute inset-0 pointer-events-none">
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 text-4xl text-purple-400 opacity-20 animate-pulse font-mono">
          ◆
        </div>
        <div className="absolute top-20 right-20 text-3xl text-purple-500 opacity-30 animate-bounce font-mono">
          ★
        </div>
        <div className="absolute bottom-32 left-20 text-4xl text-purple-400 opacity-25 animate-pulse font-mono">
          ◇
        </div>
        <div className="absolute bottom-20 right-32 text-3xl text-purple-500 opacity-20 animate-bounce font-mono">
          ♦
        </div>
        <div className="absolute top-1/3 left-1/4 text-2xl text-purple-400 opacity-20 animate-bounce font-mono">
          ▲
        </div>
        <div className="absolute top-2/3 right-1/4 text-3xl text-purple-500 opacity-30 animate-pulse font-mono">
          ●
        </div>

        {/* Scan lines effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="h-full w-full opacity-5"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 3px, #fbbf24 3px, #fbbf24 6px)",
            }}
          ></div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {!gameStarted && renderIntro()}

        {gameStarted && currentStage < 6 && renderProgressBar()}

        {currentStage === 1 && renderCodePuzzle()}
        {currentStage === 2 && renderWiringGame()}
        {currentStage === 3 && renderRhythmGame()}
        {currentStage === 4 && renderWrenchBattle()}
        {currentStage === 5 && renderFinalSequence()}
        {currentStage === 6 && renderVictory()}
      </div>
    </div>
  );
}

export default Final;
