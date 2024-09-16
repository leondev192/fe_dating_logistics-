// src/navigations/TabNavigator.tsx
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform, Text} from 'react-native';
import {useNavigation, CompositeNavigationProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {
  Home,
  Document,
  Message,
  Notification,
  Profile,
} from 'iconsax-react-native';
import HomeScreen from '../screens/main/HomeScreen';
import ManagePostsScreen from '../screens/main/ManagePostsScreen';
import MessagesScreen from '../screens/main/MessagesScreen';
import NotificationScreen from '../screens/main/NotificationScreen';
import AccountScreen from '../screens/main/AccountScreen';
import CustomHeader from '../components/customheader/CustomHomeHeader';
import {RootStackParamList, TabParamList} from './navigationTypes';
import Colors from '../constants/colors';
import AuthGuard from '../components/checktoken/AuthChecker'; // Import AuthGuard

const Tab = createBottomTabNavigator<TabParamList>();

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
        tabBarIcon: ({focused, size}) => {
          const color = focused ? Colors.primary : '#000000';
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
        tabBarLabel: ({focused}) => {
          let label = '';
          switch (route.name) {
            case 'Home':
              label = 'Trang chủ';
              break;
            case 'ManagePosts':
              label = 'Quản lý bài';
              break;
            case 'Messages':
              label = 'Tin nhắn';
              break;
            case 'Notifications':
              label = 'Thông báo';
              break;
            case 'Account':
              label = 'Tài khoản';
              break;
          }
          return (
            <Text
              style={{
                color: focused ? Colors.primary : '#000000',
                fontSize: 12,
              }}>
              {label}
            </Text>
          );
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
              onPressSearch={() => console.log('Search')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ManagePosts"
        options={{
          headerTitle: 'Quản lý tin',
          headerTitleAlign: 'center',
        }}>
        {() => <ManagePostsScreen />}
      </Tab.Screen>
      <Tab.Screen
        name="Messages"
        options={{
          headerTitle: 'Tin nhắn',
          headerTitleAlign: 'center',
        }}>
        {() => <MessagesScreen />}
      </Tab.Screen>
      <Tab.Screen
        name="Notifications"
        options={{
          headerTitle: 'Thông báo',
          headerTitleAlign: 'center',
        }}>
        {() => <NotificationScreen />}
      </Tab.Screen>

      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerTitle: 'Tài khoản',
          headerTitleAlign: 'center',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
