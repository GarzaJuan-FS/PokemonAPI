import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { pokemonAPI } from "../services/pokemonAPI";

export default function CreatePokemonScreen({ navigation }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || !type.trim() || !level.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (isNaN(level) || parseInt(level) < 1) {
      Alert.alert("Error", "Level must be a positive number");
      return;
    }

    try {
      setLoading(true);
      await pokemonAPI.createPokemon({
        name: name.trim(),
        type: type.trim(),
        level: parseInt(level),
      });

      Alert.alert("Success", "Pokemon created successfully!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to create Pokemon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Pokemon Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter Pokemon name"
          autoCapitalize="words"
        />

        <Text style={styles.label}>Pokemon Type</Text>
        <TextInput
          style={styles.input}
          value={type}
          onChangeText={setType}
          placeholder="e.g., Fire, Water, Grass"
          autoCapitalize="words"
        />

        <Text style={styles.label}>Level</Text>
        <TextInput
          style={styles.input}
          value={level}
          onChangeText={setLevel}
          placeholder="Enter level (1-100)"
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSave}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Creating..." : "Create Pokemon"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#dc3545",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
