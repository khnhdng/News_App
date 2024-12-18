import React, { useState } from "react";
import {
  Alert,
    ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Colors } from "react-native/Libraries/NewAppScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUpPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
        alert("Please fill in all fields");
        return;
    }
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }
    try {
        await AsyncStorage.setItem('userEmail', email);
        await AsyncStorage.setItem('userPassword', password);
        alert("Sign up successful");
  
        router.replace("/login");
      } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred. Please try again.");
      }
    };



  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <ImageBackground 
        source={require("../assets/images/getting-started.jpg")} 
        style = {{ width: "100%", height: "100%"}} 
        resizeMode="cover"
      >
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={Colors.lightGrey}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={Colors.lightGrey}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"  
          placeholderTextColor={Colors.lightGrey}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.authButton} onPress={handleSignUp}>
          <Text style={styles.authButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.replace("/login")} // Chuyển sang trang đăng nhập
          style={styles.toggleButton}
        >
          <Text style={styles.toggleButtonText}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    </GestureHandlerRootView>
  );
};

export default SignUpPage;

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
