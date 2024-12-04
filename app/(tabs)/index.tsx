import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import  Header  from 'react-native/Libraries/NewAppScreen'
import  SearchBar  from 'react-native-screens'
type Props = {}

const Page = (props: Props) => {
  const{top: safeTop}=useSafeAreaInsets();
  const getBreakingNews = () => {
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&q=news&country=vi&language=vi`
    }
  }
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})