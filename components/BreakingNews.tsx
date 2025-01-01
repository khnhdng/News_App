import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Colors } from "@/constants/Colors";
import { NewsDataType } from "@/types";
import SliderItem from "@/components/SliderItem";
import Animated, {
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import Pagination from "@/components/Pagination";
import { useFontSize } from "@/hooks/FontSizeContext"; // Import useFontSize để lấy cỡ chữ từ context

type Props = {
  newsList: Array<NewsDataType>;
  fontSize: number; // Thêm fontSize vào Props
};

const BreakingNews = ({ newsList, fontSize }: Props) => {
  const [data, setData] = useState(newsList);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const ref = useAnimatedRef<Animated.FlatList<any>>();
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const interval = useRef<NodeJS.Timeout>();
  const offset = useSharedValue(0);
  const { width } = useWindowDimensions();

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
    onMomentumEnd: (e) => {
      offset.value = e.contentOffset.x;
    },
  });

  useEffect(() => {
    if (isAutoPlay === true) {
      interval.current = setInterval(() => {
        offset.value = offset.value + width;
      }, 5000);
    } else {
      clearInterval(interval.current);
    }
    return () => {
      clearInterval(interval.current);
    };
  }, [isAutoPlay, offset, width]);

  useDerivedValue(() => {
    scrollTo(ref, offset.value, 0, true);
  });

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          { fontSize: fontSize === 1 ? 16 : fontSize === 2 ? 18 : 20 },
        ]}
      >
        Breaking News
      </Text>
      <View style={styles.slideWrapper}>
        <Animated.FlatList
          ref={ref}
          data={data}
          keyExtractor={(_, index) => `list_item${index}`}
          renderItem={({ item, index }) => (
            <SliderItem
              slideItem={item}
              index={index}
              scrollX={scrollX}
              fontSize={fontSize} // Truyền cỡ chữ vào SliderItem
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={onScrollHandler}
          scrollEventThrottle={16}
          onEndReachedThreshold={0.5}
          onEndReached={() => setData([...data, ...newsList])}
        />
        <Pagination
          items={newsList}
          scrollX={scrollX}
          paginationIndex={paginationIndex}
        />
      </View>
    </View>
  );
};

export default BreakingNews;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 10,
    marginLeft: 20,
  },
  slideWrapper: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
  },
});
