import React, { useState, useEffect } from "react";
import {
  Trash2,
  Calculator,
  Terminal,
  Folder,
  X,
  Minimize,
  Square,
  FileText,
  Image,
  Music,
  Settings,
  Monitor,
  HardDrive,
  Wifi,
  Volume2,
  Calendar,
  Clock,
  Camera,
  Download,
  Mail,
  User,
  Lock,
  Shield,
  Zap,
  Database,
  Code,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUserData } from "./UserDataProvider";

const DesktopMinigames = () => {
  const [discoveredNumbers, setDiscoveredNumbers] = useState([]);
  const [openWindows, setOpenWindows] = useState([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const { addXPForTask, userXP } = useUserData();

  // Mini-game states
  const [trashOpened, setTrashOpened] = useState(false);
  const [batFileOpened, setBatFileOpened] = useState(false);
  const [calculatorInput, setCalculatorInput] = useState("");
  const [calculatorFlipped, setCalculatorFlipped] = useState(false);
  const [terminalCommands, setTerminalCommands] = useState([]);
  const [terminalInput, setTerminalInput] = useState("");
  const [currentFolder, setCurrentFolder] = useState("Desktop");
  const [fileExplorerPath, setFileExplorerPath] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const hiddenNumbers = [2, 7, 4]; // The three numbers to discover

  const handleXP = async () => {
    try {
      if (userXP === 400) {
        const result = await addXPForTask(100); // Add 100 XP

        if (result.success) {
          console.log("XP added successfully:", result.newXP);
        } else {
          console.error("Failed to add XP:", result.error);
          if (result.error.includes("already has XP")) {
            console.log("(XP already earned)");
          } else {
            console.log("(XP update failed)");
          }
        }
      } else if (userXP == 500) {
        console.log("(XP already earned)");
      }
    } catch (error) {
      console.error("Failed:", error);
    }
  };

  useEffect(() => {
    if (discoveredNumbers.length === 3) {
      setGameCompleted(true);
      handleXP();
    }
  }, [discoveredNumbers]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const addDiscoveredNumber = (number) => {
    if (!discoveredNumbers.includes(number)) {
      setDiscoveredNumbers([...discoveredNumbers, number]);
    }
  };

  const openWindow = (windowType) => {
    if (!openWindows.includes(windowType)) {
      setOpenWindows([...openWindows, windowType]);
    }
  };

  const closeWindow = (windowType) => {
    setOpenWindows(openWindows.filter((w) => w !== windowType));
  };

  const getWindowPosition = (windowType) => {
    const positions = {
      trash: { top: "10%", left: "15%" },
      calculator: { top: "15%", left: "25%" },
      terminal: { top: "20%", left: "35%" },
      explorer: { top: "12%", left: "20%" },
      settings: { top: "18%", left: "30%" },
      clock: { top: "25%", left: "40%" },
      volume: { top: "22%", left: "45%" },
      default: { top: "16%", left: "28%" },
    };

    return positions[windowType] || positions.default;
  };

  const WindowFrame = ({
    title,
    onClose,
    children,
    width = "w-96",
    height = "h-150",
    windowType = "default",
  }) => {
    const position = getWindowPosition(windowType);

    return (
      <div
        className={`absolute bg-black border-2 border-green-400 ${width} ${height} shadow-2xl shadow-green-400/30`}
        style={{ top: position.top, left: position.left, zIndex: 10 }}
      >
        <div className="bg-gradient-to-r from-green-900 to-green-800 text-green-100 px-2 py-1 flex justify-between items-center border-b border-green-400">
          <span className="text-sm font-bold font-mono">{title}</span>
          <div className="flex gap-1">
            <button className="w-4 h-4 bg-yellow-500 rounded-sm border border-yellow-600 hover:bg-yellow-400"></button>
            <button className="w-4 h-4 bg-blue-500 rounded-sm border border-blue-600 hover:bg-blue-400"></button>
            <button
              onClick={onClose}
              className="w-4 h-4 bg-red-600 rounded-sm flex items-center justify-center border border-red-700 hover:bg-red-500"
            >
              <X size={8} />
            </button>
          </div>
        </div>
        <div className="p-4 h-full overflow-auto bg-black text-green-400">
          {children}
        </div>
      </div>
    );
  };

  // Expanded File System Structure
  const fileSystem = {
    Desktop: {
      type: "folder",
      children: {
        "My Computer": {
          type: "folder",
          children: {
            "C:": {
              type: "folder",
              children: {
                System32: {
                  type: "folder",
                  children: {
                    "calc.exe": {
                      type: "app",
                      action: () => openWindow("calculator"),
                    },
                    "cmd.exe": {
                      type: "app",
                      action: () => openWindow("terminal"),
                    },
                    "notepad.exe": { type: "app" },
                    "regedit.exe": {
                      type: "app",
                      content: "⚠️ Registry Editor - Handle with care!",
                    },
                    "services.msc": {
                      type: "app",
                      content: "Services Console - All systems operational",
                    },
                    drivers: {
                      type: "folder",
                      children: {
                        "audio.sys": {
                          type: "file",
                          content: "Audio driver v2.1.4 - Working",
                        },
                        "video.sys": {
                          type: "file",
                          content:
                            "Graphics driver v1.8.9 - Optimized for retro",
                        },
                        "network.sys": {
                          type: "file",
                          content: "Network adapter - Connected to Matrix",
                        },
                      },
                    },
                    config: {
                      type: "folder",
                      children: {
                        "boot.ini": {
                          type: "file",
                          content:
                            '[boot loader]\ntimeout=30\ndefault=C:\\WINDOWS\n\n[operating systems]\nC:\\WINDOWS="RetroOS"',
                        },
                        "system.dat": {
                          type: "file",
                          content:
                            "System configuration data - Last modified: 1999",
                        },
                      },
                    },
                  },
                },
                "Program Files": {
                  type: "folder",
                  children: {
                    "Internet Explorer": {
                      type: "folder",
                      children: {
                        "iexplore.exe": {
                          type: "app",
                          content: "Welcome to the World Wide Web! 🌐",
                        },
                      },
                    },
                    "Windows Media Player": {
                      type: "folder",
                      children: {
                        "wmplayer.exe": {
                          type: "app",
                          content: "♪ Now playing: Windows XP Startup Sound",
                        },
                      },
                    },
                    Paint: {
                      type: "folder",
                      children: {
                        "mspaint.exe": {
                          type: "app",
                          content: "🎨 MS Paint - Create digital masterpieces!",
                        },
                      },
                    },
                    "Retro Games": {
                      type: "folder",
                      children: {
                        "space_invaders.exe": {
                          type: "app",
                          content: "👾 SPACE INVADERS - Classic arcade action!",
                        },
                        "pong.exe": {
                          type: "app",
                          content: "🏓 PONG - The original video game!",
                        },
                        "snake.exe": {
                          type: "app",
                          content: "🐍 SNAKE - Eat and grow!",
                        },
                      },
                    },
                  },
                },
                Users: {
                  type: "folder",
                  children: {
                    Public: {
                      type: "folder",
                      children: {
                        Desktop: {
                          type: "folder",
                          children: {
                            "Welcome.txt": {
                              type: "file",
                              content:
                                "Welcome to RetroOS!\nEnjoy your journey through time.",
                            },
                          },
                        },
                        Downloads: {
                          type: "folder",
                          children: {
                            "awesome_screensaver.scr": {
                              type: "file",
                              content: "✨ Flying Toasters v3.0",
                            },
                            "midi_collection.zip": {
                              type: "file",
                              content: "🎵 Greatest MIDI hits of the 90s",
                            },
                          },
                        },
                      },
                    },
                    Administrator: {
                      type: "folder",
                      children: {
                        Desktop: {
                          type: "folder",
                          children: {
                            "secret_project.txt": {
                              type: "file",
                              content:
                                "PROJECT: RETROOS\nStatus: Complete\nEaster eggs: Many",
                            },
                          },
                        },
                        Documents: {
                          type: "folder",
                          children: {
                            "secret_notes.txt": {
                              type: "file",
                              content:
                                "Nothing interesting here... or is there? 🤔\n\nPS: Check the mysterious.log file!",
                            },
                            "passwords.txt": {
                              type: "file",
                              content:
                                "hunter2\nadmin123\npassword\n\n...wait, what was that calculator trick again?\n\nHint: Think upside down! 🙃",
                            },
                            "diary.txt": {
                              type: "file",
                              content:
                                "Dear Diary,\nToday I hid some numbers around the system.\nOne in the tr**h, one in the cal****tor, and one in the t*r***al.\nI hope nobody finds them! 😈",
                            },
                            "TODO.txt": {
                              type: "file",
                              content:
                                "TODO List:\n☑ Hide secret numbers\n☐ Fix calculator bugs\n☐ Add more easter eggs\n☐ Increase terminal security",
                            },
                          },
                        },
                        Pictures: {
                          type: "folder",
                          children: {
                            "family_1995.bmp": {
                              type: "file",
                              content:
                                "👨‍👩‍👧‍👦 Family photo from 1995 - Good times!",
                            },
                            "desktop_wallpaper.bmp": {
                              type: "file",
                              content: "🖼️ That classic green hill wallpaper",
                            },
                            "my_first_digital_photo.jpg": {
                              type: "file",
                              content:
                                "📸 Blurry but memorable - 0.3 megapixels!",
                            },
                          },
                        },
                        Downloads: {
                          type: "folder",
                          children: {
                            "definitely_not_virus.exe": {
                              type: "file",
                              content:
                                "ERROR: File corrupted\n\nJust kidding! This is safe. 😄",
                            },
                            homework_folder: {
                              type: "folder",
                              children: {
                                "math_homework.txt": {
                                  type: "file",
                                  content:
                                    "Pi = 3.14159265358979323846...\nRemember: count digits carefully!\n\nThe 20th digit after the decimal is... wait, someone might be watching! 👀",
                                },
                                "chemistry_notes.txt": {
                                  type: "file",
                                  content:
                                    "H2O = Water\nNaCl = Salt\nC6H12O6 = Sugar\n\n...why do I feel like someone is looking for numbers?",
                                },
                                "history_essay.doc": {
                                  type: "file",
                                  content:
                                    "The year 1984 was significant...\nBut 2024 is when retro computing became cool again!",
                                },
                              },
                            },
                            games_collection: {
                              type: "folder",
                              children: {
                                "solitaire_highscores.txt": {
                                  type: "file",
                                  content:
                                    "High Scores:\n1. Anonymous - 2:47\n2. Player1 - 7:42\n3. Mom - 4:24",
                                },
                                "cheat_codes.txt": {
                                  type: "file",
                                  content:
                                    "DOOM: IDDQD (God mode)\nAge of Empires: how do you turn this on\nSimCity: FUNDS (money)",
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
                Windows: {
                  type: "folder",
                  children: {
                    System: {
                      type: "folder",
                      children: {
                        "kernel32.dll": {
                          type: "file",
                          content: "Core system library - DO NOT DELETE!",
                        },
                        "user32.dll": {
                          type: "file",
                          content:
                            "User interface library - Essential for windows",
                        },
                      },
                    },
                    Temp: {
                      type: "folder",
                      children: {
                        "cache001.tmp": {
                          type: "file",
                          content: "Temporary cache file - safe to delete",
                        },
                        "cache002.tmp": {
                          type: "file",
                          content: "More temporary data - cleanup recommended",
                        },
                        "mysterious.log": {
                          type: "file",
                          content:
                            "LOG: User attempted calculator input: 80085\nLOG: User attempted calculator input: 1134\nLOG: User attempted calculator input: 5318008\nLOG: \nLOG: Calculator easter egg discovered by 12 users\nLOG: Some users are getting closer to the truth...",
                        },
                        "debug.log": {
                          type: "file",
                          content:
                            "DEBUG: System initialized at 1999-12-31 23:59:59\nDEBUG: Y2K bug... not found? 🤔\nDEBUG: Time travel module: ACTIVE\nDEBUG: Easter egg hunt: IN PROGRESS",
                        },
                        "install.log": {
                          type: "file",
                          content:
                            "Installation Log:\n✓ RetroOS Core\n✓ Nostalgia Package\n✓ Easter Egg Collection\n✓ Hidden Number System\n\nInstallation complete!",
                        },
                      },
                    },
                    Media: {
                      type: "folder",
                      children: {
                        "startup.wav": {
                          type: "file",
                          content: "🔊 *Classic Windows startup sound*",
                        },
                        "shutdown.wav": {
                          type: "file",
                          content: "🔊 *Windows shutdown sound*",
                        },
                        "error.wav": {
                          type: "file",
                          content: "🔊 *Error beep* - Ding!",
                        },
                      },
                    },
                    Fonts: {
                      type: "folder",
                      children: {
                        "arial.ttf": {
                          type: "file",
                          content: "Arial font family - Clean and readable",
                        },
                        "times.ttf": {
                          type: "file",
                          content: "Times New Roman - Classic serif font",
                        },
                        "courier.ttf": {
                          type: "file",
                          content:
                            "Courier New - Perfect for code and terminals",
                        },
                      },
                    },
                  },
                },
                Recycler: {
                  type: "folder",
                  children: {
                    INFO2: {
                      type: "file",
                      content: "Recycle bin index file - Binary data",
                    },
                    "DC0.tmp": {
                      type: "file",
                      content:
                        "Deleted file cache - May contain traces of deleted items",
                    },
                  },
                },
              },
            },
            "D:": {
              type: "folder",
              children: {
                Backup: {
                  type: "folder",
                  children: {
                    "system_backup_1999.zip": {
                      type: "file",
                      content: "💾 Full system backup from Y2K preparation",
                    },
                    "personal_files.zip": {
                      type: "file",
                      content: "📁 Compressed personal documents and photos",
                    },
                  },
                },
                Games_Archive: {
                  type: "folder",
                  children: {
                    "classic_games.iso": {
                      type: "file",
                      content: "🎮 Collection of retro games - Mount to play",
                    },
                    saved_games: {
                      type: "folder",
                      children: {
                        "sim_city_metropolis.sav": {
                          type: "file",
                          content:
                            "🏙️ My greatest city - Population: 2,000,000",
                        },
                        "doom_nightmare.sav": {
                          type: "file",
                          content: "👹 Level 27 - Ultra Violence mode",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "Recycle Bin": {
          type: "app",
          action: () => {
            setTrashOpened(true);
            openWindow("trash");
          },
        },
        "My Documents": {
          type: "folder",
          children: {
            Letters: {
              type: "folder",
              children: {
                "to_future_self.txt": {
                  type: "file",
                  content:
                    "Dear Future Me,\n\nIf you're reading this, you found the hidden folder!\nThe numbers you seek are scattered like digital breadcrumbs.\nLook for patterns, think like a hacker, and remember:\nSometimes the answer is right in front of you. 🔍",
                },
                "grandma_recipe.txt": {
                  type: "file",
                  content:
                    "Grandma's Secret Cookie Recipe:\n2 cups flour\n7 chocolate chips per cookie\n4 tablespoons butter\n\n...wait, those numbers seem familiar! 🍪",
                },
              },
            },
            Work: {
              type: "folder",
              children: {
                "project_alpha.txt": {
                  type: "file",
                  content:
                    "PROJECT ALPHA - CLASSIFIED\n\nObjective: Create immersive retro experience\nStatus: 99% complete\nRemaining: Hide final secrets\n\nNote: Users love treasure hunts! 🗝️",
                },
                "meeting_notes.txt": {
                  type: "file",
                  content:
                    "Meeting Notes - Dec 31, 1999\n\n- Y2K preparations complete\n- Easter eggs deployed\n- User engagement metrics look good\n- Remember to test calculator easter egg",
                },
              },
            },
          },
        },
        Games: {
          type: "folder",
          children: {
            "Solitaire.exe": {
              type: "file",
              content: "Classic card game - Patience is a virtue 🃏",
            },
            "Minesweeper.exe": {
              type: "file",
              content: "Boom! 💥 Game Over\nBest time: 2:47 (Beginner)",
            },
            "Snake.exe": {
              type: "file",
              content:
                "ERROR: Graphics driver not found\nTry updating your display drivers!",
            },
            "FreeCell.exe": {
              type: "file",
              content: "FreeCell Solitaire - Deal #1982 is impossible!",
            },
            "Pinball.exe": {
              type: "file",
              content: "🎯 3D Pinball for Windows - High Score: 2,747,000",
            },
          },
        },
        "Work Stuff": {
          type: "folder",
          children: {
            "important.docx": {
              type: "file",
              content:
                "Meeting notes:\n- Remember to fix the calculator (it adds random numbers!)\n- Terminal access granted to new users\n- Clean up recycle bin\n- Hide those secret numbers better next time",
            },
            "budget.xlsx": {
              type: "file",
              content:
                "Q4 Budget Analysis:\nRevenue: $2,747,000\nExpenses: $1,999,999\nProfit: $747,001\n\nERROR: Division by zero in cell B7",
            },
            "passwords_backup.txt": {
              type: "file",
              content:
                "🔐 ENCRYPTED PASSWORD FILE 🔐\n\nsystem: hunter2\ncalculator: 5318008\nterminal: whoami\n\n(These aren't the real passwords... or are they?)",
            },
          },
        },
        Pictures: {
          type: "folder",
          children: {
            "vacation.jpg": {
              type: "file",
              content: "🏖️ Beach photo - Nice memories from summer '99!",
            },
            "family.png": {
              type: "file",
              content: "👨‍👩‍👧‍👦 Family portrait - Everyone looks so young!",
            },
            "screenshot.bmp": {
              type: "file",
              content: "Screenshot of desktop... wait, this is recursive! 🔄",
            },
            "my_cat.jpg": {
              type: "file",
              content: "🐱 Mr. Whiskers - Best cat in the world!",
            },
            desktop_wallpaper_collection: {
              type: "folder",
              children: {
                "matrix_rain.bmp": {
                  type: "file",
                  content: "💚 Classic Matrix-style digital rain",
                },
                "starfield.bmp": {
                  type: "file",
                  content: "⭐ Moving stars screensaver background",
                },
                "pipes.bmp": {
                  type: "file",
                  content: "🔧 3D Pipes screensaver - Mesmerizing!",
                },
              },
            },
          },
        },
        Music: {
          type: "folder",
          children: {
            "playlist.m3u": {
              type: "file",
              content:
                "♪ Now playing: Darude - Sandstorm\n♪ Up next: Eiffel 65 - Blue\n♪ Queue: All Star - Smash Mouth",
            },
            "oldschool.mp3": {
              type: "file",
              content: "♪ Retro synthwave vibes - Perfect for coding",
            },
            windows_sounds: {
              type: "folder",
              children: {
                "startup.wav": {
                  type: "file",
                  content: "🔊 That iconic Windows startup sound",
                },
                "shutdown.wav": {
                  type: "file",
                  content: "🔊 The goodbye melody",
                },
                "notification.wav": {
                  type: "file",
                  content: "🔊 *Ding* - You've got mail!",
                },
              },
            },
            midi_collection: {
              type: "folder",
              children: {
                "canyon.mid": {
                  type: "file",
                  content: "🎵 Canyon.mid - The most famous MIDI file ever",
                },
                "passport.mid": {
                  type: "file",
                  content: "🎵 Passport.mid - Smooth jazz vibes",
                },
              },
            },
          },
        },
        "Network Neighborhood": {
          type: "folder",
          children: {
            WORKGROUP: {
              type: "folder",
              children: {
                "OFFICE-PC": {
                  type: "folder",
                  children: {
                    SharedDocs: {
                      type: "folder",
                      children: {
                        "team_project.txt": {
                          type: "file",
                          content: "Shared project file - Last modified by Bob",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "Control Panel": { type: "app", action: () => openWindow("settings") },
        Printers: {
          type: "folder",
          children: {
            "HP LaserJet": {
              type: "file",
              content: "🖨️ Printer Status: Ready\nToner: 78%\nPaper: Loaded",
            },
          },
        },
      },
    },
  };

  // File Explorer Component
  const FileExplorer = () => {
    const getCurrentFolder = () => {
      let current = fileSystem.Desktop.children;
      for (const path of fileExplorerPath) {
        current = current[path].children;
      }
      return current;
    };

    const navigateToFolder = (folderName) => {
      setFileExplorerPath([...fileExplorerPath, folderName]);
    };

    const navigateBack = () => {
      setFileExplorerPath(fileExplorerPath.slice(0, -1));
    };

    const currentFolder = getCurrentFolder();
    const currentPath =
      fileExplorerPath.length === 0 ? "Desktop" : fileExplorerPath.join(" > ");

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 bg-black p-2 rounded border border-green-500">
          <button
            onClick={navigateBack}
            disabled={fileExplorerPath.length === 0}
            className="px-2 py-1 bg-green-800 text-green-100 rounded text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
          >
            ← Back
          </button>
          <span className="text-green-300 font-mono text-sm">
            📁 {currentPath}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
          {Object.entries(currentFolder).map(([name, item]) => (
            <div
              key={name}
              className="p-2 bg-gray-900 border border-green-500 cursor-pointer hover:bg-gray-800 hover:border-green-400 transition-all flex items-center gap-2"
              onClick={() => {
                if (item.type === "folder") {
                  navigateToFolder(name);
                } else if (item.type === "app" && item.action) {
                  item.action();
                } else if (item.type === "file" || item.type === "app") {
                  openWindow(`file_${name}`);
                }
              }}
            >
              {item.type === "folder"
                ? "📁"
                : item.type === "app"
                ? "⚙️"
                : "📄"}
              <span className="text-green-300 text-sm font-mono truncate">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // File Viewer Component
  const FileViewer = ({ fileName }) => {
    const getFileContent = (fileName) => {
      // Search through file system for the file
      const searchFile = (obj, target) => {
        for (const [name, item] of Object.entries(obj)) {
          if (
            name === target &&
            (item.type === "file" || item.type === "app")
          ) {
            return (
              item.content ||
              `File: ${name}\nType: ${item.type}\nNo preview available.`
            );
          }
          if (item.children) {
            const result = searchFile(item.children, target);
            if (result) return result;
          }
        }
        return null;
      };

      return (
        searchFile(fileSystem.Desktop.children, fileName) ||
        `Error: Could not load ${fileName}`
      );
    };

    return (
      <div className="font-mono text-sm">
        <div className="bg-black p-3 rounded border border-green-500 whitespace-pre-wrap">
          {getFileContent(fileName)}
        </div>
      </div>
    );
  };

  // Mini-Game 1: Enhanced Junk File Reboot
  const JunkFileGame = () => (
    <div className="space-y-4 ">
      <h3 className="font-bold text-lg text-green-300 font-mono">
        📁 RECYCLE_BIN.SYS
      </h3>
      <div className="text-xs text-green-500 mb-4">
        {trashOpened
          ? "Items ready for permanent deletion..."
          : "Click items to examine contents"}
      </div>
      <div className="grid grid-cols-2 gap-2 ">
        <div className="p-2 bg-gray-900 border border-green-500 cursor-pointer hover:bg-gray-800">
          <div className="text-xs text-green-400">🐕 doge_meme.exe</div>
          <div className="text-xs text-gray-500">Such delete, much wow</div>
        </div>
        <div className="p-2 bg-gray-900 border border-green-500 cursor-pointer hover:bg-gray-800">
          <div className="text-xs text-green-400">📝 shopping_list.txt</div>
          <div className="text-xs text-gray-500">
            1 apples, 6 bananas, 0 oranges
          </div>
        </div>
        <div className="p-2 bg-gray-900 border border-green-500 cursor-pointer hover:bg-gray-800">
          <div className="text-xs text-green-400">📁 old_photos_2019</div>
          <div className="text-xs text-gray-500">248 items</div>
        </div>
        <div
          className="p-2 bg-red-900 border border-red-400 cursor-pointer hover:bg-red-800"
          onClick={() => setBatFileOpened(true)}
        >
          <div className="text-xs text-red-300">⚠️ _DO_NOT_OPEN.bat</div>
          <div className="text-xs text-red-500">SYSTEM FILE - DANGER</div>
        </div>
        <div className="p-2 bg-gray-900 border border-green-500 cursor-pointer hover:bg-gray-800">
          <div className="text-xs text-green-400">🎵 never_gonna.mp3</div>
          <div className="text-xs text-gray-500">♪ Give you up...</div>
        </div>
        <div className="p-2 bg-gray-900 border border-green-500 cursor-pointer hover:bg-gray-800">
          <div className="text-xs text-green-400">💾 backup_2023.zip</div>
          <div className="text-xs text-gray-500">847 MB compressed</div>
        </div>
        <div className="p-2 bg-gray-900 border border-green-500 cursor-pointer hover:bg-gray-800">
          <div className="text-xs text-green-400">🖼️ mystery_image.bmp</div>
          <div className="text-xs text-gray-500">Deleted by accident?</div>
        </div>
        <div className="p-2 bg-gray-900 border border-green-500 cursor-pointer hover:bg-gray-800">
          <div className="text-xs text-green-400">📊 financial_data.xls</div>
          <div className="text-xs text-gray-500">Tax records 1999</div>
        </div>
      </div>
      {batFileOpened && (
        <div className="mt-4 p-4 bg-black border border-red-400 text-green-400 font-mono text-xs">
          <div className="mb-2 text-red-400 animate-pulse">
            ⚠️ SYSTEM BREACH DETECTED ⚠️
          </div>
          <div className="ascii-art text-green-300">
            <pre>{`
   ╔═══════════════════╗
   ║   GLITCH MODE     ║
   ║     ACTIVE        ║
   ╚═══════════════════╝
     ▲ ▲ ▲ ▲ ▲ ▲ ▲
    ███████████████████
            `}</pre>
          </div>
          <div className="mt-2 text-green-500">EXTRACTING HIDDEN DATA...</div>
          <div
            className="scrambled-text cursor-pointer hover:text-white transition-colors duration-500 mt-2 relative"
            onMouseEnter={() => addDiscoveredNumber(2)}
            title="Hover to decrypt signal!"
          >
            <span className="text-red-400">ENCRYPTED: </span>
            <span className="hover-reveal text-green-400">₂ƭΨ∃ɿ⟂ЯẸϻßΣя</span>
            <div className="hover-hidden opacity-0 hover:opacity-100 transition-opacity duration-500 absolute top-0 left-0 bg-black p-1 border border-green-400 z-10">
              <span className="text-green-300">DECRYPTED: THE NUMBER IS 2</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Mini-Game 2: Enhanced Wrong Calculator
  const CalculatorGame = () => {
    const handleCalculatorInput = (value) => {
      const newInput = calculatorInput + value;
      setCalculatorInput(newInput);

      if (newInput === "5318008") {
        setCalculatorFlipped(true);
        addDiscoveredNumber(7);
      }
    };

    const calculateWrong = () => {
      if (calculatorInput === "5318008") return "hELLO";

      try {
        const result = eval(calculatorInput.replace(/[^0-9+\-*/().]/g, ""));
        return isNaN(result)
          ? "ERROR"
          : result + Math.floor(Math.random() * 10) + 1;
      } catch {
        return "ERROR";
      }
    };

    return (
      <div className="space-y-4">
        {calculatorFlipped ? (
          <div className="text-center p-8 bg-black border border-green-400 text-green-400 rounded">
            <h2 className="text-2xl mb-4 font-mono">🎉 SYSTEM UNLOCKED 🎉</h2>
            <div className="text-6xl font-bold text-green-300 font-mono animate-pulse">
              7
            </div>
            <p className="mt-4 text-green-500">SECOND_NUMBER.EXE EXECUTED</p>
            <div className="mt-2 text-xs text-green-600">
              Classic calculator humor detected ✓
            </div>
          </div>
        ) : (
          <div className="bg-black border border-green-400 p-4 rounded">
            <div className="bg-gray-900 text-green-300 p-3 mb-4 text-right font-mono border border-green-500 text-lg">
              {calculatorInput || "0"}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                "7",
                "8",
                "9",
                "/",
                "4",
                "5",
                "6",
                "*",
                "1",
                "2",
                "3",
                "-",
                "0",
                ".",
                "=",
                "+",
              ].map((btn) => (
                <button
                  key={btn}
                  className="bg-gray-900 hover:bg-gray-800 text-green-300 p-3 rounded border border-green-500 font-mono hover:border-green-400 transition-all"
                  onClick={() =>
                    btn === "="
                      ? setCalculatorInput(calculateWrong().toString())
                      : handleCalculatorInput(btn)
                  }
                >
                  {btn}
                </button>
              ))}
            </div>
            <button
              className="w-full mt-2 bg-red-900 hover:bg-red-800 text-red-300 p-2 rounded border border-red-400 font-mono"
              onClick={() => setCalculatorInput("")}
            >
              [CLEAR]
            </button>
            <div className="text-xs text-green-600 mt-2 text-center font-mono">
              🤖 CALC.EXE v1.0 - Results may vary...
            </div>
            <div className="text-xs text-green-700 mt-1 text-center">
              Hint: Try some classic calculator fun 😏
            </div>
          </div>
        )}
      </div>
    );
  };

  // Mini-Game 3: Enhanced Terminal
  const TerminalGame = () => {
    const executeCommand = (command) => {
      const newCommands = [
        ...terminalCommands,
        `C:\\SYSTEM32> ${terminalInput}`,
      ];

      if (command === "whoami") {
        newCommands.push("");
        newCommands.push("IDENTITY_PROTOCOL.EXE");
        newCommands.push("Scanning user credentials...");
        newCommands.push("I am your secret number you are looking for,");
        newCommands.push("its the 20th number of pi after the 3.");
        newCommands.push("");
        newCommands.push("π = 3.1415926535897932384626433832795...");
        newCommands.push("       ^               ^");
        newCommands.push("       3               20th digit = 4");
        newCommands.push("");
        newCommands.push("THIRD_NUMBER.DAT unlocked: 4");
        addDiscoveredNumber(4);
      } else if (command === "help") {
        newCommands.push("Available commands:");
        newCommands.push("  whoami    - Display current user identity");
        newCommands.push("  help      - Show this help message");
        newCommands.push("  clear     - Clear terminal screen");
        newCommands.push("  dir       - List directory contents");
        newCommands.push("  date      - Show current date/time");
        newCommands.push("  ver       - Show system version");
        newCommands.push("  matrix    - Enter the Matrix");
        newCommands.push("  hack      - Initiate hacking sequence");
        newCommands.push("  secret    - Access classified files");
      } else if (command === "clear" || command === "cls") {
        setTerminalCommands([]);
        setTerminalInput("");
        return;
      } else if (command === "dir" || command === "ls") {
        newCommands.push("Directory of C:\\SYSTEM32");
        newCommands.push("");
        newCommands.push("📁 drivers          📄 config.sys");
        newCommands.push("📄 secrets.dll      📄 hidden.dat");
        newCommands.push("📄 mystery.exe      📁 logs");
        newCommands.push("⚠️  DO_NOT_RUN.bat  📄 kernel32.dll");
        newCommands.push("📄 easter_egg.txt   📁 classified");
      } else if (command === "date") {
        newCommands.push(`Current date: ${currentTime.toLocaleDateString()}`);
        newCommands.push(`Current time: ${currentTime.toLocaleTimeString()}`);
      } else if (command === "ver") {
        newCommands.push("RetroOS Version 3.14159 [Build 2024.0420]");
        newCommands.push("(c) RetroSoft Corporation.");
        newCommands.push("Licensed to: Nostalgic User");
      } else if (command === "matrix") {
        newCommands.push("");
        newCommands.push("Entering the Matrix...");
        newCommands.push("Reality.exe has stopped working");
        newCommands.push("");
        newCommands.push("Wake up, Neo... 👁️");
        newCommands.push("The Matrix has you...");
        newCommands.push("Follow the white rabbit 🐰");
      } else if (command === "hack") {
        newCommands.push("");
        newCommands.push("INITIATING HACK SEQUENCE...");
        newCommands.push("Connecting to mainframe...");
        newCommands.push("Bypassing security protocols...");
        newCommands.push("Access denied.");
        newCommands.push("");
        newCommands.push("Just kidding! This is just a game 😄");
      } else if (command === "secret") {
        newCommands.push("");
        newCommands.push("CLASSIFIED FILE ACCESS");
        newCommands.push("Security clearance: GRANTED");
        newCommands.push("");
        newCommands.push("File: PROJECT_NUMBERS.txt");
        newCommands.push("Status: Hidden throughout system");
        newCommands.push("Locations: Trash, Calculator, Terminal");
        newCommands.push("Progress: Check your desktop counter!");
      } else if (command.startsWith("echo ")) {
        newCommands.push(command.substring(5));
      } else {
        newCommands.push(
          `'${terminalInput}' is not recognized as an internal or external command,`
        );
        newCommands.push("operable program or batch file.");
        newCommands.push('Type "help" for available commands.');
      }

      setTerminalCommands(newCommands);
      setTerminalInput("");
    };

    return (
      <div className="bg-black text-green-400 font-mono text-sm h-72 p-3 overflow-y-auto border border-green-400">
        <div className="text-green-300">
          Microsoft Windows [Version 10.0.19041.546]
        </div>
        <div className="text-green-500">
          (c) Microsoft Corporation. All rights reserved.
        </div>
        <div className="text-green-600 mt-1">
          System initialized... Ready for input.
        </div>
        <div className="mt-2"></div>

        {terminalCommands.map((cmd, i) => (
          <div
            key={i}
            className={
              cmd.startsWith("C:\\>") ? "text-white" : "text-green-400"
            }
          >
            {cmd}
          </div>
        ))}

        <div className="flex items-center mt-1">
          <span className="text-white">C:\SYSTEM32&gt; </span>
          <input
            type="text"
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                executeCommand(terminalInput.trim().toLowerCase());
              }
            }}
            className="bg-transparent border-none outline-none text-green-400 flex-1 ml-1"
            autoFocus
            placeholder="Type 'help' for commands..."
          />
        </div>
      </div>
    );
  };

  // Desktop icons with more variety
  const desktopIcons = [
    // Left column
    {
      name: "My Computer",
      icon: Monitor,
      x: 20,
      y: 20,
      action: () => openWindow("explorer"),
    },
    {
      name: "Recycle Bin",
      icon: Trash2,
      x: 20,
      y: 120,
      action: () => {
        setTrashOpened(true);
        openWindow("trash");
      },
    },
    {
      name: "My Documents",
      icon: Folder,
      x: 20,
      y: 220,
      action: () => {
        setFileExplorerPath(["My Documents"]);
        openWindow("explorer");
      },
    },
    {
      name: "Network",
      icon: Wifi,
      x: 20,
      y: 320,
      action: () => {
        setFileExplorerPath(["Network Neighborhood"]);
        openWindow("explorer");
      },
    },
    {
      name: "Control Panel",
      icon: Settings,
      x: 20,
      y: 420,
      action: () => openWindow("settings"),
    },

    // Second column
    {
      name: "Calculator",
      icon: Calculator,
      x: 120,
      y: 20,
      action: () => openWindow("calculator"),
    },
    {
      name: "Terminal",
      icon: Terminal,
      x: 120,
      y: 120,
      action: () => openWindow("terminal"),
    },
    {
      name: "Games",
      icon: Terminal,
      x: 120,
      y: 220,
      action: () => {
        setFileExplorerPath(["Games"]);
        openWindow("explorer");
      },
    },
    {
      name: "Music",
      icon: Music,
      x: 120,
      y: 320,
      action: () => {
        setFileExplorerPath(["Music"]);
        openWindow("explorer");
      },
    },
    {
      name: "Pictures",
      icon: Image,
      x: 120,
      y: 420,
      action: () => {
        setFileExplorerPath(["Pictures"]);
        openWindow("explorer");
      },
    },

    // Third column
    {
      name: "System32",
      icon: HardDrive,
      x: 220,
      y: 20,
      action: () => {
        setFileExplorerPath(["My Computer", "C:", "System32"]);
        openWindow("explorer");
      },
    },
    {
      name: "Downloads",
      icon: Download,
      x: 220,
      y: 120,
      action: () => {
        setFileExplorerPath([
          "My Computer",
          "C:",
          "Users",
          "Administrator",
          "Downloads",
        ]);
        openWindow("explorer");
      },
    },
    {
      name: "Printers",
      icon: FileText,
      x: 220,
      y: 220,
      action: () => {
        setFileExplorerPath(["Printers"]);
        openWindow("explorer");
      },
    },
    {
      name: "Clock",
      icon: Clock,
      x: 220,
      y: 320,
      action: () => openWindow("clock"),
    },
    {
      name: "Volume",
      icon: Volume2,
      x: 220,
      y: 420,
      action: () => openWindow("volume"),
    },

    // Fourth column (scattered)
    {
      name: "Secret Files",
      icon: Lock,
      x: 320,
      y: 50,
      action: () => {
        setFileExplorerPath(["My Computer", "C:", "Users", "Administrator"]);
        openWindow("explorer");
      },
    },
    {
      name: "Backup Drive",
      icon: Database,
      x: 320,
      y: 170,
      action: () => {
        setFileExplorerPath(["My Computer", "D:"]);
        openWindow("explorer");
      },
    },
    {
      name: "Temp Files",
      icon: FileText,
      x: 320,
      y: 290,
      action: () => {
        setFileExplorerPath(["My Computer", "C:", "Windows", "Temp"]);
        openWindow("explorer");
      },
    },

    // Scattered around for discovery
    {
      name: "Hidden Folder",
      icon: Folder,
      x: 400,
      y: 80,
      action: () => {
        setFileExplorerPath(["My Documents", "Letters"]);
        openWindow("explorer");
      },
    },
    {
      name: "Logs",
      icon: FileText,
      x: 480,
      y: 200,
      action: () => {
        setFileExplorerPath(["My Computer", "C:", "Windows", "Temp"]);
        openWindow("explorer");
      },
    },
    {
      name: "User Profile",
      icon: User,
      x: 550,
      y: 120,
      action: () => {
        setFileExplorerPath(["My Computer", "C:", "Users", "Administrator"]);
        openWindow("explorer");
      },
    },
  ];

  return (
    <div className="w-full h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Enhanced Matrix-like background effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-50 grid-rows-35 h-full">
          {Array.from({ length: 1750 }).map((_, i) => (
            <div
              key={i}
              className="border border-green-400 text-xs text-green-400 flex items-center justify-center"
            >
              {Math.random() > 0.8
                ? String.fromCharCode(33 + Math.floor(Math.random() * 94))
                : ""}
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced scanlines effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="w-full h-px bg-green-400"
            style={{ top: `${i * 1.67}%` }}
          ></div>
        ))}
      </div>

      {/* Subtle glow effect around edges */}
      <div className="absolute inset-0 border-4 border-green-400 opacity-20 pointer-events-none shadow-inner"></div>

      {/* Desktop Icons */}
      {desktopIcons.map((icon, index) => (
        <div
          key={index}
          className="absolute flex flex-col items-center cursor-pointer group"
          style={{ left: icon.x, top: icon.y }}
          onClick={icon.action}
        >
          <div className="bg-black bg-opacity-70 border border-green-400 p-3 rounded group-hover:bg-green-900 group-hover:border-green-300 transition-all shadow-lg shadow-green-400/30">
            <icon.icon
              size={28}
              className="text-green-400 group-hover:text-green-200"
            />
          </div>
          <span className="text-green-300 text-xs mt-1 text-center font-mono max-w-16 leading-tight group-hover:text-green-100">
            {icon.name}
          </span>
        </div>
      ))}

      {/* Enhanced Progress Indicator */}
      <div className="absolute top-4 right-4 bg-black bg-opacity-90 border border-green-400 text-green-400 p-4 rounded font-mono shadow-2xl shadow-green-400/40">
        <h3 className="font-bold mb-2 text-green-300">PROGRESS.SYS</h3>
        <div className="text-sm mb-2">
          Numbers Found: {discoveredNumbers.length}/3
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-8 h-8 border-2 border-green-400 rounded flex items-center justify-center text-xs font-bold transition-all ${
                discoveredNumbers.length >= i
                  ? "bg-green-400 text-black animate-pulse"
                  : "bg-transparent text-green-400"
              }`}
            >
              {discoveredNumbers.length >= i ? "✓" : i}
            </div>
          ))}
        </div>
        {discoveredNumbers.length > 0 && (
          <div className="mt-2 text-xs text-green-600">
            DATA: [{discoveredNumbers.join(", ")}]
          </div>
        )}
        <div className="mt-2 text-xs text-green-700">
          {currentTime.toLocaleTimeString()}
        </div>
      </div>

      {/* System Info Panel */}
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-90 border border-green-400 text-green-400 p-3 rounded font-mono shadow-2xl shadow-green-400/40">
        <div className="text-xs space-y-1">
          <div>RetroOS v3.14159</div>
          <div>Memory: 274/512 MB</div>
          <div>CPU: Pentium III 600MHz</div>
          <div className="text-green-600">Easter Eggs: Active</div>
        </div>
      </div>

      {/* Windows */}
      {openWindows.includes("trash") && (
        <WindowFrame
          title="[RECYCLE_BIN.EXE]"
          onClose={() => closeWindow("trash")}
          windowType="trash"
          className="!h-[1000px] w-full"
        >
          <JunkFileGame />
        </WindowFrame>
      )}

      {openWindows.includes("calculator") && (
        <WindowFrame
          title="[CALC.EXE]"
          onClose={() => closeWindow("calculator")}
          windowType="calculator"
        >
          <CalculatorGame />
        </WindowFrame>
      )}

      {openWindows.includes("terminal") && (
        <WindowFrame
          title="[CMD.EXE]"
          onClose={() => closeWindow("terminal")}
          width="w-96"
          height="h-96"
          windowType="terminal"
        >
          <TerminalGame />
        </WindowFrame>
      )}

      {openWindows.includes("explorer") && (
        <WindowFrame
          title="[EXPLORER.EXE]"
          onClose={() => closeWindow("explorer")}
          width="w-[500px]"
          height="h-96"
          windowType="explorer"
        >
          <FileExplorer />
        </WindowFrame>
      )}

      {openWindows.includes("settings") && (
        <WindowFrame
          title="[CONTROL_PANEL.EXE]"
          onClose={() => closeWindow("settings")}
          windowType="settings"
        >
          <div className="space-y-4 font-mono">
            <h3 className="text-green-300 font-bold">SYSTEM CONFIGURATION</h3>
            <div className="space-y-2 text-sm">
              <div>🖥️ Display: 1024x768 CRT Mode</div>
              <div>🔊 Audio: SoundBlaster Compatible</div>
              <div>⚡ Performance: Maximum Nostalgia</div>
              <div>🎮 Games: Retro Mode Enabled</div>
              <div>🔒 Security: Moderate (Easter eggs allowed)</div>
              <div>📁 File System: FAT32</div>
              <div className="text-green-600 mt-4">
                Tip: Some applications might behave unexpectedly...
              </div>
              <div className="text-green-700 text-xs mt-2">
                Hidden files may contain valuable information 🔍
              </div>
            </div>
          </div>
        </WindowFrame>
      )}

      {openWindows.includes("clock") && (
        <WindowFrame
          title="[CLOCK.EXE]"
          onClose={() => closeWindow("clock")}
          width="w-64"
          height="h-48"
          windowType="clock"
        >
          <div className="text-center font-mono">
            <div className="text-2xl text-green-300 mb-2">
              {currentTime.toLocaleTimeString()}
            </div>
            <div className="text-sm text-green-500">
              {currentTime.toLocaleDateString()}
            </div>
            <div className="text-xs text-green-700 mt-4">
              Time since Y2K:{" "}
              {Math.floor(
                (Date.now() - new Date("2000-01-01").getTime()) /
                  (1000 * 60 * 60 * 24)
              )}{" "}
              days
            </div>
          </div>
        </WindowFrame>
      )}

      {openWindows.includes("volume") && (
        <WindowFrame
          title="[VOLUME_CONTROL.EXE]"
          onClose={() => closeWindow("volume")}
          width="w-64"
          height="h-32"
          windowType="volume"
        >
          <div className="space-y-3 font-mono">
            <div className="text-green-300">🔊 Master Volume</div>
            <div className="bg-gray-900 h-4 rounded border border-green-500">
              <div className="bg-green-400 h-full w-3/4 rounded"></div>
            </div>
            <div className="text-xs text-green-600">
              Currently playing: Retro ambience
            </div>
          </div>
        </WindowFrame>
      )}

      {openWindows
        .filter((w) => w.startsWith("file_"))
        .map((window) => {
          const fileName = window.replace("file_", "");
          return (
            <WindowFrame
              key={window}
              title={`[NOTEPAD.EXE] - ${fileName}`}
              onClose={() => closeWindow(window)}
              windowType="default"
            >
              <FileViewer fileName={fileName} />
            </WindowFrame>
          );
        })}

      {/* Victory Screen */}
      {gameCompleted && (
        <div className="absolute inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50">
          <div className="bg-black border-2 border-green-400 p-8 rounded-lg text-center max-w-md shadow-2xl shadow-green-400/50">
            <h2 className="text-3xl font-bold text-green-300 mb-4 font-mono animate-pulse">
              🎉 MISSION COMPLETE! 🎉
            </h2>
            <div className="text-green-400 mb-4">
              <div className="text-lg mb-2">
                Numbers Found: {discoveredNumbers.join(" - ")}
              </div>
              <div className="text-sm">
                Sequence: {discoveredNumbers.sort((a, b) => a - b).join("")}
              </div>
            </div>
            <div className="ascii-art text-green-300 font-mono text-xs mb-4">
              <pre>{`
    ╔════════════════════╗
    ║  HACKER  LEVEL:    ║
    ║    ★ EXPERT ★      ║
    ╚════════════════════╝
              `}</pre>
            </div>
            <p className="text-green-500 text-sm mb-4">
              You've successfully beated the system and uncovered the secret
              numbers!
            </p>
            <Link
              to="/main-menu"
              className="text-green-600 border-2 border-green-600 p-4 text-xs"
            >
              Continue now to the final stage! 🏆
            </Link>
          </div>
        </div>
      )}

      <style jsx>{`
        .blink {
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0.3;
          }
        }

        .hover-reveal:hover {
          text-shadow: 0 0 10px #4ade80;
        }

        .scrambled-text {
          filter: blur(0.5px);
        }

        .scrambled-text:hover {
          filter: blur(0px);
        }
      `}</style>
    </div>
  );
};

export default DesktopMinigames;
