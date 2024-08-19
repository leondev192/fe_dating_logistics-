import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from './src/screens/SplashScreen';
import AppNavigator from './src/navigators/AppNavigator';

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="transparent" translucent />
      {isShowSplash ? <SplashScreen /> : <AppNavigator />}
    </NavigationContainer>
  );
};

export default App;
