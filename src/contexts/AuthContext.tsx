import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {jwtDecode} from 'jwt-decode';
import RootStackParamList from '../navigations/RootStackParamList';

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
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token && !isTokenExpired(token)) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Failed to load login status:', error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  const isTokenExpired = (token: string) => {
    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.exp && Date.now() >= decodedToken.exp * 1000;
    } catch {
      return true;
    }
  };

  const login = async (token: string) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      setIsLoggedIn(true);
      navigation.navigate('MainNavigator');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setIsLoggedIn(false);
      navigation.navigate('AuthNavigator'); // Navigate to AuthNavigator
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
