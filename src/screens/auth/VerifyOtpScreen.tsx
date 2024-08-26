import React, {useState} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import InputAuth from '../../components/input/InputAuth';
import ButtonComponent from '../../components/button/GradientButton';
import Colors from '../../constants/colors';
import {
  useNavigation,
  NavigationProp,
  RouteProp,
  useRoute,
} from '@react-navigation/native';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import {verifyOtp} from '../../apis/authService';

type RootStackParamList = {
  Login: undefined;
  VerifyOtp: {identifier: string};
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
      console.log('Validation Error: OTP is missing');
      setError('Vui lòng nhập OTP');
      return;
    }

    console.log('Starting OTP verification...');
    console.log('Identifier:', identifier);
    console.log('OTP:', otp);

    setLoading(true);
    try {
      // Gọi API xác thực OTP
      const response = await verifyOtp({identifier, otp});
      console.log('OTP Verification Response:', response);

      setLoading(false);
      // Điều hướng đến màn hình Home sau khi xác thực OTP thành công
      console.log('OTP verified successfully, navigating to Home screen...');
      navigation.navigate('Login');
    } catch (error: any) {
      setLoading(false);
      console.error('OTP Verification Error:', error);
      if (error.response && error.response.data) {
        console.error('Server Error Response:', error.response.data);
        setError(
          error.response.data.message || 'OTP không hợp lệ hoặc đã hết hạn',
        );
      } else {
        setError('OTP không hợp lệ hoặc đã hết hạn');
      }
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
