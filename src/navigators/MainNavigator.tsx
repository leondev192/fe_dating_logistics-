import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import SearchScreen from '../screens/main/SearchScreen'; // Ví dụ màn hình stack riêng

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}} // Ẩn header mặc định, sử dụng custom header
      initialRouteName="Tabs">
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      {/* Thêm các màn hình stack khác tại đây nếu cần */}
    </Stack.Navigator>
  );
};

export default MainNavigator;
