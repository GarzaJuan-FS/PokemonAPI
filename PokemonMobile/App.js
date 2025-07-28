import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, Text, Alert } from "react-native";

import { AuthProvider, useAuth } from "./src/contexts/AuthContext";
import LoadingScreen from "./src/screens/LoadingScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import PokemonListScreen from "./src/screens/PokemonListScreen";
import PokemonDetailScreen from "./src/screens/PokemonDetailScreen";
import CreatePokemonScreen from "./src/screens/CreatePokemonScreen";
import EditPokemonScreen from "./src/screens/EditPokemonScreen";

const Stack = createStackNavigator();

// Auth Stack for login/register
const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

// Main App Stack for Pokemon functionality
const AppStack = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: logout, style: "destructive" },
    ]);
  };

  return (
    <Stack.Navigator
      initialRouteName="PokemonList"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#dc3545",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={handleLogout}
            style={{ marginRight: 15, padding: 5 }}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>Logout</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="PokemonList"
        component={PokemonListScreen}
        options={{ title: "Pokédex" }}
      />
      <Stack.Screen
        name="PokemonDetail"
        component={PokemonDetailScreen}
        options={{ title: "Pokemon Details" }}
      />
      <Stack.Screen
        name="CreatePokemon"
        component={CreatePokemonScreen}
        options={{ title: "Add New Pokemon" }}
      />
      <Stack.Screen
        name="EditPokemon"
        component={EditPokemonScreen}
        options={{ title: "Edit Pokemon" }}
      />
    </Stack.Navigator>
  );
};

// Main Navigation Component
const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#dc3545" />
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

// Root App Component
export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
