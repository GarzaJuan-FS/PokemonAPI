import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { pokemonAPI } from "../services/pokemonAPI";

export default function PokemonDetailScreen({ route, navigation }) {
  const { pokemon } = route.params;

  const handleDelete = () => {
    Alert.alert(
      "Delete Pokemon",
      `Are you sure you want to delete ${pokemon.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await pokemonAPI.deletePokemon(pokemon._id);
              Alert.alert("Success", "Pokemon deleted successfully!", [
                { text: "OK", onPress: () => navigation.goBack() },
              ]);
            } catch (error) {
              Alert.alert("Error", "Failed to delete Pokemon");
            }
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    navigation.navigate("EditPokemon", { pokemon });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.name}>{pokemon.name}</Text>
        <Text style={styles.detail}>Type: {pokemon.type}</Text>
        <Text style={styles.detail}>Level: {pokemon.level}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.buttonText}>Edit Pokemon</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete Pokemon</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  detail: {
    fontSize: 18,
    color: "#666",
    marginBottom: 10,
  },
  buttonContainer: {
    gap: 15,
  },
  editButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
