import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import BreakingNews from '@/components/BreakingNews'
import axios from 'axios'
import { NewsDataType } from '@/types'

type Props = {}

const Page = (props: Props) => { 
  const {top: safeTop} = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState <NewsDataType[]> ([]);

  useEffect(() => {
    getBreakingNews()
  }, []);
  const getBreakingNews = async() => {
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&q=news&country=vi&language=vi&image=1&removeduplicate=1&size=5`
      const response = await axios .get(URL);

      console.log(response.data);
      if (response && response.data) {
        setBreakingNews(response.data.results);
      }
    } catch(err: any) {
      console.log('Error Message: ', err.message);
    }
  }

  return (
    <View style={[styles.container, {paddingTop: safeTop}]}>
      <Header />
      <SearchBar/>
      <BreakingNews newsList={breakingNews}/>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
})

//43:10