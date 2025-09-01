import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ConfirmPage from "./pages/ConfirmPage";

import ProtectedRoute from "./ui/ProtectedRoute";
import AppLayout from "./ui/Applayout";

import LoadingSpinner from "./ui/LoadingSpinner";
// Lazy load heavy components
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const TodoPage = lazy(() => import("./pages/TodoPage"));

import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<h1>Page not found!!!</h1>} />
        <Route path="/confirm" element={<ConfirmPage />} />
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <DashboardPage />
              </Suspense>
            }
          />
          <Route
            path="/todo"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <TodoPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
