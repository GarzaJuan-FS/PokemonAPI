import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_BASE =
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000"
      : process.env.REACT_APP_API_URL;
  useEffect(() => {
    let ignore = false;

    const getPokemon = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/pokemon`);
        const data = await res.json();
        console.log(data);
        if (!ignore) {
          setPokemon(data);
        }
      } catch (error) {
        setError(error.message || "Failed to fetch Pokémon data");
      } finally {
        setLoading(false);
      }
    };

    getPokemon();

    return () => {
      ignore = true;
    };
  }, [API_BASE]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokédex</h1>
        <ul>
          <li>View all Pokémon</li>
          <li>View Pokémon by ID</li>
          <li>Create new Pokémon</li>
          <li>Update Pokémon by ID</li>
          <li>Delete Pokémon by ID</li>
        </ul>
      </header>
    </div>
  );
}

export default App;
