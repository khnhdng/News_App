import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const SettingsPage = () => {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    router.push(`/settings/${page}`); // Điều hướng đến các trang con
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.itemBtn} onPress={() => handleNavigate('about')}>
        <Text style={styles.itemBtnTxt}>About</Text>
        <MaterialIcons name='arrow-forward-ios' size={16} color="#888" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.itemBtn} onPress={() => handleNavigate('privacy-policy')}>
        <Text style={styles.itemBtnTxt}>Privacy Policy</Text>
        <MaterialIcons name='arrow-forward-ios' size={16} color="#888" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.itemBtn} onPress={() => handleNavigate('terms-of-use')}>
        <Text style={styles.itemBtnTxt}>Terms of Use</Text>
        <MaterialIcons name='arrow-forward-ios' size={16} color="#888" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  itemBtnTxt: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
});

export default SettingsPage;
