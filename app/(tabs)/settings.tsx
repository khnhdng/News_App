import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/ThemeContext';  // Import useTheme từ ThemeContext

type Props = {};

const Page = (props: Props) => {
  const { colors, toggleTheme } = useTheme();  // Lấy theme và hàm toggleTheme từ context
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    toggleTheme();  // Chuyển đổi theme khi bật/tắt dark mode
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: true }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Các mục khác */}
        <TouchableOpacity style={[styles.itemBtn, { backgroundColor: colors.card, borderColor: colors.primary }]}>
          <Text style={[styles.itemBtnTxt, { color: colors.text }]}>About</Text>
          <MaterialIcons name='arrow-forward-ios' size={16} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.itemBtn, { backgroundColor: colors.card, borderColor: colors.primary }]}>
          <Text style={[styles.itemBtnTxt, { color: colors.text }]}>Send Feedback</Text>
          <MaterialIcons name='arrow-forward-ios' size={16} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.itemBtn, { backgroundColor: colors.card, borderColor: colors.primary }]}>
          <Text style={[styles.itemBtnTxt, { color: colors.text }]}>Privacy Policy</Text>
          <MaterialIcons name='arrow-forward-ios' size={16} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.itemBtn, { backgroundColor: colors.card, borderColor: colors.primary }]}>
          <Text style={[styles.itemBtnTxt, { color: colors.text }]}>Terms of Use</Text>
          <MaterialIcons name='arrow-forward-ios' size={16} color={colors.text} />
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
        <TouchableOpacity style={[styles.itemBtn, { backgroundColor: colors.card, borderColor: colors.primary }]}>
          <Text style={[styles.itemBtnTxt, { color: 'red' }]}>Logout</Text>
          <MaterialIcons name='logout' size={16} color={'red'} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
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
    fontWeight: '600',
  },
  switch: {
    transform: [{ scale: 0.8 }],
    marginRight: 8,
  },
});
