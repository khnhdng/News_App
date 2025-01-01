import { StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import BreakingNews from '@/components/BreakingNews';
import axios from 'axios';
import { NewsDataType } from '@/types';
import NewsList from '@/components/NewsList';
import Categories from '@/components/Categories';
import Loading from '@/components/Loading';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme } from '@/hooks/ThemeContext';
import { useFontSize } from '@/hooks/FontSizeContext';

type Props = {};

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); // Thêm state cho giá trị tìm kiếm
  const { colors } = useTheme();
  const { fontSize } = useFontSize();

  useEffect(() => {
    getBreakingNews();
    getNews();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      // Thực hiện tìm kiếm khi người dùng nhập hoặc nói
      getNews(`&q=${searchQuery}`);
    }
  }, [searchQuery]);

  const getBreakingNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&country=in&language=en&image=1&removeduplicate=1&size=5`;
      const response = await axios.get(URL);

      if (response && response.data) {
        setBreakingNews(response.data.results);
        setIsLoading(false);
      }
    } catch (err: any) {
      console.log('Error Message: ', err.message);
    }
  };

  const getNews = async (category: string = '') => {
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&image=1&removeduplicate=1&size=10${category}`;
      const response = await axios.get(URL);

      if (response && response.data) {
        setNews(response.data.results);
        setIsLoading(false);
      }
    } catch (err: any) {
      console.log('Error Message: ', err.message);
    }
  };

  const onCatChanged = (category: string) => {
    console.log('Category: ', category);
    setNews([]);
    getNews(category);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView
        style={[
          styles.container,
          { paddingTop: safeTop, backgroundColor: colors.background },
        ]}
      >
        <Header />
        <SearchBar
          withHorizontalPadding={true}
          setSearchQuery={setSearchQuery} // Truyền hàm để nhận giá trị tìm kiếm từ SearchBar
        />
        {isLoading ? (
          <Loading size={'large'} />
        ) : (
          <>
            <BreakingNews newsList={breakingNews} fontSize={fontSize} />
            <Categories onCategoryChanged={onCatChanged} fontSize={fontSize} />
            <NewsList newsList={news} fontSize={fontSize} />
          </>
        )}
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
