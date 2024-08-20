import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import GradientButton from '../../components/button/GradientButton';
import OutlineButton from '../../components/button/OutlineButton';
import {useAnimatedValue} from '../../hooks/useAnimatedValue';

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const animatedValue = useAnimatedValue(0); // Sử dụng hook

  return (
    <ImageBackground
      source={require('../../assets/images/Welcome.png')}
      style={styles.image}
      resizeMode="cover">
      <View style={styles.container}>
        <OutlineButton
          title="Đăng nhập"
          onPress={() => navigation.navigate('Login')}
        />

        <GradientButton
          title="Đăng ký"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

export default WelcomeScreen;
