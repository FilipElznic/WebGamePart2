import React from "react";
import { Navigate } from "react-router-dom";
import { useUserData } from "./UserDataProvider";

// XP-based protected route component
export const XPProtectedRoute = ({
  children,
  requiredStage,
  redirectTo = "/main-menu",
}) => {
  const { loading, canAccessStage } = useUserData();

  // Show loading while checking user data
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 flex items-center justify-center">
        <div className="bg-white/90 border-4 border-yellow-400 p-8 text-center">
          <div className="font-mono text-xl text-black">
            Checking access permissions...
          </div>
        </div>
      </div>
    );
  }

  // If user doesn't have enough XP, redirect
  if (!canAccessStage(requiredStage)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

// Component to show XP requirement message
export const XPRequirementDisplay = ({ requiredStage }) => {
  const { userData, getRequiredXPForStage } = useUserData();
  const requiredXP = getRequiredXPForStage(requiredStage - 1);
  const currentXP = userData?.xp || 0;
  const isLocked = currentXP < requiredXP;

  if (!isLocked) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white/90 backdrop-blur-sm border-4 border-yellow-400 shadow-2xl relative max-w-md w-full mx-4 p-8">
        {/* Retro border decorations */}
        <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-yellow-500"></div>
        <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-yellow-500"></div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-yellow-500"></div>
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-yellow-500"></div>

        {/* Lock Icon */}
        <div className="text-center mb-6">
          <div className="mx-auto w-20 h-20 bg-red-100 border-4 border-red-400 flex items-center justify-center mb-4">
            <div className="font-mono text-3xl">🔒</div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-mono font-bold text-gray-800 text-center mb-6 relative">
          <span className="bg-red-100 px-4 py-2 border-2 border-red-400 inline-block">
            [STAGE LOCKED]
          </span>
        </h2>

        {/* Message */}
        <div className="bg-red-50 border-2 border-red-400 p-6 mb-6 relative">
          <div className="font-mono text-gray-800 space-y-3">
            <p className="text-lg">
              <span className="text-red-700 font-bold">
                &gt; ACCESS DENIED:
              </span>
              <br />
              Insufficient XP to access Stage {requiredStage}
            </p>

            <div className="bg-white border-2 border-red-300 p-4 space-y-2">
              <div className="flex justify-between">
                <span>Required XP:</span>
                <span className="font-bold text-red-600">{requiredXP}</span>
              </div>
              <div className="flex justify-between">
                <span>Current XP:</span>
                <span className="font-bold text-blue-600">{currentXP}</span>
              </div>
              <div className="flex justify-between border-t-2 border-red-200 pt-2">
                <span>Need:</span>
                <span className="font-bold text-red-600">
                  {requiredXP - currentXP} more XP
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-600">
              <span className="text-red-700 font-bold">&gt; TIP:</span>
              Complete previous stages to gain more XP.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
