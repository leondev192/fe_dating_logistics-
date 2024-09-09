// src/components/AuthChecker.tsx
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, CommonActions} from '@react-navigation/native';

interface AuthCheckerProps {
  route: string;
  children: React.ReactNode;
}

const AuthChecker: React.FC<AuthCheckerProps> = ({route, children}) => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          // Nếu có token, chuyển hướng đến route được yêu cầu
          navigation.navigate(route);
        } else {
          // Nếu không có token, chuyển hướng đến màn hình đăng nhập
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Auth'}],
            }),
          );
        }
      } catch (error) {
        console.error('Lỗi khi kiểm tra token:', error);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Auth'}],
          }),
        );
      }
    };

    checkToken();
  }, [navigation, route]);

  return <>{children}</>;
};

export default AuthChecker;
