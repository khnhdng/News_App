import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import BreakingNews from '@/components/BreakingNews'
import axios from 'axios'
import { NewsDataType } from '@/types'
import NewsList from '@/components/NewsList'
import { ScrollView } from 'react-native-gesture-handler'
import Categories from '@/components/Categories'
import Loading from '@/components/Loading'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type Props = {}

const Page = (props: Props) => { 
  const {top: safeTop} = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState <NewsDataType[]> ([]);
  const [news, setNews] = useState <NewsDataType[]> ([]);
  const [isLoading, setISLoading] = useState(true);

  useEffect(() => {
    getBreakingNews();
    getNews();
  }, []);
  const getBreakingNews = async() => {
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&q=news&country=vi&language=vi&image=1&removeduplicate=1&size=5`
      const response = await axios .get(URL);

      // console.log(response.data);
      if (response && response.data) {
        setBreakingNews(response.data.results);
        setISLoading(false);
      }
    } catch(err: any) {
      console.log('Error Message: ', err.message);
    }
  }
  const getNews = async(category:string = '') => {
    try {
      let categoryString = '';
      if( category.length !== 0 ){
        categoryString = `&category=${category}`
      }

      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&q=news&language=vi&image=1&removeduplicate=1&size=10${categoryString}`
      const response = await axios .get(URL);

      // console.log(response.data);
      if (response && response.data) {
        setBreakingNews(response.data.results);
        setISLoading(false);
      }
    } catch(err: any) {
      console.log('Error Message: ', err.message);
    }
  }
  const onCatChanged = (category:string) => {
    console.log('Category: ', category);
    setNews([]);
    getNews(category);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <ScrollView style={[styles.container, {paddingTop: safeTop}]}>
      <Header />
      <SearchBar/>
      {isLoading ? (
        <Loading size={'large'}/>
      ) : (
        <BreakingNews newsList={breakingNews}/>
      )}
      <Categories onCategoryChanged = {onCatChanged} />
      <NewsList newsList={news} />
    </ScrollView >
</GestureHandlerRootView>
  );
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
})

//43:10