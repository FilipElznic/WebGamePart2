import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChange } from "../firebase/auth";

// Protected route for authenticated users (redirects to game if logged in)
export function AuthProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-purple-950 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm p-8 border-4 border-purple-400 shadow-2xl">
          <div className="text-center font-mono">
            <div className="text-white text-xl mb-4">[CHECKING AUTH...]</div>
            <div className="animate-pulse text-gray-200">Please wait...</div>
          </div>
        </div>
      </div>
    );
  }

  // If user is logged in, redirect to game page
  if (user) {
    return <Navigate to="/game" replace />;
  }

  // If user is not logged in, show the page (login/register)
  return children;
}

// Protected route for pages that require authentication
export function RequireAuth({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-purple-950 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm p-8 border-4 border-purple-400 shadow-2xl">
          <div className="text-center font-mono">
            <div className="text-black text-xl mb-4">[CHECKING AUTH...]</div>
            <div className="animate-pulse text-gray-600">Please wait...</div>
          </div>
        </div>
      </div>
    );
  }

  // If user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user is logged in, show the protected page
  return children;
}
