// src/navigations/MainNavigator.tsx
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import SearchScreen from '../screens/main/SearchScreen';
import AddProfileCompanyScreen from '../screens/main/UserProfile';
import UserEdit from '../screens/main/UserEdit';
import BackButton from '../components/header/ArrowLeft';
import TitleHeader from '../components/header/TitleHeader';
import CreateCargoMatchingPost from '../screens/main/createpost/CreateCargoMatchingPost';
import CreateLookingForTransportPost from '../screens/main/createpost/CreateLookingForTransportPost';
import CreateOfferingTransportPost from '../screens/main/createpost/CreateOfferingTransportPost';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Tabs">
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerTitle: 'Tìm kiếm',
          headerBackTitle: 'Quay lại',
        }}
      />
      <Stack.Screen
        name="AddProfileCompanyScreen"
        component={AddProfileCompanyScreen}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerBackImage: () => <BackButton />,
          headerTitle: () => <TitleHeader title="Thông tin doanh nghiệp" />,
          headerTransparent: false,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="UserEdit"
        component={UserEdit}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerBackImage: () => <BackButton />,
          headerTitle: () => <TitleHeader title="Chỉnh sửa thông tin" />,
          headerTransparent: false,

          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="CreateCargoMatchingPost"
        component={CreateCargoMatchingPost}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerBackImage: () => <BackButton />,
          headerTitle: () => <TitleHeader title="Thêm thông tin" />,
          headerTransparent: false,

          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="CreateLookingForTransportPost"
        component={CreateLookingForTransportPost}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerBackImage: () => <BackButton />,
          headerTitle: () => <TitleHeader title="Thêm thông tin" />,
          headerTransparent: false,

          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="CreateOfferingTransportPost"
        component={CreateOfferingTransportPost}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerBackImage: () => <BackButton />,
          headerTitle: () => <TitleHeader title="Thêm thông tin" />,
          headerTransparent: false,

          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
