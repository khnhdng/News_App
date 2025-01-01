import React, { useState, useEffect } from "react";
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
import Dialog from "react-native-dialog";
import { Colors } from "react-native/Libraries/NewAppScreen";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDialogVisible, setDialogVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkFirstTime = async () => {
      const isFirstTime = await AsyncStorage.getItem("isFirstTime");

      if (isFirstTime === null) {
        // Lần đầu vào: không tự động điền
        await AsyncStorage.setItem("isFirstTime", "false");
      } else {
        // Không phải lần đầu: tự động điền email
        const storedEmail = await AsyncStorage.getItem("userEmail");
        const storedPassword = await AsyncStorage.getItem("userPassword");

        if (storedEmail) setEmail(storedEmail);
        if (storedPassword) setPassword(storedPassword);
      }
    };

    checkFirstTime();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password are required.");
      return;
    }

    try {
      // Lưu thông tin đăng nhập vào AsyncStorage
      await AsyncStorage.setItem("userEmail", email);
      await AsyncStorage.setItem("userPassword", password);

      // Chuyển hướng đến trang chính
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };


  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userEmail");
      await AsyncStorage.removeItem("userPassword");
      Alert.alert("Success", "Logged out successfully.");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error during logout:", error);
      Alert.alert("Error", "Something went wrong during logout.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
       // Khi nhấn vào email, sẽ hiển thị hộp thoại
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.authButton} onPress={handleLogin}>
        <Text style={styles.authButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace("/signup")} style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>

      {/* Dialog nhập mật khẩu */}

    </View>
  );
};

export default LoginPage;

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
