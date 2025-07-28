import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { pokemonAPI } from "../utils/api";

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    try {
      const data = await pokemonAPI.getAll();
      setPokemon(data);
    } catch (err) {
      setError("Failed to fetch Pokemon");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Pokemon?")) {
      try {
        await pokemonAPI.delete(id);
        setPokemon(pokemon.filter((p) => p._id !== id));
      } catch (err) {
        setError("Failed to delete Pokemon");
      }
    }
  };

  if (loading) return <div className="loading">Loading Pokemon...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="pokemon-list">
      <div className="list-header">
        <h1>Pokemon Collection</h1>
        <Link to="/pokemon/create" className="btn btn-primary">
          Add New Pokemon
        </Link>
      </div>

      {pokemon.length === 0 ? (
        <div className="empty-state">
          <p>No Pokemon found. Start by adding one!</p>
          <Link to="/pokemon/create" className="btn btn-primary">
            Add Your First Pokemon
          </Link>
        </div>
      ) : (
        <div className="pokemon-grid">
          {pokemon.map((p) => (
            <div key={p._id} className="pokemon-card">
              <h3>{p.name}</h3>
              <p>
                <strong>Type:</strong> {p.type}
              </p>
              {p.level && (
                <p>
                  <strong>Level:</strong> {p.level}
                </p>
              )}
              {p.description && (
                <p className="description">
                  {p.description.substring(0, 100)}...
                </p>
              )}

              <div className="card-actions">
                <Link to={`/pokemon/${p._id}`} className="btn btn-secondary">
                  View
                </Link>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonList;
