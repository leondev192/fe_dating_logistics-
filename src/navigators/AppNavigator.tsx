// src/navigators/AppNavigator.tsx
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import MerchantNavigator from './MerchantNavigator';

type AppNavigatorProps = {
  isLoggedIn: boolean;
};

const Stack = createStackNavigator();

const AppNavigator: React.FC<AppNavigatorProps> = ({isLoggedIn}) => {
  return (
    <Stack.Navigator
      initialRouteName={isLoggedIn ? 'Main' : 'Auth'} // Chỉ định màn hình khởi đầu
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Merchant" component={MerchantNavigator} />
      <Stack.Screen name="Auth" component={AuthNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
