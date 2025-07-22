import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";

import PokemonListScreen from "./src/screens/PokemonListScreen";
import PokemonDetailScreen from "./src/screens/PokemonDetailScreen";
import CreatePokemonScreen from "./src/screens/CreatePokemonScreen";
import EditPokemonScreen from "./src/screens/EditPokemonScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#dc3545" />
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
    </NavigationContainer>
  );
}
