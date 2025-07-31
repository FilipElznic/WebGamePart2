import React, { useState, useEffect, useCallback } from "react";

// Comment out or remove this import if useUserData is not available
import { useUserData } from "./UserDataProvider";

const RetroComputerLogin = () => {
  const [xpAwarded, setXpAwarded] = useState(false);
  const [isAddingXP, setIsAddingXP] = useState(false);
  const { addXPForTask, userXP } = useUserData();

  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showError, setShowError] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [blinkCursor, setBlinkCursor] = useState(true);
  const [activeWindow, setActiveWindow] = useState(null);

  // Temporary mock implementation if useUserData is not available
  // Replace this with your actual useUserData hook when available

  // Snake Game State
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 0, y: -1 });
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const BOARD_SIZE = 20;

  // Function to handle XP award when snake score exceeds 500
  const handleSnakeXPAward = async (newScore) => {
    // Check if score is above 500 and XP hasn't been awarded yet
    if (newScore >= 500) {
      try {
        if (userXP === 100) {
          const result = await addXPForTask(100); // Add 100 XP

          if (result.success) {
            console.log("XP added successfully:", result.newXP);
            setXpAwarded(true);
            setIsAddingXP(true);
          } else {
            console.error("Failed to add XP:", result.error);
            if (result.error.includes("already has XP")) {
              console.log("Chest opened! (XP already earned)");
            } else {
              console.log("Chest opened! (XP update failed)");
            }
          }
        } else if (userXP == 200) {
          console.log("Game finished! (XP already earned)");
        }
      } catch (error) {
        console.error("Failed to copy code:", error);
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const cursorTimer = setInterval(() => {
      setBlinkCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(cursorTimer);
    };
  }, []);

  // Snake Game Logic
  const generateFood = useCallback(() => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
    } while (
      snake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      )
    );
    return newFood;
  }, [snake]);

  const moveSnake = useCallback(() => {
    if (!gameRunning || gameOver) return;

    setSnake((currentSnake) => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };

      head.x += direction.x;
      head.y += direction.y;

      // Check wall collision
      if (
        head.x < 0 ||
        head.x >= BOARD_SIZE ||
        head.y < 0 ||
        head.y >= BOARD_SIZE
      ) {
        setGameOver(true);
        setGameRunning(false);
        return currentSnake;
      }

      // Check self collision
      if (
        newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true);
        setGameRunning(false);
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => {
          const newScore = prev + 10;
          if (newScore > highScore) {
            setHighScore(newScore);
          }
          // Award XP if score reaches 500 or more
          handleSnakeXPAward(newScore);
          return newScore;
        });
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [
    direction,
    food,
    gameRunning,
    gameOver,
    generateFood,
    highScore,
    xpAwarded,
  ]);

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, 150);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Prevent page scrolling with arrow keys
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }
      if (activeWindow !== "snake") return;

      switch (e.key) {
        case "ArrowUp":
          if (direction.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          if (direction.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          if (direction.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          if (direction.x !== -1) setDirection({ x: 1, y: 0 });
          break;
        case " ":
          e.preventDefault();
          if (gameOver) {
            resetGame();
          } else {
            setGameRunning(!gameRunning);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction, gameOver, gameRunning, activeWindow]);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection({ x: 0, y: -1 });
    setScore(0);
    setGameOver(false);
    setGameRunning(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "a3F9kL7mV2X0nB6qW8rT1zY5hC4dE7uJ9sP3oG8xQ6vM2iN1A0") {
      setIsLoggedIn(true);
      setShowError(false);
    } else {
      setShowError(true);
      setPassword("");
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPassword("");
    setActiveWindow(null);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  const dummyFiles = [
    { name: "system.cfg", size: "2.1 KB", type: "CONFIG", icon: "⚙️" },
    { name: "readme.txt", size: "1.3 KB", type: "TEXT", icon: "📄" },
    { name: "secret.dat", size: "856 B", type: "DATA", icon: "🔒" },
    { name: "backup.zip", size: "15.2 MB", type: "ARCHIVE", icon: "📦" },
    { name: "photo.bmp", size: "4.7 MB", type: "IMAGE", icon: "🖼️" },
    { name: "autoexec.bat", size: "512 B", type: "BATCH", icon: "⚡" },
    { name: "database.db", size: "22.1 MB", type: "DATABASE", icon: "🗃️" },
    { name: "temp.log", size: "903 B", type: "LOG", icon: "📋" },
  ];

  const dummyGames = [
    {
      name: "Snake Classic",
      category: "ARCADE",
      icon: "🐍",
      status: "READY",
      playable: true,
    },
    { name: "Tetris Retro", category: "PUZZLE", icon: "🧩", status: "EXPIRED" },
    {
      name: "Space Invaders",
      category: "SHOOTER",
      icon: "👾",
      status: "MISSING FILES",
    },
    {
      name: "Pac-Man",
      category: "ARCADE",
      icon: "🟡",
      status: "LICENSE ERROR",
    },
    { name: "Asteroids", category: "SHOOTER", icon: "💫", status: "CORRUPTED" },
    { name: "Pong", category: "CLASSIC", icon: "🏓", status: "UNAVAILABLE" },
    { name: "Frogger", category: "ARCADE", icon: "🐸", status: "EXPIRED" },
    {
      name: "Centipede",
      category: "SHOOTER",
      icon: "🐛",
      status: "MISSING FILES",
    },
  ];

  const systemSettings = [
    {
      name: "Display Settings",
      category: "SYSTEM",
      icon: "🖥️",
      access: "ADMIN ONLY",
    },
    {
      name: "Sound Configuration",
      category: "AUDIO",
      icon: "🔊",
      access: "RESTRICTED",
    },
    {
      name: "Network Setup",
      category: "NETWORK",
      icon: "🌐",
      access: "ADMIN ONLY",
    },
    {
      name: "User Accounts",
      category: "SECURITY",
      icon: "👥",
      access: "RESTRICTED",
    },
    {
      name: "System Time",
      category: "SYSTEM",
      icon: "⏰",
      access: "ADMIN ONLY",
    },
    {
      name: "Boot Options",
      category: "SYSTEM",
      icon: "🚀",
      access: "RESTRICTED",
    },
    {
      name: "Hardware Config",
      category: "HARDWARE",
      icon: "🔧",
      access: "ADMIN ONLY",
    },
    {
      name: "Security Policy",
      category: "SECURITY",
      icon: "🛡️",
      access: "RESTRICTED",
    },
  ];

  const handleFileClick = (fileName) => {
    // Show access denied message for all files
  };

  const handleGameClick = (gameName) => {
    if (gameName === "Snake Classic") {
      setActiveWindow("snake");
      resetGame();
    }
  };

  const handleSettingClick = (settingName) => {
    // Show access denied for settings
  };

  const openFilesWindow = () => {
    setActiveWindow("files");
  };

  const openGamesWindow = () => {
    setActiveWindow("games");
  };

  const openSettingsWindow = () => {
    setActiveWindow("settings");
  };

  const closeWindow = () => {
    setActiveWindow(null);
    if (activeWindow === "snake") {
      setGameRunning(false);
    }
  };

  return (
    <div className="min-h-screen font-mono">
      <div className="container mx-auto px-4 py-8 relative w-full h-full z-10">
        <div className="bg-zinc-100 backdrop-blur-sm p-8 border-4 border-yellow-400 shadow-2xl  relative overflow-hidden flex h-screen flex-col items-center justify-center">
          {/* Retro border decorations */}
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-yellow-500"></div>
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-yellow-500"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-yellow-500"></div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-yellow-500"></div>

          {/* Challenge text */}
          <div className="w-full  p-6 flex flex-col h-full ">
            <div className="text-center mb-8">
              <h2 className="text-xl font-mono font-bold text-yellow-400 mb-2">
                [CHALLENGE 02]
              </h2>
              <p className="text-lg font-mono text-yellow-300">
                Lets use the computer.
              </p>
            </div>
            <div className="bg-white h-full border-20 border-b-40 border-zinc-900 ">
              <p className="text-white text-center bg-zinc-800 text-sm">
                Computer
              </p>
              <div
                id="pc"
                className="bg-black h-full border-20 border-zinc-800 before:absolute "
              >
                {!isLoggedIn ? (
                  /* Login Screen */
                  <div className="flex-1 flex flex-col justify-center max-w-xl h-full mx-auto w-full ">
                    {/* Computer Header */}
                    <div className="bg-zinc-800 text-green-400 p-4 mb-6 border border-green-500">
                      <div className="text-center">
                        <div className="text-xs mb-1">RETRO-COMP OS v2.1</div>
                        <div className="text-xs">
                          System Ready - {formatDate(currentTime)}{" "}
                          {formatTime(currentTime)}
                        </div>
                      </div>
                    </div>

                    {/* Login Form */}
                    <div className="bg-gray-900 border border-gray-600 p-6">
                      <div className="text-green-400 text-sm mb-4">
                        === SYSTEM LOGIN ===
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="text-green-400 text-sm mb-2">
                            Username: <span className="text-white">MOM</span>
                            {blinkCursor && (
                              <span className="text-green-400">_</span>
                            )}
                          </div>
                        </div>

                        <div>
                          <div className="text-green-400 text-sm block mb-2">
                            Password:
                          </div>
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={(e) =>
                              e.key === "Enter" && handleLogin(e)
                            }
                            className="bg-black border border-green-500 text-green-400 px-3 py-2 w-full font-mono text-sm focus:outline-none focus:border-green-300"
                            placeholder="Enter password..."
                            autoFocus
                          />
                        </div>

                        <button
                          onClick={handleLogin}
                          className="bg-green-700 hover:bg-green-600 text-black font-bold py-2 px-6 border border-green-500 transition-colors"
                        >
                          [ENTER]
                        </button>
                      </div>

                      {showError && (
                        <div className="mt-4 text-red-400 text-sm animate-pulse">
                          ACCESS DENIED - Invalid Password
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Desktop Environment */
                  <div className="flex-1 flex flex-col h-full">
                    {/* Desktop Header */}
                    <div className="bg-blue-800 text-white p-2 flex justify-between items-center border-b border-blue-600">
                      <div className="text-sm">Welcome, mom</div>
                      <div className="text-sm">{formatTime(currentTime)}</div>
                      <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-500 px-3 py-1 text-xs border border-red-400"
                      >
                        LOGOUT
                      </button>
                    </div>

                    {/* Desktop Content */}
                    <div className="flex-1 bg-zinc-800 p-6 relative ">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {/* Desktop Icons */}
                        <div
                          className="text-center cursor-pointer hover:bg-blue-800/50 p-3 rounded"
                          onClick={openFilesWindow}
                        >
                          <div className="text-3xl mb-2">📁</div>
                          <div className="text-xs text-green-300">Files</div>
                        </div>
                        <div className="text-center cursor-pointer hover:bg-blue-800/50 p-3 rounded">
                          <div className="text-3xl mb-2">🖥️</div>
                          <div className="text-xs text-green-300">Terminal</div>
                        </div>
                        <div
                          className="text-center cursor-pointer hover:bg-blue-800/50 p-3 rounded"
                          onClick={openGamesWindow}
                        >
                          <div className="text-3xl mb-2">🎮</div>
                          <div className="text-xs text-green-300">Games</div>
                        </div>
                        <div
                          className="text-center cursor-pointer hover:bg-blue-800/50 p-3 rounded"
                          onClick={openSettingsWindow}
                        >
                          <div className="text-3xl mb-2">⚙️</div>
                          <div className="text-xs text-green-300">Settings</div>
                        </div>
                      </div>

                      {/* Snake Game Window */}
                      {activeWindow === "snake" && (
                        <div className="absolute inset-4 bg-gray-800 border-2 border-gray-600 -top-10 flex flex-col z-10">
                          {/* Window Title Bar */}
                          <div className="bg-green-700 text-white p-2 flex justify-between items-center border-b border-gray-600">
                            <div className="text-sm font-bold">
                              🐍 Snake Classic - Arcade Mode
                            </div>
                            <button
                              onClick={closeWindow}
                              className="bg-red-600 hover:bg-red-500 px-2 py-1 text-xs border border-red-400"
                            >
                              ✕
                            </button>
                          </div>

                          {/* Game Stats */}
                          <div className="bg-gray-700 text-green-300 p-2 text-sm border-b border-gray-600 flex justify-between">
                            <div>Score: {score}</div>
                            <div>High Score: {highScore}</div>
                            <div className="flex items-center space-x-4">
                              <div className="text-yellow-300">
                                {gameOver
                                  ? "GAME OVER"
                                  : gameRunning
                                  ? "PLAYING"
                                  : "PAUSED"}
                              </div>
                              {score >= 500 && xpAwarded && (
                                <div className="text-green-400 font-bold animate-pulse">
                                  🎉 XP EARNED!
                                </div>
                              )}
                              {isAddingXP && (
                                <div className="text-yellow-400">
                                  Adding XP...
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Game Board */}
                          <div className="flex-1 bg-black p-4 flex items-center justify-center">
                            <div
                              className="grid grid-cols-20 gap-0 border border-green-500"
                              style={{
                                gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
                                width: "400px",
                                height: "400px",
                              }}
                            >
                              {Array.from({
                                length: BOARD_SIZE * BOARD_SIZE,
                              }).map((_, index) => {
                                const x = index % BOARD_SIZE;
                                const y = Math.floor(index / BOARD_SIZE);
                                const isSnake = snake.some(
                                  (segment) =>
                                    segment.x === x && segment.y === y
                                );
                                const isFood = food.x === x && food.y === y;
                                const isHead =
                                  snake.length > 0 &&
                                  snake[0].x === x &&
                                  snake[0].y === y;

                                return (
                                  <div
                                    key={index}
                                    className={`border border-gray-800 ${
                                      isSnake
                                        ? isHead
                                          ? "bg-green-400"
                                          : "bg-green-600"
                                        : isFood
                                        ? "bg-red-500"
                                        : "bg-gray-900"
                                    }`}
                                    style={{ aspectRatio: "1" }}
                                  />
                                );
                              })}
                            </div>
                          </div>

                          {/* Controls */}
                          <div className="bg-gray-700 text-green-300 p-3 text-xs border-t border-gray-600">
                            <div className="text-center mb-2">
                              Use ARROW KEYS to move • SPACEBAR to{" "}
                              {gameOver
                                ? "restart"
                                : gameRunning
                                ? "pause"
                                : "resume"}
                              {score < 500 && (
                                <span className="text-yellow-300 ml-4">
                                  • Reach 500 points for XP!
                                </span>
                              )}
                            </div>
                            <div className="flex justify-center space-x-4">
                              <button
                                onClick={() =>
                                  !gameOver && setGameRunning(!gameRunning)
                                }
                                className="bg-blue-600 hover:bg-blue-500 px-3 py-1 text-white border border-blue-400"
                                disabled={gameOver}
                              >
                                {gameRunning ? "PAUSE" : "PLAY"}
                              </button>
                              <button
                                onClick={resetGame}
                                className="bg-green-600 hover:bg-green-500 px-3 py-1 text-white border border-green-400"
                              >
                                RESTART
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Files Window */}
                      {activeWindow === "files" && (
                        <div className="absolute inset-4 bg-gray-800 border-2 border-gray-600 flex flex-col z-10 h-[55vh]">
                          {/* Window Title Bar */}
                          <div className="bg-blue-700 text-white p-2 flex justify-between items-center border-b border-gray-600">
                            <div className="text-sm font-bold">
                              📁 File Manager - C:\
                            </div>
                            <button
                              onClick={closeWindow}
                              className="bg-red-600 hover:bg-red-500 px-2 py-1 text-xs border border-red-400"
                            >
                              ✕
                            </button>
                          </div>

                          {/* File List Header */}
                          <div className="bg-zinc-800 text-green-300 p-2 text-xs border-b border-gray-600 flex">
                            <div className="w-1/2">NAME</div>
                            <div className="w-1/4">SIZE</div>
                            <div className="w-1/4">TYPE</div>
                          </div>

                          {/* File List */}
                          <div className="flex-1 bg-black p-2 overflow-y-auto">
                            {dummyFiles.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center py-1 px-2 hover:bg-blue-900/50 cursor-pointer text-green-400 text-sm"
                                onClick={() => handleFileClick(file.name)}
                              >
                                <div className="w-1/2 flex items-center">
                                  <span className="mr-2">{file.icon}</span>
                                  {file.name}
                                </div>
                                <div className="w-1/4">{file.size}</div>
                                <div className="w-1/4">{file.type}</div>
                              </div>
                            ))}
                          </div>

                          {/* Status Bar */}
                          <div className="bg-zinc-800 text-green-300 p-2 text-xs border-t border-gray-600">
                            {dummyFiles.length} files | Read-only access
                          </div>
                        </div>
                      )}

                      {/* Games Window */}
                      {activeWindow === "games" && (
                        <div className="absolute inset-4 bg-gray-800 border-2 border-gray-600 flex flex-col z-10 h-[55vh]">
                          {/* Window Title Bar */}
                          <div className="bg-purple-700 text-white p-2 flex justify-between items-center border-b border-gray-600">
                            <div className="text-sm font-bold">
                              🎮 Game Center - Arcade Collection
                            </div>
                            <button
                              onClick={closeWindow}
                              className="bg-red-600 hover:bg-red-500 px-2 py-1 text-xs border border-red-400"
                            >
                              ✕
                            </button>
                          </div>

                          {/* Games List Header */}
                          <div className="bg-zinc-800 text-green-300 p-2 text-xs border-b border-gray-600 flex ">
                            <div className="w-1/2">GAME TITLE</div>
                            <div className="w-1/4">CATEGORY</div>
                            <div className="w-1/4">STATUS</div>
                          </div>

                          {/* Games List */}
                          <div className="flex-1 bg-black p-2 overflow-y-auto">
                            {dummyGames.map((game, index) => (
                              <div
                                key={index}
                                className={`flex items-center py-2 px-2 hover:bg-purple-900/50 cursor-pointer text-green-400 text-sm ${
                                  game.playable ? "hover:bg-green-900/50" : ""
                                }`}
                                onClick={() => handleGameClick(game.name)}
                              >
                                <div className="w-1/2 flex items-center">
                                  <span className="mr-2">{game.icon}</span>
                                  {game.name}
                                </div>
                                <div className="w-1/4">{game.category}</div>
                                <div
                                  className={`w-1/4 ${
                                    game.playable
                                      ? "text-green-400"
                                      : "text-red-400"
                                  }`}
                                >
                                  {game.status}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Status Bar */}
                          <div className="bg-zinc-800 text-green-300 p-2 text-xs border-t border-gray-600">
                            {dummyGames.filter((g) => g.playable).length} of{" "}
                            {dummyGames.length} games available
                          </div>
                        </div>
                      )}

                      {/* Settings Window */}
                      {activeWindow === "settings" && (
                        <div className="absolute inset-4 bg-gray-800 border-2 border-gray-600 flex flex-col z-10 h-[55vh]">
                          {/* Window Title Bar */}
                          <div className="bg-orange-700 text-white p-2 flex justify-between items-center border-b border-gray-600">
                            <div className="text-sm font-bold">
                              ⚙️ System Settings - Control Panel
                            </div>
                            <button
                              onClick={closeWindow}
                              className="bg-red-600 hover:bg-red-500 px-2 py-1 text-xs border border-red-400"
                            >
                              ✕
                            </button>
                          </div>

                          {/* Settings List Header */}
                          <div className="bg-zinc-800 text-green-300 p-2 text-xs border-b border-gray-600 flex">
                            <div className="w-1/2">SETTING NAME</div>
                            <div className="w-1/4">CATEGORY</div>
                            <div className="w-1/4">ACCESS LEVEL</div>
                          </div>

                          {/* Settings List */}
                          <div className="flex-1 bg-black p-2 overflow-y-auto">
                            {systemSettings.map((setting, index) => (
                              <div
                                key={index}
                                className="flex items-center py-2 px-2 hover:bg-orange-900/50 cursor-pointer text-green-400 text-sm"
                                onClick={() => handleSettingClick(setting.name)}
                              >
                                <div className="w-1/2 flex items-center">
                                  <span className="mr-2">{setting.icon}</span>
                                  {setting.name}
                                </div>
                                <div className="w-1/4">{setting.category}</div>
                                <div className="w-1/4 text-yellow-400">
                                  {setting.access}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Status Bar */}
                          <div className="bg-gray-700 text-yellow-300 p-2 text-xs border-t border-gray-600">
                            {systemSettings.length} settings | Administrative
                            access required
                          </div>
                        </div>
                      )}

                      {/* Terminal Window (only show when no other window is open) */}
                      {!activeWindow && (
                        <div className="bg-black border border-gray-500 p-4 max-w-2xl mx-auto">
                          <div className="bg-gray-700 text-white text-xs py-1 px-3 mb-3 border-b border-gray-500">
                            Terminal - mom@retro-comp
                          </div>
                          <div className="text-green-400 text-sm">
                            <div>$ whoami</div>
                            <div>mom</div>
                            <div>
                              $ echo "Challenge completed successfully!"
                            </div>
                            <div>Challenge completed successfully!</div>
                            <div>$ date</div>
                            <div>
                              {formatDate(currentTime)}{" "}
                              {formatTime(currentTime)}
                            </div>
                            <div className="mt-2">
                              $ █
                              {blinkCursor && (
                                <span className="animate-pulse">_</span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetroComputerLogin;
