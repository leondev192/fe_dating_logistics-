import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';

const LoginScreen = () => {
  return (
    <ImageBackground
      source={require('../../assets/images/Login.png')}
      style={styles.image}
      resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.WelcomeText}>
          Vui lòng nhập thông tin đăng nhập để tiếp tục
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    color: 'while',
    fontSize: 16,
  },
  WelcomeText: {
    fontSize: 16,
    color: 'rgba(54, 53, 56, 1)',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
