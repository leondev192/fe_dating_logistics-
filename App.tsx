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

  useEffect(() => {
    let isMounted = true; // Thêm cờ để tránh cập nhật state nếu component đã unmount

    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('@token');
        const user = await AsyncStorage.getItem('@user');

        if (token && user && isMounted) {
          store.dispatch(loginSuccess(JSON.parse(user)));
        }
      } catch (error) {
        console.error('Lỗi khi kiểm tra trạng thái đăng nhập:', error);
      }
    };

    checkLoginStatus();

    const timer = setTimeout(() => {
      if (isMounted) {
        setIsShowSplash(false);
      }
    }, 1500); // Giảm thời gian cho Splash

    return () => {
      isMounted = false; // Cleanup
      clearTimeout(timer);
    };
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar backgroundColor="transparent" translucent />
        {isShowSplash ? <SplashScreen /> : <AppNavigator />}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
