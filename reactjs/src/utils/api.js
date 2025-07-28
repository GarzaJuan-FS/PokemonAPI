const API_BASE_URL = "http://localhost:3001"; // Update with your API URL

const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Request failed");
  }

  return response.json();
};

export const authAPI = {
  login: (email, password) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  register: (userData) =>
    apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    }),

  verifyToken: () => apiRequest("/auth/verify"),
};

export const pokemonAPI = {
  getAll: () => apiRequest("/pokemon"),
  getById: (id) => apiRequest(`/pokemon/${id}`),
  create: (data) =>
    apiRequest("/pokemon", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id, data) =>
    apiRequest(`/pokemon/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id) =>
    apiRequest(`/pokemon/${id}`, {
      method: "DELETE",
    }),
};
