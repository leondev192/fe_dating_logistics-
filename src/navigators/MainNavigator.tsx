import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import SearchScreen from '../screens/main/SearchScreen'; // Ví dụ màn hình stack riêng
import AddProfileCompanyScreen from '../screens/main/AddProfileCompanyScreen';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Tabs">
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen
        name="AddProfileCompanyScreen"
        component={AddProfileCompanyScreen}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
