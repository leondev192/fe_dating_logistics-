import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from './src/screens/SplashScreen';
import AppNavigator from './src/navigators/AppNavigator';
import store from './src/redux/store';

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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

// hâhhahahahah
