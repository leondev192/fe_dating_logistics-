import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import InputAuth from '../../components/input/InputAuth';
import GradientButton from '../../components/button/GradientButton';
import LoadingSpinner from '../../components/LoadingSpinner';
import Colors from '../../constants/colors';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Android} from 'iconsax-react-native';
import {toastConfig} from '../../components/toast/ToastAuth';
import Toast, {ToastConfigParams} from 'react-native-toast-message';

type RootStackParamList = {
  ForgotPassword: undefined;
  Register: undefined;
};

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({identifier: '', password: ''});

  const handleLogin = () => {
    const errors = {identifier: '', password: ''};

    if (!identifier) {
      errors.identifier = 'Vui lòng nhập email';
    } else if (!identifier.includes('@')) {
      errors.identifier = 'Nhập đúng định dạng email';
    }

    if (!password) {
      errors.password = 'Vui lòng nhập mật khẩu';
    }

    setError(errors);

    if (errors.identifier || errors.password) return;

    setLoading(true);
    // Handle login logic here
    setTimeout(() => {
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Đăng nhập thành công',
        text2: 'Chào mừng bạn trở lại!',
      });
    }, 1500);
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
          <Text style={styles.welcomeText}>
            Vui lòng nhập thông tin đăng nhập để tiếp tục
          </Text>
          <InputAuth
            label=""
            value={identifier}
            onChangeText={text => {
              setIdentifier(text);
              setError({...error, identifier: ''});
            }}
            placeholder="Email / Số điện thoại"
            iconName="user"
            hasError={!!error.identifier}
            errorMessage={error.identifier}
          />
          <InputAuth
            label=""
            value={password}
            onChangeText={text => {
              setPassword(text);
              setError({...error, password: ''});
            }}
            placeholder="Mật khẩu"
            secureTextEntry={true}
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
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>Không có tài khoản?</Text>
            <TouchableOpacity
              style={styles.termsButton}
              onPress={() => navigation.navigate('Register')}>
              <Text style={styles.termsButtonText}>Đăng ký ngay bây giờ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <LoadingSpinner loading={loading} />
      <Toast config={toastConfig} ref={ref => Toast.setRef(ref)} />
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
    width: '80%',
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
  fixedBottomContainer: {
    position: 'absolute',
    bottom: 20, // Điều chỉnh khoảng cách từ dưới lên
    width: '100%',
    alignItems: 'center',
  },
  termsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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

export default LoginScreen;
