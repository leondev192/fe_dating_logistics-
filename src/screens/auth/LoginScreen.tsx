import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import InputAuth from '../../components/input/InputAuth';
import GradientButton from '../../components/button/auth/GradientButton';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import Colors from '../../constants/colors';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {loginVendor} from '../../apis/services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import {toastConfig} from '../../components/toast/ToastAuth';
import BlurredToast from '../../components/toast/BlurredToast';
import {useAuth} from '../../contexts/AuthContext';
import RootStackParamList from '../../navigations/RootStackParamList';
import {
  signInWithGoogle,
  googleLogin,
} from '../../apis/services/googleAuthService';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({email: '', password: ''});
  const {login} = useAuth();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      // Lấy idToken từ Google Sign-In
      const idToken = await signInWithGoogle();
      const response = await googleLogin(idToken);

      await login(response.data.token);
    } catch (error) {}
  };

  const handleLogin = async () => {
    const errors = {email: '', password: ''};

    if (!email) {
      errors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Nhập đúng định dạng email';
    }

    if (!password) {
      errors.password = 'Vui lòng nhập mật khẩu';
    }

    setError(errors);

    if (errors.email || errors.password) return;

    setLoading(true);
    try {
      const response = await loginVendor({email, password});

      if (response.status === 'success') {
        await AsyncStorage.setItem('userToken', response.data.token);

        await login(response.data.token);

        Toast.show({
          type: 'success',
          text1: 'Đăng nhập thành công',
          onHide: () => {},
          position: 'top',
          topOffset: 300,
        });
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        const backendError = error.response.data;
        if (backendError.message === 'Email không tồn tại') {
          setError({...errors, email: backendError.message});
        } else if (
          backendError.message === 'Mật khẩu không đúng, vui lòng kiểm tra lại'
        ) {
          setError({...errors, password: backendError.message});
        } else {
          Toast.show({
            type: 'error',
            text1: 'Đăng nhập không thành công',
            text2: backendError.message || 'Có lỗi xảy ra, vui lòng thử lại.',
            position: 'top',
            topOffset: 300,
          });
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Đăng nhập không thành công',
          text2: 'Có lỗi xảy ra, vui lòng thử lại.',
          position: 'top',
          topOffset: 300,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/White.png')}
      style={styles.imageBackground}
      resizeMode="cover">
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <View style={styles.container}>
          <Text style={styles.welcomeText}>
            Vui lòng nhập thông tin đăng nhập để tiếp tục
          </Text>
          <InputAuth
            label=""
            value={email}
            onChangeText={text => {
              setEmail(text);
              setError({...error, email: ''});
            }}
            placeholder="Email"
            iconName="user"
            hasError={!!error.email}
            errorMessage={error.email}
          />
          <InputAuth
            label=""
            value={password}
            onChangeText={text => {
              setPassword(text);
              setError({...error, password: ''});
            }}
            placeholder="Mật khẩu"
            secureTextEntry
            iconName="lock"
            isPassword={true}
            hasError={!!error.password}
            errorMessage={error.password}
          />
          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
          </TouchableOpacity>
          <GradientButton title="Đăng nhập" onPress={handleLogin} />
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Hoặc</Text>
            <View style={styles.dividerLine} />
          </View>
          <View style={styles.socialLoginContainer}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleGoogleSignIn}>
              <Text style={styles.loginWithGoogle}> Đăng nhập với Google</Text>
              <Image
                source={require('../../assets/images/google.png')}
                style={styles.socialButtonIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>Không có tài khoản?</Text>
          <TouchableOpacity
            style={styles.termsButton}
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.termsButtonText}>Đăng ký ngay bây giờ</Text>
          </TouchableOpacity>
        </View>
        <LoadingSpinner loading={loading} />
      </SafeAreaView>

      <BlurredToast config={toastConfig} />
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
  welcomeText: {
    fontSize: 16,
    color: Colors.textbody,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginVertical: 10,
  },
  forgotPasswordText: {
    color: Colors.primary,
    fontSize: 14,
    textAlign: 'right',
  },
  dividerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  dividerText: {
    color: '#6A707C',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  dividerLine: {
    height: 1,
    width: '40%',
    backgroundColor: '#E8ECF4',
  },
  termsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 'auto',
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
    justifyContent: 'center',
    width: '100%',
    marginTop: 30,
  },
  loginWithGoogle: {
    marginRight: 20,
    color: '#6A707C',
    fontSize: 15,
  },
  socialButton: {
    flexDirection: 'row',
    width: '100%',
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

export default LoginScreen;
