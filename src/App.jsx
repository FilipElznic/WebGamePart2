import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProtectedRoute, RequireAuth } from "./Components/ProtectedRoute";
import { XPProtectedRoute } from "./Components/XPProtectedRoute";
import { UserDataProvider } from "./Components/UserDataProvider";
import PCOnlyPopup from "./Components/PCOnlyPopup";

// Lazy load components for better performance
const MainPage = lazy(() => import("./pages/MainPage"));
const ShipwreckedPage = lazy(() => import("./pages/ShipwreckedPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const GamePage = lazy(() => import("./pages/GamePage"));
const GameStartPage = lazy(() => import("./pages/GameStartPage"));
const MainMenu = lazy(() => import("./pages/Main-menu"));
const Peter = lazy(() => import("./Components/Peter"));
const HelpPage = lazy(() => import("./pages/HelpPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const FeedbackPage = lazy(() => import("./pages/FeedbackPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const Subtitles = lazy(() => import("./Components/Subtitles"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Stage components
const Stage1Page = lazy(() => import("./pages/Stage1Page"));
const Stage2Page = lazy(() => import("./pages/Stage2Page"));
const Stage3Page = lazy(() => import("./pages/Stage3Page"));
const Stage4Page = lazy(() => import("./pages/Stage4Page"));
const Stage5Page = lazy(() => import("./pages/Stage5Page"));
const Stage6Page = lazy(() => import("./pages/Stage6Page"));
const Stage1Diagnosis = lazy(() => import("./pages/Stage1Diagnosis"));
// End game components

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-zinc-900 to-purple-950">
    <div className="relative h-12 w-12">
      <div
        className="block h-full w-full bg-purple-400"
        style={{
          boxSizing: "border-box",
          border: "4px solid black",
          borderTop: "4px solid purple",
          borderRight: "4px solid purple",
          borderRadius: "0",
          animation: "spin 1s linear infinite",
        }}
      />
    </div>
  </div>
);

// Wrapper component for protected routes with XP requirement
const ProtectedStageRoute = ({ children, requiredStage }) => (
  <RequireAuth>
    <XPProtectedRoute requiredStage={requiredStage}>
      {children}
    </XPProtectedRoute>
  </RequireAuth>
);

// Route configuration for better maintainability
const routeConfig = {
  // Public routes
  public: [
    { path: "/", component: MainPage },
    { path: "/shipwrecked", component: ShipwreckedPage },
    { path: "/peter", component: Peter },
    { path: "/about", component: AboutPage },
    { path: "/start", component: GameStartPage },
    { path: "/contact", component: ContactPage },
    { path: "/help", component: HelpPage },
    { path: "/privacy", component: PrivacyPage },
    { path: "/feedback", component: FeedbackPage },
    { path: "/subtitles", component: Subtitles },
  ],

  // Auth protected routes (login/register)
  authProtected: [
    { path: "/login", component: LoginPage },
    { path: "/register", component: RegisterPage },
  ],

  // Simple auth required routes
  authRequired: [
    { path: "/game", component: GamePage },
    { path: "/main-menu", component: MainMenu },
  ],

  // Stage-based protected routes
  stageProtected: [
    { path: "/stage1", component: Stage1Page, requiredStage: 1 },
    { path: "/diagnosis", component: Stage1Diagnosis, requiredStage: 1 },

    { path: "/stage2", component: Stage2Page, requiredStage: 2 },
    { path: "/stage3", component: Stage3Page, requiredStage: 3 },
    { path: "/stage4", component: Stage4Page, requiredStage: 4 },
    { path: "/stage5", component: Stage5Page, requiredStage: 5 },
    { path: "/stage6", component: Stage6Page, requiredStage: 6 },
  ],
};

function App() {
  return (
    <>
      <PCOnlyPopup />
      <UserDataProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public routes */}
            {routeConfig.public.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}

            {/* Auth protected routes (login/register) */}
            {routeConfig.authProtected.map(({ path, component: Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  <AuthProtectedRoute>
                    <Component />
                  </AuthProtectedRoute>
                }
              />
            ))}

            {/* Simple auth required routes */}
            {routeConfig.authRequired.map(({ path, component: Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  <RequireAuth>
                    <Component />
                  </RequireAuth>
                }
              />
            ))}

            {/* Stage-based protected routes */}
            {routeConfig.stageProtected.map(
              ({ path, component: Component, requiredStage }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <ProtectedStageRoute requiredStage={requiredStage}>
                      <Component />
                    </ProtectedStageRoute>
                  }
                />
              )
            )}

            {/* 404 Not Found Route - Must be last */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </UserDataProvider>
    </>
  );
}

export default App;
