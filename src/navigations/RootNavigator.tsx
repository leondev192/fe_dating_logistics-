import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useAuth} from '../contexts/AuthContext';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import SplashScreen from '../screens/SplashScreen';

const RootStack = createStackNavigator();

const RootNavigator: React.FC = () => {
  const {isLoggedIn} = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading effect (could be a real check if needed)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Shorter delay for user experience

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        <RootStack.Screen name="MainNavigator" component={MainNavigator} />
      ) : (
        <RootStack.Screen name="AuthNavigator" component={AuthNavigator} />
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
