// src/App.tsx
import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './src/screens/SplashScreen';
import AppNavigator from './src/navigators/AppNavigator';
import store from './src/redux/store';
import {loginSuccess} from './src/redux/auth/authSlice';

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  useEffect(() => {
    let isMounted = true;

    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('@token');
        const user = await AsyncStorage.getItem('@user');

        if (token && user && isMounted) {
          store.dispatch(loginSuccess(JSON.parse(user)));
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Lỗi khi kiểm tra trạng thái đăng nhập:', error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();

    const timer = setTimeout(() => {
      if (isMounted) {
        setIsShowSplash(false);
      }
    }, 1500);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  if (isLoggedIn === null) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar backgroundColor="transparent" translucent />
        {isShowSplash ? (
          <SplashScreen />
        ) : (
          <AppNavigator isLoggedIn={isLoggedIn} />
        )}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
