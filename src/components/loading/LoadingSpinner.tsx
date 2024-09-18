import React from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

interface LoadingOverlayProps {
  loading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({loading}) => {
  if (!loading) return null;

  return (
    <View style={styles.loadingOverlay}>
      <LottieView
        source={require('../../assets/animations/loadd.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-30%',
  },
  lottie: {
    width: 70,
    height: 70,
  },
});

export default LoadingOverlay;
