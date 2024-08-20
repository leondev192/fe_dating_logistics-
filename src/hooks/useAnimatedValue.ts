import {useEffect, useRef} from 'react';
import {Animated} from 'react-native';

export const useAnimatedValue = (initialValue: number) => {
  const animatedValue = useRef(new Animated.Value(initialValue)).current;

  useEffect(() => {
    const listener = animatedValue.addListener(({value}) => {
      console.log(value); // Bạn có thể thay đổi logic tại đây
    });

    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    return () => {
      animatedValue.stopAnimation(); // Dừng tất cả các animation
      animatedValue.removeAllListeners(); // Xóa tất cả các listener
    };
  }, [animatedValue]);

  return animatedValue;
};
