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
  const [storedPassword, setStoredPassword] = useState(""); // Mật khẩu đã lưu
  const router = useRouter();

  // Lấy mật khẩu đã lưu từ AsyncStorage khi trang login được mở
  useEffect(() => {
    const getStoredData = async () => {
      const storedEmail = await AsyncStorage.getItem("userEmail");
      const storedPassword = await AsyncStorage.getItem("userPassword");

      if (storedEmail) {
        setEmail(storedEmail);
      }
      if (storedPassword) {
        setStoredPassword(storedPassword);  // Lưu mật khẩu đã lưu vào state
      }
    };

    getStoredData();
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

  // Hiển thị hộp thoại nhập mật khẩu khi nhấp vào email
  const handleEmailPress = async () => {
    if (storedPassword) {
      setPassword(storedPassword); // Tự động điền mật khẩu nếu đã lưu
    }
    setDialogVisible(true);
  };

  // Đóng hộp thoại và xác nhận mật khẩu
  const handlePasswordSubmit = () => {
    setDialogVisible(false);  // Đóng hộp thoại
    if (storedPassword) {
      setPassword(storedPassword); // Đặt mật khẩu đã lưu vào ô mật khẩu
    } else {
      Alert.alert("Error", "No password stored.");
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
        onFocus={handleEmailPress}  // Khi nhấn vào email, sẽ hiển thị hộp thoại
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
      <Dialog.Container visible={isDialogVisible}>
        <Dialog.Title>Enter Password</Dialog.Title>
        <Dialog.Description>
          Please enter the password stored for this email.
        </Dialog.Description>
        <Dialog.Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Dialog.Button label="Cancel" onPress={() => setDialogVisible(false)} />
        <Dialog.Button label="Submit" onPress={handlePasswordSubmit} />
      </Dialog.Container>
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
