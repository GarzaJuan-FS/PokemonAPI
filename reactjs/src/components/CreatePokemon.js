import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { pokemonAPI } from "../utils/api";

const CreatePokemon = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    level: "",
    description: "",
    abilities: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const pokemonData = {
        ...formData,
        level: formData.level ? parseInt(formData.level) : undefined,
        abilities: formData.abilities
          ? formData.abilities.split(",").map((a) => a.trim())
          : [],
      };

      await pokemonAPI.create(pokemonData);
      navigate("/pokemon");
    } catch (err) {
      setError(err.message || "Failed to create Pokemon");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="create-pokemon">
      <h1>Add New Pokemon</h1>

      <form onSubmit={handleSubmit} className="pokemon-form">
        {error && <div className="error">{error}</div>}

        <div className="form-group">
          <label htmlFor="name">Name *</label>
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
          <label htmlFor="type">Type *</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select a type</option>
            <option value="Fire">Fire</option>
            <option value="Water">Water</option>
            <option value="Grass">Grass</option>
            <option value="Electric">Electric</option>
            <option value="Psychic">Psychic</option>
            <option value="Fighting">Fighting</option>
            <option value="Normal">Normal</option>
            <option value="Flying">Flying</option>
            <option value="Poison">Poison</option>
            <option value="Ground">Ground</option>
            <option value="Rock">Rock</option>
            <option value="Bug">Bug</option>
            <option value="Ghost">Ghost</option>
            <option value="Steel">Steel</option>
            <option value="Dragon">Dragon</option>
            <option value="Dark">Dark</option>
            <option value="Fairy">Fairy</option>
            <option value="Ice">Ice</option>
          </select>
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
          <label htmlFor="abilities">Abilities (comma-separated)</label>
          <input
            type="text"
            id="abilities"
            name="abilities"
            value={formData.abilities}
            onChange={handleChange}
            placeholder="e.g. Blaze, Solar Power"
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate("/pokemon")}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? "Creating..." : "Create Pokemon"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePokemon;
