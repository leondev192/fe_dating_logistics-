import React, {useState} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import InputAuth from '../../../components/input/InputAuth';
import ButtonComponent from '../../../components/button/GradientButton';
import Colors from '../../../constants/colors';
import {
  useNavigation,
  NavigationProp,
  RouteProp,
  useRoute,
} from '@react-navigation/native';
import LoadingSpinner from '../../../components/loading/LoadingSpinner';
import {verifyOtpResetPassword} from '../../../apis/authService';

type RootStackParamList = {
  ResetPassword: {token: string};
  VerifyOtp: {identifier: string}; // Định nghĩa params cho VerifyOtp
};

const VerifyOtpScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'VerifyOtp'>>();
  const {identifier} = route.params; // Lấy identifier từ params

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async () => {
    if (!otp) {
      setError('Vui lòng nhập OTP');
      return;
    }
    setLoading(true);
    try {
      const response = await verifyOtpResetPassword({identifier, otp});
      setLoading(false);
      console.log('Token received:', response.token);
      // Log để kiểm tra token
      console.log('Token received after OTP verification:', response.token);
      // Nếu OTP hợp lệ, điều hướng đến màn hình đặt lại mật khẩu với token nhận được
      navigation.navigate('ResetPassword', {token: response.token});
    } catch (error) {
      setLoading(false);
      setError('OTP không hợp lệ hoặc đã hết hạn');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.instructionText}>
        Vui lòng nhập OTP đã được gửi đến bạn
      </Text>
      <InputAuth
        label=""
        value={otp}
        onChangeText={text => setOtp(text)}
        placeholder="Nhập OTP"
        iconName="user"
        hasError={!!error}
        errorMessage={error}
      />
      <ButtonComponent title="Xác Minh OTP" onPress={handleVerifyOtp} />
      <LoadingSpinner loading={loading} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  instructionText: {
    fontSize: 16,
    color: Colors.textbody,
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default VerifyOtpScreen;
