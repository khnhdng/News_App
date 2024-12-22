import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "react-native/Libraries/NewAppScreen";

const SignupPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Invalid email format. Please include '@' and domain.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      // Lưu thông tin người dùng vào AsyncStorage
      await AsyncStorage.setItem("userName", name);
      await AsyncStorage.setItem("userEmail", email);
      await AsyncStorage.setItem("userPassword", password);

      Alert.alert("Success", "Signup successful! Redirecting to login...");
      router.replace("/login");
    } catch (error) {
      console.error("Error during signup:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.authButton} onPress={handleSignup}>
        <Text style={styles.authButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace("/login")} style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.darkGrey,
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  authButton: {
    backgroundColor: "#ff4c4c",
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  authButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  toggleButton: {
    marginTop: 20,
  },
  toggleButtonText: {
    color: Colors.blue,
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
