import React, {useState} from 'react';
import InputAuth from '../../components/input/InputAuth';
import {NavigationProp, useNavigation} from '@react-navigation/native';

type RootStackParamList = {
  Login: undefined;
  Auth: undefined;
};

import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import GradientButton from '../../components/button/GradientButton';
import Colors from '../../constants/colors';
import LoadingSpinner from '../../components/loading/LoadingSpinner';

const RegisterScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleRegister = async () => {
    let hasError = false;

    // Kiểm tra email
    if (!identifier) {
      setEmailError('Vui lòng nhập email');
      hasError = true;
    } else if (!identifier.includes('@')) {
      setEmailError('Nhập đúng định dạng email');
      hasError = true;
    } else {
      setEmailError('');
    }

    // Kiểm tra mật khẩu
    if (!password) {
      setPasswordError('Vui lòng nhập mật khẩu');
      hasError = true;
    } else {
      setPasswordError('');
    }

    // Kiểm tra mật khẩu xác nhận
    if (password !== confirmPassword) {
      setConfirmPasswordError('Mật khẩu không trùng khớp');
      hasError = true;
    } else {
      setConfirmPasswordError('');
    }

    if (hasError) return;
    navigation.navigate('Auth');

    setLoading(true);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/Background.png')}
      style={styles.imageBackground}
      resizeMode="cover">
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <View style={styles.container}>
          <Text style={styles.WelcomeText}>
            Vui lòng nhập thông tin đăng nhập để tiếp tục
          </Text>
          <InputAuth
            label=""
            value={identifier}
            onChangeText={text => {
              setIdentifier(text);
              setEmailError('');
            }}
            placeholder="Email / Số điện thoại"
            iconName="user"
            hasError={!!emailError}
            errorMessage={emailError}
          />
          <InputAuth
            label=""
            value={password}
            onChangeText={text => {
              setPassword(text);
              setPasswordError('');
            }}
            placeholder="Mật khẩu"
            secureTextEntry={true}
            isPassword={true}
            iconName="lock"
            hasError={!!passwordError}
            errorMessage={passwordError}
          />
          <InputAuth
            label=""
            value={confirmPassword}
            onChangeText={text => {
              setConfirmPassword(text);
              setConfirmPasswordError('');
            }}
            placeholder="Xác nhận mật khẩu"
            secureTextEntry={true}
            isPassword={true}
            iconName="lock"
            hasError={!!confirmPasswordError}
            errorMessage={confirmPasswordError}
          />

          <GradientButton title="Đăng ký" onPress={handleRegister} />
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Hoặc đăng nhập với</Text>
            <View style={styles.dividerLine} />
          </View>
          <View style={styles.socialLoginContainer}>
            <TouchableOpacity style={styles.socialButton} onPress={() => {}}>
              <Image
                source={require('../../assets/images/facebook.png')}
                style={styles.socialButtonIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} onPress={() => {}}>
              <Image
                source={require('../../assets/images/apple.png')}
                style={styles.socialButtonIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} onPress={() => {}}>
              <Image
                source={require('../../assets/images/google.png')}
                style={styles.socialButtonIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <LoadingSpinner loading={loading} />
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>Đã có tài khoản?</Text>
          <TouchableOpacity
            style={styles.termsButton}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.termsButtonText}>Đăng nhập ngay</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    marginTop: Platform.OS === 'ios' ? '10%' : '25%',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  WelcomeText: {
    fontSize: 16,
    color: Colors.textbody,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: '20%',
  },
  dividerText: {
    color: '#6A707C',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  dividerLine: {
    height: 1,
    width: '50%',
    backgroundColor: '#E8ECF4',
  },
  termsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 'auto',
  },
  termsText: {
    color: '#1E232C',
    fontSize: 15,
    textAlign: 'center',
  },
  termsButton: {
    marginLeft: 10,
  },
  termsButtonText: {
    color: Colors.primary,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 30,
  },
  socialButton: {
    flexDirection: 'row',
    width: '30%',
    marginHorizontal: 10,
    height: 56,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: Colors.bordercolor,
    borderWidth: 1,
  },
  socialButtonIcon: {
    resizeMode: 'contain',
    width: 26,
    height: 26,
  },
});

export default RegisterScreen;
