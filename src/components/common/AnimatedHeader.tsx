// components/common/AnimatedHeader.tsx
import React, {useRef} from 'react';
import {
  Animated,
  View,
  StyleSheet,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

interface AnimatedHeaderProps {
  children: React.ReactNode;
  scrollComponent: React.ReactNode; // Component có scroll
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  children,
  scrollComponent,
}) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0); // Lưu vị trí cuộn trước đó để xác định chiều cuộn
  const headerVisible = useRef(true); // Trạng thái hiển thị của header

  // Điều chỉnh hiệu ứng của header
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -150],
    extrapolate: 'clamp',
  });

  const opacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // Hàm xử lý sự kiện cuộn
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentY = event.nativeEvent.contentOffset.y;
    const isScrollingUp = currentY < lastScrollY.current;

    // Kiểm tra nếu đang cuộn lên và header đang ẩn, thì hiện header
    if (isScrollingUp && !headerVisible.current) {
      Animated.timing(scrollY, {
        toValue: 0, // Hiện header lại khi cuộn lên
        duration: 200,
        useNativeDriver: true,
      }).start();
      headerVisible.current = true;
    } else if (!isScrollingUp && currentY > 50 && headerVisible.current) {
      // Kiểm tra nếu đang cuộn xuống và cuộn đủ xa thì ẩn header
      Animated.timing(scrollY, {
        toValue: 150, // Ẩn header khi cuộn xuống
        duration: 200,
        useNativeDriver: true,
      }).start();
      headerVisible.current = false;
    }

    lastScrollY.current = currentY; // Cập nhật vị trí cuộn hiện tại
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          {
            transform: [{translateY: headerTranslateY}],
            opacity: opacity,
          },
        ]}>
        {children}
      </Animated.View>
      <ScrollView
        contentContainerStyle={{paddingTop: 80}} // Khoảng trống để không che scroll bởi header
        scrollEventThrottle={16}
        onScroll={handleScroll}>
        {scrollComponent}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    height: 80,
    justifyContent: 'center',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
  },
});

export default AnimatedHeader;
