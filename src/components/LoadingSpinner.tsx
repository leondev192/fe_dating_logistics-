// components/LoadingOverlay.js
import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

interface LoadingOverlayProps {
  loading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({loading}) => {
  if (!loading) return null;

  return (
    <View style={styles.loadingOverlay}>
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingOverlay;
