import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI } from "../services/pokemonAPI";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const response = await authAPI.verifyToken();
        setUser(response.data);
      }
    } catch (error) {
      await AsyncStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await authAPI.login(email, password);
    await AsyncStorage.setItem("token", response.data.token);
    setUser(response.data.user);
    return response.data;
  };

  const register = async (userData) => {
    const response = await authAPI.register(userData);
    await AsyncStorage.setItem("token", response.data.token);
    setUser(response.data.user);
    return response.data;
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
