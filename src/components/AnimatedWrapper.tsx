// src/components/AnimatedWrapper.tsx
import React, {useEffect, useRef} from 'react';
import {Animated, ViewProps} from 'react-native';

interface AnimatedWrapperProps extends ViewProps {
  children: React.ReactNode;
}

const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
  children,
  style,
  ...props
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Listener for the animated value
    const listenerId = animatedValue.addListener(({value}) => {
      // Perform actions or update state based on animated value
    });

    // Start an animation as an example (you can adjust as needed)
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Clean up the listener on component unmount
    return () => {
      animatedValue.removeListener(listenerId);
    };
  }, [animatedValue]);

  return (
    <Animated.View
      style={[
        {
          opacity: animatedValue,
          transform: [{scale: animatedValue}],
        },
        style,
      ]}
      {...props}>
      {children}
    </Animated.View>
  );
};

export default AnimatedWrapper;
