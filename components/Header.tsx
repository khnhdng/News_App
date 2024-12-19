import { Image, StyleSheet, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Props = {}

const Header = (props: Props) => {
  const [userName, setUserName] = useState('');
  
  useEffect(() => {
    const fetchUserName = async () => {
      const name = await AsyncStorage.getItem('userName');
      if (name) {
        setUserName(name);
      }
    };
    fetchUserName();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image 
            source = {{uri: 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-2.jpg'}}
            style = {styles.userImg}
        />
        <View style={{gap: 3}}>
            <Text style={styles.welcomeTxt}>Welcome!</Text>
            <Text style={styles.userName}>{userName || 'User'}</Text>
        </View>
      
      </View>

      <TouchableOpacity onPress={() => {}}></TouchableOpacity>
      <Ionicons name="notifications-outline" size={24} color={Colors.black}/>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    userImg: {
        width: 50,
        height: 50,
        borderRadius: 30
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    welcomeTxt: {
        fontSize: 12,
        color: Colors.darkGrey
    },
    userName: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.black
    }
});