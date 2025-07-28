import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { pokemonAPI } from "../utils/api";

const Dashboard = () => {
  const { user } = useAuth();
  const [pokemonCount, setPokemonCount] = useState(0);
  const [recentPokemon, setRecentPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemon = await pokemonAPI.getAll();
        setPokemonCount(pokemon.length);
        setRecentPokemon(pokemon.slice(0, 5)); // Show first 5
      } catch (error) {
        console.error("Error fetching pokemon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome to your Pokemon Dashboard, {user?.username}!</h1>
        <p>Manage your Pokemon collection</p>
      </header>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Pokemon</h3>
          <p className="stat-number">{pokemonCount}</p>
        </div>

        <div className="stat-card">
          <h3>User</h3>
          <p>{user?.email}</p>
        </div>
      </div>

      <div className="dashboard-actions">
        <Link to="/pokemon" className="action-btn">
          View All Pokemon
        </Link>
        <Link to="/pokemon/create" className="action-btn primary">
          Add New Pokemon
        </Link>
      </div>

      {recentPokemon.length > 0 && (
        <div className="recent-pokemon">
          <h2>Recent Pokemon</h2>
          <div className="pokemon-grid">
            {recentPokemon.map((pokemon) => (
              <div key={pokemon._id} className="pokemon-card">
                <h3>{pokemon.name}</h3>
                <p>Type: {pokemon.type}</p>
                <Link to={`/pokemon/${pokemon._id}`}>View Details</Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
