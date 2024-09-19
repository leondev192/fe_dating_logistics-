// src/navigations/MainNavigator.tsx
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import SearchScreen from '../screens/main/SearchScreen';
import BackButton from '../components/header/ArrowLeft';
import TitleHeader from '../components/header/TitleHeader';
import {
  ConversationDetail,
  CreateLookingForTransportPost,
  CreateOfferingTransportPost,
  EditLookingForTransportPost,
  EditOfferingTransportPost,
  Feedback,
  Filter,
  Guide,
  Help,
  LocationUserEdit,
  MessScreen,
  Payment,
  PrivacyPolicy,
  UserDetailScreen,
  UserEdit,
  UserProfile,
} from '../screens';
import ChatDetail from '../screens/main/ChatDetail';
import MapScreen from '../screens/main/createpost/LocationPickerScreenCreateLookingForTransportPost';
import MapScreenCreateOfferingTransportPost from '../screens/main/createpost/LocationPickerScreenCreateOfferingTransportPost';
import EditMapScreen from '../screens/main/managepost/LocationPickerScreenCreateLookingForTransportPost';
import EditMapScreenCreateOfferingTransportPost from '../screens/main/managepost/LocationPickerScreenCreateOfferingTransportPost';
import {Document} from 'iconsax-react-native'; // Import icon tài liệu
import {NavigationProp, useNavigation} from '@react-navigation/native';
import RootStackParamList from './RootStackParamList';
import Notification from '../screens/main/NotificationScreen';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleConversationDetail = (conversationId: string) => {
    navigation.navigate('ConversationDetail', {conversationId});
  };
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
        options={({route}) => ({
          title: '',
          headerBackTitleVisible: false,
          headerBackImage: () => <BackButton />,
          headerTitle: () => <TitleHeader title="Cuộc trò chuyện" />,
          headerTransparent: false,
          headerTitleAlign: 'center',
          headerRight: () => (
            <Document
              size={24}
              color="#000"
              style={{marginRight: 15}}
              onPress={() =>
                handleConversationDetail(route.params.conversationId)
              } // Truyền conversationId vào hàm điều hướng
            />
          ),
        })}
      />
      <Stack.Screen
        name="Message"
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
          headerTitle: () => <TitleHeader title="Chọn địa chỉ" />,
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
          headerTitle: () => <TitleHeader title="Chọn địa chỉ" />,
          headerTransparent: false,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="EditMapScreen"
        component={EditMapScreen}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerBackImage: () => <BackButton />,
          headerTitle: () => <TitleHeader title="Chọn địa chỉ" />,
          headerTransparent: false,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="EditMapScreenOffering"
        component={EditMapScreenCreateOfferingTransportPost}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerBackImage: () => <BackButton />,
          headerTitle: () => <TitleHeader title="Chọn địa chỉ" />,
          headerTransparent: false,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Feedback"
        component={Feedback}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerBackImage: () => <BackButton />,
          headerTitle: () => <TitleHeader title="Đóng góp ý kiến" />,
          headerTransparent: false,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Help"
        component={Help}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerBackImage: () => <BackButton />,
          headerTitle: () => <TitleHeader title="Trợ giúp" />,
          headerTransparent: false,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerBackImage: () => <BackButton />,
          headerTitle: () => <TitleHeader title="Chính sách bảo mật" />,
          headerTransparent: false,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Guide"
        component={Guide}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerBackImage: () => <BackButton />,
          headerTitle: () => <TitleHeader title="Hướng dẩn sử dụng" />,
          headerTransparent: false,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Filter"
        component={Filter}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerBackImage: () => <BackButton />,
          headerTitle: () => <TitleHeader title="Lọc bài đăng" />,
          headerTransparent: false,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ConversationDetail"
        component={ConversationDetail}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerBackImage: () => <BackButton />,
          headerTitle: () => <TitleHeader title="Hợp đồng" />,
          headerTransparent: false,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="UserProfileScreen"
        component={UserDetailScreen}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerBackImage: () => <BackButton />,
          headerTitle: () => <TitleHeader title="Thông tin người đăng bài" />,
          headerTransparent: false,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notification}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerBackImage: () => <BackButton />,
          headerTitle: () => <TitleHeader title="Thông báo" />,
          headerTransparent: false,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="LocationUserEdit"
        component={LocationUserEdit}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerBackImage: () => <BackButton />,
          headerTitle: () => <TitleHeader title="Chọn địa chỉ" />,
          headerTransparent: false,
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
