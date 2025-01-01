import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import Voice from 'react-native-voice'; // Import thư viện Voice

type Props = {
  withHorizontalPadding: boolean;
  setSearchQuery: Function;
};

const SearchBar = ({ withHorizontalPadding, setSearchQuery }: Props) => {
  const [searchText, setSearchText] = useState('');
  const [isListening, setIsListening] = useState(false);

  // Lắng nghe kết quả từ giọng nói
  Voice.onSpeechResults = (event) => {
    const speech = event.value?.[0] || '';
    setSearchText(speech);
    setSearchQuery(speech); // Cập nhật giá trị tìm kiếm từ giọng nói
  };

  const startListening = () => {
    setIsListening(true);
    Voice.start('en-US').catch((error) => console.error('Voice start error:', error));
  };

  const stopListening = () => {
    setIsListening(false);
    Voice.stop().catch((error) => console.error('Voice stop error:', error));
  };

  const handleTextChange = (text: string) => {
    setSearchText(text);
    setSearchQuery(text); // Cập nhật giá trị tìm kiếm từ người dùng nhập
  };

  return (
    <View style={[styles.container, withHorizontalPadding && { paddingHorizontal: 20 }]}>
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color={Colors.lightGrey} />
        <TextInput
          placeholder="Search"
          placeholderTextColor={Colors.lightGrey}
          style={styles.searchTxt}
          autoCapitalize="none"
          value={searchText}
          onChangeText={handleTextChange}
        />
        <TouchableOpacity onPress={isListening ? stopListening : startListening}>
          <Ionicons name={isListening ? 'mic' : 'mic-outline'} size={20} color={Colors.lightGrey} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: '#E4E4E4',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchTxt: {
    fontSize: 14,
    flex: 1,
    color: Colors.darkGrey,
  },
});
