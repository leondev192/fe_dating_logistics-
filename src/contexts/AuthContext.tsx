// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, CommonActions} from '@react-navigation/native'; // Import navigation tools
import {getUserInfo} from '../apis/services/userService'; // Import user info service
import jwtDecode from 'jwt-decode'; // Import jwt-decode to decode JWT token
// Correct import for jwt-decode

// Define type for AuthContext
interface AuthContextProps {
  isLoggedIn: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  continueWithoutLogin: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigation = useNavigation(); // Use navigation hook for navigation actions

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token && !isTokenExpired(token)) {
          // Token is valid, fetch user info to ensure it's complete
          const isUserInfoComplete = await checkUserInfo(token);
          setIsLoggedIn(isUserInfoComplete);
        } else {
          // Token is missing or expired
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Failed to load login status:', error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  // Function to decode and check if the token is expired
  const isTokenExpired = (token: string) => {
    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.exp && Date.now() >= decodedToken.exp * 1000;
    } catch {
      return true;
    }
  };

  // Function to check if the user's information is complete
  const checkUserInfo = async (token: string) => {
    try {
      const userInfo = await getUserInfo(token);
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

  const login = async (token: string) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      const isUserInfoComplete = await checkUserInfo(token);
      setIsLoggedIn(isUserInfoComplete);
      if (isUserInfoComplete) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Main'}],
          }),
        );
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setIsLoggedIn(false);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Auth'}],
        }),
      );
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const continueWithoutLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{isLoggedIn, login, logout, continueWithoutLogin}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
