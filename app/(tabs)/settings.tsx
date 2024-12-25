import { Alert, Modal, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from 'expo-router';
import { useTheme } from '../../hooks/ThemeContext';


type Props = {}

const Settings = (props: Props) => { 
  const { colors, toggleTheme } = useTheme(); // Lấy theme và hàm toggleTheme từ context
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); 
  const [modalContent, setModalContent] = useState(""); 
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    toggleTheme();  // Chuyển đổi theme khi bật/tắt dark mode
  };
  const router = useRouter();



  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: async () => {
            // Clear stored user data (if any)
            await AsyncStorage.removeItem('userToken');
            // Navigate to the login page
            router.replace("/login");
          },
        },
      ],
      { cancelable: true }
    );
  };
  const openModal = (content: JSX.Element | string) => {
    setModalContent(content);
    setModalVisible(true);
  };

  return (
    <>
    <Stack.Screen options={{
      headerShown: true,
    }}/>

    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* About */}
      <TouchableOpacity style={[styles.itemBtn, { backgroundColor: colors.card, borderColor: colors.primary }]} onPress={() => 
      openModal(
      <View>
        <Text style={[styles.title, { color: colors.text }]}>About Us</Text>
        <ScrollView style={styles.scrollView}>
          <Text style={[styles.text, { color: colors.text }]}>
          Welcome to NewsHub your trusted source for the latest and most relevant news from around the world. Whether you're looking for breaking news, in-depth analysis, or just a quick update on what's happening today, we've got you covered.
          </Text>
        </ScrollView>
      </View>
      )}>
        <Text style={[styles.itemBtnTxt, { color: colors.text }]}>About</Text>
        <MaterialIcons name='arrow-forward-ios' size={16} color={colors.primary} />
      </TouchableOpacity>

      {/* Feedback */}
      <TouchableOpacity style={[styles.itemBtn, { backgroundColor: colors.card, borderColor: colors.primary }]} onPress={() => openModal(
        <View>
          <Text style={[styles.title, { color: colors.text }]}>Send Feedback</Text>
          <ScrollView style={styles.scrollView}>
            <Text style={[styles.text, { color: colors.text }]}>
              This is the Send Feedback page content.
            </Text>
          </ScrollView>
        </View>
      )}>
        <Text style={[styles.itemBtnTxt, { color: colors.text }]}>Send Feedback</Text>
        <MaterialIcons name='arrow-forward-ios' size={16} color={colors.primary} />
      </TouchableOpacity>

      {/* Privacy Policy */}
      <TouchableOpacity style={[styles.itemBtn, { backgroundColor: colors.card, borderColor: colors.primary }]} onPress={() => openModal(
        <View>
          <Text style={[styles.title, { color: colors.text }]}>Privacy Policy</Text>
          <ScrollView style={styles.scrollView}>
            <Text style={[styles.text, { color: colors.text }]}>
              This is the Privacy Policy page content.
            </Text>
          </ScrollView>
        </View>
      )}>
        <Text style={[styles.itemBtnTxt, { color: colors.text }]}>Privacy Policy</Text>
        <MaterialIcons name='arrow-forward-ios' size={16} color={colors.primary} />
      </TouchableOpacity>

      {/* Terms of Use */}
      <TouchableOpacity style={[styles.itemBtn, { backgroundColor: colors.card, borderColor: colors.primary }]} onPress={() => openModal(
        <View>
          <Text style={[styles.title, { color: colors.text }]}>Terms of Use</Text>
          <ScrollView style={styles.scrollView}>
            <Text style={[styles.text, { color: colors.text }]}>
              By using NewsHub, you agree to: {'\n'}
              <Text style={{ fontWeight: 'bold' }}>1. Usage:</Text> Use the app for personal, non-commercial purposes. {'\n'}
              <Text style={{ fontWeight: 'bold' }}>2. Content:</Text> All content is owned by NewsHub or its partners and is protected by copyright. {'\n'}
              <Text style={{ fontWeight: 'bold' }}>3. Privacy:</Text> We value your privacy and will not share your data without consent. {'\n'}
              <Text style={{ fontWeight: 'bold' }}>4. Prohibited Activities:</Text> Do not use the app for illegal activities. {'\n'}
              <Text style={{ fontWeight: 'bold' }}>5. Limitation:</Text> NewsHub is not responsible for any damage or loss caused by app usage. {'\n'}
              By using NewsHub, you accept these terms.
            </Text>
          </ScrollView>
        </View>
      )}>
        <Text style={[styles.itemBtnTxt, { color: colors.text }]}>Terms of Use</Text>
        <MaterialIcons name='arrow-forward-ios' size={16} color={colors.primary} />
      </TouchableOpacity>

      {/* Dark Mode Switch */}
      <TouchableOpacity style={[styles.itemBtn, { backgroundColor: colors.card, borderColor: colors.primary }]} onPress={toggleSwitch}>
        <Text style={[styles.itemBtnTxt, { color: colors.text }]}>Dark Mode</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#3e3e3e' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={styles.switch}
        />
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity style={[styles.itemBtn, { backgroundColor: colors.card, borderColor: colors.primary }]} onPress={handleLogout}>
        <Text style={[styles.itemBtnTxt, { color: colors.text }]}>Logout</Text>
        <MaterialIcons name='logout' size={16} color={colors.primary} />
      </TouchableOpacity>

      <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <View style={styles.modalView}>
        <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
          {modalContent}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    </View>
  </>
)
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  itemBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,  // Đảm bảo viền luôn có
  },
  itemBtnTxt: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
    maxHeight: '80%',
    overflow: 'scroll',
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ff6347',
    borderRadius: 5,
  },
  closeButtonText: {
    color: Colors.white,
    fontSize: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: Colors.black,
    lineHeight: 22,
    marginBottom: 10,
  },
  scrollView: {
    paddingBottom: 20,
    // maxHeight: '70%',
  },
  switch: {
    transform: [{ scale: 0.8 }],
    marginRight: 8,
  },
  
})

// function setModalContent(content: string | JSX.Element) {
//   throw new Error('Function not implemented.');
// }
// function setModalVisible(arg0: boolean) {
//   throw new Error('Function not implemented.');
// }

