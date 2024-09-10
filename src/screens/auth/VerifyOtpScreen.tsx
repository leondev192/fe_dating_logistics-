import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Platform,
  ImageBackground,
  Alert,
} from 'react-native';
import ButtonComponent from '../../components/button/auth/GradientButton';
import Colors from '../../constants/colors';
import {
  useNavigation,
  NavigationProp,
  RouteProp,
  useRoute,
} from '@react-navigation/native';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import {verifyOtp} from '../../apis/services/authService';
import OtpInputComponent from '../../components/input/OtpInput';
import Toast from 'react-native-toast-message';
import BlurredToast from '../../components/toast/BlurredToast';
import {toastConfig} from '../../components/toast/ToastAuth';

type RootStackParamList = {
  Login: undefined;
  VerifyOtp: {email: string};
};

const VerifyOtpScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'VerifyOtp'>>();
  const {email} = route.params;

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setError('Vui lòng nhập đủ 6 ký tự OTP');
      return;
    }
    setLoading(true);
    try {
      const response = await verifyOtp({email, otp});
      setLoading(false);
      Alert.alert(
        'Xác minh thành công',
        'OTP của bạn đã được xác minh thành công!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ],
      );
    } catch (error: any) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'OTP không hợp lệ',
        text2: 'Vui lòng kiểm tra lại OTP hoặc yêu cầu mã mới.',
        onHide: () => setIsToastVisible(false),
        position: 'top',
        topOffset: 300,
      });
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/White.png')}
      style={styles.imageBackground}
      resizeMode="cover">
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.instructionText}>
          Vui lòng nhập OTP đã được gửi đến email của bạn
        </Text>
        <OtpInputComponent length={6} onChange={setOtp} />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <ButtonComponent title="Xác Minh OTP" onPress={handleVerifyOtp} />
        <LoadingSpinner loading={loading} />
      </ScrollView>
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
  container: {
    flexGrow: 1,
    padding: 20,
    marginTop: Platform.OS === 'android' ? 110 : 110,
    paddingHorizontal: 20,
  },
  instructionText: {
    fontSize: 16,
    color: Colors.textbody,
    textAlign: 'center',
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default VerifyOtpScreen;
