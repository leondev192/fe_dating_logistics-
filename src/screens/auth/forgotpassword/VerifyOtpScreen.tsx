import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import InputAuth from '../../../components/input/InputAuth';
import ButtonComponent from '../../../components/button/GradientButton';
import Colors from '../../../constants/colors';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import LoadingSpinner from '../../../components/loading/LoadingSpinner';
import {verifyOtpResetPassword} from '../../../apis/authService';

type RootStackParamList = {
  ResetPassword: {token: string};
};

const VerifyOtpScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async () => {
    if (!identifier || !otp) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    setLoading(true);
    try {
      const response = await verifyOtpResetPassword({identifier, otp});
      setLoading(false);
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
        Vui lòng nhập email/số điện thoại và OTP đã được gửi đến bạn
      </Text>
      <InputAuth
        label=""
        value={identifier}
        onChangeText={text => setIdentifier(text)}
        placeholder="Nhập Email hoặc Số điện thoại của bạn"
        iconName="user"
        hasError={!!error}
        errorMessage={error}
      />
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
