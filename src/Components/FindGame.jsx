import { useState } from "react";

function FindGame() {
  const [gameState, setGameState] = useState({
    keyFound: false,
    gameWon: false,
    searchedItems: [],
    hints: 0,
  });

  const [message, setMessage] = useState(
    "Welcome to the Space Station! Find the access key to unlock the main console."
  );

  // Expanded list of searchable items
  const searchableItems = [
    {
      id: "wardrobe",
      name: "Wardrobe",
      hasKey: false,
      message: "Just some space suits and equipment. No key here.",
    },
    {
      id: "chair",
      name: "Command Chair",
      hasKey: false,
      message: "You move the chair and find some loose screws, but no key.",
    },
    {
      id: "computer",
      name: "Computer Terminal",
      hasKey: false,
      message:
        "The screen shows: 'ACCESS DENIED - KEY REQUIRED'. Still need to find that key.",
    },
    {
      id: "toolbox",
      name: "Tool Box",
      hasKey: false,
      message: "Various space tools and repair equipment. The key isn't here.",
    },
    {
      id: "plant",
      name: "Hydroponic Plant",
      hasKey: true,
      message: "🎉 You found the access key hidden in the plant's soil!",
    },
    {
      id: "cabinet",
      name: "Storage Cabinet",
      hasKey: false,
      message: "Emergency supplies and rations. No key in sight.",
    },
    {
      id: "panel",
      name: "Control Panel",
      hasKey: false,
      message:
        "Blinking lights and switches. You need the key to activate this.",
    },
    {
      id: "locker",
      name: "Personal Locker",
      hasKey: false,
      message: "Personal belongings of the crew. The key isn't here.",
    },
    {
      id: "viewscreen",
      name: "Viewscreen",
      hasKey: false,
      message: "A stunning view of the nebula, but no key here.",
    },
    {
      id: "recycling-unit",
      name: "Recycling Unit",
      hasKey: false,
      message: "A faint hum comes from the unit. It's for waste, not keys.",
    },
    {
      id: "first-aid-kit",
      name: "First Aid Kit",
      hasKey: false,
      message: "Band-aids and med-gel. Important, but no key.",
    },
    {
      id: "bunk-bed",
      name: "Bunk Bed",
      hasKey: false,
      message: "A neatly made bed. No key under the pillow.",
    },
    {
      id: "waste-chute",
      name: "Waste Chute",
      hasKey: false,
      message: "It's best not to stick your hand in there. No key.",
    },
    {
      id: "fire-extinguisher",
      name: "Fire Extinguisher",
      hasKey: false,
      message: "Safety first! But no key.",
    },
    {
      id: "pipes",
      name: "Pipes",
      hasKey: false,
      message: "A series of pipes run along the wall. They are all sealed.",
    },
    {
      id: "ventilation-duct",
      name: "Ventilation Duct",
      hasKey: false,
      message: "The cover is screwed on tight. You can't open it.",
    },
    {
      id: "food-replicator",
      name: "Food Replicator",
      hasKey: false,
      message: "You replicate a cup of tea, Earl Grey, hot. No key though.",
    },
    {
      id: "exposed-wiring",
      name: "Exposed Wiring",
      hasKey: false,
      message: "Sparks fly. Better not touch that. No key here.",
    },
  ];

  const searchItem = (itemId) => {
    const item = searchableItems.find((i) => i.id === itemId);
    if (!item || gameState.searchedItems.includes(itemId)) return;

    setGameState((prev) => ({
      ...prev,
      searchedItems: [...prev.searchedItems, itemId],
      keyFound: item.hasKey,
      gameWon: item.hasKey,
    }));

    setMessage(item.message);
  };

  const getHint = () => {
    const hints = [
      "💡 The key might be hidden where something grows...",
      "💡 Look for something that needs water and care...",
      "💡 Plants can hide many secrets in space stations...",
    ];

    setGameState((prev) => ({ ...prev, hints: prev.hints + 1 }));
    setMessage(hints[Math.min(gameState.hints, hints.length - 1)]);
  };

  const resetGame = () => {
    setGameState({
      keyFound: false,
      gameWon: false,
      searchedItems: [],
      hints: 0,
    });
    setMessage(
      "Welcome to the Space Station! Find the access key to unlock the main console."
    );
  };

  const InteractiveItem = ({ item }) => {
    const isSearched = gameState.searchedItems.includes(item.id);
    const isKey = item.hasKey && isSearched;

    const itemWrapperClasses = `absolute group cursor-pointer transition-all duration-300 flex items-center justify-center`;
    const searchedClasses = isKey
      ? "shadow-green-500/50 shadow-2xl border-green-500"
      : "opacity-70";
    const notSearchedClasses =
      "hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30";

    let positionClasses = "";
    let itemJsx = null;

    // Updated switch with new items and white theme styling
    switch (item.id) {
      case "wardrobe":
        positionClasses = "left-4 top-24 w-20 h-40";
        itemJsx = (
          <div
            className={`w-full h-full bg-gray-200 border-2 border-gray-400 rounded-md flex ${
              isSearched ? "p-1" : ""
            }`}
          >
            <div
              className={`w-1/2 h-full border-r-2 border-gray-500 ${
                isSearched ? "transform -rotate-6" : ""
              } transition-transform`}
            ></div>
            <div
              className={`w-1/2 h-full ${
                isSearched ? "transform rotate-6" : ""
              } transition-transform`}
            ></div>
            {isSearched && (
              <div className="absolute inset-2 bg-gray-800/80 text-white text-xs flex items-center justify-center">
                SUITS
              </div>
            )}
          </div>
        );
        break;
      case "computer":
        positionClasses =
          "left-1/2 transform -translate-x-1/2 bottom-28 w-28 h-20";
        itemJsx = (
          <div className="w-full h-full bg-gray-300 border-2 border-gray-400 rounded-t-lg p-1 flex items-center justify-center">
            <div className="w-full h-full bg-gray-800 text-center p-1 rounded-sm">
              {isSearched ? (
                <p className="text-red-500 text-xs font-mono animate-pulse">
                  ACCESS
                  <br />
                  DENIED
                </p>
              ) : (
                <div className="w-full h-full bg-blue-900/50 animate-pulse"></div>
              )}
            </div>
          </div>
        );
        break;
      case "chair":
        positionClasses =
          "left-1/2 transform -translate-x-1/2 bottom-4 w-16 h-24";
        itemJsx = (
          <div
            className={`w-full h-full ${
              isSearched ? "transform -rotate-12" : ""
            } transition-transform`}
          >
            <div className="w-full h-3/4 bg-blue-500 rounded-t-lg border-x-2 border-t-2 border-blue-600"></div>
            <div className="w-4 h-1/4 bg-gray-500 mx-auto"></div>
          </div>
        );
        break;
      case "panel":
        positionClasses = "right-4 top-28 w-14 h-24";
        itemJsx = (
          <div className="w-full h-full bg-gray-300 border-2 border-gray-400 rounded p-2 flex flex-col justify-around">
            <div
              className={`h-2 w-full rounded-full ${
                isSearched ? "bg-green-500" : "bg-red-500 animate-pulse"
              }`}
            ></div>
            <div
              className={`h-2 w-full rounded-full ${
                isSearched ? "bg-green-500" : "bg-yellow-500 animate-pulse"
              }`}
            ></div>
            <div
              className={`h-2 w-full rounded-full ${
                isSearched ? "bg-green-500" : "bg-blue-500 animate-pulse"
              }`}
            ></div>
          </div>
        );
        break;
      case "toolbox":
        positionClasses = "left-8 bottom-4 w-16 h-10";
        itemJsx = (
          <div className="w-full h-full bg-red-500 border-2 border-red-700 rounded">
            <div
              className={`w-full h-1/2 bg-red-400 rounded-t ${
                isSearched ? "transform -rotate-12 -translate-y-2" : ""
              } transition-transform`}
            ></div>
          </div>
        );
        break;
      case "cabinet":
        positionClasses = "left-1/4 bottom-4 w-20 h-16";
        itemJsx = (
          <div className="w-full h-full bg-gray-300 border-2 border-gray-400 rounded flex flex-col justify-around p-1">
            <div className="w-full h-1/3 bg-gray-200 rounded border border-gray-400"></div>
            <div
              className={`w-full h-1/3 bg-gray-200 rounded border border-gray-400 ${
                isSearched ? "transform translate-x-2" : ""
              } transition-transform`}
            ></div>
            <div className="w-full h-1/3 bg-gray-200 rounded border border-gray-400"></div>
          </div>
        );
        break;
      case "plant":
        positionClasses = "right-1/4 bottom-4 w-14 h-20";
        itemJsx = (
          <div className="w-full h-full flex flex-col items-center">
            <div className="w-full h-2/3 text-green-500 text-4xl text-center">
              🌱
            </div>
            <div className="w-full h-1/3 bg-orange-300 border-2 border-orange-500 rounded-b-full p-1 flex items-center justify-center">
              {isKey && <div className="text-center animate-bounce">🔑</div>}
            </div>
          </div>
        );
        break;
      case "locker":
        positionClasses = "right-6 bottom-4 w-12 h-20";
        itemJsx = (
          <div className="w-full h-full bg-blue-300 border-2 border-blue-500 rounded">
            <div
              className={`w-full h-full bg-blue-200 ${
                isSearched ? "transform perspective-100 rotate-y-45" : ""
              } origin-left transition-transform`}
            ></div>
          </div>
        );
        break;
      case "viewscreen":
        positionClasses =
          "left-1/2 transform -translate-x-1/2 top-4 w-1/2 h-24";
        itemJsx = (
          <div className="w-full h-full bg-black border-4 border-gray-500 rounded-lg p-1 flex items-center justify-center overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-500 animate-pulse">
              <div className="absolute top-4 left-8 w-2 h-2 bg-white rounded-full"></div>
              <div className="absolute top-12 left-1/4 w-1 h-1 bg-white rounded-full"></div>
              <div className="absolute top-8 right-1/3 w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>
        );
        break;
      case "recycling-unit":
        positionClasses = "left-4 bottom-4 w-10 h-12";
        itemJsx = (
          <div className="w-full h-full bg-green-200 border-2 border-green-400 rounded-t-lg flex flex-col items-center p-1">
            <div
              className={`w-3/4 h-2 rounded-full ${
                isSearched ? "bg-red-500" : "bg-green-500"
              } animate-pulse`}
            ></div>
          </div>
        );
        break;
      case "first-aid-kit":
        positionClasses = "right-4 top-4 w-12 h-12";
        itemJsx = (
          <div className="w-full h-full bg-white border-2 border-red-500 rounded-lg flex items-center justify-center">
            <div className="w-1/2 h-2 bg-red-500 rounded-full"></div>
            <div className="absolute w-2 h-1/2 bg-red-500 rounded-full"></div>
            {isSearched && <div className="absolute inset-0 bg-white/80"></div>}
          </div>
        );
        break;
      case "bunk-bed":
        positionClasses = "left-4 top-4 w-24 h-16";
        itemJsx = (
          <div className="w-full h-full flex flex-col justify-between">
            <div className="w-full h-1/2 bg-blue-200 border-2 border-blue-400 rounded-md p-1">
              <div
                className={`w-1/4 h-1/2 bg-white rounded-sm ${
                  isSearched ? "ml-auto" : ""
                }`}
              ></div>
            </div>
            <div className="w-full h-1/2 bg-blue-200 border-2 border-blue-400 rounded-md p-1 mt-1">
              <div
                className={`w-1/4 h-1/2 bg-white rounded-sm ${
                  isSearched ? "ml-auto" : ""
                }`}
              ></div>
            </div>
          </div>
        );
        break;
      case "waste-chute":
        positionClasses = "right-6 bottom-28 w-12 h-12";
        itemJsx = (
          <div className="w-full h-full bg-gray-400 border-2 border-gray-500 rounded-full flex items-center justify-center">
            <div
              className={`w-3/4 h-3/4 bg-gray-800 rounded-full ${
                isSearched ? "opacity-50" : ""
              }`}
            ></div>
          </div>
        );
        break;
      case "fire-extinguisher":
        positionClasses = "right-20 bottom-4 w-8 h-16";
        itemJsx = (
          <div className="w-full h-full bg-red-600 border-2 border-red-800 rounded-lg p-1">
            <div className="w-full h-1/4 bg-gray-400 rounded-t-md"></div>
            {isSearched && (
              <div className="absolute inset-0 bg-red-800/50"></div>
            )}
          </div>
        );
        break;
      case "pipes":
        positionClasses = "left-1/4 top-20 w-1/2 h-4";
        itemJsx = (
          <div className="w-full h-full flex justify-around items-center">
            <div
              className={`w-1/3 h-full bg-gray-500 rounded ${
                isSearched ? "animate-pulse" : ""
              }`}
            ></div>
            <div
              className={`w-1/3 h-full bg-gray-500 rounded ${
                isSearched ? "animate-pulse" : ""
              }`}
            ></div>
          </div>
        );
        break;
      case "ventilation-duct":
        positionClasses = "top-20 right-4 w-16 h-8";
        itemJsx = (
          <div className="w-full h-full bg-gray-400 border-2 border-gray-500 rounded-md flex items-center justify-around p-1">
            <div className="w-3/4 h-1 bg-gray-600"></div>
            {isSearched && (
              <div className="absolute text-red-500 text-xs">LOCKED</div>
            )}
          </div>
        );
        break;
      case "food-replicator":
        positionClasses = "left-20 bottom-20 w-16 h-16";
        itemJsx = (
          <div className="w-full h-full bg-purple-300 border-2 border-purple-500 rounded-lg p-1">
            <div className="w-full h-1/2 bg-gray-800 rounded-sm"></div>
            <div
              className={`w-full h-1/2 ${
                isSearched ? "bg-teal-400 animate-ping" : "bg-purple-200"
              }`}
            ></div>
          </div>
        );
        break;
      case "exposed-wiring":
        positionClasses = "bottom-20 right-1/4 w-12 h-6";
        itemJsx = (
          <div className="w-full h-full flex items-center justify-around">
            <div
              className={`w-1 h-full bg-yellow-500 ${
                isSearched ? "animate-pulse" : ""
              }`}
            ></div>
            <div
              className={`w-1 h-full bg-red-500 ${
                isSearched ? "animate-pulse" : ""
              }`}
            ></div>
            <div
              className={`w-1 h-full bg-blue-500 ${
                isSearched ? "animate-pulse" : ""
              }`}
            ></div>
          </div>
        );
        break;
    }

    return (
      <div
        onClick={() => searchItem(item.id)}
        className={`${itemWrapperClasses} ${positionClasses} ${
          isSearched ? searchedClasses : notSearchedClasses
        }`}
        title={item.name}
      >
        {itemJsx}
        {isSearched && (
          <div className="absolute -top-2 -right-2 z-10">
            {isKey ? (
              <span className="text-xl animate-bounce">🔑</span>
            ) : (
              <span className="text-green-500 text-lg">✅</span>
            )}
          </div>
        )}
        {!isSearched && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            🔍 Search {item.name}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-black via-zinc-900 to-purple-950 text-gray-800 overflow-hidden w-full">
      {/* Header */}
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-3xl font-bold text-center mb-2 text-blue-600">
          🚀 SPACE STATION SEARCH 🔑
        </h1>
        <p className="text-center text-gray-600 mb-4 text-sm">
          Find the access key to unlock the main console
        </p>

        {/* Game Status - Compact */}
        <div className="bg-white/70 border border-blue-300 rounded-lg p-3 mb-4 text-center shadow-md">
          <div className="flex justify-center gap-4 mb-2 text-sm">
            <div className="text-blue-600">
              📊 Searched: {gameState.searchedItems.length}/
              {searchableItems.length}
            </div>
            <div className="text-yellow-600">💡 Hints: {gameState.hints}</div>
          </div>

          <div className="text-sm mb-3 p-2 bg-gray-100 rounded border-l-4 border-blue-500">
            {message}
          </div>

          {!gameState.gameWon && (
            <button
              onClick={getHint}
              className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded transition-colors text-sm"
            >
              💡 Hint
            </button>
          )}

          {gameState.gameWon && (
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
            >
              🔄 Play Again
            </button>
          )}
        </div>

        {/* Space Station Room - Seamless Layout */}
        <div className="relative w-full h-[65vh] bg-gradient-to-b from-gray-300 via-gray-200 to-gray-300 rounded-lg border-2 border-gray-400 overflow-hidden shadow-lg">
          {/* Table */}
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-44 w-40 h-4 bg-gray-400 border-2 border-gray-500 rounded-t-md"></div>
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-28 w-32 h-4 bg-gray-400 border-2 border-gray-500 rounded-b-md"></div>
          <div
            className="absolute"
            style={{
              left: "calc(50% - 80px)",
              bottom: "112px",
              width: "8px",
              height: "64px",
              backgroundColor: "#a0aec0",
              border: "2px solid #718096",
            }}
          ></div>
          <div
            className="absolute"
            style={{
              left: "calc(50% + 72px)",
              bottom: "112px",
              width: "8px",
              height: "64px",
              backgroundColor: "#a0aec0",
              border: "2px solid #718096",
            }}
          ></div>

          {/* Background Room Details */}
          <div className="absolute inset-0">
            {/* Floor */}
            <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-gray-400 to-gray-300 border-t-2 border-gray-400"></div>

            {/* Ceiling */}
            <div className="absolute top-0 w-full h-16 bg-gradient-to-b from-gray-200 to-gray-300 border-b-2 border-gray-400">
              {/* Ceiling lights */}
              <div className="absolute top-2 left-1/4 w-16 h-4 bg-blue-200 rounded-full blur-md"></div>
              <div className="absolute top-2 right-1/4 w-16 h-4 bg-blue-200 rounded-full blur-md"></div>
            </div>

            {/* Left Wall */}
            <div className="absolute left-0 top-16 w-20 h-full bg-gradient-to-r from-gray-300 to-gray-200 border-r-2 border-gray-400"></div>

            {/* Right Wall */}
            <div className="absolute right-0 top-16 w-20 h-full bg-gradient-to-l from-gray-300 to-gray-200 border-l-2 border-gray-400"></div>
          </div>

          {/* Interactive Items */}
          {searchableItems.map((item) => (
            <InteractiveItem key={item.id} item={item} />
          ))}
        </div>

        {/* Victory Screen */}
        {gameState.gameWon && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gradient-to-b from-green-100 to-white border-2 border-green-400 rounded-lg p-8 text-center max-w-md mx-4 shadow-2xl">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-green-700 mb-4">
                ACCESS GRANTED!
              </h2>
              <p className="text-lg mb-4 text-gray-800">
                You found the access key! The space station's main console is
                now unlocked.
              </p>
              <p className="text-sm text-green-600 mb-6">
                Items searched: {gameState.searchedItems.length}/
                {searchableItems.length} | Hints used: {gameState.hints}
              </p>
              <button
                onClick={resetGame}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
              >
                🔄 Search Again
              </button>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-4 text-center text-gray-500 text-xs">
          <p>💡 Click on items in the space station to search them</p>
        </div>
      </div>
    </div>
  );
}

export default FindGame;
