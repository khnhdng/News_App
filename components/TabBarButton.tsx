import { Pressable, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { icon } from '@/constants/Icons';  // Đảm bảo 'icon' đã được khai báo đúng
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';

type RouteName = keyof typeof icon;

interface TabBarButtonProps {
  onPress: () => void;
  onLongPress: () => void;
  isFocused: boolean;
  routeName: RouteName;
  label: string;
}

const TabBarButton: React.FC<TabBarButtonProps> = ({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  label,
}) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withSpring(isFocused ? 1 : 0, { duration: 50 });
  }, [isFocused]);

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacityValue = interpolate(opacity.value, [0, 1], [1, 0]);
    return { opacity: opacityValue };
  });

  // Kiểm tra và đảm bảo rằng 'routeName' là một key hợp lệ trong 'icon'
  const IconComponent = icon[routeName];
  if (!IconComponent) {
    console.error(`Icon for ${routeName} is not defined`);
    return null; // Hoặc hiển thị một icon mặc định
  }

  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} style={styles.tabbarBtn}>
      {/* Render icon với routeName */}
      {IconComponent({
        color: isFocused ? Colors.tabIconSelected : Colors.tabIconDefault,
        focused: isFocused,
      })}
      {/* Animated text */}
      <Animated.Text
        style={[
          {
            color: isFocused ? Colors.tabIconSelected : Colors.tabIconDefault,
            fontSize: 12,
          },
          animatedTextStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  tabbarBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
});
