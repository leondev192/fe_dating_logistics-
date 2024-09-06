// src/navigators/AuthNavigator.tsx
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import WelcomeScreen from '../screens/auth/WelcomeSCreen';
import BackButton from '../components/header/ArrowLeft';
import TitleHeader from '../components/header/TitleHeader';
import ForgotPassword from '../screens/auth/forgotpassword/ForgotPaswordScreen';
import VerifyOtpScreen from '../screens/auth/VerifyOtpScreen';
import VerifyOtpForgotPassword from '../screens/auth/forgotpassword/VerifyOtpScreen';
import ResetPasswordScreen from '../screens/auth/forgotpassword/ResetPasswordScreen';

// Import the types from navigationTypes
import {AuthStackParamList} from './navigationTypes';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
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
        component={RegisterScreen}
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
      //vq ne
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
        component={ResetPasswordScreen}
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
        component={VerifyOtpScreen}
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
