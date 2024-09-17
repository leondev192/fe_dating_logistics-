import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import {Alert} from 'react-native';
import {getUserInfo} from '../../apis/services/userService';
import {useAuth} from '../../contexts/AuthContext';

// Function to check if the token is expired
const isTokenExpired = (token: string) => {
  try {
    const decodedToken: any = jwtDecode(token);
    return decodedToken.exp && Date.now() >= decodedToken.exp * 1000;
  } catch {
    return true;
  }
};

// Function to check if the user's information is complete
const checkUserInfo = async (token: string, navigation: any) => {
  try {
    const userInfo = await getUserInfo(token);

    // Check required user information fields
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
              navigation.navigate('Account'); // Navigate to the Account screen
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
  const {logout} = useAuth();

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
                  logout();
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
                onPress: () => {
                  logout();
                },
              },
            ],
            {cancelable: false},
          );
        } else {
          const isUserInfoComplete = await checkUserInfo(token, navigation);
          if (!isUserInfoComplete) return; // Stop if user info is incomplete
        }
      } finally {
        setIsChecking(false); // Set checking state to false when done
      }
    };

    checkAuthentication();
  }, [navigation]);

  if (isChecking) {
    return null; // Render nothing while checking
  }

  return <>{children}</>;
};

export default AuthGuard;
