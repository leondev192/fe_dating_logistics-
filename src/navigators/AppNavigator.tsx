// src/navigators/AppNavigator.tsx
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
type AppNavigatorProps = {
  isLoggedIn: boolean;
};

const Stack = createStackNavigator();

const AppNavigator: React.FC<AppNavigatorProps> = ({isLoggedIn}) => {
  return (
    <Stack.Navigator
      initialRouteName={isLoggedIn ? 'Auth' : 'Main'} // Chỉ định màn hình khởi đầu
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Main" component={MainNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
