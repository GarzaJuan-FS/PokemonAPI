import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleRegister = async () => {
    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      console.log("Attempting registration with:", {
        username,
        email,
        password: "***",
      });
      const response = await register({ username, email, password });
      console.log("Registration successful:", response);
    } catch (error) {
      console.log("Registration error:", error);
      console.log("Error response:", error.response?.data);
      console.log("Error status:", error.response?.status);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Registration failed";
      Alert.alert("Registration Failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join the Pokemon community</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={formData.username}
          onChangeText={(value) => updateField("username", value)}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(value) => updateField("email", value)}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={formData.password}
          onChangeText={(value) => updateField("password", value)}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChangeText={(value) => updateField("confirmPassword", value)}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Creating Account..." : "Register"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#dc3545",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 48,
    color: "#666",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#dc3545",
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  linkButton: {
    paddingVertical: 8,
  },
  linkText: {
    color: "#dc3545",
    fontSize: 16,
    textAlign: "center",
  },
});
