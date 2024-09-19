// RegisterScreen.tsx
import React, {useState} from 'react';
import InputAuth from '../../components/input/InputAuth';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import GradientButton from '../../components/button/auth/GradientButton';
import Colors from '../../constants/colors';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import {register} from '../../apis/services/authService';
import Toast from 'react-native-toast-message'; // Import Toast
import {toastConfig} from '../../components/toast/ToastAuth'; // Import cấu hình Toast
import BlurredToast from '../../components/toast/BlurredToast'; // Import BlurredToast
import {
  signInWithGoogle,
  googleLogin,
} from '../../apis/services/googleAuthService'; // Import cả googleLogin để xử lý đăng nhập với Google
import {useAuth} from '../../contexts/AuthContext';

type RootStackParamList = {
  VerifyOtp: {
    email: string;
  };
  Login: undefined;
  Auth: undefined;
};

const RegisterScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [roleError, setRoleError] = useState(''); // Trạng thái lỗi cho role
  const {login} = useAuth();

  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleRegister = async () => {
    let hasError = false;

    // Kiểm tra email
    if (!email) {
      setEmailError('Vui lòng nhập email');
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError('Vui lòng nhập đúng định dạng email');
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

    // Nếu có lỗi, hiển thị lỗi bằng Toast
    if (hasError) {
      Alert.alert('Thất bại', 'Vui lòng kiểm tra lại thông tin.', [
        {text: 'OK'},
      ]);
      return;
    }

    // Gọi API đăng ký nếu không có lỗi
    setLoading(true);
    try {
      await register({email, password, role});

      Alert.alert(
        'Đăng ký thành công',
        'Vui lòng kiểm tra email để xác nhận tài khoản.',
        [{text: 'OK'}],
      );
      navigation.navigate('VerifyOtp', {email});
    } catch (error: any) {
      Alert.alert('Đăng ký thất bại', 'Email đã tồn tại', [{text: 'OK'}]);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      // Lấy idToken từ Google Sign-In
      const idToken = await signInWithGoogle();
      const response = await googleLogin(idToken);
      await login(response.data.token);
    } catch (error) {
      navigation.goBack();
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
          <Text style={styles.WelcomeText}>
            Vui lòng nhập thông tin đăng ký để tiếp tục
          </Text>
          <InputAuth
            label=""
            value={email}
            onChangeText={text => {
              setEmail(text);
              setEmailError('');
            }}
            placeholder="Email"
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
          <Text style={styles.termsText}>Đã có tài khoản?</Text>
          <TouchableOpacity
            style={styles.termsButton}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.termsButtonText}>Đăng nhập ngay</Text>
          </TouchableOpacity>
        </View>

        <LoadingSpinner loading={loading} />
      </SafeAreaView>

      {/* Sử dụng BlurredToast với cấu hình toastConfig */}
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
  WelcomeText: {
    fontSize: 16,
    color: Colors.textbody,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorText: {
    color: Colors.error,
    fontSize: 14,
    marginTop: 5,
    textAlign: 'left',
    width: '100%',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: '10%',
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
    justifyContent: 'center',
    width: '100%',
    marginTop: 30,
  },
  socialButton: {
    flexDirection: 'row',
    width: '100%',
    height: 48,
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
  loginWithGoogle: {
    marginRight: 20,
    color: '#6A707C',
    fontSize: 15,
  },
});

export default RegisterScreen;
