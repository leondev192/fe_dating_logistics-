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
} from 'react-native';
import GradientButton from '../../components/button/GradientButton';
import Colors from '../../constants/colors';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import {register} from '../../apis/authService';
import RolePicker from '../../components/input/RolePicker'; // Import RolePicker component
import Toast from 'react-native-toast-message'; // Import Toast
import {toastConfig} from '../../components/toast/ToastAuth'; // Import cấu hình Toast
import BlurredToast from '../../components/toast/BlurredToast'; // Import BlurredToast

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
  const [isToastVisible, setIsToastVisible] = useState(false); // Trạng thái hiển thị Toast

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

    // Kiểm tra role
    if (!role) {
      setRoleError('Vui lòng chọn vai trò');
      hasError = true;
    } else {
      setRoleError('');
    }

    // Nếu có lỗi, hiển thị lỗi bằng Toast
    if (hasError) {
      Toast.show({
        type: 'error',
        text1: 'Đăng ký thất bại',
        text2: 'Vui lòng kiểm tra lại thông tin.',
        position: 'top',
        topOffset: 300,
        onHide: () => setIsToastVisible(false), // Ẩn Toast khi bấm nút
      });
      setIsToastVisible(true);
      return;
    }

    // Gọi API đăng ký nếu không có lỗi
    setLoading(true);
    try {
      await register({email, password, role});
      Toast.show({
        type: 'success',
        text1: 'Đăng ký thành công',
        text2: 'Vui lòng kiểm tra email để xác nhận tài khoản.',
        position: 'top',
        topOffset: 300,
        onHide: () => setIsToastVisible(false), // Ẩn Toast khi bấm nút
      });
      navigation.navigate('VerifyOtp', {email});
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Đăng ký thất bại',
        text2:
          error.response?.data?.message || 'Đã xảy ra lỗi, vui lòng thử lại.',
        position: 'top',
        topOffset: 300,
        onHide: () => setIsToastVisible(false), // Ẩn Toast khi bấm nút
      });
      setLoading(false);
      setIsToastVisible(true);
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

          {/* Sử dụng RolePicker component */}
          <RolePicker role={role} setRole={setRole} />
          {roleError ? <Text style={styles.errorText}>{roleError}</Text> : null}

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
    color: Colors.error, // Màu sắc lỗi từ Colors
    fontSize: 14,
    marginTop: 5,
    textAlign: 'left',
    width: '100%',
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
