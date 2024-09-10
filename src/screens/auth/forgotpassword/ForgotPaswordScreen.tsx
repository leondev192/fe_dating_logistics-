import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  ImageBackground,
} from 'react-native';
import InputAuth from '../../../components/input/InputAuth';
import ButtonComponent from '../../../components/button/auth/GradientButton';
import Colors from '../../../constants/colors';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import LoadingSpinner from '../../../components/loading/LoadingSpinner';
import {forgotPassword} from '../../../apis/services/authService';
import Toast from 'react-native-toast-message';
import BlurredToast from '../../../components/toast/BlurredToast';
import {toastConfig} from '../../../components/toast/ToastAuth';

type RootStackParamList = {
  Login: undefined;
  VerifyOtpForgotPassword: {email: string};
};

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const validateEmail = (value: string) => {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    return isEmail;
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Vui lòng nhập email');
      return;
    } else if (!validateEmail(email)) {
      setError('Vui lòng nhập đúng định dạng email');
      return;
    }

    setError('');
    setLoading(true);
    try {
      await forgotPassword({email});
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Yêu cầu thành công',
        text2: 'Vui lòng kiểm tra email để nhận OTP.',
        onHide: () => setIsToastVisible(false),
        position: 'top',
        topOffset: 300,
      });
      navigation.navigate('VerifyOtpForgotPassword', {email});
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Đã xảy ra lỗi, vui lòng thử lại sau.',
        onHide: () => setIsToastVisible(false),
        position: 'top',
        topOffset: 300,
      });
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/White.png')}
      style={styles.imageBackground}
      resizeMode="cover">
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.instructionText}>
          Đừng lo lắng! Nó xảy ra. Vui lòng nhập email được liên kết với tài
          khoản của bạn.
        </Text>
        <InputAuth
          label=""
          value={email}
          onChangeText={text => {
            setEmail(text);
            setError('');
          }}
          placeholder="Nhập Email của bạn"
          iconName="user"
          hasError={!!error}
          errorMessage={error}
        />
        <ButtonComponent
          title="Khôi Phục Mật Khẩu"
          onPress={handleForgotPassword}
        />
      </ScrollView>
      <LoadingSpinner loading={loading} />
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>Nhớ Mật Khẩu?</Text>
        <TouchableOpacity
          style={styles.termsButton}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.termsButtonText}>Đăng Nhập</Text>
        </TouchableOpacity>
      </View>
      <BlurredToast config={toastConfig} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    marginTop: Platform.OS === 'android' ? 110 : 110,
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  instructionText: {
    fontSize: 16,
    color: Colors.textbody,
    textAlign: 'center',
    marginVertical: 10,
  },
  termsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: '8%',
  },
  termsText: {
    fontSize: 15,
    color: '#1E232C',
    textAlign: 'center',
  },
  termsButton: {
    marginLeft: 10,
  },
  termsButtonText: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default ForgotPasswordScreen;
