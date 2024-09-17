// src/navigations/MainNavigator.tsx
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import SearchScreen from '../screens/main/SearchScreen';
import BackButton from '../components/header/ArrowLeft';
import TitleHeader from '../components/header/TitleHeader';
import {
  CreateLookingForTransportPost,
  CreateOfferingTransportPost,
  EditCargoMatchingPost,
  EditLookingForTransportPost,
  EditOfferingTransportPost,
  MessScreen,
  Payment,
  UserEdit,
  UserProfile,
} from '../screens';
import ChatDetail from '../screens/main/ChatDetail';
import MapScreen from '../screens/main/createpost/LocationPickerScreenCreateLookingForTransportPost';
import MapScreenCreateOfferingTransportPost from '../screens/main/createpost/LocationPickerScreenCreateOfferingTransportPost';

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
        name="UserProfile"
        component={UserProfile}
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
      <Stack.Screen
        name="PaymentScreen"
        component={Payment}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerBackImage: () => <BackButton />,
          headerTitle: () => <TitleHeader title="" />,
          headerTransparent: false,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="EditCargoMatchingPost"
        component={EditCargoMatchingPost}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerBackImage: () => <BackButton />,
          headerTitle: () => <TitleHeader title="Chỉnh sửa bài đăng" />,
          headerTransparent: false,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="EditLookingForTransportPost"
        component={EditLookingForTransportPost}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerBackImage: () => <BackButton />,
          headerTitle: () => <TitleHeader title="Chỉnh sửa bài đăng" />,
          headerTransparent: false,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="EditOfferingTransportPost"
        component={EditOfferingTransportPost}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerBackImage: () => <BackButton />,
          headerTitle: () => <TitleHeader title="Chỉnh sửa bài đăng" />,
          headerTransparent: false,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ChatDetail"
        component={ChatDetail}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerBackImage: () => <BackButton />,
          headerTitle: () => <TitleHeader title="Cuộc trò chuyện" />,
          headerTransparent: false,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="MessagesScreen"
        component={MessScreen}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerBackImage: () => <BackButton />,
          headerTitle: () => <TitleHeader title="Tin nhắn" />,
          headerTransparent: false,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerBackImage: () => <BackButton />,
          headerTitle: () => <TitleHeader title="Tin nhắn" />,
          headerTransparent: false,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="MapScreenOffering"
        component={MapScreenCreateOfferingTransportPost}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerBackImage: () => <BackButton />,
          headerTitle: () => <TitleHeader title="Tin nhắn" />,
          headerTransparent: false,
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
