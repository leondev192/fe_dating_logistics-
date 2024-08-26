import React, {useState} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import InputAuth from '../../../components/input/InputAuth';
import ButtonComponent from '../../../components/button/GradientButton';
import Colors from '../../../constants/colors';
import {useNavigation, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import LoadingSpinner from '../../../components/loading/LoadingSpinner';
import {resetPassword} from '../../../apis/authService'; // Import API service

// Define your RootStackParamList for the navigation
type RootStackParamList = {
  ResetPassword: {token: string};
  Login: undefined;
};

// Typing the route and navigation props
type ResetPasswordScreenRouteProp = RouteProp<
  RootStackParamList,
  'ResetPassword'
>;
type ResetPasswordScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ResetPassword'
>;

type Props = {
  route: ResetPasswordScreenRouteProp;
  navigation: ResetPasswordScreenNavigationProp;
};

const ResetPasswordScreen: React.FC<Props> = ({route, navigation}) => {
  const {token} = route.params;
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!newPassword) {
      setError('Vui lòng nhập mật khẩu mới');
      return;
    }

    //daovanquyet1909@gmail.com
    setLoading(true);
    try {
      await resetPassword({token, newPassword});
      setLoading(false);
      navigation.navigate('Login');
    } catch (error) {
      setLoading(false);
      setError('Lỗi khi đặt lại mật khẩu, vui lòng thử lại');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.instructionText}>
        Vui lòng nhập mật khẩu mới cho tài khoản của bạn
      </Text>
      <InputAuth
        label=""
        value={newPassword}
        onChangeText={text => setNewPassword(text)}
        placeholder="Nhập mật khẩu mới"
        iconName="lock"
        hasError={!!error}
        errorMessage={error}
        secureTextEntry
      />
      <ButtonComponent title="Đặt lại mật khẩu" onPress={handleResetPassword} />
      <LoadingSpinner loading={loading} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  instructionText: {
    fontSize: 16,
    color: Colors.textbody,
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default ResetPasswordScreen;
