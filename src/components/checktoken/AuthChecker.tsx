// src/components/AuthGuard.tsx
import React, {useEffect, useState} from 'react';
import {useNavigation, CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import {Alert} from 'react-native'; // Import Alert từ React Native

// Hàm kiểm tra token hết hạn
const isTokenExpired = (token: string) => {
  try {
    const decodedToken: any = jwtDecode(token);
    if (decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Lỗi khi kiểm tra token:', error);
    return true;
  }
};

// Component kiểm tra token
const AuthGuard: React.FC<{children: React.ReactNode}> = ({children}) => {
  const navigation = useNavigation();
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      setIsCheckingToken(true);
      try {
        const token = await AsyncStorage.getItem('userToken');

        if (!token || isTokenExpired(token)) {
          // Hiển thị Alert trước khi điều hướng
          Alert.alert(
            'Phiên đăng nhập hết hạn',
            'Vui lòng đăng nhập lại.',
            [
              {
                text: 'OK',
                onPress: async () => {
                  // Xóa token và điều hướng về trang đăng nhập
                  await AsyncStorage.removeItem('userToken');
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{name: 'Auth'}],
                    }),
                  );
                },
              },
            ],
            {cancelable: false},
          );
        }
      } catch (error) {
        console.error('Lỗi khi kiểm tra token:', error);
      } finally {
        setIsCheckingToken(false);
      }
    };

    checkToken();
  }, [navigation]);

  // Chỉ render con khi đã hoàn tất kiểm tra token
  if (isCheckingToken) {
    return null; // Hiển thị loading hoặc để trống trong khi chờ kiểm tra
  }

  return <>{children}</>;
};

export default AuthGuard;
