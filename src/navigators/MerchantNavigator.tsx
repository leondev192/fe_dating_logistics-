import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/main/HomeScreen';
import ProfileCompletionScreen from '../screens/merchant/ProfileCompletionScreen';

type RootStackParamList = {
  ProfileCompletion: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();
const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileCompletion"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="ProfileCompletion"
        component={ProfileCompletionScreen}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
