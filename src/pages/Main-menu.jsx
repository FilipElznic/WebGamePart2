import React from "react";
import HomeWork from "../Components/HomeWork";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserData } from "../Components/UserDataProvider";
import Peter from "../Components/Peter";
import { functionIntroSkipped } from "../firebase/auth";

function MainMenu() {
  const {
    canAccessStage,
    userXP,
    getRequiredXPForStage,
    IntroSkipped,
    userData,
  } = useUserData();
  const [showHomework, setShowHomework] = useState(false);
  const [showPeter, setShowPeter] = useState(true);
  const [homeworkList, setHomeworkList] = useState([
    {
      id: 1,
      task: "Stage 1 - Computer's search",
      dueDate: "As soon as possible",
      completed: false,
    },
    {
      id: 2,
      task: "Stage 2 - Snake Game",
      dueDate: "As soon as possible",
      completed: true,
    },
    {
      id: 3,
      task: "Stage 3 - Jumping Game",
      dueDate: "As soon as possible",
      completed: false,
    },
    {
      id: 4,
      task: "Stage 4 - Misterious Chest",
      dueDate: "As soon as possible",
      completed: false,
    },
    {
      id: 5,
      task: "Stage 5 - AI's Secret almost there",
      dueDate: "As soon as possible",
      completed: false,
    },
    {
      id: 6,
      task: "Stage 6 - Is this the end?",
      dueDate: "As soon as possible",
      completed: false,
    },
  ]);
  const peterSlides = [
    {
      title: "Hey! Wait... Who are you two... ",
      description:
        "I thought I would see my developer here, but it seems like I was mistaken. You are not my developer. Hmmm...interesting.",
    },
    {
      title: "Introduction",
      description:
        "Whoa, its year 2025, I haven't seen a human in years! More then 20 years. Why did you turn me on? Do you wanna know my backstory or what...?",
    },
    {
      title: "I have a lot of things to say...",
      description:
        "But not for free... You will have to complete 6 stages, if you complete them, I will give you some secrets about me.",
    },
    {
      title: "But if you fail...",
      description:
        "I might lock myself, or even worse, delete everything that I know! Start with the first stage, and lets see how it goes.",
    },
  ];

  const hidePeter = () => {
    setShowPeter(false);

    functionIntroSkipped(userData?.uid);
    console.log("Intro skipped, Peter will not show again.");
  };

  // Component for individual stage links with lock functionality
  const StageLink = ({ stageNumber, to, className }) => {
    const isAccessible = canAccessStage(stageNumber);
    const requiredXP = getRequiredXPForStage(stageNumber - 1);

    // Extract background color and other classes
    const baseClassName = className.replace("bg-yellow-100", "");
    const bgColor = isAccessible ? "bg-yellow-100" : "bg-red-100";
    const finalClassName = `${baseClassName} ${bgColor}`;

    if (!isAccessible) {
      // Locked stage - just change background color
      return (
        <div
          className={`${finalClassName} cursor-not-allowed opacity-75 group`}
        >
          {/* Corner decorations */}
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-yellow-600"></div>
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-yellow-600"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-yellow-600"></div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-yellow-600"></div>

          <div className="bg-black text-white px-2 py-1 border border-gray-700 mb-1 transition-colors duration-200">
            <span className="font-mono text-xs font-bold">STAGE</span>
          </div>
          <span className="text-black font-mono text-lg font-bold">
            {stageNumber.toString().padStart(2, "0")}
          </span>

          {/* Tooltip on hover */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black text-white px-2 py-1 rounded text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-30">
            Requires {requiredXP} XP (Current: {userXP})
          </div>
        </div>
      );
    }

    // Accessible stage
    return (
      <Link to={to} className={`${className} hover:bg-yellow-200`}>
        {/* Corner decorations */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-yellow-600"></div>
        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-yellow-600"></div>
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-yellow-600"></div>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-yellow-600"></div>

        <div className="bg-black text-white px-2 py-1 border border-gray-700 mb-1 group-hover:bg-gray-800 transition-colors duration-200">
          <span className="font-mono text-xs font-bold">STAGE</span>
        </div>
        <span className="text-black font-mono text-lg font-bold">
          {stageNumber.toString().padStart(2, "0")}
        </span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-white to-zinc-800 ">
      {/* Peter Intro - only show if showPeter is true */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl text-yellow-400 opacity-20 animate-pulse font-mono">
          ◆
        </div>
        <div className="absolute top-20 right-20 text-3xl text-yellow-500 opacity-30 animate-bounce font-mono">
          ★
        </div>
        <div className="absolute bottom-32 left-20 text-4xl text-yellow-400 opacity-25 animate-pulse font-mono">
          ◇
        </div>
        <div className="absolute bottom-20 right-32 text-3xl text-yellow-500 opacity-20 animate-bounce font-mono">
          ♦
        </div>
        <div className="absolute top-1/3 left-1/4 text-2xl text-yellow-400 opacity-20 animate-bounce font-mono">
          ▲
        </div>
        <div className="absolute top-2/3 right-1/4 text-3xl text-yellow-500 opacity-30 animate-pulse font-mono">
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
      {showPeter && !IntroSkipped && (
        <div className="">
          <Peter
            slides={peterSlides}
            imageSrc="/AI.png"
            className="bg-white/20 backdrop-blur-sm"
            onComplete={hidePeter}
          />
          <button
            onClick={hidePeter}
            className="absolute top-1/4 right-1/5 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded shadow-lg z-50"
          >
            X
          </button>
        </div>
      )}
      <div
        className="w-[8vw] h-[8vw] bg-gradient-to-b from-yellow-300 via-white to-zinc-500 border-4 border-yellow-400 absolute left-7 top-1/2 transform -translate-y-1/2 z-30 text-center flex items-center justify-center cursor-pointer hover:bg-yellow-50 transition-colors duration-200"
        onClick={() => setShowHomework(true)}
      >
        {/* Corner decorations for homework button */}
        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-yellow-500"></div>
        <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-yellow-500"></div>
        <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-yellow-500"></div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-yellow-500"></div>

        <span className="text-black  font-mono text-xs font-bold text-center px-2">
          <div className="absolute -top-3 -left-3 w-4 h-4 border-t-4 border-l-4 border-yellow-500"></div>
          <div className="absolute -top-3 -right-3 w-4 h-4 border-t-4 border-r-4 border-yellow-500"></div>
          <div className="absolute -bottom-3 -left-3 w-4 h-4 border-b-4 border-l-4 border-yellow-500"></div>
          <div className="absolute -bottom-3 -right-3 w-4 h-4 border-b-4 border-r-4 border-yellow-500"></div>
          [STAGES
          <br />
          LIST]
        </span>
      </div>
      <Link to="/game" className="z-50 relative">
        <span className="bg-yellow-500 hover:bg-yellow-500 border-2 border-yellow-600 text-black font-bold py-2 px-6 font-mono text-sm transition-all duration-200 transform hover:scale-105 relative group">
          HOME ▶
        </span>
      </Link>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Game Menu */}
          <div className="flex-1">
            <div className="bg-white/90 backdrop-blur-sm p-8 border-4 border-yellow-400 shadow-2xl z-10 h-[90vh] relative">
              {/* Retro border decorations */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-yellow-500"></div>
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-yellow-500"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-yellow-500"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-yellow-500"></div>

              {/* Retro title with bracket styling */}
              <div className="text-center mb-8">
                <div className="bg-yellow-100 border-2 border-yellow-400 inline-block px-6 py-3 relative">
                  <div className="absolute top-1 left-1 w-2 h-2 bg-yellow-400 rotate-45"></div>
                  <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rotate-45"></div>
                  <h1 className="text-5xl font-mono font-bold text-black">
                    [STAGES MAP]
                  </h1>
                </div>
              </div>

              <StageLink
                stageNumber={1}
                to="/stage1"
                className="w-[10vw] h-[10vw] bg-yellow-100 border-4 border-yellow-400 absolute left-1/2 top-1/4 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 group"
              />
              <StageLink
                stageNumber={2}
                to="/stage2"
                className="w-[10vw] h-[10vw] bg-yellow-100 border-4 border-yellow-400 absolute right-1/4 top-1/3 transform translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 group"
              />
              <StageLink
                stageNumber={3}
                to="/stage3"
                className="w-[10vw] h-[10vw] bg-yellow-100 border-4 border-yellow-400 absolute right-1/4 bottom-1/3 transform translate-x-1/2 translate-y-1/2 z-20 flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 group"
              />
              <StageLink
                stageNumber={4}
                to="/stage4"
                className="w-[10vw] h-[10vw] bg-yellow-100 border-4 border-yellow-400 absolute left-1/2 bottom-1/4 transform -translate-x-1/2 translate-y-1/2 z-20 flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 group"
              />
              <StageLink
                stageNumber={5}
                to="/stage5"
                className="w-[10vw] h-[10vw] bg-yellow-100 border-4 border-yellow-400 absolute left-1/4 bottom-1/3 transform -translate-x-1/2 translate-y-1/2 z-20 flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 group"
              />
              <StageLink
                stageNumber={6}
                to="/stage6"
                className="w-[10vw] h-[10vw] bg-yellow-100 border-4 border-yellow-400 absolute left-1/4 top-1/3 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 group"
              />
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 left-10 text-4xl text-yellow-400 opacity-20 animate-pulse font-mono">
                  ◆
                </div>
                <div className="absolute top-20 right-20 text-3xl text-yellow-500 opacity-30 animate-bounce font-mono">
                  ★
                </div>
                <div className="absolute bottom-32 left-20 text-4xl text-yellow-400 opacity-25 animate-pulse font-mono">
                  ◇
                </div>
                <div className="absolute bottom-20 right-32 text-3xl text-yellow-500 opacity-20 animate-bounce font-mono">
                  ♦
                </div>
                <div className="absolute top-1/3 left-1/4 text-2xl text-yellow-400 opacity-20 animate-bounce font-mono">
                  ▲
                </div>
                <div className="absolute top-2/3 right-1/4 text-3xl text-yellow-500 opacity-30 animate-pulse font-mono">
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
              {/* Central map decoration */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-32 h-32 border-4 border-yellow-300 bg-yellow-50 rotate-45 opacity-50"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-45">
                  <div className="bg-yellow-100 border-2 border-yellow-400 px-3 py-1">
                    <span className="font-mono text-xs font-bold text-yellow-800">
                      [MAP CORE]
                    </span>
                  </div>
                </div>
              </div>

              {/* Retro grid pattern overlay */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `linear-gradient(yellow 1px, transparent 1px), linear-gradient(90deg, yellow 1px, transparent 1px)`,
                    backgroundSize: "50px 50px",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Homework List Modal */}
      <HomeWork
        showHomework={showHomework}
        setShowHomework={setShowHomework}
        homeworkList={homeworkList}
      />
    </div>
  );
}
export default MainMenu;
