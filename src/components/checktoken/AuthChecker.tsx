// src/components/AuthGuard.tsx
import React, {useEffect, useState} from 'react';
import {useNavigation, CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode'; // Import jwtDecode để giải mã token JWT
import {Alert} from 'react-native';
import {getUserInfo} from '../../apis/services/userService'; // Import hàm lấy thông tin người dùng

// Hàm kiểm tra xem token có hết hạn hay không
const isTokenExpired = (token: string) => {
  try {
    const decodedToken: any = jwtDecode(token);
    return decodedToken.exp && Date.now() >= decodedToken.exp * 1000;
  } catch {
    return true;
  }
};

// Hàm kiểm tra xem thông tin người dùng đã đầy đủ chưa
const checkUserInfo = async (token: string, navigation: any) => {
  try {
    const userInfo = await getUserInfo(token);

    // Kiểm tra các trường thông tin cần thiết
    if (
      !userInfo.companyName ||
      !userInfo.address ||
      !userInfo.representativeName ||
      !userInfo.businessCode ||
      !userInfo.taxCode
    ) {
      Alert.alert(
        'Thông tin chưa đầy đủ',
        'Vui lòng cập nhật thông tin tài khoản để sử dụng dịch vụ.',
        [
          {
            text: 'Cập nhật ngay',
            onPress: () => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'Account'}],
                }),
              );
            },
          },
        ],
        {cancelable: false},
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error checking user info:', error);
    return false;
  }
};

const AuthGuard: React.FC<{children: React.ReactNode}> = ({children}) => {
  const navigation = useNavigation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');

        if (!token) {
          Alert.alert(
            'Chưa đăng nhập',
            'Vui lòng đăng nhập để sử dụng dịch vụ.',
            [
              {
                text: 'OK',
                onPress: () => {
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
        } else if (isTokenExpired(token)) {
          Alert.alert(
            'Phiên đăng nhập hết hạn',
            'Vui lòng đăng nhập lại.',
            [
              {
                text: 'OK',
                onPress: async () => {
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
        } else {
          const isUserInfoComplete = await checkUserInfo(token, navigation);
          if (!isUserInfoComplete) return; // Ngừng kiểm tra và điều hướng nếu thông tin không đầy đủ
        }
      } finally {
        setIsChecking(false);
      }
    };

    checkAuthentication();
  }, [navigation]);

  if (isChecking) {
    return null; // Trong lúc kiểm tra không render gì
  }

  return <>{children}</>;
};

export default AuthGuard;
