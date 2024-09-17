// src/navigators/AuthNavigator.tsx
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BackButton from '../components/header/ArrowLeft';
import TitleHeader from '../components/header/TitleHeader';
import {RootStackParamList} from './RootStackParamList';
import {
  ForgotPassword,
  Login,
  Register,
  ResetPassword,
  VerifyOtp,
  VerifyOtpForgotPassword,
  Welcome,
} from '../screens';

const Stack = createStackNavigator<RootStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerBackImage: () => <BackButton />,
          headerTitle: () => <TitleHeader title="Đăng nhập" />,
          headerTransparent: true,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerBackImage: () => <BackButton />,
          headerTitle: () => <TitleHeader title="Đăng ký" />,
          headerTransparent: true,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerBackImage: () => <BackButton />,
          headerTitle: () => <TitleHeader title="Quên mật khẩu" />,
          headerTransparent: true,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="VerifyOtpForgotPassword"
        component={VerifyOtpForgotPassword}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerBackImage: () => <BackButton />,
          headerTitle: () => <TitleHeader title="Quên mật khẩu" />,
          headerTransparent: true,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerBackImage: () => <BackButton />,
          headerTitle: () => <TitleHeader title="Quên mật khẩu" />,
          headerTransparent: true,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="VerifyOtp"
        component={VerifyOtp}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerBackImage: () => <BackButton />,
          headerTitle: () => <TitleHeader title="Quên mật khẩu" />,
          headerTransparent: true,
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
