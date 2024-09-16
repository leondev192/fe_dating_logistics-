// src/navigations/MainNavigator.tsx
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import SearchScreen from '../screens/main/SearchScreen';
import UserProfile from '../screens/main/UserProfile';
import UserEdit from '../screens/main/UserEdit';
import BackButton from '../components/header/ArrowLeft';
import TitleHeader from '../components/header/TitleHeader';
import CreateCargoMatchingPost from '../screens/main/createpost/CreateCargoMatchingPost';
import CreateLookingForTransportPost from '../screens/main/createpost/CreateLookingForTransportPost';
import CreateOfferingTransportPost from '../screens/main/createpost/CreateOfferingTransportPost';

// Import các màn hình chỉnh sửa
import EditCargoMatchingPost from '../screens/main/managepost/EditCargoMatchingPost';
import EditLookingForTransportPost from '../screens/main/managepost/EditLookingForTransportPost';
import EditOfferingTransportPost from '../screens/main/managepost/EditOfferingTransportPost';
import PaymentScreen from '../screens/main/createpost/PaymentScreen';
import ChatDetail from '../screens/main/ChatDetail';
import MessagesScreen from '../screens/main/MessagesScreen';

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
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
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
        component={MessagesScreen}
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
