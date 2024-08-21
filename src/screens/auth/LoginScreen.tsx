import React, {useState} from 'react';
import InputAuth from '../../components/input/InputAuth';
import {NavigationProp, useNavigation} from '@react-navigation/native';
type RootStackParamList = {
  Forgotpassword: undefined;
  Register: undefined;
};
import {
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  return (
    <ImageBackground
      source={require('../../assets/images/Login.png')}
      style={styles.image}
      resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.WelcomeText}>
          Vui lòng nhập thông tin đăng nhập để tiếp tục
        </Text>
        <InputAuth
          label=""
          value={identifier}
          onChangeText={text => {
            setIdentifier(text);
          }}
          placeholder="Email / Số điện thoại"
          iconName="user"
        />
        <InputAuth
          label=""
          value={password}
          onChangeText={text => {
            setPassword(text);
          }}
          placeholder="Mật khẩu"
          secureTextEntry={true}
          isPassword={true}
          iconName="lock"
        />
        <TouchableOpacity
          style={styles.forgotPasswordContainer}
          onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  forgotPasswordContainer: {
    width: '80%',
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  forgotPasswordText: {
    color: 'rgba(46, 99, 231, 1)',
    fontSize: 14,
    textAlign: 'right',
  },
});

export default LoginScreen;
