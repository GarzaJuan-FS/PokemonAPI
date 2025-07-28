import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// deployed Heroku API or localhost for development
const API_BASE_URL = __DEV__
  ? "http://192.168.1.42:3001" // <-- REPLACE WITH YOUR MAC'S ACTUAL IP
  : "https://pokemonapidem-4a4a5c9af15b.herokuapp.com/"; // Production

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Add token to requests automatically
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  // POST login
  login: (email, password) => api.post("/auth/login", { email, password }),

  // POST register
  register: (userData) => api.post("/auth/register", userData),

  // GET verify token
  verifyToken: () => api.get("/auth/verify"),
};

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
