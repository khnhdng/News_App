import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import CheckBox from '@/components/CheckBox';
import { useNewsCategories } from '@/hooks/useNewsCategories';
import { useNewsCountries } from '@/hooks/useNewsCountry';
import { Link } from 'expo-router';
import { useTheme } from '@/hooks/ThemeContext'; // Import useTheme từ ThemeContext
import { useFontSize } from '@/hooks/FontSizeContext'; // Import useFontSize để lấy cỡ chữ từ FontSizeContext

type Props = {};

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();
  const { colors } = useTheme(); // Lấy màu sắc từ theme
  const { fontSize } = useFontSize(); // Lấy cỡ chữ từ FontSizeContext
  const { newsCategories, toggleNewsCategory } = useNewsCategories();
  const { newsCountries, toggleNewsCountry } = useNewsCountries();
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('');

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: safeTop + 20 }]}>
      <SearchBar withHorizontalPadding={false} setSearchQuery={setSearchQuery} />
      <Text
        style={[
          styles.title,
          { color: colors.text, fontSize: fontSize === 1 ? 16 : fontSize === 2 ? 18 : 20 },
        ]}
      >
        Categories
      </Text>
      <View style={styles.listContainer}>
        {newsCategories.map((item) => (
          <CheckBox
            key={item.id}
            label={item.title}
            checked={item.selected}
            onPress={() => {
              toggleNewsCategory(item.id);
              setCategory(item.slug);
            }}
          />
        ))}
      </View>

      <Text
        style={[
          styles.title,
          { color: colors.text, fontSize: fontSize === 1 ? 16 : fontSize === 2 ? 18 : 20 },
        ]}
      >
        Country
      </Text>
      <View style={styles.listContainer}>
        {newsCountries.map((item, index) => (
          <CheckBox
            key={index}
            label={item.name}
            checked={item.selected}
            onPress={() => {
              toggleNewsCountry(index);
              setCountry(item.code);
            }}
          />
        ))}
      </View>

      <Link
        href={{
          pathname: '/news/search',
          params: { query: searchQuery, category, country },
        }}
        asChild
      >
        <TouchableOpacity style={styles.searchBtn}>
          <Text
            style={[
              styles.searchBtnTxt,
              { fontSize: fontSize === 1 ? 14 : fontSize === 2 ? 16 : 18 },
            ]}
          >
            Search
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontWeight: '600',
    marginBottom: 10,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 12,
    marginBottom: 20,
  },
  searchBtn: {
    backgroundColor: '#FF4C4C', // Giữ màu đỏ cho thanh tìm kiếm
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    marginVertical: 10,
  },
  searchBtnTxt: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
