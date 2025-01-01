import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import { Colors } from '@/constants/Colors';
import newsCategoryList from '@/constants/Categories';

type Category = {
  id: string;
  title: string;
  slug: string;
};

type Props = {
  onCategoryChanged: (category: string) => void;
  fontSize: number; // Thêm fontSize vào Props
};

const Categories = ({ onCategoryChanged, fontSize }: Props) => {
  const [categories, setCategories] = useState(newsCategoryList);

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Category>) => (
    <View
      style={[
        styles.item,
        isActive && styles.itemActive,
      ]}
      onTouchStart={drag} // Bắt đầu kéo thả
    >
      <Text
        style={[
          styles.itemText,
          { fontSize: fontSize === 1 ? 12 : fontSize === 2 ? 14 : 16 },
        ]}
        onPress={() => onCategoryChanged(item.slug)} // Gửi thông tin danh mục
      >
        {item.title}
      </Text>
    </View>
  );

  return (
    <View>
      <Text
        style={[
          styles.title,
          { fontSize: fontSize === 1 ? 16 : fontSize === 2 ? 18 : 20 },
        ]}
      >
        Trending Right Now
      </Text>
      <DraggableFlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        onDragEnd={({ data }) => setCategories(data)} // Cập nhật danh sách sau khi kéo thả
        contentContainerStyle={styles.itemsWrapper}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  title: {
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 10,
    marginLeft: 20,
  },
  itemsWrapper: {
    flexDirection: 'row',
    gap: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  item: {
    borderWidth: 1,
    borderColor: Colors.darkGrey,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  itemActive: {
    backgroundColor: Colors.tint,
    borderColor: Colors.tint,
  },
  itemText: {
    color: Colors.darkGrey,
    letterSpacing: 0.5,
  },
});
