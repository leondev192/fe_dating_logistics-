// googleAuthService.ts
import {Alert} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import apiClient from '../apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Cấu hình Google Sign-In
GoogleSignin.configure({
  webClientId:
    '193742166494-vhvkbi0atp26iu8m0tlnph4js6nu32lu.apps.googleusercontent.com',
  iosClientId:
    '193742166494-8rmrlkofcs88ejiirsemjl8s7hrn3k7h.apps.googleusercontent.com',
  offlineAccess: true,
  scopes: ['profile', 'email'],
});

// Đăng nhập với Google và lấy idToken
export const signInWithGoogle = async (): Promise<string> => {
  try {
    // Kiểm tra nếu Google Play Services có sẵn trên thiết bị (đối với Android)
    await GoogleSignin.hasPlayServices();

    // Thực hiện đăng nhập Google và lấy thông tin người dùng
    const userInfo = await GoogleSignin.signIn();

    // In ra toàn bộ thông tin userInfo để xác định rõ idToken
    console.log('Google Sign-In User Info:', userInfo);

    // Truy xuất idToken từ userInfo
    const idToken = userInfo?.idToken || userInfo?.data?.idToken;

    // Kiểm tra nếu idToken không tồn tại
    if (!idToken) {
      console.error('Không lấy được idToken từ Google Sign-In', userInfo);
      throw new Error('Không lấy được idToken từ Google Sign-In');
    }

    // Không hiển thị Alert tại đây để tránh hiển thị hai lần
    return idToken; // Trả về idToken để gửi đến backend
  } catch (error: any) {
    console.error('Google Sign-In Error:', error);
    handleSignInError(error);
    throw error;
  }
};

// Hàm xử lý lỗi đăng nhập
const handleSignInError = (error: any) => {
  if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
    Alert.alert('Hủy', 'Đăng nhập bị hủy');
  } else if (error?.code === statusCodes.IN_PROGRESS) {
    Alert.alert('Đang tiến hành', 'Đang tiến hành đăng nhập');
  } else if (error?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    Alert.alert('Lỗi', 'Google Play Services không khả dụng');
  } else {
    Alert.alert('Lỗi', `Đăng nhập thất bại: ${error.message}`);
  }
};

// Gọi API backend để xác thực Google token và xử lý đăng nhập
export const googleLogin = async (idToken: string) => {
  try {
    if (!idToken) {
      throw new Error('idToken không được cung cấp');
    }

    // Gọi API backend thông qua apiClient
    const response = await apiClient.post('/auth/google-login', {idToken});

    if (response.data.status === 'success') {
      await AsyncStorage.setItem('userToken', response.data.data.token);
      Alert.alert('Thành công', 'Đăng nhập với Google thành công'); // Chỉ hiển thị Alert tại đây
      return response.data;
    } else {
      throw new Error(
        response.data.message || 'Đăng nhập với Google không thành công.',
      );
    }
  } catch (error: any) {
    console.error('Google Login API Error:', error);
    Alert.alert(
      'Lỗi',
      `Đăng nhập với Google không thành công: ${error.message}`,
    );
    throw error;
  }
};
