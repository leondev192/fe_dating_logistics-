import React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Home,
  Document,
  Message,
  Notification,
  Profile,
} from 'iconsax-react-native';
import {useNavigation, CompositeNavigationProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/main/HomeScreen';
import ManagePostsScreen from '../screens/main/ManagePostsScreen';
import MessagesScreen from '../screens/main/MessagesScreen';
import NotificationScreen from '../screens/main/NotificationScreen';
import AccountScreen from '../screens/main/AccountScreen';
import CustomHeader from '../components/customheader/CustomHomeHeader';
import {RootStackParamList, TabParamList} from './navigationTypes'; // Import your types

const Tab = createBottomTabNavigator<TabParamList>();

// Type the navigation prop correctly
type TabNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;

const TabNavigator: React.FC = () => {
  const navigation = useNavigation<TabNavigationProp>();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarShowLabel: true,
        tabBarIcon: ({focused, size, color}) => {
          switch (route.name) {
            case 'Home':
              return (
                <Home
                  variant={focused ? 'Bold' : 'Outline'}
                  size={size}
                  color={color}
                />
              );
            case 'ManagePosts':
              return (
                <Document
                  variant={focused ? 'Bold' : 'Outline'}
                  size={size}
                  color={color}
                />
              );
            case 'Messages':
              return (
                <Message
                  variant={focused ? 'Bold' : 'Outline'}
                  size={size}
                  color={color}
                />
              );
            case 'Notifications':
              return (
                <Notification
                  variant={focused ? 'Bold' : 'Outline'}
                  size={size}
                  color={color}
                />
              );
            case 'Account':
              return (
                <Profile
                  variant={focused ? 'Bold' : 'Outline'}
                  size={size}
                  color={color}
                />
              );
            default:
              return <Home variant="Outline" size={size} color={color} />;
          }
        },
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 80 : 70,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          backgroundColor: '#FFFFFF',
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: () => (
            <CustomHeader
              showLogo
              showSearch
              onPressSearch={() => navigation.navigate('SearchScreen')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ManagePosts"
        component={ManagePostsScreen}
        options={{
          header: () => (
            <CustomHeader
              title="Quản lý tin"
              onPressMessage={() => navigation.navigate('Messages')}
              onPressNotification={() => navigation.navigate('Notifications')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{header: () => <CustomHeader title="Tin nhắn" />}}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{header: () => <CustomHeader title="Thông báo" />}}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{header: () => <CustomHeader title="Tài khoản" />}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
