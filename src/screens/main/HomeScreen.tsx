import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Swiper from 'react-native-swiper'; // Import thư viện Swiper

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        autoplay={true} // Tự động chuyển ảnh
        autoplayTimeout={3} // Thời gian chuyển ảnh (3 giây)
        showsPagination={false}>
        <Image
          source={require('../../assets/images/1.png')}
          style={styles.image}
        />
        <Image
          source={require('../../assets/images/2.png')}
          style={styles.image}
        />
        <Image
          source={require('../../assets/images/3.png')}
          style={styles.image}
        />
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    height: 20,
  },
  image: {
    width: '100%',
    height: '25%',
  },
});

export default HomeScreen;
