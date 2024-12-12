import { Dimensions, Image, StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { NewsDataType } from '@/types'
import { SharedValue } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'

type Props = {
    slideItem: NewsDataType,
    index: number,
    scrollX: SharedValue<number>
}

const {width} = Dimensions.get('screen');

const SliderItem = ({slideItem, index, scrollX}: Props) => {
  return (
    <View style={styles.itemWrapper} key={slideItem.article_id}>
      <Image source={{uri: slideItem.image_url}} style={styles.image}/>
      <LinearGradient colors={["transparent, 'rgba(0, 0, 0, 0.8)']} style={styles.background}>
        <Text>{slideItem.title}</Text>
      </LinearGradient>
      
    </View>
  )
}

export default SliderItem

const styles = StyleSheet.create({
    itemWrapper:{
        position: 'relative',
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: width,
        height: 180,
        borderRadius: 20
    },
    background: {
      position: 'absolute',
      // left: 30,
      right: 0,
      top: 0,
      width:width,
      height: height
    }
})