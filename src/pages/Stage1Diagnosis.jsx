import React, { useState, useEffect } from "react";
import { useUserData } from "./UserDataProvider";

function SpaceshipDiagnosis() {
  const [diagnosticProgress, setDiagnosticProgress] = useState(0);
  const [showingSystems, setShowingSystems] = useState([]);
  const [diagnosticComplete, setDiagnosticComplete] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [repairMode, setRepairMode] = useState(false);
  const [repairedSystems, setRepairedSystems] = useState(new Set());
  const [showRepairInterface, setShowRepairInterface] = useState(false);
  const [showPeterMessage, setShowPeterMessage] = useState(false);
  const [peterMessageText, setPeterMessageText] = useState("");
  const [peterTypingComplete, setPeterTypingComplete] = useState(false);
  const { addXPForTask, userXP } = useUserData();

  const handleXP = async () => {
    try {
      if (userXP === 0) {
        const result = await addXPForTask(100); // Add 100 XP
        console.log("here");
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
      } else if (userXP == 100) {
        console.log("Game finished! (XP already earned)");
      }
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
    window.location.href = "/stage2";
  };

  const systemsData = [
    {
      id: "engine6",
      name: "ENGINE UNIT 6",
      status: "CRITICAL FAILURE",
      damage: "METEORITE IMPACT - PLASMA CONDUIT SEVERED",
      priority: "HIGH",
      color: "text-red-400",
      repairSteps: ["SEAL PLASMA LEAK", "REPLACE CONDUIT", "RESTART ENGINE"],
      repairTime: 3000,
    },
    {
      id: "fuel",
      name: "FUEL SYSTEM",
      status: "DEPLETED - 12% REMAINING",
      damage: "FUEL LINE PUNCTURE - SLOW LEAK DETECTED",
      priority: "HIGH",
      color: "text-purple-400",
      repairSteps: ["PATCH FUEL LINE", "PRESSURIZE SYSTEM", "VERIFY INTEGRITY"],
      repairTime: 2500,
    },
    {
      id: "power",
      name: "POWER GRID",
      status: "BACKUP MODE ENGAGED",
      damage: "PRIMARY GENERATOR OFFLINE - DEBRIS DAMAGE",
      priority: "MEDIUM",
      color: "text-yellow-400",
      repairSteps: ["CLEAR DEBRIS", "RESET BREAKERS", "RESTART GENERATOR"],
      repairTime: 2000,
    },
    {
      id: "hull",
      name: "HULL INTEGRITY",
      status: "BREACH DETECTED - SECTOR 7",
      damage: "MICRO-FRACTURES - ATMOSPHERIC PRESSURE DROPPING",
      priority: "HIGH",
      color: "text-red-400",
      repairSteps: ["DEPLOY NANO-SEALANT", "REINFORCE STRUCTURE", "PRESSURIZE"],
      repairTime: 3500,
    },
    {
      id: "navigation",
      name: "NAVIGATION ARRAY",
      status: "PARTIAL FUNCTIONALITY",
      damage: "SENSOR ARRAY 3 OFFLINE - REDUCED ACCURACY",
      priority: "MEDIUM",
      color: "text-yellow-400",
      repairSteps: [
        "RECALIBRATE SENSORS",
        "REPLACE DAMAGED ARRAY",
        "RUN DIAGNOSTICS",
      ],
      repairTime: 1500,
    },
    {
      id: "life_support",
      name: "LIFE SUPPORT",
      status: "STABLE - MINOR FLUCTUATIONS",
      damage: "OXYGEN RECYCLER EFFICIENCY DOWN 15%",
      priority: "LOW",
      color: "text-green-400",
      repairSteps: ["CLEAN FILTERS", "OPTIMIZE SETTINGS", "TEST SYSTEMS"],
      repairTime: 1000,
    },
  ];

  // Progressive diagnostic reveal
  useEffect(() => {
    const timer = setInterval(() => {
      setDiagnosticProgress((prev) => {
        const newProgress = prev + 1;
        if (newProgress <= systemsData.length) {
          setShowingSystems(systemsData.slice(0, newProgress));
        }
        if (newProgress >= systemsData.length + 2) {
          setDiagnosticComplete(true);
          clearInterval(timer);
        }
        return newProgress;
      });
    }, 800);

    return () => clearInterval(timer);
  }, []);

  const handleSystemSelect = (system) => {
    setSelectedSystem(system);
    setShowRepairInterface(true);
  };

  const handleRepairSystem = (systemId) => {
    const system = systemsData.find((s) => s.id === systemId);
    if (!system || repairedSystems.has(systemId)) return;

    // Check if trying to repair Engine Unit 6
    if (systemId === "engine6") {
      // Show Peter's message about manual repair
      setPeterMessageText(
        "I'm afraid the repair robots can't handle Engine Unit 6. The plasma conduit damage is too severe and requires manual intervention. You'll need to complete all other repairs first, then we'll move to Stage 2 for the manual engine repair."
      );
      setShowPeterMessage(true);
      setShowRepairInterface(false);

      // Type out Peter's message
      setTimeout(() => {
        setPeterTypingComplete(true);
      }, 2000);

      return;
    }

    setRepairMode(true);

    // Simulate repair process
    setTimeout(() => {
      setRepairedSystems((prev) => new Set([...prev, systemId]));
      setRepairMode(false);
      setShowRepairInterface(false);
      setSelectedSystem(null);

      // Check if all non-engine systems are repaired
      const nonEngineSystemsCount = systemsData.filter(
        (s) => s.id !== "engine6"
      ).length;
      const repairedNonEngineSystems =
        Array.from(prev).filter((id) => id !== "engine6").length + 1;

      if (repairedNonEngineSystems === nonEngineSystemsCount) {
        // Show Peter's message about Stage 2
        setTimeout(() => {
          setPeterMessageText(
            "Excellent work! All automated repairs are complete. However, Engine Unit 6 still requires manual attention. The damage is too complex for our repair robots. We'll need to proceed to Stage 2 where you'll perform the manual repair procedures."
          );
          setShowPeterMessage(true);
          setPeterTypingComplete(false);
          setTimeout(() => {
            setPeterTypingComplete(true);
          }, 2000);
        }, 1000);
      }
    }, system.repairTime);
  };

  const getSystemStatusColor = (system) => {
    if (repairedSystems.has(system.id)) return "text-green-400";
    return system.color;
  };

  const getSystemStatus = (system) => {
    if (repairedSystems.has(system.id)) return "REPAIRED - OPERATIONAL";
    return system.status;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-purple-950 relative overflow-hidden">
      {/* Main Diagnostic Interface */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="bg-black/90 backdrop-blur-sm border-4 border-red-500 shadow-2xl min-h-[90vh] relative overflow-hidden">
          {/* Header */}
          <div className="bg-red-900/50 border-b-4 border-red-500 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
              <h1 className="text-2xl font-mono text-red-400 font-bold">
                EMERGENCY DIAGNOSTIC PROTOCOL
              </h1>
            </div>
            <div className="text-red-300 font-mono text-sm">
              INCIDENT: METEORITE IMPACT - STARDATE 2077.31.07
            </div>
          </div>

          {/* Spaceship Schematic */}
          <div className="p-6 border-b-2 border-purple-600">
            <div className="text-center mb-4">
              <h2 className="text-xl font-mono text-purple-300">
                SPACE SHIP - SCHEMATIC VIEW
              </h2>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                {/* Simple ASCII-style spaceship */}
                <pre className="text-purple-400 font-mono text-xs leading-tight">
                  {`
       ▲
      ███
     █████
    ███████
   █████████
  ███████████
 █████████████
███████████████
█████████████████
███████████████████
█████████████████████
███████████████████
█████████████████
███████████████
█████████████
███████████
█████████
███████
█████
███
▲
`}
                </pre>
                {/* Damage indicators */}
                <div className="absolute top-12 right-8 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                <div className="absolute top-16 right-12 w-1 h-1 bg-purple-500 rounded-full animate-pulse"></div>
                <div className="absolute top-20 left-10 w-1 h-1 bg-yellow-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Systems Status */}
          <div className="p-6">
            <h2 className="text-xl font-mono text-cyan-400 mb-6 flex items-center">
              <span className="mr-2">⚠</span> SYSTEMS ANALYSIS
              {!diagnosticComplete && (
                <span className="ml-4 text-sm text-yellow-400 animate-pulse">
                  SCANNING...{" "}
                  {Math.min(
                    Math.round(
                      (diagnosticProgress / (systemsData.length + 2)) * 100
                    ),
                    100
                  )}
                  %
                </span>
              )}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {showingSystems.map((system, index) => (
                <div
                  key={system.id}
                  className={`bg-gray-900/50 border-2 p-4 cursor-pointer transition-all duration-300 hover:border-purple-400 ${
                    repairedSystems.has(system.id)
                      ? "border-green-500"
                      : "border-red-500"
                  }`}
                  onClick={() => handleSystemSelect(system)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-mono text-purple-300 font-bold">
                      {system.name}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 border ${
                        system.priority === "HIGH"
                          ? "border-red-500 text-red-400"
                          : system.priority === "MEDIUM"
                          ? "border-yellow-500 text-yellow-400"
                          : "border-green-500 text-green-400"
                      }`}
                    >
                      {system.priority}
                    </span>
                  </div>
                  <div
                    className={`font-mono text-sm mb-2 ${getSystemStatusColor(
                      system
                    )}`}
                  >
                    STATUS: {getSystemStatus(system)}
                  </div>
                  <div className="font-mono text-xs text-gray-400">
                    {system.damage}
                  </div>
                  {repairedSystems.has(system.id) && (
                    <div className="mt-2 text-green-400 font-mono text-xs flex items-center">
                      <span className="mr-1">✓</span> REPAIR COMPLETE
                    </div>
                  )}
                </div>
              ))}
            </div>

            {diagnosticComplete && (
              <div className="mt-8 p-4 bg-purple-900/30 border-2 border-purple-500">
                <h3 className="font-mono text-purple-300 text-lg mb-2">
                  DIAGNOSIS COMPLETE
                </h3>
                <p className="font-mono text-sm text-gray-300 mb-4">
                  Click on any system above to initiate repair protocols.
                  Critical systems require immediate attention to ensure crew
                  survival.
                </p>
                <div className="flex space-x-4 text-sm font-mono">
                  <span className="text-red-400">
                    CRITICAL:{" "}
                    {
                      systemsData.filter(
                        (s) =>
                          s.priority === "HIGH" && !repairedSystems.has(s.id)
                      ).length
                    }
                  </span>
                  <span className="text-yellow-400">
                    MEDIUM:{" "}
                    {
                      systemsData.filter(
                        (s) =>
                          s.priority === "MEDIUM" && !repairedSystems.has(s.id)
                      ).length
                    }
                  </span>
                  <span className="text-green-400">
                    REPAIRED: {repairedSystems.size}/{systemsData.length}
                    {repairedSystems.size === systemsData.length - 1 &&
                    !repairedSystems.has("engine6")
                      ? " (ENGINE PENDING)"
                      : ""}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Repair Interface Modal */}
          {showRepairInterface && selectedSystem && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
              <div className="bg-gray-900 border-4 border-purple-500 p-6 max-w-lg w-full mx-4">
                <h2 className="font-mono text-xl text-purple-300 mb-4">
                  REPAIR PROTOCOL: {selectedSystem.name}
                </h2>

                <div className="mb-4">
                  <div className="text-sm font-mono text-gray-300 mb-2">
                    DAMAGE ASSESSMENT:
                  </div>
                  <div className="text-sm font-mono text-red-400">
                    {selectedSystem.damage}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-sm font-mono text-gray-300 mb-2">
                    REPAIR SEQUENCE:
                  </div>
                  {selectedSystem.repairSteps.map((step, index) => (
                    <div
                      key={index}
                      className="text-sm font-mono text-cyan-400 ml-4"
                    >
                      {index + 1}. {step}
                    </div>
                  ))}
                </div>

                {repairMode ? (
                  <div className="text-center">
                    <div className="text-yellow-400 font-mono mb-2">
                      REPAIR IN PROGRESS...
                    </div>
                    <div className="flex justify-center space-x-1">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleRepairSystem(selectedSystem.id)}
                      disabled={
                        repairedSystems.has(selectedSystem.id) ||
                        selectedSystem.id === "engine6"
                      }
                      className={`flex-1 py-2 px-4 font-mono border-2 transition-all ${
                        repairedSystems.has(selectedSystem.id)
                          ? "border-green-500 text-green-400 cursor-not-allowed"
                          : selectedSystem.id === "engine6"
                          ? "border-purple-500 text-purple-400 cursor-not-allowed"
                          : "border-purple-500 text-purple-300 hover:bg-purple-500/20"
                      }`}
                    >
                      {repairedSystems.has(selectedSystem.id)
                        ? "REPAIRED"
                        : selectedSystem.id === "engine6"
                        ? "MANUAL REPAIR REQUIRED"
                        : "SEND ROBOTS FOR REPAIR"}
                    </button>
                    <button
                      onClick={() => setShowRepairInterface(false)}
                      className="py-2 px-4 font-mono border-2 border-gray-500 text-gray-400 hover:bg-gray-500/20"
                    >
                      CANCEL
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Peter's Message Modal */}
          {showPeterMessage && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
              <div className="bg-gray-900 border-4 border-purple-500 p-6 max-w-2xl w-full mx-4 relative">
                {/* AI Character Icon */}
                <div className="absolute -top-8 left-6">
                  <div className="w-16 h-16 bg-purple-600 border-4 border-purple-400 flex items-center justify-center text-2xl">
                    🤖
                  </div>
                </div>

                <div className="pt-4">
                  <h2 className="font-mono text-xl text-purple-300 mb-4 flex items-center">
                    <span className="w-3 h-3 bg-purple-500 rounded-full animate-pulse mr-3"></span>
                    PETER - AI ASSISTANT
                  </h2>

                  <div className="bg-purple-900/30 border-2 border-purple-400 p-4 mb-6">
                    <div className="font-mono text-purple-100 leading-relaxed">
                      "{peterMessageText}
                      {!peterTypingComplete && (
                        <span className="inline-block w-2 h-4 bg-purple-400 ml-1 animate-pulse">
                          |
                        </span>
                      )}
                      "
                    </div>

                    {/* Typing indicator */}
                    {!peterTypingComplete && (
                      <div className="flex items-center mt-3 text-purple-400">
                        <span className="text-xs">💭</span>
                        <div className="ml-2 flex space-x-1">
                          <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-1 h-1 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-1 h-1 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {peterTypingComplete && (
                    <div className="flex justify-center">
                      <button
                        onClick={() => {
                          setShowPeterMessage(false);
                          setPeterTypingComplete(false);
                        }}
                        className="py-2 px-6 font-mono border-2 border-purple-500 text-purple-300 hover:bg-purple-500/20 transition-all"
                      >
                        ACKNOWLEDGED
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* All systems repaired success - Modified to exclude engine */}
          {repairedSystems.size === systemsData.length - 1 &&
            !repairedSystems.has("engine6") && (
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 ">
                <div className="bg-purple-900 border-4 border-zinc-900 p-8 text-center max-w-md relative">
                  <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-purple-600"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-purple-600"></div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-purple-600"></div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-purple-600"></div>
                  <h2 className="text-2xl font-mono text-purple-400 mb-4">
                    AUTOMATED REPAIRS COMPLETE
                  </h2>
                  <p className="text-purple-300 font-mono mb-4">
                    All robot-accessible systems have been repaired
                    successfully!
                  </p>
                  <p className="text-sm text-purple-200 font-mono mb-4">
                    Engine Unit 6 requires manual intervention in Stage 2.
                  </p>
                  <div className="text-xs font-mono text-purple-300 mb-4">
                    Return to stage 2: MANUAL ENGINE REPAIR
                  </div>
                  <div className="mt-6 flex justify-center space-x-1">
                    <button
                      onClick={handleXP()}
                      className="py-2 px-6 font-mono border-2 border-purple-500 text-purple-300 hover:bg-purple-500/20 transition-all"
                    >
                      GO TO STAGE 2
                    </button>
                  </div>
                </div>
              </div>
            )}

          {/* Background effects */}
          <div className="absolute inset-0 pointer-events-none opacity-5">
            <div
              className="h-full w-full"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, #ef4444 2px, #ef4444 4px)",
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Background grid and effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-16 h-full">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="border-r border-red-300"></div>
          ))}
        </div>
        <div className="absolute inset-0 grid grid-rows-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-b border-red-300 w-full"></div>
          ))}
        </div>
      </div>

      {/* Emergency indicators */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl text-red-400 opacity-20 animate-pulse font-mono">
          ⚠
        </div>
        <div className="absolute top-20 right-20 text-3xl text-purple-500 opacity-30 animate-bounce font-mono">
          ⛽
        </div>
        <div className="absolute bottom-32 left-20 text-4xl text-yellow-400 opacity-25 animate-pulse font-mono">
          ⚡
        </div>
        <div className="absolute bottom-20 right-32 text-3xl text-red-500 opacity-20 animate-bounce font-mono">
          🔧
        </div>
      </div>
    </div>
  );
}

export default SpaceshipDiagnosis;
