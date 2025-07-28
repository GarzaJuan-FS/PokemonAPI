import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { pokemonAPI } from "../utils/api";

const PokemonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPokemon = useCallback(async () => {
    try {
      const data = await pokemonAPI.getById(id);
      setPokemon(data);
      setFormData({
        name: data.name || "",
        type: data.type || "",
        level: data.level || "",
        description: data.description || "",
        abilities: data.abilities ? data.abilities.join(", ") : "",
      });
    } catch (err) {
      setError("Failed to fetch Pokemon details");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        ...formData,
        level: formData.level ? parseInt(formData.level) : undefined,
        abilities: formData.abilities
          ? formData.abilities.split(",").map((a) => a.trim())
          : [],
      };

      const updated = await pokemonAPI.update(id, updateData);
      setPokemon(updated);
      setEditing(false);
    } catch (err) {
      setError("Failed to update Pokemon");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Pokemon?")) {
      try {
        await pokemonAPI.delete(id);
        navigate("/pokemon");
      } catch (err) {
        setError("Failed to delete Pokemon");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) return <div className="loading">Loading Pokemon details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!pokemon) return <div className="error">Pokemon not found</div>;

  return (
    <div className="pokemon-detail">
      <div className="detail-header">
        <Link to="/pokemon" className="back-link">
          ← Back to Pokemon List
        </Link>
        <div className="header-actions">
          {!editing && (
            <>
              <button
                onClick={() => setEditing(true)}
                className="btn btn-secondary"
              >
                Edit
              </button>
              <button onClick={handleDelete} className="btn btn-danger">
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {editing ? (
        <form onSubmit={handleUpdate} className="pokemon-form">
          <h1>Edit {pokemon.name}</h1>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Type</label>
            <input
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="level">Level</label>
            <input
              type="number"
              id="level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              min="1"
              max="100"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="abilities">Abilities</label>
            <input
              type="text"
              id="abilities"
              name="abilities"
              value={formData.abilities}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="pokemon-info">
          <h1>{pokemon.name}</h1>

          <div className="info-grid">
            <div className="info-item">
              <strong>Type:</strong> {pokemon.type}
            </div>

            {pokemon.level && (
              <div className="info-item">
                <strong>Level:</strong> {pokemon.level}
              </div>
            )}

            {pokemon.abilities && pokemon.abilities.length > 0 && (
              <div className="info-item">
                <strong>Abilities:</strong> {pokemon.abilities.join(", ")}
              </div>
            )}

            {pokemon.description && (
              <div className="info-item full-width">
                <strong>Description:</strong>
                <p>{pokemon.description}</p>
              </div>
            )}

            {pokemon.createdAt && (
              <div className="info-item">
                <strong>Added:</strong>{" "}
                {new Date(pokemon.createdAt).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonDetail;
