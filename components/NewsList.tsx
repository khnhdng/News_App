import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { NewsDataType } from '@/types';
import { Colors } from '@/constants/Colors';
import Loading from './Loading';
import { Link } from 'expo-router';

type Props = {
  newsList: Array<NewsDataType>;
  fontSize: number; // Khai báo fontSize trong Props
};

const NewsList = ({ newsList, fontSize }: Props) => {
  return (
    <View style={styles.container}>
      {newsList.length === 0 ? (
        <Loading size={'large'} />
      ) : (
        newsList.map((item, index) => (
          <Link href={`/news/${item.article_id}`} asChild key={index}>
            <TouchableOpacity>
              <NewsItem item={item} fontSize={fontSize} />
            </TouchableOpacity>
          </Link>
        ))
      )}
    </View>
  );
};

export default NewsList;

type NewsItemProps = {
  item: NewsDataType;
  fontSize: number; // Nhận fontSize từ Props
};

export const NewsItem = ({ item, fontSize }: NewsItemProps) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image_url }} style={styles.itemImg} />
      <View style={styles.itemInfo}>
        <Text
          style={[
            styles.itemCategory,
            { fontSize: fontSize === 1 ? 10 : fontSize === 2 ? 12 : 14 }, // Cỡ chữ động
          ]}
        >
          {item.category}
        </Text>
        <Text
          style={[
            styles.itemTitle,
            { fontSize: fontSize === 1 ? 12 : fontSize === 2 ? 14 : 16 }, // Cỡ chữ động
          ]}
        >
          {item.title}
        </Text>
        <View style={styles.itemSourceInfo}>
          <Image source={{ uri: item.source_icon }} style={styles.itemSourceImg} />
          <Text
            style={[
              styles.itemSourceName,
              { fontSize: fontSize === 1 ? 8 : fontSize === 2 ? 10 : 12 }, // Cỡ chữ động
            ]}
          >
            {item.source_name}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 50,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    flex: 1,
    gap: 10,
  },
  itemImg: {
    width: 90,
    height: 100,
    borderRadius: 20,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
    gap: 10,
    justifyContent: 'space-between',
  },
  itemCategory: {
    color: Colors.darkGrey,
    textTransform: 'capitalize',
  },
  itemTitle: {
    fontWeight: '600',
    color: Colors.black,
  },
  itemSourceInfo: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  itemSourceImg: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  itemSourceName: {
    fontWeight: '400',
    color: Colors.darkGrey,
  },
});
