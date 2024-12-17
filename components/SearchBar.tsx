import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';

type Props = {
    withHorizontalPadding: boolean;
    setSearchQuery?: (query: string) => void; // Biến thành optional
};

const SearchBar = ({ withHorizontalPadding, setSearchQuery }: Props) => {
  return (
    <View style={[styles.container, withHorizontalPadding && { paddingHorizontal: 20 }]}>
      <View style={styles.searchBar}>
        <Ionicons name='search-outline' size={20} color={Colors.lightGrey} />
        <TextInput
          placeholder='Search'
          placeholderTextColor={Colors.lightGrey}
          style={styles.searchTxt}
          autoCapitalize='none'
          onChangeText={query => setSearchQuery?.(query)} // Gọi hàm nếu setSearchQuery tồn tại
        />
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
    gap: 10,
  },
  searchTxt: {
    fontSize: 14,
    flex: 1,
    color: Colors.darkGrey,
  },
});
