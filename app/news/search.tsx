import { FlatList, StyleSheet, Text, Touchable, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router, Stack, useGlobalSearchParams } from 'expo-router'
import { NewsDataType } from '@/types'
import axios from 'axios'

import { Ionicons } from '@expo/vector-icons'
import Loading from '@/components/Loading'
import { NewsItem } from '@/components/NewsList'




type Props = {}

const Page= (props: Props) => {
    const {query, category, country } = useGlobalSearchParams <{
            query: string;
            category: string;
            country: string;
    }>();

    const [news, setNews] = useState <NewsDataType[]> ([]);
    const [isLoading, setISLoading] = useState(true);

    useEffect(() => {
        getNews();
    }, []);

    const getNews = async() => {
        try {
          let categoryString = '';
          let countryString = '';
          let queryString = '';
          if(category){
            categoryString = `&category=${category}`
          }
          if(country){
            countryString = `&country=${country}`
          }
          if(query){
           queryString = `&q=${query}`
          }
    
          const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&image=1&removeduplicate=1&size=10${categoryString}${countryString}${queryString}`
          const response = await axios .get(URL);
    
          if (response && response.data) {
            setNews(response.data.results);
            setISLoading(false);
          }
        } catch(err: any) {
          console.log('Error Message: ', err.message);
        }
      }

  return (
    <>
    <Stack.Screen options ={{
        headerLeft: () => (
            <TouchableOpacity onPress={()=> router.back()}>
                <Ionicons name="arrow-back" size={22} />
            </TouchableOpacity>
        ),
        title: "Search"
    }}/>
        <View style={styles.container}>
            {isLoading ? (
                <Loading size = {'large'}/>
            ):(
                <FlatList data={news} keyExtractor={(_, index) => `list_item${index}`} showsHorizontalScrollIndicator={false} 
                renderItem={({index, item})=>{
                    return <Link href={`/news/${item.article_id}`} asChild key={index}>
                              <TouchableOpacity>
                                <NewsItem item={item} fontSize={0} />
                            </TouchableOpacity>
                    </Link>
                }} 
            />
            )}
        </View>
    </>
  )
}

export default Page;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 20,
    }
})