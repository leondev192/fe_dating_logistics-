import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const GoogleLogin = () => {
  const [userInfo, setUserInfo] = useState(null); // State để lưu thông tin người dùng

  // Cấu hình Google Sign-In với Web Client ID
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '193742166494-vhvkbi0atp26iu8m0tlnph4js6nu32lu.apps.googleusercontent.com',
      iosClientId:
        '193742166494-8rmrlkofcs88ejiirsemjl8s7hrn3k7h.apps.googleusercontent.com',
      offlineAccess: true, // Để lấy refresh token nếu cần
      scopes: ['profile', 'email'], // Thêm các scopes để lấy thông tin người dùng
    });
  }, []);

  // Hàm đăng nhập bằng Google
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices(); // Kiểm tra Google Play Services
      const userInfo = await GoogleSignin.signIn(); // Thực hiện đăng nhập Google
      setUserInfo(userInfo); // Lưu thông tin người dùng
      Alert.alert('Success', 'Đăng nhập thành công');
    } catch (error) {
      console.error('Google Sign-In Error:', error); // Log chi tiết lỗi để kiểm tra
      handleSignInError(error); // Xử lý lỗi đăng nhập
    }
  };

  // Hàm xử lý lỗi đăng nhập
  const handleSignInError = error => {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      Alert.alert('Cancelled', 'Đăng nhập bị hủy');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      Alert.alert('In Progress', 'Đang tiến hành đăng nhập');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      Alert.alert('Error', 'Google Play Services không khả dụng');
    } else {
      Alert.alert('Error', `Đăng nhập thất bại: ${error.message}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!userInfo ? (
        // Nút đăng nhập Google
        <Button title="Đăng nhập bằng Google" onPress={signInWithGoogle} />
      ) : (
        // Hiển thị form thông tin sau khi đăng nhập thành công
        <View style={styles.userInfo}>
          {userInfo?.data?.user?.photo ? (
            <Image
              source={{uri: userInfo.data.user.photo}}
              style={styles.image}
            />
          ) : (
            <Text style={styles.text}>Không có ảnh</Text>
          )}
          <Text style={styles.text}>
            Tên: {userInfo?.data?.user?.name || 'Không có tên'}
          </Text>
          <Text style={styles.text}>
            Email: {userInfo?.data?.user?.email || 'Không có email'}
          </Text>
          <Text style={styles.text}>
            ID: {userInfo?.data?.user?.id || 'Không có ID'}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  userInfo: {
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
});

export default GoogleLogin;
