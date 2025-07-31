import React, { useState, useEffect, useCallback } from "react";

const Engine6RepairGame = () => {
  const [gameState, setGameState] = useState("menu"); // 'menu', 'playing', 'gameOver', 'victory'
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [brokenComponents, setBrokenComponents] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [repairedComponents, setRepairedComponents] = useState([]);
  const [showMessage, setShowMessage] = useState("");
  const [draggedTool, setDraggedTool] = useState(null);

  // Game components and their required tools
  const components = [
    { id: "spark-plug", name: "Spark Plug", tool: "wrench", x: 150, y: 100 },
    { id: "coolant", name: "Coolant System", tool: "scanner", x: 300, y: 120 },
    { id: "piston", name: "Piston Assembly", tool: "wrench", x: 200, y: 200 },
    { id: "wiring", name: "Main Wiring", tool: "wire-cutter", x: 350, y: 180 },
    {
      id: "fuel-injector",
      name: "Fuel Injector",
      tool: "scanner",
      x: 120,
      y: 250,
    },
    { id: "exhaust", name: "Exhaust Valve", tool: "hammer", x: 280, y: 280 },
  ];

  const tools = [
    { id: "wrench", name: "Quantum Wrench", icon: "🔧" },
    { id: "scanner", name: "Diagnostic Scanner", icon: "📡" },
    { id: "wire-cutter", name: "Wire Cutter", icon: "✂️" },
    { id: "hammer", name: "Fusion Hammer", icon: "🔨" },
  ];

  // Initialize game
  const initializeGame = useCallback(() => {
    const numBroken = Math.min(2 + level, 6);
    const shuffled = [...components].sort(() => 0.5 - Math.random());
    const broken = shuffled.slice(0, numBroken).map((comp) => comp.id);

    setBrokenComponents(broken);
    setRepairedComponents([]);
    setTimeLeft(60);
    setSelectedTool(null);
    setShowMessage("");
    setGameState("playing");
  }, [level]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (gameState === "playing" && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameState("gameOver");
            setShowMessage("Time's up! Engine 6 exploded! 💥");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState, timeLeft]);

  // Check victory condition
  useEffect(() => {
    if (
      gameState === "playing" &&
      brokenComponents.length > 0 &&
      brokenComponents.every((comp) => repairedComponents.includes(comp))
    ) {
      const timeBonus = timeLeft * 10;
      const perfectBonus = timeLeft > 30 ? 500 : 0;
      const newScore = score + 1000 + timeBonus + perfectBonus;

      setScore(newScore);
      setGameState("victory");
      setShowMessage(
        `Engine 6 repaired! +${1000 + timeBonus + perfectBonus} points!`
      );
    }
  }, [repairedComponents, brokenComponents, gameState, timeLeft, score]);

  // Handle tool selection
  const handleToolSelect = (toolId) => {
    setSelectedTool(selectedTool === toolId ? null : toolId);
  };

  // Handle component repair
  const handleComponentClick = (componentId) => {
    if (!selectedTool || !brokenComponents.includes(componentId)) return;

    const component = components.find((c) => c.id === componentId);
    const tool = tools.find((t) => t.id === selectedTool);

    if (component.tool === selectedTool) {
      setRepairedComponents((prev) => [...prev, componentId]);
      setSelectedTool(null);
      setShowMessage(`${component.name} repaired with ${tool.name}! ✅`);
      setTimeout(() => setShowMessage(""), 2000);
    } else {
      setShowMessage(
        `Wrong tool! ${component.name} needs ${
          tools.find((t) => t.id === component.tool).name
        }`
      );
      setTimeout(() => setShowMessage(""), 2000);
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e, toolId) => {
    setDraggedTool(toolId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, componentId) => {
    e.preventDefault();
    if (!draggedTool || !brokenComponents.includes(componentId)) return;

    const component = components.find((c) => c.id === componentId);
    const tool = tools.find((t) => t.id === draggedTool);

    if (component.tool === draggedTool) {
      setRepairedComponents((prev) => [...prev, componentId]);
      setShowMessage(`${component.name} repaired with ${tool.name}! ✅`);
      setTimeout(() => setShowMessage(""), 2000);
    } else {
      setShowMessage(
        `Wrong tool! ${component.name} needs ${
          tools.find((t) => t.id === component.tool).name
        }`
      );
      setTimeout(() => setShowMessage(""), 2000);
    }
    setDraggedTool(null);
  };

  const nextLevel = () => {
    setLevel((prev) => prev + 1);
    initializeGame();
  };

  const resetGame = () => {
    setLevel(1);
    setScore(0);
    setGameState("menu");
  };

  if (gameState === "menu") {
    return (
      <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-purple-900 to-purple-700 border-4 border-purple-400 relative font-mono">
        {/* Corner decorations */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-purple-300"></div>
        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-purple-300"></div>
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-purple-300"></div>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-purple-300"></div>

        <div className="p-8 text-center text-white">
          <h1 className="text-4xl font-bold mb-4 text-purple-200">
            🔧 ENGINE 6 REPAIR 🔧
          </h1>
          <div className="text-purple-300 mb-6">
            <p className="mb-2">⚡ FUTURISTIC PIT STOP MECHANIC ⚡</p>
            <p className="text-sm">
              Repair the broken components before time runs out!
            </p>
          </div>

          <div className="bg-purple-800 border-2 border-purple-400 p-4 mb-6 text-left text-sm">
            <h3 className="text-purple-200 mb-2">📋 INSTRUCTIONS:</h3>
            <ul className="space-y-1 text-purple-300">
              <li>• Select tools or drag them to broken components</li>
              <li>• Each component needs a specific tool</li>
              <li>• Repair all components within 60 seconds</li>
              <li>• Bonus points for speed and perfect repairs</li>
            </ul>
          </div>

          <button
            onClick={initializeGame}
            className="bg-purple-400 hover:bg-purple-500 border-2 border-purple-600 text-black font-bold py-3 px-8 text-lg transition-all duration-200 transform hover:scale-105 relative group"
          >
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-purple-700"></div>
            <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-purple-700"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-purple-700"></div>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-purple-700"></div>
            START REPAIR ▶
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto bg-gradient-to-br from-purple-900 to-purple-700 border-4 border-purple-400 relative font-mono">
      {/* Corner decorations */}
      <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-purple-300"></div>
      <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-purple-300"></div>
      <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-purple-300"></div>
      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-purple-300"></div>

      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 text-white">
          <div className="text-xl font-bold">ENGINE 6 REPAIR</div>
          <div className="flex gap-6 text-sm">
            <div>
              LEVEL: <span className="text-purple-300">{level}</span>
            </div>
            <div>
              SCORE: <span className="text-purple-300">{score}</span>
            </div>
            <div
              className={`${
                timeLeft <= 10
                  ? "text-red-400 animate-pulse"
                  : "text-purple-300"
              }`}
            >
              TIME: {timeLeft}s
            </div>
          </div>
        </div>

        {/* Message Display */}
        {showMessage && (
          <div className="bg-purple-800 border-2 border-purple-400 p-2 mb-4 text-center text-purple-200 text-sm">
            {showMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Engine Schematic */}
          <div className="lg:col-span-3">
            <div className="bg-purple-800 border-2 border-purple-400 p-4 h-96 relative">
              <div className="text-purple-200 text-sm mb-2">
                🛠️ ENGINE 6 SCHEMATIC
              </div>

              {/* Engine Frame */}
              <svg
                className="w-full h-full absolute inset-4"
                viewBox="0 0 400 320"
              >
                {/* Engine outline */}
                <rect
                  x="50"
                  y="50"
                  width="300"
                  height="220"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
                <rect
                  x="80"
                  y="80"
                  width="240"
                  height="160"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="1"
                />

                {/* Components */}
                {components.map((component) => {
                  const isBroken = brokenComponents.includes(component.id);
                  const isRepaired = repairedComponents.includes(component.id);

                  return (
                    <g key={component.id}>
                      <circle
                        cx={component.x}
                        cy={component.y}
                        r="20"
                        fill={
                          isRepaired
                            ? "#10b981"
                            : isBroken
                            ? "#ef4444"
                            : "#6b7280"
                        }
                        stroke={isBroken ? "#dc2626" : "#4b5563"}
                        strokeWidth="2"
                        className={`cursor-pointer transition-all duration-300 ${
                          isBroken ? "animate-pulse" : ""
                        }`}
                        onClick={() => handleComponentClick(component.id)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, component.id)}
                      />
                      <text
                        x={component.x}
                        y={component.y + 35}
                        textAnchor="middle"
                        className="text-xs fill-purple-200"
                        style={{ fontSize: "10px" }}
                      >
                        {component.name.split(" ")[0]}
                      </text>
                      {isBroken && !isRepaired && (
                        <text
                          x={component.x}
                          y={component.y + 5}
                          textAnchor="middle"
                          className="text-lg"
                        >
                          ⚠️
                        </text>
                      )}
                      {isRepaired && (
                        <text
                          x={component.x}
                          y={component.y + 5}
                          textAnchor="middle"
                          className="text-lg"
                        >
                          ✅
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Connecting lines */}
                <path
                  d="M150,100 L200,200 L300,120 L350,180 L120,250 L280,280"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
              </svg>
            </div>
          </div>

          {/* Tools Panel */}
          <div className="bg-purple-800 border-2 border-purple-400 p-4">
            <div className="text-purple-200 text-sm mb-4">🧰 TOOLBOX</div>
            <div className="space-y-3">
              {tools.map((tool) => (
                <div
                  key={tool.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, tool.id)}
                  onClick={() => handleToolSelect(tool.id)}
                  className={`p-3 border-2 cursor-pointer transition-all duration-200 text-center ${
                    selectedTool === tool.id
                      ? "border-purple-300 bg-purple-600"
                      : "border-purple-500 bg-purple-700 hover:bg-purple-600"
                  }`}
                >
                  <div className="text-2xl mb-1">{tool.icon}</div>
                  <div className="text-xs text-purple-200">{tool.name}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-3 bg-purple-900 border border-purple-500 text-xs text-purple-300">
              <div className="mb-2">📊 STATUS:</div>
              <div>Broken: {brokenComponents.length}</div>
              <div>Repaired: {repairedComponents.length}</div>
              <div>
                Remaining: {brokenComponents.length - repairedComponents.length}
              </div>
            </div>
          </div>
        </div>

        {/* Game Over States */}
        {(gameState === "gameOver" || gameState === "victory") && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-purple-800 border-4 border-purple-400 p-8 text-center text-white relative max-w-md">
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-purple-300"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-purple-300"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-purple-300"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-purple-300"></div>

              <h2 className="text-2xl font-bold mb-4">
                {gameState === "victory"
                  ? "🎉 SUCCESS!"
                  : "💥 ENGINE EXPLODED!"}
              </h2>
              <p className="mb-4 text-purple-200">{showMessage}</p>
              <div className="text-lg mb-6">Final Score: {score}</div>

              <div className="flex gap-4 justify-center">
                {gameState === "victory" && (
                  <button
                    onClick={nextLevel}
                    className="bg-green-600 hover:bg-green-700 border-2 border-green-400 text-white font-bold py-2 px-4 transition-all duration-200"
                  >
                    NEXT LEVEL ▶
                  </button>
                )}
                <button
                  onClick={resetGame}
                  className="bg-purple-400 hover:bg-purple-500 border-2 border-purple-600 text-black font-bold py-2 px-4 transition-all duration-200"
                >
                  RESTART
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Engine6RepairGame;
