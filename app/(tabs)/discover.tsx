import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchBar from '@/components/SearchBar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'

type Props = {
}


const Page = (props: Props) => {
  const {top: safeTop} = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: safeTop + 20}]}>
      <SearchBar withHorizontalPadding = {false}/>
      <Text style={styles.title}>Categories</Text>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  title:{
       fontSize: 18,
        fontWeight: "600",
        color: Colors.black,
        marginBottom: 10,
  }
})

// 1:28:40