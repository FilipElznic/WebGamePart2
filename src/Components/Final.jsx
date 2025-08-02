import React, { useState, useEffect, useCallback, useRef } from "react";
import { useUserData } from "./UserDataProvider";
import Peter from "./Peter"; // Assuming Peter is a component for the final stage

function Final() {
  const { addXPForTask, userXP } = useUserData();

  // Main game state
  const [currentStage, setCurrentStage] = useState(0); // 0 = intro, 1-4 = mini-games, 5 = victory
  const [stagesCompleted, setStagesCompleted] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  // Game 1: Access Code Puzzle
  const [codeSequence, setCodeSequence] = useState(["∆", "◇", "□", "◯"]);
  const [playerInput, setPlayerInput] = useState(["", "", "", ""]);
  const [codeAttempts, setCodeAttempts] = useState(3);
  const [codeHints, setCodeHints] = useState([]);

  // Game 2: Wiring System
  const [wireConnections, setWireConnections] = useState({});
  const [wireTimeLeft, setWireTimeLeft] = useState(15);
  const [draggedWire, setDraggedWire] = useState(null);
  const [showWireFailure, setShowWireFailure] = useState(false);
  const [wireTargets] = useState([
    { id: "A", color: "red", connected: false },
    { id: "B", color: "blue", connected: false },
    { id: "C", color: "green", connected: false },
    { id: "D", color: "yellow", connected: false },
  ]);
  const [shuffledTargets] = useState(() => {
    // Create a shuffled copy of wireTargets for random target order
    const shuffled = [
      ...[
        { id: "A", color: "red", connected: false },
        { id: "B", color: "blue", connected: false },
        { id: "C", color: "green", connected: false },
        { id: "D", color: "yellow", connected: false },
      ],
    ];
    // Fisher-Yates shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  });

  // Game 3: Rhythm Game
  const [rhythmSequence, setRhythmSequence] = useState([]);
  const [rhythmInput, setRhythmInput] = useState([]);
  const [rhythmBeat, setRhythmBeat] = useState(0);
  const [rhythmScore, setRhythmScore] = useState(0);
  const [rhythmMisses, setRhythmMisses] = useState(0);
  const [showRhythmFailure, setShowRhythmFailure] = useState(false);

  // Game 4: Final Sequence
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
    if (stagesCompleted.length === 4) {
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
    } else if (currentStage === 2) {
      // Initialize wiring game
      setWireConnections({});
      setWireTimeLeft(15);
      setShowWireFailure(false);
      setDraggedWire(null);
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
      setShowRhythmFailure(false);
    } else if (currentStage === 4) {
      // Initialize final sequence
      const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
      const newSequence = Array.from(
        { length: 6 },
        () => colors[Math.floor(Math.random() * colors.length)]
      );
      setFinalSequence(newSequence);
      setFinalInput([]);
      setFinalCountdown(10);
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
  const handleDragStart = (e, sourceId) => {
    setDraggedWire(sourceId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    if (draggedWire) {
      setWireConnections((prev) => ({
        ...prev,
        [draggedWire]: targetId,
      }));
      setDraggedWire(null);
    }
  };

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
        // Immediate failure on wrong arrow
        setShowRhythmFailure(true);
        return; // Exit early to show popup
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

  // Game 4: Final Sequence Logic
  const submitFinalSequence = () => {
    const correct =
      finalInput.length === finalSequence.length &&
      finalInput.every((color, index) => color === finalSequence[index]);

    if (correct) {
      setStagesCompleted((prev) => [...prev, 4]);
      setCurrentStage(5);
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
    } else if (currentStage === 2 && wireTimeLeft === 0) {
      // Game over - wiring timer reached 0
      setShowWireFailure(true);
    }
  }, [currentStage, wireTimeLeft]);

  useEffect(() => {
    if (currentStage === 4 && finalCountdown > 0) {
      const timer = setTimeout(
        () => setFinalCountdown((prev) => prev - 1),
        1000
      );
      return () => clearTimeout(timer);
    } else if (currentStage === 4 && finalCountdown === 0) {
      // Game over - countdown reached 0
      setFinalInput([]);
      setFinalCountdown(10);
      alert("TIME'S UP! Mission failed. Try again!");
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
            The ship's core has been damaged. You must complete 4 critical tasks
            to reactivate it:
          </p>
          <div className="text-left space-y-2 text-sm font-mono text-purple-200">
            <div>1. 🔐 DECRYPT ACCESS CODE</div>
            <div>2. ⚡ REWIRE THE GRID</div>
            <div>3. 🎵 CORE BEAT SYNC</div>
            <div>4. 🚀 IGNITION SEQUENCE</div>
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
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress Bar integrated into code puzzle */}
      <div className="bg-gray-800 border-2 border-purple-400 p-4">
        <div className="text-center font-mono text-purple-300 mb-2">
          MISSION PROGRESS: {stagesCompleted.length}/4
        </div>
        <div className="flex justify-center space-x-2">
          {[1, 2, 3, 4].map((stage) => (
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

      {/* Security Terminal */}
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

        <div className="text-center mb-4 text-sm font-mono text-gray-300">
          Drag source terminals to matching colored target terminals!
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-mono text-blue-300 mb-4">
              SOURCE TERMINALS
            </h4>
            {wireTargets.map((target) => (
              <div key={target.id} className="mb-2">
                <div
                  draggable
                  onDragStart={(e) => handleDragStart(e, target.id)}
                  className={`w-full p-3 border-2 font-mono font-bold cursor-move transition-transform hover:scale-105 hover:shadow-lg
                    ${
                      target.color === "red"
                        ? "bg-red-600 border-red-400 text-white"
                        : ""
                    }
                    ${
                      target.color === "blue"
                        ? "bg-blue-600 border-blue-400 text-white"
                        : ""
                    }
                    ${
                      target.color === "green"
                        ? "bg-green-600 border-green-400 text-white"
                        : ""
                    }
                    ${
                      target.color === "yellow"
                        ? "bg-yellow-600 border-yellow-400 text-white"
                        : ""
                    }
                    ${draggedWire === target.id ? "opacity-50 rotate-2" : ""}
                  `}
                >
                  🔌 {target.id} - {target.color.toUpperCase()}
                  {wireConnections[target.id] && (
                    <div className="text-green-300 text-sm mt-1">
                      ✓ Connected to {wireConnections[target.id]}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div>
            <h4 className="text-lg font-mono text-blue-300 mb-4">
              TARGET TERMINALS
            </h4>
            {shuffledTargets.map((target) => (
              <div key={`target-${target.id}`} className="mb-2">
                <div
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, target.id)}
                  className={`w-full p-3 border-2 font-mono font-bold text-center transition-all
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
                  ${
                    Object.values(wireConnections).includes(target.id)
                      ? "ring-2 ring-green-500 bg-opacity-75"
                      : "hover:bg-opacity-75"
                  }
                `}
                >
                  {Object.values(wireConnections).includes(target.id)
                    ? "⚡"
                    : "🔳"}{" "}
                  {target.id} - {target.color.toUpperCase()}
                  {Object.values(wireConnections).includes(target.id) && (
                    <div className="text-green-300 text-sm mt-1">
                      ✓ CONNECTED
                    </div>
                  )}
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

        {/* Failure Popup */}
        {showWireFailure && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-red-900 border-4 border-red-500 p-8 max-w-md mx-4 relative">
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-red-400"></div>
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-red-400"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-red-400"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-red-400"></div>

              <div className="text-center">
                <div className="text-4xl mb-4 animate-pulse">⚠️</div>
                <h3 className="text-2xl font-mono font-bold text-red-300 mb-4">
                  SYSTEM FAILURE
                </h3>
                <p className="text-lg font-mono text-red-200 mb-4">
                  TIME'S UP!
                </p>
                <p className="text-sm font-mono text-gray-300 mb-6">
                  The power grid failed to connect in time. The system has
                  overloaded!
                </p>
                <button
                  onClick={() => {
                    setShowWireFailure(false);
                    setWireConnections({});
                    setWireTimeLeft(15);
                    setDraggedWire(null);
                  }}
                  className="bg-yellow-600 hover:bg-yellow-700 border-2 border-yellow-500 text-black font-mono font-bold py-3 px-6 transition-all duration-200 transform hover:scale-105"
                >
                  [TRY AGAIN]
                </button>
              </div>
            </div>
          </div>
        )}
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

        {/* Rhythm Game Failure Popup */}
        {showRhythmFailure && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-purple-900 border-4 border-purple-500 p-8 max-w-md mx-4 relative">
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-purple-400"></div>
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-purple-400"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-purple-400"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-purple-400"></div>

              <div className="text-center">
                <div className="text-4xl mb-4 animate-pulse">🎵</div>
                <h3 className="text-2xl font-mono font-bold text-purple-300 mb-4">
                  SYNCHRONIZATION FAILED
                </h3>
                <p className="text-lg font-mono text-purple-200 mb-4">
                  WRONG SEQUENCE!
                </p>
                <p className="text-sm font-mono text-gray-300 mb-6">
                  Core synchronization failed. The rhythm sequence was
                  incorrect!
                </p>
                <button
                  onClick={() => {
                    setShowRhythmFailure(false);
                    setRhythmBeat(0);
                    setRhythmInput([]);
                    setRhythmMisses(0);
                    setRhythmScore(0);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 border-2 border-blue-500 text-white font-mono font-bold py-3 px-6 transition-all duration-200 transform hover:scale-105"
                >
                  [TRY AGAIN]
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderFinalSequence = () => (
    <div className="max-w-2xl mx-auto flex flex-col space-y-6">
      {/* Mission Progress integrated into final sequence */}
      <div className="bg-gray-800 border-2 border-purple-400 p-4">
        <div className="text-center font-mono text-purple-300 mb-2">
          MISSION PROGRESS: {stagesCompleted.length}/4
        </div>
        <div className="flex justify-center space-x-2">
          {[1, 2, 3, 4].map((stage) => (
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

      {/* Ignition Sequence */}
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
            <div>✓ Ignition Sequence Initiated</div>
          </div>
        </div>

        <div className="text-purple-300 font-mono text-lg mb-6">
          +100 XP EARNED
        </div>

        {/* Final Stats Display */}
        <div className="bg-black/30 border border-purple-400 p-4 mb-6 rounded">
          <h3 className="text-yellow-300 font-mono text-lg mb-3">
            MISSION STATISTICS
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm font-mono">
            <div className="text-blue-300">
              <div>Tasks Completed: 4/4</div>
              <div>Success Rate: 100%</div>
            </div>
            <div className="text-green-300">
              <div>Status: ELITE</div>
              <div>Rank: COMMANDER</div>
            </div>
          </div>
        </div>

        {/* Character celebration */}
        <div className="mb-6">
          <Peter
            slides={[
              {
                title: "Mission Complete!",
                description:
                  "Amazing work! You've saved the ship and completed all the challenges. I knew you could do it!",
              },
              {
                title: "What's Next?",
                description:
                  "The core is online and we're ready for the next phase of our journey. Thank you for your incredible skills!",
              },
            ]}
            imageSrc="/peterHappy.png"
          />
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              window.location.href = "/subtitles";
            }}
            className="bg-purple-600 hover:bg-purple-700 border-2 border-purple-500 text-white font-mono font-bold py-3 px-6 text-lg transition-all duration-200 transform hover:scale-105 relative"
          >
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-purple-300"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-purple-300"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-purple-300"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-purple-300"></div>
            [FINAL SUBTITLES]
          </button>
        </div>
      </div>
    </div>
  );

  const renderProgressBar = () => (
    <div className="mb-6">
      <div className="bg-gray-800 border-2 border-purple-400 p-4">
        <div className="text-center font-mono text-purple-300 mb-2">
          MISSION PROGRESS: {stagesCompleted.length}/4
        </div>
        <div className="flex justify-center space-x-2">
          {[1, 2, 3, 4].map((stage) => (
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
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-purple-950 text-white w-full p-4">
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

      <div className="container mx-auto flex justify-center items-center h-full relative z-10">
        {!gameStarted && renderIntro()}

        {gameStarted &&
          currentStage < 5 &&
          currentStage !== 1 &&
          currentStage !== 4 &&
          renderProgressBar()}

        {currentStage === 1 && renderCodePuzzle()}
        {currentStage === 2 && renderWiringGame()}
        {currentStage === 3 && renderRhythmGame()}
        {currentStage === 4 && renderFinalSequence()}
        {currentStage === 5 && renderVictory()}
      </div>
    </div>
  );
}

export default Final;
