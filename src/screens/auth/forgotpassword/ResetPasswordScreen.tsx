import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ImageBackground,
  Platform,
} from 'react-native';
import InputAuth from '../../../components/input/InputAuth';
import ButtonComponent from '../../../components/button/auth/GradientButton';
import Colors from '../../../constants/colors';
import {useNavigation, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import LoadingSpinner from '../../../components/loading/LoadingSpinner';
import {resetPassword} from '../../../apis/services/authService';
import Toast from 'react-native-toast-message';
import BlurredToast from '../../../components/toast/BlurredToast';
import {toastConfig} from '../../../components/toast/ToastAuth';

type RootStackParamList = {
  ResetPassword: {token: string};
  Login: undefined;
};

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
  const [isToastVisible, setIsToastVisible] = useState(false);

  const handleResetPassword = async () => {
    if (!newPassword) {
      setError('Vui lòng nhập mật khẩu mới');
      return;
    }

    setLoading(true);
    try {
      const response = await resetPassword({token, newPassword});
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Đặt lại mật khẩu thành công',
        onHide: () => setIsToastVisible(false),

        position: 'top',
        topOffset: 300,
      });
      navigation.navigate('Login');
    } catch (error: any) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Lỗi khi đặt lại mật khẩu, vui lòng thử lại.',
        onHide: () => setIsToastVisible(false),

        position: 'top',
        topOffset: 300,
      });
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/White.png')}
      style={styles.imageBackground}
      resizeMode="cover">
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.instructionText}>
          Vui lòng nhập mật khẩu mới cho tài khoản của bạn
        </Text>
        <InputAuth
          label=""
          value={newPassword}
          onChangeText={text => setNewPassword(text)}
          placeholder="Nhập mật khẩu mới"
          isPassword={true}
          iconName="lock"
          hasError={!!error}
          errorMessage={error}
          secureTextEntry
        />
        <ButtonComponent
          title="Đặt lại mật khẩu"
          onPress={handleResetPassword}
        />
        <LoadingSpinner loading={loading} />
      </ScrollView>
      <BlurredToast config={toastConfig} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    marginTop: Platform.OS === 'android' ? 110 : 110,
    paddingHorizontal: 20,
  },
  instructionText: {
    fontSize: 16,
    color: Colors.textbody,
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default ResetPasswordScreen;
