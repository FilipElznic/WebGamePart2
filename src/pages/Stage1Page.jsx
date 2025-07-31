import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Stage1Page() {
  const navigate = useNavigate();

  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showDialogue, setShowDialogue] = useState(true);

  // Terminal states
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [currentDirectory, setCurrentDirectory] = useState("~");
  const [isCommandProcessing, setIsCommandProcessing] = useState(false);
  const [foundPassword, setFoundPassword] = useState("");
  const [challengeCompleted, setChallengeCompleted] = useState(false);

  const fullText =
    "Welcome to Stage 1! I've got some tasks for you. You'll need to navigate my terminal system to find what we need. Let's see how well you can help me out!";

  // File system simulation
  const fileSystem = {
    "~": ["files.txt", "passwords.txt", "system.log"],
    files: {
      "files.txt":
        "This is just a regular file with some data.\nNothing interesting here.\nTry looking for passwords...",
      "passwords.txt":
        "SYSTEM PASSWORD: cyber2077\nACCESS CODE: terminal123\nDEVELOPER KEY: matrix456",
      "system.log":
        "System started successfully.\nAll services running.\nWaiting for user input...",
      "notes.txt":
        "Remember to update the firewall rules.\nMeeting with admin at 3 PM.\nDon't forget the coffee this time.",
      "config.ini":
        "auto_update=true\nretry_attempts=5\nlog_level=debug\n\n# Deprecated keys\nbackup_server=192.168.1.5",
      "todo.md":
        "- [x] Fix broken link on homepage\n- [ ] Refactor login module\n- [ ] Ask Sam about the encryption routine",
      "readme.txt":
        "This directory contains logs, notes, and config files.\nDo not delete anything unless authorized.",
      "hidden_backup.bak":
        "Encrypted Archive - Do not open unless you know the passphrase.\nBackup ID: #49123\nChecksum: 99fbe2...",
      "dev_chat.log":
        "dev1: Did you push the patch?\ndev2: Yup. Also hid the key in plain sight 😏\ndev1: lol nice",
      "env_vars.env":
        "DB_USER=admin\nDB_PASS=Redacted123\nAPI_KEY=AIzaSyA...HiddenForSafety\nTOKEN=sk_live_...",
      "errors.log":
        "[ERROR] 2025-07-30 14:02:03 - Failed to connect to server.\n[WARN] Using cached credentials.",
      "usb_contents.txt":
        "1. cat.jpg\n2. resume.pdf\n3. DO_NOT_OPEN.exe\n4. secret_recipe.docx",
      "vault.key":
        "BEGIN SECURE VAULT KEY\nAX9-33L2-TX11-PR1M-0988-KEY\nEND KEY BLOCK",
    },
  };

  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 50;

    const typeText = () => {
      if (currentIndex < fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeText, typingSpeed);
      } else {
        setIsTypingComplete(true);
        setTimeout(() => setShowButton(true), 500);
      }
    };

    const startDelay = setTimeout(typeText, 1000);
    return () => clearTimeout(startDelay);
  }, []);

  const handleStartTask = () => {
    setShowDialogue(false);
    setShowTerminal(true);
    // Add welcome message to terminal
    setTerminalHistory([
      { type: "system", text: "CYBER TERMINAL V2.0.77 - INITIALIZED" },
      {
        type: "system",
        text: "Type 'ls' to list files, 'cat <filename>' to read files",
      },
      {
        type: "system",
        text: "Find the password and use 'sudo <password> run diagnosis'",
      },
      { type: "prompt", text: `root@cyber:${currentDirectory}$ ` },
    ]);
  };

  const processCommand = (cmd) => {
    const command = cmd.trim().toLowerCase();
    const newHistory = [...terminalHistory];

    // Add the command to history
    newHistory.push({
      type: "input",
      text: `root@cyber:${currentDirectory}$ ${cmd}`,
    });

    if (command === "ls") {
      newHistory.push({
        type: "output",
        text: fileSystem[currentDirectory].join("  "),
      });
    } else if (command.startsWith("cat ")) {
      const filename = command.substring(4).trim();
      if (fileSystem.files[filename]) {
        newHistory.push({ type: "output", text: fileSystem.files[filename] });
        if (filename === "passwords.txt") {
          setFoundPassword("cyber2077");
        }
      } else {
        newHistory.push({
          type: "error",
          text: `cat: ${filename}: No such file or directory`,
        });
      }
    } else if (
      command.startsWith("sudo ") &&
      command.includes("run diagnosis")
    ) {
      const passwordMatch = command.match(/sudo\s+(\w+)\s+run\s+diagnosis/);
      if (passwordMatch && passwordMatch[1] === "cyber2077") {
        newHistory.push({ type: "success", text: "DIAGNOSIS INITIATED..." });
        newHistory.push({ type: "success", text: "SYSTEM CHECK COMPLETE ✓" });
        newHistory.push({
          type: "success",
          text: "ACCESS GRANTED - PROCEEDING TO NEXT STAGE...",
        });
        setChallengeCompleted(true);
        setTimeout(() => {
          navigate("/diagnosis");
        }, 2000);
      } else {
        newHistory.push({
          type: "error",
          text: "sudo: incorrect password or invalid command",
        });
      }
    } else if (command === "help") {
      newHistory.push({
        type: "output",
        text: "Available commands:\nls - list files\ncat <filename> - read file contents\nsudo <password> run diagnosis - run system diagnosis",
      });
    } else if (command === "") {
      // Empty command, just show new prompt
    } else {
      newHistory.push({
        type: "error",
        text: `bash: ${command}: command not found`,
      });
    }

    // Add new prompt
    if (!challengeCompleted) {
      newHistory.push({
        type: "prompt",
        text: `root@cyber:${currentDirectory}$ `,
      });
    }

    setTerminalHistory(newHistory);
  };

  const handleTerminalKeyDown = (e) => {
    if (e.key === "Enter" && !isCommandProcessing) {
      setIsCommandProcessing(true);
      processCommand(currentCommand);
      setCurrentCommand("");
      setTimeout(() => setIsCommandProcessing(false), 100);
    }
  };

  const handleTerminalInput = (e) => {
    if (!isCommandProcessing) {
      setCurrentCommand(e.target.value);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-purple-950 relative overflow-hidden">
      {showDialogue && (
        <div className="">
          <img
            src="AIHappy.png"
            alt="AI"
            className="absolute max-w-2xl bottom-0 z-40"
          />

          {/* Speech bubble */}
          <div className="absolute bottom-80 left-96 z-40 max-w-md">
            <div className="bg-white border-4 border-purple-400 rounded-lg p-4 relative shadow-xl">
              {/* Speech bubble tail */}
              <div className="absolute -bottom-3 left-8 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
              <div className="absolute -bottom-4 left-7 w-0 h-0 border-l-6 border-r-6 border-t-10 border-l-transparent border-r-transparent border-t-purple-400"></div>

              {/* Corner decorations */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-purple-600"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-purple-600"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-purple-600"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-purple-600"></div>

              {/* Dialogue text */}
              <div className="text-black font-mono">
                <p className="text-lg font-bold text-purple-700 mb-2">AI:</p>
                <p className="text-sm leading-relaxed">
                  "{displayText}
                  {!isTypingComplete && (
                    <span className="inline-block w-2 h-4 bg-purple-600 ml-1 animate-pulse">
                      |
                    </span>
                  )}
                  "
                </p>

                {/* Typing indicator */}
                {!isTypingComplete && (
                  <div className="flex items-center mt-3 text-purple-600">
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

                {/* Start Task Button */}
                {showButton && (
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={handleStartTask}
                      className="bg-purple-400 hover:bg-purple-500 border-2 border-purple-600 text-black font-bold py-2 px-6 font-mono text-sm transition-all duration-200 transform hover:scale-105 relative group"
                    >
                      <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-purple-700"></div>
                      <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-purple-700"></div>
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-purple-700"></div>
                      <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-purple-700"></div>
                      [START TASK] ▶
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="z-50 relative">
        <span className="bg-purple-500 hover:bg-purple-500 border-2 border-purple-600 text-black font-bold py-2 px-6 font-mono text-sm transition-all duration-200 transform hover:scale-105 relative group cursor-pointer">
          HOME ▶
        </span>
      </div>

      {/* Terminal Section */}
      {showTerminal && !challengeCompleted && (
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="bg-black/90 backdrop-blur-sm p-8 border-4 border-purple-400 shadow-2xl h-[85vh] relative overflow-hidden">
            {/* Terminal Header */}
            <div className="bg-purple-900/50 border-b-2 border-purple-400 p-2 mb-4 flex items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1 text-center text-purple-300 font-mono text-sm">
                CYBER TERMINAL V2.0.77
              </div>
            </div>

            {/* Terminal Content */}
            <div className="h-[calc(100%-4rem)] overflow-y-auto font-mono text-sm">
              <div className="space-y-1">
                {terminalHistory.map((entry, index) => (
                  <div
                    key={index}
                    className={`
                    ${entry.type === "system" ? "text-cyan-400" : ""}
                    ${entry.type === "prompt" ? "text-green-400" : ""}
                    ${entry.type === "input" ? "text-white" : ""}
                    ${entry.type === "output" ? "text-purple-300" : ""}
                    ${entry.type === "error" ? "text-red-400" : ""}
                    ${entry.type === "success" ? "text-green-400" : ""}
                  `}
                  >
                    <pre className="whitespace-pre-wrap">{entry.text}</pre>
                  </div>
                ))}

                {/* Current input line */}
                {!challengeCompleted && (
                  <div className="flex text-green-400">
                    <span>root@cyber:{currentDirectory}$ </span>
                    <input
                      type="text"
                      value={currentCommand}
                      onChange={handleTerminalInput}
                      onKeyDown={handleTerminalKeyDown}
                      className="bg-transparent border-none outline-none text-white flex-1 font-mono"
                      autoFocus
                      disabled={isCommandProcessing}
                    />
                    <span className="animate-pulse">|</span>
                  </div>
                )}
              </div>
            </div>

            {/* Terminal decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute top-4 right-4 text-purple-500/30 font-mono text-xs">
                [SECURE CONNECTION]
              </div>
              <div className="absolute bottom-4 left-4 text-purple-500/30 font-mono text-xs">
                STATUS: ONLINE
              </div>
            </div>

            {/* Scan lines effect for terminal */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
              <div
                className="h-full w-full"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, #a855f7 2px, #a855f7 4px)",
                }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Success message */}
      {challengeCompleted && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-purple-900 border-4 border-green-400 p-8 text-center max-w-md">
            <h2 className="text-2xl font-mono text-green-400 mb-4">
              ACCESS GRANTED
            </h2>
            <p className="text-purple-300 font-mono">
              Proceeding to next stage...
            </p>
            <div className="mt-4 flex justify-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Background effects remain the same */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-16 h-full">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="border-r border-purple-300"></div>
          ))}
        </div>
        <div className="absolute inset-0 grid grid-rows-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-b border-purple-300 w-full"></div>
          ))}
        </div>
      </div>

      {/* Floating retro symbols */}
      <div className="absolute inset-0 pointer-events-none">
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
    </div>
  );
}

export default Stage1Page;
