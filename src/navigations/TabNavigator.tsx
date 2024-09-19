import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';

import {
  Home,
  Document,
  Message,
  Notification,
  Profile,
  MessageProgramming,
} from 'iconsax-react-native'; // Sử dụng Iconsax cho icon
import HomeScreen from '../screens/main/HomeScreen';
import ManagePostsScreen from '../screens/main/ManagePostsScreen';
import MessagesScreen from '../screens/main/MessagesScreen';
import NotificationScreen from '../screens/main/NotificationScreen';
import AccountScreen from '../screens/main/AccountScreen';
import CustomHeader from '../components/customheader/CustomHomeHeader';
import Colors from '../constants/colors';
import AuthGuard from '../components/checktoken/AuthChecker'; // Import AuthGuard
import RootStackParamList from './RootStackParamList';
import AiScreen from '../screens/main/AiScreen';

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Tạo nút thông báo ở headerRight
  const NotificationIcon = () => (
    <View style={styles.icon}>
      <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
        <Notification size={24} color={'#000000'} variant="Outline" />
      </TouchableOpacity>
    </View>
  );

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

            case 'AI':
              return (
                <MessageProgramming
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

            case 'AI':
              label = 'Trợ lý AI';
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
          headerRight: () => <NotificationIcon />, // Thêm icon thông báo ở đây
        }}>
        {() => (
          <AuthGuard>
            <ManagePostsScreen />
          </AuthGuard>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Messages"
        options={{
          headerTitle: 'Tin nhắn',
          headerTitleAlign: 'center',
          headerRight: () => <NotificationIcon />, // Thêm icon thông báo ở đây
        }}>
        {() => (
          <AuthGuard>
            <MessagesScreen />
          </AuthGuard>
        )}
      </Tab.Screen>

      <Tab.Screen
        name="AI"
        options={{
          headerTitle: 'Trợ lý AI',
          headerTitleAlign: 'center',
          headerRight: () => <NotificationIcon />, // Thêm icon thông báo ở đây
        }}>
        {() => (
          <AuthGuard>
            <AiScreen />
          </AuthGuard>
        )}
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

const styles = StyleSheet.create({
  icon: {
    marginRight: 19,
  },
});
export default TabNavigator;
