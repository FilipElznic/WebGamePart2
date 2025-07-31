import React from "react";
import { useUserData } from "./UserDataProvider";

function HomeWork({ showHomework, setShowHomework, homeworkList }) {
  const { userXP, loading, isTaskCompleted } = useUserData();

  if (!showHomework) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 backdrop-blur bg-black/60 flex items-center justify-center z-50">
        <div className="bg-white border-4 border-black shadow-2xl p-8 max-w-md w-full mx-4">
          <div className="text-center font-mono text-xl text-black">
            Loading data...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 backdrop-blur bg-black/60 flex items-center justify-center z-50">
      <div
        className="bg-white border-4 border-black shadow-2xl p-8 max-w-4xl w-full mx-4 h-[80vh]"
        style={{
          fontFamily: "'Courier New', monospace",
          imageRendering: "pixelated",
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setShowHomework(false)}
          className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white font-mono text-lg px-4 py-2 border-2 border-black transition-colors duration-200"
          style={{ imageRendering: "pixelated" }}
        >
          ✕
        </button>

        {/* Paper with Lines */}
        <div
          className="relative bg-white border-2 border-gray-300 p-12 h-full overflow-y-auto"
          style={{
            backgroundImage: `repeating-linear-gradient(
              transparent,
              transparent 38px,
              #bfdbfe 38px,
              #bfdbfe 40px
            )`,
            backgroundSize: "100% 40px",
          }}
        >
          {/* Red Margin Line */}
          <div className="absolute left-20 top-0 bottom-0 w-1 bg-red-500"></div>

          {/* Title */}
          <div className="ml-12 mb-8">
            <h1
              className="font-mono text-4xl font-bold text-black mb-2"
              style={{ lineHeight: "40px" }}
            >
              Stages
            </h1>
            <div
              className="font-mono text-xl text-gray-600"
              style={{ lineHeight: "40px" }}
            >
              Computer's secret
            </div>
          </div>

          {/* Homework Tasks */}
          <div className="ml-12 space-y-4 max-h-96 overflow-y-auto pr-4">
            {homeworkList.map((item, index) => {
              const taskCompleted = isTaskCompleted(item.id);
              return (
                <div
                  key={item.id}
                  className="flex items-start space-x-6 p-2"
                  style={{ lineHeight: "40px" }}
                >
                  <div
                    className={`w-8 h-8 border-4 border-black mt-2 flex items-center justify-center ${
                      taskCompleted ? "bg-green-400" : "bg-white"
                    }`}
                    style={{ imageRendering: "pixelated" }}
                  >
                    {taskCompleted && (
                      <span className="text-black text-lg font-bold">✓</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <div
                      className={`font-mono text-xl font-bold ${
                        taskCompleted
                          ? "line-through text-gray-500"
                          : "text-black"
                      }`}
                      style={{ lineHeight: "40px" }}
                    >
                      {index + 1}. {item.task}
                    </div>
                    <div
                      className={`font-mono text-lg ${
                        taskCompleted ? "text-gray-400" : "text-red-600"
                      }`}
                      style={{ lineHeight: "40px" }}
                    >
                      Due: {item.dueDate}
                    </div>
                    <div
                      className="font-mono text-sm text-blue-600"
                      style={{ lineHeight: "40px" }}
                    >
                      Required XP: {item.id * 100} (Current: {userXP})
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="absolute bottom-8 left-20 right-8">
            <div className="border-t-2 border-black pt-4 bg-white">
              <div className="flex justify-center items-center font-mono text-lg">
                <span className="text-black font-bold">
                  Completed:{" "}
                  {
                    homeworkList.filter((item) => isTaskCompleted(item.id))
                      .length
                  }{" "}
                  / {homeworkList.length} (XP: {userXP})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeWork;
