import axios from "axios";
import Constants from "expo-constants";

// deployed Heroku API or localhost for development
const API_BASE_URL = __DEV__
  ? "http://localhost:4000" // Local development
  : "https://pokemonapidem-4a4a5c9af15b.herokuapp.com/"; // Production

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export const pokemonAPI = {
  // GET all Pokemon
  getAllPokemon: () => api.get("/pokemon"),

  // GET Pokemon by ID
  getPokemonById: (id) => api.get(`/pokemon/${id}`),

  // POST new Pokemon
  createPokemon: (pokemonData) => api.post("/pokemon", pokemonData),

  // PATCH update Pokemon
  updatePokemon: (id, pokemonData) => api.patch(`/pokemon/${id}`, pokemonData),

  // DELETE Pokemon
  deletePokemon: (id) => api.delete(`/pokemon/${id}`),
};
