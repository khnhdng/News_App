import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Link, Stack } from 'expo-router';
import Loading from '@/components/Loading';
import { NewsItem } from '@/components/NewsList';
import { useIsFocused } from '@react-navigation/native';
import { NewsDataType } from '@/types';
import { useTheme } from '@/hooks/ThemeContext'; // Import useTheme để lấy theme

type Props = {};

const Page = (props: Props) => {
  const [bookmarkNews, setBookmarkNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();
  const { colors } = useTheme(); // Use the colors from context

  useEffect(() => {
    if (isFocused) fetchBookmark();
  }, [isFocused]);

  const fetchBookmark = async () => {
    setIsLoading(true); // Bắt đầu loading
    try {
      const token = await AsyncStorage.getItem('bookmark');
      if (token) {
        const res = JSON.parse(token);

        if (Array.isArray(res) && res.length > 0) {
          // Tạo query string từ bookmark
          const query_string = res.join(',');
          const apiKey = process.env.EXPO_PUBLIC_API_KEY;

          if (!apiKey) {
            console.warn('API Key không tồn tại! Kiểm tra EXPO_PUBLIC_API_KEY trong .env.');
            setIsLoading(false);
            return;
          }

          // Gọi API lấy dữ liệu
          const response = await axios.get(
            `https://newsdata.io/api/1/news?apikey=${apiKey}&id=${query_string}`
          );

          // Set dữ liệu bookmark vào state
          setBookmarkNews(response.data.results || []);
        } else {
          setBookmarkNews([]); // Không có bookmark
        }
      } else {
        setBookmarkNews([]);
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Fetch bookmark failed:',
          error.response?.data || error.message || 'Unknown Axios error'
        );
      } else {
        console.error('Fetch bookmark failed:', error.message || 'Unknown error');
      }
    } finally {
      setIsLoading(false); // Dừng loading
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Saved News',
        }}
      />

      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {isLoading ? (
          <Loading size={'large'} />
        ) : bookmarkNews.length > 0 ? (
          <FlatList
            data={bookmarkNews}
            keyExtractor={(_, index) => `list_item${index}`}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContentContainer}
            renderItem={({ index, item }) => (
              <Link href={`/news/${item.article_id}`} asChild key={index}>
                <TouchableOpacity style={styles.newsItemWrapper}>
                  <NewsItem item={item} />
                </TouchableOpacity>
              </Link>
            )}
          />
        ) : (
          <Text style={styles.emptyText}>No saved news found.</Text>
        )}
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
    backgroundColor: 'transparent',
  },
  flatListContentContainer: {
    padding: 10,
    margin: 10,
    flexGrow: 1,
  },
  newsItemWrapper: {
    marginBottom: 10,
    padding: 0,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});
