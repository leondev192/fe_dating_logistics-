// App.js
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import ImageUploader from '../../components/image/ImageUploader'; // Import component

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageUploader />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
