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
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const idToken = userInfo?.idToken || userInfo?.data?.idToken;

    if (!idToken) {
      throw new Error('Không lấy được idToken từ Google Sign-In');
    }

    return idToken;
  } catch (error: any) {
    // Chỉ throw lỗi mà không Alert
    throw handleSignInError(error);
  }
};

// Hàm xử lý lỗi đăng nhập, trả về lỗi đã format
const handleSignInError = (error: any) => {
  if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
    return new Error('Đăng nhập đã bị hủy. Vui lòng thử lại.');
  } else if (error?.code === statusCodes.IN_PROGRESS) {
    return new Error('Đăng nhập đang được tiến hành.');
  } else if (error?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    return new Error('Google Play Services không khả dụng trên thiết bị.');
  } else {
    return new Error(
      `Đăng nhập thất bại: ${error.message || 'Không rõ nguyên nhân.'}`,
    );
  }
};

// Gọi API backend để xác thực Google token và xử lý đăng nhập
export const googleLogin = async (idToken: string) => {
  try {
    if (!idToken) {
      throw new Error('idToken không được cung cấp.');
    }

    const response = await apiClient.post('/auth/google-login', {idToken});

    if (response.data.status === 'success') {
      await AsyncStorage.setItem('userToken', response.data.data.token);
      return response.data;
    } else {
      throw new Error(
        response.data.message || 'Đăng nhập với Google không thành công.',
      );
    }
  } catch (error: any) {
    // Chỉ throw lỗi mà không Alert
    throw error;
  }
};
