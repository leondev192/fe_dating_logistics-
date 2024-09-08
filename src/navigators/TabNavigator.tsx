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
import AnimatedHeader from '../components/common/AnimatedHeader';
import CustomHeader from '../components/customheader/CustomHomeHeader';
import {RootStackParamList, TabParamList} from './navigationTypes';
import Colors from '../constants/colors';

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
      <Tab.Screen name="Home" options={{headerShown: false}}>
        {() => (
          <AnimatedHeader
            children={
              <CustomHeader
                showLogo
                showSearch
                onPressSearch={() => console.log('Search')}
                onPressFilter={() => console.log('Filter')}
              />
            }
            scrollComponent={<HomeScreen />}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="ManagePosts" options={{headerShown: false}}>
        {() => (
          <AnimatedHeader
            children={
              <CustomHeader
                title="Quản lý tin"
                onPressSearch={() => console.log('Search')}
                onPressFilter={() => console.log('Filter')}
              />
            }
            scrollComponent={<ManagePostsScreen />}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Messages" options={{headerShown: false}}>
        {() => (
          <AnimatedHeader
            children={<CustomHeader title="Tin nhắn" />}
            scrollComponent={<MessagesScreen />}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Notifications" options={{headerShown: false}}>
        {() => (
          <AnimatedHeader
            children={<CustomHeader title="Thông báo" />}
            scrollComponent={<NotificationScreen />}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
