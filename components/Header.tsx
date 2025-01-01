import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const notifications = [
  {
    id: 1,
    title: 'Breaking News: Market Hits Record High',
    image: 'https://via.placeholder.com/80',
  },
  {
    id: 2,
    title: 'Sports Update: Local Team Wins Championship',
    image: 'https://via.placeholder.com/80',
  },
];

const Header = () => {
  const [isNotificationVisible, setNotificationVisible] = useState(false);
  const [userName, setUserName] = useState('User'); // Default name

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const name = await AsyncStorage.getItem('userName');
        if (name) {
          setUserName(name);
        }
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };

    fetchUserName();
  }, []);


  const toggleNotification = () => {
    setNotificationVisible(!isNotificationVisible);
  };

  const closeNotification = () => {
    setNotificationVisible(false);
  };

  return (
    <View style={styles.wrapper}>
      <TouchableWithoutFeedback onPress={closeNotification}>
        <View style={styles.container}>
          <View style={styles.userInfo}>
            <Image
              source={{
                uri: 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-2.jpg',
              }}
              style={styles.userImg}
            />
            <View>
              <Text style={styles.welcomeTxt}>Welcome!</Text>
              <Text style={styles.userName}>{userName}</Text>
            </View>
          </View>

          {/* Notification Bell */}
          <TouchableOpacity onPress={toggleNotification} style={styles.bellWrapper}>
            <Ionicons name="notifications-outline" size={24} color={Colors.black} />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>2</Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>

      {/* Notification Popup */}
      {isNotificationVisible && (
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={closeNotification}>
            <View style={styles.overlayClickable}></View>
          </TouchableWithoutFeedback>
          <View style={styles.notificationPopup}>
            <Text style={styles.popupTitle}>Notifications</Text>
            {notifications.map((notification) => (
              <View key={notification.id} style={styles.notificationItem}>
                <Image
                  source={{ uri: notification.image }}
                  style={styles.notificationImage}
                />
                <Text style={styles.notificationText}>{notification.title}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default Header;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 999,
  },
  container: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    zIndex: 2,
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  welcomeTxt: {
    fontSize: 12,
    color: Colors.darkGrey,
  },
  userName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.black,
  },
  bellWrapper: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  notificationBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu xám phủ mờ
    zIndex: 999,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  overlayClickable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  notificationPopup: {
    position: 'absolute',
    top: 80,
    right: 20,
    width: width * 0.8,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  },
  popupTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: Colors.black,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 10,
  },
  notificationImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  notificationText: {
    fontSize: 14,
    color: Colors.black,
    flex: 1,
    flexWrap: 'wrap',
  },
});
