import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";
import CreatePokemon from "./components/CreatePokemon";
import ProtectedRoute from "./components/ProtectedRoute";
import Navigation from "./components/Navigation";
import "./App.css";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="App">
      {user && <Navigation />}
      <Routes>
        {/* Public Routes - Only accessible when NOT logged in */}
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" replace /> : <Register />}
        />

        {/* Protected Routes - Only accessible when logged in */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pokemon"
          element={
            <ProtectedRoute>
              <PokemonList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pokemon/create"
          element={
            <ProtectedRoute>
              <CreatePokemon />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pokemon/:id"
          element={
            <ProtectedRoute>
              <PokemonDetail />
            </ProtectedRoute>
          }
        />

        {/* Default Route */}
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
