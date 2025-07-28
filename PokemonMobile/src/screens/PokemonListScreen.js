import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Alert,
} from "react-native";
import { pokemonAPI } from "../services/pokemonAPI";

export default function PokemonListScreen({ navigation }) {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPokemon = async () => {
    try {
      setLoading(true);
      const response = await pokemonAPI.getAllPokemon();
      setPokemon(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to load Pokemon");
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPokemon();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const renderPokemonItem = ({ item }) => (
    <TouchableOpacity
      style={styles.pokemonCard}
      onPress={() => navigation.navigate("PokemonDetail", { pokemon: item })}
    >
      <View style={styles.pokemonInfo}>
        <Text style={styles.pokemonName}>{item.name}</Text>
        <Text style={styles.pokemonType}>Type: {item.type}</Text>
        <Text style={styles.pokemonLevel}>Level: {item.level}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemon}
        keyExtractor={(item) => item._id}
        renderItem={renderPokemonItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No Pokemon found!</Text>
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("CreatePokemon")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  pokemonCard: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  pokemonInfo: {
    flex: 1,
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  pokemonType: {
    fontSize: 14,
    color: "#666",
    marginBottom: 3,
  },
  pokemonLevel: {
    fontSize: 14,
    color: "#666",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#666",
  },
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "#dc3545",
    borderRadius: 28,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
});
